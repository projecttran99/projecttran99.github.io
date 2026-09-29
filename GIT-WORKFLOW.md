# GIT WORKFLOW & REPOSITORY SAFETY PROTOCOL
## Strict Version Control Governance for Adarent CMS & Tran99.com

**Version:** 1.0.0  
**Status:** Mandatory Engineering Policy  
**Branch Produksi:** `master` (Protected)  
**Dedicated Dev Branch:** `modernization/phase-3-adarent`  
**Deploy Approval Secret:** Phrase `"DEPLOY APPROVED"`  

---

## 1. Core Principles of Git Safety

1. **NO BLIND PUSH:** Dilarang melakukan push ke remote GitHub hanya karena pengujian lokal selesai.
2. **NO FORCE PUSH:** Perintah `git push --force` atau `git push -f` dilarang keras tanpa pengecualian apa pun.
3. **NO DIRECT MASTER COMMIT:** Seluruh pengembangan, refactoring, dan penambahan fitur modernisasi wajib dilakukan pada branch terisolasi (`modernization/phase-3-adarent`).
4. **DIFF REVIEW MANDATORY:** Setiap commit dan pengajuan merge wajib melewati pemeriksaan diff komparatif terhadap inventory baseline sebelum dan sesudah perubahan.

---

## 2. Branching Strategy

```mermaid
gitGraph
    commit id: "cf36a70 (Baseline)"
    branch modernization/phase-3-adarent
    checkout modernization/phase-3-adarent
    commit id: "feat: audit & docs"
    commit id: "feat: seo & heading fix"
    commit id: "feat: modern css token"
    commit id: "test: amp validation pass"
    checkout master
    merge modernization/phase-3-adarent id: "DEPLOY APPROVED (Production Release)"
```

### Aturan Branch:
| Nama Branch | Peran | Akses Write | Kebijakan Deploy |
| :--- | :--- | :--- | :--- |
| **`master`** | Production Branch (GitHub Pages Live) | Read-Only (Restricted) | Hanya via explicit human approval (`DEPLOY APPROVED`) |
| **`modernization/phase-3-adarent`** | Development & Staging | Lead Engineer & Agent | Tempat eksekusi seluruh perubahan incremental |

---

## 3. Step-by-Step Development Workflow

### Langkah 1: Verifikasi Working Tree & Baseline SHA
Pastikan working tree bersih dan catat commit dasar:
```bash
git status
git log -1 --format="%H" # Tercatat: cf36a70f8d3dff97f7191790ad60e19f340a3887
```

### Langkah 2: Buat & Beralih ke Development Branch
```bash
git checkout -b modernization/phase-3-adarent
```

### Langkah 3: Eksekusi Perubahan Secara Inkremental
Lakukan perubahan kecil yang terfokus (atomic changes) per komponen.

### Langkah 4: Jalankan Quality Gates Lokal
```bash
jekyll build
node scripts/validate-amp.js
node scripts/validate-seo.js
```

### Langkah 5: Bandingkan Inventaris (Diff Inventory Check)
```bash
node scripts/validate-diff.js
```
Jika terdeteksi ada URL yang hilang, artikel yang terhapus, atau gambar yang hilang: **STOP SEKETIKA** dan perbaiki.

### Langkah 6: Tinjau Git Diff
```bash
git diff
```

### Langkah 7: Human Approval Gate (Production Release)
Proses deployment atau merge ke `master` **DITAHAN** hingga Product Owner / Klien memberikan perintah tertulis:
> `"DEPLOY APPROVED"`

Hanya setelah kata kunci tersebut diterima, proses merge dan push ke branch produksi dijalankan.

---

## 4. Commit Message Conventions

Format standar commit:
`<type>(<scope>): <short description>`

- `feat(seo)`: Memperbaiki canonical URL absolut dan heading post ke h1
- `feat(amp)`: Optimasi inline CSS post agar tetap di bawah 32KB
- `feat(cms)`: Mengonfigurasi Sveltia CMS pada rute /admin/
- `fix(sitemap)`: Mengeliminasi 404.html dan memperbaiki URL absolut sitemap
- `docs(specs)`: Memperbarui dokumentasi teknis dan panduan migrasi
- `test(amp)`: Menambahkan script validasi kepatuhan Google AMP HTML

---

## 5. Prohibited Commands (Larangan Keras)

Perintah-perintah berikut dilarang dijalankan dalam lingkungan proyek:
```bash
git push --force origin master     # DILARANG KERAS
git reset --hard HEAD~1            # DILARANG TANPA BACKUP
git clean -fd                      # DILARANG MENGHAPUS UNTRACKED FILE SEMBARANGAN
```
