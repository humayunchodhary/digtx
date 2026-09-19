import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'assets', 'images');
mkdirSync(outDir, { recursive: true });

const DARK = '#1a1a1a';

function backdrop(view, accent) {
  const bg = {
    front: '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff7ee"/><stop offset="100%" stop-color="#ffead6"/></linearGradient>',
    side: '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f4f6fa"/><stop offset="100%" stop-color="#e0e7f0"/></linearGradient>',
    detail:
      `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2b2e33"/><stop offset="100%" stop-color="#15171a"/></linearGradient>`,
  }[view];
  const shadow = view === 'detail' ? '#000' : '#d8b48f';
  const shadowOp = view === 'detail' ? '0.35' : '0.5';
  const labelColor = view === 'detail' ? '#9aa4b5' : '#c9a37d';
  const label = view === 'front' ? 'FRONT' : view === 'side' ? 'SIDE' : 'PRODUCT DETAIL';
  return `
  <defs>${bg}
    <linearGradient id="metal${view}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4a4e55"/><stop offset="100%" stop-color="#1e2126"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <ellipse cx="200" cy="262" rx="118" ry="15" fill="${shadow}" opacity="${shadowOp}"/>
  <text x="20" y="284" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="${labelColor}">${label}</text>
  <text x="380" y="284" text-anchor="end" font-family="Arial, sans-serif" font-size="12" fill="${labelColor}">DIGIT X</text>`;
}

function svg(view, accent, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">${backdrop(view, accent)}${inner}</svg>\n`;
}

function speakersFront(c, w) {
  const d = w >= 150 ? 0 : 0;
  return `
  <rect x="${d + 112}" y="120" width="${176}" height="112" rx="34" fill="${c}"/>
  <rect x="${d + 112}" y="120" width="${176}" height="46" rx="34" fill="${DARK}"/>
  <circle cx="${d + 186}" cy="192" r="26" fill="#15171a"/>
  <circle cx="${d + 186}" cy="192" r="12" fill="#3a3d42"/>
  <circle cx="${d + 214}" cy="160" r="7" fill="#3a3d42"/>`;
}

