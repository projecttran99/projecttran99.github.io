# CHANGELOG
All notable changes to the Adarent CMS & Tran99.com modernization project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - Phase 3 (Planned Incremental Implementation)
### Planned
- Dedicated development branch creation (`modernization/phase-3-adarent`).
- Semantic heading fix in `_layouts/post.html` (`<h3>` to `<h1>`).
- Definition of `url: "https://tran99.com"` in `_config.yml` to ensure absolute URLs in `sitemap.xml`.
- Exclusion of `/404.html` and empty collection outputs from `sitemap.xml`.
- Addition of dynamic page URL to `og:url` in `_includes/metadata.html`.
- Implementation of modern, AMP-compliant floating WhatsApp CTA button.
- Installation of Sveltia CMS static SPA at `/admin/`.
- Implementation of semantic visual breadcrumb and schema `BreadcrumbList`.

---

## [1.0.0-phase1-phase2] - 2026-09-29
### Added
- **Baseline Technical Audit & Live Audit:** Audited `projecttran99.github.io` repository and production site `https://tran99.com`.
- **Machine-Readable Baseline Inventories:**
  - `existing-url-inventory.json` (70 URLs)
  - `existing-article-inventory.json` (58 articles)
  - `existing-image-inventory.json` (202 images)
  - `existing-id-inventory.json` (element IDs + 58 article IDs)
  - `existing-seo-metadata.json` (63 entries)
  - `existing-internal-links.json` (764 links)
  - `existing-amp-pages.json` (63 pages)
- **Comprehensive Project Documentation Suite:**
  - `PRD.md` (Product Requirement Document)
  - `DESIGN.md` (Design specifications & AMP CSS tokens)
  - `USER-STORIES.md` (User stories across 7 personas)
  - `PROJECT-STRUCTURE.md` (Repository tree & component boundaries)
  - `TECHNICAL-ARCHITECTURE.md` (Jamstack, Jekyll, AMP & Sveltia CMS)
  - `SEO-SPECIFICATION.md` (Technical & Local SEO blueprint)
  - `AMP-SPECIFICATION.md` (AMP compliance & CSS quota rules)
  - `CMS-SPECIFICATION.md` (Adarent CMS architecture)
  - `GIT-WORKFLOW.md` (Strict version control protocol)
  - `MIGRATION-SAFETY.md` (Data preservation & rollback playbook)
  - `TESTING-STRATEGY.md` (Quality gates & test suites)
  - `CONTENT-MODEL.md` (Frontmatter & Liquid schemas)
  - `DEVELOPMENT-WORKFLOW.md` (Local environment & commands handbook)
  - `BASELINE-AUDIT-REPORT.md` (Baseline audit findings & defects report)
  - `AGENTS.md` (Permanent rules for AI coding assistants)
  - `README.md` (Project introduction & guide)
  - `CONTRIBUTING.md` (Contribution guidelines)
- **Automated Validation Tooling:**
  - `scripts/generate-inventory.js`
  - `scripts/validate-diff.js` (Gate 1 integrity verification)
  - `scripts/validate-seo.js` (Gate 4 SEO verification)
  - `scripts/validate-amp.js` (Gate 3 AMP compliance verification)
