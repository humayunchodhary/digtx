import { ListSortDescending } from 'lucide-react';
import type { SortOption } from '../types/product';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center gap-[0.6rem] text-[1.4rem] text-[#222]">
      <ListSortDescending size={18} className="text-[#878787]" />
      <span className="max-sm:hidden">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded border border-[#ddd] bg-white px-[1rem] py-[0.5rem] font-medium text-[#222] outline-none transition-colors focus:border-primary"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
