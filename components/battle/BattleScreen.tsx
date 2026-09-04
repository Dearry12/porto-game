'use client';

import { useNavStore } from '@/lib/nav/store';

/**
 * Placeholder. Command fan, threat field, sigils, and the party panel are
 * phase 5 (CLAUDE.md). This exists now so `hub -> start` and the rail's Start
 * button don't lead to a dead end while phase 3 builds the static shell
 * (architecture rule A4: a visitor can never get stuck).
 */
export function BattleScreen() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  if (state.kind !== 'battle') return null;

  return (
    <div id="s-battle" className="screen on">
      <p className="cue">Medan · {state.archetype}</p>
      <p style={{ color: 'var(--parch-dim)', maxWidth: '40ch' }}>
        Command fan dan field halangan belum dibangun — menyusul di Fase 5.
      </p>
      <div className="b-hints">
        <kbd>Esc</kbd> kembali ke hub
      </div>
      <button type="button" className="lk" onClick={() => dispatch({ type: 'cancel' })}>
        Kembali
      </button>
    </div>
  );
}
