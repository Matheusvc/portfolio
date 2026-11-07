import { useMemo, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';

export function useHoverIntent() {
  const [active, setActive] = useState(false);

  const handlers = useMemo(
    () => ({
      onPointerEnter: (e: PointerEvent) => {
        if (e.pointerType === 'mouse') setActive(true);
      },
      onPointerLeave: (e: PointerEvent) => {
        if (e.pointerType === 'mouse') setActive(false);
      },
      onFocus: (e: FocusEvent) => {
        if (e.target instanceof HTMLElement && e.target.matches(':focus-visible')) setActive(true);
      },
      onBlur: () => setActive(false),
    }),
    [],
  );

  return { active, handlers };
}
