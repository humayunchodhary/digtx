import { Link } from 'react-router-dom';

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const banners: PromoBanner[] = [
  {
    id: 'earbuds',
    title: 'Wireless Earbuds',
    subtitle: 'ANC & 60h playtime',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    link: '/collections/earbuds',
  },
  {
    id: 'watches',
    title: 'Smart Watches',
    subtitle: 'Track. Style. Perform.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    link: '/collections/smart-watches',
  },
  {
    id: 'speakers',
    title: 'Big Sound',
    subtitle: 'Speakers & party towers',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    link: '/collections/speakers',
  },
];

export function PromoBanners() {
  return (
    <section className="bg-white py-[4rem]">
      <div className="container mx-auto px-[1.5rem]">
        <div className="mb-[2.4rem] flex flex-col gap-[1rem] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="brand-chip">Explore collections</span>
            <h2 className="section-title mt-[1.2rem] text-[2.6rem] font-bold text-[#1a1a1a]">
              Next-Gen Smart Living
            </h2>
          </div>
          <p className="max-w-[420px] text-[1.45rem] text-[#6b6b6b]">
            Sound. Style. Power. — find the right DigitX Pro gadget for every moment.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((b) => (
            <Link
              key={b.id}
              to={b.link}
              className="group relative block overflow-hidden rounded-[20px] border border-[#f0f0f0] shadow-card"
            >
              <div className="relative h-[240px] w-full overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                  width={480}
                  height={480}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-[1.4rem] left-[1.4rem] right-[1.4rem]">
                <h3 className="text-[1.8rem] font-bold text-white">{b.title}</h3>
                <p className="text-[1.3rem] text-white/85">{b.subtitle}</p>
                <span className="mt-[0.8rem] inline-flex rounded-full bg-primary px-[1.2rem] py-[0.45rem] text-[1.2rem] font-semibold text-white">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
