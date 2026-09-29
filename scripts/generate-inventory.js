const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const INVENTORY_DIR = path.join(ROOT_DIR, 'inventory');

if (!fs.existsSync(INVENTORY_DIR)) {
  fs.mkdirSync(INVENTORY_DIR, { recursive: true });
}

// 1. Parse Frontmatter helper
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const yamlBlock = match[1];
  const body = match[2];
  const data = {};
  yamlBlock.split(/\r?\n/).forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });
  return { data, body };
}

// Get git modified date for file
function getGitModifiedDate(filePath) {
  try {
    const out = execSync(`git log -1 --format="%ad" --date=iso "${filePath}"`, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
    return out || null;
  } catch (e) {
    return null;
  }
}

// Collect all project text files for link and image reference scanning
function getAllProjectFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'inventory') continue;
    if (entry.isDirectory()) {
      getAllProjectFiles(fullPath, fileList);
    } else {
      fileList.push(relPath);
    }
  }
  return fileList;
}

const allFiles = getAllProjectFiles(ROOT_DIR);
const contentFiles = allFiles.filter(f => f.endsWith('.md') || f.endsWith('.html') || f.endsWith('.xml') || f.endsWith('.yml') || f.endsWith('.json') || f.endsWith('.js'));

// Read all text contents for fast searching
const fileContentsMap = {};
for (const f of contentFiles) {
  try {
    fileContentsMap[f] = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
  } catch (e) {}
}

console.log('--- Generating Article Inventory ---');
const postFiles = fs.readdirSync(path.join(ROOT_DIR, '_posts'))
  .filter(f => f.endsWith('.md'))
  .sort();

const articleInventory = [];
for (const postFile of postFiles) {
  const relPath = path.join('_posts', postFile);
  const raw = fileContentsMap[relPath];
  const { data, body } = parseFrontmatter(raw);
  
  // Format: YYYY-MM-DD-slug.md
  const dateSlugMatch = postFile.match(/^(\d{4})-(\d{2})-(\d{2})-(.*)\.md$/);
  const year = dateSlugMatch ? dateSlugMatch[1] : '';
  const month = dateSlugMatch ? dateSlugMatch[2] : '';
  const day = dateSlugMatch ? dateSlugMatch[3] : '';
  const slug = dateSlugMatch ? dateSlugMatch[4] : postFile.replace(/\.md$/, '');
  const permalink = `https://tran99.com/${year}/${month}/${day}/${slug}/`;
  const articleId = `${year}-${month}-${day}-${slug}`;

  articleInventory.push({
    id: articleId,
    jekyll_id: `/${year}/${month}/${day}/${slug}`,
    title: data.title || data['text-title'] || slug,
    raw_title: data.title || null,
    text_title: data['text-title'] || null,
    slug: slug,
    permalink: permalink,
    relative_url: `/${year}/${month}/${day}/${slug}/`,
    source_file: relPath,
    date: `${year}-${month}-${day}`,
    modified_date: getGitModifiedDate(relPath) || `${year}-${month}-${day}`,
    category: data.category || data.categories || null,
    tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
    writer: data.writer || null,
    featured_image: data.photos || data['amp-img-scr'] || null,
    amp_img_scr: data['amp-img-scr'] || null,
    amp_img_alt: data['amp-img-alt'] || null,
    amp_img_width: data['amp-img-width'] || null,
    amp_img_height: data['amp-img-height'] || null,
    description: data.description || null,
    canonical: permalink,
    status: 'published'
  });
}

console.log(`Articles found: ${articleInventory.length}`);

console.log('--- Generating Image Inventory ---');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];
const imageFiles = allFiles.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

const imageInventory = [];
for (const imgPath of imageFiles) {
  const filename = path.basename(imgPath);
  const ext = path.extname(imgPath).toLowerCase();
  const referencedBy = [];
  
  // Search references across all content files
  for (const [cf, content] of Object.entries(fileContentsMap)) {
    if (content.includes(filename) || content.includes(imgPath)) {
      referencedBy.push(cf);
    }
  }

  imageInventory.push({
    path: imgPath,
    filename: filename,
    extension: ext,
    size_bytes: fs.statSync(path.join(ROOT_DIR, imgPath)).size,
    referenced_by: referencedBy,
    url: `https://tran99.com/${imgPath}`
  });
}
console.log(`Images found: ${imageInventory.length}`);

