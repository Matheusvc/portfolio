import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { PhysicsPile } from '@/lib/physicsPile';

const loadEngine = () => import('@/lib/physicsPile');

export function usePhysicsPile(
  triggerRef: RefObject<HTMLElement | null>,
  pileRef: RefObject<HTMLElement | null>,
  { enabled, itemSelector }: { enabled: boolean; itemSelector: string },
) {
  useEffect(() => {
    const trigger = triggerRef.current;
    const pile = pileRef.current;
    if (!enabled || !trigger || !pile) return;

    let sim: PhysicsPile | null = null;
    let starting = false;
    let visible = false;
    let disposed = false;
    let resizeTimer = 0;

    const prefetch = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        void loadEngine();
        prefetch.disconnect();
      },
      { rootMargin: '800px 0px' },
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (sim) sim.setRunning(visible);
        else if (visible && !starting) {
          starting = true;
          void loadEngine().then(({ createPhysicsPile }) => {
            if (disposed) return;
            sim = createPhysicsPile(pile, itemSelector);
            sim.setRunning(visible);
          });
        }
      },
      { threshold: 0.25 },
    );

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => sim?.resize(), 150);
    };

    prefetch.observe(trigger);
    observer.observe(trigger);
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      prefetch.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      sim?.destroy();
    };
  }, [enabled, itemSelector, pileRef, triggerRef]);
}
