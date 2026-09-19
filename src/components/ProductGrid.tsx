import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
  className?: string;
}

export function ProductGrid({ products, columns, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-[3rem] text-center text-[1.5rem] text-[#878787]">
        No products found.
      </div>
    );
  }

  const gridCols =
    columns !== undefined
      ? `grid-cols-${columns}`
      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-[1rem] sm:gap-[1.6rem] lg:gap-[2rem] ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
