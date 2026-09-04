'use client';

import { useEffect, type ReactNode } from 'react';

import { initHistory, useNavStore } from '@/lib/nav/store';
import { SECTION_ORDER } from '@/lib/nav/machine';
import { Rail } from './Rail';
import { TitleScreen } from '../title/TitleScreen';
import { Cascade } from '../hub/Cascade';
import { HubMeta } from '../hub/HubMeta';
import { BattleScreen } from '../battle/BattleScreen';
import { ThreatDetail } from '../threat/ThreatDetail';

/**
 * Owns global keyboard input and browser history. `children` is the static
 * section markup rendered by the server component in app/page.tsx — it stays
 * in the DOM regardless of nav state, which is what keeps view-source showing
 * real content behind the title screen (architecture rule A3).
 */
export function NavShell({ children }: { children: ReactNode }) {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  useEffect(() => initHistory(), []);

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
      <TitleScreen />
      <Rail />
      {/*
        Unconditional, like docs/prototype.html's own #hub: no 'screen' class,
        never display:none. It sits in normal flow (z-index 10) underneath the
        title screen's fixed, opaque overlay (z-index 30), so a live visitor
        sees the title first while crawlers and view-source see hub content —
        including the identity blurb in HubMeta — from the first response,
        with no dependency on client state ever reaching 'hub'.
      */}
      <div id="hub">
        <Cascade />
        <HubMeta />
      </div>
      <BattleScreen />
      <ThreatDetail />
      {children}
    </>
  );
}
