const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let processedCount = 0;

files.forEach(filename => {
  // Lewati file yang sudah kita rapikan secara manual jika tidak ingin menimpanya lagi
  if (filename === '2026-07-16-yuk-wisata-ke-air-terjun-tumpak-sewu-malang-lumajang.md') {
    return;
  }

  const filePath = path.join(postsDir, filename);
  const rawContent = fs.readFileSync(filePath, 'utf8');

  const parts = rawContent.split('---');
  if (parts.length < 3) {
    console.error('Skip (invalid frontmatter):', filename);
    return;
  }

  let frontmatterStr = parts[1];
  let bodyStr = parts.slice(2).join('---');

  // 1. Ekstrak gambar dari body
  const imgRegex = /<amp-img[^>]*src=["']([^"']+)["'][^>]*>(?:<\/amp-img>)?/gi;
  const foundImages = [];
  let imgMatch;
  while ((imgMatch = imgRegex.exec(bodyStr)) !== null) {
    const src = imgMatch[1];
    // Abaikan jika src adalah template liquid yang sama dengan foto utama {{ page.amp-img-scr }}
    if (!src.includes('page.amp-img-scr') && !src.includes('page.photos')) {
      foundImages.push(src);
    }
  }

  // Ambil alt utama atau title dari frontmatter
  let altMain = '';
  const altMatch = frontmatterStr.match(/amp-img-alt:\s*(.+)/i);
  if (altMatch) {
    altMain = altMatch[1].trim().replace(/^['"]|['"]$/g, '');
  } else {
    const titleMatch = frontmatterStr.match(/text-title:\s*(.+)/i) || frontmatterStr.match(/title:\s*(.+)/i);
    if (titleMatch) {
      altMain = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }

  // Tentukan photo_middle dan photo_bottom
  const photoMiddle = foundImages.length > 0 ? foundImages[0] : '';
  const photoBottom = foundImages.length > 1 ? foundImages[1] : '';

  // Update frontmatter dengan photo_middle dan photo_bottom
  // Hapus key photo_middle/bottom lama jika ada
  frontmatterStr = frontmatterStr
    .replace(/\n\s*photo_middle:\s*.*$/gm, '')
    .replace(/\n\s*photo_middle_alt:\s*.*$/gm, '')
    .replace(/\n\s*photo_bottom:\s*.*$/gm, '')
    .replace(/\n\s*photo_bottom_alt:\s*.*$/gm, '');

  let newFmAdditions = '';
  if (photoMiddle) {
    newFmAdditions += `\nphoto_middle: '${photoMiddle}'\nphoto_middle_alt: '${altMain}'`;
  } else {
    newFmAdditions += `\nphoto_middle: ''\nphoto_middle_alt: ''`;
  }

  if (photoBottom) {
    newFmAdditions += `\nphoto_bottom: '${photoBottom}'\nphoto_bottom_alt: '${altMain}'`;
  } else {
    newFmAdditions += `\nphoto_bottom: ''\nphoto_bottom_alt: ''`;
  }

  frontmatterStr = frontmatterStr.trim() + newFmAdditions + '\n';

  // 2. Hapus tag <amp-img> dari body
  bodyStr = bodyStr.replace(/<amp-img[^>]*>.*?<\/amp-img>/gis, '');
  bodyStr = bodyStr.replace(/<amp-img[^>]*\/>/gis, '');
  bodyStr = bodyStr.replace(/<amp-img[^>]*>/gis, '');

  // 3. Potong footer lama: 'Kami melayani :' atau link blok lama 'Alasan harus memilih kami?'
  const kamiMelayaniRegex = /(?:<h2[^>]*>|##\s*|<p[^>]*>|<strong>)?\s*(?:Kami\s+melayani\s*:|kami\s+melayani\s*:)/i;
  const kamiIdx = bodyStr.search(kamiMelayaniRegex);
  if (kamiIdx !== -1) {
    bodyStr = bodyStr.substring(0, kamiIdx);
  }

  const alasanIdx = bodyStr.indexOf('Alasan harus memilih kami?');
  if (alasanIdx !== -1) {
    // Cari apakah ada 'Segera hubungi' sebelum Alasan harus memilih kami?
    const segIdx = bodyStr.lastIndexOf('Segera hubungi', alasanIdx);
    if (segIdx !== -1 && segIdx > alasanIdx - 200) {
      bodyStr = bodyStr.substring(0, segIdx);
    } else {
      const pIdx = bodyStr.lastIndexOf('<p', alasanIdx);
      if (pIdx !== -1) {
        bodyStr = bodyStr.substring(0, pIdx);
      } else {
        bodyStr = bodyStr.substring(0, alasanIdx);
      }
    }
  }

  // 4. Transformasi HTML ke Markdown
  // Handle h2
  bodyStr = bodyStr.replace(/<h2[^>]*>(.*?)<\/h2>/gis, (match, p1) => {
    // Bersihkan tag dalam h2 jika ada (misal <p>, <a>)
    let cleanTitle = p1.replace(/<[^>]+>/g, '').trim();
    return `\n\n## ${cleanTitle}\n\n`;
  });

  // Handle h3
  bodyStr = bodyStr.replace(/<h3[^>]*>(.*?)<\/h3>/gis, (match, p1) => {
    let cleanTitle = p1.replace(/<[^>]+>/g, '').trim();
    return `\n\n### ${cleanTitle}\n\n`;
  });

  // Handle h4
  bodyStr = bodyStr.replace(/<h4[^>]*>(.*?)<\/h4>/gis, (match, p1) => {
    let cleanTitle = p1.replace(/<[^>]+>/g, '').trim();
    return `\n\n#### ${cleanTitle}\n\n`;
  });

  // Handle list items
  bodyStr = bodyStr.replace(/<li[^>]*>(.*?)<\/li>/gis, (match, p1) => {
    let cleanLi = p1.replace(/<p[^>]*>|<\/p>/gis, '').trim();
    return `\n- ${cleanLi}`;
  });

  // Hapus list tags pembungkus
  bodyStr = bodyStr.replace(/<\/?(ol|ul)[^>]*>/gis, '\n');

  // Hapus tag wrapper cell jika ada
  bodyStr = bodyStr.replace(/<\/?div[^>]*>/gis, '');

  // Hapus <p class="post">, <p>, dan </p>
  bodyStr = bodyStr.replace(/<p[^>]*>/gis, '\n\n');
  bodyStr = bodyStr.replace(/<\/p>/gis, '\n\n');

  // Hapus <br>, <br/>, <br><br>
  bodyStr = bodyStr.replace(/<br\s*\/?>/gis, '\n\n');

  // Hapus entitas &nbsp;
  bodyStr = bodyStr.replace(/&nbsp;/gi, ' ');

  // Tangani khusus file 2018-04-12-beejay-bakau-resort.md yang belum ada H2
  if (filename === '2018-04-12-beejay-bakau-resort.md') {
    bodyStr = `
Beejay Bakau Resort (BJBR) merupakan salah satu destinasi ekowisata hutan bakau terpopuler di Jawa Timur yang berlokasi di Pelabuhan Perikanan Pantai Mayangan, Kota Probolinggo. Tempat ini memadukan keindahan alam pesisir dengan fasilitas rekreasi modern untuk seluruh anggota keluarga.

## Fasilitas Unggulan Beejay Bakau Resort (BJBR)

Kawasan wisata Beejay Bakau Resort memiliki ragam fasilitas lengkap yang siap memanjakan setiap pengunjung:
- **Pantai Pasir Putih Buatan:** Area rekreasi pantai buatan yang bersih dan ramah untuk permainan air anak-anak.
- **Water Boom & Wahana Air:** Kolam renang dengan seluncuran seru untuk keluarga.
- **Flying Fox:** Wahana pemacu adrenalin melintasi area hutan mangrove.
- **Restoran Sari Laut & Cafe:** Menyajikan aneka hidangan laut segar khas pesisir Probolinggo dengan panorama laut lepas.
- **Bungalow Penginapan:** Penginapan bernuansa kayu eksotis di tengah kawasan hutan bakau yang tenang.

## Informasi Harga Tiket Masuk

Tiket masuk Beejay Bakau Resort sangat terjangkau bagi para wisatawan:
- **Hari Kerja (Senin – Jumat):** Rp 20.000,- per orang
- **Akhir Pekan (Sabtu – Minggu):** Rp 40.000,- per orang
- **Hari Libur Nasional & Long Weekend:** Rp 50.000,- per orang

## Perjalanan Nyaman ke BJBR Bersama Tran99 Rental Mobil

Untuk memudahkan perjalanan Anda dari Surabaya, Sidoarjo, maupun Bandara Juanda menuju Beejay Bakau Resort di Probolinggo, percayakan transportasi Anda kepada **Tran99.com**. Didukung pilihan armada prima mulai dari Avanza, Innova Reborn, hingga HiAce dan Elf Long, serta supir ramah yang siap menemani perjalanan wisata Anda agar terasa santai, aman, dan tepat waktu.
`;
  }

  // 5. Bersihkan formatting whitespace
  // Pisahkan baris, rapikan tiap baris
  const lines = bodyStr.split('\n');
  const cleanedLines = [];
  for (let line of lines) {
    const trimmed = line.trim();
    cleanedLines.push(trimmed);
  }

  // Gabungkan dan normalisasi multiple blank lines menjadi double newline
  let finalBody = cleanedLines.join('\n');
  finalBody = finalBody.replace(/\n{3,}/g, '\n\n').trim();

  const newFullContent = `---\n${frontmatterStr.trim()}\n---\n\n${finalBody}\n`;

  fs.writeFileSync(filePath, newFullContent, 'utf8');
  processedCount++;
});

console.log(`Successfully modernized ${processedCount} posts.`);
