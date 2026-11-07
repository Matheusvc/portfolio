import { useId, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { FAQ } from '@/content';
import type { FaqItem } from '@/types/content';

function Answer({ parts }: { parts: FaqItem['answer'] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <a
            key={i}
            href={part.href}
            {...(part.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-blue underline"
          >
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <Section tone="blue" aria-labelledby="faq-title">
      <div className="wrap grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
        <div>
          <h2 id="faq-title" className="title-md mb-4 !leading-[1.25]">
            <span className="text-white">O que você</span>
            <br />
            <span className="text-lavender">precisa saber.</span>
          </h2>
          <p className="mb-3 text-[0.9rem] text-white/90">
            Informações rápidas sobre minha atuação, experiências e projetos.
          </p>
          <TagHand>Perguntas frequentes.</TagHand>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            const answerId = `${baseId}-answer-${i}`;
            return (
              <div
                key={item.question}
                className={`rounded-2xl transition-colors ${isOpen ? 'bg-[#ECECFF]' : 'bg-soft'}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-3.5 pl-[18px] pr-3 text-left text-[0.95rem] text-navy sm:pl-[22px] sm:pr-3.5 sm:text-base"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className={`grid h-[26px] w-[26px] shrink-0 place-items-center rounded-md bg-blue text-[1.1rem] leading-none text-white transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-[max-height] duration-[350ms] ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}
                >
                  <p className="px-[22px] pb-[18px] text-[0.9rem] text-muted">
                    <Answer parts={item.answer} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
