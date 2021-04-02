import core from "puppeteer-core";
import { getOptions } from "./options";

let _page;

async function getPage(isDev) {
  if (_page) {
    return _page;
  }

  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(html, type, isDev) {
  const page = await getPage(isDev);

  await page.setViewport({ width: 1024, height: 585 });
  await page.setContent(html);

  return await page.screenshot({ type });
}
