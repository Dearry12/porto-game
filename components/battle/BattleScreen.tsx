'use client';

import { useEffect } from 'react';

import { useNavStore } from '@/lib/nav/store';
import { ARCHETYPE_ORDER } from '@/lib/nav/machine';
import { ARCHETYPES } from '@/content/archetypes';
import { CommandFan } from './CommandFan';
import { ThreatField } from './ThreatField';
import { PartyPanel } from './PartyPanel';
import { TargetingLine } from './TargetingLine';

/**
 * Input map per docs/MASTER_PROMPT.md §7: left/right move the field cursor,
 * up/down cycle archetype, 1-4 jump to one directly, Enter confirms. Escape
 * is handled once, globally, in components/shell/NavShell.tsx — not
 * duplicated here. Gamepad support (§10) mirrors the same map — D-pad/left
 * stick for cursor and archetype, A to confirm, B to cancel — and is scoped
 * to this component rather than NavShell since the requirement itself is
 * ("in the battle screen"), not site-wide.
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

  /**
   * MASTER_PROMPT.md §10: Gamepad API support. There's no button-press
   * event — the spec only offers a snapshot via getGamepads(), so this
   * polls once per frame and edge-detects each button/axis itself against
   * `held`. `held` lives in this effect's closure rather than a ref so a
   * fresh one is created every time battle is (re-)entered; the effect is
   * keyed on `state.kind`, not the full `state`, specifically so a cursor
   * or archetype change doesn't tear down and restart the poll loop mid-hold
   * (that would re-read every button as a fresh press on every dispatch).
   * Reading state through getState() inside the loop, rather than closing
   * over the `state` this render saw, is the same live-read-without-a-
   * subscription pattern components/three/FocalObject.tsx uses in useFrame.
   */
  useEffect(() => {
    if (state.kind !== 'battle') return;
    let frame: number;
    const held = { left: false, right: false, up: false, down: false, confirm: false, cancel: false };

    function poll() {
      const current = useNavStore.getState().state;
      if (current.kind !== 'battle') return;
      const pad = navigator.getGamepads().find((p) => p !== null);
      if (pad) {
        const left = pad.buttons[14]?.pressed || pad.axes[0]! < -0.5;
        const right = pad.buttons[15]?.pressed || pad.axes[0]! > 0.5;
        const up = pad.buttons[12]?.pressed || pad.axes[1]! < -0.5;
        const down = pad.buttons[13]?.pressed || pad.axes[1]! > 0.5;
        const confirm = pad.buttons[0]?.pressed ?? false;
        const cancel = pad.buttons[1]?.pressed ?? false;

        if (left && !held.left) dispatch({ type: 'moveCursor', delta: -1 });
        if (right && !held.right) dispatch({ type: 'moveCursor', delta: 1 });
        if ((up || down) && !held.up && !held.down) {
          const i = ARCHETYPE_ORDER.indexOf(current.archetype);
          const step = down ? 1 : -1;
          const next = ARCHETYPE_ORDER[(i + step + ARCHETYPE_ORDER.length) % ARCHETYPE_ORDER.length]!;
          dispatch({ type: 'selectArchetype', id: next });
        }
        if (confirm && !held.confirm) dispatch({ type: 'confirm' });
        if (cancel && !held.cancel) dispatch({ type: 'cancel' });

        Object.assign(held, { left, right, up, down, confirm, cancel });
      }
      frame = requestAnimationFrame(poll);
    }

    frame = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(frame);
  }, [state.kind, dispatch]);

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
        <TargetingLine archetype={state.archetype} cursor={state.cursor} />
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
