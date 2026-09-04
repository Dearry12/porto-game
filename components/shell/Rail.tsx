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

/** '01' through '05', per CLAUDE.md section 3b — the measurement rule. */
function index(i: number): string {
  return String(i + 1).padStart(2, '0');
}

/**
 * Always visible once the title screen has been dismissed. Reads as a
 * drawing instrument (CLAUDE.md section 3b: monospace index per item, a
 * filled tick on the active one) rather than a decorative sidebar — but the
 * click/keyboard behaviour underneath is unchanged.
 *
 * Start is not a `warp` event: the nav table has no `section -> battle`
 * transition (only `hub -> start`), so from inside a section this composes
 * two known transitions — cancel back to the hub, then start — rather than
 * adding a new edge to lib/nav/machine.ts. From the hub itself, `cancel` is a
 * no-op (the hub is the root), so the same click just does `start` there too.
 */
export function Rail() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  if (state.kind === 'title') return null;

  const currentSection = state.kind === 'section' ? state.id : null;
  const items: Array<{ label: string; active: boolean; onClick: () => void }> = [
    {
      label: 'Start',
      active: state.kind === 'battle' || state.kind === 'threat',
      onClick: () => {
        dispatch({ type: 'cancel' });
        dispatch({ type: 'start' });
      },
    },
    ...SECTION_ORDER.map((id) => ({
      label: LABELS[id],
      active: currentSection === id,
      onClick: () => dispatch({ type: 'warp', to: id }),
    })),
  ];

  return (
    <nav id="rail" aria-label="Navigasi utama">
      <div className="rail-rule" aria-hidden="true" />
      {items.map((item, i) => (
        <button
          key={item.label}
          type="button"
          className="rail-item"
          aria-current={item.active}
          onClick={item.onClick}
        >
          <span className="rail-tick" data-filled={item.active} />
          <span className="rail-index">{index(i)}</span>
          <span className="rail-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
