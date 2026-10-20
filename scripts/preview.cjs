const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// Serves the repository the way GitHub Pages does: /pricing resolves to pricing.html.
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 4175;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2',
};

function resolve(pathname) {
  const file = path.join(root, decodeURIComponent(pathname));
  if (!file.startsWith(root)) return null;
  const candidates = pathname.endsWith('/') ? [path.join(file, 'index.html')] : [file, file + '.html', path.join(file, 'index.html')];
  return candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

http.createServer((req, res) => {
  const file = resolve(new URL(req.url, 'http://localhost').pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Preview at http://127.0.0.1:${port}/`));
