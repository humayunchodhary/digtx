const fs = require('fs');
const path = require('path');

const productsSrc =
  'C:/Users/Softix-System10/.cursor/projects/d-Italiongas/agent-tools/0ce93dc6-aae7-4068-bf70-7b4cf255e6d0.txt';
const collectionsSrc =
  'C:/Users/Softix-System10/.cursor/projects/d-Italiongas/agent-tools/60068626-ead3-4bcb-af1c-e0c740349c25.txt';

const { products } = JSON.parse(fs.readFileSync(productsSrc, 'utf8'));
const { collections } = JSON.parse(fs.readFileSync(collectionsSrc, 'utf8'));

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapCategory(productType) {
  const t = (productType || '').trim();
  const map = {
    'Room Air Cooler': 'Room Air Cooler',
    'Water Dispenders': 'Water Dispenser',
    'Kitchen Hood': 'Kitchen Hood',
    'Cooking Range': 'Cooking Range',
    'Gas Stove': 'Gas Stoves',
    'Electric Room Heater': 'Electric Heater',
    'Built-in Microwave Oven': 'Built-in Microwave Oven',
    'Washing Machine': 'Washing Machine',
    'Infrared Cooker': 'Infrared Cooker',
    'Water Cooler': 'Water Cooler',
    'Air Fryer': 'Air Fryer',
    'Electric + Gas Water Heater (Big Tank)': 'Geysers',
    'Electric Water Heater': 'Geysers',
    'Semi Instant Electric Water Heater': 'Geysers',
    'Gas Water Heater (Big Tank)': 'Geysers',
    'Instant Gas Geyser': 'Geysers',
    'Home Appliances': 'Kitchen Appliances',
  };
  return map[t] || t || 'Home Appliances';
}

function slugToCategory(handle, title, productType) {
  const h = handle.toLowerCase();
  const tl = title.toLowerCase();
  if (h.includes('hob') || tl.includes('hob')) return 'Built-in Hobs';
  if (h.includes('oven') && !h.includes('microwave') && !tl.includes('microwave')) return 'Built-in Oven';
  if (h.includes('microwave') || tl.includes('microwave')) return 'Built-in Microwave Oven';
  if (h.includes('dryer') || tl.includes('dryer')) return 'Washing Machine';
  return mapCategory(productType);
}

