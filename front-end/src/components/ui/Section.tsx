import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type Tone = 'white' | 'navy' | 'blue';

const TONES: Record<Tone, string> = {
  white: 'bg-white text-ink',
  navy: 'bg-navy text-lavender',
  blue: 'bg-grad-blue text-white',
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone: Tone;
  padded?: boolean;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, padded = true, className = '', children, ...rest },
  ref,
) {
  return (
    <section ref={ref} className={`${TONES[tone]} ${padded ? 'section-y' : ''} ${className}`} {...rest}>
      {children}
    </section>
  );
});
