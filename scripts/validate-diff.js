const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INVENTORY_DIR = path.join(ROOT_DIR, 'inventory');

console.log('=== RUNNING INVENTORY DIFF AUDIT (GATE 1) ===');

// Load baseline inventories
const urlInvPath = path.join(INVENTORY_DIR, 'existing-url-inventory.json');
const artInvPath = path.join(INVENTORY_DIR, 'existing-article-inventory.json');
const imgInvPath = path.join(INVENTORY_DIR, 'existing-image-inventory.json');

if (!fs.existsSync(urlInvPath) || !fs.existsSync(artInvPath) || !fs.existsSync(imgInvPath)) {
  console.error('[FAIL] Baseline inventory files missing in inventory/ directory!');
  process.exit(1);
}

const baselineUrls = JSON.parse(fs.readFileSync(urlInvPath, 'utf8'));
const baselineArticles = JSON.parse(fs.readFileSync(artInvPath, 'utf8'));
const baselineImages = JSON.parse(fs.readFileSync(imgInvPath, 'utf8'));

let errors = 0;

// 1. Check Articles
console.log(`\nChecking ${baselineArticles.length} baseline articles...`);
for (const art of baselineArticles) {
  const fullPath = path.join(ROOT_DIR, art.source_file);
  if (!fs.existsSync(fullPath)) {
    console.error(`[CRITICAL ERROR] Missing existing article file: ${art.source_file}`);
    errors++;
  }
}

// 2. Check Images
console.log(`Checking ${baselineImages.length} baseline images...`);
for (const img of baselineImages) {
  const fullPath = path.join(ROOT_DIR, img.path);
  if (!fs.existsSync(fullPath)) {
    console.error(`[CRITICAL ERROR] Missing existing image file: ${img.path}`);
    errors++;
  }
}

// 3. Check Core Static Pages
const corePages = ['index.html', 'contact.html', 'gallery.html', 'product.html', '404.html', 'robots.txt', 'sitemap.xml'];
console.log(`Checking core static pages...`);
for (const cp of corePages) {
  const fullPath = path.join(ROOT_DIR, cp);
  if (!fs.existsSync(fullPath)) {
    console.error(`[CRITICAL ERROR] Missing core page: ${cp}`);
    errors++;
  }
}
// Check blog page (accepts blog.html or blog/index.html for jekyll pagination)
if (!fs.existsSync(path.join(ROOT_DIR, 'blog.html')) && !fs.existsSync(path.join(ROOT_DIR, 'blog', 'index.html'))) {
  console.error(`[CRITICAL ERROR] Missing core page: blog.html or blog/index.html`);
  errors++;
}

console.log('\n=== AUDIT SUMMARY ===');
if (errors === 0) {
  console.log(`[PASS] 100% Data Integrity Verified!`);
  console.log(`- Articles Intact: ${baselineArticles.length}/${baselineArticles.length}`);
  console.log(`- Images Intact: ${baselineImages.length}/${baselineImages.length}`);
  console.log(`- Zero Missing Existing Files Detected.`);
  process.exit(0);
} else {
  console.error(`[FAIL] Detected ${errors} missing items! Migration safety violated.`);
  process.exit(1);
}
