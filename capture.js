import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 800, height: 600 });
  await page.goto('https://count-app-hzll.onrender.com', { waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'public/counter-preview.png' });

  await browser.close();
  console.log('Screenshot saved to public/counter-preview.png');
})();