console.log('--- Generating URL Inventory ---');
const urlInventory = [];

// Static Pages
const staticPages = [
  { url: 'https://tran99.com/', relative_url: '/', source_file: 'index.html', type: 'homepage', status: 200 },
  { url: 'https://tran99.com/blog/', relative_url: '/blog/', source_file: 'blog.html', type: 'page', status: 200 },
  { url: 'https://tran99.com/contact/', relative_url: '/contact/', source_file: 'contact.html', type: 'page', status: 200 },
  { url: 'https://tran99.com/gallery/', relative_url: '/gallery/', source_file: 'gallery.html', type: 'page', status: 200 },
  { url: 'https://tran99.com/product/', relative_url: '/product/', source_file: 'product.html', type: 'page', status: 200 },
  { url: 'https://tran99.com/404.html', relative_url: '/404.html', source_file: '404.html', type: 'error_page', status: 404 },
  { url: 'https://tran99.com/sitemap.xml', relative_url: '/sitemap.xml', source_file: 'sitemap.xml', type: 'sitemap', status: 200 },
  { url: 'https://tran99.com/robots.txt', relative_url: '/robots.txt', source_file: 'robots.txt', type: 'robots', status: 200 },
  { url: 'https://tran99.com/feed.xml', relative_url: '/feed.xml', source_file: '_config.yml (jekyll-feed)', type: 'feed', status: 200 },
  { url: 'https://tran99.com/sw.js', relative_url: '/sw.js', source_file: 'sw.js', type: 'service_worker', status: 200 },
  { url: 'https://tran99.com/sw.html', relative_url: '/sw.html', source_file: 'sw.html', type: 'sw_helper', status: 200 },
  { url: 'https://tran99.com/manifest.json', relative_url: '/manifest.json', source_file: 'manifest.json', type: 'manifest', status: 200 }
];

staticPages.forEach(p => urlInventory.push(p));

// Articles
for (const art of articleInventory) {
  urlInventory.push({
    url: art.permalink,
    relative_url: art.relative_url,
    source_file: art.source_file,
    type: 'article',
    status: 200
  });
}

console.log(`Total URLs indexed: ${urlInventory.length}`);

console.log('--- Generating Existing ID Inventory ---');
// Collect HTML element IDs and article IDs
const idInventory = {
  article_ids: articleInventory.map(a => ({ id: a.id, jekyll_id: a.jekyll_id, source_file: a.source_file })),
  html_element_ids: []
};

const idRegex = /id=['"]([^'"]+)['"]/g;
for (const [cf, content] of Object.entries(fileContentsMap)) {
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    idInventory.html_element_ids.push({
      element_id: m[1],
      source_file: cf
    });
  }
}
// De-duplicate html_element_ids
const uniqueElementIds = [];
const seenIds = new Set();
for (const item of idInventory.html_element_ids) {
  const key = `${item.element_id}::${item.source_file}`;
  if (!seenIds.has(key)) {
    seenIds.add(key);
    uniqueElementIds.push(item);
  }
}
idInventory.html_element_ids = uniqueElementIds;

console.log('--- Generating SEO Metadata Inventory ---');
const seoMetadata = [];

// Static Pages SEO
const pagesToInspect = [
  { file: 'index.html', url: 'https://tran99.com/' },
  { file: 'blog.html', url: 'https://tran99.com/blog/' },
  { file: 'contact.html', url: 'https://tran99.com/contact/' },
  { file: 'gallery.html', url: 'https://tran99.com/gallery/' },
  { file: 'product.html', url: 'https://tran99.com/product/' }
];

