import type { Category } from '../types/product';

export const categories: Category[] = [
  {
    id: "earbuds",
    slug: "earbuds",
    name: "Wireless Earbuds",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
    productCount: 6
  },
  {
    id: "headphones",
    slug: "headphones",
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    productCount: 4
  },
  {
    id: "speakers",
    slug: "speakers",
    name: "Bluetooth Speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    productCount: 3
  },
  {
    id: "smart-watches",
    slug: "smart-watches",
    name: "Smart Watches",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    productCount: 3
  },
  {
    id: "power-banks",
    slug: "power-banks",
    name: "Power Banks",
    image: "https://images.unsplash.com/photo-1609592424308-41031b268595?auto=format&fit=crop&w=800&q=80",
    productCount: 2
  },
  {
    id: "gaming",
    slug: "gaming",
    name: "Gaming Gear",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    productCount: 2
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    productCount: 3
  }
];

export const categorySlugs = categories.map((c) => c.slug);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name);
}