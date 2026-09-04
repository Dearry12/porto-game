'use client';

import { useEffect } from 'react';

import { useNavStore } from '@/lib/nav/store';
import { ARCHETYPE_ORDER } from '@/lib/nav/machine';
import { ARCHETYPES } from '@/content/archetypes';
import { CommandFan } from './CommandFan';
import { ThreatField } from './ThreatField';
import { PartyPanel } from './PartyPanel';

/**
 * Input map per docs/MASTER_PROMPT.md §7: left/right move the field cursor,
 * up/down cycle archetype, 1-4 jump to one directly, Enter confirms. Escape
 * is handled once, globally, in components/shell/NavShell.tsx — not
 * duplicated here.
 */
export function BattleScreen() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  useEffect(() => {
    if (state.kind !== 'battle') return;

    function onKeyDown(event: KeyboardEvent) {
      if (state.kind !== 'battle') return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        dispatch({ type: 'moveCursor', delta: 1 });
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        dispatch({ type: 'moveCursor', delta: -1 });
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const i = ARCHETYPE_ORDER.indexOf(state.archetype);
        const step = event.key === 'ArrowDown' ? 1 : -1;
        const next = ARCHETYPE_ORDER[(i + step + ARCHETYPE_ORDER.length) % ARCHETYPE_ORDER.length]!;
        dispatch({ type: 'selectArchetype', id: next });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        dispatch({ type: 'confirm' });
      } else if (['1', '2', '3', '4'].includes(event.key)) {
        const id = ARCHETYPE_ORDER[Number(event.key) - 1];
        if (id) dispatch({ type: 'selectArchetype', id });
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state, dispatch]);

  if (state.kind !== 'battle') return null;

  const data = ARCHETYPES.find((a) => a.id === state.archetype);

  return (
    <div id="s-battle" className="screen on">
      <div className="b-scene">
        <div className="b-mark">
          <p className="lbl">Field</p>
          <h2>{data?.name}</h2>
        </div>
        <CommandFan active={state.archetype} />
        <ThreatField archetype={state.archetype} cursor={state.cursor} />
        <PartyPanel archetype={state.archetype} />
      </div>
      <div className="b-hints">
        <span>
          <kbd>←</kbd> <kbd>→</kbd> obstacle
        </span>
        <span>
          <kbd>↑</kbd> <kbd>↓</kbd> archetype
        </span>
        <span>
          <kbd>Enter</kbd> open
        </span>
        <button type="button" onClick={() => dispatch({ type: 'cancel' })}>
          <kbd>Esc</kbd> back to hub
        </button>
      </div>
    </div>
  );
}
