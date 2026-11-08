import { useCallback, useEffect, useRef, useState } from 'react';
import type { TransitionEvent } from 'react';

const STEP_MS = 950;
const SLOT_COUNT = 3;
export const FOCUS_SLOT = 1;

export function useScreenRotation(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);
  const screens = useRef<(HTMLVideoElement | null)[]>([]);
  const positions = useRef<number[]>(Array.from({ length: count }, (_, i) => i % SLOT_COUNT));
  const timers = useRef<number[]>([]);
  const busy = useRef(false);
  const [focused, setFocused] = useState(positions.current.indexOf(FOCUS_SLOT));

  const depthFor = (slot: number) => (slot === FOCUS_SLOT ? '3' : '1');

  const place = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const base = container.getBoundingClientRect();
    const fit = (el: HTMLElement | null, slot: HTMLElement | null) => {
      if (!el || !slot) return;
      const r = slot.getBoundingClientRect();
      el.style.left = `${r.left - base.left}px`;
      el.style.top = `${r.top - base.top}px`;
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
    };
    screens.current.forEach((img, i) => fit(img, slots.current[positions.current[i]]));
    fit(glareRef.current, slots.current[FOCUS_SLOT]);
  }, []);

  const placeWithoutAnimation = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.classList.add('is-static');
    place();
    void container.offsetWidth;
    container.classList.remove('is-static');
  }, [place]);

  const restartClass = (el: HTMLElement, className: string) => {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  };

  const rotate = useCallback(() => {
    screens.current.forEach((img, i) => {
      if (!img) return;
      const from = positions.current[i];
      const to = (from + 1) % SLOT_COUNT;
      positions.current[i] = to;
      img.dataset.pos = String(to);
      img.classList.remove('is-entering', 'is-leaving', 'is-wrapping');
      void img.offsetWidth;
      img.classList.add(to === FOCUS_SLOT ? 'is-entering' : from === FOCUS_SLOT ? 'is-leaving' : 'is-wrapping');
      img.style.zIndex = to === FOCUS_SLOT || from === FOCUS_SLOT ? '3' : '1';
    });
    place();
    if (glareRef.current) restartClass(glareRef.current, 'is-on');
    setFocused(positions.current.indexOf(FOCUS_SLOT));
  }, [place]);

  const advance = useCallback(() => {
    if (!busy.current) rotate();
  }, [rotate]);

  const focus = useCallback(
    (index: number) => {
      if (busy.current) return;
      const steps = (FOCUS_SLOT - positions.current[index] + SLOT_COUNT) % SLOT_COUNT;
      if (!steps) return;
      busy.current = true;
      rotate();
      const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
      if (steps === 2) later(rotate, STEP_MS);
      later(() => (busy.current = false), steps * STEP_MS);
    },
    [rotate],
  );

  const onScreenTransitionEnd = useCallback((index: number, e: TransitionEvent<HTMLVideoElement>) => {
    if (e.propertyName === 'left') e.currentTarget.style.zIndex = depthFor(positions.current[index]);
  }, []);

  useEffect(() => {
    screens.current.forEach((img, i) => {
      if (!img) return;
      img.dataset.pos = String(positions.current[i]);
      img.style.zIndex = depthFor(positions.current[i]);
    });
    placeWithoutAnimation();
    const pending = timers.current;
    const observer = new ResizeObserver(placeWithoutAnimation);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      pending.forEach(clearTimeout);
    };
  }, [placeWithoutAnimation]);

  return {
    containerRef,
    glareRef,
    slotRef: (slot: number) => (el: HTMLElement | null) => {
      slots.current[slot] = el;
    },
    screenRef: (index: number) => (el: HTMLVideoElement | null) => {
      screens.current[index] = el;
    },
    focused,
    focus,
    advance,
    onScreenTransitionEnd,
  };
}
