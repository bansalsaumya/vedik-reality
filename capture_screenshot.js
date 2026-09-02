import puppeteer from 'puppeteer-core';

async function run() {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // 1. Homepage Single SearchBar Test
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1440, height: 900 });
    await page1.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await page1.screenshot({
      path: 'C:\\Users\\saumya bansal\\.gemini\\antigravity-ide\\brain\\d3a6f91a-d3b9-457d-a393-18605f7e57b3\\homepage_single_bar.png'
    });
    console.log('HOMEPAGE SCREENSHOT SAVED');

    // 2. Projects Page Image Test
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1440, height: 900 });
    await page2.goto('http://localhost:5173/projects', { waitUntil: 'networkidle2' });
    await page2.screenshot({
      path: 'C:\\Users\\saumya bansal\\.gemini\\antigravity-ide\\brain\\d3a6f91a-d3b9-457d-a393-18605f7e57b3\\projects_page_verified.png'
    });
    console.log('PROJECTS SCREENSHOT SAVED');

    await browser.close();
  } catch (err) {
    console.error('PUPPETEER ERROR:', err.message);
  }
}

run();
