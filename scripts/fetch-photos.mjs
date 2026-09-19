import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'assets', 'images');
mkdirSync(outDir, { recursive: true });

const curl = (url, out) => {
  const r = spawnSync(
    'curl.exe',
    ['-sS', '-L', '--max-time', '20', '-o', out, '-w', '%{http_code}|%{content_type}', url],
    { encoding: 'utf8' },
  );
  return r.stdout?.trim?.() || '';
};

const ovSearch = (q, page) => {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page=${page}&page_size=12&size=large&source=flickr`;
  const raw = spawnSync('curl.exe', ['-sS', '--max-time', '40', url], { encoding: 'utf8' });
  try {
    return JSON.parse(raw.stdout || '{}');
  } catch {
    return {};
  }
};

const GOOD_LIC = new Set(['cc0', 'by', 'by-sa']);
const used = new Set();
const FALLBACK = {
  earbuds: 'earbuds',
  headphones: 'headphones',
  speakers: 'speaker',
  watches: 'smartwatch',
  powerbanks: 'powerbank',
  gaming: 'gaming',
  accessories: 'cable',
};

function pickFor(product, family, view) {
  const FAMILIES = {
    earbuds: ['wireless earbuds', 'earbuds case', 'true wireless earbuds', 'airpods', 'earbuds white', 'bluetooth earbuds', 'earbuds black', 'wireless earphones'],
    headphones: ['over ear headphones', 'headphones product', 'studio headphones', 'wireless headphones', 'headphones black', 'headphones closeup', 'on ear headphones', 'noise cancelling headphones'],
    speakers: ['bluetooth speaker', 'portable speaker', 'wireless speaker', 'jbl speaker', 'mini bluetooth speaker', 'smart speaker', 'speaker product'],
    watches: ['smartwatch', 'smart watch wrist', 'fitness tracker watch', 'smartwatch product', 'smart watch product', 'digital smartwatch'],
    powerbanks: ['power bank', 'powerbank', 'portable charger', 'usb power bank', 'battery pack charger'],
    gaming: ['gaming headset', 'gaming headphones', 'game controller', 'gamepad', 'video game controller', 'xbox controller'],
    accessories: ['usb wall charger', 'phone charger', 'charging adapter', 'usb cable', 'charging cable', 'usb c cable', 'car usb charger', 'charging cable closeup'],
  };
  const tags = FAMILIES[family] || ['gadget'];
  const step = view === 1 ? 0 : view === 2 ? 1 : 3;
  const startQ = (product.familyIndex + step) % tags.length;
  const page = product.familyIndex + 1 + view;
  for (let t = 0; t < tags.length; t++) {
    const q = tags[(startQ + t) % tags.length];
    for (let jump = 0; jump < 5; jump++) {
      const data = ovSearch(q, page + jump);
      const results = Array.isArray(data.results) ? data.results : [];
      for (const item of results) {
        if (!item || !item.url) continue;
        const w = item.width || 0;
        const h = item.height || 0;
        if (w < 700 || h < 700) continue;
        const ar = w / h;
        if (ar < 0.55 || ar > 1.8) continue;
        const lower = item.url.toLowerCase();
        if (!/(\.jpe?g|\.png|\.webp)(\?|$)/.test(lower)) continue;
        if (/upload\.wikimedia\.org/.test(lower)) continue;
        if (item.title && /svg|icon|logo|meme|illustration|drawing/i.test(String(item.title))) continue;
        if (!GOOD_LIC.has(item.license)) continue;
        if (used.has(item.id || item.url)) continue;
        used.add(item.id || item.url);
        return { url: item.url, title: item.title, w, h };
      }
    }
  }
  const lock = (product.familyIndex + 1) * 10 + view;
  return {
    url: `https://loremflickr.com/900/900/${FALLBACK[family] || 'gadget'}?lock=${lock}`,
    title: 'fallback',
    w: 900,
    h: 900,
  };
}

const FAMILY_BY_PRODUCT = {
  'earbuds-pro': 'earbuds', 'earbuds-air': 'earbuds', neckband: 'earbuds',
  'earbuds-mini': 'earbuds', 'earbuds-sport': 'earbuds', 'earbuds-max': 'earbuds',
  'headphone-overear': 'headphones', 'headphone-onear': 'headphones',
  'headphone-audiopro': 'headphones', 'headphone-anc': 'headphones',
  'speaker-60w': 'speakers', 'speaker-40w': 'speakers', 'speaker-mini': 'speakers',
  'watch-pro': 'watches', 'watch-active': 'watches', 'watch-lite': 'watches',
  'powerbank-20k': 'powerbanks', 'powerbank-10k': 'powerbanks',
  'gaming-headset': 'gaming', gamepad: 'gaming',
  charger: 'accessories', cable: 'accessories', 'car-charger': 'accessories',
};

const products = Object.keys(FAMILY_BY_PRODUCT).map((name, idx) => {
  const family = FAMILY_BY_PRODUCT[name];
  const familyIndex = Object.keys(FAMILY_BY_PRODUCT).filter((k) => FAMILY_BY_PRODUCT[k] === family).indexOf(name);
  return { name, family, familyIndex };
});

let ok = 0;
let fbk = 0;
for (const product of products) {
  for (let view = 1; view <= 3; view++) {
    const file = join(outDir, `product-${product.name}${view === 1 ? '' : `-${view}`}.jpg`);
    const pick = pickFor(product, product.family, view);
    let code = curl(pick.url, file);
    if (!(code.startsWith('200') || /image\//.test(code))) {
      try {
        unlinkSync(file);
      } catch {}
      const lock = (product.familyIndex + 5) * 131 + view * 7;
      const fallback = `https://loremflickr.com/900/900/${FALLBACK[product.family] || 'gadget'}?lock=${lock}`;
      code = curl(fallback, file);
      if (!(code.startsWith('200') || /image\//.test(code))) {
        try {
          unlinkSync(file);
        } catch {}
        fbk++;
        console.log(`product-${product.name} v${view}: ALL FAILED ${code}`);
        continue;
      }
      fbk++;
      console.log(`product-${product.name} v${view}: fallback(loremflickr) ${code}`);
    } else {
      ok++;
      console.log(`product-${product.name} v${view}: ${pick.title} [${code}]`);
    }
    spawnSync('cmd.exe', ['/c', 'timeout', '/t', '0.2'], { encoding: 'utf8' });
  }
}
console.log(`\nProducts done: ${ok} ok, ${fbk} failed`);