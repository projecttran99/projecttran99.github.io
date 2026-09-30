# Tran99.com — Adarent CMS Modernization Engine

<div align="center">

![Adarent CMS](https://cloud.klikada.com/image/klikada-logo-lingkaran.png)

### Solusi Jamstack Modern Google AMP HTML & Adarent CMS
**Dikembangkan oleh [klikada.com](https://klikada.com) | Arsitektur oleh [H. Denny Rakhmad Widi Ashari, S.AP., M.E.](https://masden.klikada.com/)**

[![Google AMP Valid](https://img.shields.io/badge/Google%20AMP-100%25%20Valid-005AF0?style=for-the-badge&logo=amp&logoColor=white)](https://validator.amp.dev/)
[![SSG Jekyll](https://img.shields.io/badge/Jekyll-4.x%20Safe%20Mode-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![CMS Adarent](https://img.shields.io/badge/CMS-Adarent%20(Sveltia)-0284C7?style=for-the-badge)](https://tran99.com/admin/)
[![Hosting GitHub Pages](https://img.shields.io/badge/Hosting-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-NetworkFirst%20SW-5A0FC8?style=for-the-badge)](https://web.dev/progressive-web-apps/)

</div>

---

## 🌟 Tentang Proyek

Repositori ini merupakan sistem portal web resmi dan mesin pemasaran digital untuk **Tran99.com** (Penyedia Jasa Rental Mobil Surabaya & Sewa Mobil Jawa Timur Terpercaya). 

Situs ini dibangun menggunakan arsitektur **Jamstack** generasi terbaru yang memadukan kecepatan ekstrim **Google AMP HTML**, keandalan **Jekyll Static Site Generator**, serta kemudahan pengelolaan konten terdesentralisasi melalui **Adarent CMS**.

---

## 🏢 Kepemilikan, Arsitektur & Hak Cipta

- **Pengembang & Penyedia Solusi:** [klikada.com](https://klikada.com)
- **Kreator & Lead System Architect:** **H. Denny Rakhmad Widi Ashari, S.AP., M.E.** ([masden.klikada.com](https://masden.klikada.com/))
- **Status Lisensi:** **Tanpa Lisensi Terbuka (No Open Source License / Proprietary)**
- **Hak Cipta (Copyright):**  
  > **© 2018 – 2026 klikada.com. Seluruh Hak Cipta Dilindungi Undang-Undang.**  
  > Repositori, source code, aset desain, dan arsitektur Adarent CMS ini bersifat eksklusif dan proprietary. Dilarang menggandakan, mendistribusikan ulang, menyalin, atau memperjualbelikan kode sumber ini tanpa persetujuan tertulis resmi dari manajemen **klikada.com**.

---

## 🚀 Keunggulan Arsitektur Teknis

### 1. 100% Google AMP HTML Valid
- Seluruh antarmuka publik (*Public Facing Pages*) berstatus **100% Valid Google AMP HTML**.
- CSS kustom dioptimalkan secara ketat di bawah batas kuota 75 KB per halaman (`<style amp-custom>`).
- Pengalaman akses instan tanpa penundaan rendering JavaScript berat (*zero main-thread blocking*).

### 2. Adarent CMS (Content Management Layer)
- Dashboard admin modern berbasis SPA (Single Page Application) di `/admin/` menggunakan **Sveltia CMS** engine dengan *branding* eksklusif **Adarent CMS**.
- Langsung terhubung dengan GitHub Git API tanpa memerlukan backend server database (Serverless & Flat-file).
- **Manajemen Armada Mobil:** Edit tarif sewa, fasilitas, highlight keunggulan, dan foto mobil secara visual.
- **Manajemen Multi-Author Blog:** Pengelolaan data penulis terpusat dengan profil otomatis, sapaan chat WhatsApp interaktif, dan tautan media sosial.

### 3. SEO & Visibilitas Mesin Pencari Tingkat Tinggi
- **Dynamic Domain Resolution:** Semua URL kanonikal, schema microdata (`ld+json`), feed RSS/Atom, robots, dan sitemap di-generate secara dinamis dan presisi mengacu pada domain utama `url:` di `_config.yml`.
- **Sitemap XML Terpadu:** Mengindeks halaman statis utama, 9 halaman produk armada mobil (priority `0.9`), dan 58 artikel blog lengkap dengan tag `lastmod` dinamis.
- **Google News Sitemap (`news-sitemap.xml`):** Terformat sesuai standar agregasi berita Google News.
- **Microdata Schema.org:** Implementasi `AutoRental` lokal SEO dan `BreadcrumbList` terstruktur.

### 4. Service Worker Modern & PWA (`sw.js`)
- Mengadopsi strategi **NetworkFirst** untuk semua halaman HTML guna memastikan pengunjung dan bot Google selalu memperoleh konten artikel dan harga terbaru.
- Mengadopsi strategi **StaleWhileRevalidate** untuk aset media di `/photos/` dan `/static/`.
- Memiliki proteksi isolasi **Admin Bypass** agar dashboard CMS tidak terganggu oleh cache offline.

---

## 📂 Struktur Inventaris & Koleksi Data

| Komponen | Lokasi Direktori | Deskripsi |
| :--- | :--- | :--- |
| **Artikel Blog** | `_posts/` | 58 artikel terbit berkualitas tinggi (rentang 2018–2026) |
| **Profil Penulis** | `_authors/` | Database profil penulis blog (*Admin Tran99* & *H. Denny Rakhmad Widi Ashari*) |
| **Armada Mobil** | `_data-products/` | 9 unit kendaraan rental resmi dengan tarif dan spesifikasi lengkap |
| **Galeri Aktivitas** | `_data-gallery-picture/` | Dokumentasi operasional perjalanan pelanggan |
| **Galeri Instagram** | `_data-gallery/` | Embed dinamis postingan Instagram Tran99 |
| **Video TikTok** | `_data-tiktok/` | Embed video edukasi perjalanan armada |
| **Aset Gambar** | `photos/`, `static/` | 202 file media gambar permanen beresolusi optimal |

---

## 🛠️ Panduan Pengembangan Lokal

### Prasyarat Sistem
- **Ruby:** >= 3.2 (Disarankan Ruby 3.4.1)
- **Node.js:** >= 20 LTS (Disarankan v22.x)
- **Jekyll:** 4.x

### Menjalankan Proyek di Komputer Lokal
```bash
# 1. Masuk ke direktori repositori
cd projecttran99.github.io

# 2. Build situs statis Jekyll
jekyll build

# 3. Jalankan server lokal
jekyll serve --livereload --port 4000

# 4. Jalankan rangkaian validasi kualitas otomatis
node scripts/validate-amp.js
node scripts/validate-seo.js
node scripts/validate-diff.js
```

---

## 🛡️ Aturan Keamanan & Disiplin Git (AGENTS.md)

1. **Zero Destructive Action:** Dilarang menghapus artikel, mengubah permalink lama (`/:year/:month/:day/:slug/`), atau menghapus aset media tanpa persetujuan eksplisit.
2. **AMP Compliance:** Perubahan kode dilarang keras merusak validitas Google AMP.
3. **Deployment Lock:** Branch `master` berstatus terkunci (*production locked*). Pekerjaan dilakukan pada branch `modernization/phase-3-adarent`. Deployment ke master hanya diizinkan jika pengguna memberikan instruksi:
   > `"DEPLOY APPROVED"`

---

<div align="center">

**Adarent CMS — Developed with passion by [klikada.com](https://klikada.com)**  
*Dosen, Peneliti, Founder klikada.com, Traveler & Solution Architect: [H. Denny Rakhmad Widi Ashari, S.AP., M.E.](https://masden.klikada.com/)*

</div>
