import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}

const files = await filesIn('dist');
const photos = files.filter(file => /\.(avif|webp|jpe?g)$/i.test(file));
if (!photos.length) throw new Error('No generated photographs found.');
let bytes = 0;
for (const file of photos) {
  bytes += (await stat(file)).size;
  const metadata = await sharp(file).metadata();
  if (metadata.exif || metadata.iptc || metadata.xmp) throw new Error(`Unexpected photo metadata: ${file}`);
  if (Math.max(metadata.width, metadata.height) > 2560) throw new Error(`Oversize photograph: ${file}`);
}
if (bytes > 10_000_000) throw new Error(`Photographs exceed 10 MB: ${bytes} bytes`);
if (files.some(file => file.endsWith('.js'))) throw new Error('Unexpected client-side JavaScript in static output.');
if (files.some(file => file.includes('/imgs/'))) throw new Error('Original photo directory in output.');
const html = await readFile('dist/index.html', 'utf8');
if (/<script\b/i.test(html)) throw new Error('Unexpected script in landing page.');
for (const format of ['avif', 'webp', 'jpg']) {
  if (!photos.some(file => file.endsWith(`.${format}`) || (format === 'jpg' && file.endsWith('.jpeg')))) throw new Error(`Missing ${format} output`);
}
console.log(`${photos.length} photo variants: ${(bytes / 1_000_000).toFixed(2)} MB / 10 MB. No photo metadata or application JavaScript.`);
