import { SectionHeading } from '../components/SectionHeading';
import { Breadcrumbs } from '../components/Breadcrumbs';

const values = [
  { title: 'Quality', desc: 'Solid construction and careful engineering for everyday reliability.' },
  { title: 'Innovation', desc: 'Practical features that make listening, working and playing easier.' },
  { title: 'Trust', desc: 'Transparent support and products built for modern households.' },
  { title: 'Value', desc: 'Performance-focused electronics at fair, competitive prices.' },
];

export default function About() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-[1.5rem] py-[2.4rem]">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <section className="mb-[4rem] grid items-center gap-[2.4rem] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="brand-chip">About DigitX Pro</span>
            <h1 className="mt-[1.2rem] text-[3.2rem] font-bold text-[#1a1a1a] lg:text-[3.8rem]">
              Smart living, premium audio &amp; next-gen gadgets
            </h1>
            <p className="mt-[1.4rem] max-w-[640px] text-[1.6rem] leading-relaxed text-[#555]">
              DigitX Pro is an innovative technology &amp; electronics brand focused on high performance,
              sleek aesthetics, and smart living gadgets. Engineered for music lovers, gamers, fitness enthusiasts,
              and modern professionals: Sound. Style. Power.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-[24px] border border-[#f0f0f0] bg-[#fffaf5] p-[2.4rem]">
            <img
              src="/assets/images/logo.svg"
              alt="DigitX Pro"
              className="mx-auto w-[220px] object-contain"
            />
          </div>
        </section>

        <section className="mb-[4rem]">
          <SectionHeading title="What we stand for" />
          <div className="mt-[2rem] grid gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[18px] border border-[#f0f0f0] bg-[#fafafa] p-[2rem]">
                <h3 className="text-[1.7rem] font-semibold text-primary">{v.title}</h3>
                <p className="mt-[0.8rem] text-[1.4rem] text-[#555]">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