const RENDER = {
  earbudsCase: [
    // front
    (c) => `
  <rect x="132" y="104" width="136" height="104" rx="26" fill="#ffffff" stroke="#f0c9a8" stroke-width="4"/>
  <rect x="132" y="104" width="136" height="42" rx="26" fill="${DARK}"/>
  <ellipse cx="162" cy="115" rx="22" ry="11" fill="#ffffff" transform="rotate(-10 162 115)"/>
  <ellipse cx="238" cy="115" rx="22" ry="11" fill="#ffffff" transform="rotate(10 238 115)"/>
  <circle cx="165" cy="134" r="6" fill="${c}"/>
  <ellipse cx="162" cy="170" rx="20" ry="28" fill="${c}" transform="rotate(-14 162 170)"/>
  <ellipse cx="238" cy="170" rx="20" ry="28" fill="${c}" transform="rotate(14 238 170)"/>
  <circle cx="200" cy="76" r="28" fill="${c}" opacity="0.15"/>`,
    // side
    (c) => `
  <path d="M176 80 h48 v44 q0 6 -6 6 h-36 q-6 0 -6 -6z" fill="${DARK}"/>
  <rect x="170" y="130" width="60" height="120" rx="18" fill="#ffffff" stroke="#e6c6a2" stroke-width="4"/>
  <rect x="178" y="146" width="44" height="30" rx="8" fill="#22242a"/>
  <circle cx="200" cy="161" r="7" fill="${c}"/>
  <polygon points="200,186 190,196 200,204 210,196" fill="${c}"/>`,
    // detail
    (c) => `
  <circle cx="200" cy="168" r="62" fill="#ffffff" stroke="#d9c2a4" stroke-width="5"/>
  <circle cx="200" cy="168" r="42" fill="${c}"/>
  <path d="M200 126 q34 34 0 42 q-34 -8 0 -42" fill="#d9d9d9"/>
  <circle cx="200" cy="168" r="22" fill="#ffefe0"/>
  <circle cx="192" cy="160" r="8" fill="#1a1a1a"/>
  <circle cx="208" cy="176" r="8" fill="#1a1a1a"/>`,
  ],
  neckband: [
    (c) => `
  <path d="M96 150 q104 -74 208 0" fill="none" stroke="${DARK}" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="96" cy="170" rx="24" ry="34" fill="${c}"/>
  <ellipse cx="304" cy="170" rx="24" ry="34" fill="${c}"/>
  <rect x="78" y="196" width="36" height="12" rx="6" fill="${DARK}"/>
  <rect x="286" y="196" width="36" height="12" rx="6" fill="${DARK}"/>`,
    (c) => `
  <path d="M70 210 q130 -160 260 0" fill="none" stroke="${DARK}" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="300" cy="192" rx="22" ry="30" fill="${c}"/>`,
    (c) => `
  <rect x="140" y="96" width="120" height="96" rx="30" fill="${c}"/>
  <path d="M188 96 q24 -26 48 0 l-8 26 q-16 -14 -32 0z" fill="${DARK}"/>
  <rect x="168" y="160" width="64" height="22" rx="11" fill="${DARK}"/>
  <circle cx="184" cy="171" r="4" fill="${c}"/>`,
  ],
  sportbud: [
    (c) => `
  <path d="M200 130 q40 0 40 34 q0 28 -40 28 q-40 0 -40 -28 q0 -34 40 -34" fill="${c}"/>
  <path d="M200 192 q30 40 6 74" fill="none" stroke="${DARK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M130 120 q0 30 14 34 q14 -4 14 -34 z" fill="${c}" opacity="0.7"/>
  <path d="M270 120 q0 30 -14 34 q-14 -4 -14 -34 z" fill="${c}" opacity="0.7"/>`,
    (c) => `
  <ellipse cx="200" cy="170" rx="40" ry="52" fill="${c}"/>
  <path d="M200 218 q-22 26 -4 50" fill="none" stroke="${DARK}" stroke-width="12" stroke-linecap="round"/>`,
    (c) => `
  <circle cx="200" cy="160" r="54" fill="${c}"/>
  <circle cx="200" cy="160" r="34" fill="${DARK}"/>
  <path d="M200 126 q26 26 0 34 q-26 -8 0 -34" fill="#c9c9c9"/>
  <rect x="182" y="208" width="36" height="40" rx="10" fill="${DARK}"/>`,
  ],
  headphone: [
    (c) => `
  <path d="M116 128 q84 -64 168 0" fill="none" stroke="${DARK}" stroke-width="18" stroke-linecap="round"/>
  <rect x="92" y="142" width="48" height="96" rx="22" fill="${c}" stroke="${DARK}" stroke-width="5"/>
  <ellipse cx="116" cy="190" rx="14" ry="16" fill="#fff2e0"/>
  <rect x="260" y="142" width="48" height="96" rx="22" fill="${c}" stroke="${DARK}" stroke-width="5"/>
  <ellipse cx="284" cy="190" rx="14" ry="16" fill="#fff2e0"/>`,
    (c) => `
  <path d="M116 128 q84 -64 168 0" fill="none" stroke="${DARK}" stroke-width="18" stroke-linecap="round"/>
  <rect x="252" y="140" width="52" height="100" rx="24" fill="${c}" stroke="${DARK}" stroke-width="5"/>
  <ellipse cx="278" cy="190" rx="16" ry="18" fill="#fff2e0"/>`,
    (c) => `
  <circle cx="200" cy="170" r="58" fill="${c}"/>
  <circle cx="200" cy="170" r="34" fill="${DARK}"/>
  <circle cx="200" cy="170" r="24" fill="${c}" opacity="0.35"/>
  <circle cx="200" cy="136" r="8" fill="${DARK}"/>`,
  ],
  speakerBig: [
    (c) => `
  <rect x="112" y="116" width="176" height="116" rx="36" fill="${c}"/>
  <rect x="112" y="116" width="176" height="48" rx="36" fill="${DARK}"/>
  <circle cx="186" cy="192" r="26" fill="#15171a"/>
  <circle cx="186" cy="192" r="12" fill="#3a3d42"/>
  <circle cx="214" cy="158" r="8" fill="#3a3d42"/>
  <circle cx="188" cy="138" r="5" fill="${c}"/>`,
    (c) => `
  <rect x="156" y="92" width="88" height="136" rx="30" fill="${c}"/>
  <rect x="184" y="112" width="14" height="96" rx="7" fill="${DARK}"/>
  <path d="M168 252 h64 a8 8 0 0 1 8 8 v10 q0 8 -8 8 h-64 q-8 0 -8 -8 v-10 q0 -8 8 -8z" fill="${DARK}"/>`,
    (c) => `
  <circle cx="200" cy="170" r="60" fill="#15171a"/>
  <circle cx="200" cy="170" r="26" fill="${c}"/>
  <circle cx="200" cy="170" r="12" fill="#fff2e0"/>
  <path d="M200 92 q18 18 0 26 q-18 -8 0 -26" fill="${c}"/>`,
  ],
  speakerMini: [
    (c) => `
  <rect x="130" y="126" width="140" height="100" rx="30" fill="${c}"/>
  <circle cx="200" cy="176" r="24" fill="#15171a"/>
  <circle cx="200" cy="176" r="11" fill="#3a3d42"/>
  <rect x="150" y="146" width="16" height="24" rx="8" fill="${DARK}"/>`,
    (c) => `
  <rect x="156" y="96" width="88" height="120" rx="34" fill="${c}"/>
  <circle cx="182" cy="106" r="8" fill="#4a4e55"/>`,
    (c) => `
  <rect x="140" y="120" width="120" height="96" rx="26" fill="#15171a"/>
  <rect x="156" y="108" width="88" height="24" rx="12" fill="${c}"/>
  <rect x="156" y="108" width="88" height="24" rx="12" fill="#3a3d42"/>
  <rect x="156" y="108" width="44" height="24" rx="12" fill="${c}"/>`,
  ],
  watch: [
    (c, faceTime) => `
  <rect x="156" y="104" width="88" height="118" rx="40" fill="${DARK}"/>
  <rect x="164" y="114" width="72" height="98" rx="32" fill="#1c2230"/>
  <text x="200" y="154" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${faceTime}</text>
  <circle cx="184" cy="180" r="5" fill="#ff5e5e"/>
  <circle cx="200" cy="180" r="5" fill="#ff9a3c"/>
  <circle cx="216" cy="180" r="5" fill="#5ec4ff"/>
  <rect x="178" y="199" width="44" height="6" rx="3" fill="${c}"/>
  <rect x="188" y="222" width="24" height="10" rx="4" fill="${c}"/>
  <ellipse cx="200" cy="62" rx="52" ry="20" fill="${c}"/>
  <rect x="178" y="70" width="44" height="10" rx="5" fill="${c}"/>`,
    (c) => `
  <rect x="132" y="120" width="52" height="86" rx="26" fill="${DARK}"/>
  <ellipse cx="120" cy="163" rx="12" ry="26" fill="${c}"/>
  <rect x="132" y="132" width="52" height="20" rx="10" fill="#3a3d42"/>
  <path d="M150 86 q34 -30 68 0 l8 34 q-42 -20 -84 0z" fill="${c}"/>`,
    (c) => `
  <rect x="128" y="170" width="144" height="44" rx="22" fill="${DARK}"/>
  <circle cx="200" cy="192" r="58" fill="#1c2230" stroke="#3a3d42" stroke-width="6"/>
  <circle cx="200" cy="192" r="38" fill="none" stroke="${c}" stroke-width="9" stroke-dasharray="118 122" stroke-linecap="round" transform="rotate(-90 200 192)"/>
  <circle cx="200" cy="192" r="20" fill="none" stroke="#5ec4ff" stroke-width="6"/>`,
  ],
  powerbank: [
    (c, mAh) => `
  <rect x="130" y="118" width="140" height="116" rx="26" fill="url(#metalfront)"/>
  <rect x="144" y="132" width="112" height="30" rx="9" fill="#1c1e22"/>
  <text x="200" y="152" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff">${mAh}</text>
  <rect x="144" y="176" width="112" height="10" rx="5" fill="#282b30"/>
  <rect x="144" y="176" width="84" height="10" rx="5" fill="${c}"/>
  <circle cx="172" cy="208" r="8" fill="#282b30"/>
  <circle cx="200" cy="208" r="8" fill="#282b30"/>
  <circle cx="228" cy="208" r="8" fill="#282b30"/>
  <circle cx="172" cy="208" r="3.5" fill="${c}"/>`,
    (c) => `
  <rect x="160" y="88" width="80" height="132" rx="18" fill="url(#metalside)"/>
  <rect x="172" y="100" width="56" height="10" rx="4" fill="#282b30"/>
  <rect x="180" y="196" width="12" height="14" rx="3" fill="#282b30"/>
  <rect x="206" y="196" width="12" height="14" rx="3" fill="${c}"/>`,
    (c) => `
  <rect x="120" y="170" width="160" height="40" rx="16" fill="${c}"/>
  <circle cx="200" cy="100" r="70" fill="#1c1e22" stroke="#3a3d42" stroke-width="6"/>
  <circle cx="200" cy="100" r="44" fill="none" stroke="#282b30" stroke-width="10"/>
  <circle cx="200" cy="100" r="44" fill="none" stroke="${c}" stroke-width="10" stroke-dasharray="207 70" stroke-linecap="round" transform="rotate(-90 200 100)"/>`,
  ],
  gamingHeadset: [
    (c) => `
  <path d="M118 118 q82 -54 164 0" fill="none" stroke="${DARK}" stroke-width="18" stroke-linecap="round"/>
  <rect x="94" y="132" width="48" height="100" rx="22" fill="${DARK}"/>
  <ellipse cx="118" cy="182" rx="15" ry="17" fill="#2b2e33"/>
  <rect x="262" y="132" width="48" height="100" rx="22" fill="${DARK}"/>
  <ellipse cx="286" cy="182" rx="15" ry="17" fill="#2b2e33"/>
  <circle cx="124" cy="160" r="5" fill="${c}"/>
  <circle cx="276" cy="160" r="5" fill="${c}"/>
  <path d="M286 214 l-14 36 q-4 10 -12 10 h-10 q-10 0 -8 -12 l8 -34z" fill="${DARK}"/>`,
    (c) => `
  <path d="M110 110 q90 -52 180 0" fill="none" stroke="${DARK}" stroke-width="18" stroke-linecap="round"/>
  <rect x="258" y="126" width="52" height="106" rx="24" fill="${DARK}"/>
  <ellipse cx="284" cy="178" rx="16" ry="18" fill="#2b2e33"/>
  <path d="M250 160 q34 -20 68 0" fill="none" stroke="${c}" stroke-width="6"/>`,
    (c) => `
  <circle cx="200" cy="162" r="60" fill="${DARK}"/>
  <circle cx="200" cy="162" r="38" fill="#2b2e33"/>
  <path d="M248 220 q28 6 20 26 l-6 20 q-6 12 -20 12 l-14 -2 q-14 -4 -8 -18z" fill="${DARK}"/>
  <circle cx="200" cy="200" r="6" fill="${c}"/>`,
  ],
  gamepad: [
    (c) => `
  <path d="M104 168 q40 -62 96 -62 q56 0 96 62 q-26 -24 -58 -24 q-26 0 -44 24 q-18 -24 -44 -24 q-32 0 -58 24z" fill="${DARK}"/>
  <path d="M110 172 q16 52 24 64 q6 10 -2 18 l-40 24 l-14 -26 z" fill="${DARK}"/>
  <path d="M290 172 q-16 52 -24 64 q-6 10 2 18 l40 24 l14 -26 z" fill="${DARK}"/>
  <circle cx="188" cy="168" r="6" fill="${c}"/>
  <circle cx="212" cy="168" r="5" fill="${c}"/>
  <circle cx="150" cy="206" r="8" fill="${c}"/>
  <circle cx="250" cy="206" r="8" fill="${c}"/>`,
    (c) => `
  <path d="M120 170 q40 -60 80 -60 q24 0 44 18 l-40 34 z" fill="${DARK}"/>
  <path d="M124 172 l20 60 q4 12 14 12 l8 -2 q8 0 6 -10 l-10 -52 z" fill="${DARK}"/>
  <circle cx="196" cy="166" r="7" fill="${c}"/>`,
    (c) => `
  <rect x="150" y="96" width="100" height="108" rx="22" fill="${DARK}"/>
  <circle cx="200" cy="134" r="14" fill="#282b30"/>
  <path d="M186 134 a14 14 0 0 1 28 0 l5 44 q1 8 -7 8 h-24 q-8 0 -7 -8z" fill="#282b30"/>
  <circle cx="200" cy="134" r="7" fill="${c}"/>
  <circle cx="166" cy="188" r="9" fill="${c}"/>
  <circle cx="234" cy="188" r="9" fill="${c}"/>`,
  ],
  charger: [
    (c) => `
  <rect x="130" y="126" width="140" height="110" rx="18" fill="url(#metalfront)"/>
  <rect x="130" y="126" width="140" height="24" rx="10" fill="${c}"/>
  <text x="200" y="145" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff">100W GaN</text>
  <rect x="150" y="164" width="20" height="26" rx="7" fill="#282b30"/>
  <rect x="150" y="168" width="20" height="14" rx="4" fill="#22242a"/>
  <circle cx="160" cy="175" r="3" fill="${c}"/>
  <rect x="176" y="164" width="20" height="26" rx="7" fill="#282b30"/>
  <rect x="176" y="168" width="20" height="14" rx="4" fill="#22242a"/>
  <circle cx="186" cy="175" r="3" fill="${c}"/>
  <rect x="202" y="164" width="24" height="26" rx="7" fill="#282b30"/>
  <rect x="202" y="168" width="24" height="14" rx="4" fill="#22242a"/>
  <circle cx="214" cy="175" r="3" fill="${c}"/>
  <rect x="242" y="156" width="9" height="12" rx="2" fill="#282b30"/>`,
    (c) => `
  <rect x="150" y="96" width="100" height="118" rx="20" fill="url(#metalside)"/>
  <rect x="150" y="96" width="100" height="22" rx="10" fill="${c}"/>
  <path d="M172 214 l26 26 l26 -26 z" fill="${DARK}"/>`,
    (c) => `
  <rect x="96" y="150" width="96" height="80" rx="20" fill="${c}"/>
  <rect x="208" y="150" width="96" height="80" rx="20" fill="${c}"/>
  <rect x="96" y="150" width="96" height="40" rx="20" fill="${DARK}"/>
  <rect x="208" y="150" width="96" height="20" rx="10" fill="${DARK}"/>
  <circle cx="144" cy="180" r="10" fill="#ffc6a1"/>
  <circle cx="252" cy="170" r="8" fill="#ffc6a1"/>`,
  ],
  cable: [
    (c) => `
  <path d="M120 150 q-14 -56 34 -64 q60 -10 48 40 q-12 50 50 46 q52 -4 36 -48" fill="none" stroke="${DARK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M120 150 q12 -28 24 -70" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
  <rect x="98" y="132" width="22" height="40" rx="6" fill="${c}"/>
  <rect x="92" y="146" width="34" height="12" rx="4" fill="${DARK}"/>
  <rect x="280" y="138" width="22" height="36" rx="6" fill="${c}"/>
  <rect x="274" y="150" width="34" height="12" rx="4" fill="${DARK}"/>`,
    (c) => `
  <path d="M96 250 L304 150" fill="none" stroke="${DARK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M96 250 q22 -8 30 -22" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round"/>
  <rect x="292" y="132" width="20" height="36" rx="6" fill="${c}"/>
  <rect x="286" y="144" width="32" height="12" rx="4" fill="${DARK}"/>`,
    (c) => `
  <rect x="112" y="158" width="84" height="52" rx="14" fill="${c}"/>
  <rect x="112" y="158" width="84" height="20" rx="10" fill="${DARK}"/>
  <circle cx="140" cy="192" r="9" fill="#ffc6a1"/>
  <circle cx="172" cy="192" r="9" fill="#ffc6a1"/>
  <circle cx="204" cy="192" r="9" fill="#ffc6a1"/>`,
  ],
  carCharger: [
    (c) => `
  <ellipse cx="200" cy="176" rx="86" ry="64" fill="url(#metalfront)"/>
  <ellipse cx="200" cy="176" rx="86" ry="64" fill="none" stroke="${DARK}" stroke-width="6"/>
  <circle cx="200" cy="176" r="30" fill="#22242a"/>
  <rect x="116" y="152" width="16" height="46" rx="5" fill="${DARK}"/>
  <rect x="268" y="152" width="16" height="46" rx="5" fill="${DARK}"/>
  <circle cx="200" cy="162" r="8" fill="${c}"/>
  <circle cx="200" cy="190" r="8" fill="${c}"/>
  <rect x="160" y="210" width="80" height="9" rx="4" fill="${c}"/>`,
    (c) => `
  <ellipse cx="196" cy="176" rx="78" ry="56" fill="url(#metalside)" transform="rotate(14 196 176)"/>
  <ellipse cx="252" cy="176" rx="16" ry="40" fill="${DARK}" transform="rotate(14 252 176)"/>
  <rect x="120" y="196" width="26" height="54" rx="6" fill="${DARK}"/>`,
    (c) => `
  <ellipse cx="200" cy="176" rx="86" ry="64" fill="${DARK}"/>
  <circle cx="200" cy="176" r="40" fill="#282b30"/>
  <circle cx="200" cy="176" r="26" fill="${c}"/>
  <path d="M200 142 q26 26 0 34 q-26 -8 0 -34" fill="#fff2e0"/>`,
  ],
};

