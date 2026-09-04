'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { ARCHETYPES } from '@/content/archetypes';
import { useNavStore } from '@/lib/nav/store';
import type { ArchetypeId } from '@/lib/nav/machine';
import { Sigil } from './Sigil';

/** Ported verbatim from docs/prototype.html's SPOTS — three fixed field positions. */
const SPOTS = [
  { top: '16%', right: '7%', scale: 1 },
  { top: '41%', right: '34%', scale: 0.86 },
  { top: '63%', right: '9%', scale: 0.95 },
];

/**
 * Archetype switch is the most expensive animation on the site, per
 * MASTER_PROMPT.md §3 — deliberately so. DESIGN_TWIST.md §6: outgoing
 * obstacles opacity:0 / x:40, staggered 0.04s; swap data; incoming
 * opacity:1 / x:0 with expo.out, staggered 0.06s.
 *
 * React re-renders the moment `archetype` changes, which would swap the DOM
 * out from under an exit animation before it could play. `displayed` is the
 * archetype actually rendered right now; it only catches up to the real
 * `archetype` after the exit tween finishes, so there's always a DOM to
 * animate out before the new one animates in.
 */
export function ThreatField({ archetype, cursor }: { archetype: ArchetypeId; cursor: number }) {
  const dispatch = useNavStore((s) => s.dispatch);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(archetype);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (archetype === displayed) return;
    const container = containerRef.current;
    if (!container || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(archetype);
      return;
    }
    const items = Array.from(container.children) as HTMLElement[];
    // React (development, Strict Mode) mounts every effect twice — confirmed
    // live via logging: this effect ran twice on mount before ever seeing a
    // real archetype change. Without a kill here, that produces two
    // overlapping exit tweens on the same elements, and the onComplete that
    // calls setDisplayed() can lose the race and never fire, leaving the
    // field stuck mid-fade with stale data. Killing on cleanup means the
    // first invocation's tween dies before doing anything visible, and
    // whichever invocation survives runs to completion undisturbed.
    gsap.killTweensOf(items);
    const tween = gsap.to(items, {
      opacity: 0,
      x: 40,
      duration: 0.16,
      stagger: 0.04,
      ease: 'power1.in',
      onComplete: () => setDisplayed(archetype),
    });
    return () => {
      tween.kill();
    };
  }, [archetype, displayed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = Array.from(container.children) as HTMLElement[];
    gsap.killTweensOf(items);
    const tween = gsap.fromTo(
      items,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.34, stagger: 0.06, ease: 'expo.out' },
    );
    return () => {
      tween.kill();
    };
  }, [displayed]);

  const archetypeIndex = ARCHETYPES.findIndex((a) => a.id === displayed);
  const data = ARCHETYPES[archetypeIndex];
  if (!data) return null;

  return (
    <div className="b-threats" ref={containerRef}>
      {data.threats.map((threat, i) => {
        const spot = SPOTS[i] ?? SPOTS[0]!;
        return (
          <button
            key={threat.slug}
            type="button"
            className={`threat${displayed === archetype && i === cursor ? ' sel' : ''}`}
            style={{ top: spot.top, right: spot.right, transform: `scale(${spot.scale})` }}
            onClick={() => {
              dispatch({ type: 'moveCursor', delta: i - cursor });
              dispatch({ type: 'confirm' });
            }}
          >
            <span className="halo">
              <Sigil archetypeIndex={archetypeIndex} threatIndex={i} />
            </span>
            <span className="tie" />
            <span className="plate">
              <span className="nm">{threat.name}</span>
              <span className="lv">{threat.level}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
