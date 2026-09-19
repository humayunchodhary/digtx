import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGallery } from '../components/ProductGallery';
import { QuantitySelector } from '../components/QuantitySelector';
import { ProductGrid } from '../components/ProductGrid';
import { SectionHeading } from '../components/SectionHeading';
import { getProductBySlug, getProductsByCategory } from '../data/products';
import { formatPrice, discountPct } from '../data/helpers';
import { getCategoryBySlug } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isSaved, toggle } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = slug ? getProductBySlug(slug) : undefined;

  const related = useMemo(() => {
    if (!product) return [];
    const others = getProductsByCategory(product.category).filter((p) => p.id !== product.id);
    return others.slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[4rem] text-center">
        <h1 className="text-[2.2rem] font-bold sm:text-[2.6rem]">Product not found</h1>
        <p className="mt-[1rem] text-[1.4rem] text-[#878787]">
          We could not find the product you are looking for.
        </p>
        <Link
          to="/shop"
          className="mt-[1.6rem] inline-block rounded-[8px] bg-primary px-[1.8rem] py-[0.8rem] text-white"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = discountPct(product.price, product.compareAtPrice);
  const saved = isSaved(product.id);
  const categorySlug =
    getCategoryBySlug(product.category.toLowerCase().replace(/ /g, '-'))?.slug ?? '';

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    {
      label: product.category,
      to: categorySlug ? `/collections/${categorySlug}` : '/collections',
    },
    { label: product.title },
  ];

  const addToCart = () => {
    addItem(product, quantity);
    showToast('Added to cart');
  };

  const buyNow = () => {
    addItem(product, quantity);
    showToast('Added to cart');
    navigate('/cart');
  };

  const handleWishlist = () => {
    const nowSaved = toggle(product.id);
    showToast(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  return (
    <div className="container mx-auto min-w-0 px-[1.5rem] py-[1.8rem] sm:py-[2.4rem]">
      <div className="min-w-0 overflow-hidden">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="mt-[1.2rem] grid min-w-0 grid-cols-1 items-start gap-[2rem] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-[3rem]">
        <ProductGallery images={product.images} name={product.title} />

        <div className="min-w-0">
          <h1 className="mb-[0.8rem] text-[1.9rem] font-bold leading-tight text-[#222] sm:text-[2.2rem] lg:text-[2.4rem]">
            {product.title}
          </h1>

          <div className="mb-[1rem] flex flex-wrap items-center gap-[0.6rem] sm:gap-[0.8rem]">
            <div className="flex items-center gap-[0.2rem] text-[#ec0101]">{renderStars(product.rating)}</div>
            <span className="text-[1.3rem] font-medium text-[#222] sm:text-[1.35rem]">
              {product.rating.toFixed(1)}
            </span>
            <button
              type="button"
              className="text-[1.25rem] text-[#878787] underline underline-offset-[2px] sm:text-[1.3rem]"
              onClick={() => {
                const el = document.getElementById('reviews');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {product.reviewCount} reviews
            </button>
          </div>

          <div className="mb-[1.4rem] flex flex-wrap items-baseline gap-x-[0.8rem] gap-y-[0.4rem]">
            <span className="text-[2.2rem] font-bold text-primary sm:text-[2.6rem]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-[1.5rem] text-[#878787] line-through sm:text-[1.8rem]">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discount !== null && (
                  <span className="rounded-[6px] bg-newBadge px-[0.7rem] py-[0.2rem] text-[1.15rem] font-bold text-white sm:text-[1.2rem]">
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mb-[1.4rem] flex items-center gap-[0.8rem] text-[1.35rem] sm:text-[1.4rem]">
            <span
              className={`inline-flex h-[10px] w-[10px] rounded-full ${
                product.availability ? 'bg-[#13b536]' : 'bg-[#999999]'
              }`}
            />
            <span className={product.availability ? 'text-[#13b536]' : 'text-[#999999]'}>
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="mb-[1.6rem] flex flex-col gap-[1.2rem]">
            <QuantitySelector
              value={quantity}
              max={99}
              onChange={setQuantity}
              disabled={!product.availability}
            />
            <div className="grid grid-cols-2 gap-[0.8rem] sm:flex sm:flex-wrap sm:gap-[1rem]">
              <button
                type="button"
                disabled={!product.availability}
                onClick={addToCart}
                className="inline-flex h-[4.4rem] items-center justify-center rounded-[10px] border border-primary bg-primary px-[1.4rem] text-[1.35rem] font-semibold text-white transition-colors hover:bg-primaryHover disabled:opacity-50 sm:min-w-[14rem] sm:px-[2rem] sm:text-[1.4rem]"
              >
                Add to Cart
              </button>
              <button
                type="button"
                disabled={!product.availability}
                onClick={buyNow}
                className="inline-flex h-[4.4rem] items-center justify-center rounded-[10px] border bg-cta px-[1.4rem] text-[1.35rem] font-semibold text-white transition-colors hover:bg-ctaHover disabled:opacity-50 sm:min-w-[12rem] sm:px-[2rem] sm:text-[1.4rem]"
              >
                Buy Now
              </button>
            </div>
            <button
              type="button"
              onClick={handleWishlist}
              aria-pressed={saved}
              className={`inline-flex h-[4.2rem] w-full items-center justify-center gap-[0.6rem] rounded-[10px] border text-[1.35rem] font-semibold transition-colors sm:w-auto sm:px-[1.8rem] ${
                saved
                  ? 'border-[#ec0101] bg-[#fff5f5] text-[#ec0101]'
                  : 'border-[#ddd] bg-white text-[#222] hover:border-primary hover:text-primary'
              }`}
            >
              <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          <div className="mb-[2rem] break-words border-t border-[#eee] pt-[1.4rem] text-[1.35rem] text-[#555] sm:text-[1.4rem]">
            <p className="mb-[0.6rem]">
              <span className="font-semibold text-[#222]">Brand: </span>Digit X
            </p>
            <p className="mb-[0.6rem]">
              <span className="font-semibold text-[#222]">SKU: </span>
              {product.specifications?.SKU ?? `NG-${product.id.toUpperCase()}`}
            </p>
            <p className="mb-[0.6rem]">
              <span className="font-semibold text-[#222]">Category: </span>
              {product.category}
            </p>
            {product.tags.length > 0 && (
              <p>
                <span className="font-semibold text-[#222]">Tags: </span>
                {product.tags.join(', ')}
              </p>
            )}
          </div>

          <DeliveryAccordion />
        </div>
      </div>

      <div className="mt-[2.4rem] min-w-0 sm:mt-[3rem]">
        <DescriptionTabs product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-[3rem] min-w-0 sm:mt-[3.5rem]">
          <SectionHeading title="Related Products" center />
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

function renderStars(rating: number) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  for (let i = 0; i < full; i++) {
    stars.push(
      <svg
        key={`f-${i}`}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[#ec0101]"
      >
        <polygon points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2" />
      </svg>,
    );
  }
  if (half) {
    stars.push(
      <svg key="half" width="14" height="14" viewBox="0 0 24 24" className="text-[#ec0101]">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <polygon points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2" fill="url(#half)" />
      </svg>,
    );
  }
  while (stars.length < 5) {
    stars.push(
      <svg
        key={`e-${stars.length}`}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="text-[#e5e7eb]"
      >
        <polygon points="12 2 15 11 24 11 17 17 20 26 12 20 4 26 7 11 12 2" />
      </svg>,
    );
  }
  return stars;
}

function DeliveryAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#eee] pt-[1.4rem]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[1.4rem] font-semibold text-[#222] sm:text-[1.5rem]"
        aria-expanded={open}
      >
        <span>Delivery & Returns</span>
        <span className="text-[#878787]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-[1rem] space-y-[0.6rem] text-[1.35rem] text-[#555] sm:text-[1.4rem]">
          <p>✓ Free delivery on orders above Rs. 5,000 across Pakistan.</p>
          <p>✓ Standard delivery within 3-5 business days in major cities.</p>
          <p>✓ 7-Day return policy on unopened, unused products.</p>
          <p>✓ 2-Year warranty on all Digit X products.</p>
        </div>
      )}
    </div>
  );
}

function DescriptionTabs({
  product,
}: {
  product: {
    description: string;
    features: string[];
    specifications: Record<string, string>;
  };
}) {
  const [tab, setTab] = useState<'desc' | 'features' | 'specs'>('desc');
  return (
    <div className="min-w-0">
      <div className="-mx-[0.2rem] flex gap-[0.2rem] overflow-x-auto border-b border-[#ddd] px-[0.2rem]">
        {(
          [
            ['desc', 'Description'],
            ['features', 'Features'],
            ['specs', 'Specifications'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`shrink-0 px-[1.1rem] py-[0.8rem] text-[1.35rem] font-semibold sm:px-[1.4rem] sm:text-[1.5rem] ${
              tab === key
                ? 'border-b-2 border-primary text-primary'
                : 'text-[#878787] hover:text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-[1.4rem] break-words text-[1.4rem] leading-relaxed text-[#555] sm:mt-[1.6rem] sm:text-[1.45rem]">
        {tab === 'desc' && <p>{product.description}</p>}
        {tab === 'features' && (
          <ul className="list-inside list-disc space-y-[0.4rem]">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        {tab === 'specs' && (
          <div className="grid grid-cols-1 gap-[0.6rem]">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-[0.2rem] border-b border-[#eee] py-[0.7rem] sm:flex-row sm:gap-[1rem]"
              >
                <span className="font-medium text-[#222] sm:w-[40%]">{k}</span>
                <span className="break-all text-[#555] sm:w-[60%]">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
