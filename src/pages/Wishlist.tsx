import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { ids, clear, count } = useWishlist();

  const savedProducts = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => p !== undefined);

  if (savedProducts.length === 0) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[4rem]">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <div className="mx-auto mt-[3rem] max-w-[480px] text-center">
          <Heart size={56} className="mx-auto text-[#d9d9d9]" />
          <h1 className="mt-[1.6rem] text-[2.2rem] font-bold text-[#222] sm:text-[2.4rem]">
            Your wishlist is empty
          </h1>
          <p className="mt-[0.8rem] text-[1.4rem] text-[#878787]">
            Tap the heart on any product to save it here for later.
          </p>
          <Link to="/shop" className="btn-primary mt-[2rem]">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <div className="mb-[2rem] mt-[1.6rem] flex flex-wrap items-end justify-between gap-[1rem]">
        <div>
          <h1 className="text-[2.2rem] font-bold text-[#222] sm:text-[2.6rem]">My Wishlist</h1>
          <p className="text-[1.35rem] text-[#878787] sm:text-[1.4rem]">
            {count} saved {count === 1 ? 'product' : 'products'}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-[1.3rem] text-[#878787] hover:text-primary"
        >
          Clear wishlist
        </button>
      </div>

      <ProductGrid products={savedProducts} />
    </div>
  );
}
