import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { Wrench, MapPin, Phone, Video, LifeBuoy, CalendarDays } from 'lucide-react';
import { WhatsAppButton, WhatsAppIcon, whatsappDisplayNumber } from '../components/WhatsAppButton';

const supportCards = [
  {
    title: 'Online Complaint',
    desc: 'Register your complaint online and track its status in real-time.',
    icon: <LifeBuoy size={36} className="text-primary" />,
    link: '#complaint',
    linkText: 'Register Complaint',
  },
  {
    title: 'Sales Centers',
    desc: 'Find the nearest DigitX Pro authorized dealer for product purchases and advice.',
    icon: <MapPin size={36} className="text-primary" />,
    link: '#',
    linkText: 'Find a Center',
  },
  {
    title: 'Warranty & Repairs',
    desc: 'Locate the nearest authorized service partner for fast warranty claims and repairs.',
    icon: <Wrench size={36} className="text-primary" />,
    link: '#',
    linkText: 'Find a Service Center',
  },
  {
    title: 'Video Guides',
    desc: 'Watch unboxing videos, pairing tutorials and quick troubleshooting guides.',
    icon: <Video size={36} className="text-primary" />,
    link: '#',
    linkText: 'Watch Videos',
  },
];

export default function Support() {
  return (
    <div className="bg-[#fafafa]">
      <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
        <Breadcrumbs items={[{ label: 'Support' }]} />

        <section className="mb-[3.4rem] text-center">
          <h1 className="mb-[1rem] text-[2.8rem] font-bold text-[#222222] lg:text-[3.4rem]">
            We're Here to Help
          </h1>
          <p className="mx-auto max-w-[720px] text-[1.55rem] text-[#555]">
            Need assistance with your DigitX Pro product? Choose from the support options below or
            reach our customer care directly.
          </p>
        </section>

        <section className="mb-[3.4rem]">
          <div className="grid grid-cols-1 gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-4">
            {supportCards.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-[8px] border border-[#eee] bg-white p-[2rem] shadow-card text-center transition-shadow duration-300 hover:shadow-[0_4px_24px_#00000018]"
              >
                <div className="mb-[1.4rem] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#eef2f7]">
                  {c.icon}
                </div>
                <h3 className="mb-[0.8rem] text-[1.7rem] font-bold text-[#222222]">{c.title}</h3>
                <p className="mb-[1.6rem] flex-1 text-[1.4rem] text-[#555]">{c.desc}</p>
                <a
                  href={c.link}
                  className="mt-auto rounded-[8px] bg-primary px-[1.4rem] py-[0.8rem] text-[1.4rem] font-semibold text-white transition-colors hover:bg-primaryHover"
                >
                  {c.linkText}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section id="complaint" className="mb-[3.4rem]">
          <SectionHeading title="Send us a message" subtitle="Contact Form" />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto grid max-w-[640px] grid-cols-1 gap-[1.4rem]"
          >
            <div className="grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Full name"
                className="rounded-[8px] border border-[#ddd] px-[1.2rem] py-[0.9rem] text-[1.4rem] text-[#222] outline-none transition-colors focus:border-primary"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                className="rounded-[8px] border border-[#ddd] px-[1.2rem] py-[0.9rem] text-[1.4rem] text-[#222] outline-none transition-colors focus:border-primary"
              />
            </div>
            <input
              type="tel"
              required
              placeholder="Phone number"
              className="rounded-[8px] border border-[#ddd] px-[1.2rem] py-[0.9rem] text-[1.4rem] text-[#222] outline-none transition-colors focus:border-primary"
            />
            <select
              required
              className="rounded-[8px] border border-[#ddd] px-[1.2rem] py-[0.9rem] text-[1.4rem] text-[#222] outline-none transition-colors focus:border-primary"
            >
              <option value="">Product category</option>
              <option>Wireless Earbuds</option>
              <option>Headphones</option>
              <option>Bluetooth Speakers</option>
              <option>Smart Watches</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Describe your issue"
              rows={5}
              required
              className="rounded-[8px] border border-[#ddd] px-[1.2rem] py-[0.9rem] text-[1.4rem] text-[#222] outline-none resize-y transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-[8px] bg-primary px-[2rem] py-[0.9rem] text-[1.5rem] font-semibold text-white transition-colors hover:bg-primaryHover"
            >
              Submit Complaint
            </button>
          </form>
        </section>

        {/* Hours */}
        <section className="text-center">
          <div className="mb-[2rem] flex items-center justify-center gap-[0.8rem] text-[1.45rem] text-[#555]">
            <Phone size={20} className="text-primary" />
            <span>
              Call: <strong className="text-[#222]">0800-61226</strong> (Toll-free, all Pakistan)
            </span>
          </div>
          <div className="mb-[2rem] flex items-center justify-center gap-[0.8rem] text-[1.45rem] text-[#555]">
            <WhatsAppIcon size={20} />
            <span>
              WhatsApp:{' '}
              <WhatsAppButton
                className="font-semibold text-[#25d366] hover:underline"
                label="Chat on WhatsApp"
              >
                {whatsappDisplayNumber}
              </WhatsAppButton>
            </span>
          </div>
          <div className="flex items-center justify-center gap-[0.8rem] text-[1.45rem] text-[#555]">
            <CalendarDays size={20} className="text-primary" />
            <span>
              Support Hours: Mon–Sat 09:00 AM – 06:00 PM
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