const mapped = products.map((p, idx) => {
  const variant = p.variants?.[0] || {};
  const images = (p.images || []).map((img) => img.src).filter(Boolean);
  const body = stripHtml(p.body_html);
  const features = [];
  const liMatches = String(p.body_html || '').match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  for (const li of liMatches.slice(0, 8)) {
    const t = stripHtml(li);
    if (t) features.push(t);
  }
  const tags = Array.isArray(p.tags)
    ? p.tags
    : String(p.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
  const price = Number(variant.price || 0);
  const compare = variant.compare_at_price ? Number(variant.compare_at_price) : undefined;
  const category = slugToCategory(p.handle, p.title, p.product_type);

  return {
    id: `p${idx + 1}`,
    slug: p.handle,
    title: p.title,
    category,
    images: images.length ? images : ['/assets/images/product-cooler.svg'],
    price,
    compareAtPrice: compare && compare > price ? compare : undefined,
    rating: Math.round((3.5 + (idx % 15) * 0.1) * 10) / 10,
    reviewCount: (idx * 3) % 17,
    description: body.slice(0, 420) || p.title,
    features: features.length
      ? features
      : ['Premium build quality', 'Energy efficient', 'Nationwide warranty support'],
    specifications: {
      Vendor: p.vendor || 'NASGAS',
      Type: p.product_type || category,
      SKU: variant.sku || p.handle,
    },
    availability: variant.available !== false,
    tags: tags.map((t) => String(t).toLowerCase()),
  };
});

const outProducts = `import type { Product } from '../types/product';

export const products: Product[] = ${JSON.stringify(mapped, null, 2)};

export const featuredProducts: Product[] = products.slice(0, 8);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
`;

fs.writeFileSync(path.join('src', 'data', 'products.ts'), outProducts);

const homeCats = [
  'cooking-range',
  'built-in-hobs',
  'kitchen-hood',
  'water-dispensers',
  'gas-stove',
  'infrared-cooker',
  'washing-machine',
  'room-air-cooler',
  'built-in-oven',
  'built-in-microwave-oven',
  'electric-room-heater',
];

const catNameFix = {
  'gas-stove': 'Gas Stoves',
  'water-dispensers': 'Water Dispenser',
  'electric-room-heater': 'Electric Heater',
};

const slugFix = {
  'water-dispensers': 'water-dispenser',
  'gas-stove': 'gas-stoves',
  'electric-room-heater': 'electric-heater',
};

const categories = homeCats.map((handle) => {
  const c = collections.find((x) => x.handle === handle);
  const slug = slugFix[handle] || handle;
  return {
    id: slug,
    slug,
    name: catNameFix[handle] || c?.title || handle,
    image: c?.image?.src || '/assets/images/cat-cooking-range.svg',
    productCount: c?.products_count || 0,
  };
});

const geysers = collections.find((x) => x.handle === 'geysers');
if (geysers) {
  categories.splice(8, 0, {
    id: 'geysers',
    slug: 'geysers',
    name: 'Geysers',
    image: geysers.image?.src || '/assets/images/cat-geyser.svg',
    productCount: geysers.products_count,
  });
}

const outCats = `import type { Category } from '../types/product';

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

export const categorySlugs = categories.map((c) => c.slug);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name);
}
`;

fs.writeFileSync(path.join('src', 'data', 'categories.ts'), outCats);

const slides = [
  {
    id: 'cooler',
    handle: 'room-air-cooler',
    heading: 'Hybrid Room Air Cooler',
    description: 'Dual Power (Solar & 220V) | Low Wattage | Strong Airflow',
    headingColor: '#16809e',
    ctaLink: '/collections/room-air-cooler',
  },
  {
    id: 'dispenser',
    handle: 'water-dispensers',
    heading: 'Smart Water Dispenser',
    description: 'Instant Hot & Cold Water | Child Lock | Energy Saving',
    headingColor: '#E53327',
    ctaLink: '/collections/water-dispenser',
  },
  {
    id: 'kitchen',
    handle: 'kitchen-appliances',
    heading: 'Cooking With Precision',
    description: 'Multi-Burner Ranges, Hobs & Kitchen Hoods for the Modern Kitchen',
    headingColor: '#ffffff',
    ctaLink: '/collections/cooking-range',
  },
  {
    id: 'hood',
    handle: 'kitchen-hood',
    heading: 'Smoke-Free Effortless Cooking',
    description: 'Powerful Kitchen Hoods with Silent Motors & LED Lighting',
    headingColor: '#2a2e31',
    ctaLink: '/collections/kitchen-hood',
  },
  {
    id: 'washing',
    handle: 'washing-machine',
    heading: 'Wash & Dry Perfectly',
    description: 'Semi & Fully Automatic Machines with Advanced Wash Programs',
    headingColor: '#1369b5',
    ctaLink: '/collections/washing-machine',
  },
  {
    id: 'geyser',
    handle: 'geysers',
    heading: 'Hot Water Solar Powered',
    description: 'Energy-Efficient Geysers with Solar & Electric Options',
    headingColor: '#c9451f',
    ctaLink: '/collections/geysers',
  },
].map((s) => {
  const c = collections.find((x) => x.handle === s.handle);
  const img = c?.image?.src || '/assets/images/hero-cooler.svg';
  return {
    id: s.id,
    image: img,
    mobileImage: img,
    heading: s.heading,
    description: s.description,
    ctaText: 'Shop Now',
    ctaLink: s.ctaLink,
    headingColor: s.headingColor,
  };
});

const outSlides = `export interface Slide {
  id: string;
  image: string;
  mobileImage: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  headingColor: string;
}

export const slides: Slide[] = ${JSON.stringify(slides, null, 2)};
`;

fs.writeFileSync(path.join('src', 'data', 'slides.ts'), outSlides);

console.log('Wrote products:', mapped.length);
console.log('Wrote categories:', categories.length);
console.log('Wrote slides:', slides.length);
