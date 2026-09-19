import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { slides } from '../data/slides';
import type { Slide } from '../data/slides';

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    intervalRef.current = window.setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5000);
  }, [stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    stop();
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
    touchStartX.current = null;
    start();
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#eef2f7]"
      aria-label="Featured promotions"
      aria-roledescription="carousel"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px]">
        {slides.map((slide, idx) => (
          <SlideItem key={slide.id} slide={slide} isActive={idx === current} />
        ))}
      </div>

      <div className="absolute bottom-[1.4rem] left-1/2 z-[10] flex -translate-x-1/2 items-center gap-[0.8rem]">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === current}
            onClick={() => setCurrent(idx)}
            className={`h-[10px] rounded-[6px] transition-all duration-300 ${
              idx === current
                ? 'w-[34px] bg-primary'
                : 'w-[10px] bg-white/60 hover:bg-primary/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function SlideItem({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[700ms] ${
        isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isActive}
    >
      <img
        src={slide.image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${isActive ? 'hero-kenburns' : ''}`}
        loading={isActive ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="container relative z-[2] mx-auto flex h-full items-center px-[1.5rem]">
        {isActive && (
          <div className="hero-slide-content max-w-[560px]">
            <h2 className="mb-[1.2rem] text-[2.6rem] font-extrabold leading-tight text-white drop-shadow sm:text-[3rem] lg:text-[3.6rem]">
              {slide.heading}
            </h2>
            <p className="mb-[2rem] max-w-[480px] text-[1.4rem] leading-relaxed text-white/90 drop-shadow">
              {slide.description}
            </p>
            <Link to={slide.ctaLink} className="btn-primary">
              {slide.ctaText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroCarousel;
