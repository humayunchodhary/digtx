import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryCard } from '../components/CategoryCard';
import { SortDropdown } from '../components/SortDropdown';
import { categories, getCategoryBySlug } from '../data/categories';
import { products } from '../data/products';
import type { Product } from '../types/product';
import type { SortOption } from '../types/product';

function sortProducts(list: Product[], sort: SortOption): Product[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'best-selling':
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      case 'newest':
        return a.id.localeCompare(b.id);
      default:
        return 0;
    }
  });
}

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const [sort, setSort] = useState<SortOption>('featured');
  const category = slug ? getCategoryBySlug(slug) : undefined;

  const catProducts = useMemo(() => {
    if (!category) return [];
    const list = products.filter((p) => p.category === category.name);
    return sortProducts(list, sort);
  }, [category, sort]);

  if (!slug) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
        <Breadcrumbs items={[{ label: 'Collections' }]} />
        <h1 className="mb-[2rem] text-[2.6rem] font-bold text-[#222222]">Shop By Collections</h1>
        <p className="mb-[2rem] text-[1.5rem] text-[#878787]">
          Browse our curated collections of premium audio, electronics and gadgets.
        </p>
        <div className="grid grid-cols-1 gap-[2rem] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[4rem] text-center">
        <h1 className="text-[2.6rem] font-bold">Collection not found</h1>
        <p className="mt-[1rem] text-[#878787]">The collection you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
      <Breadcrumbs
        items={[
          { label: 'Collections', to: '/collections' },
          { label: category.name },
        ]}
      />

      <div className="mb-[2.2rem] flex flex-col justify-between sm:flex-row sm:items-baseline">
        <h1 className="text-[2.6rem] font-bold text-[#222222]">{category.name}</h1>
        <div className="mt-[0.8rem] flex items-center gap-[1rem]">
          <span className="text-[1.4rem] text-[#878787]">{catProducts.length} products</span>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <ProductGrid products={catProducts} />
    </div>
  );
}
