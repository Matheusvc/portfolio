import aboutPhoto from '@/assets/images/sobre-matheus.webp';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { CONTACT, SECTION_IDS, SITE } from '@/config/site';
import { ABOUT_PARAGRAPHS, STATS } from '@/content';

export function About() {
  return (
    <Section id={SECTION_IDS.about} tone="white" aria-labelledby="about-title">
      <div className="wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-14">
        <div>
          <h2 id="about-title" className="title-sm mb-[26px]">
            <span className="text-blue md:whitespace-nowrap">Sobre mim</span>
            <br />
            <span className="text-navy md:whitespace-nowrap">Análise antes do código.</span>
          </h2>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-[18px] max-w-[520px] text-base leading-[1.6]">
              {paragraph}
            </p>
          ))}
          <Button href={CONTACT.whatsapp} external variant="blue" className="mt-3.5">
            Fale comigo
          </Button>
        </div>

        <figure className="w-full max-w-[460px] justify-self-center rounded-card-lg border border-white/[.12] bg-navy-3 px-3.5 pb-3.5 md:justify-self-end">
          <div className="flex items-center gap-1.5 px-1 py-3.5" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/35" />
            <i className="h-2 w-2 rounded-full bg-white/35" />
            <i className="h-2 w-2 rounded-full bg-white/35" />
            <span className="ml-[18px] rounded-md bg-white/[.08] px-3.5 py-1 font-mono text-[0.7rem] text-lavender">
              {CONTACT.linkedinHandle}
            </span>
          </div>
          <div className="relative px-[18px] pt-9 sm:px-[30px] sm:pt-10">
            <span
              className="hand absolute left-3.5 top-0 z-[2] flex items-start gap-0.5 text-[1.4rem]"
              aria-hidden="true"
            >
              olá
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path d="M2 4C14 2 28 8 34 24" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M27 20L34 26L37 17"
                  stroke="#FFD60A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <img
              src={aboutPhoto}
              alt={SITE.name}
              loading="lazy"
              className="aspect-[526/730] w-full rounded-[32px] bg-blue object-cover sm:rounded-[48px]"
            />
          </div>
        </figure>
      </div>

      <div className="wrap">
        <dl className="mt-14 grid grid-cols-3 border-t border-navy/[.12] md:mt-[90px]">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`pt-6 sm:pt-9 ${i > 0 ? 'border-l border-navy/[.12] pl-3 sm:pl-3.5' : ''}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="mb-3 font-display text-[clamp(1.9rem,9vw,2.4rem)] font-black leading-none text-navy sm:mb-[26px] sm:text-[clamp(2.6rem,4.4vw,3.6rem)]">
                {stat.value}
              </dd>
              <dd aria-hidden="true" className="text-[0.74rem] text-muted sm:text-[0.85rem]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
