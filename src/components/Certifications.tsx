const clientLogos = [
  'client-1',
  'client-2',
  'client-3',
  'client-4',
  'client-5',
  'client-6',
  'client-7',
  'client-8',
  'client-9',
  'client-10',
];

const certs = ['cert-1', 'cert-2', 'cert-3'];

export function Certifications() {
  return (
    <section className="py-[3.4rem] bg-[#fafafa]">
      <div className="container mx-auto px-[1.5rem]">
        <h2 className="mb-[2.4rem] text-center text-[2.5rem] font-bold text-[#222222]">
          Prestigious Clients &amp; Certifications
        </h2>

        <div className="mb-[2.6rem] overflow-x-auto">
          <div className="mx-auto grid min-w-[720px] grid-cols-2 justify-items-center gap-[1.4rem] sm:grid-cols-3 lg:grid-cols-5 lg:min-w-0">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-[120px] w-[220px] items-center justify-center rounded-[8px] border border-[#eee] bg-white px-[1rem] shadow-card"
              >
                <img
                  src={`/assets/images/${logo}.svg`}
                  alt={`Client ${logo}`}
                  className="max-h-[80px] max-w-[180px] object-contain grayscale"
                  loading="lazy"
                  width={180}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[1.8rem]">
          {certs.map((cert) => (
            <div
              key={cert}
              className="flex h-[120px] w-[340px] items-center rounded-[8px] border border-[#eee] bg-white px-[1.4rem] shadow-card"
            >
              <img
                src={`/assets/images/${cert}.svg`}
                alt="Certification"
                className="max-h-[80px] w-[100px] object-contain shrink-0"
                loading="lazy"
                width={100}
                height={60}
              />
              <div className="ml-[1rem] text-left">
                <p className="text-[1.4rem] font-bold text-[#222222]"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
