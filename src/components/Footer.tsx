import { Link } from 'react-router-dom';

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MessengerIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.27 2 2 6.2 2 11.7c0 3.13 1.4 5.92 3.6 7.74v3.79l3.3-1.81c.99.27 2.03.42 3.1.42 5.73 0 10-4.2 10-9.7S17.73 2 12 2zm1.02 12.93-2.6-2.77-4.98 2.77 5.48-5.82 2.66 2.77 4.92-2.77-5.48 5.82z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.68 5.68 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const footerCategories = [
  { name: 'Wireless Earbuds', to: '/collections/earbuds' },
  { name: 'Headphones', to: '/collections/headphones' },
  { name: 'Bluetooth Speakers', to: '/collections/speakers' },
  { name: 'Smart Watches', to: '/collections/smart-watches' },
  { name: 'Power Banks', to: '/collections/power-banks' },
  { name: 'Gaming Gear', to: '/collections/gaming' },
];

const supportLinks = [
  { name: 'Online Complaint', to: '/pages/support' },
  { name: 'Service Centers', to: '/pages/support' },
  { name: 'Warranty Info', to: '/pages/support' },
  { name: 'Contact Us', to: '/pages/support' },
];

const socialLinks = [
  { name: 'Facebook', to: 'https://www.facebook.com/', icon: <FacebookIcon /> },
  { name: 'Instagram', to: 'https://www.instagram.com/digitxpro', icon: <InstagramIcon /> },
  { name: 'TikTok', to: 'https://www.tiktok.com/', icon: <TikTokIcon /> },
  { name: 'Messenger', to: 'https://m.me/', icon: <MessengerIcon /> },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-[4rem] pb-[1.6rem] text-white">
      <div className="container mx-auto px-[1.5rem]">
        <div className="grid grid-cols-1 gap-[2.8rem] sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/assets/images/logo-white.svg"
                alt="DigitX Pro"
                width={155}
                className="h-auto max-h-[4.8rem] w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="mt-[1.4rem] text-[1.4rem] leading-relaxed text-white/75">
              DigitX Pro — smart living, premium audio, electronics and next-gen gadgets designed to keep you moving.
            </p>
            <p className="mt-[0.6rem] text-[1.5rem] font-semibold text-primary">Sound. Style. Power.</p>
            <address className="mt-[1.4rem] not-italic text-[1.35rem] text-white/75 space-y-[0.4rem]">
              <p>
                <a href="mailto:info@digitxpro.com" className="text-white/75 hover:text-primary">
                  info@digitxpro.com
                </a>
              </p>
              <p>
                <a href="tel:03178600056" className="text-white/75 hover:text-primary">
                  03178600056
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="mb-[1.4rem] text-[1.6rem] font-semibold text-white">Categories</h3>
            <ul className="space-y-[0.75rem]">
              {footerCategories.map((c) => (
                <li key={c.name}>
                  <Link to={c.to} className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-[1.4rem] text-[1.6rem] font-semibold text-white">Support</h3>
            <ul className="space-y-[0.75rem]">
              {supportLinks.map((s) => (
                <li key={s.name}>
                  <Link to={s.to} className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-[1.4rem] text-[1.6rem] font-semibold text-white">Useful Links</h3>
            <ul className="space-y-[0.75rem]">
              <li>
                <Link to="/cart" className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/pages/about-us" className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                  About Digit X
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-[1.4rem] text-white/70 transition-colors hover:text-primary">
                  Online Shop
                </Link>
              </li>
            </ul>
            <div className="mt-[1.8rem] flex items-center gap-[0.9rem]">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[3rem] border-t border-white/10 pt-[1.5rem] text-center text-[1.3rem] text-white/55">
          Copyright &copy; {new Date().getFullYear()} <strong className="text-primary">DigitX Pro</strong> — all
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
