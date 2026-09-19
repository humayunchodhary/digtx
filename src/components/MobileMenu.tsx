import { useEffect } from 'react';
import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Portal } from './Portal';
import { categories } from '../data/categories';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Promotion', to: '/shop?sort=best-selling' },
    { label: 'Online Shop', to: '/collections' },
    { label: 'About Us', to: '/pages/about-us' },
    { label: 'Support', to: '/pages/support' },
  ];

  if (!open) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[9998] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="mobile-menu"
        role="navigation"
        aria-label="Primary"
        className="fixed inset-y-0 left-0 z-[9999] flex h-screen w-[300px] max-w-[80vw] flex-col bg-white shadow-[0_0_24px_rgba(0,0,0,0.2)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#eee] p-[1.5rem]">
          <Logo variant="dark" width={100} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-[#222] hover:text-primary transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ul className="border-b border-[#ddd]">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-[#ddd]">
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-[1.5rem] py-[1.2rem] text-[1.4rem] font-medium ${
                      isActive ? 'text-primary bg-[#f5f5f5]' : 'text-[#222] hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul>
            <li className="px-[1.5rem] py-[1rem] text-[1.3rem] font-semibold text-[#222]">
              Shop By Categories
            </li>
            {categories.map((cat) => (
              <li key={cat.slug} className="border-b border-[#ddd]">
                <NavLink
                  to={`/collections/${cat.slug}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-[2rem] py-[0.9rem] text-[1.35rem] ${
                      isActive ? 'text-primary bg-[#f5f5f5]' : 'text-[#555] hover:text-primary'
                    }`
                  }
                >
                  {cat.name}
                  <span className="float-right text-[#878787]">{cat.productCount}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </Portal>
  );
}
