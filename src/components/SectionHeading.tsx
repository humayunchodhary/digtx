interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, center = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-[2.2rem] flex flex-col ${center ? 'items-center text-center' : ''} ${className}`}>
      {subtitle && <span className="text-[1.3rem] font-medium text-[#ec0101] uppercase mb-[0.5rem]">{subtitle}</span>}
      <h2 className="text-[2.5rem] font-bold text-[#222222] leading-tight">{title}</h2>
    </div>
  );
}
