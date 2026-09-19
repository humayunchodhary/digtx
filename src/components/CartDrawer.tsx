import { useState, Fragment, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/helpers';
import { Portal } from './Portal';

export function CartDrawer({ iconOnly = false }: { iconOnly?: boolean }) {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const goToCart = () => {
    close();
    navigate('/cart');
  };

  const goToCheckout = () => {
    close();
    navigate('/checkout');
  };

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`relative flex items-center justify-center text-[#222] transition-colors hover:text-primary ${iconOnly ? '' : 'gap-[0.6rem]'}`}
      >
        <ShoppingCart size={iconOnly ? 20 : 22} />
        {iconOnly && totalItems > 0 && (
          <span className="absolute -top-[0.4rem] -right-[0.5rem] flex h-[1.8rem] min-w-[1.8rem] items-center justify-center rounded-full bg-primary text-[1.1rem] font-bold text-white">
            {totalItems}
          </span>
        )}
        {!iconOnly && (
          <>
            <span className="font-medium text-[1.3rem]">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-[0.4rem] -right-[0.5rem] flex h-[1.8rem] min-w-[1.8rem] items-center justify-center rounded-full bg-primary text-[1.1rem] font-bold text-white">
                {totalItems}
              </span>
            )}
          </>
        )}
      </button>

      {open && (
        <Portal>
          <div
            className="fixed inset-0 z-[9998] bg-black/50"
            onClick={close}
            aria-hidden="true"
          />

          <aside
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[9999] flex h-screen w-full max-w-[420px] flex-col bg-white shadow-[0_0_24px_rgba(0,0,0,0.2)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#eee] px-[1.6rem] py-[1.4rem]">
              <h2 className="text-[1.8rem] font-bold text-[#222]">Your Cart</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="text-[#878787] transition-colors hover:text-primary"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-[2rem] text-center">
                <ShoppingCart size={48} className="text-[#c9c9c9]" />
                <p className="mt-[1.2rem] text-[1.5rem] font-semibold text-[#222]">
                  Your cart is empty
                </p>
                <p className="mt-[0.5rem] text-[1.3rem] text-[#878787]">
                  Add items to your cart to see them here.
                </p>
                <Link to="/shop" onClick={close} className="btn-primary mt-[1.8rem]">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <Fragment>
                <div className="min-h-0 flex-1 overflow-y-auto px-[1.6rem] py-[1.4rem]">
                  <ul className="space-y-[1.5rem]">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.product.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdate={updateQuantity}
                        onNavigate={close}
                      />
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 border-t border-[#eee] px-[1.6rem] py-[1.4rem]">
                  <div className="mb-[1.4rem] flex items-center justify-between text-[1.5rem] font-semibold">
                    <span>Subtotal</span>
                    <span className="text-primary">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex gap-[1rem]">
                    <button
                      type="button"
                      onClick={goToCart}
                      className="h-[4.4rem] flex-1 rounded-[10px] bg-primary text-[1.4rem] font-semibold text-white transition-colors hover:bg-primaryHover"
                    >
                      View Cart
                    </button>
                    <button
                      type="button"
                      onClick={goToCheckout}
                      className="h-[4.4rem] flex-1 rounded-[10px] bg-cta text-[1.4rem] font-semibold text-white transition-colors hover:bg-ctaHover"
                    >
                      Checkout
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-[1rem] w-full text-[1.2rem] text-[#878787] transition-colors hover:text-primary"
                  >
                    Clear Cart
                  </button>
                </div>
              </Fragment>
            )}
          </aside>
        </Portal>
      )}
    </Fragment>
  );
}

interface CartItemRowProps {
  item: {
    product: {
      id: string;
      title: string;
      slug: string;
      images: string[];
      price: number;
      compareAtPrice?: number;
    };
    quantity: number;
  };
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
  onNavigate: () => void;
}

function CartItemRow({ item, onRemove, onUpdate, onNavigate }: CartItemRowProps) {
  const { product, quantity } = item;
  const image = product.images?.[0] ?? '/assets/images/logo.png';
  const compareAt = product.compareAtPrice;

  return (
    <li className="flex gap-[1rem]">
      <Link to={`/products/${product.slug}`} onClick={onNavigate} className="shrink-0">
        <img
          src={image}
          alt={product.title}
          className="h-[80px] w-[80px] rounded-[8px] border border-[#eee] bg-[#fafafa] object-cover"
          loading="lazy"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          to={`/products/${product.slug}`}
          onClick={onNavigate}
          className="line-clamp-2 text-[1.4rem] font-medium text-[#222] hover:text-primary"
        >
          {product.title}
        </Link>
        <div className="mt-[0.3rem] flex items-center gap-[0.5rem]">
          <span className="text-[1.3rem] font-semibold text-primary">{formatPrice(product.price)}</span>
          {compareAt && compareAt > product.price && (
            <span className="text-[1.2rem] text-[#878787] line-through">{formatPrice(compareAt)}</span>
          )}
        </div>
        <div className="mt-[0.6rem] flex items-center gap-[0.6rem]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdate(product.id, Math.max(1, quantity - 1))}
            className="flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded border border-[#ddd] text-[#555] hover:border-primary hover:text-primary"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[2.4rem] text-center text-[1.3rem] font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => onUpdate(product.id, quantity + 1)}
            className="flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded border border-[#ddd] text-[#555] hover:border-primary hover:text-primary"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        aria-label="Remove item"
        className="self-start text-[#878787] transition-colors hover:text-[#ec0101]"
      >
        <X size={16} />
      </button>
    </li>
  );
}
