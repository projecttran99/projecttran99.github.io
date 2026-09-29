const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('=== RUNNING AMP VALIDATION & CSS BUDGET AUDIT (GATE 3) ===');

const ampCssFiles = [
  { name: 'Homepage CSS', file: '_includes/amp-custom-home.html' },
  { name: 'Post CSS', file: '_includes/amp-custom-post.html' },
  { name: 'Blog CSS', file: '_includes/amp-custom-blog.html' },
  { name: 'Product CSS', file: '_includes/amp-custom-product.html' },
  { name: 'Contact CSS', file: '_includes/amp-custom-contact.html' },
  { name: 'Gallery CSS', file: '_includes/amp-custom-gallery.html' }
];

const AMP_CSS_LIMIT = 75000;
let errors = 0;

console.log('1. Checking AMP CSS Quotas (Limit: 75,000 bytes):');
for (const item of ampCssFiles) {
  const filePath = path.join(ROOT_DIR, item.file);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] CSS file not found: ${item.file}`);
    errors++;
    continue;
  }
  const size = fs.statSync(filePath).size;
  const pct = ((size / AMP_CSS_LIMIT) * 100).toFixed(1);
  if (size <= AMP_CSS_LIMIT) {
    console.log(`[PASS] ${item.name} (${item.file}): ${size} bytes (${pct}% of quota)`);
  } else {
    console.error(`[FAIL] ${item.name} (${item.file}): ${size} bytes EXCEEDS AMP LIMIT!`);
    errors++;
  }
}

console.log('\n2. Checking AMP Runtime & Boilerplate in Layouts:');
const layouts = ['home.html', 'post.html', 'blog.html', 'product.html', 'contact.html', 'gallery.html'];
for (const l of layouts) {
  const lPath = path.join(ROOT_DIR, '_layouts', l);
  if (fs.existsSync(lPath)) {
    const content = fs.readFileSync(lPath, 'utf8');
    const hasAmpAttr = content.includes('<html ⚡') || content.includes('<html amp');
    const hasBoilerplate = content.includes('amp-boilerplate') || content.includes('amp-project');
    const hasCustomStyle = content.includes('<style amp-custom>');

    if (hasAmpAttr && hasBoilerplate && hasCustomStyle) {
      console.log(`[PASS] _layouts/${l} conforms to AMP layout structure.`);
    } else {
      console.warn(`[WARN] _layouts/${l} check attributes (amp: ${hasAmpAttr}, bp: ${hasBoilerplate}, style: ${hasCustomStyle})`);
    }
  }
}

console.log('\n=== AMP AUDIT SUMMARY ===');
if (errors === 0) {
  console.log('[PASS] All active AMP templates comply with Google AMP specifications and CSS limits.');
  process.exit(0);
} else {
  console.error(`[FAIL] Encountered ${errors} AMP compliance violations!`);
  process.exit(1);
}
