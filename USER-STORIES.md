# USER STORIES & ACCEPTANCE CRITERIA
## Adarent CMS & Tran99.com Modernization Layer

**Version:** 1.0.0  
**Status:** Approved Baseline  

---

## 1. Visitor & Potential Rental Customer Stories

### US-01: Memilih Kendaraan & Melihat Tarif Transparan
- **Sebagai** calon penyewa mobil di Surabaya,
- **Saya ingin** melihat daftar armada mobil lengkap dengan foto, kapasitas, spesifikasi, dan harga sewa harian yang jelas di halaman `/product/`,
- **Agar** saya dapat menentukan mobil yang sesuai dengan kebutuhan anggaran perjalanan saya.
- **Priority:** Critical
- **Dependencies:** `_data-products/`, `_layouts/product.html`, `amp-img`
- **Acceptance Criteria:**
  1. Halaman `/product/` menampilkan seluruh daftar armada (Avanza, Innova Reborn, Fortuner, Hiace, dll).
  2. Gambar armada tampil responsif tanpa distorsi pada smartphone maupun laptop.
  3. Setiap armada memiliki label fasilitas (misal: "Termasuk Driver", "Area Surabaya").
  4. Terdapat tombol WhatsApp yang langsung menyertakan nama mobil saat ditekan.

---

### US-02: Reservasi Cepat via WhatsApp Floating CTA
- **Sebagai** pengguna ponsel yang sedang terburu-buru membutuhkan sewa mobil bandara Juanda,
- **Saya ingin** menekan satu tombol mengambang WhatsApp yang selalu terlihat di layar,
- **Agar** saya dapat langsung terhubung dengan customer service Tran99 tanpa harus scroll mencari nomor kontak.
- **Priority:** High
- **Dependencies:** `_includes/float-button.html`, WhatsApp API
- **Acceptance Criteria:**
  1. Tombol WhatsApp melayang di sudut kanan bawah tanpa menutupi teks penting artikel.
  2. Klik tombol langsung membuka aplikasi WhatsApp (mobile) atau WhatsApp Web (desktop).
  3. Format nomor telepon internasional valid: `+6281330548581`.
  4. Validasi AMP tetap lulus tanpa error script custom.

---

### US-03: Menemukan Panduan Sewa Mobil & Tempat Wisata
- **Sebagai** wisatawan yang baru pertama kali ke Jawa Timur,
- **Saya ingin** membaca artikel tips sewa mobil dan destinasi wisata (seperti Bromo, Malang, Madura, Surabaya Heritage) di halaman blog Tran99,
- **Agar** saya mendapatkan panduan rute perjalanan terpercaya sekaligus menyewa mobil pendukungnya.
- **Priority:** High
- **Dependencies:** `_posts/`, `_layouts/post.html`, internal linking
- **Acceptance Criteria:**
  1. Seluruh 58 artikel blog lama dapat dibuka dengan cepat tanpa broken link.
  2. Di dalam artikel terdapat tautan rekomendasi internal ke halaman pemesanan armada.
  3. Artikel memiliki judul `<h1>` yang jelas, foto pendukung, dan nama penulis.

---

## 2. Returning Customer Stories

### US-04: Menghubungi Kantor Fisik & Memeriksa Lokasi
- **Sebagai** pelanggan lama atau perwakilan perusahaan di Surabaya,
- **Saya ingin** melihat peta lokasi kantor dan alamat lengkap Tran99 di halaman kontak,
- **Agar** saya dapat mengunjungi kantor atau memastikan keabsahan operasional bisnis rental.
- **Priority:** Medium
- **Dependencies:** `contact.html`, `amp-iframe` Google Maps
- **Acceptance Criteria:**
  1. Alamat fisik tampil akurat: "Jalan Joyoboyo Kav C No 17, Medaeng, Waru, Sidoarjo".
  2. Peta Google Maps embed termuat secara aman via `amp-iframe` dengan fallback placeholder.
  3. Tersedia nomor telepon telkom/GSM yang dapat diklik langsung (`tel:+6281330548581`).

---

## 3. Content Editor & Administrator Stories

