import { describe, expect, it } from 'vitest';

import {
  ARCHETYPE_ORDER,
  INITIAL_STATE,
  SECTION_ORDER,
  THREATS_PER_ARCHETYPE,
  pushesHistory,
  transition,
} from './machine';
import type { NavEvent, NavState } from './machine';

const title: NavState = { kind: 'title' };
const hub: NavState = { kind: 'hub' };
const battle = (archetype = 'mobile', cursor = 0): NavState =>
  ({ kind: 'battle', archetype, cursor }) as NavState;
const threat = (archetype = 'mobile', index = 0): NavState =>
  ({ kind: 'threat', archetype, threat: index }) as NavState;
const section = (id = 'project'): NavState => ({ kind: 'section', id }) as NavState;

/** Every event shape, used to prove exhaustively that no state ever throws. */
const ALL_EVENTS: NavEvent[] = [
  { type: 'enter' },
  { type: 'start' },
  { type: 'warp', to: 'project' },
  { type: 'selectArchetype', id: 'web' },
  { type: 'moveCursor', delta: 1 },
  { type: 'confirm' },
  { type: 'cancel' },
];

const ALL_STATES: NavState[] = [
  title,
  hub,
  battle('game', 2),
  threat('software', 1),
  section('about'),
];

describe('invariants', () => {
  it('starts at the title screen', () => {
    expect(INITIAL_STATE).toEqual({ kind: 'title' });
  });

  it('keeps four archetypes and four sections', () => {
    expect(ARCHETYPE_ORDER).toEqual(['mobile', 'web', 'software', 'game']);
    expect(SECTION_ORDER).toEqual(['project', 'skill', 'about', 'contact']);
  });

  it('keeps exactly three obstacles per archetype', () => {
    expect(THREATS_PER_ARCHETYPE).toBe(3);
  });

  it('never throws, for any state and any event', () => {
    for (const state of ALL_STATES) {
      for (const event of ALL_EVENTS) {
        expect(() => transition(state, event)).not.toThrow();
      }
    }
  });

  it('never returns a battle or threat cursor outside its bounds', () => {
    for (const state of ALL_STATES) {
      for (const event of ALL_EVENTS) {
        const next = transition(state, event);
        if (next.kind === 'battle') {
          expect(next.cursor).toBeGreaterThanOrEqual(0);
          expect(next.cursor).toBeLessThan(THREATS_PER_ARCHETYPE);
        }
        if (next.kind === 'threat') {
          expect(next.threat).toBeGreaterThanOrEqual(0);
          expect(next.threat).toBeLessThan(THREATS_PER_ARCHETYPE);
        }
      }
    }
  });

  it('returns the state unchanged on an unknown event', () => {
    const bogus = { type: 'levelUp' } as unknown as NavEvent;
    for (const state of ALL_STATES) {
      expect(transition(state, bogus)).toBe(state);
    }
  });

  it('returns the identical object when nothing changes, so consumers can compare by reference', () => {
    expect(transition(hub, { type: 'cancel' })).toBe(hub);
    expect(transition(title, { type: 'confirm' })).toBe(title);
  });
});

describe('title', () => {
  it('advances to the hub on enter', () => {
    expect(transition(title, { type: 'enter' })).toEqual({ kind: 'hub' });
  });

  it('ignores every other event', () => {
    for (const event of ALL_EVENTS) {
      if (event.type === 'enter') continue;
      expect(transition(title, event)).toBe(title);
    }
  });
});

describe('hub', () => {
  it('starts the battle at the first archetype, cursor 0', () => {
    expect(transition(hub, { type: 'start' })).toEqual({
      kind: 'battle',
      archetype: 'mobile',
      cursor: 0,
    });
  });

  it('warps to a section', () => {
    expect(transition(hub, { type: 'warp', to: 'contact' })).toEqual({
      kind: 'section',
      id: 'contact',
    });
  });

  it('rejects a warp to an unknown section', () => {
    const event = { type: 'warp', to: 'shop' } as unknown as NavEvent;
    expect(transition(hub, event)).toBe(hub);
  });

  it('is the root: cancel goes nowhere', () => {
    expect(transition(hub, { type: 'cancel' })).toBe(hub);
  });
});

