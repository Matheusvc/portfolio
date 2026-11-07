import heroPhoto from '@/assets/images/hero-matheus.webp';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { CONTACT, SECTION_IDS, SITE } from '@/config/site';

const STACKED_ON_TINY = 'flex-1 basis-full justify-center xs:flex-none xs:basis-auto xs:justify-start';

export function Hero() {
  return (
    <Section
      id={SECTION_IDS.home}
      tone="blue"
      padded={false}
      className="grid-texture relative overflow-hidden pt-[104px] sm:pt-[120px] md:pt-[150px] short:pt-24"
    >
      <div className="wrap relative z-[1] grid grid-cols-1 items-end gap-12 md:grid-cols-[1.25fr_1fr] md:gap-8">
        <div className="md:pb-24">
          <h1 className="mb-7 font-display text-[clamp(1.8rem,9.4vw,2.5rem)] font-black uppercase leading-[1.2] tracking-[0.01em] sm:mb-10 sm:text-[clamp(2.4rem,4.6vw,4.1rem)] sm:leading-[1.22] lg:whitespace-nowrap">
            Prazer, eu me chamo
            <br />
            <span className="underline-yellow after:!-bottom-[0.22em] after:!h-[0.11em]">{SITE.name}.</span>
          </h1>
          <p className="mb-7 max-w-[560px] text-base leading-[1.5] text-white/95 sm:mb-9 sm:text-lg">
            Sou {SITE.role}. Transformo processos manuais, dados dispersos e necessidades de negócio em sistemas, APIs e
            automações que tornam operações mais organizadas, integradas e eficientes.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href={CONTACT.whatsapp} external className={STACKED_ON_TINY}>
              Fale comigo
            </Button>
            <Button href={`#${SECTION_IDS.projects}`} variant="ghost" arrow={false} className={STACKED_ON_TINY}>
              Explorar projetos
            </Button>
          </div>
        </div>

        <div className="relative min-h-[380px] self-stretch sm:min-h-[460px] md:min-h-[560px] xl:min-h-[640px] 2xl:min-h-[760px] short:min-h-[320px]">
          <svg
            viewBox="0 0 400 400"
            aria-hidden="true"
            className="absolute -right-[30px] top-0 w-[74%] text-[rgba(150,155,255,.6)] md:-right-[60px] md:w-[88%]"
          >
            <path d="M60 0H400V340H320V136L56 400L0 344L264 80H60Z" fill="currentColor" />
          </svg>
          <img
            src={heroPhoto}
            alt={SITE.name}
            className="absolute -right-9 bottom-0 h-[108%] w-auto max-w-none object-contain object-bottom sm:-right-5 sm:h-[112%] md:-right-[90px] md:h-[118%]"
          />
          <div className="absolute bottom-9 left-0 z-[2] flex flex-col items-start sm:bottom-14 md:-left-[110px] md:bottom-[60px] lg:-left-[150px]">
            <span className="hand -rotate-[8deg] text-[1.15rem] sm:text-[1.35rem]">
              Esse sou eu,
              <br />o dev por trás
              <br />
              do código
            </span>
            <svg width="70" height="44" viewBox="0 0 70 44" fill="none" aria-hidden="true" className="ml-[30px]">
              <path d="M4 4C2 24 22 38 62 34" stroke="#FFD60A" strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M54 26L64 34L54 41"
                stroke="#FFD60A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
