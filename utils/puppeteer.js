import { getOptions } from "./options";
const chromium = require("chrome-aws-lambda");

let _page;

async function getPage() {
  if (_page) {
    return _page;
  }

  const options = await getOptions();
  const browser = await chromium.puppeteer.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(html, type) {
  const page = await getPage();

  await page.setViewport({ width: 1024, height: 585 });
  await page.setContent(html);

  return await page.screenshot({ type });
}
