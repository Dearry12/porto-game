'use client';

import { useNavStore } from '@/lib/nav/store';
import { SECTION_ORDER } from '@/lib/nav/machine';
import type { SectionId } from '@/lib/nav/machine';

const LABELS: Record<SectionId, string> = {
  project: 'Project',
  skill: 'Skill',
  about: 'About',
  contact: 'Contact',
};

/**
 * Always visible once the title screen has been dismissed. Start is not a
 * `warp` event: the nav table has no `section -> battle` transition (only
 * `hub -> start`), so from inside a section this composes two known
 * transitions — cancel back to the hub, then start — rather than adding a
 * new edge to lib/nav/machine.ts. From the hub itself, `cancel` is a no-op
 * (the hub is the root), so the same click just does `start` there too.
 */
export function Rail() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  if (state.kind === 'title') return null;

  const currentSection = state.kind === 'section' ? state.id : null;

  return (
    <nav id="rail" aria-label="Navigasi utama">
      <button
        type="button"
        className="rail-item"
        aria-current={state.kind === 'battle' || state.kind === 'threat'}
        onClick={() => {
          dispatch({ type: 'cancel' });
          dispatch({ type: 'start' });
        }}
      >
        Start
      </button>
      {SECTION_ORDER.map((id) => (
        <button
          key={id}
          type="button"
          className="rail-item"
          aria-current={currentSection === id}
          onClick={() => dispatch({ type: 'warp', to: id })}
        >
          {LABELS[id]}
        </button>
      ))}
    </nav>
  );
}
