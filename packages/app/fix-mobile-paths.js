import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, 'build', 'index.html');

console.log('Reading from:', indexPath);

try {
  let html = readFileSync(indexPath, 'utf-8');
  console.log('Original file size:', html.length);

  // Replace absolute paths with relative paths
  // Handle all /app/ paths (including /app/immutable/...)
  html = html.replace(/href="\/app\//g, 'href="./app/');
  html = html.replace(/src="\/app\//g, 'src="./app/');
  html = html.replace(/import\("\/app\//g, 'import("./app/');
  html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');

  writeFileSync(indexPath, html);
  console.log('Fixed mobile paths in index.html');
  console.log('New file size:', html.length);
} catch (error) {
  console.error('Error fixing paths:', error.message);
  process.exit(1);
}

