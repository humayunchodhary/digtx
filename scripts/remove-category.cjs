const fs = require('fs');
const path = require('path');

const REMOVE_CATEGORIES = ['Room Air Cooler', 'Electric Heater', 'Washing Machine'];

const file = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const source = fs.readFileSync(file, 'utf8');

const start = source.indexOf('= [') + 2;
const end = source.indexOf('\n];', start) + 1;
const arrayText = source.slice(start, end + 1);

const all = JSON.parse(arrayText);
const kept = all.filter((p) => !REMOVE_CATEGORIES.includes(p.category));

console.log(`total: ${all.length} -> kept: ${kept.length} (removed ${all.length - kept.length})`);

const header = source.slice(0, start);
const footer = source.slice(end + 1);
fs.writeFileSync(file, header + JSON.stringify(kept, null, 2) + footer, 'utf8');

const counts = {};
for (const p of kept) counts[p.category] = (counts[p.category] || 0) + 1;
console.log(JSON.stringify(counts, null, 2));
