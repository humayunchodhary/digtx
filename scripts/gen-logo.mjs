import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const svg = await readFile(resolve(root, 'public/assets/images/logo.svg'));
await sharp(svg).resize(590, 455).png().toFile(resolve(root, 'public/assets/images/logo.png'));
console.log('logo.png written (590x455)');