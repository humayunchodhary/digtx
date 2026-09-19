/* Generates client logos + certification badge logos (stylized marks). */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve(process.cwd(), 'src/assets/images');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const save = (n, c) => writeFileSync(resolve(dir, n), c);
const svg = (w, h, body, bg = '#ffffff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">` +
  `<rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;

/* 10 stylized client / certification logos — abstract NG marks + labels */
const clients = [
  { n: 'client-1.svg', label: 'PEOPLE\'S FOOD', col: '#0f52ba' },
  { n: 'client-2.svg', label: 'GREEN STAR', col: '#13b536' },
  { n: 'client-3.svg', label: 'ROYAL APPLIANCES', col: '#0ea5e9' },
  { n: 'client-4.svg', label: 'PREMIER HOMES', col: '#ec0101' },
  { n: 'client-5.svg', label: 'ALPHA ELECTRIC', col: '#ca8a04' },
  { n: 'client-6.svg', label: 'BLUE SKY GROUP', col: '#0284c7' },
  { n: 'client-7.svg', label: 'PRESCOTT LTD', col: '#1e3a8a' },
  { n: 'client-8.svg', label: 'TECHNOMART', col: '#8b5cf6' },
  { n: 'client-9.svg', label: 'DELTA HOME', col: '#f97316' },
  { n: 'client-10.svg', label: 'OMNI APPLIANCES', col: '#222222' },
];
for (const cl of clients) {
  save(cl.n, svg(400, 130,
    `<rect x="30" y="20" width="50" height="50" rx="10" fill="${cl.col}"/>
    <rect x="40" y="34" width="30" height="22" rx="4" fill="#fff"/>
    <circle cx="55" cy="58" r="5" fill="#fff"/>
    <rect x="90" y="45" width="280" height="30" rx="4" fill="#000"/>
    <rect x="90" y="82" width="180" height="14" rx="3" fill="#666"/>
    <text x="365" y="70" font-family="Poppins,sans-serif" font-size="26" font-weight="700" fill="${cl.col}" text-anchor="end">NG</text>`));
}

/* Certifications — 3 badges */
save('cert-1.svg', svg(360, 130,
  `<rect x="20" y="15" width="320" height="100" rx="8" fill="#ffffff" stroke="#0f52ba" stroke-width="2"/>
  <rect x="40" y="35" width="60" height="60" rx="8" fill="#0f52ba"/>
  <rect x="55" y="50" width="30" height="30" rx="4" fill="#fff"/>
  <text x="200" y="70" font-family="Poppins,sans-serif" font-size="22" font-weight="700" fill="#1e3a8a" text-anchor="start">ISO 9001</text>
  <text x="200" y="90" font-family="Poppins,sans-serif" font-size="13" font-weight="400" fill="#475569" text-anchor="start">Quality Management</text>`));

save('cert-2.svg', svg(360, 130,
  `<rect x="20" y="15" width="320" height="100" rx="8" fill="#ffffff" stroke="#13b536" stroke-width="2"/>
  <rect x="40" y="35" width="60" height="60" rx="8" fill="#13b536"/>
  <rect x="58" y="52" width="26" height="26" rx="13" fill="#fff"/>
  <text x="200" y="70" font-family="Poppins,sans-serif" font-size="22" font-weight="700" fill="#1e3a8a" text-anchor="start">CE MARK</text>
  <text x="200" y="90" font-family="Poppins,sans-serif" font-size="13" font-weight="400" fill="#475569" text-anchor="start">European Safety</text>`));

save('cert-3.svg', svg(360, 130,
  `<rect x="20" y="15" width="320" height="100" rx="8" fill="#ffffff" stroke="#fbbf24" stroke-width="2"/>
  <rect x="40" y="35" width="60" height="60" rx="8" fill="#fbbf24"/>
  <polygon points="70,40 78,60 100,62 84,76 76,96 60,78 40,82 54,68 44,48 66,44" fill="#1e3a8a"/>
  <text x="200" y="70" font-family="Poppins,sans-serif" font-size="22" font-weight="700" fill="#1e3a8a" text-anchor="start">TESA</text>
  <text x="200" y="90" font-family="Poppins,sans-serif" font-size="13" font-weight="400" fill="#475569" text-anchor="start">Energy Efficiency</text>`));

/* Favicon (40x40) red flame on blue */
save('../favicon.png', ''); // placeholder handled separately via svg-to-png? We use svg favicon instead.

console.log('Generated client + certification logos');
