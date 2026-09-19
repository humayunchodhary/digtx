import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  width?: number;
}

export function Logo({ variant = 'dark', className = '', width = 145 }: LogoProps) {
  const logoSrc = variant === 'light' ? '/assets/images/logo-white.svg' : '/assets/images/logo.svg';

  return (
    <Link
      to="/"
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
      aria-label="DigitX Pro — home"
    >
      <img
        src={logoSrc}
        alt="DigitX Pro"
        width={width}
        height={Math.round((width * 72) / 340)}
        className="h-auto w-auto max-h-[5.6rem] object-contain object-left"
        style={{ width }}
        loading="eager"
      />
    </Link>
  );
}
