# PROJECT STRUCTURE & ARCHITECTURE MAPPING
## Adarent CMS & Tran99.com Repository Structure

**Version:** 1.0.0  
**Reflected Baseline:** Git Commit `cf36a70f8d3dff97f7191790ad60e19f340a3887`  
**Root Repository:** `projecttran99.github.io`  

---

## 1. Directory Tree Overview

Berikut adalah struktur nyata dari repository setelah audit baseline:

```
projecttran99.github.io/
├── .git/                                 # Git version control metadata
├── _config.yml                           # Konfigurasi utama Jekyll static site generator
├── CNAME                                 # Domain mapping GitHub Pages (tran99.com)
├── index.html                            # Homepage template (layout: home)
├── blog.html                             # Halaman daftar blog/info (layout: blog)
├── contact.html                          # Halaman kontak & peta lokasi (layout: contact)
├── gallery.html                          # Halaman galeri foto & video media sosial
├── product.html                          # Halaman katalog harga rental mobil (layout: product)
├── 404.html                              # Custom error page (layout: nyasar)
├── robots.txt                            # Aturan perayapan crawler search engine
├── sitemap.xml                           # XML sitemap perayapan bot
├── manifest.json                         # Web App Manifest PWA
├── favicon.ico                           # Favicon browser standar
├── sw.js                                 # Service Worker (Workbox precache runtime)
├── sw.html                               # Helper iframe pendaftaran Service Worker
├── workbox-config.js                     # Konfigurasi build Workbox PWA
├── google80eb15f70004671a.html           # Google Webmaster verification token
│
├── _posts/                               # KONTEN ARTIKEL BLOG UTAMA (58 ARTIKEL)
│   ├── 2018-04-12-beejay-bakau-resort.md
│   ├── 2018-05-27-sewa-mobil-di-surabaya.md
│   ├── ... (58 files total dari 2018 s/d 2026)
│   └── 2026-04-10-sewa-mobil-mojoagung.md
│
├── _layouts/                             # TEMPLATE TATA LETAK JEKYLL
│   ├── home.html                         # Layout untuk Beranda
│   ├── post.html                         # Layout untuk Artikel Blog Utama
│   ├── blog.html                         # Layout untuk Halaman Daftar Artikel
│   ├── product.html                      # Layout untuk Katalog Harga Sewa
│   ├── contact.html                      # Layout untuk Kontak & Map
│   ├── gallery.html                      # Layout untuk Galeri
│   ├── nyasar.html                       # Layout untuk Halaman 404 Error
│   ├── post-tiktok.html                  # Layout varian video TikTok
│   └── post-youtube.html                 # Layout varian video YouTube
│
├── _includes/                            # KOMPONEN & PARSIAL TEMPLATE (AMP)
│   ├── metadata.html                     # Tag SEO, Open Graph, Twitter Card, JSON-LD Schema
│   ├── canonical.html                    # Tag link kanonikal absolut
│   ├── nav.html                          # Header sticky & drawer amp-sidebar mobile
│   ├── nav-asli.html                     # Versi arsip navigasi lama
│   ├── footer.html                       # Footer halaman & amp-install-serviceworker
│   ├── float-button.html                 # Floating Action Button (WhatsApp CTA)
│   ├── home-artikel.html                 # Komponen daftar artikel pilihan di homepage
│   ├── amp-boilerplate.html              # Standar wajib CSS AMP Boilerplate
│   ├── amp-project.html                  # Script runtime v0.js AMP resmi
│   ├── amp-sidebar.html                  # Script custom-element amp-sidebar-0.1.js
│   ├── amp-form.html                     # Script custom-element amp-form-0.1.js
│   ├── amp-iframe.html                   # Script custom-element amp-iframe-0.1.js
│   ├── amp-instagram.html                # Script custom-element amp-instagram-0.1.js
│   ├── amp-tiktok.html                   # Script custom-element amp-tiktok-0.1.js
│   ├── amp-custom-home.html              # Custom CSS untuk Homepage (30.8 KB)
│   ├── amp-custom-post.html              # Custom CSS untuk Halaman Artikel (26.9 KB)
│   ├── amp-custom-blog.html              # Custom CSS untuk Halaman Blog (29.3 KB)
│   ├── amp-custom-product.html           # Custom CSS untuk Halaman Harga (28.4 KB)
│   ├── amp-custom-contact.html           # Custom CSS untuk Halaman Kontak (25.8 KB)
│   ├── amp-custom-gallery.html           # Custom CSS untuk Halaman Galeri (27.6 KB)
│   └── amp-custom-asli.html              # Arsip CSS lama non-aktif (382 KB)
│
├── _data-products/                       # DATA KATALOG ARMADA MOBIL (9 FILE)
│   ├── 1-avanza.md
│   ├── 2-Innova-grand-new.md
│   ├── 3-Innova-Reborn.md
│   ├── 4-Elf-long.md
│   ├── 5-Hiace.md
│   ├── Alphard-Transformer.md
│   ├── Fortuner-VRZ.md
│   ├── Fortuner.md
│   └── camri.md
│
├── _data-section-3/                      # DATA LANGKAH PEMESANAN (CARA MEMESAN)
│   ├── bayar.md
│   ├── hubungi-kami.md
│   ├── jadwal.md
│   └── jemput.md
│
├── _data-section-5/                      # DATA KEUNGGULAN LAYANAN (KENAPA MEMILIH KAMI)
│   ├── Ramah.md
│   ├── murah.md
│   ├── tepat-waktu.md
│   └── terpercaya.md
│
├── _data-section-7/                      # DATA TAUTAN MEDIA SOSIAL
│   ├── facebook.md
│   ├── instagram.md
│   ├── tiktok.md
│   ├── twitter.md
│   └── youtube.md
│
├── _data-section-9/                      # DATA SALURAN KONTAK FOOTER & CONTACT
│   ├── alamat.md
│   ├── email.md
│   ├── phone.md
│   ├── whatsapp.md
│   └── whatsapp-admin.md
│
├── _data-gallery/                        # DATA EMBED INSTAGRAM (18 FILE)
│   ├── coba-1.md ... coba-18.md
│
├── _data-gallery-picture/                # DATA KOLEKSI FOTO PELANGGAN (9 FILE)
│   ├── 1.md ... 9.md
│
├── _data-tiktok/                         # DATA EMBED VIDEO TIKTOK (1 FILE)
│   └── 1.md
│
├── photos/                               # ASSET GAMBAR DOKUMENTASI & ARTIKEL (130 FILE)
│   ├── hiace-girl.jpg
│   ├── rental-mobil-avanza-terbaru-surabaya.jpg
│   └── ... (total 130 file foto asli)
│
├── static/                               # ASSET GAMBAR STATIS & IKON UI (66 FILE)
│   ├── avanza.jpg, innova.jpg, hiace.jpg
│   ├── man.png, phones-symbol.svg, whatsapp.svg
│   └── ... (total 66 file aset statis)
│
├── images/                               # IKON TAMBAHAN
│   └── icons/                            # Ikon PWA manifest (icon-128x128.png, dll)
│
├── inventory/                            # BASELINE AUDIT INVENTORY (MACHINE-READABLE)
│   ├── existing-url-inventory.json       # 70 URL terindeks
│   ├── existing-article-inventory.json   # 58 artikel blog lengkap
│   ├── existing-image-inventory.json     # 202 aset gambar & relasinya
│   ├── existing-id-inventory.json        # ID elemen HTML & ID artikel
│   ├── existing-seo-metadata.json        # 63 entri metadata SEO
│   ├── existing-internal-links.json      # 764 internal link
│   └── existing-amp-pages.json           # 63 halaman AMP & ukuran CSS
│
├── scripts/                              # AUTOMATION & VALIDATION TOOLING
│   ├── generate-inventory.js             # Generator baseline inventory
│   ├── validate-amp.js                   # Validator kepatuhan AMP HTML
│   ├── validate-seo.js                   # Validator SEO, sitemap, & canonical
│   └── validate-diff.js                  # Validator diff inventaris pre/post migration
│
└── admin/                                # ADARENT CMS LAYER (PLANNED NON-DESTRUCTIVE)
    ├── index.html                        # Sveltia CMS entrypoint
    └── config.yml                        # Konfigurasi skema koleksi CMS
```

---

## 2. Directory & Component Boundaries

### 2.1 Public Frontend Boundary (AMP Zone)
- **Lingkup:** Semua file Markdown di root (`index.html`, `blog.html`, `product.html`, `contact.html`, `gallery.html`) dan `_posts/*.md`.
- **Aturan Ketat:**
  - 100% AMP HTML compliant.
  - Bebas dari custom `<script>`.
  - CSS hanya boleh di-inject melalui tag `<style amp-custom>` dan tidak boleh melebihi 75 KB per halaman.

### 2.2 Content Management Layer Boundary (`/admin/`)
- **Lingkup:** Berada di subdirektori `/admin/`.
- **Karakteristik:** Berfungsi sebagai dashboard SPA (Single Page Application) statis berbasis Git.
- **Isolasi:** Halaman `/admin/` **dikecualikan** dari validasi AMP dan sitemap XML publik karena khusus diperuntukkan bagi content manager bisnis.

### 2.3 Asset Management Boundary (`photos/`, `static/`, `images/`)
- Seluruh file di ketiga folder ini adalah **aset permanen**.
- Tidak boleh ada penghapusan atau penggantian nama file.
- Penambahan aset baru (misal: armada tahun 2026+) diperbolehkan secara additive.
