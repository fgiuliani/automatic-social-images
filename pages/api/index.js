import { parseRequest } from "../../utils/parser";
import { getScreenshot } from "../../utils/puppeteer";
import { getHtml } from "../../utils/html";

const isDev = !process.env.AWS_REGION;

export default async function handle(req, res) {
  try {
    const parsedReq = parseRequest(req);

    const html = getHtml(parsedReq);
    const { fileType } = parsedReq;
    const file = await getScreenshot(html, fileType, isDev);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );

    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");

    console.error(e);
  }
}
