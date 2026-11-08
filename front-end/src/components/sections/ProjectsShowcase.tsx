import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import laptopFrame from '@/assets/images/laptop-frame.webp';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { TagHand } from '@/components/ui/TagHand';
import { CONTACT, SECTION_IDS } from '@/config/site';
import { SHOWCASE } from '@/content';
import { useHoverIntent } from '@/hooks/useHoverIntent';
import { useInView } from '@/hooks/useInView';
import { usePageVisible } from '@/hooks/usePageVisible';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FOCUS_SLOT, slotsInUse, useScreenRotation } from '@/hooks/useScreenRotation';
import type { ShowcaseProject } from '@/types/content';

const SIDE_SLOTS = [
  { slot: 0, position: 'md:left-0' },
  { slot: 2, position: 'md:right-0' },
];

const stepSeconds = (project: ShowcaseProject) => (project.screens.length > 1 ? 6 : 8);

function ProjectStage({ project, step, animateIn }: { project: ShowcaseProject; step: number; animateIn: boolean }) {
  const { containerRef, glareRef, slotRef, screenRef, advance, onScreenTransitionEnd } = useScreenRotation(
    project.screens.length,
  );
  const usedSlots = slotsInUse(project.screens.length);

  useEffect(() => {
    if (step > 0) advance();
  }, [step, advance]);

  return (
    <div ref={containerRef} className="relative grid w-full grid-cols-2 gap-2.5 sm:gap-4 md:block md:aspect-[727/200]">
      {SIDE_SLOTS.map(({ slot, position }) => (
        <div
          key={slot}
          className={`items-center rounded-[14px] bg-navy-3 p-[5px] shadow-[0_24px_60px_rgba(0,0,0,.3)] sm:rounded-[18px] md:absolute md:top-1/2 md:aspect-[207/148] md:w-[28.5%] md:-translate-y-1/2 md:rounded-[22px] md:p-[7px] ${position} ${
            usedSlots.includes(slot) ? 'flex w-full' : 'hidden'
          } ${animateIn ? 'card-in' : ''}`}
        >
          <div ref={slotRef(slot)} className="aspect-[21/10] w-full" />
        </div>
      ))}

      <div className="relative order-first col-span-2 w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.35)] md:absolute md:left-1/2 md:top-0 md:z-[2] md:-mt-[2%] md:w-[56%] md:-translate-x-1/2">
        <img src={laptopFrame} alt="" className="w-full" />
        <div ref={slotRef(FOCUS_SLOT)} className="absolute left-[16.375%] top-[10%] h-[72.333%] w-[67.375%]" />
      </div>

      {project.screens.slice(0, 3).map((screen, i) => (
        <img
          key={screen.image}
          ref={screenRef(i)}
          src={screen.image}
          alt={screen.alt}
          className={`screen ${animateIn ? (i === 0 ? 'screen-power-on' : 'screen-in') : ''}`}
          style={animateIn ? { animationDelay: `${i * 110}ms` } : undefined}
          onAnimationEnd={(e) => e.currentTarget.classList.remove('screen-power-on', 'screen-in')}
          onTransitionEnd={(e) => onScreenTransitionEnd(i, e)}
        />
      ))}
      <div
        ref={glareRef}
        className={`glare pointer-events-none absolute z-[4] overflow-hidden rounded-[2px] ${animateIn ? 'is-on' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
}

export function ProjectsShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hover = useHoverIntent();
  const inView = useInView(stageRef, 0.3);
  const pageVisible = usePageVisible();
  const reducedMotion = usePrefersReducedMotion();
  const paused = reducedMotion || !inView || !pageVisible || hover.active;
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [switched, setSwitched] = useState(false);
  const project = SHOWCASE[active];

  const select = (index: number) => {
    if (index === active) return;
    setActive(index);
    setStep(0);
    setSwitched(true);
  };

  const next = () => {
    if (step + 1 < project.screens.length) setStep(step + 1);
    else select((active + 1) % SHOWCASE.length);
  };

  return (
    <Section
      id={SECTION_IDS.projects}
      tone="navy"
      padded={false}
      aria-labelledby="projects-title"
      className="pb-[72px] pt-[84px] sm:pb-[88px] sm:pt-[100px] md:pb-[120px] md:pt-[140px]"
    >
      <div className="wrap flex flex-col items-center text-center">
        <TagHand tilted className="mb-[18px]">
          O que eu desenvolvo?
        </TagHand>
        <h2 id="projects-title" className="title text-center text-white">
          Meus projetos em <span className="underline-yellow">ação.</span>
        </h2>
        <p className="mb-12 max-w-[760px] text-[0.95rem] text-white sm:text-[1.0625rem] md:mb-[72px]">
          Uma seleção de sistemas, plataformas e automações desenvolvidos a partir de desafios reais.
          <br className="hidden sm:inline" /> Em cada projeto, apresento o problema, a solução construída e as
          tecnologias aplicadas.
        </p>

        <div
          ref={stageRef}
          {...hover.handlers}
          className="showcase-glow relative mb-8 w-full max-w-[1160px] md:mb-11 xl:max-w-[1320px] 2xl:max-w-[1560px]"
          style={{ '--glow': project.accent } as CSSProperties}
        >
          <ProjectStage key={project.name} project={project} step={step} animateIn={switched} />
        </div>

        <div
          role="group"
          aria-label="Escolha o projeto em destaque"
          {...hover.handlers}
          onAnimationEnd={(e) => {
            if (e.animationName === 'progress') next();
          }}
          className={`mb-11 flex w-full max-w-[360px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center ${
            paused ? 'tabs-paused' : ''
          }`}
        >
          {SHOWCASE.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={isActive}
                onClick={() => select(i)}
                style={{ '--step': `${stepSeconds(item)}s` } as CSSProperties}
                className={`lift-on-hover relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-[26px] py-[15px] text-[0.95rem] font-medium leading-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-yellow active:scale-95 active:duration-100 ${
                  isActive ? 'tab-active bg-blue text-white' : 'bg-white text-navy'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full ${isActive ? 'shadow-[0_0_0_3px_rgba(255,255,255,.9)]' : ''}`}
                  style={{ background: item.accent }}
                />
                {item.name}
                <i
                  key={isActive ? `${active}-${step}` : 'idle'}
                  aria-hidden="true"
                  className={`tab-bar absolute bottom-1.5 left-[22px] right-[22px] h-0.5 overflow-hidden rounded-sm ${isActive ? 'bg-white/25' : ''}`}
                />
              </button>
            );
          })}
        </div>

        <Button href={CONTACT.github} external>
          Ver projetos no GitHub
        </Button>
      </div>
    </Section>
  );
}
