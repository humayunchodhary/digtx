import type { Product } from '../types/product';

export const rupee = (n: number) => n;

export function formatPrice(n: number): string {
  const v = Math.round(n);
  return `Rs.${v.toLocaleString('en-US')}.00`;
}

export function discountPct(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function ratingStars(r: number): string {
  return r.toFixed(1);
}

export function P(p: Partial<Product> & Pick<Product, 'id' | 'slug' | 'title' | 'category' | 'images' | 'price' | 'description'>): Product {
  return {
    rating: 0,
    reviewCount: 0,
    features: [],
    specifications: {},
    availability: true,
    tags: [],
    ...p,
  };
}
