import puppeteer from 'puppeteer-core';

async function run() {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: 'C:\\Users\\saumya bansal\\.gemini\\antigravity-ide\\brain\\d3a6f91a-d3b9-457d-a393-18605f7e57b3\\light_theme_verified.png'
    });
    console.log('DONE CAPTURING');
    await browser.close();
  } catch (err) {
    console.error('PUPPETEER ERROR:', err.message);
  }
}

run();
