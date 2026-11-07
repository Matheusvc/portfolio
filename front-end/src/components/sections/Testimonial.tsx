import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { TESTIMONIAL as testimonial } from '@/content';

export function Testimonial() {
  return (
    <Section tone="navy" aria-labelledby="testimonial-title">
      <div className="wrap">
        <TagHand>Depoimento.</TagHand>
        <h2 id="testimonial-title" className="title-sm mb-10 text-white sm:mb-16">
          O que dizem sobre o meu trabalho
        </h2>

        <figure className="flex max-w-[680px] flex-col justify-between gap-7 rounded-card-lg border border-white/10 bg-navy-2 px-[22px] pb-[22px] pt-7 text-white shadow-deep sm:min-h-[330px] sm:gap-10 sm:pb-[26px] sm:pl-[34px] sm:pr-[30px] sm:pt-10">
          <blockquote className="text-[1.05rem] leading-[1.4] sm:text-[1.3rem]">“{testimonial.quote}”</blockquote>
          <figcaption>
            <strong className="block text-[0.9rem] font-medium">{testimonial.author}</strong>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.06em] text-lavender">
              {testimonial.place}
            </span>
          </figcaption>
        </figure>

        <p className="hand mt-[30px] -rotate-6 text-right text-[1.4rem]">Você pode ser o próximo!</p>
      </div>
    </Section>
  );
}
