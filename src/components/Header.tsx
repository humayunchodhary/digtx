import { useState, Fragment, useEffect, useRef } from 'react';
import { Menu, Search, Phone, User, X, Heart } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from './CartDrawer';
import { Portal } from './Portal';
import { SearchBar } from './SearchBar';
import { WhatsAppButton } from './WhatsAppButton';
import { useWishlist } from '../context/WishlistContext';
import { categories } from '../data/categories';
import { useStickyHeader } from '../hooks/useStickyHeader';

const navLinks = [
  { label: 'About Us', to: '/pages/about-us' },
  { label: 'Deals', to: '/shop?sort=best-selling' },
  { label: 'Shop', to: '/shop' },
  { label: 'Support', to: '/pages/support' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const scrolled = useStickyHeader(20);
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    if (categoryOpen) {
      document.addEventListener('mousedown', onDoc);
      document.addEventListener('touchstart', onDoc);
    }
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
    };
  }, [categoryOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCategoryOpen(false);
        setMobileSearch(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <Fragment>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id="main-header">
        <div className="container mx-auto flex h-[7.2rem] items-center justify-between px-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <button
              type="button"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="text-[#1a1a1a] transition-colors hover:text-primary lg:hidden"
            >
              <Menu size={22} />
            </button>
            <Logo variant="dark" width={118} />
          </div>

          <div className="hidden flex-1 items-center justify-center px-[2rem] lg:flex">
            <SearchBar className="w-full max-w-[520px]" placeholder="Search DigitX Pro products..." />
          </div>

          <div className="flex items-center gap-[1.4rem]">
            <Link
              to="/pages/support"
              aria-label="Account"
              className="hidden text-[#1a1a1a] transition-colors hover:text-primary lg:inline-flex"
            >
              <User size={20} />
            </Link>

            <button
              type="button"
              aria-label="Search"
              onClick={() => setMobileSearch(true)}
              className="text-[#1a1a1a] transition-colors hover:text-primary lg:hidden"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} saved)` : ''}`}
              title="Wishlist"
              className="relative flex items-center justify-center text-[#1a1a1a] transition-colors hover:text-primary"
            >
              <Heart size={20} fill={wishlistCount > 0 ? 'currentColor' : 'none'} />
              {wishlistCount > 0 && (
                <span className="absolute -top-[0.4rem] -right-[0.5rem] flex h-[1.8rem] min-w-[1.8rem] items-center justify-center rounded-full bg-primary text-[1.1rem] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <CartDrawer iconOnly />
          </div>
        </div>

        <nav
          className="hidden border-t border-[#f3f3f3] bg-[#1a1a1a] text-white lg:block"
          aria-label="Main"
        >
          <div className="container mx-auto flex h-[4.6rem] items-center px-[1.5rem]">
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={categoryOpen}
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="mr-[1.2rem] flex h-[3.4rem] items-center gap-[0.6rem] rounded-full bg-primary px-[1.4rem] text-[1.25rem] font-semibold text-white transition-colors hover:bg-primaryHover"
              >
                <span>&#8801;</span>
                <span>Categories</span>
              </button>

              {categoryOpen && (
                <div
                  className="category-megamenu absolute left-0 top-[4.2rem] z-[60] grid w-[680px] grid-cols-3 gap-x-[1.5rem] gap-y-[1rem] bg-white p-[2rem] text-[#1a1a1a] shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
                  role="menu"
                >
                  {categories.map((cat) => (
                    <div key={cat.slug} role="none">
                      <NavLink
                        to={`/collections/${cat.slug}`}
                        onClick={() => setCategoryOpen(false)}
                        className="block text-[1.35rem] font-semibold text-[#1a1a1a] hover:text-primary"
                        role="menuitem"
                      >
                        {cat.name}
                      </NavLink>
                      <span className="text-[1.2rem] text-[#6b6b6b]">{cat.productCount} products</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ul className="flex h-full items-center gap-[1.8rem]">
              {navLinks.map((link) => (
                <li key={link.label} className="h-full">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex h-full items-center px-[0.4rem] text-[1.3rem] font-medium text-white/90 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="ml-auto flex items-center gap-[0.8rem] text-[1.3rem]">
              <Phone size={16} className="text-primary" />
              <a href="tel:080061226" className="font-medium text-white transition-colors hover:text-primary">
                0800-61226
              </a>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {mobileSearch && (
        <Portal>
          <div
            className="fixed inset-0 z-[9990] bg-black/50 lg:hidden"
            onClick={() => setMobileSearch(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 left-0 z-[9991] h-[5.6rem] w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.14)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            <div className="container mx-auto flex h-full items-center px-[1.5rem]">
              <SearchBar compact placeholder="Search products..." />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setMobileSearch(false)}
                className="ml-[0.8rem] text-[#1a1a1a] hover:text-primary"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </Portal>
      )}

      <div className="fixed bottom-[2rem] right-[1.5rem] z-[80] flex flex-col items-center gap-[0.8rem]">
        <WhatsAppButton
          label="Chat on WhatsApp"
          className="floating-support flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_2px_8px_#00000022] transition-opacity hover:opacity-90"
        />
      </div>
    </Fragment>
  );
}
