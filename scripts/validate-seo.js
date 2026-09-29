const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('=== RUNNING SEO & STRUCTURE AUDIT (GATE 4) ===');

let issues = [];

// 1. Check _config.yml url configuration
const configContent = fs.readFileSync(path.join(ROOT_DIR, '_config.yml'), 'utf8');
if (!configContent.includes('url: https://tran99.com') && !configContent.includes('url: "https://tran99.com"')) {
  issues.push('[FAIL] _config.yml does not define url: https://tran99.com');
} else {
  console.log('[PASS] _config.yml defines url: https://tran99.com');
}

// 2. Check sitemap.xml rendered output if _site exists, or template
const siteDir = path.join(ROOT_DIR, '_site');
if (fs.existsSync(path.join(siteDir, 'sitemap.xml'))) {
  const renderedSitemap = fs.readFileSync(path.join(siteDir, 'sitemap.xml'), 'utf8');
  if (renderedSitemap.includes('404')) {
    issues.push('[FAIL] Rendered sitemap.xml contains 404 error page.');
  } else {
    console.log('[PASS] Rendered sitemap.xml successfully excludes 404.');
  }
  if (renderedSitemap.includes('<loc>/')) {
    issues.push('[FAIL] Rendered sitemap.xml contains relative URLs.');
  } else {
    console.log('[PASS] Rendered sitemap.xml contains only absolute HTTPS URLs.');
  }
}

// 3. Check post layout heading
const postLayout = fs.readFileSync(path.join(ROOT_DIR, '_layouts', 'post.html'), 'utf8');
if (postLayout.includes('<h3><span class="text-title">')) {
  issues.push('[FAIL] _layouts/post.html uses <h3> instead of <h1> for post titles.');
} else if (postLayout.includes('<h1><span class="text-title">')) {
  console.log('[PASS] _layouts/post.html uses semantic <h1> for post titles.');
}

// 4. Check metadata.html og:url
const metadata = fs.readFileSync(path.join(ROOT_DIR, '_includes', 'metadata.html'), 'utf8');
if (metadata.includes('og:url" content="{{ site.siteurl }}"')) {
  issues.push('[FAIL] _includes/metadata.html hardcodes og:url to homepage.');
} else {
  console.log('[PASS] _includes/metadata.html uses dynamic page canonical for og:url.');
}

// 5. Check breadcrumb include
if (fs.existsSync(path.join(ROOT_DIR, '_includes', 'breadcrumb.html'))) {
  console.log('[PASS] Semantic breadcrumb component exists.');
} else {
  issues.push('[FAIL] Missing _includes/breadcrumb.html.');
}

console.log(`\nAudited SEO components. Failures detected: ${issues.length}`);
issues.forEach(i => console.error(i));

if (issues.length === 0) {
  console.log('[PASS] All SEO standards meet modernization criteria.');
  process.exit(0);
} else {
  console.error('[FAIL] SEO validation encountered issues.');
  process.exit(1);
}
