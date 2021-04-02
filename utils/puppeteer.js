const chromium = require("chrome-aws-lambda");

let _page;

async function getPage() {
  if (_page) {
    return _page;
  }

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  _page = await browser.newPage();

  return _page;
}

export async function getScreenshot(html, type) {
  const page = await getPage();

  await page.setViewport({ width: 1024, height: 585 });
  await page.setContent(html);

  return await page.screenshot({ type });
}
