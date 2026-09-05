'use client';

import { useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { initHistory, useNavStore } from '@/lib/nav/store';
import { SECTION_ORDER } from '@/lib/nav/machine';
import { Rail } from './Rail';
import { InkField } from './InkField';
import { Wipe } from './Wipe';
import { TitleScreen } from '../title/TitleScreen';
import { Cascade } from '../hub/Cascade';
import { HubMeta } from '../hub/HubMeta';
import { BattleScreen } from '../battle/BattleScreen';
import { ThreatDetail } from '../threat/ThreatDetail';

/**
 * The known R3F trap (CLAUDE.md): <Canvas> must be dynamically imported with
 * ssr: false, or the build fails during prerender because `window` is
 * undefined inside three.js — and the error message doesn't point at this
 * as the cause. Loaded here, once, globally; components/three/Scene.tsx
 * itself stays a plain 'use client' component with no dynamic-import
 * awareness of its own.
 */
const Scene = dynamic(() => import('../three/Scene').then((m) => m.Scene), { ssr: false });

/**
 * Owns global keyboard input and browser history. `children` is the static
 * section markup rendered by the server component in app/page.tsx — it stays
 * in the DOM regardless of nav state, which is what keeps view-source showing
 * real content behind the title screen (architecture rule A3).
 */
export function NavShell({ children }: { children: ReactNode }) {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => initHistory(), []);

  /**
   * Lighthouse mobile scored 52 with the 3D layer always mounted — traced
   * to three.js's own bundle cost (a ~380KB chunk, most of it unused by
   * this scene) plus R3F's continuous per-frame render loop, both landing
   * squarely in the load window Lighthouse measures. Confirmed by an A/B
   * build with <Scene /> removed entirely: score jumped to 92, total
   * blocking time from 1130ms to 0. #rail's own breakpoint (700px) is
   * reused here rather than picking a new number — mobile already gets a
   * simplified layout everywhere else in this codebase, and 701px is where
   * `next/dynamic`'s lazy import for Scene actually fires, since it's never
   * rendered below that width: no request for the chunk at all, not just a
   * hidden one.
   */
  useEffect(() => {
    const mql = matchMedia('(min-width: 701px)');
    setIsDesktop(mql.matches);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      'nav-locked',
      state.kind === 'title' || state.kind === 'battle' || state.kind === 'threat',
    );
  }, [state.kind]);

  useEffect(() => {
    if (state.kind !== 'section') return;
    // Per docs/MASTER_PROMPT.md §7: "Warps are not smooth scroll." An instant
    // jump stands in for the wipe-cover/jump/wipe-reveal sequence, which is
    // phase 4 (GSAP) work — the underlying jump has to exist regardless of
    // what covers it.
    document.getElementById(state.id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
  }, [state]);

  useEffect(() => {
    if (state.kind === 'hub') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [state.kind]);

  useEffect(() => {
    // Manual scrolling keeps the rail's aria-current honest without a click
    // or keypress — ported from docs/prototype.html's own scroll listener
    // (last section whose top has crossed 45% of the viewport wins; none
    // crossed means the visitor is still above Project, back in the hub).
    // This calls `restore` directly, never `dispatch` — a scroll tick is not
    // a nav event, and routing it through the machine would push a history
    // entry on every section the visitor scrolls past.
    if (state.kind !== 'hub' && state.kind !== 'section') return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let active: (typeof SECTION_ORDER)[number] | null = null;
        for (const id of SECTION_ORDER) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) active = id;
        }
        const current = useNavStore.getState().state;
        if (active) {
          if (current.kind === 'section' && current.id === active) return;
          useNavStore.getState().restore({ kind: 'section', id: active });
        } else if (current.kind === 'section') {
          useNavStore.getState().restore({ kind: 'hub' });
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [state.kind]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (state.kind === 'title') {
        event.preventDefault();
        dispatch({ type: 'enter' });
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch({ type: 'cancel' });
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.kind, dispatch]);

  return (
    <>
      {/*
        z-index 1: above the plain body background, below every screen
        (z-index 30) and #hub/main (z-index 10). #s-title's own background
        is transparent specifically so this shows through it — DESIGN_TWIST.md
        §6 wants the object visible behind the title wordmark, not hidden by
        an opaque screen backdrop. Gated to isDesktop — see the effect above
        for why mobile skips it entirely rather than just hiding it.
      */}
      {isDesktop && <Scene />}
      <TitleScreen />
      <Rail />
      {/*
        Unconditional, like docs/prototype.html's own #hub: no 'screen'
        class, never display:none — the markup and text are always in the
        DOM, so crawlers and view-source see hub content (including the
        identity blurb in HubMeta) regardless of client state.
        #s-title's background is transparent so Scene's canvas (z-index 1)
        shows through it, but #hub sits between them in z-index (10, versus
        Scene's 1 and title's 30) — with title transparent, #hub's own
        content would otherwise paint right over Scene and visibly bleed
        through the title screen wherever the wordmark doesn't cover it
        (caught live: the cascade text ghosting behind "MEIRALDY"). Only
        `visibility`, not `display`, is toggled: it stops the live paint
        without removing the text a screen reader or crawler would still
        encounter in the underlying HTML.
      */}
      <div id="hub" style={{ visibility: state.kind === 'title' ? 'hidden' : 'visible' }}>
        <InkField seed={5} />
        <Cascade />
        <HubMeta />
      </div>
      <BattleScreen />
      <ThreatDetail />
      {children}
      <Wipe />
    </>
  );
}
