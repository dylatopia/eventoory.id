# Eventoory.id

**#SolusiKelengkapanOrganisasimu**

Website marketplace kelengkapan organisasi dan acara dalam satu tempat: PDH, kaos, lanyard, ID card, banner, tote bag, merchandise, dan lainnya. Eventoory juga membuka kerja sama partnership dan sponsorship untuk organisasi dengan keuangan terbatas.

🔗 Live: https://eventooryid.vercel.app

## Yang Bisa Dilakukan di Website

- **Lihat katalog** produk dengan pencarian dan filter kategori
- **Cek harga otomatis** sesuai jumlah pesanan (harga per tier)
- **Buka katalog bahan dan warna** lewat link Google Drive
- **Pesan lewat keranjang dan checkout**: pesanan terkirim ke WhatsApp admin dalam format rapi (data pemesan, daftar item, total, nomor order)
- **Ajukan proposal** partnership/sponsorship di halaman Kemitraan
- **Lihat lokasi** toko pusat (Bogor) dan cabang (Padang), lengkap dengan peta, WhatsApp, dan email
- **Baca testimoni** dari ulasan pelanggan

## Halaman

| Halaman | Isi |
|---|---|
| `index.html` | Beranda: about, statistik, keunggulan, produk populer, testimoni, partner, lokasi |
| `catalog.html` | Katalog produk |
| `about.html` | Tentang Eventoory |
| `faq.html` | Pertanyaan umum |
| `kemitraan.html` | Syarat dan pengajuan partnership/sponsorship |
| `contact.html` | Kontak dan form pesan |
| `checkout.html` | Konfirmasi pesanan |

## Teknologi

HTML, CSS, dan JavaScript tanpa framework. Katalog produk dan harga dibaca dari **Google Sheets**, tanpa database. Hosting di **Vercel** dengan deploy otomatis dari GitHub.

## Cara Mengelola

- **Produk, harga, foto, link bahan/warna:** edit di Google Sheets. Perubahan tampil otomatis saat halaman dimuat ulang, tanpa deploy.
- **Teks beranda, statistik, kontak, nomor WhatsApp, sosmed:** edit `js/config.js`.
- **Warna brand:** edit variabel `:root` di `css/style.css`.
- **Update website:** edit file lalu commit dan push ke GitHub. Vercel akan deploy ulang dalam 1–2 menit.



---
Dikembangkan untuk Eventoory.id
