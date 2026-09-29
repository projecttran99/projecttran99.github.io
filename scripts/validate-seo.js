const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('=== RUNNING SEO & STRUCTURE AUDIT (GATE 4) ===');

let issues = [];

// 1. Check _config.yml url configuration
const configContent = fs.readFileSync(path.join(ROOT_DIR, '_config.yml'), 'utf8');
if (!configContent.includes('url:') || configContent.includes('siteurl:')) {
  issues.push('[NOTE] _config.yml uses siteurl. Ensure url: "https://tran99.com" is set to avoid relative sitemap links.');
}

// 2. Check sitemap.xml
const sitemapContent = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf8');
if (sitemapContent.includes('404')) {
  issues.push('[AUDIT FINDING] sitemap.xml includes 404 pages.');
}

// 3. Check post layout heading
const postLayout = fs.readFileSync(path.join(ROOT_DIR, '_layouts', 'post.html'), 'utf8');
if (postLayout.includes('<h3><span class="text-title">')) {
  issues.push('[AUDIT FINDING] _layouts/post.html uses <h3> instead of <h1> for post titles.');
}

// 4. Check metadata.html og:url
const metadata = fs.readFileSync(path.join(ROOT_DIR, '_includes', 'metadata.html'), 'utf8');
if (metadata.includes('og:url" content="{{ site.siteurl }}"')) {
  issues.push('[AUDIT FINDING] _includes/metadata.html hardcodes og:url to homepage instead of page URL.');
}

console.log(`Audited SEO components. Identified findings: ${issues.length}`);
issues.forEach(i => console.log(i));

if (issues.length === 0) {
  console.log('[PASS] All SEO standards meet modernization criteria.');
} else {
  console.log('[INFO] Findings are documented in BASELINE-AUDIT-REPORT.md and ready for Phase 3 non-destructive remediation.');
}
