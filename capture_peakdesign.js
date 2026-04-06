import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  // Set viewport to capture exactly the header and hero section (Width 1200, Height ~650)
  await page.setViewport({ width: 1200, height: 650 });
  
  console.log('Navigating to peakdesign.com...');
  await page.goto('https://www.peakdesign.com/', { waitUntil: 'networkidle2' });
  
  console.log('Taking screenshot...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Take a full page screenshot but clip it to just the hero section
  await page.screenshot({ 
    path: 'public/peakdesign-preview-perfect.png',
    clip: { x: 0, y: 0, width: 1200, height: 650 }
  });
  
  await browser.close();
  console.log('Screenshot saved to public/peakdesign-preview-perfect.png');
})();
