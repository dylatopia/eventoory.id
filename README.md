# Eventoory.id — Static Website

Marketplace kelengkapan organisasi (banner, lanyard, ID card, PDH, kaos, tote bag, merchandise).
Dibangun dengan **HTML + CSS + Vanilla JS** — tanpa build tool, tanpa framework.

Buka `index.html` di browser (atau serve dengan `python -m http.server`).

## 📁 Struktur

```
eventoory/
├── index.html          ← Homepage
├── catalog.html        ← Katalog produk + search + filter
├── about.html
├── contact.html        ← Info + map + form
├── faq.html
├── checkout.html       ← Ringkasan cart + form pesanan
├── admin.html          ← Placeholder login admin
├── css/style.css       ← Semua styling + warna brand
├── js/config.js        ← ⚙️ WA number, email, hero, brand, achievements
├── js/products.js      ← 📦 Daftar produk (edit di sini)
├── js/main.js          ← Logic: nav, cart, modal, WA float, Google Sheets
├── images/             ← Logo & foto produk lokal
└── README.md
```

## ✏️ Yang Bisa Diedit dengan Mudah

### 1. Logo & Warna Brand
- **Logo:** ganti file di `images/logo-light.png`, `images/logo-dark.png`, `images/owl-mark.png`.
- **Warna brand:** ubah nilai di **`css/style.css`** bagian `:root` (variabel `--navy`, `--yellow`, dll.), atau di `js/config.js` (untuk referensi).

### 2. Teks Hero, Achievements, Kontak
Edit **`js/config.js`**:
- `hero.titleLine1` / `titleLine2` / `subtitle`
- `achievements[]` — angka pelanggan, organisasi, produk, konveksi
- `contact.whatsapp` — format internasional tanpa `+` (mis. `6285777886653`)
- `contact.whatsappDisplay` — versi yang terlihat user
- `contact.email`, `contact.address`, `contact.mapsEmbed`
- `socials.instagram/tiktok/youtube/email`
- `footer.description`, `footer.copyright`

Semua perubahan langsung tampil di semua halaman.

### 3. Produk
Edit **`js/products.js`**. Tambah/ubah/hapus object di array `EVENTOORY_PRODUCTS`.

Field per produk:
```js
{
  id: "x-banner",                  // unik, huruf kecil
  name: "X-Banner",
  category: "Banner",              // harus cocok dengan EVENTOORY_CATEGORIES
  image: "images/foto.jpg",        // atau URL absolut
  description: "…",
  materialLink: "https://drive.google.com/…",  // katalog bahan (Google Drive)
  colorLink:    "https://drive.google.com/…",  // katalog warna
  available: true
}
```

Kategori diatur di array `EVENTOORY_CATEGORIES` (dipakai untuk chip filter).

### 4. Tombol Google Drive
Cukup tempel URL Google Drive pada field `materialLink` dan `colorLink` per produk (`js/products.js`).

### 5. WhatsApp Number
`js/config.js` → `contact.whatsapp`. Semua tombol WA (floating, footer, kontak, checkout, request quote) otomatis pakai nomor ini.

### 6. Google Sheets Integration (Simpan Pesanan)
1. Buat Google Sheet baru. Header kolom saran:
   `submittedAt | customer | organization | phone | email | address | notes | items`
2. **Extensions → Apps Script**, tempel:
   ```js
   const SHEET_ID = "ISI_ID_SHEET_KAMU";
   function doPost(e) {
     const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Sheet1");
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([
       d.submittedAt, d.customer, d.organization, d.phone, d.email,
       d.address, d.notes, JSON.stringify(d.items)
     ]);
     return ContentService.createTextOutput(JSON.stringify({ok:true}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. **Deploy → New deployment → Web app → Anyone**. Copy URL.
4. Buka `js/config.js`:
   ```js
   googleSheets: {
     endpoint: "https://script.google.com/macros/s/xxxx/exec",
     enabled: true,
   }
   ```
5. Selesai. Setiap checkout dikirim ke Google Sheet + WhatsApp admin.

> Selama `enabled: false`, pesanan hanya diteruskan ke WhatsApp admin (dan payload dicetak ke console).

### 7. Floating WhatsApp Button
Aktif di semua halaman otomatis. Nomor & pesan default diambil dari `js/config.js`.

### 8. Map di halaman Contact
`js/config.js` → `contact.mapsEmbed`. Cara ambil URL:
1. Google Maps → cari lokasi → **Share → Embed a map**.
2. Copy URL di `src="..."` atau pakai URL sederhana `https://www.google.com/maps?q=…&output=embed`.

### 9. Admin Login
`admin.html` adalah **placeholder**. Kalau butuh admin nyata, hubungkan ke Firebase Auth / Supabase / backend sendiri di `main.js` fungsi `initAdmin`.

## 🚀 Deploy

Karena murni static, bisa langsung upload ke:
- **Netlify:** drag & drop folder.
- **Vercel:** `vercel --prod`.
- **GitHub Pages:** push ke branch `main`, aktifkan Pages.
- **Hosting biasa:** upload via FTP.

## 🧩 Menambahkan Halaman Baru
1. Duplikat `about.html`, ubah judul & konten.
2. Tambahkan link di `<nav class="nav-links">` di semua HTML.
3. Selesai.

---
Made with ❤️ for Indonesian organizations.
