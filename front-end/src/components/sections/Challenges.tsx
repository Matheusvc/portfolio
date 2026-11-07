import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { CHALLENGES } from '@/content';

export function Challenges() {
  return (
    <Section tone="white" aria-labelledby="challenges-title">
      <div className="wrap grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="challenges-title" className="title-md mb-[18px]">
            <span className="text-blue">Desafios que</span>
            <br />
            <span className="text-navy">viram soluções.</span>
          </h2>
          <p className="mb-[18px] max-w-[440px] text-[0.95rem] sm:text-base">
            É nesses cenários que aplico análise de sistemas e desenvolvimento para transformar processos soltos em
            soluções digitais mais organizadas, integradas e fáceis de acompanhar.
          </p>
          <TagHand>Problemas que me desafiam.</TagHand>
        </div>

        <div className="rotate-[0.6deg] overflow-hidden rounded-card bg-paper shadow-soft">
          <div className="h-[38px] border-b-2 border-dashed border-navy/15 bg-yellow" aria-hidden="true" />
          <ul className="notepad-list relative pb-4 pl-[62px] pr-[18px] pt-2 sm:pb-[22px] sm:pl-[90px] sm:pr-9 sm:pt-3.5">
            {CHALLENGES.map((item) => (
              <li
                key={item}
                className="relative border-b border-navy/10 py-[15px] text-[0.92rem] text-navy last:border-b-0 sm:py-[18px] sm:text-[0.98rem]"
              >
                <span
                  className="notepad-x absolute -left-[42px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 sm:-left-[58px]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
