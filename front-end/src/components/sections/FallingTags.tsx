import { useRef } from 'react';
import { Section } from '@/components/ui/Section';
import { NEEDS } from '@/content';
import { usePhysicsPile } from '@/hooks/usePhysicsPile';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const TINY_SCREEN_LIMIT = 11;

export function FallingTags() {
  const sectionRef = useRef<HTMLElement>(null);
  const pileRef = useRef<HTMLUListElement>(null);
  const physics = !usePrefersReducedMotion();

  usePhysicsPile(sectionRef, pileRef, { enabled: physics, itemSelector: '.pill' });

  return (
    <Section
      ref={sectionRef}
      tone="blue"
      padded={false}
      aria-labelledby="needs-title"
      className="relative overflow-hidden !bg-grad-blue-x pb-[340px] pt-[88px] sm:pb-[320px] sm:pt-[110px] md:pt-[170px]"
    >
      <ul
        ref={pileRef}
        aria-label="O que cada projeto cobre"
        className={`absolute inset-0 z-[1] overflow-hidden ${physics ? 'pile-physics' : 'pile-static'}`}
      >
        {NEEDS.map((tag, i) => (
          <li key={tag} className={`pill ${i >= TINY_SCREEN_LIMIT ? 'hidden xs:block' : ''}`}>
            {tag}
          </li>
        ))}
      </ul>
      <div className="wrap pointer-events-none relative z-[2] text-center">
        <h2
          id="needs-title"
          className="title mb-1.5 text-center text-lavender [word-spacing:.12em] sm:!text-[clamp(2rem,3.4vw,2.75rem)]"
        >
          Tudo que seu
          <br />
          projeto <span className="text-white">precisa</span>
        </h2>
        <p className="text-base">Cada projeto é feito sob medida e cobre tudo abaixo.</p>
      </div>
    </Section>
  );
}
