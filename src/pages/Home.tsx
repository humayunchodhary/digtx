import { HeroCarousel } from '../components/HeroCarousel';
import { CategorySection } from '../components/CategorySection';
import { BestSellers } from '../components/BestSellers';
import { PromoBanners } from '../components/PromoBanners';
// import { Certifications } from '../components/Certifications';
import { WhyBuyFromUs } from '../components/WhyBuyFromUs';
import { Newsletter } from '../components/Newsletter';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <CategorySection />
      <PromoBanners />
      <BestSellers />
      {/* <Certifications /> */}
      <WhyBuyFromUs />
      <Newsletter />
    </div>
  );
}