### US-05: Mengelola Artikel Melalui Adarent CMS
- **Sebagai** editor konten Tran99,
- **Saya ingin** membuka panel admin web di `/admin/` untuk menulis artikel baru dan mengedit artikel lama dengan form visual,
- **Agar** saya tidak perlu mengutak-atik kode Markdown secara manual di Git command line.
- **Priority:** High
- **Dependencies:** Sveltia CMS / Decap CMS, GitHub OAuth authentication
- **Acceptance Criteria:**
  1. Panel admin dapat diakses di rute `/admin/` secara aman.
  2. Form artikel mencakup field: `title`, `description`, `featured_image`, `writer`, `date`, dan isi konten.
  3. Setiap perubahan yang disimpan memicu Git commit otomatis ke repository.
  4. File artikel tersimpan di direktori `_posts/` dengan format penamaan `YYYY-MM-DD-slug.md`.

---

### US-06: Mengunggah Media Foto Armada Baru
- **Sebagai** administrator,
- **Saya ingin** mengunggah foto armada baru melalui antarmuka CMS,
- **Agar** foto tersimpan rapi di direktori aset (`static/` atau `photos/`) dan dapat langsung disematkan pada artikel atau produk.
- **Priority:** High
- **Dependencies:** CMS Media Library, Git LFS / GitHub media storage
- **Acceptance Criteria:**
  1. Media library CMS memungkinkan drag-and-drop file gambar (JPG/PNG).
  2. File tersimpan dengan nama yang bersih tanpa karakter ilegal.
  3. Jalur gambar yang sudah ada (202 aset) tetap utuh dan tidak tertimpa.

---

## 4. Developer Stories

### US-07: Menjalankan Build & Pengujian Lokal
- **Sebagai** developer atau maintainer sistem,
- **Saya ingin** menjalankan perintah build dan validasi lokal sekali jalan,
- **Agar** saya dapat memverifikasi bahwa perubahan template tidak mematahkan validitas AMP, link internal, atau sitemap.
- **Priority:** Critical
- **Dependencies:** Node.js v22, Ruby v3.4, Jekyll v4.4, scripts validator
- **Acceptance Criteria:**
  1. Perintah `jekyll build` selesai tanpa error.
  2. Script validasi AMP (`npm run test:amp` / validator) memeriksa halaman representatif dan menghasilkan 0 error.
  3. Script integritas URL memvalidasi bahwa seluruh 70 URL baseline tetap tersedia.

---

### US-08: Menjamin Keamanan Branch Produksi
- **Sebagai** lead developer,
- **Saya ingin** proses push ke branch produksi `master` terkunci sampai ada persetujuan manual,
- **Agar** tidak ada kode yang belum teruji yang tayang ke situs live `tran99.com`.
- **Priority:** Critical
- **Dependencies:** `GIT-WORKFLOW.md`, `MIGRATION-SAFETY.md`
- **Acceptance Criteria:**
  1. Semua pekerjaan dilakukan pada development branch.
  2. Dilarang melakukan force push (`git push --force`).
  3. Eksekusi merge ke produksi mensyaratkan konfirmasi kata sandi deployment: `"DEPLOY APPROVED"`.

---

## 5. SEO Manager Stories

### US-09: Verifikasi XML Sitemap & Kanonikal Absolut
- **Sebagai** SEO Manager,
- **Saya ingin** sitemap XML (`/sitemap.xml`) menghasilkan URL absolut yang bersih dan mengecualikan file error 404,
- **Agar** Googlebot dapat merayapi seluruh artikel dan halaman secara efisien tanpa membuang crawl budget.
- **Priority:** Critical
- **Dependencies:** `_config.yml`, `sitemap.xml`
- **Acceptance Criteria:**
  1. Tag `<loc>` di `sitemap.xml` semuanya berformat `https://tran99.com/...`.
  2. Halaman `/404.html` tidak terdapat di dalam file `sitemap.xml`.
  3. Seluruh 58 artikel blog terdaftar di dalam sitemap.

---

### US-10: Memperkuat Local SEO Schema & Semantic Heading
- **Sebagai** SEO Manager,
- **Saya ingin** setiap halaman artikel memiliki satu `<h1>` dan structured data `AutoRental` & `BreadcrumbList` yang valid,
- **Agar** Tran99.com memiliki relevansi tinggi pada pencarian lokal "Rental Mobil Surabaya" dan "Sewa Mobil Surabaya".
- **Priority:** High
- **Dependencies:** `_layouts/post.html`, `_includes/metadata.html`, JSON-LD
- **Acceptance Criteria:**
  1. `_layouts/post.html` menggunakan `<h1>` untuk judul artikel.
  2. Rich Results Test Google memvalidasi skema `AutoRental` dan `BreadcrumbList` tanpa error sintaks.
  3. Tag Open Graph `og:url` dinamis sesuai URL tiap artikel.
