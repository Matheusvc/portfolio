import { useRef } from 'react';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { SECTION_IDS } from '@/config/site';
import { SERVICES } from '@/content';

const SCROLLER_INSET =
  'pl-5 scroll-pl-5 sm:pl-8 sm:scroll-pl-8 lg:pl-[max(40px,calc((100vw_-_1240px)/2_+_40px))] lg:scroll-pl-[max(40px,calc((100vw_-_1240px)/2_+_40px))] xl:pl-[calc((100vw_-_1400px)/2_+_40px)] xl:scroll-pl-[calc((100vw_-_1400px)/2_+_40px)] 2xl:pl-[calc((100vw_-_1640px)/2_+_40px)] 2xl:scroll-pl-[calc((100vw_-_1640px)/2_+_40px)]';

export function Services() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!scrollerRef.current || !card || !trackRef.current) return;
    const gap = parseFloat(getComputedStyle(trackRef.current).columnGap) || 0;
    scrollerRef.current.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <Section
      id={SECTION_IDS.services}
      tone="white"
      padded={false}
      aria-labelledby="services-title"
      className="pb-[100px] pt-[72px] sm:pt-[88px] md:pb-[140px] md:pt-[120px]"
    >
      <div className="wrap">
        <TagHand>Minhas especialidades.</TagHand>
        <h2 id="services-title" className="title mb-[22px] text-blue">
          O que eu construo.
        </h2>
        <div className="mb-10 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <p className="max-w-[640px] text-[0.95rem] sm:text-[1.0625rem]">
            Do entendimento do problema à implementação, combino análise de sistemas, desenvolvimento e automação para
            criar soluções digitais aplicadas a desafios reais.
          </p>
          <div className="flex gap-2.5">
            <ArrowButton direction="prev" tone="light" aria-label="Serviço anterior" onClick={() => scroll(-1)} />
            <ArrowButton direction="next" tone="outline" aria-label="Próximo serviço" onClick={() => scroll(1)} />
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={`snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${SCROLLER_INSET}`}
      >
        <div ref={trackRef} className="flex w-max gap-4 pb-2 pr-5 sm:gap-6 sm:pr-10">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="w-[min(78vw,300px)] shrink-0 snap-start rounded-card bg-soft px-4 pb-[22px] pt-3 sm:w-[280px]"
            >
              <img src={service.image} alt="" loading="lazy" className="mb-2.5 aspect-square w-full object-contain" />
              <h3 className="mb-2 text-[1.05rem] font-medium text-navy">{service.title}</h3>
              <p className="mb-[18px] min-h-[62px] text-[0.82rem] leading-[1.5] text-muted">{service.description}</p>
              <Button href={`#${SECTION_IDS.contact}`} variant="outline">
                Saiba mais
              </Button>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
