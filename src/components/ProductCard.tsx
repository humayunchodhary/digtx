import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, discountPct } from '../data/helpers';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();
  const { showToast } = useToast();
  const saved = isSaved(product.id);
  const discount = discountPct(product.price, product.compareAtPrice);
  const isOnSale = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const isNew = product.tags.some((t) => t.toLowerCase().includes('new'));
  const isOutOfStock = !product.availability;
  const secondary = product.images[1];

  const handleAdd = () => {
    if (isOutOfStock) return;
    addItem(product);
    showToast('Added to cart');
  };

  const handleWishlist = () => {
    const nowSaved = toggle(product.id);
    showToast(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  return (
    <div className={`product-card group ${className}`} data-testid={`product-${product.id}`}>
      <div className="product-card__media">
        <Link to={`/products/${product.slug}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-card__img-primary"
            loading="lazy"
            width={300}
            height={230}
          />
          {secondary && (
            <img
              src={secondary}
              alt=""
              aria-hidden="true"
              className="product-card__img-secondary"
              loading="lazy"
              width={300}
              height={230}
            />
          )}
        </Link>

        {(isNew || isOnSale || isOutOfStock) && (
          <div className="absolute top-[0.8rem] left-[0.8rem] z-[2] flex flex-col gap-[0.3rem]">
            {isOnSale && discount !== null && (
              <span className="flex h-[2rem] min-w-[2rem] items-center justify-center rounded-[6px] bg-sale px-[0.5rem] text-[1.1rem] font-bold text-white">
                -{discount}%
              </span>
            )}
            {isNew && (
              <span className="flex h-[2rem] min-w-[2rem] items-center justify-center rounded-[6px] bg-newBadge px-[0.5rem] text-[1.1rem] font-bold text-white">
                NEW
              </span>
            )}
            {isOutOfStock && (
              <span className="flex h-[2rem] min-w-[2rem] items-center justify-center rounded-[6px] bg-soldout px-[0.5rem] text-[1.1rem] font-bold text-white">
                SOLD OUT
              </span>
            )}
          </div>
        )}

        <div className="product-card__actions">
          <Link
            to={`/products/${product.slug}`}
            className="product-card__action-btn"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </Link>
          <button
            type="button"
            className={`product-card__action-btn ${saved ? 'is-saved' : ''}`}
            aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={saved}
            onClick={handleWishlist}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            className="product-card__action-btn"
            aria-label="Add to cart"
            disabled={isOutOfStock}
            onClick={handleAdd}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-[0.8rem] pb-[0.6rem] sm:p-[1rem] sm:pb-[0.8rem]">
        <h3 className="mb-[0.4rem] min-h-[3.4rem] text-[1.25rem] font-semibold leading-snug text-[#222] line-clamp-2 sm:mb-[0.5rem] sm:min-h-[3.6rem] sm:text-[1.4rem]">
          <Link to={`/products/${product.slug}`} className="hover:text-primary">
            {product.title}
          </Link>
        </h3>

        <div className="mb-[0.5rem] flex items-center gap-[0.4rem] sm:mb-[0.6rem]">
          <div className="flex items-center gap-[0.2rem] text-[#ec0101]">
            {renderStars(product.rating)}
          </div>
          <span className="text-[1.1rem] text-[#878787] sm:text-[1.2rem]">({product.reviewCount})</span>
        </div>

        <div className="mb-[0.8rem] flex flex-wrap items-baseline gap-x-[0.6rem] gap-y-[0.2rem] sm:mb-[1rem]">
          <span className="text-[1.4rem] font-bold text-primary sm:text-[1.6rem]">
            {formatPrice(product.price)}
          </span>
          {!!product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[1.15rem] text-[#878787] line-through sm:text-[1.3rem]">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="p-[0.8rem] pt-0 sm:p-[1rem] sm:pt-0">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAdd}
          className={`btn-outline w-full ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isOutOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

function renderStars(rating: number) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  for (let i = 0; i < full; i++) stars.push(<Star key={`f-${i}`} full />);
  if (half) stars.push(<Star key="h" half />);
  while (stars.length < 5) stars.push(<Star key={`e-${stars.length}`} />);
  return stars;
}

function Star({ full, half }: { full?: boolean; half?: boolean }) {
  if (half) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#ec0101]">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <polygon
          points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2"
          fill="url(#half)"
        />
      </svg>
    );
  }
  if (full) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#ec0101]">
        <polygon points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#e5e7eb]">
      <polygon points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2" fill="currentColor" />
    </svg>
  );
}
