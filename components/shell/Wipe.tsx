'use client';

import { useEffect, useRef } from 'react';

import { useNavStore } from '@/lib/nav/store';
import { playWipe, resetWipe } from '@/lib/motion/wipe';

/**
 * Plays on every nav state change. State itself already changed instantly
 * (lib/nav/store.ts's dispatch is synchronous) by the time this effect runs,
 * so the "jump happens underneath" part of docs/MASTER_PROMPT.md §7 is
 * already true — this only supplies the cover and reveal either side of it.
 */
export function Wipe() {
  const state = useNavStore((s) => s.state);
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resetWipe(el);
      isFirstRun.current = false;
      return;
    }
    // Skip the very first run: there is nothing to cover yet on initial
    // load, only a state to arrive at. Just park it off-screen and ready.
    if (isFirstRun.current) {
      resetWipe(el);
      isFirstRun.current = false;
      return;
    }
    playWipe(el);
  }, [state]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: '-30% -10%', zIndex: 80, background: 'var(--ink)', pointerEvents: 'none' }}
    />
  );
}
