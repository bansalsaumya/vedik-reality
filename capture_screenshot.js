import puppeteer from 'puppeteer-core';

async function run() {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://vedik-reality.vercel.app/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({
      path: 'C:\\Users\\saumya bansal\\.gemini\\antigravity-ide\\brain\\d3a6f91a-d3b9-457d-a393-18605f7e57b3\\live_main_light_theme.png'
    });
    console.log('LIVE PRODUCTION SCREENSHOT CAPTURED');
    await browser.close();
  } catch (err) {
    console.error('PUPPETEER ERROR:', err.message);
  }
}

run();
