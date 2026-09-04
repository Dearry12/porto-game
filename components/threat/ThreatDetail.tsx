'use client';

import { useNavStore } from '@/lib/nav/store';
import { ARCHETYPES } from '@/content/archetypes';

/**
 * Placeholder — same reasoning as components/battle/BattleScreen.tsx. The
 * nav machine can already reach `threat` states (confirmed by
 * lib/nav/machine.test.ts), this just doesn't have real presentation yet.
 * It reads real content, though, since content/archetypes.ts already has all
 * twelve obstacles verbatim from phase 2.
 */
export function ThreatDetail() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  if (state.kind !== 'threat') return null;

  const archetype = ARCHETYPES.find((a) => a.id === state.archetype);
  const threat = archetype?.threats[state.threat];

  return (
    <div id="s-threat" className="screen on">
      {threat ? (
        <>
          <p className="cue">
            {archetype?.name} · {threat.level}
          </p>
          <h2 className="wm" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            {threat.name}
          </h2>
          <p style={{ color: 'var(--rust)' }}>Lemah terhadap: {threat.weakness}</p>
        </>
      ) : (
        <p>Halangan tidak ditemukan.</p>
      )}
      <p style={{ color: 'var(--parch-dim)', maxWidth: '40ch' }}>
        Layout penuh (body, panel bukti) belum dibangun — menyusul di Fase 5.
      </p>
      <button type="button" className="lk" onClick={() => dispatch({ type: 'cancel' })}>
        Kembali
      </button>
    </div>
  );
}
