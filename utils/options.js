const chromium = require("chrome-aws-lambda");

export async function getOptions() {
  return {
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  };
}