describe('battle', () => {
  it('switches archetype and resets the cursor', () => {
    expect(transition(battle('mobile', 2), { type: 'selectArchetype', id: 'game' })).toEqual({
      kind: 'battle',
      archetype: 'game',
      cursor: 0,
    });
  });

  it('resets the cursor even when reselecting the current archetype', () => {
    expect(transition(battle('web', 2), { type: 'selectArchetype', id: 'web' })).toEqual({
      kind: 'battle',
      archetype: 'web',
      cursor: 0,
    });
  });

  it('rejects an unknown archetype', () => {
    const state = battle('mobile', 1);
    const event = { type: 'selectArchetype', id: 'backend' } as unknown as NavEvent;
    expect(transition(state, event)).toBe(state);
  });

  it('moves the cursor forward', () => {
    expect(transition(battle('mobile', 0), { type: 'moveCursor', delta: 1 })).toEqual(
      battle('mobile', 1),
    );
  });

  it('wraps past the last obstacle', () => {
    expect(transition(battle('mobile', 2), { type: 'moveCursor', delta: 1 })).toEqual(
      battle('mobile', 0),
    );
  });

  it('wraps below the first obstacle', () => {
    expect(transition(battle('mobile', 0), { type: 'moveCursor', delta: -1 })).toEqual(
      battle('mobile', 2),
    );
  });

  it('wraps a delta larger than the obstacle count', () => {
    expect(transition(battle('mobile', 0), { type: 'moveCursor', delta: 7 })).toEqual(
      battle('mobile', 1),
    );
    expect(transition(battle('mobile', 0), { type: 'moveCursor', delta: -7 })).toEqual(
      battle('mobile', 2),
    );
  });

  it('treats a zero delta as a no-op', () => {
    const state = battle('mobile', 1);
    expect(transition(state, { type: 'moveCursor', delta: 0 })).toBe(state);
  });

  it('ignores a delta that is not a whole number', () => {
    const state = battle('mobile', 1);
    for (const delta of [0.5, NaN, Infinity, -Infinity]) {
      expect(transition(state, { type: 'moveCursor', delta })).toBe(state);
    }
  });

  it('repairs a cursor that arrived out of bounds, e.g. from a restored history entry', () => {
    expect(transition(battle('mobile', 9), { type: 'moveCursor', delta: 1 })).toEqual(
      battle('mobile', 1),
    );
    expect(transition(battle('mobile', -4), { type: 'confirm' })).toEqual(threat('mobile', 2));
  });

  it('confirms into the obstacle under the cursor', () => {
    expect(transition(battle('game', 2), { type: 'confirm' })).toEqual(threat('game', 2));
  });

  it('cancels back to the hub', () => {
    expect(transition(battle('web', 1), { type: 'cancel' })).toEqual({ kind: 'hub' });
  });

  it('ignores enter and start', () => {
    const state = battle('web', 1);
    expect(transition(state, { type: 'enter' })).toBe(state);
    expect(transition(state, { type: 'start' })).toBe(state);
  });
});

describe('threat', () => {
  it('cancels back to the battle with the cursor restored to the obstacle just read', () => {
    expect(transition(threat('software', 2), { type: 'cancel' })).toEqual(battle('software', 2));
  });

  it('is reachable and returnable for all twelve obstacles', () => {
    for (const archetype of ARCHETYPE_ORDER) {
      for (let i = 0; i < THREATS_PER_ARCHETYPE; i += 1) {
        const opened = transition(battle(archetype, i), { type: 'confirm' });
        expect(opened).toEqual(threat(archetype, i));
        expect(transition(opened, { type: 'cancel' })).toEqual(battle(archetype, i));
      }
    }
  });

  it('ignores confirm, so a double press cannot bury the visitor a level deeper', () => {
    const state = threat('mobile', 0);
    expect(transition(state, { type: 'confirm' })).toBe(state);
  });
});

describe('section', () => {
  it('warps to another section', () => {
    expect(transition(section('project'), { type: 'warp', to: 'about' })).toEqual(
      section('about'),
    );
  });

  it('returns the same object when warping to the section already open', () => {
    const state = section('skill');
    expect(transition(state, { type: 'warp', to: 'skill' })).toBe(state);
  });

  it('cancels back to the hub', () => {
    expect(transition(section('contact'), { type: 'cancel' })).toEqual({ kind: 'hub' });
  });

  // OPEN QUESTION, decide before phase 3.
  // The transition table in the brief has no section -> start row, so start is
  // ignored here. But the rail carries a Start item and the rail is visible in
  // sections, which would leave a live button doing nothing. Either the rail
  // routes through cancel-then-start, or this becomes a real transition.
  it('ignores start, because the brief lists no section -> battle transition', () => {
    const state = section('project');
    expect(transition(state, { type: 'start' })).toBe(state);
  });
});

describe('escape climbs exactly one level, from anywhere', () => {
  it('walks threat -> battle -> hub and stops', () => {
    let state: NavState = threat('game', 1);
    state = transition(state, { type: 'cancel' });
    expect(state).toEqual(battle('game', 1));
    state = transition(state, { type: 'cancel' });
    expect(state).toEqual({ kind: 'hub' });
    expect(transition(state, { type: 'cancel' })).toEqual({ kind: 'hub' });
  });

  it('walks section -> hub and stops', () => {
    const state = transition(section('about'), { type: 'cancel' });
    expect(state).toEqual({ kind: 'hub' });
    expect(transition(state, { type: 'cancel' })).toEqual({ kind: 'hub' });
  });

  it('leaves no state without a route back to the hub', () => {
    for (const state of ALL_STATES) {
      let current = state;
      for (let step = 0; step < 4 && current.kind !== 'hub'; step += 1) {
        const next = transition(current, current.kind === 'title' ? { type: 'enter' } : { type: 'cancel' });
        expect(next).not.toBe(current);
        current = next;
      }
      expect(current.kind).toBe('hub');
    }
  });
});

describe('history', () => {
  it('records hub, section, and threat', () => {
    expect(pushesHistory(hub)).toBe(true);
    expect(pushesHistory(section('project'))).toBe(true);
    expect(pushesHistory(threat('mobile', 0))).toBe(true);
  });

  it('does not record title or battle, which are transient', () => {
    expect(pushesHistory(title)).toBe(false);
    expect(pushesHistory(battle('mobile', 0))).toBe(false);
  });
});
