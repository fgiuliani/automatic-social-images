let chromium = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chromium = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

let _page;

async function getPage() {
  if (_page) {
    return _page;
  }

  const browser = await puppeteer.launch({
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
