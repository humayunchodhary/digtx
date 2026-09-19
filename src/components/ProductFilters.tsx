import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../data/categories';

interface FiltersProps {
  activeCategory: string | null;
  priceRange: [number, number];
  onCategoryChange: (cat: string | null) => void;
  onPriceChange: (range: [number, number]) => void;
  onClear: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductFilters({
  activeCategory,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onClear,
  open,
  onOpenChange,
}: FiltersProps) {
  return (
    <aside
      className={`w-full lg:w-[260px] lg:flex-shrink-0 border-r border-[#eee] bg-white lg:block ${
        open ? 'block' : 'hidden'
      }`}
      aria-label="Filters"
    >
      <div className="p-[1.5rem]">
        <div
          className="flex cursor-pointer items-center justify-between py-[1rem] text-[1.4rem] font-semibold"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
        >
          <span className="flex items-center gap-[0.6rem]">
            <Filter size={18} />
            Filters
          </span>
          <ChevronDown
            size={18}
            className={`lg:hidden transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>

        <div className="space-y-[1.4rem]">
          <FilterSection
            title="Categories"
            defaultOpen
            items={[
              { label: 'All Categories', value: null, active: activeCategory === null },
              ...categories.map((c) => ({
                label: c.name,
                value: c.slug,
                active: activeCategory === c.slug,
              })),
            ]}
            onSelect={(v) => onCategoryChange(v === null ? null : v)}
          />

          <FilterSection
            title="Price Range"
            defaultOpen
          >
            <div className="space-y-[0.8rem]">
              <input
                type="range"
                min={0}
                max={100000}
                step={500}
                value={priceRange[1]}
                onChange={(e) => onPriceChange([0, Number(e.target.value)])}
                className="w-full"
                aria-label="Max price"
              />
              <div className="flex items-center gap-[0.5rem]">
                <input
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) => onPriceChange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-[90px] rounded border border-[#ddd] px-[0.5rem] py-[0.4rem] text-[1.3rem]"
                />
                <span aria-hidden="true">-</span>
                <input
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={priceRange[1] || ''}
                  onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value) || 100000])}
                  className="w-[90px] rounded border border-[#ddd] px-[0.5rem] py-[0.4rem] text-[1.3rem]"
                />
              </div>
            </div>
          </FilterSection>

          <button
            type="button"
            onClick={() => {
              onClear();
              onOpenChange(false);
            }}
            className="w-full rounded border border-[#ddd] py-[0.8rem] text-[1.3rem] font-medium text-[#222] hover:bg-[#f5f5f5]"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </aside>
  );
}

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  items?: { label: string; value: string | null; active: boolean }[];
  onSelect?: (value: string | null) => void;
  children?: React.ReactNode;
}

function FilterSection({ title, defaultOpen = false, items, onSelect, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#eee] pb-[1rem]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[1.35rem] font-semibold text-[#222]"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`text-[#878787] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && items && onSelect && (
        <ul className="mt-[0.8rem] space-y-[0.5rem]">
          {items.map((it) => (
            <li key={it.label}>
              <button
                type="button"
                onClick={() => onSelect(it.value)}
                className={`block w-full text-left text-[1.3rem] py-[0.3rem] ${
                  it.active ? 'font-bold text-primary' : 'text-[#555] hover:text-primary'
                }`}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && children && <div className="mt-[0.8rem]">{children}</div>}
    </div>
  );
}
