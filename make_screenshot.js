const sharp = require('sharp');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="900" height="900" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="#667eea" offset="0%" />
      <stop stop-color="#764ba2" offset="100%" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="20" flood-color="#000" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="900" height="900" rx="0" ry="0" fill="url(#bg)" />
  <g transform="translate(225, 150)">
    <rect width="450" height="600" rx="40" ry="40" fill="#ffffff" filter="url(#shadow)" />
    <circle cx="225" cy="120" r="100" fill="#0f5a45" stroke="#5b6ff2" stroke-width="12" />
    <text x="225" y="150" font-family="Arial, Helvetica, sans-serif" font-size="100" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">H</text>
    <text x="225" y="260" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#222222" text-anchor="middle">Huyen Thang</text>
    <g font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#444444" text-anchor="middle">
      <text x="225" y="330" fill="#455ada">Email:</text>
      <text x="225" y="365">huyen.thang@koto.com.au</text>
      <text x="225" y="420" fill="#455ada">Phone:</text>
      <text x="225" y="455">0348484182</text>
      <text x="225" y="510" fill="#455ada">Birthday:</text>
      <text x="225" y="545">2001-04-16</text>
      <text x="225" y="600" fill="#455ada">Facebook:</text>
      <text x="225" y="635">N/A</text>
    </g>
    <rect x="45" y="665" width="360" height="90" rx="14" ry="14" fill="#f3f4f6" />
    <text x="225" y="720" font-family="Courier New, Courier, monospace" font-size="28" fill="#1f2937" text-anchor="middle">Verification Code: 54E163A2</text>
  </g>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile('anh_chup.png')
  .then(() => console.log('anh_chup.png created'))
  .catch((err) => {
    console.error('Failed to create image:', err);
    process.exit(1);
  });