const PRODUCTS = [
  ['earbuds-pro', 'earbudsCase', '#ff7a1a', null],
  ['earbuds-air', 'earbudsCase', '#34b9f0', null],
  ['neckband', 'neckband', '#ff7a1a', null],
  ['earbuds-mini', 'earbudsCase', '#8be08b', null],
  ['earbuds-sport', 'sportbud', '#ff9a3c', null],
  ['earbuds-max', 'earbudsCase', '#ff5e5e', null],
  ['headphone-overear', 'headphone', '#ff7a1a', null],
  ['headphone-onear', 'headphone', '#34b9f0', null],
  ['headphone-audiopro', 'headphone', '#8be08b', null],
  ['headphone-anc', 'headphone', '#ffb45e', null],
  ['speaker-60w', 'speakerBig', '#ff7a1a', 'WALL OF SOUND'],
  ['speaker-40w', 'speakerBig', '#34b9f0', 'STEREO PARTY'],
  ['speaker-mini', 'speakerMini', '#8be08b', null],
  ['watch-pro', 'watch', '#ff7a1a', '10:09'],
  ['watch-active', 'watch', '#ff9a3c', '6:24'],
  ['watch-lite', 'watch', '#5ec4ff', '8:45'],
  ['powerbank-20k', 'powerbank', '#ff7a1a', '20000'],
  ['powerbank-10k', 'powerbank', '#ffb45e', '10000'],
  ['gaming-headset', 'gamingHeadset', '#ff7a1a', null],
  ['gamepad', 'gamepad', '#ff9a3c', null],
  ['charger', 'charger', '#ff7a1a', null],
  ['cable', 'cable', '#ff9a3c', null],
  ['car-charger', 'carCharger', '#34b9f0', null],
];

for (const [name, type, accent, extra] of PRODUCTS) {
  const renderers = RENDER[type];
  const views = ['front', 'side', 'detail'];
  for (let v = 0; v < views.length; v++) {
    const view = views[v];
    const suffix = v === 0 ? '' : `-${v + 1}`;
    let inner;
    try {
      inner = renderers[v](accent, extra);
    } catch (e) {
      inner = renderers[v](accent);
    }
    writeFileSync(join(outDir, `product-${name}${suffix}.svg`), svg(view, accent, inner));
  }
}

console.log(`Wrote ${PRODUCTS.length * 3} product view SVGs to ${outDir}`);