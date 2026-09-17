// ============================================
// EVENTOORY.ID — MAIN LOGIC
// Nav, hero fill, products, modal, cart, checkout, WA float.
// TANPA DATABASE — sumber produk: window.EVENTOORY_PRODUCTS (js/products.js)
// ============================================
(function () {
  const CFG = window.EVENTOORY_CONFIG;
  const CATEGORIES = window.EVENTOORY_CATEGORIES || [];

  // ---------- Produk (langsung dari products.js, tanpa network call) ----------
  function getAllProducts() {
    return (window.EVENTOORY_PRODUCTS || []).filter((p) => p.available !== false);
  }

  function lowestPrice(product) {
    if (!product.priceTiers || !product.priceTiers.length) return null;
    return Math.min(...product.priceTiers.map((t) => Number(t.pricePerUnit)));
  }

  function findTierPrice(product, qty) {
    if (!product.priceTiers || !product.priceTiers.length) return null;
    const match = product.priceTiers.find(
      (t) => qty >= t.minQty && (t.maxQty === null || t.maxQty === undefined || qty <= t.maxQty)
    );
    return match ? Number(match.pricePerUnit) : null;
  }

  // ---------- Helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const waLink = (msg) =>
    `https://wa.me/${CFG.contact.whatsapp}?text=${encodeURIComponent(msg || "Halo Eventoory!")}`;

  function toast(msg, type = "") {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.className = "toast " + type;
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => el.classList.remove("show"), 3200);
  }

  function genOrderNumber() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `EV-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  // ---------- Cart (localStorage) ----------
  const CART_KEY = "eventoory_cart";
  const cart = {
    get() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } },
    set(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartBadge(); },
    add(item) {
      const items = cart.get();
      items.push({ ...item, _id: Date.now() + Math.random() });
      cart.set(items);
    },
    remove(id) { cart.set(cart.get().filter((i) => i._id !== id)); },
    clear() { cart.set([]); },
    count() { return cart.get().length; },
  };
  function updateCartBadge() {
    $$(".cart-badge").forEach((b) => {
      b.textContent = cart.count();
      b.style.display = cart.count() ? "inline-block" : "none";
    });
  }

  // ---------- Navbar ----------
  function initNav() {
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => links.classList.toggle("open"));
    }
  }

  // ---------- WA Float ----------
  function injectWaFloat() {
    if (document.body.dataset.page === "admin") return; // skip di halaman admin
    if ($(".wa-float")) return;
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = waLink("Halo Eventoory! Saya ingin bertanya.");
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Chat WhatsApp");
    a.innerHTML = `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.2c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.77.36-.26.29-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM16 4a12 12 0 0 0-10.4 18.02L4 28l6.1-1.6A12 12 0 1 0 16 4zm0 22a10 10 0 0 1-5.1-1.4l-.36-.22-3.62.95.97-3.53-.24-.36A10 10 0 1 1 16 26z"/></svg>`;
    document.body.appendChild(a);
  }

  // ---------- Footer / navbar auto-fill ----------
  function fillLayout() {
    const activePage = document.body.dataset.page || "";

    $$("[data-logo-light]").forEach((el) => (el.src = CFG.brand.logoLight));
    $$("[data-logo-dark]").forEach((el) => (el.src = CFG.brand.logoDark));

    $$(".nav-links a").forEach((a) => {
      if (a.dataset.page === activePage) a.classList.add("active");
    });

    updateCartBadge();

    const footer = $("[data-footer]");
    if (footer) {
      footer.innerHTML = `
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <img src="${CFG.brand.logoLight}" alt="${CFG.brand.name}">
              <p>${CFG.footer.description}</p>
              <div class="footer-socials">
                <a href="${CFG.socials.instagram}" target="_blank" aria-label="Instagram">IG</a>
                <a href="${CFG.socials.tiktok}" target="_blank" aria-label="TikTok">TT</a>
                <a href="${CFG.socials.youtube}" target="_blank" aria-label="YouTube">YT</a>
                <a href="${CFG.socials.email}" aria-label="Email">@</a>
              </div>
            </div>
            <div>
              <h5>Jelajahi</h5>
              <ul>
                <li><a href="index.html">Beranda</a></li>
                <li><a href="catalog.html">Katalog</a></li>
                <li><a href="about.html">Tentang</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contact.html">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h5>Kontak</h5>
              <ul>
                <li>📍 ${CFG.contact.address}</li>
                <li>📞 <a href="${waLink("Halo Eventoory!")}" target="_blank">${CFG.contact.whatsappDisplay}</a></li>
                <li>✉️ <a href="mailto:${CFG.contact.email}">${CFG.contact.email}</a></li>
              </ul>
            </div>
            <div>
              <h5>Akun</h5>
              <ul>
                <li><a href="admin.html">Admin Panel</a></li>
                <li><a href="checkout.html">Checkout</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>${CFG.footer.copyright}</div>
            <div>${CFG.brand.tagline}</div>
          </div>
        </div>
      `;
    }
  }

  // ---------- Home page ----------
  function initHome() {
    const hero = $("[data-hero]");
    if (hero) {
      hero.innerHTML = `
        <div class="container">
          <div class="hero-grid">
            <div>
              <div class="hero-badge">🎨 ${CFG.hero.badge}</div>
              <h1>${CFG.hero.titleLine1}<br><span class="accent">${CFG.hero.titleLine2}</span></h1>
              <p class="lead">${CFG.hero.subtitle}</p>
              <div class="hero-actions">
                <a href="${CFG.hero.primaryCta.href}" class="btn btn-primary">${CFG.hero.primaryCta.label} →</a>
                <a href="${CFG.hero.secondaryCta.href}" class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,.3)">${CFG.hero.secondaryCta.label}</a>
              </div>
              <div class="hero-tag">${CFG.brand.tagline}</div>
            </div>
            <div class="hero-visual">
              <div class="hero-chip top-left"><span class="dot">✨</span> Free Design<br><small style="font-weight:400;color:#6B7280">Konsultasi gratis</small></div>
              <img src="${CFG.brand.owlMark}" alt="Eventoory owl">
              <div class="hero-chip bottom-right"><span class="dot">🤝</span> 20+ Konveksi<br><small style="font-weight:400;color:#6B7280">Partner terpercaya</small></div>
            </div>
          </div>
        </div>
      `;
    }

    const strip = $("[data-cat-strip]");
    if (strip) {
      strip.innerHTML = CATEGORIES.filter(c => c !== "Semua").map((c) =>
        `<a href="catalog.html?cat=${encodeURIComponent(c)}" class="chip">${c}</a>`
      ).join("");
    }

    const stats = $("[data-stats]");
    if (stats) {
      stats.innerHTML = CFG.achievements.map((a) =>
        `<div class="stat"><div class="stat-value">${a.value}</div><div class="stat-label">${a.label}</div></div>`
      ).join("");
    }

    const feat = $("[data-featured-products]");
    if (feat) {
      const products = getAllProducts();
      feat.innerHTML = products.slice(0, 8).map(renderProductCard).join("");
      bindProductClicks(feat);
    }
  }

  // ---------- Product card render ----------
  function renderProductCard(p) {
    const min = lowestPrice(p);
    const priceLabel = min ? `Mulai dari Rp${min.toLocaleString("id-ID")}` : "Hubungi admin untuk harga";
    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-media">
          <span class="product-badge">${p.category}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div style="font-weight:600;color:var(--navy);font-size:14px">${priceLabel}</div>
          <div class="product-actions">
            ${p.materialLink ? `<a href="${p.materialLink}" target="_blank" class="btn btn-ghost">📄 Bahan</a>` : ""}
            ${p.colorLink ? `<a href="${p.colorLink}" target="_blank" class="btn btn-ghost">🎨 Warna</a>` : ""}
          </div>
          <button class="btn btn-navy product-request btn-block" data-open-product="${p.id}">Request Quote</button>
        </div>
      </div>
    `;
  }

  function bindProductClicks(root) {
    $$("[data-open-product]", root).forEach((btn) => {
      btn.addEventListener("click", () => openProductModal(btn.dataset.openProduct));
    });
    $$(".product-card", root).forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a") || e.target.closest("button")) return;
        openProductModal(card.dataset.productId);
      });
    });
  }

  // ---------- Catalog page ----------
  function initCatalog() {
    const grid = $("[data-catalog-grid]");
    const chips = $("[data-catalog-chips]");
    const search = $("[data-catalog-search]");
    if (!grid) return;

    const products = getAllProducts();
    const params = new URLSearchParams(location.search);
    let currentCat = params.get("cat") || "Semua";
    let currentQuery = "";

    chips.innerHTML = CATEGORIES.map((c) =>
      `<button class="chip ${c === currentCat ? "active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");

    function render() {
      let list = products;
      if (currentCat !== "Semua") list = list.filter((p) => p.category === currentCat);
      if (currentQuery) {
        const q = currentQuery.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      grid.innerHTML = list.length
        ? list.map(renderProductCard).join("")
        : `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray-500)">Produk tidak ditemukan.</div>`;
      bindProductClicks(grid);
    }

    $$("button", chips).forEach((b) =>
      b.addEventListener("click", () => {
        currentCat = b.dataset.cat;
        $$("button", chips).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        render();
      })
    );
    if (search) {
      search.addEventListener("input", (e) => {
        currentQuery = e.target.value;
        render();
      });
    }
    render();
  }

  // ---------- Product modal ----------
  function openProductModal(id) {
    const p = getAllProducts().find((x) => x.id === id);
    if (!p) return;
    let modal = $("#product-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "product-modal";
      modal.className = "modal-backdrop";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <div>
            <div style="color:var(--yellow);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">${p.category}</div>
            <h3>${p.name}</h3>
          </div>
          <button class="modal-close" aria-label="Close">×</button>
        </div>
        <div class="modal-img"><img src="${p.image}" alt="${p.name}"></div>
        <p class="modal-desc">${p.description}</p>
        <div class="modal-links">
          ${p.materialLink ? `<a href="${p.materialLink}" target="_blank" class="btn btn-ghost">📄 Katalog Bahan</a>` : ""}
          ${p.colorLink ? `<a href="${p.colorLink}" target="_blank" class="btn btn-ghost">🎨 Katalog Warna</a>` : ""}
        </div>
        <form data-quote-form>
          <div class="form-grid">
            <div class="form-group"><label>Nama Kamu*</label><input name="customer" required></div>
            <div class="form-group"><label>Nama Organisasi*</label><input name="organization" required></div>
            <div class="form-group"><label>Nomor WhatsApp*</label><input name="phone" required placeholder="08xxxx"></div>
            <div class="form-group"><label>Jumlah / Quantity*</label><input name="quantity" id="quote-qty-input" required type="number" min="1" value="10"></div>
            <div class="form-group full"><label>Catatan (bahan, warna, ukuran, deadline)</label><textarea name="notes" rows="3"></textarea></div>
          </div>
          <div id="quote-price-preview" style="background:var(--cream);border-radius:12px;padding:12px 16px;margin-bottom:12px;font-size:14px;color:var(--navy);font-weight:600"></div>
          <button type="submit" class="btn btn-primary btn-block" style="margin-top:8px">Add to Cart →</button>
        </form>
      </div>
    `;
    modal.classList.add("open");

    const qtyInput = $("#quote-qty-input", modal);
    const pricePreview = $("#quote-price-preview", modal);

    function updatePricePreview() {
      const qty = Number(qtyInput.value) || 0;
      const unitPrice = findTierPrice(p, qty);
      if (!unitPrice) {
        pricePreview.textContent = "Jumlah di luar rentang harga yang tersedia — hubungi admin.";
        pricePreview.dataset.unitPrice = "";
        return;
      }
      const subtotal = unitPrice * qty;
      pricePreview.innerHTML = `Rp${unitPrice.toLocaleString("id-ID")} / pcs &nbsp;×&nbsp; ${qty} pcs &nbsp;=&nbsp; <span style="color:var(--yellow-soft);background:var(--navy);padding:2px 8px;border-radius:6px">Rp${subtotal.toLocaleString("id-ID")}</span>`;
      pricePreview.dataset.unitPrice = unitPrice;
    }
    qtyInput.addEventListener("input", updatePricePreview);
    updatePricePreview();

    const close = () => modal.classList.remove("open");
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    $(".modal-close", modal).addEventListener("click", close);

    $("[data-quote-form]", modal).addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const unitPrice = Number(pricePreview.dataset.unitPrice) || 0;
      if (!unitPrice) {
        toast("Jumlah di luar rentang harga. Hubungi admin untuk quote khusus.", "error");
        return;
      }
      cart.add({
        productId: p.id,
        name: p.name,
        image: p.image,
        category: p.category,
        unitPrice,
        ...data,
      });
      toast(`${p.name} ditambahkan ke keranjang`, "success");
      close();
    });
  }

  // ---------- Checkout (langsung ke WhatsApp, tanpa simpan ke database) ----------
  function initCheckout() {
    const list = $("[data-cart-list]");
    const form = $("[data-checkout-form]");
    if (!list) return;

    function render() {
      const items = cart.get();
      if (!items.length) {
        list.innerHTML = `<div class="cart-empty">Keranjang kosong. <a href="catalog.html" style="color:var(--navy);font-weight:600">Lihat katalog →</a></div>`;
        return;
      }
      list.innerHTML = items.map((it) => `
        <div class="cart-item">
          <img src="${it.image}" alt="${it.name}">
          <div class="cart-item-info">
            <strong>${it.name}</strong>
            <span>${it.category} • Qty: ${it.quantity} • ${it.organization}</span>
            <span>Rp${Number(it.unitPrice).toLocaleString("id-ID")}/pcs = Rp${(Number(it.unitPrice) * Number(it.quantity)).toLocaleString("id-ID")}</span>
            ${it.notes ? `<span>📝 ${it.notes}</span>` : ""}
          </div>
          <button class="cart-remove" data-remove="${it._id}">Hapus</button>
        </div>
      `).join("") + `
        <div style="display:flex;justify-content:space-between;padding-top:16px;font-weight:700;color:var(--navy);font-size:16px">
          <span>Total</span>
          <span>Rp${items.reduce((sum, it) => sum + Number(it.unitPrice) * Number(it.quantity), 0).toLocaleString("id-ID")}</span>
        </div>
      `;
      $$("[data-remove]", list).forEach((b) =>
        b.addEventListener("click", () => { cart.remove(Number(b.dataset.remove)); render(); })
      );
    }
    render();

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const items = cart.get();
        if (!items.length) return toast("Keranjang masih kosong.", "error");
        const data = Object.fromEntries(new FormData(form).entries());
        const orderNumber = genOrderNumber();

        const waMsg = CFG.waMessageTemplate({
          customer: data.customer,
          organization: data.organization,
          phone: data.phone,
          items: items.map((i) => `• ${i.name} — ${i.quantity} pcs (Rp${(i.unitPrice * i.quantity).toLocaleString("id-ID")})${i.notes ? ` — ${i.notes}` : ""}`).join("\n"),
          notes: `${data.notes || "-"}\n\nNo. Order: ${orderNumber}`,
        });

        cart.clear();
        render();
        toast(`Pesanan ${orderNumber} berhasil dibuat!`, "success");

        setTimeout(() => {
          window.open(waLink(waMsg), "_blank");
          document.querySelector("[data-checkout-success]").style.display = "block";
          form.style.display = "none";
        }, 400);
      });
    }
  }

  // ---------- FAQ ----------
  function initFAQ() {
    $$(".faq-item").forEach((item) => {
      $(".faq-q", item).addEventListener("click", () => item.classList.toggle("open"));
    });
  }

  // ---------- Contact form ----------
  function initContact() {
    const form = $("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const msg = `Halo Eventoory! Nama: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
      window.open(waLink(msg), "_blank");
      toast("Membuka WhatsApp...", "success");
      form.reset();
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    fillLayout();
    injectWaFloat();
    initHome();
    initCatalog();
    initCheckout();
    initFAQ();
    initContact();
    // initAdmin() sengaja tidak dipanggil di sini — admin.html punya js/admin.js sendiri
  });
})();
