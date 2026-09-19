export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  availability: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  productCount: number;
}

export type SortOption =
  | 'featured'
  | 'best-selling'
  | 'newest'
  | 'price-asc'
  | 'price-desc';
