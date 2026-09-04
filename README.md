# Meiraldy

Personal portfolio for Derry Meiraldy. The navigation model is borrowed from the JRPG
*Metaphor: ReFantazio*: the primary verb is **select**, not **scroll**.

A visitor lands on a title screen, enters a hub built from oversized display typography,
and can either read the site as a conventional portfolio or enter a battle-styled screen
that presents four development disciplines and the real problems each one solves.

There is no combat. No HP, no turns, no way to lose.

## Why it is built this way

Everything that can be wrong lives in a pure module with zero UI-framework imports,
tested headlessly. `lib/nav/machine.ts` holds the entire navigation contract as a
`transition(state, event)` function with no imports at all; React, GSAP, and Three.js
are consumers of that module, never owners of the state.

The same shape appears in the author's other projects — `SplitEngine`, `StepOutCore`,
`LantangCore`, and `core/` in Emberfall.

## Stack

Next.js 15 (App Router, static export) · TypeScript strict · React Three Fiber ·
GSAP · Zustand · Tailwind v4 · Vitest · Vercel

## Development

```bash
npm install
npm run dev
npm run test
```

## Repository layout

| Path | Contents |
|---|---|
| `lib/nav/` | The navigation state machine. `machine.ts` imports nothing. |
| `content/` | Typed content constants. No MDX. |
| `components/` | Presentation only. `three/` is dynamically imported and removable. |
| `docs/` | Project brief, specification, and the original single-file prototype. |

Working rules for contributors and coding agents are in [CLAUDE.md](CLAUDE.md).

## Status

Phase 1 — navigation core.
