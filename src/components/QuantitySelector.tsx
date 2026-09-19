import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  label?: string;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  size = 'md',
  label = 'Quantity',
}: QuantitySelectorProps) {
  const dec = () => {
    if (disabled) return;
    onChange(Math.max(min, value - 1));
  };
  const inc = () => {
    if (disabled) return;
    onChange(Math.min(max, value + 1));
  };

  const isSm = size === 'sm';

  return (
    <div className="inline-flex flex-col gap-[0.6rem]">
      {label && (
        <span className="text-[1.3rem] font-medium text-[#555] sm:text-[1.35rem]">{label}</span>
      )}
      <div
        className={`inline-flex items-center overflow-hidden rounded-[10px] border border-[#ddd] bg-white ${
          isSm ? 'h-[3.6rem]' : 'h-[4.4rem]'
        } ${disabled ? 'opacity-50' : ''}`}
        role="group"
        aria-label={label || 'Quantity'}
      >
        <button
          type="button"
          onClick={dec}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
          className={`flex items-center justify-center text-[#555] transition-colors hover:bg-[#f5f5f5] hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 ${
            isSm ? 'h-[3.6rem] w-[3.6rem]' : 'h-[4.4rem] w-[4.4rem]'
          }`}
        >
          <Minus size={isSm ? 14 : 16} />
        </button>
        <span
          className={`min-w-[4rem] border-x border-[#eee] text-center font-semibold text-[#222] ${
            isSm ? 'text-[1.3rem]' : 'text-[1.5rem]'
          }`}
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
          className={`flex items-center justify-center text-[#555] transition-colors hover:bg-[#f5f5f5] hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 ${
            isSm ? 'h-[3.6rem] w-[3.6rem]' : 'h-[4.4rem] w-[4.4rem]'
          }`}
        >
          <Plus size={isSm ? 14 : 16} />
        </button>
      </div>
    </div>
  );
}
