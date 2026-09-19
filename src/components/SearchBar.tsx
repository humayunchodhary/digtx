import { useState } from 'react';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ defaultValue = '', compact = false, placeholder = 'Search for products', className = '' }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className={`
          ${compact ? 'w-[220px] lg:w-[260px] border-[1px] pl-[3rem] pr-[0.75rem] h-[3.6rem] rounded-btn text-[1.3rem]'
            : 'w-full border-[1px] pl-[3.6rem] pr-[0.75rem] h-[3.8rem] rounded-btn text-[1.4rem]'}
          border-[#ddd] bg-[#fff] focus:outline-none focus:border-primary transition-colors
        `}
      />
      <label htmlFor={`search-input${Math.random().toString(36).slice(2)}`} className="sr-only">
        Search products
      </label>

      <button
        type="submit"
        aria-label="Submit search"
        className="absolute left-[0.7rem] top-[0.4rem] text-[#878787] hover:text-primary transition-colors"
      >
        <Search size={compact ? 16 : 18} />
      </button>
    </form>
  );
}
