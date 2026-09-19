import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGrid } from '../components/ProductGrid';
import { SortDropdown } from '../components/SortDropdown';
import { ProductFilters } from '../components/ProductFilters';
import { SearchBar } from '../components/SearchBar';
import { products } from '../data/products';
import { getCategoryBySlug } from '../data/categories';
import type { SortOption } from '../types/product';
import type { Product } from '../types/product';

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
      case 'featured':
      default:
        return 0;
    }
  });
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const categoryParam = searchParams.get('category') ?? '';
  const minParam = searchParams.get('min');
  const maxParam = searchParams.get('max');
  const sort = (searchParams.get('sort') as SortOption) || 'featured';
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minParam ? Number(minParam) : 0,
    maxParam ? Number(maxParam) : 100000,
  ]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (categoryParam) {
      const cat = getCategoryBySlug(categoryParam);
      if (cat) {
        list = list.filter((p) => p.category === cat.name);
      }
    }

    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return sortProducts(list, sort);
  }, [query, categoryParam, priceRange, sort]);

  const onSort = (v: SortOption) => {
    const sp = new URLSearchParams(searchParams);
    sp.set('sort', v);
    setSearchParams(sp);
  };

  const onCategory = (slug: string | null) => {
    const sp = new URLSearchParams(searchParams);
    if (slug === null) sp.delete('category');
    else sp.set('category', slug);
    setSearchParams(sp);
  };

  const onPrice = (range: [number, number]) => {
    setPriceRange(range);
    const sp = new URLSearchParams(searchParams);
    sp.set('min', String(range[0]));
    sp.set('max', String(range[1]));
    setSearchParams(sp);
  };

  const clear = () => {
    setSearchParams({});
    setPriceRange([0, 100000]);
  };

  const categoryLabel = categoryParam ? (getCategoryBySlug(categoryParam)?.name ?? categoryParam) : 'All Categories';

  return (
    <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
      <Breadcrumbs items={[{ label: 'Shop' }]} />

      <div className="mb-[1.8rem] flex flex-col justify-between sm:flex-row sm:items-baseline">
        <h1 className="text-[2.6rem] font-bold text-[#222222]">Shop</h1>
        <p className="text-[1.4rem] text-[#878787]">{filtered.length} products</p>
      </div>

      <div className="mb-[1.8rem] flex flex-col gap-[1.4rem] sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-[480px]">
          <SearchBar placeholder="Search products..." />
        </div>
        <div className="flex items-center gap-[1rem]">
          <span className="hidden text-[1.4rem] text-[#555] sm:inline">
            Category: {categoryLabel}
          </span>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-[0.5rem] rounded-[8px] border border-[#ddd] px-[1rem] py-[0.6rem] text-[1.4rem] text-[#222]"
          >
            Filters
          </button>
          <SortDropdown value={sort as SortOption} onChange={onSort} />
        </div>
      </div>

      <div className="flex gap-[1.5rem]">
        <div className="hidden lg:block">
          <ProductFilters
            activeCategory={categoryParam}
            priceRange={priceRange}
            onCategoryChange={onCategory}
            onPriceChange={onPrice}
            onClear={clear}
            open={true}
            onOpenChange={() => {}}
          />
        </div>
        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>
      <ProductFilters
        activeCategory={categoryParam}
        priceRange={priceRange}
        onCategoryChange={onCategory}
        onPriceChange={onPrice}
        onClear={clear}
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
      />
    </div>
  );
}
