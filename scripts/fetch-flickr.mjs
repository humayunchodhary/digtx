import { spawnSync } from 'node:child_process';
import { unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'assets', 'images');

const curl = (url, out) =>
  spawnSync('curl.exe', ['-sS', '-L', '--max-time', '20', '-o', out, '-w', '%{http_code}|%{content_type}', url], {
    encoding: 'utf8',
  }).stdout?.trim?.() || '';

const TAGS = {
  'earbuds-pro': 'earbuds', 'earbuds-air': 'earbuds', neckband: 'earbuds',
  'earbuds-mini': 'earbuds', 'earbuds-sport': 'earbuds', 'earbuds-max': 'earbuds',
  'headphone-overear': 'headphones', 'headphone-onear': 'headphones',
  'headphone-audiopro': 'headphones', 'headphone-anc': 'headphones',
  'speaker-60w': 'speaker', 'speaker-40w': 'speaker', 'speaker-mini': 'speaker',
  'watch-pro': 'smartwatch', 'watch-active': 'smartwatch', 'watch-lite': 'smartwatch',
  'powerbank-20k': 'powerbank', 'powerbank-10k': 'powerbank',
  'gaming-headset': 'headset', gamepad: 'gamepad',
  charger: 'charger', cable: 'cable', 'car-charger': 'charger',
};

const targets = [
  ...Object.entries(TAGS).map(([p, t]) => ({ file: `product-${p}.jpg`, tag: t, lock: 0 })),
  ...Object.entries(TAGS).map(([p, t]) => ({ file: `product-${p}-2.jpg`, tag: t, lock: 0 })),
  ...Object.entries(TAGS).map(([p, t]) => ({ file: `product-${p}-3.jpg`, tag: t, lock: 0 })),
  { file: 'cat-earbuds.jpg', tag: 'earbuds', lock: 0 },
  { file: 'cat-headphones.jpg', tag: 'headphones', lock: 0 },
  { file: 'cat-speakers.jpg', tag: 'speaker', lock: 0 },
  { file: 'cat-watches.jpg', tag: 'smartwatch', lock: 0 },
  { file: 'cat-power.jpg', tag: 'powerbank', lock: 0 },
  { file: 'cat-gaming.jpg', tag: 'gamepad', lock: 0 },
  { file: 'cat-accessories.jpg', tag: 'cable', lock: 0 },
  { file: 'hero-earbuds.jpg', tag: 'earbuds', lock: 0 },
  { file: 'hero-speakers.jpg', tag: 'speaker', lock: 0 },
  { file: 'hero-watches.jpg', tag: 'smartwatch', lock: 0 },
  { file: 'hero-gaming.jpg', tag: 'gamepad', lock: 0 },
];

let lockSeq = 1;
for (const t of targets) t.lock = lockSeq++;

let ok = 0, fbk = 0;
for (const t of targets) {
  const out = join(outDir, t.file);
  let code = curl(`https://loremflickr.com/900/900/${t.tag}?lock=${t.lock}`, out);
  if (!(code.startsWith('200') || /image\//.test(code))) {
    try { unlinkSync(out); } catch {}
    code = curl(`https://loremflickr.com/900/900/${t.tag}?lock=${t.lock + 5000}`, out);
  }
  if (code.startsWith('200') || /image\//.test(code)) {
    ok++;
    console.log(`${t.file} [${t.tag} lock=${t.lock}] ${code}`);
  } else {
    fbk++;
    try { unlinkSync(out); } catch {}
    console.log(`${t.file} FAILED ${code}`);
  }
}
console.log(`\nDone: ${ok} ok, ${fbk} failed`);