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

  useEffect(() => {
    // xPercent turns into a fixed pixel offset the moment GSAP applies it,
    // sized to the element's box at that instant. Resizing the viewport
    // afterward changes that box (inset is %-based) but not the already-set
    // pixel transform, so the parked wipe can drift back into view — caught
    // live at 375px after resizing down from 1280px, where roughly the left
    // third of the screen stayed covered by a stale offset. Between
    // navigations the wipe should always be sitting off-screen anyway, so a
    // resize just re-parks it rather than trying to preserve mid-animation
    // state.
    function onResize() {
      const el = ref.current;
      if (el) resetWipe(el);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: '-30% -10%', zIndex: 80, background: 'var(--ink)', pointerEvents: 'none' }}
    />
  );
}
