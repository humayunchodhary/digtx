import { Link } from 'react-router-dom';
import type { Category } from '../types/product';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/collections/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#f0f0f0] bg-[#fffaf5] shadow-card transition-all duration-300 hover:-translate-y-[2px] hover:border-primary/30 hover:shadow-[0_12px_28px_rgba(255,122,26,0.12)] sm:rounded-[18px]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-white">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
          width={480}
          height={360}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-[0.9rem] py-[0.9rem] sm:px-[1.1rem] sm:py-[1.1rem]">
        <h3 className="text-[1.3rem] font-semibold leading-snug text-[#222] sm:text-[1.5rem]">
          {category.name}
        </h3>
        <p className="mt-[0.2rem] text-[1.15rem] text-[#878787] sm:text-[1.25rem]">
          {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </Link>
  );
}
