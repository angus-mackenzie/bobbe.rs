import sharp from 'sharp';
import { resolve } from 'node:path';

const [input, output] = process.argv.slice(2);
if (!input || !output || !output.endsWith('.jpg')) {
  throw new Error('Usage: node scripts/prepare-photo.mjs input-photo output.jpg');
}
if (resolve(input) === resolve(output)) throw new Error('Keep the original: choose a different output path.');
await sharp(input).rotate().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(output);
const metadata = await sharp(output).metadata();
console.log(`${output}: ${metadata.width} × ${metadata.height}; metadata stripped`);
