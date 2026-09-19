// ============================================
// EVENTOORY.ID — CENTRAL CONFIG
// Edit brand info, contact, WA number, hero text here.
// ============================================

// Tambahkan di dalam file js/config.js
const EVENTOORY_STATS = {
    produk: "70+",
    konsumen: "8.500+",
    partner: "1.000+",
    sponsor: "500+"
};

const STORES = [
    {
        nama: "Store Pusat (Eventoory.id)",
        alamat: "Dramaga Cantik K22, Bogor",
        gmaps: "https://maps.app.goo.gl/...", // Isi link aslinya
        wa: "6281234567890",
        email: "halo@eventoory.id"
    },
    {
        nama: "Cabang 1 (Eventoory Padang)",
        alamat: "Jl. Contoh Padang No 1",
        gmaps: "https://maps.app.goo.gl/...", // Isi link aslinya
        wa: "6280987654321",
        email: "padang@eventoory.id"
    }
];

window.EVENTOORY_CONFIG = {

  sheets: {
    productsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIwaKXHhPT-qybtSv6PSyp2XwhlEN2czwraWzwoY6jLxITrzvbV-cngjiBdhXKSLDGnFh-VaWdtnMS/pub?gid=0&single=true&output=csv",
    tiersCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIwaKXHhPT-qybtSv6PSyp2XwhlEN2czwraWzwoY6jLxITrzvbV-cngjiBdhXKSLDGnFh-VaWdtnMS/pub?gid=785795995&single=true&output=csv",
  },

  brand: {
    name: "Eventoory.id",
    tagline: "#SolusiKelengkapanOrganisasimu",
    logoLight: "images/logo-light.png", // logo untuk background gelap
    logoDark: "images/logo-dark.png",   // logo untuk background terang
    owlMark: "images/owl-mark.png",
  },

  // Warna brand (juga bisa diubah di css/style.css → :root)
  colors: {
    navy: "#0B1F4D",
    navyDark: "#081737",
    yellow: "#F5C518",
    yellowSoft: "#FFD75E",
    cream: "#FBF7EC",
  },

  hero: {
    badge: "Marketplace Kelengkapan Organisasi",
    titleLine1: "Solusi Kelengkapan Organisasimu,",
    titleLine2: "dalam Satu Tempat.",
    subtitle:
      "Dari banner, lanyard, ID card, sampai PDH, Eventoory membantu organisasimu tampil profesional dengan mudah.",
    primaryCta: { label: "Pesan Sekarang", href: "catalog.html" },
    secondaryCta: { label: "Pelajari Eventoory", href: "about.html" },
  },

  // Angka pencapaian (editable)
  achievements: [
    { value: "70+", label: "Variasi Produk" },
    { value: "8.500+", label: "Konsumen dalam Setahun" },
    { value: "1.000+", label: "Partnership" },
    { value: "500+", label: "Sponsorship" },
  ],

  contact: {
    whatsapp: "6285777104953",     // format internasional tanpa '+'
    whatsappDisplay: "+62 857-7710-4953",
    email: "eventoory.id@gmail.com",
    address: "Jl. Dramaga Cantik No.22 Residence, Blok K, Dramaga, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680",
    mapsEmbed:
      "https://maps.app.goo.gl/egry33cSHjY4rd7EA",
  },

  socials: {
    instagram: "https://instagram.com/eventoory.id",
    tiktok: "https://tiktok.com/@eventoory.id",
    email: "mailto:eventoory.id@gmail.com",
  },



  // Default pesan WhatsApp saat request quote / checkout
  waMessageTemplate: (payload) =>
    `Halo Eventoory! Saya ingin request quote:\n\n` +
    `Nama: ${payload.customer || "-"}\n` +
    `Organisasi: ${payload.organization || "-"}\n` +
    `WA: ${payload.phone || "-"}\n\n` +
    `Pesanan:\n${payload.items || "-"}\n\n` +
    `Catatan: ${payload.notes || "-"}`,

  footer: {
    description:
      "Marketplace kelengkapan merchandise organisasi Indonesia. Pesan banner, lanyard, ID card, PDH, kaos, tote bag, dan lainnya dalam satu tempat.",
    copyright: "© 2026 Eventoory.id — All rights reserved.",
  },
};

