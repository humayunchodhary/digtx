/* Generates category card images (480x480) for the 12 categories. */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve(process.cwd(), 'src/assets/images');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const save = (n, c) => writeFileSync(resolve(dir, n), c);
const full = (w, h, body, bg = '#ffffff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">` +
  `<rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
const G = (bg) => `<rect x="80" y="90" width="320" height="320" rx="12" fill="${bg}" stroke="#e2e8f0" stroke-width="1"/>`;

/* Cooking Range */
save('cat-cooking-range.svg', full(480, 480, G('#ffffff') +
  `<rect x="140" y="200" width="200" height="200" rx="8" fill="#1e293b"/>
  <circle cx="200" cy="260" r="26" fill="#fbbf24"/>
  <line x1="200" y1="240" x2="200" y2="280" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="200" cy="272" r="3" fill="#fff"/>
  <line x1="178" y1="258" x2="222" y2="258" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <circle cx="280" cy="310" r="20" fill="#f8fafc"/>
  <circle cx="280" cy="310" r="8" fill="#0f52ba"/>
  <rect x="180" y="380" width="120" height="30" rx="6" fill="#0f52ba"/>
  <circle cx="240" cy="395" r="5" fill="#fff"/>`));

/* Built-in Hobs */
save('cat-hobs.svg', full(480, 480, G('#f8fafc') +
  `<rect x="140" y="160" width="200" height="200" rx="8" fill="#e2e8f0"/>
  <circle cx="190" cy="230" r="22" fill="#1e293b"/>
  <circle cx="190" cy="230" r="7" fill="#0f52ba"/>
  <circle cx="290" cy="230" r="22" fill="#1e293b"/>
  <circle cx="290" cy="230" r="7" fill="#0f52ba"/>
  <circle cx="190" cy="310" r="22" fill="#1e293b"/>
  <circle cx="290" cy="310" r="22" fill="#1e293b"/>
  <rect x="140" y="400" width="200" height="20" rx="4" fill="#bfdbfd"/>`));

/* Kitchen Hood */
save('cat-hood.svg', full(480, 480, G('#1e293b') +
  `<path d="M140 260 Q240 340 340 260" fill="#334159"/>
  <path d="M140 260 L180 340 H300 L340 260" fill="#0f52ba"/>
  <rect x="200" y="340" width="80" height="80" rx="8" fill="#0f52ba"/>
  <circle cx="240" cy="375" r="4" fill="#fff"/>
  <circle cx="260" cy="375" r="4" fill="#fff"/>`));

/* Water Dispenser */
save('cat-dispenser.svg', full(480, 480, G('#ffffff') +
  `<rect x="150" y="130" width="180" height="280" rx="10" fill="#0284c7"/>
  <circle cx="240" cy="230" r="40" fill="#fff"/>
  <line x1="240" y1="210" x2="240" y2="250" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="240" cy="250" r="3" fill="#0284c7"/>
  <line x1="225" y1="230" x2="255" y2="230" stroke="#0284c7" stroke-width="2" stroke-linecap="round"/>
  <rect x="210" y="290" width="60" height="80" rx="6" fill="#e0f2fe"/>
  <circle cx="240" cy="325" r="12" fill="#0284c7"/>
  <rect x="150" y="430" width="180" height="20" rx="4" fill="#bfdbfd"/>`));

/* Gas Stoves (portable) */
save('cat-gas-stoves.svg', full(480, 480, G('#ffffff') +
  `<rect x="130" y="220" width="220" height="160" rx="8" fill="#1e293b"/>
  <circle cx="190" cy="280" r="30" fill="#fbbf24"/>
  <line x1="190" y1="262" x2="190" y2="298" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="190" cy="282" r="3" fill="#fff"/>
  <circle cx="310" cy="280" r="26" fill="#fbbf24"/>
  <circle cx="310" cy="280" r="3" fill="#0f52ba"/>
  <rect x="130" y="390" width="220" height="28" rx="6" fill="#bfdbfd"/>
  <rect x="170" y="410" width="120" height="8" rx="4" fill="#94a3b8"/>`));

/* Infrared Cooker */
save('cat-infrared.svg', full(480, 480, G('#ffffff') +
  `<rect x="140" y="200" width="200" height="210" rx="10" fill="#1e293b"/>
  <rect x="170" y="230" width="140" height="90" rx="6" fill="#0f52ba"/>
  <circle cx="240" cy="275" r="28" fill="#fbbf24"/>
  <circle cx="240" cy="275" r="10" fill="#0f52ba"/>
  <rect x="170" y="340" width="140" height="70" rx="6" fill="#334159"/>
  <rect x="200" y="370" width="20" height="4" rx="2" fill="#fbbf24"/>
  <rect x="200" y="382" width="20" height="4" rx="2" fill="#fbbf24"/>
  <rect x="200" y="394" width="20" height="4" rx="2" fill="#fbbf24"/>`));

/* Washing Machine */
save('cat-washing-machine.svg', full(480, 480, G('#ffffff') +
  `<rect x="150" y="130" width="180" height="270" rx="8" fill="#0f52ba"/>
  <path d="M170 370 H310 A40 40 0 0 0 290 300 A50 50 0 0 1 240 270 A50 50 0 0 1 190 300 A40 40 0 0 0 170 370 Z" fill="#fff"/>
  <rect x="220" y="400" width="40" height="4" rx="2" fill="#bfdbfd"/>
  <rect x="200" y="150" width="80" height="30" rx="6" fill="#1e293b"/>
  <circle cx="240" cy="165" r="5" fill="#fff"/>`));

/* Room Air Cooler */
save('cat-air-cooler.svg', full(480, 480, G('#ffffff') +
  `<rect x="130" y="120" width="220" height="290" rx="10" fill="#1e3a8a"/>
  <rect x="140" y="230" width="200" height="120" rx="4" fill="#fff"/>
  <line x1="160" y1="260" x2="320" y2="260" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="285" x2="320" y2="285" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <circle cx="320" cy="315" r="20" fill="#0f52ba"/>
  <line x1="320" y1="300" x2="320" y2="330" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="240" cy="430" r="22" fill="#0f52ba"/>`));

/* Geysers */
save('cat-geyser.svg', full(480, 480, G('#ffffff') +
  `<rect x="220" y="80" width="40" height="300" rx="8" fill="#0f52ba"/>
  <rect x="180" y="80" width="80" height="60" rx="8 8 0 0" fill="#0f52ba"/>
  <line x1="220" y1="80" x2="220" y2="380" stroke="#1e3a8a" stroke-width="2"/>
  <rect x="200" y="90" width="40" height="40" rx="6" fill="#bfdbfd"/>
  <line x1="240" y1="180" x2="240" y2="360" stroke="#bfdbfd" stroke-width="2" stroke-linecap="round"/>
  <line x1="218" y1="110" x2="222" y2="110" stroke="#1e3a8a" stroke-width="1.5"/>
  <circle cx="200" cy="395" r="10" fill="#0f52ba"/>
  <circle cx="240" cy="395" r="10" fill="#0f52ba"/>
  <circle cx="280" cy="395" r="10" fill="#0f52ba"/>`));

/* Built-in Oven */
save('cat-oven.svg', full(480, 480, G('#ffffff') +
  `<rect x="150" y="130" width="180" height="240" rx="8" fill="#1e293b"/>
  <rect x="170" y="150" width="140" height="130" rx="4" fill="#f8fafc"/>
  <circle cx="240" cy="215" r="24" fill="#0f52ba"/>
  <circle cx="240" cy="215" r="8" fill="#fff"/>
  <rect x="170" y="300" width="140" height="70" rx="6" fill="#334159"/>
  <text x="240" y="345" font-family="Poppins,sans-serif" font-size="24" font-weight="700" fill="#fff" text-anchor="middle">700</text>
  <circle cx="300" cy="400" r="8" fill="#94a3b8"/>`));

/* Built-in Microwave Oven */
save('cat-microwave.svg', full(480, 480, G('#ffffff') +
  `<rect x="140" y="160" width="200" height="170" rx="8" fill="#1e293b"/>
  <rect x="160" y="180" width="160" height="60" rx="4" fill="#0f52ba"/>
  <rect x="160" y="250" width="160" height="80" rx="6" fill="#334159"/>
  <line x1="170" y1="275" x2="290" y2="275" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <line x1="170" y1="300" x2="290" y2="300" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <line x1="170" y1="325" x2="290" y2="325" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
  <circle cx="300" cy="345" r="10" fill="#0f52ba"/>`));

/* Electric Heater */
save('cat-heater.svg', full(480, 480, G('#ffffff') +
  `<rect x="200" y="110" width="80" height="300" rx="12" fill="#1e293b"/>
  <rect x="200" y="110" width="80" height="60" rx="12 12 0 0" fill="#fbbf24"/>
  <line x1="240" y1="110" x2="240" y2="410" stroke="#0f52ba" stroke-width="1.5"/>
  <line x1="205" y1="150" x2="275" y2="150" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="205" y1="185" x2="275" y2="185" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="205" y1="220" x2="275" y2="220" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="205" y1="255" x2="275" y2="255" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="205" y1="290" x2="275" y2="290" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
  <rect x="220" y="390" width="40" height="20" rx="10" fill="#0f52ba"/>
  <circle cx="240" cy="400" r="6" fill="#0f52ba"/>`));

console.log('Generated category images');
