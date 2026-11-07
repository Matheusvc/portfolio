import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { SECTION_IDS } from '@/config/site';
import { PROCESS } from '@/content';
import type { ProcessIcon } from '@/types/content';

const ICONS: Record<ProcessIcon, ReactNode> = {
  discovery: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  build: (
    <>
      <rect x="4" y="4" width="6" height="16" rx="1" />
      <rect x="14" y="4" width="6" height="16" rx="1" />
    </>
  ),
  launch: (
    <>
      <path d="M5 19c0-4 2-9 9-14 1 6-1 10-5 13" />
      <path d="M9 15l-4 4" />
    </>
  ),
};

export function Process() {
  return (
    <Section id={SECTION_IDS.process} tone="white" aria-labelledby="process-title">
      <div className="wrap">
        <TagHand>Minha abordagem.</TagHand>
        <h2 id="process-title" className="title-sm mb-10 text-blue">
          Entenda cada processo
        </h2>

        <ol className="mx-auto grid max-w-[560px] grid-cols-1 items-start gap-5 md:max-w-none md:grid-cols-3">
          {PROCESS.map((step, i) => {
            const first = i === 0;
            return (
              <li
                key={step.title}
                className={`lift-on-hover rounded-card px-6 pb-[30px] pt-[22px] text-white transition-transform duration-[250ms] hover:-translate-y-1 md:min-h-[230px] ${
                  first
                    ? 'bg-[linear-gradient(180deg,#0F0FFF_0%,#6A6CFF_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)]'
                    : 'bg-navy'
                }`}
              >
                <div className="mb-[26px] flex items-start justify-between">
                  <span
                    className={`grid h-[38px] w-[38px] place-items-center rounded-lg ${first ? 'bg-white text-blue' : 'bg-blue text-white'}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    >
                      {ICONS[step.icon]}
                    </svg>
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.1em] text-yellow">
                    PASSO {i + 1} DE {PROCESS.length}
                  </span>
                </div>
                <h3 className="mb-3 text-[1.3rem] font-medium">{step.title}</h3>
                <p className="text-[0.85rem] leading-[1.55] text-white/85">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button href={`#${SECTION_IDS.projects}`} variant="blue">
            Explorar projetos
          </Button>
        </div>
      </div>
    </Section>
  );
}
