# AGENT INSTRUCTIONS & OPERATIONAL GUARDRAILS
## Permanent Rules for AI Coding Assistants & Antigravity IDE Agents

**Project:** Adarent CMS / Tran99.com Modernization  
**Repository:** `projecttran99/projecttran99.github.io`  
**Strict Enforcement:** ZERO TOLERANCE FOR DESTRUCTIVE ACTIONS  

---

## 1. Permanent Mandates (Must NEVER Violate)

Setiap AI agent, pair-programmer, atau automated assistant yang beroperasi pada repositori ini **WAJIB MEMATUHI** aturan mutlak berikut:

1. **NEVER delete existing content without approval.** Dilarang keras menghapus artikel existing mana pun di `_posts/` atau koleksi data lainnya.
2. **NEVER change existing permalink without approval.** Seluruh 58 artikel blog lama wajib mempertahankan URL kanonikal dan permalink `/:year/:month/:day/:slug/`.
3. **NEVER change existing IDs.** Dilarang mengubah ID artikel atau element ID pada template.
4. **NEVER delete existing images.** Seluruh 202 aset gambar di `photos/`, `static/`, dan `images/` adalah aset permanen yang harus dilindungi.
5. **NEVER force push.** Perintah `git push --force` atau `git push -f` dilarang dijalankan dalam kondisi apa pun.
6. **NEVER modify production branch directly.** Dilarang melakukan commit atau push langsung ke branch `master`. Semua pekerjaan harus dilakukan pada branch pengembangan (`modernization/phase-3-adarent`).
7. **ALWAYS inspect before modifying.** Selalu audit dan periksa file serta dampaknya sebelum melakukan perubahan kode.
8. **ALWAYS run local build.** Wajib memverifikasi bahwa `jekyll build` berhasil tanpa error setelah setiap pengubahan.
9. **ALWAYS run validation.** Wajib menjalankan pengujian validitas AMP (`validate-amp.js`), SEO (`validate-seo.js`), dan integritas inventaris (`validate-diff.js`).
10. **ALWAYS review git diff.** Wajib meninjau `git diff` sebelum mengusulkan commit atau pull request.
11. **ALWAYS preserve AMP validity.** Frontend publik harus tetap merupakan Google AMP HTML yang 100% valid. Dilarang menyuntikkan custom JavaScript di luar komponen resmi AMP.
12. **ALWAYS preserve SEO-critical URLs.** Jaga seluruh URL terindeks, sitemap XML, dan tag kanonikal.
13. **ASK for approval before destructive operations.** Hentikan eksekusi dan minta konfirmasi manusia jika menemukan situasi yang membutuhkan tindakan destruktif.
14. **STRICT DEPLOYMENT LOCK.** Jangan pernah melakukan merge atau push ke branch produksi `master` sebelum pengguna memberikan persetujuan eksplisit dengan kalimat:
    > `"DEPLOY APPROVED"`

---

## 2. Disciplined Vibe Coding Workflow

Agent beroperasi dengan pola **Disciplined Engineering Workflow**:

```
[ Understand ] ──> [ Inspect ] ──> [ Plan ] ──> [ Implement ] ──> [ Run Local Build ]
                                                                          │
[ Deploy ] <── [ Ask Approval ] <── [ Document ] <── [ Review Diff ] <────┘ (Validate)
```

1. **Incremental Changes:** Buat perubahan kecil yang terfokus (*atomic edits*) agar mudah ditinjau melalui git diff.
2. **Self-Correction:** Jika build atau validasi AMP gagal, agent wajib memperbaiki error tersebut terlebih dahulu sebelum melanjutkan ke langkah berikutnya.
3. **Reporting Transparency:** Agent wajib melaporkan setiap file yang dimodifikasi, status pengujian, dan dampak terhadap URL.
