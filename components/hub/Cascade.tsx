'use client';

import { useEffect, useState } from 'react';

import { useNavStore } from '@/lib/nav/store';
import type { NavEvent, SectionId } from '@/lib/nav/machine';

/**
 * The five hub items and their subtitles. This is nav-structural UI copy
 * (English, per CLAUDE.md's language decision), not case-study content, so
 * it lives beside the component rather than in content/ alongside
 * projects/skills/about data.
 *
 * "Eight works" was "Enam karya" ("Six works") in docs/prototype.html —
 * updated because content/projects.ts now holds eight projects, not six
 * (see docs/CONTENT.md).
 */
const ITEMS: Array<{ label: string; sub: string; event: NavEvent }> = [
  { label: 'Start', sub: 'Four fields', event: { type: 'start' } },
  { label: 'Project', sub: 'Eight works', event: { type: 'warp', to: 'project' } },
  { label: 'Skill', sub: 'Status', event: { type: 'warp', to: 'skill' } },
  { label: 'About', sub: 'History', event: { type: 'warp', to: 'about' } },
  { label: 'Contact', sub: 'Mail', event: { type: 'warp', to: 'contact' } },
];

/**
 * Cascade holds its own selection cursor (0-4). That index is UI presentation,
 * not navigation state — lib/nav/machine.ts's `hub` state has no fields at
 * all, matching the same choice already made in docs/prototype.html, where
 * `menuIdx` was a local variable outside the pure NAV table.
 */
export function Cascade() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (state.kind !== 'hub') return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCursor((c) => (c + 1) % ITEMS.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCursor((c) => (c - 1 + ITEMS.length) % ITEMS.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        dispatch(ITEMS[cursor]!.event);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.kind, cursor, dispatch]);

  const currentSection: SectionId | null = state.kind === 'section' ? state.id : null;

  return (
    <div className="cascade" role="menu">
      {ITEMS.map((item, i) => {
        const isActiveSection = item.event.type === 'warp' && item.event.to === currentSection;
        return (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            className={`menu-item${state.kind === 'hub' && i === cursor ? ' sel' : ''}`}
            aria-current={isActiveSection}
            onClick={() => dispatch(item.event)}
          >
            <span className="w">{item.label}</span>
            <span className="s">{item.sub}</span>
          </button>
        );
      })}
    </div>
  );
}
