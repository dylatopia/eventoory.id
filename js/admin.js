// ============================================
// EVENTOORY.ID — ADMIN PANEL (TANPA DATABASE)
// Semua perubahan disimpan sementara di localStorage browser
// (draft), lalu di-EXPORT jadi kode js/products.js yang tinggal
// kamu upload ulang / redeploy ke hosting.
//
// CATATAN KEAMANAN: login di bawah cuma soft-gate client-side,
// BUKAN keamanan sungguhan (situs statis tidak punya server untuk
// verifikasi password). Cukup untuk mencegah orang iseng, bukan
// untuk melindungi data sensitif.
// ============================================
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const DRAFT_KEY = "eventoory_admin_draft_v1";
  const ADMIN_PASSWORD = "eventoory2026"; // <-- ganti sesuai kebutuhan

  let products = [];
  let currentTierProductId = null;

  // ---------- Load draft dari localStorage, fallback ke products.js ----------
  function loadProducts() {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        products = JSON.parse(saved);
        return;
      }
    } catch (e) { /* ignore corrupt draft */ }
    // Deep copy supaya tidak mutate array asli di window.EVENTOORY_PRODUCTS
    products = JSON.parse(JSON.stringify(window.EVENTOORY_PRODUCTS || []));
  }

  function saveDraft() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(products));
  }

  // ---------- Login gate ----------
  function showDashboard() {
    $("#admin-login-view").style.display = "none";
    $("#admin-dashboard-view").style.display = "block";
    loadProducts();
    renderProductList();
    checkDraftBanner();
  }

  function showLogin() {
    $("#admin-login-view").style.display = "grid";
    $("#admin-dashboard-view").style.display = "none";
  }

  $("#admin-login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const errEl = $("#admin-login-error");
    const { password } = Object.fromEntries(new FormData(e.target).entries());
    if (password !== ADMIN_PASSWORD) {
      errEl.textContent = "Password salah.";
      errEl.style.display = "block";
      return;
    }
    sessionStorage.setItem("eventoory_admin_session", "1");
    showDashboard();
  });

  $("#admin-logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("eventoory_admin_session");
    showLogin();
  });

  function checkDraftBanner() {
    const banner = $("#admin-draft-banner");
    if (!banner) return;
    const hasDraft = !!localStorage.getItem(DRAFT_KEY);
    banner.style.display = hasDraft ? "flex" : "none";
  }

  // ---------- Render list produk ----------
  function renderProductList() {
    const list = $("#admin-product-list");
    if (!products.length) {
      list.innerHTML = `<p style="color:var(--gray-500)">Belum ada produk. Tambahkan lewat form di atas.</p>`;
      return;
    }
    list.innerHTML = products.map((p) => `
      <div class="checkout-card" style="margin-bottom:12px;display:flex;gap:16px;align-items:center">
        <img src="${p.image}" style="width:70px;height:70px;object-fit:cover;border-radius:12px" alt="${p.name}">
        <div style="flex:1">
          <strong style="color:var(--navy)">${p.name}</strong>
          <div style="font-size:13px;color:var(--gray-500)">${p.category} · ${p.id} ${p.available ? "" : "· <span style='color:#DC2626'>nonaktif</span>"}</div>
        </div>
        <button class="btn btn-ghost" data-manage-tiers="${p.id}">Kelola Harga</button>
        <button class="btn btn-ghost" data-edit-product="${p.id}">Edit</button>
        <button class="btn btn-outline" data-delete-product="${p.id}" style="border-color:#DC2626;color:#DC2626">Hapus</button>
      </div>
    `).join("");

    $$("[data-manage-tiers]", list).forEach((btn) =>
      btn.addEventListener("click", () => openTierModal(btn.dataset.manageTiers))
    );
    $$("[data-edit-product]", list).forEach((btn) =>
      btn.addEventListener("click", () => fillFormForEdit(btn.dataset.editProduct))
    );
    $$("[data-delete-product]", list).forEach((btn) =>
      btn.addEventListener("click", () => deleteProduct(btn.dataset.deleteProduct))
    );
  }

  // ---------- Tambah / edit produk ----------
  const form = $("#admin-add-product-form");

  function fillFormForEdit(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    form.id.value = p.id;
    form.id.disabled = true; // id tidak boleh diubah saat edit
    form.name.value = p.name;
    form.category.value = p.category;
    form.image_url.value = p.image;
    form.material_link.value = p.materialLink || "";
    form.color_link.value = p.colorLink || "";
    form.description.value = p.description;
    $("#admin-form-title").textContent = `Edit Produk — ${p.name}`;
    $("#admin-form-cancel-edit").style.display = "inline-flex";
    window.scrollTo({ top: form.offsetTop - 80, behavior: "smooth" });
  }

  function resetForm() {
    form.reset();
    form.id.disabled = false;
    $("#admin-form-title").textContent = "Tambah Produk Baru";
    $("#admin-form-cancel-edit").style.display = "none";
  }

  const cancelBtn = $("#admin-form-cancel-edit");
  if (cancelBtn) cancelBtn.addEventListener("click", resetForm);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target).entries());
    const isEdit = form.id.disabled;

    if (isEdit) {
      const p = products.find((x) => x.id === raw.id);
      if (p) {
        p.name = raw.name;
        p.category = raw.category;
        p.image = raw.image_url;
        p.materialLink = raw.material_link;
        p.colorLink = raw.color_link;
        p.description = raw.description;
      }
    } else {
      if (products.some((x) => x.id === raw.id)) {
        alert("ID produk ini sudah dipakai. Pilih ID/slug lain.");
        return;
      }
      products.push({
        id: raw.id,
        name: raw.name,
        category: raw.category,
        image: raw.image_url,
        materialLink: raw.material_link,
        colorLink: raw.color_link,
        description: raw.description,
        available: true,
        priceTiers: [],
      });
    }

    saveDraft();
    resetForm();
    renderProductList();
    checkDraftBanner();
  });

  // ---------- Hapus produk ----------
  function deleteProduct(id) {
    if (!confirm("Hapus produk ini? Tier harga terkait juga akan terhapus.")) return;
    products = products.filter((p) => p.id !== id);
    saveDraft();
    renderProductList();
    checkDraftBanner();
  }

  // ---------- Modal kelola harga tier ----------
  function openTierModal(productId) {
    currentTierProductId = productId;
    const p = products.find((x) => x.id === productId);
    $("#admin-tier-modal-title").textContent = `Kelola Harga — ${p ? p.name : ""}`;
    $("#admin-tier-modal").classList.add("open");
    renderTiers();
  }

  function renderTiers() {
    const p = products.find((x) => x.id === currentTierProductId);
    const tiers = (p && p.priceTiers) || [];
    const list = $("#admin-tier-list");
    if (!tiers.length) {
      list.innerHTML = `<p style="color:var(--gray-500);font-size:14px">Belum ada tier harga.</p>`;
      return;
    }
    list.innerHTML = tiers.map((t, i) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--gray-200)">
        <span style="font-size:14px">${t.minQty}${t.maxQty ? "–" + t.maxQty : "+"} pcs</span>
        <span style="font-weight:600;color:var(--navy)">Rp${Number(t.pricePerUnit).toLocaleString("id-ID")}</span>
        <button class="cart-remove" data-delete-tier="${i}">Hapus</button>
      </div>
    `).join("");
    $$("[data-delete-tier]", list).forEach((btn) =>
      btn.addEventListener("click", () => {
        const p2 = products.find((x) => x.id === currentTierProductId);
        p2.priceTiers.splice(Number(btn.dataset.deleteTier), 1);
        saveDraft();
        renderTiers();
        checkDraftBanner();
      })
    );
  }

  $("#admin-add-tier-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target).entries());
    const p = products.find((x) => x.id === currentTierProductId);
    if (!p) return;
    if (!p.priceTiers) p.priceTiers = [];
    p.priceTiers.push({
      minQty: Number(raw.min_qty),
      maxQty: raw.max_qty ? Number(raw.max_qty) : null,
      pricePerUnit: Number(raw.price_per_unit),
    });
    p.priceTiers.sort((a, b) => a.minQty - b.minQty);
    saveDraft();
    e.target.reset();
    renderTiers();
    checkDraftBanner();
  });

  $("#admin-tier-modal-close").addEventListener("click", () => $("#admin-tier-modal").classList.remove("open"));
  $("#admin-tier-modal").addEventListener("click", (e) => {
    if (e.target === $("#admin-tier-modal")) $("#admin-tier-modal").classList.remove("open");
  });

  // ---------- Export ke kode products.js ----------
  function buildProductsJsText() {
    const body = JSON.stringify(products, null, 2)
      // ganti null jadi null (sudah ok), rapikan key tanpa quote (opsional, biar mirip gaya asli — dilewati demi keamanan JSON valid)
      ;
    return `// Auto-generated dari Admin Panel — ${new Date().toLocaleString("id-ID")}
// Timpa isi js/products.js dengan konten di bawah ini, lalu upload ulang / redeploy.
window.EVENTOORY_PRODUCTS = ${body};

window.EVENTOORY_CATEGORIES = ${JSON.stringify(window.EVENTOORY_CATEGORIES || [], null, 2)};
`;
  }

  $("#admin-export-btn").addEventListener("click", () => {
    const text = buildProductsJsText();
    $("#admin-export-textarea").value = text;
    $("#admin-export-modal").classList.add("open");
  });
  $("#admin-export-modal-close").addEventListener("click", () => $("#admin-export-modal").classList.remove("open"));
  $("#admin-export-copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("#admin-export-textarea").value);
    $("#admin-export-copy").textContent = "Tersalin ✓";
    setTimeout(() => { $("#admin-export-copy").textContent = "Copy ke Clipboard"; }, 1500);
  });
  $("#admin-export-download").addEventListener("click", () => {
    const blob = new Blob([$("#admin-export-textarea").value], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.js";
    a.click();
    URL.revokeObjectURL(url);
  });

  // ---------- Reset draft (kembali ke isi products.js asli) ----------
  const resetDraftBtn = $("#admin-reset-draft-btn");
  if (resetDraftBtn) {
    resetDraftBtn.addEventListener("click", () => {
      if (!confirm("Buang semua perubahan yang belum di-export dan kembali ke isi js/products.js saat ini?")) return;
      localStorage.removeItem(DRAFT_KEY);
      loadProducts();
      renderProductList();
      checkDraftBanner();
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("eventoory_admin_session") === "1") {
      showDashboard();
    } else {
      showLogin();
    }
  });
})();
