import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useState } from 'react';
import { searchProducts } from '../data/products';
import { categories } from '../data/categories';
import { ProductGrid } from '../components/ProductGrid';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface Suggestion {
  label: string;
  to: string;
}

export default function Search() {
  const [params] = useSearchParams();
  const raw = params.get('q') ?? '';
  const [input, setInput] = useState(raw);
  const debounced = useDebounce(input, 300);

  const results = useMemo(() => {
    if (!debounced.trim()) return [];
    return searchProducts(debounced);
  }, [debounced]);

  const suggestions: Suggestion[] = useMemo(() => {
    const q = input.toLowerCase().trim();
    if (!q) return [];
    const matches: Suggestion[] = [];
    // matching product titles (top 5)
    matches.push(
      ...results.slice(0, 5).map((p) => ({ label: p.title, to: `/products/${p.slug}` })),
    );
    // matching categories
    categories
      .filter((c) => c.name.toLowerCase().includes(q))
      .forEach((c) => matches.push({ label: c.name, to: `/collections/${c.slug}` }));
    return matches.slice(0, 7);
  }, [input, results]);

  const showResults = debounced.trim().length > 0;
  const empty = showResults && results.length === 0;

  return (
    <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
      <Breadcrumbs items={[{ label: 'Search' }]} />

      <h1 className="mb-[2rem] text-[2.6rem] font-bold text-[#222222]">Find your product</h1>

      <form
        role="search"
        className="mb-[2rem] flex items-center gap-[0.8rem]"
        onSubmit={(e) => {
          e.preventDefault();
          const q = input.trim();
          if (q) {
            window.history.replaceState(null, '', `/search?q=${encodeURIComponent(q)}`);
          }
        }}
      >
        <div className="relative flex-1">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for products, categories..."
            aria-label="Search products"
            className="w-full rounded-[8px] border border-[#ddd] pl-[3.4rem] pr-[1rem] h-[4.8rem] text-[1.5rem] text-[#222] outline-none transition-colors focus:border-primary"
          />
          <span className="absolute left-[1rem] top-[1.4rem] text-[#878787]">
            <SearchIcon size={20} />
          </span>
          {input && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setInput('')}
              className="absolute right-[0.8rem] top-[1.4rem] text-[#878787] hover:text-primary"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions */}
      {!debounced.trim() && input.trim().length > 0 && suggestions.length > 0 && (
        <ul
          className="mb-[1.6rem] rounded-[8px] border border-[#eee] bg-white py-[0.4rem] shadow-card"
          aria-label="Search suggestions"
        >
          {suggestions.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="block px-[1.4rem] py-[0.8rem] text-[1.4rem] text-[#222] hover:bg-[#f5f5f5]"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Results */}
      <div>
        {showResults && results.length > 0 && (
          <p className="mb-[1.6rem] text-[1.45rem] text-[#555]">
            Showing {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{debounced}&rdquo;
          </p>
        )}

        {empty ? (
          <div className="py-[3rem] text-center">
            <div className="mb-[1.2rem] flex justify-center text-[#878787]">
              <SearchIcon size={48} />
            </div>
            <h3 className="mb-[0.6rem] text-[2rem] font-semibold text-[#222222]">No results found</h3>
            <p className="text-[1.5rem] text-[#878787]">
              Try checking your spelling or use more general keywords.
            </p>
          </div>
        ) : (
          showResults && <ProductGrid products={results} />
        )}
      </div>
    </div>
  );
}
