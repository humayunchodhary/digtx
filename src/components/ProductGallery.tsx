import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const thumbs = images.length > 0 ? images : ['/assets/images/logo.png'];

  return (
    <div className="flex w-full min-w-0 flex-col gap-[1rem] sm:grid sm:grid-cols-[72px_1fr] sm:gap-[1.2rem] md:grid-cols-[80px_1fr] md:gap-[1.6rem]">
      <div className="order-2 flex gap-[0.8rem] overflow-x-auto pb-[0.2rem] sm:order-1 sm:flex-col sm:overflow-y-auto sm:overflow-x-visible sm:py-[0.4rem]">
        {thumbs.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[8px] border-2 bg-[#fafafa] p-[0.4rem] transition-all sm:h-[70px] sm:w-[70px] ${
              i === active ? 'border-primary' : 'border-[#eee] hover:border-[#ccc]'
            }`}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
          >
            <img
              src={img}
              alt={`${name} thumbnail ${i + 1}`}
              className="h-full w-full rounded-[6px] object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <div
        className="relative order-1 aspect-square w-full min-w-0 overflow-hidden rounded-[12px] border border-[#eee] bg-[#fafafa] sm:order-2 sm:aspect-auto sm:min-h-[320px] md:min-h-[420px]"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => {
          setZoom(false);
          setPosition({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={thumbs[active]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-150"
          style={
            zoom
              ? {
                  transformOrigin: `${position.x}% ${position.y}%`,
                  transform: 'scale(2)',
                }
              : { transform: 'scale(1)' }
          }
        />
        <button
          type="button"
          onClick={() => setZoom(!zoom)}
          className="absolute right-[0.8rem] top-[0.8rem] hidden h-[34px] w-[34px] items-center justify-center rounded-full bg-white/80 text-[#222] hover:text-primary sm:flex"
          aria-label={zoom ? 'Zoom out' : 'Zoom in'}
        >
          {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
        </button>
      </div>
    </div>
  );
}
