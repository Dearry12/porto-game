/**
 * The entire navigation contract for the site, as a pure function.
 *
 * This module imports nothing, and must keep importing nothing. It is the one
 * place where "where am I, and where can I go" is decided; React, GSAP, Three.js
 * and the browser history are all consumers of it, never owners of it. That is
 * what makes the whole navigation model testable without a DOM, and what keeps a
 * broken animation from being able to strand a visitor in an unreachable state.
 *
 * Two invariants are encoded here as constants rather than read from `content/`,
 * because they are structural decisions rather than data: there are four
 * archetypes, and each has exactly three obstacles. Growing either one is a
 * signal that the project has drifted, so it should require editing this file.
 */

export type ArchetypeId = 'mobile' | 'web' | 'software' | 'game';
export type SectionId = 'project' | 'skill' | 'about' | 'contact';

export type NavState =
  | { kind: 'title' }
  | { kind: 'hub' }
  | { kind: 'battle'; archetype: ArchetypeId; cursor: number }
  | { kind: 'threat'; archetype: ArchetypeId; threat: number }
  | { kind: 'section'; id: SectionId };

export type NavEvent =
  | { type: 'enter' }
  | { type: 'start' }
  | { type: 'warp'; to: SectionId }
  | { type: 'selectArchetype'; id: ArchetypeId }
  | { type: 'moveCursor'; delta: number }
  | { type: 'confirm' }
  | { type: 'cancel' };

export const ARCHETYPE_ORDER = ['mobile', 'web', 'software', 'game'] as const;
export const SECTION_ORDER = ['project', 'skill', 'about', 'contact'] as const;

/** Four obstacles per archetype would weaken the composition and dilute the claim. */
export const THREATS_PER_ARCHETYPE = 3;

export const INITIAL_STATE: NavState = { kind: 'title' };

/**
 * Whether arriving at this state should push a browser history entry.
 * Transient states are never history entries: a visitor pressing Back should not
 * have to walk through a title screen or an animation they have already left.
 */
export function pushesHistory(state: NavState): boolean {
  return state.kind === 'hub' || state.kind === 'section' || state.kind === 'threat';
}

function isArchetypeId(value: unknown): value is ArchetypeId {
  return (ARCHETYPE_ORDER as readonly unknown[]).includes(value);
}

function isSectionId(value: unknown): value is SectionId {
  return (SECTION_ORDER as readonly unknown[]).includes(value);
}

/**
 * Wraps a cursor into `[0, THREATS_PER_ARCHETYPE)`.
 *
 * Also repairs an index that arrived out of bounds, which happens when a state is
 * rebuilt from a URL or a restored history entry rather than from a previous
 * transition. Returning an invalid index would let the field render an obstacle
 * that does not exist, so it is corrected here rather than guarded at every
 * call site.
 */
function wrapCursor(index: number): number {
  const n = THREATS_PER_ARCHETYPE;
  return ((Math.trunc(index) % n) + n) % n;
}

/**
 * Applies an event to a state.
 *
 * Total and deterministic: every (state, event) pair has an answer and none of
 * them throw. An event that means nothing in the current state returns the exact
 * same object, so callers can skip work with a reference comparison.
 */
export function transition(state: NavState, event: NavEvent): NavState {
  switch (state.kind) {
    case 'title':
      return event.type === 'enter' ? { kind: 'hub' } : state;

    case 'hub':
      if (event.type === 'start') {
        return { kind: 'battle', archetype: ARCHETYPE_ORDER[0], cursor: 0 };
      }
      if (event.type === 'warp' && isSectionId(event.to)) {
        return { kind: 'section', id: event.to };
      }
      // The hub is the root. Cancel here has nowhere to climb to.
      return state;

    case 'battle':
      if (event.type === 'selectArchetype' && isArchetypeId(event.id)) {
        return { kind: 'battle', archetype: event.id, cursor: 0 };
      }
      if (event.type === 'moveCursor') {
        if (!Number.isFinite(event.delta) || !Number.isInteger(event.delta)) return state;
        const cursor = wrapCursor(state.cursor + event.delta);
        return cursor === state.cursor ? state : { ...state, cursor };
      }
      if (event.type === 'confirm') {
        return { kind: 'threat', archetype: state.archetype, threat: wrapCursor(state.cursor) };
      }
      if (event.type === 'cancel') {
        return { kind: 'hub' };
      }
      return state;

    case 'threat':
      // Cancel restores the field with the cursor still on the obstacle just read.
      if (event.type === 'cancel') {
        return { kind: 'battle', archetype: state.archetype, cursor: wrapCursor(state.threat) };
      }
      return state;

    case 'section':
      if (event.type === 'warp' && isSectionId(event.to)) {
        return event.to === state.id ? state : { kind: 'section', id: event.to };
      }
      if (event.type === 'cancel') {
        return { kind: 'hub' };
      }
      return state;

    default:
      return state;
  }
}
