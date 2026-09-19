import http from 'http';

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => resolve({ status: r.statusCode, body: d }));
      })
      .on('error', reject);
  });
}

const html = await get('http://localhost:5173/');
console.log('html', html.status);
const m = html.body.match(/href="([^"]+\.css)"/);
console.log('cssHref', m && m[1]);
console.log('has link stylesheet', html.body.includes('rel="stylesheet"'));
if (m) {
  const css = await get('http://localhost:5173' + m[1]);
  console.log('css', css.status, css.body.length);
  console.log('flex', css.body.includes('.flex{') || css.body.includes('.flex {'));
  console.log('primary', css.body.includes('--color-primary'));
  console.log('product-card', css.body.includes('product-card'));
  console.log('site-header', css.body.includes('site-header'));
  console.log('grid', css.body.includes('.grid{') || css.body.includes('display:grid'));
}
