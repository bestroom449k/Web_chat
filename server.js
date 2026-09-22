const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "localhost";
const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function send(
  res,
  statusCode,
  body,
  contentType = "text/plain; charset=utf-8",
) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return send(res, 405, "Method Not Allowed");
    ㅆ;
  }

  let requestedPath;
  try {
    requestedPath = decodeURIComponent(
      new URL(req.url, `http://${req.headers.host || HOST}`).pathname,
    );
  } catch {
    return send(res, 400, "Bad Request");
  }

  const relativePath = requestedPath === "/" ? "/index.html" : requestedPath;
  const filePath = path.resolve(ROOT, `.${relativePath}`);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) return send(res, 404, "Not Found");

    const contentType =
      MIME_TYPES[path.extname(filePath).toLowerCase()] ||
      "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
    });
    if (req.method === "HEAD") return res.end();

    fs.createReadStream(filePath)
      .on("error", () => res.destroy())
      .pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Static server running at http://${HOST}:${PORT}`);
  console.log(`Serving files from ${ROOT}`);
});

//---------------------Welcome WebSocketServer World------------------------
const { WebSocketServer } = require("ws");

// http 서버: 정적 파일(html, css, js, ...) 서비스
// WebSocket 서버: 실시간 서비스
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("클라이언트 연결");

  ws.on("close", () => {
    console.log("클라이언트 연결 해제");
  });
});
