import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
};

const server = http.createServer(async (req, res) => {
  const reply = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : message);
  };
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return reply(405, 'Método no permitido');
  }
  let url, pathname;
  try {
    url = new URL(req.url, 'http://localhost');
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return reply(400, 'Solicitud inválida');
  }
  if (pathname.includes('\\') || pathname.includes('\0') ||
      pathname.split('/').some(part => part.startsWith('.'))) {
    return reply(404, 'Página no encontrada');
  }
  let file = path.resolve(root, '.' + pathname);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return reply(404, 'Página no encontrada');
  }
  try {
    let info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(308, { Location: url.pathname + '/' + url.search });
        return res.end();
      }
      file = path.join(file, 'index.html');
      info = await stat(file);
    }
    if (!info.isFile()) return reply(404, 'Página no encontrada');
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    });
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch (error) {
    reply(['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500,
      'No se pudo cargar la página');
  }
});

server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
  console.log(`SGV disponible en el puerto ${server.address().port}`);
});
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