for (const p of pagesToInspect) {
  const raw = fileContentsMap[p.file];
  const { data } = parseFrontmatter(raw);
  seoMetadata.push({
    url: p.url,
    source_file: p.file,
    title: data.title || '',
    description: data.description || '',
    canonical: p.url,
    photos: data.photos || '',
    keywords: "sewa mobil surabaya, rental mobil surabaya, sewa mobil surabaya murah, rental mobil surabaya murah, sewa mobil di surabaya, rental mobil di surabaya, sewa mobil murah surabaya, sewa mobil surabaya tran99.com, rental mobil surabaya tran99.com, tran99.com"
  });
}

// Articles SEO
for (const art of articleInventory) {
  seoMetadata.push({
    url: art.permalink,
    source_file: art.source_file,
    title: art.title,
    raw_title: art.raw_title,
    text_title: art.text_title,
    description: art.description || '',
    canonical: art.permalink,
    photos: art.featured_image || '',
    writer: art.writer
  });
}

console.log('--- Generating Internal Links Inventory ---');
const internalLinks = [];
const linkRegex = /href=['"]([^'"]+)['"]/g;

for (const [cf, content] of Object.entries(fileContentsMap)) {
  let m;
  while ((m = linkRegex.exec(content)) !== null) {
    const href = m[1];
    // check if internal
    if (href.startsWith('/') || href.startsWith('https://tran99.com') || href.startsWith('http://tran99.com') || href.startsWith('#')) {
      internalLinks.push({
        source_file: cf,
        href: href,
        is_anchor: href.startsWith('#')
      });
    }
  }
}

console.log('--- Generating AMP Pages Inventory ---');
const ampPages = [
  { url: 'https://tran99.com/', layout: 'home', custom_css_file: '_includes/amp-custom-home.html', components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form'] },
  { url: 'https://tran99.com/blog/', layout: 'blog', custom_css_file: '_includes/amp-custom-blog.html', components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form'] },
  { url: 'https://tran99.com/contact/', layout: 'contact', custom_css_file: '_includes/amp-custom-contact.html', components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form', 'amp-iframe'] },
  { url: 'https://tran99.com/gallery/', layout: 'gallery', custom_css_file: '_includes/amp-custom-gallery.html', components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form', 'amp-tiktok'] },
  { url: 'https://tran99.com/product/', layout: 'product', custom_css_file: '_includes/amp-custom-product.html', components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form'] },
  ...articleInventory.map(a => ({
    url: a.permalink,
    layout: 'post',
    custom_css_file: '_includes/amp-custom-post.html',
    components: ['amp-install-serviceworker', 'amp-instagram', 'amp-sidebar', 'amp-form']
  }))
];

// Add CSS sizes to AMP pages
for (const ap of ampPages) {
  const cssPath = path.join(ROOT_DIR, ap.custom_css_file);
  if (fs.existsSync(cssPath)) {
    ap.custom_css_bytes = fs.statSync(cssPath).size;
    ap.amp_css_valid_limit = 75000;
    ap.is_within_amp_css_limit = ap.custom_css_bytes <= 75000;
  }
}

// Write JSON files to both root and inventory/ for maximum accessibility
const filesToWrite = [
  { name: 'existing-url-inventory.json', data: urlInventory },
  { name: 'existing-article-inventory.json', data: articleInventory },
  { name: 'existing-image-inventory.json', data: imageInventory },
  { name: 'existing-id-inventory.json', data: idInventory },
  { name: 'existing-seo-metadata.json', data: seoMetadata },
  { name: 'existing-internal-links.json', data: internalLinks },
  { name: 'existing-amp-pages.json', data: ampPages }
];

for (const item of filesToWrite) {
  const jsonContent = JSON.stringify(item.data, null, 2);
  fs.writeFileSync(path.join(ROOT_DIR, item.name), jsonContent, 'utf8');
  fs.writeFileSync(path.join(INVENTORY_DIR, item.name), jsonContent, 'utf8');
  console.log(`Saved: ${item.name} (${item.data.length || Object.keys(item.data).length} records)`);
}

console.log('--- Inventory Generation Completed Successfully ---');
