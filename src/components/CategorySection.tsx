import { Link } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';
import { categories } from '../data/categories';

export function CategorySection() {
  return (
    <section className="bg-white py-[2.8rem] sm:py-[4rem]">
      <div className="container mx-auto px-[1.5rem]">
        <div className="mb-[1.8rem] flex flex-col gap-[0.8rem] sm:mb-[2.4rem] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="brand-chip">Shop smarter</span>
            <h2 className="section-title mt-[1rem] text-[2rem] font-bold text-[#1a1a1a] sm:mt-[1.2rem] sm:text-[2.6rem]">
              Shop by category
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-[1.3rem] font-semibold text-primary hover:text-primaryHover sm:text-[1.4rem]"
          >
            View all categories →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[1rem] sm:grid-cols-3 sm:gap-[1.4rem] lg:grid-cols-4 lg:gap-[1.8rem]">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
