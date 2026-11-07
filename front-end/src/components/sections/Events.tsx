import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { SECTION_IDS } from '@/config/site';
import { EVENTS } from '@/content';

export function Events() {
  return (
    <Section id={SECTION_IDS.journey} tone="white" aria-labelledby="events-title">
      <div className="wrap">
        <TagHand>Participação em eventos</TagHand>
        <h2 id="events-title" className="title-sm mb-10 text-navy">
          Eventos que geraram oportunidades
        </h2>

        <ul className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {EVENTS.map((event) => (
            <li key={event.title} className="group">
              <img
                src={event.image}
                alt={event.alt}
                loading="lazy"
                className="lift-on-hover mb-3.5 aspect-[370/245] w-full rounded-3xl object-cover object-[50%_22%] transition-transform duration-300 group-hover:scale-[1.02] sm:rounded-[34px]"
              />
              <span className="mb-1.5 block text-[0.7rem] text-[#6C70FF]">{event.tag}</span>
              <h3 className="text-[0.9rem] font-medium uppercase leading-[1.35] text-navy">{event.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
