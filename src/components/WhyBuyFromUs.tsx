import { Truck, Shield, Headset, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrustCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const cards: TrustCard[] = [
  {
    title: 'Quality Build',
    description: 'Premium audio and electronics engineered for everyday use.',
    icon: <Award size={32} className="text-primary" />,
  },
  {
    title: 'Reliable Service',
    description: 'Responsive after-sales support when you need help the most.',
    icon: <Shield size={32} className="text-primary" />,
  },
  {
    title: 'Nationwide Reach',
    description: 'Growing dealer and delivery coverage across major cities.',
    icon: <Headset size={32} className="text-primary" />,
  },
  {
    title: 'Fast Delivery',
    description: 'Careful packing and timely delivery to your doorstep.',
    icon: <Truck size={32} className="text-primary" />,
  },
  {
    title: 'Smart Value',
    description: 'Practical features that simplify listening, working and playing.',
    icon: <Clock size={32} className="text-primary" />,
  },
];

export function WhyBuyFromUs() {
  return (
    <section className="bg-white py-[4.5rem]">
      <div className="container mx-auto px-[1.5rem]">
        <div className="mb-[2.8rem] grid gap-[2rem] lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="brand-chip">Why DigitX Pro</span>
            <h2 className="section-title mt-[1.2rem] text-[2.6rem] font-bold text-[#1a1a1a]">
              Built for Sound. Engineered for Life.
            </h2>
            <p className="mt-[1.2rem] max-w-[560px] text-[1.5rem] text-[#6b6b6b]">
              From hybrid ANC earbuds and AMOLED smartwatches to ultra-fast GaN chargers, DigitX Pro focuses on dependable performance, modern aesthetics,
              and premium quality.
            </p>
            <Link to="/pages/about-us" className="btn-primary mt-[2rem]">
              Our story
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[24px] border border-[#f0f0f0] bg-gradient-to-br from-[#1a1a1a] via-[#2b2118] to-[#ff7a1a] p-[2.4rem] text-white shadow-card">
            <img
              src="/assets/images/logo-white.svg"
              alt="DigitX Pro"
              className="mb-[1.6rem] h-auto w-[160px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
            />
            <p className="text-[2rem] font-bold leading-tight">Sound. Style. Power.</p>
            <p className="mt-[1rem] text-[1.4rem] text-white/85">
              Premium audio, electronics and smart gadgets for next-gen living.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-[18px] border border-[#f0f0f0] bg-[#fffaf5] p-[2rem] text-center transition-transform duration-300 hover:-translate-y-[2px]"
            >
              <div className="mx-auto mb-[1.2rem] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white shadow-card">
                {c.icon}
              </div>
              <h3 className="mb-[0.6rem] text-[1.5rem] font-semibold text-[#1a1a1a]">{c.title}</h3>
              <p className="flex-1 text-[1.3rem] text-[#555]">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
