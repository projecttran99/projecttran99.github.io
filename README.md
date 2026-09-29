# Tran99.com (Adarent CMS Modernization Layer)

Website resmi bisnis rental mobil **Tran99.com** (Rental Mobil Surabaya & Sewa Mobil Surabaya). Proyek ini merupakan repositori statis berbasis **Jekyll**, disajikan via **GitHub Pages**, dengan frontend publik menggunakan **Google AMP HTML** murni dan lapisan manajemen konten berbasis **Adarent CMS (Sveltia CMS)**.

---

## 1. Arsitektur & Teknologi

- **Static Site Generator:** Jekyll 4.x
- **Public Frontend:** 100% Google AMP HTML Valid
- **Hosting & CDN:** GitHub Pages (Custom Domain `https://tran99.com`)
- **Content Management Layer:** Adarent CMS (Sveltia CMS via `/admin/`)
- **Styling Architecture:** AMP-Compliant Inline CSS (`<style amp-custom>`) dengan batasan ketat < 75 KB
- **PWA & Offline:** Workbox Service Worker (`sw.js`)

---

## 2. Status Baseline Inventaris Proyek

Berdasarkan audit teknis baseline (Commit SHA: `cf36a70f8d3dff97f7191790ad60e19f340a3887`):
- **Artikel Terbit:** 58 postingan artikel SEO (`_posts/`) rentang 2018–2026.
- **URL Terindeks:** 70 URL aktif terdaftar di `existing-url-inventory.json`.
- **Aset Media:** 202 file gambar terlindungi di `photos/`, `static/`, dan `images/`.
- **Internal Links:** 764 tautan internal dipetakan.
- **Kepatuhan AMP:** 63 halaman tervalidasi dengan rata-rata CSS 28 KB.

---

## 3. Panduan Instalasi & Pengembangan Lokal

### Prasyarat
- Ruby >= 3.2 (disarankan 3.4.1)
- Bundler >= 2.5
- Node.js >= 20 (disarankan v22.18.0)
- Jekyll 4.x

### Langkah Menjalankan Proyek
```bash
# 1. Clone repositori
git clone https://github.com/projecttran99/projecttran99.github.io.git
cd projecttran99.github.io

# 2. Buat & beralih ke development branch
git checkout -b modernization/phase-3-adarent

# 3. Build situs statis Jekyll
jekyll build

# 4. Jalankan server lokal
jekyll serve --livereload --port 4000

# 5. Jalankan validasi otomatis
node scripts/generate-inventory.js
node scripts/validate-amp.js
node scripts/validate-seo.js
node scripts/validate-diff.js
```

---

## 4. Kebijakan Deployment & Keamanan Git

Branch `master` dilindungi dari push langsung (*protected production branch*). Seluruh pengerjaan fitur baru atau perbaikan template hanya diizinkan di development branch.

Deployment ke produksi **DITAHAN** hingga ada instruksi konfirmasi eksplisit dari Product Owner:
> `"DEPLOY APPROVED"`

---

## 5. Dokumentasi Spesifikasi Lengkap

Untuk panduan arsitektur, desain, SEO, dan kepatuhan pengujian yang mendalam, silakan merujuk pada dokumen berikut:
- [PRD.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/PRD.md) - Product Requirement Document
- [DESIGN.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/DESIGN.md) - Spesifikasi Desain & Desain Sistem AMP
- [USER-STORIES.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/USER-STORIES.md) - User Stories & Acceptance Criteria
- [PROJECT-STRUCTURE.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/PROJECT-STRUCTURE.md) - Struktur Direktori & Pemetaan File
- [TECHNICAL-ARCHITECTURE.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/TECHNICAL-ARCHITECTURE.md) - Arsitektur Teknis Jamstack & Sveltia CMS
- [SEO-SPECIFICATION.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/SEO-SPECIFICATION.md) - Blueprint Teknis & Local SEO
- [AMP-SPECIFICATION.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/AMP-SPECIFICATION.md) - Standar Kepatuhan Google AMP HTML
- [CMS-SPECIFICATION.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/CMS-SPECIFICATION.md) - Spesifikasi Adarent CMS
- [GIT-WORKFLOW.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/GIT-WORKFLOW.md) - Protokol Keselamatan Git
- [MIGRATION-SAFETY.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/MIGRATION-SAFETY.md) - Protokol Preservasi Data & Rollback
- [TESTING-STRATEGY.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/TESTING-STRATEGY.md) - Quality Gates & Rencana Pengujian
- [CONTENT-MODEL.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/CONTENT-MODEL.md) - Model Skema Frontmatter & Liquid
- [DEVELOPMENT-WORKFLOW.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/DEVELOPMENT-WORKFLOW.md) - Handbook Operasional Developer
- [BASELINE-AUDIT-REPORT.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/BASELINE-AUDIT-REPORT.md) - Laporan Temuan Audit Baseline
- [AGENTS.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/AGENTS.md) - Aturan Permanen AI Assistant
- [CONTRIBUTING.md](file:///Users/macbook/Documents/DENNY/KLIKADA/WEBSITE/KLIEN/tran99/tran99-adarent-cms/projecttran99.github.io/CONTRIBUTING.md) - Panduan Kontribusi Tim
