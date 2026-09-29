# BASELINE AUDIT REPORT: TRAN99.COM (ADARENT CMS)
**Tanggal Audit:** 29 September 2026  
**Lead Auditor:** Principal Software Architect & Technical Lead (Adarent CMS)  
**Target Repository:** `projecttran99/projecttran99.github.io`  
**Production URL:** [https://tran99.com](https://tran99.com)  
**Baseline Git Commit SHA:** `cf36a70f8d3dff97f7191790ad60e19f340a3887`  
**Branch:** `master`

---

## 1. Executive Summary

Audit teknis menyeluruh telah dilakukan terhadap repository GitHub `projecttran99.github.io` dan situs produksi aktif `https://tran99.com`. Website ini beroperasi sebagai platform rental mobil Surabaya / sewa mobil Surabaya berbasis Jekyll static site generator yang di-host di GitHub Pages dengan frontend validasi Google AMP HTML.

Audit ini mengonfirmasi prinsip inti **"SAFE UPGRADE, NOT REBUILD FROM ZERO"**:
1. Seluruh 58 artikel blog berbobot SEO sejak tahun 2018–2026 harus dipertahankan 100% tanpa perubahan permalink, slug, ID, maupun gambar.
2. Seluruh 202 aset gambar lokal dan 70 URL terindeks harus dijaga integritasnya.
3. Ditemukan sejumlah anomali teknis dan peluang optimasi SEO & AMP yang signifikan pada implementasi existing tanpa memerlukan perombakan arsitektur yang destruktif.

---

## 2. Git & Environment Baseline

| Parameter | Kondisi Existing | Status |
| :--- | :--- | :--- |
| **Current Branch** | `master` | Up-to-date dengan `origin/master` |
| **Commit Baseline** | `cf36a70f8d3dff97f7191790ad60e19f340a3887` | Tercatat & terkunci |
| **Working Tree** | Bersih (clean) | Terverifikasi |
| **Ruby Version** | Ruby 3.4.1 (rbenv) | Kompatibel |
| **Bundler Version** | Bundler 2.7.2 | Aktif |
| **Node.js Version** | Node.js v22.18.0 (nvm) | Kompatibel untuk build tools & validation |
| **Jekyll Version** | Jekyll 4.4.1 | Berhasil build dalam 0.86 detik |
| **Gemfile / package.json** | Belum ada di root | Perlu ditambahkan untuk standarisasi dependency |

---

## 3. Inventory Baseline Summary

Telah dihasilkan 7 file inventory machine-readable di direktori root dan `inventory/`:

1. **`existing-url-inventory.json`**: 70 URL aktif
   - 1 Homepage (`/`)
   - 4 Static pages (`/blog/`, `/contact/`, `/gallery/`, `/product/`)
   - 58 Artikel blog (`/YYYY/MM/DD/slug/`)
   - 7 Core files (`/404.html`, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/sw.js`, `/sw.html`, `/manifest.json`)
2. **`existing-article-inventory.json`**: 58 artikel (rentang publikasi 2018 s/d 2026).
3. **`existing-image-inventory.json`**: 202 gambar terdata (`photos/`, `static/`, `images/`, `favicon.ico`).
4. **`existing-id-inventory.json`**: 58 ID artikel unik + seluruh HTML element IDs (`sidebar`, `menu-button`, dll).
5. **`existing-seo-metadata.json`**: 63 entri metadata lengkap (Homepage, 4 Page utama, 58 Artikel).
6. **`existing-internal-links.json`**: 764 internal link aktif yang telah dipetakan.
7. **`existing-amp-pages.json`**: 63 halaman AMP dengan tracking ukuran CSS kustom (semua < 31 KB, jauh di bawah batas AMP 75 KB).

---

## 4. Temuan Audit Teknis & SEO Kritis (Existing Flaws & Vulnerabilities)

Dari audit mendalam terhadap kode sumber dan situs live, ditemukan beberapa masalah krusial:

### A. Konfigurasi `_config.yml` dan Sitemap XML Relatif
- **Masalah:** Di `_config.yml` didefinisikan `siteurl: https://tran99.com`, namun variabel `url:` tidak didefinisikan.
- **Dampak:** Template `sitemap.xml` yang menggunakan `{{ site.url }}{{ page.url }}` menghasilkan URL relatif seperti `<loc>/blog/</loc>` dan `<loc>/2018/04/12/beejay-bakau-resort/</loc>` alih-alih URL absolut valid (`https://tran99.com/blog/`). Ini melanggar protokol standar Google Search Console dan merugikan perayapan bot.
- **Solusi Rekomendasi:** Definisikan `url: "https://tran99.com"` pada `_config.yml`.

### B. Halaman 404 Terindeks di Sitemap
- **Masalah:** Di `sitemap.xml`, perulangan `{% for page in site.pages %}` memasukkan `/404.html` ke dalam sitemap resmi dengan priority 1.0.
- **Dampak:** Search engine mengindeks halaman error 404.
- **Solusi Rekomendasi:** Tambahkan filter `{% if page.url contains '404' %}{% else %}` atau tandai `sitemap: false` pada frontmatter 404.

### C. Halaman 404 Memuat Boilerplate Firebase Bawaan
- **Masalah:** File `404.html` berisi teks template Firebase mentah: *"Why am I seeing this? You may have deployed the wrong directory for your application. Check your firebase.json..."* beserta logo Firebase SVG base64.
- **Dampak:** Merusak kredibilitas profesionalitas brand Tran99 jika pengunjung mengalami broken link.
- **Solusi Rekomendasi:** Desain ulang 404 dengan pesan ramah bertema rental mobil, navigasi kembali ke Beranda/WhatsApp, dan tetap patuh validasi AMP.

### D. 8 Artikel Mengalami Missing `title:` di Frontmatter
- **Masalah:** 8 artikel (semua terbitan 2018) hanya memiliki `text-title:` tetapi tidak memiliki field `title:`.
- **Dampak:** Karena `_includes/metadata.html` memanggil `<title>{{ page.title }} | {{ site.company }}</title>`, title tag di browser/SERP pada 8 artikel tersebut menjadi kosong di depan: `" | Tran99.com"`.
- **Solusi Rekomendasi:** Tambahkan fallback Liquid: `{{ page.title | default: page.text-title }}` pada `metadata.html` dan pertahankan data asli pada konten.

### E. Struktur Heading Melanggar Hierarki SEO (`<h3>` alih-alih `<h1>`)
- **Masalah:** Di `_layouts/post.html`, judul artikel dibungkus dalam tag `<h3>`:
  ```html
  <div class="vs-section-title text-center">
      <h3><span class="text-title">{{ page.text-title }}</span></h3>
      <h5><span class="post">Writer : {{ page.writer }}</span></h5>
  </div>
  ```
- **Dampak:** Halaman artikel tidak memiliki elemen `<h1>` tunggal yang jelas untuk judul konten utama. Ini merupakan pelanggaran SEO On-Page fundamental.
- **Solusi Rekomendasi:** Ubah tag pembungkus judul di `_layouts/post.html` menjadi `<h1>` dengan styling CSS yang harmonis dan responsif.

### F. Tag Open Graph `og:url` Terkunci ke Homepage
- **Masalah:** Di `_includes/metadata.html`, baris 20 berbunyi `<meta property="og:url" content="{{ site.siteurl }}" />` secara statis tanpa append `{{ page.url }}`.
- **Dampak:** Setiap artikel atau halaman yang dibagikan ke WhatsApp/Facebook akan menganggap URL kanonikal media sosialnya adalah homepage `https://tran99.com`.
- **Solusi Rekomendasi:** Perbaiki menjadi `<meta property="og:url" content="{{ site.url }}{{ page.url | replace:'index.html','' }}" />`.

### G. Residu Kode Lama (Legacy WordPress Yoast & Pingback)
- **Masalah:** File `metadata.html` memuat `<link rel="pingback" href="{{ site.siteurl }}/xmlrpc.php">`, `<link rel="profile" href="http://gmpg.org/xfn/11">`, dan komentar Yoast SEO v3.6.1 tahun 2016. Serta meta robots `noodp,noydir` yang sudah deprecated oleh Google sejak 2017.
- **Solusi Rekomendasi:** Bersihkan tag zombie ini agar kode bersih, modern, dan tidak membuang crawl budget.

### H. Empty HTML Files dari Jekyll Collections (`output: true`)
- **Masalah:** Di `_config.yml`, seluruh collection internal (`data-section-3`, `data-products`, dll) di-set `output: true`. Jekyll meng-generate folder dan file HTML berukuran 0 byte seperti `/data-products/1-avanza/index.html`.
- **Dampak:** Crawler search engine yang menemukan URL ini akan membaca halaman kosong (thin content / empty pages).
- **Solusi Rekomendasi:** Ubah `output: false` pada collections yang hanya berfungsi sebagai data parsial dan tidak memiliki layout mandiri.

### I. Halaman `/blog/` Belum Memiliki Paginasi
- **Masalah:** File `blog.html` melakukan iterasi `{% for post in site.posts %}` yang me-render seluruh 58 artikel dalam satu halaman panjang.
- **Dampak:** Meningkatkan bobot DOM halaman blog seiring bertambahnya artikel.
- **Solusi Rekomendasi:** Terapkan strategi paginasi yang kompatibel dengan GitHub Pages dan AMP HTML.

---

## 5. Status Kepatuhan Google AMP HTML

- **AMP JS Runtime:** Menggunakan `https://cdn.ampproject.org/v0.js` resmi.
- **AMP Components Aktif:**
  - `amp-install-serviceworker` (v0.1)
  - `amp-sidebar` (v0.1)
  - `amp-form` (v0.1)
  - `amp-instagram` (v0.1)
  - `amp-tiktok` (v0.1)
  - `amp-iframe` (v0.1)
- **Kondisi CSS Kustom (`<style amp-custom>`):**
  - Homepage CSS: 30.818 bytes (Batas AMP: 75.000 bytes) -> **AMAN (41% kuota)**
  - Post CSS: 26.997 bytes -> **AMAN (36% kuota)**
  - Blog CSS: 29.314 bytes -> **AMAN (39% kuota)**
  - Product CSS: 28.402 bytes -> **AMAN (38% kuota)**
  - Gallery CSS: 27.600 bytes -> **AMAN (37% kuota)**
  - Contact CSS: 25.889 bytes -> **AMAN (34% kuota)**
- **Catatan Penting:** File `amp-custom-asli.html` (382.312 bytes) adalah file arsip lama yang tidak di-load di layout aktif mana pun. Jangan pernah di-include ke template aktif karena akan menyebabkan diskualifikasi validasi AMP (> 75 KB).

---

## 6. Audit Local SEO & Keyword Focus

- **Keyword Utama Target:**
  1. *Rental Mobil Surabaya*
  2. *Sewa Mobil Surabaya*
- **Kondisi Existing:**
  - Profil bisnis fisik: Jalan Joyoboyo Kav C No 17, Medaeng, Waru, Sidoarjo (area penyangga Surabaya / dekat Bandara Juanda & Terminal Purabaya).
  - Skema Structured Data: Menggunakan `AutoRental` via JSON-LD.
  - Namun terdapat query action fiktif `/?s={search_term_string}` yang tidak relevan dengan static site generator.
  - Review LocalBusiness, koordinat geo (latitude/longitude), openingHours, dan areaServed perlu diperkaya secara akurat sesuai fakta operasional.

---

## 7. Rencana Aksi & Quality Gate Baseline

1. **Gate 1 (Integrity):** Seluruh 70 URL, 58 artikel, 202 gambar, dan ID existing terkunci di file inventory JSON.
2. **Gate 2 (Jekyll Build):** Build berhasil tanpa error.
3. **Gate 3 (AMP Validation):** Validasi AMP lokal wajib berjalan bersih.
4. **Gate 4 (SEO Audit):** Struktur heading, canonical absolut, sitemap absolut, Open Graph, dan breadcrumb siap diimplementasikan secara non-destruktif.
5. **Gate 5 (Git Safety):** Semua modifikasi hanya diizinkan di development branch (`modernization/phase-3-adarent`). Branch `master` dikunci dari direct push. Push produksi menunggu konfirmasi eksplisit `"DEPLOY APPROVED"`.
