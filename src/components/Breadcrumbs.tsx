import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const location = useLocation();
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-[1.4rem] flex min-w-0 flex-wrap items-center gap-[0.5rem] text-[1.25rem] text-[#878787] sm:text-[1.3rem]"
    >
      <Link to="/" className="shrink-0 font-medium text-[#878787] hover:text-primary">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex min-w-0 max-w-full items-center gap-[0.5rem]">
          <ChevronRight size={14} className="shrink-0 text-[#bbb]" />
          {item.to && i < items.length - 1 ? (
            <Link
              to={item.to}
              className={`truncate ${
                location.pathname === item.to
                  ? 'font-medium text-[#222]'
                  : 'text-[#878787] hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`truncate ${
                i === items.length - 1 ? 'font-medium text-[#222]' : 'text-[#878787]'
              }`}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
