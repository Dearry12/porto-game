/**
 * Zustand adaptor over lib/nav/machine.ts (architecture rule A6).
 *
 * This is the one place allowed to touch `window`: history and hash sync live
 * here, not in machine.ts. `dispatch` is the only way a component should
 * change navigation state; `restore` exists solely to replay a browser
 * history entry, which is a direct state assignment rather than an event the
 * pure machine understands.
 *
 * The reason this is Zustand and not React Context: inside a future R3F
 * `useFrame` (phase 6), reading state every frame via `useNavStore.getState()`
 * must not trigger a React re-render. Context would re-render the tree
 * mid-animation.
 */

import { create } from 'zustand';

import { INITIAL_STATE, pushesHistory, transition } from './machine';
import type { NavEvent, NavState } from './machine';

interface NavStore {
  state: NavState;
  dispatch: (event: NavEvent) => void;
  restore: (state: NavState) => void;
}

export const useNavStore = create<NavStore>((set, get) => ({
  state: INITIAL_STATE,
  dispatch: (event) => {
    const current = get().state;
    const next = transition(current, event);
    if (next === current) return;
    set({ state: next });
    if (typeof window !== 'undefined' && current.kind === 'title' && next.kind !== 'title') {
      markTitleSeen();
    }
    if (typeof window !== 'undefined' && pushesHistory(next)) {
      window.history.pushState(next, '', hashFor(next));
    }
  },
  restore: (state) => set({ state }),
}));

/**
 * MASTER_PROMPT.md §10: returning visitors skip straight to the hub. Scoped
 * to sessionStorage, not localStorage — this should re-arm every new tab or
 * browser session, not follow the visitor forever.
 */
const TITLE_SEEN_KEY = 'meiraldy:title-seen';

function markTitleSeen(): void {
  window.sessionStorage.setItem(TITLE_SEEN_KEY, '1');
}

function hasSeenTitle(): boolean {
  return window.sessionStorage.getItem(TITLE_SEEN_KEY) === '1';
}

function hashFor(state: NavState): string {
  switch (state.kind) {
    case 'hub':
      return '#hub';
    case 'section':
      return `#${state.id}`;
    case 'threat':
      return `#${state.archetype}-${state.threat}`;
    default:
      return '';
  }
}

/**
 * Also applies the §10 return-visitor skip before syncing history: jumping
 * straight to hub here, ahead of the replaceState below, means the URL and
 * the state end up in agreement (`#hub`, not the title's empty hash) without
 * a second history entry. The jump still runs through Wipe like any other
 * transition — restore() changes `state`, and Wipe's effect reacts to any
 * state change regardless of what triggered it — so a returning visitor
 * sees the same instant-cover-reveal language as every other jump on the
 * site, not a special-cased snap.
 *
 * Wires popstate so browser Back/Forward replays history rather than the
 * transition table. Only hub, section, and threat ever appear here — title
 * and battle are transient and were never pushed (see `pushesHistory`), so
 * Back from a threat page lands on whatever real entry came before it, not
 * on the battle screen. That is the documented behaviour in
 * docs/MASTER_PROMPT.md §7, not a bug: Escape climbs the state machine one
 * level, Back replays real history, and those are allowed to differ.
 *
 * Returns a cleanup function. Must run once, client-side only.
 */
export function initHistory(): () => void {
  if (useNavStore.getState().state.kind === 'title' && hasSeenTitle()) {
    useNavStore.getState().restore({ kind: 'hub' });
  }

  const { state } = useNavStore.getState();
  window.history.replaceState(state, '', hashFor(state));

  const onPopState = (event: PopStateEvent) => {
    const restored = event.state as NavState | null;
    useNavStore.getState().restore(restored ?? { kind: 'hub' });
  };
  window.addEventListener('popstate', onPopState);
  return () => window.removeEventListener('popstate', onPopState);
}
