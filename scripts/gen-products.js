/* Generates product images (front view variants) for each product type.
   Reuses silhouettes with color variants so the gallery has multiple images. */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve(process.cwd(), 'src/assets/images');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const save = (n, c) => writeFileSync(resolve(dir, n), c);
const svg = (w, h, body, bg = '#ffffff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;

/* Pedestal + centered product frame */
function product(name, body, bg = '#ffffff', w = 800, h = 800) {
  const stand = `<rect x="${w / 2 - 120}" y="${h - 90}" width="240" height="12" rx="6" fill="#e2e8f0"/>
  <rect x="${w / 2 - 90}" y="${h - 78}" width="180" height="34" rx="6" fill="#cbd5e1"/>
  <ellipse cx="${w / 2}" cy="${h - 58}" rx="40" ry="4" fill="#94a3b8"/>`;
  save(name, svg(w, h, stand + body, bg));
}
function variantName(base, v) { return base.replace('.svg', `-${v}.svg`); }

/* Air Cooler */
const cooler = (bodyCol, grille) =>
  `<rect x="${400 - 130}" y="210" width="260" height="360" rx="14" fill="${bodyCol}" stroke="#0f52ba" stroke-width="2"/>
  <rect x="${400 - 130}" y="300" width="260" height="70" rx="4" fill="${grille}"/>
  <line x1="${400 - 115}" y1="330" x2="${400 + 115}" y2="330" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <line x1="${400 - 115}" y1="355" x2="${400 + 100}" y2="355" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <line x1="${400 - 115}" y1="378" x2="${400 + 90}" y2="378" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <circle cx="${400 + 115}" cy="400" r="28" fill="#0f52ba"/>
  <line x1="${400 + 115}" y1="385" x2="${400 + 115}" y2="415" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <circle cx="${400 + 132}" cy="400" r="4" fill="#fff"/>
  <rect x="${400 - 130}" y="560" width="260" height="10" rx="5" fill="#1e3a8a"/>`;
product('product-cooler.svg', cooler('#1e3a8a', '#e2e8f0'));
product('product-cooler-2.svg', cooler('#0ea5e9', '#ffffff'));
product('product-cooler-3.svg', cooler('#1e293b', '#ffffff'));

/* Water Dispenser */
const dispenser = (bodyCol) =>
  `<rect x="${400 - 90}" y="200" width="180" height="380" rx="12" fill="${bodyCol}"/>
  <circle cx="400" cy="310" r="46" fill="#fff"/>
  <line x1="400" y1="292" x2="400" y2="328" stroke="${bodyCol}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="400" cy="318" r="3" fill="${bodyCol}"/>
  <line x1="382" y1="310" x2="418" y2="310" stroke="${bodyCol}" stroke-width="2" stroke-linecap="round"/>
  <rect x="375" y="370" width="50" height="70" rx="6" fill="#e0f2fe"/>
  <circle cx="400" cy="405" r="14" fill="${bodyCol}"/>`;
product('product-dispenser.svg', dispenser('#0284c7'));
product('product-dispenser-2.svg', dispenser('#0ea5e9'));

/* Cooking Range (5-burner) */
const range = (topCol, bodyCol) =>
  `<rect x="${400 - 150}" y="240" width="300" height="320" rx="10" fill="${bodyCol}" stroke="#334159"/>
  <circle cx="${400 - 90}" cy="300" r="30" fill="#fbbf24"/>
  <line x1="${400 - 90}" y1="282" x2="${400 - 90}" y2="318" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="${400 - 90}" cy="302" r="3" fill="#fff"/>
  <circle cx="${400 + 90}" cy="300" r="30" fill="#fbbf24"/>
  <circle cx="${400 + 90}" cy="300" r="3" fill="${bodyCol}"/>
  <circle cx="${400 - 90}" cy="370" r="30" fill="#fbbf24"/>
  <circle cx="${400 + 90}" cy="370" r="30" fill="#fbbf24"/>
  <circle cx="400" cy="430" r="38" fill="#fbbf24"/>
  <rect x="${400 - 150}" y="550" width="300" height="10" rx="5" fill="${topCol}"/>
  <line x1="${400 - 70}" y1="572" x2="${400 + 70}" y2="572" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>`;
product('product-range.svg', range('#ffffff', '#1e293b'));
product('product-range-2.svg', range('#1e293b', '#0f52ba'));

/* Kitchen Hood (canopy) */
const hood = (bgCol, grille) =>
  `<rect x="${400 - 160}" y="220" width="320" height="200" rx="8" fill="${bgCol}"/>
  <rect x="${400 - 160}" y="220" width="320" height="40" rx="8 8 0 0" fill="#0f52ba"/>
  <line x1="${400}" y1="260" x2="${400}" y2="340" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <circle cx="${400}" cy="300" r="6" fill="#fff"/>
  <line x1="${400 - 60}" y1="280" x2="${400 + 60}" y2="280" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M${400 - 160} 420 Q${400} 470 ${400 + 160} 420" fill="${grille}"/>
  <rect x="${400 - 80}" y="430" width="160" height="20" rx="6" fill="#475569"/>`;
product('product-hood.svg', hood('#1e293b', '#334159'));
product('product-hood-2.svg', hood('#0f52ba', '#1e3a8a'));

/* Washing Machine (front load) */
const washer = (door) =>
  `<rect x="${400 - 140}" y="190" width="280" height="370" rx="8" fill="#0f52ba" stroke="#0284c7"/>
  <rect x="${400 - 110}" y="210" width="220" height="220" rx="4" fill="#1e293b"/>
  <path d="M${400 - 50} 310 H${400 + 50} A40 40 0 0 0 ${400 + 30} 290 A50 50 0 0 1 ${400} 270 A50 50 0 0 1 ${400 - 30} 290 A40 40 0 0 0 ${400 - 50} 310 Z" fill="${door}"/>
  <circle cx="${400}" cy="310" r="12" fill="#0f52ba"/>
  <rect x="${400 - 100}" y="450" width="200" height="30" rx="6" fill="#1e293b"/>
  <rect x="${400 - 40}" y="460" width="80" height="10" rx="5" fill="#bfdbfd"/>
  <circle cx="${400 + 110}" cy="465" r="8" fill="#94a3b8"/>`;
product('product-washer.svg', washer('#fff'));
product('product-washer-2.svg', washer('#e0f2fe'));

/* Geyser (tank) */
const geyser = (bgCol) =>
  `<rect x="${400 - 110}" y="120" width="220" height="420" rx="10" fill="${bgCol}" stroke="#1e3a8a"/>
  <line x1="${400 - 110}" y1="120" x2="${400 - 110}" y2="540" stroke="#1e3a8a" stroke-width="3"/>
  <line x1="${400 + 110}" y1="120" x2="${400 + 110}" y2="540" stroke="#1e3a8a" stroke-width="3"/>
  <rect x="${400 - 100}" y="160" width="200" height="390" rx="4" fill="#bfdbfd"/>
  <rect x="${400 - 100}" y="160" width="200" height="80" rx="0 0 0 0" fill="#1e3a8a"/>
  <rect x="${400 - 20}" y="340" width="40" height="30" rx="4" fill="#60a5fa"/>
  <circle cx="${400}" cy="355" r="8" fill="#60a5fa"/>
  <rect x="${400 - 110}" y="540" width="220" height="10" rx="5" fill="#94a3b8"/>`;
product('product-geyser.svg', geyser('#0f52ba'));
product('product-geyser-2.svg', geyser('#1e3a8a'));

/* Electric Heater (oil radiator / dish) */
const heater = (bgCol) =>
  `<rect x="${400 - 100}" y="130" width="200" height="400" rx="14" fill="${bgCol}"/>
  <rect x="${400 - 100}" y="130" width="200" height="70" rx="14 14 0 0" fill="#fbbf24"/>
  <line x1="${400}" y1="130" x2="${400}" y2="530" stroke="#0f52ba" stroke-width="1.5"/>
  <rect x="${400 - 85}" y="215" width="170" height="26" rx="6" fill="#1e293b"/>
  <rect x="${400 - 85}" y="252" width="170" height="26" rx="6" fill="#1e293b"/>
  <rect x="${400 - 85}" y="385" width="170" height="26" rx="6" fill="#1e293b"/>
  <rect x="${400 - 60}" y="530" width="120" height="18" rx="9" fill="#0f52ba"/>
  <circle cx="${400}" cy="539" r="5" fill="#fff"/>`;
product('product-heater.svg', heater('#1e293b'));
product('product-heater-2.svg', heater('#0f52ba'));

/* Built-in Oven */
const oven = (bgCol, win) =>
  `<rect x="${400 - 140}" y="180" width="280" height="360" rx="8" fill="${bgCol}"/>
  <rect x="${400 - 120}" y="210" width="240" height="210" rx="4" fill="${win}"/>
  <circle cx="${400}" cy="315" r="30" fill="#0f52ba"/>
  <circle cx="${400}" cy="315" r="10" fill="#fff"/>
  <rect x="${400 - 120}" y="430" width="240" height="110" rx="6" fill="#334159"/>
  <text x="${400}" y="490" font-family="Poppins,sans-serif" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">700</text>
  <circle cx="${400 + 120}" cy="505" r="10" fill="#94a3b8"/>`;
product('product-oven.svg', oven('#1e293b', '#f8fafc'));
product('product-oven-2.svg', oven('#0f52ba', '#e0f2fd'));

/* Microwave */
const microwave = (bgCol) =>
  `<rect x="${400 - 150}" y="240" width="300" height="240" rx="8" fill="${bgCol}"/>
  <rect x="${400 - 140}" y="255" width="280" height="60" rx="4" fill="#0f52ba"/>
  <rect x="${400 - 140}" y="325" width="280" height="170" rx="6" fill="#1e293b"/>
  <line x1="${400 - 125}" y1="360" x2="${400 + 125}" y2="360" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <line x1="${400 - 125}" y1="395" x2="${400 + 125}" y2="395" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <line x1="${400 - 125}" y1="430" x2="${400 + 125}" y2="430" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <circle cx="${400 + 125}" cy="480" r="12" fill="#0f52ba"/>`;
product('product-microwave.svg', microwave('#1e293b'));
product('product-microwave-2.svg', microwave('#0f52ba'));

/* Built-in Hob (glass) */
const hob = (bgCol) =>
  `<rect x="${400 - 150}" y="230" width="300" height="280" rx="8" fill="${bgCol}"/>
  <rect x="${400 - 140}" y="245" width="280" height="120" rx="4" fill="#0ea5e9"/>
  <circle cx="${400 - 80}" cy="305" r="28" fill="#1e293b"/>
  <circle cx="${400 + 80}" cy="305" r="28" fill="#1e293b"/>
  <circle cx="${400 - 80}" cy="380" r="28" fill="#1e293b"/>
  <circle cx="${400 + 80}" cy="380" r="28" fill="#1e293b"/>
  <rect x="${400 - 150}" y="470" width="300" height="40" rx="6" fill="#334159"/>
  <text x="${400 - 60}" y="495" font-family="Poppins,sans-serif" font-size="20" font-weight="700" fill="#fff">ON</text>`;
product('product-hob.svg', hob('#1e293b'));
product('product-hob-2.svg', hob('#0f52ba'));

/* Infrared cooker / hot plate */
const infra = (bgCol) =>
  `<rect x="${400 - 100}" y="220" width="200" height="320" rx="10" fill="${bgCol}"/>
  <rect x="${400 - 140}" y="240" width="280" height="280" rx="10" fill="#1e293b"/>
  <rect x="${400 - 110}" y="300" width="220" height="70" rx="6" fill="#0ea5e9"/>
  <line x1="${400}" y1="290" x2="${400}" y2="370" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="${400}" cy="330" r="3" fill="#fff"/>
  <line x1="${385}" y1="330" x2="${415}" y2="330" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <rect x="${400 - 140}" y="540" width="280" height="20" rx="6" fill="#334159"/>
  <rect x="${400 - 25}" y="544" width="50" height="12" rx="6" fill="#0f52ba"/>`;
product('product-infrared.svg', infra('#1e293b'));
product('product-infrared-2.svg', infra('#0f52ba'));

/* Gas stove (small portable) */
const gas = (bgCol) =>
  `<rect x="${400 - 140}" y="260" width="280" height="280" rx="10" fill="${bgCol}"/>
  <circle cx="${400 - 80}" cy="350" r="40" fill="#fbbf24"/>
  <circle cx="${400 - 80}" cy="350" r="3" fill="${bgCol}" stroke="#1e293b"/>
  <circle cx="${400 + 80}" cy="350" r="40" fill="#fbbf24"/>
  <circle cx="${400 + 80}" cy="350" r="3" fill="${bgCol}" stroke="#1e293b"/>
  <circle cx="${400}" cy="440" r="46" fill="#fbbf24"/>
  <rect x="${400 - 140}" y="510" width="280" height="30" rx="6" fill="#1e293b"/>
  <rect x="${400 - 60}" y="524" width="120" height="2" rx="1" fill="#94a3b8"/>`;
product('product-gas-stove.svg', gas('#0f52ba'));
product('product-gas-stove-2.svg', gas('#1e293b'));

console.log('Generated product images');
