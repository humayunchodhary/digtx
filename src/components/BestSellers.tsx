import { Link } from 'react-router-dom';
import { ProductGrid } from './ProductGrid';
import { products } from '../data/products';

export function BestSellers() {
  const bestSellers = [...products]
    .sort((a, b) => b.rating * (b.reviewCount + 1) - a.rating * (a.reviewCount + 1))
    .slice(0, 12);

  return (
    <section className="bg-[#fff8f1] py-[4.5rem]">
      <div className="container mx-auto px-[1.5rem]">
        <div className="mb-[2.8rem] max-w-[640px]">
          <span className="brand-chip">Customer favorites</span>
          <h2 className="section-title mt-[1.2rem] text-[2.6rem] font-bold text-[#1a1a1a]">
            Best Sellers
          </h2>
          <p className="mt-[1rem] text-[1.5rem] text-[#6b6b6b]">
            Most-loved DigitX Pro gadgets this week — preferred by audio &amp; tech fans everywhere.
          </p>
        </div>
        <ProductGrid products={bestSellers} />
        <div className="mt-[2.8rem]">
          <Link to="/shop" className="btn-primary">
            Browse full catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
