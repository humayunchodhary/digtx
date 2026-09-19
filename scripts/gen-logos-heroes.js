/* Generates logo + hero slide SVGs for the Nasgas clone. */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve(process.cwd(), 'src/assets/images');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const save = (name, content) =>
  writeFileSync(resolve(dir, name), content);

const full = (w, h, body, bg = '#ffffff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">` +
  (bg !== 'transparent' ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : '') +
  body + `</svg>`;

/* Logo (blue mark + wordmark with red flame) */
save('logo.svg', full(240, 80, transparentLogo('#0f52ba'), '#ffffff'));
save('logo-white.svg', full(240, 80, transparentLogo('#ffffff'), '#0f52ba'));

function transparentLogo(textColor) {
  return `<rect x="20" y="10" width="64" height="60" rx="10" fill="#0f52ba" stroke="${textColor}" stroke-width="1"/>
  <rect x="26" y="22" width="52" height="5" rx="2.5" fill="${textColor}"/>
  <rect x="26" y="35" width="52" height="5" rx="2.5" fill="${textColor}"/>
  <rect x="26" y="48" width="52" height="5" rx="2.5" fill="${textColor}"/>
  <rect x="26" y="35" width="16" height="5" rx="2.5" fill="#0f52ba"/>
  <rect x="42" y="35" width="12" height="5" rx="2.5" fill="#0f52ba"/>
  <text x="164" y="52" font-family="Poppins,sans-serif" font-size="26" font-weight="700" fill="${textColor}" text-anchor="middle">NASGAS</text>
  <text x="164" y="68" font-family="Poppins,sans-serif" font-size="11" font-weight="400" fill="${textColor}" text-anchor="middle">ELECTRIC</text>
  <rect x="124" y="36" width="64" height="16" rx="8" fill="#ec0101"/>
  <rect x="138" y="40" width="36" height="8" rx="4" fill="#fff"/>
  <circle cx="178" cy="44" r="5" fill="#fff"/>
  <line x1="124" y1="36" x2="124" y2="52" stroke="#ec0101" stroke-width="2"/>
  <rect x="114" y="44" width="10" height="2" rx="1" fill="#ec0101"/>`;
}

// Hero slides (6) — wide banner with a product illustration on the right
const heroes = [
  ['hero-cooler.svg', '#1e3a8a', coolerBody()],
  ['hero-dispenser.svg', '#0284c7', dispenserBody()],
  ['hero-kitchen.svg', '#ffffff', kitchenBody()],
  ['hero-hood.svg', '#1e293b', hoodBody()],
  ['hero-washing.svg', '#ffffff', washingBody()],
  ['hero-geyser.svg', '#0f52ba', geyserBody()],
];
for (const [name, stroke, body] of heroes) {
  const bg = name === 'hero-cooler.svg' ? '#eef2f7' : name === 'hero-dispenser.svg' ? '#cff0fd'
    : name === 'hero-kitchen.svg' ? '#ffffff' : name === 'hero-hood.svg' ? '#ffffff'
      : name === 'hero-washing.svg' ? '#f8fafc' : '#eef2f7';
  save(name, full(1440, 560, `<rect width="1440" height="560" fill="${bg}"/>` + bodyBg(stroke) + body));
}

function bodyBg(s) { return `<rect x="560" y="80" width="820" height="420" rx="16" fill="${s}" stroke="#0f52ba" stroke-width="2"/>`; }
function coolerBody() {
  return `<rect x="700" y="130" width="220" height="320" rx="10" fill="#fff"/>
  <rect x="700" y="200" width="220" height="60" fill="#e2e8f0"/>
  <line x1="740" y1="290" x2="880" y2="290" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <line x1="740" y1="320" x2="840" y2="320" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <circle cx="860" cy="360" r="36" fill="#0f52ba"/>
  <line x1="860" y1="342" x2="860" y2="378" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <circle cx="882" cy="360" r="4" fill="#fff"/>`;
}
function dispenserBody() {
  return `<rect x="600" y="140" width="120" height="300" rx="8" fill="#fff"/>
  <line x1="630" y1="160" x2="690" y2="160" stroke="#94a3b8" stroke-width="2"/>
  <line x1="630" y1="180" x2="690" y2="180" stroke="#94a3b8" stroke-width="2"/>
  <line x1="630" y1="200" x2="690" y2="200" stroke="#94a3b8" stroke-width="2"/>
  <rect x="620" y="300" width="70" height="80" rx="6" fill="#e0f2fe"/>
  <circle cx="655" cy="340" r="24" fill="#0284c7"/>
  <line x1="655" y1="325" x2="655" y2="355" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <circle cx="655" cy="360" r="3" fill="#fff"/>`;
}
function kitchenBody() {
  return `<rect x="660" y="140" width="160" height="280" rx="6" fill="#1e293b"/>
  <circle cx="740" cy="220" r="42" fill="#fbbf24"/>
  <line x1="740" y1="185" x2="740" y2="255" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <circle cx="740" cy="230" r="4" fill="#fff"/>
  <line x1="718" y1="210" x2="762" y2="210" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <rect x="850" y="150" width="240" height="90" rx="4" fill="#1e293b"/>
  <rect x="870" y="255" width="220" height="125" rx="6" fill="#fff" stroke="#e2e8f0"/>`;
}
function hoodBody() {
  return `<rect x="570" y="120" width="620" height="200" rx="8" fill="#334159"/>
  <path d="M570 320 Q680 380 790 320 T1010 320" fill="#0f52ba"/>
  <rect x="680" y="170" width="80" height="50" rx="40" fill="#f8fafc"/>
  <circle cx="725" cy="300" r="8" fill="#fbbf24"/>`;
}
function washingBody() {
  return `<rect x="640" y="140" width="300" height="300" rx="8" fill="#0f52ba"/>
  <path d="M900 240 A100 100 0 1 1 740 240 A60 60 0 0 0 900 240 Z" fill="#fff"/>
  <line x1="760" y1="240" x2="840" y2="240" stroke="#0f52ba" stroke-width="2" stroke-linecap="round"/>
  <circle cx="800" cy="240" r="3" fill="#0f52ba"/>
  <rect x="720" y="370" width="180" height="45" rx="6" fill="#1e293b"/>
  <rect x="775" y="376" width="70" height="33" rx="4" fill="#0f52ba"/>`;
}
function geyserBody() {
  return `<rect x="590" y="130" width="220" height="330" rx="6" fill="#0f52ba"/>
  <line x1="590" y1="130" x2="590" y2="460" stroke="#1e3a8a" stroke-width="3"/>
  <line x1="810" y1="130" x2="810" y2="460" stroke="#1e3a8a" stroke-width="3"/>
  <rect x="600" y="150" width="200" height="310" rx="4" fill="#bfdbfd"/>`;
}

console.log('Generated logos + heroes');
