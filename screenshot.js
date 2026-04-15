const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const filePath = path.resolve(__dirname, 'index.html');
  await page.setViewport({ width: 900, height: 900, deviceScaleFactor: 2 });
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'anh_chup.png', fullPage: true });
  await browser.close();
})();