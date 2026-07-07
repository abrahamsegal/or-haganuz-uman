const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8000);
const apiRoutes = {
  "/api/login": require("./api/login"),
  "/api/logout": require("./api/logout"),
  "/api/session": require("./api/session"),
  "/api/reservations": require("./api/reservations"),
  "/api/admin-users": require("./api/admin-users"),
  "/api/hotel-settings": require("./api/hotel-settings"),
};
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function loadLocalEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const index = trimmed.indexOf("=");
    if (index < 0) return;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  });
}

function sendForbidden(res) {
  res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
  res.end("Forbidden");
}

loadLocalEnv();

const server = http.createServer((req, res) => {
  const cleanPath = decodeURIComponent(req.url.split("?")[0]);

  if (cleanPath.startsWith("/api/reservations/")) {
    req.query = { id: cleanPath.replace("/api/reservations/", "") };
    require("./api/reservations/[id]")(req, res);
    return;
  }

  if (cleanPath.startsWith("/api/admin-users/")) {
    req.query = { id: cleanPath.replace("/api/admin-users/", "") };
    require("./api/admin-users/[id]")(req, res);
    return;
  }

  if (apiRoutes[cleanPath]) {
    req.query = {};
    apiRoutes[cleanPath](req, res);
    return;
  }

  let filePath = path.join(root, cleanPath === "/" ? "index.html" : cleanPath);

  if (!filePath.startsWith(root)) {
    sendForbidden(res);
    return;
  }

  const relativePath = path.relative(root, filePath);
  const pathParts = relativePath.split(path.sep);
  if (pathParts.some((part) => part.startsWith(".")) || pathParts[0] === "api" || pathParts[0] === "supabase") {
    sendForbidden(res);
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "content-type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Hotel Or Haganuz local site: http://127.0.0.1:${port}/`);
});
