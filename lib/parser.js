import { parse } from "url";

export function parseRequest(req) {
  console.log("HTTP " + req.url);

  const { pathname, query } = parse(req.url || "/", true);
  const { width, height } = query || {};

  const arr = (pathname || "/").slice(1).split(".");

  let extension = "";
  let text = "";

  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop();
    text = arr.join(".");
  }

  const parsedRequest = {
    fileType: extension,
    text: decodeURIComponent(text),
    width: width,
    height: height,
  };

  return parsedRequest;
}
