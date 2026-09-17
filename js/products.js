// ============================================
// DAFTAR PRODUK — SUMBER DATA UTAMA (tanpa database)
// Ini adalah "database" katalog. Diedit lewat 2 cara:
//   1) Langsung edit array di bawah manual.
//   2) Lewat admin.html → tombol "Export products.js" → copy hasilnya
//      ke sini, lalu upload ulang / redeploy situs.
// Setiap produk: id, name, category, image, description,
// materialLink & colorLink (Google Drive), available, priceTiers.
// priceTiers: [{ minQty, maxQty (null = tak terbatas), pricePerUnit }]
// ============================================
window.EVENTOORY_PRODUCTS = [
  {
    id: "x-banner",
    name: "X-Banner",
    category: "Banner",
    image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?w=800",
    description:
      "Banner berdiri lengkap dengan tiang, cocok untuk booth event, seminar, dan bazar organisasi.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 1, maxQty: 4, pricePerUnit: 95000 },
      { minQty: 5, maxQty: null, pricePerUnit: 85000 },
    ],
  },
  {
    id: "lanyard-custom",
    name: "Lanyard Custom",
    category: "Lanyard",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800",
    description:
      "Tali ID card custom sablon 2 sisi dengan berbagai warna dan bahan polyester premium.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 20, maxQty: 99, pricePerUnit: 12000 },
      { minQty: 100, maxQty: null, pricePerUnit: 9500 },
    ],
  },
  {
    id: "idcard-case",
    name: "ID Card + Case",
    category: "ID Card",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    description:
      "Cetak ID card custom lengkap dengan case pelindung transparan tahan lama.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 20, maxQty: null, pricePerUnit: 15000 },
    ],
  },
  {
    id: "pdh-american-drill",
    name: "PDH American Drill",
    category: "PDH & Jaket",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description:
      "PDH premium dari bahan American Drill premium, jahitan rapi dan bordir tajam.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 12, maxQty: 49, pricePerUnit: 155000 },
      { minQty: 50, maxQty: null, pricePerUnit: 140000 },
    ],
  },
  {
    id: "jaket-organisasi",
    name: "Jaket Organisasi",
    category: "PDH & Jaket",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    description: "Jaket custom dengan bordir logo organisasi, bahan fleece hangat.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 12, maxQty: null, pricePerUnit: 135000 },
    ],
  },
  {
    id: "hoodie-custom",
    name: "Hoodie Custom",
    category: "PDH & Jaket",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    description: "Hoodie fleece premium dengan sablon / bordir custom.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 12, maxQty: null, pricePerUnit: 130000 },
    ],
  },
  {
    id: "polo-shirt",
    name: "Polo Shirt",
    category: "Kaos & Polo",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
    description: "Polo lacoste PK cotton pique dengan bordir logo.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 12, maxQty: 49, pricePerUnit: 85000 },
      { minQty: 50, maxQty: null, pricePerUnit: 75000 },
    ],
  },
  {
    id: "kaos-event",
    name: "Kaos Event",
    category: "Kaos & Polo",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description: "Kaos cotton combed untuk panitia & peserta event.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 20, maxQty: 99, pricePerUnit: 55000 },
      { minQty: 100, maxQty: null, pricePerUnit: 48000 },
    ],
  },
  {
    id: "tote-bag",
    name: "Tote Bag",
    category: "Tote Bag",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
    description: "Totebag blacu / kanvas dengan sablon custom.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 20, maxQty: null, pricePerUnit: 25000 },
    ],
  },
  {
    id: "sticker-custom",
    name: "Sticker Custom",
    category: "Merchandise",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800",
    description: "Sticker vinyl / chromo cetak full color, potong sesuai desain.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 50, maxQty: null, pricePerUnit: 3000 },
    ],
  },
  {
    id: "sertifikat",
    name: "Sertifikat",
    category: "Merchandise",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800",
    description: "Cetak sertifikat event dengan desain custom, kertas jasmine / concorde.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 20, maxQty: null, pricePerUnit: 8000 },
    ],
  },
  {
    id: "rompi-panitia",
    name: "Rompi / Vest Panitia",
    category: "PDH & Jaket",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800",
    description: "Rompi panitia bahan drill dengan bordir logo.",
    materialLink: "https://drive.google.com/",
    colorLink: "https://drive.google.com/",
    available: true,
    priceTiers: [
      { minQty: 12, maxQty: null, pricePerUnit: 90000 },
    ],
  },
];

window.EVENTOORY_CATEGORIES = [
  "Semua",
  "Banner",
  "Lanyard",
  "ID Card",
  "PDH & Jaket",
  "Kaos & Polo",
  "Tote Bag",
  "Merchandise",
];
