import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { CONTACT, SECTION_IDS } from '@/config/site';

const FULL_WIDTH_ON_PHONE = 'flex-1 basis-full justify-center sm:flex-none sm:basis-auto sm:justify-start';

export function Contact() {
  return (
    <Section
      id={SECTION_IDS.contact}
      tone="navy"
      padded={false}
      aria-labelledby="contact-title"
      className="pb-14 pt-16 sm:pb-[70px] sm:pt-[90px]"
    >
      <div className="wrap">
        <div className="rounded-card-lg bg-grad-blue px-5 pb-6 pt-7 text-white sm:px-[30px] sm:pb-[30px] sm:pt-9">
          <TagHand>Contato</TagHand>
          <h2
            id="contact-title"
            className="title mb-[26px] mt-1 !text-[clamp(1.25rem,6.2vw,1.6rem)] !leading-[1.35] text-white sm:!text-[clamp(1.5rem,2.6vw,2.1rem)]"
          >
            Pronto para um sistema
            <br />
            personalizado para você?
          </h2>
          <p className="mb-[18px] max-w-[460px] text-[0.9rem]">
            Se você se interessou pelos meus projetos, experiências ou pela forma como transformo desafios em soluções
            digitais, vamos conversar sobre tecnologia, inovação e novas oportunidades.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button href={CONTACT.whatsapp} external className={FULL_WIDTH_ON_PHONE}>
              Entrar em contato
            </Button>
            <Button href={CONTACT.linkedin} external variant="ghost" className={FULL_WIDTH_ON_PHONE}>
              Acessar LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
