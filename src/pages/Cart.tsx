import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/helpers';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-[1.5rem] py-[4rem]">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="mx-auto mt-[3rem] max-w-[480px] text-center">
          <ShoppingBag size={56} className="mx-auto text-[#878787]" />
          <h1 className="mt-[1.6rem] text-[2.4rem] font-bold text-[#222]">Your cart is empty</h1>
          <p className="mt-[0.8rem] text-[1.4rem] text-[#878787]">
            Browse our collections and add products you love.
          </p>
          <Link to="/shop" className="btn-primary mt-[2rem]">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <div className="mb-[2rem] mt-[1.6rem] flex items-end justify-between gap-[1rem]">
        <div>
          <h1 className="text-[2.6rem] font-bold text-[#222]">Shopping Cart</h1>
          <p className="text-[1.4rem] text-[#878787]">{totalItems} item(s) in your cart</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-[1.3rem] text-[#878787] hover:text-primary"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-[2rem] lg:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-[16px] border border-[#eee]">
          <ul>
            {items.map((item) => {
              const image = item.product.images?.[0] ?? '/assets/images/logo.png';
              return (
                <li
                  key={item.product.id}
                  className="flex flex-col gap-[1.2rem] border-b border-[#eee] p-[1.4rem] last:border-b-0 sm:flex-row sm:items-center"
                >
                  <Link to={`/products/${item.product.slug}`} className="shrink-0">
                    <img
                      src={image}
                      alt={item.product.title}
                      className="h-[100px] w-[100px] rounded-[8px] border border-[#f2f2f2] bg-[#fafafa] object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="line-clamp-2 text-[1.4rem] font-semibold text-[#222] hover:text-primary"
                    >
                      {item.product.title}
                    </Link>
                    <div className="mt-[0.6rem] flex items-center gap-[0.6rem]">
                      <span className="text-[1.5rem] font-bold text-primary">
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.compareAtPrice &&
                        item.product.compareAtPrice > item.product.price && (
                          <span className="text-[1.2rem] text-[#878787] line-through">
                            {formatPrice(item.product.compareAtPrice)}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center gap-[1.2rem]">
                    <div className="flex items-center gap-[0.6rem]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-[3.2rem] w-[3.2rem] items-center justify-center border border-[#ddd] text-[#222] hover:border-primary hover:text-primary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[2.4rem] text-center text-[1.4rem] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-[3.2rem] w-[3.2rem] items-center justify-center border border-[#ddd] text-[#222] hover:border-primary hover:text-primary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="min-w-[9rem] text-right text-[1.5rem] font-bold text-[#222]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.product.id)}
                      className="text-[#878787] hover:text-[#ec0101]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="h-fit rounded-[16px] border border-[#eee] bg-[#fffaf5] p-[1.8rem]">
          <h2 className="text-[1.8rem] font-bold text-[#222]">Order Summary</h2>
          <div className="mt-[1.4rem] flex items-center justify-between text-[1.4rem]">
            <span className="text-[#555]">Subtotal</span>
            <span className="font-semibold text-[#222]">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-[0.8rem] flex items-center justify-between text-[1.4rem]">
            <span className="text-[#555]">Shipping</span>
            <span className="font-semibold text-[#109533]">Calculated at checkout</span>
          </div>
          <div className="mt-[1.4rem] flex items-center justify-between border-t border-[#ddd] pt-[1.4rem]">
            <span className="text-[1.6rem] font-bold text-[#222]">Total</span>
            <span className="text-[1.8rem] font-bold text-primary">{formatPrice(subtotal)}</span>
          </div>
          <Link to="/checkout" className="btn-cta mt-[1.6rem] w-full text-center">
            Proceed to checkout
          </Link>
          <Link
            to="/shop"
            className="mt-[1rem] block text-center text-[1.3rem] font-medium text-primary hover:text-primaryHover"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
