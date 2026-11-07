import type { ButtonHTMLAttributes } from 'react';

type Tone = 'light' | 'outline';

const TONES: Record<Tone, string> = {
  light: 'bg-soft text-[#A9AAD0]',
  outline: 'border border-navy/25 bg-white text-navy',
};

type ArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'prev' | 'next';
  tone: Tone;
  'aria-label': string;
};

export function ArrowButton({ direction, tone, className = '', ...rest }: ArrowButtonProps) {
  return (
    <button type="button" className={`arrow-btn ${TONES[tone]} ${className}`} {...rest}>
      <span aria-hidden="true">{direction === 'prev' ? '←' : '→'}</span>
    </button>
  );
}
