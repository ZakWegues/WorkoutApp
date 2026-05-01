const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SVG_CONTENT = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#22c55e" rx="112" />
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="bold" font-size="280" fill="white" text-anchor="middle" dominant-baseline="middle">W</text>
</svg>
`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '../public/icons');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(SVG_CONTENT);

  try {
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
      
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
      
    console.log('Icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
