import { useCallback, useEffect, useRef, useState } from 'react';
import type { TransitionEvent } from 'react';

const STEP_MS = 950;
export const FOCUS_SLOT = 1;

export function slotsInUse(count: number): number[] {
  if (count >= 3) return [0, 1, 2];
  if (count === 2) return [1, 2];
  return [1];
}

function initialPositions(count: number): number[] {
  const cycle = slotsInUse(count);
  const focusAt = cycle.indexOf(FOCUS_SLOT);
  return Array.from({ length: Math.min(count, 3) }, (_, i) => cycle[(focusAt - i + cycle.length) % cycle.length]);
}

export function useScreenRotation(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);
  const screens = useRef<(HTMLVideoElement | null)[]>([]);
  const cycle = useRef(slotsInUse(count));
  const positions = useRef<number[]>(initialPositions(count));
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
    screens.current.forEach((screen, i) => fit(screen, slots.current[positions.current[i]]));
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
    const order = cycle.current;
    if (order.length < 2) return;
    screens.current.forEach((screen, i) => {
      if (!screen) return;
      const from = positions.current[i];
      const to = order[(order.indexOf(from) + 1) % order.length];
      positions.current[i] = to;
      screen.dataset.pos = String(to);
      screen.classList.remove('is-entering', 'is-leaving', 'is-wrapping');
      void screen.offsetWidth;
      screen.classList.add(to === FOCUS_SLOT ? 'is-entering' : from === FOCUS_SLOT ? 'is-leaving' : 'is-wrapping');
      screen.style.zIndex = to === FOCUS_SLOT || from === FOCUS_SLOT ? '3' : '1';
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
      const order = cycle.current;
      if (busy.current) return;
      const steps = (order.indexOf(FOCUS_SLOT) - order.indexOf(positions.current[index]) + order.length) % order.length;
      if (!steps) return;
      busy.current = true;
      const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
      for (let s = 0; s < steps; s++) later(rotate, s * STEP_MS);
      later(() => (busy.current = false), steps * STEP_MS);
    },
    [rotate],
  );

  const onScreenTransitionEnd = useCallback((index: number, e: TransitionEvent<HTMLVideoElement>) => {
    if (e.propertyName === 'left') e.currentTarget.style.zIndex = depthFor(positions.current[index]);
  }, []);

  useEffect(() => {
    screens.current.forEach((screen, i) => {
      if (!screen) return;
      screen.dataset.pos = String(positions.current[i]);
      screen.style.zIndex = depthFor(positions.current[i]);
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
