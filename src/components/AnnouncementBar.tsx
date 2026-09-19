import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date('2026-12-26T23:59:59');
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem('digitx-announcement-hidden') !== '1';
    } catch {
      return true;
    }
  });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('digitx-announcement-hidden', '1');
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      className="flex h-[4.6rem] items-center overflow-hidden bg-gradient-to-r from-[#1a1a1a] via-[#2a2118] to-[#ff7a1a] text-[1.2rem] text-white"
      role="complementary"
      aria-label="Site announcement"
    >
      <div className="container relative mx-auto hidden items-center justify-between px-[1.5rem] md:flex">
        <span className="font-medium">
          Welcome to <strong className="font-bold">DigitX Pro</strong> — Smart Living, Audio &amp; Gadgets
        </span>
        <div className="flex items-center gap-[1.2rem]">
          <span className="font-medium">Season offer ends in</span>
          <div className="flex items-center gap-[0.5rem] font-mono" aria-label="Sale countdown timer">
            <span className="flex items-center gap-[0.25rem]">
              <span key={`d-${timeLeft.days}`} className="countdown-digit">
                {pad(timeLeft.days)}
              </span>
              <span>D</span>
            </span>
            <span>:</span>
            <span className="flex items-center gap-[0.25rem]">
              <span key={`h-${timeLeft.hours}`} className="countdown-digit">
                {pad(timeLeft.hours)}
              </span>
              <span>H</span>
            </span>
            <span>:</span>
            <span className="flex items-center gap-[0.25rem]">
              <span key={`m-${timeLeft.minutes}`} className="countdown-digit">
                {pad(timeLeft.minutes)}
              </span>
              <span>M</span>
            </span>
            <span>:</span>
            <span className="flex items-center gap-[0.25rem]">
              <span key={`s-${timeLeft.seconds}`} className="countdown-digit">
                {pad(timeLeft.seconds)}
              </span>
              <span>S</span>
            </span>
          </div>
          <a href="tel:03178600056" className="font-medium text-white hover:text-[#ffe0c2]" aria-label="Call DigitX Pro">
            Helpline: 03178600056
          </a>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="p-[0.4rem] text-white transition-colors hover:text-[#ffe0c2]"
          aria-label="Dismiss announcement"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex w-full items-center overflow-hidden px-[1rem] md:hidden">
        <div className="announcement-marquee gap-[4rem] whitespace-nowrap pr-[4rem]">
          <span>Welcome to DigitX Pro · Smart Living · Sound. Style. Power. · Helpline 03178600056 ·</span>
          <span>Welcome to DigitX Pro · Smart Living · Sound. Style. Power. · Helpline 03178600056 ·</span>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-[0.8rem] z-[2] rounded-full bg-black/30 p-[0.4rem] text-white"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
