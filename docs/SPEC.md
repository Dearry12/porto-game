# JRPG Portfolio — Technical Specification

Working title: **Meiraldy** (placeholder)
Owner: Derry Meiraldy
Status: concept locked, implementation not started

---

## 1. Concept summary

A single-page portfolio whose navigation model is borrowed from *Metaphor: ReFantazio*. The visitor lands on a title screen, enters a hub built from oversized display typography, and can either scroll the site as a conventional portfolio or enter a battle-styled screen that presents four development disciplines and the real problems each one solves.

**The one-line pitch:** a portfolio where the primary verb is *select*, not *scroll*.

### Why this project is not a repeat of NULLFEED

NULLFEED is a scroll-timeline experience: scroll position drives a camera and shader uniforms. This project is a **state machine**: discrete states drive the camera, the typography, and the transitions. Different engineering problem, different failure modes, different thing to talk about in an interview.

If this distinction collapses during implementation — if scroll ends up driving everything — the project loses its reason to exist.

### Aesthetic direction

Metaphor as the full reference, for both structure and system.

The identity is **typography and paint texture**, not 3D. In every reference frame the screen is filled by oversized display serif over torn painted washes; 3D is the environment behind it. Investment must follow that order.

| Layer | Treatment |
|---|---|
| Type | Heavy high-contrast serif, oversized, rotated on a consistent diagonal, cascading and overlapping |
| Colour | Ink `#14110F`, deep indigo `#0C0F22`, parchment `#E3D9C6`, ochre `#C8973F`, rust `#8C2B24`, muted teal `#2E7C8E` |
| Texture | Torn-edge paint washes, film grain overlay, no gradients as decoration |
| Geometry | One consistent diagonal (8°) reused in every cut, wipe, and panel skew |
| Motion | Sharp and short. Wipes under 250ms. Nothing eases slowly. |

### Systems borrowed from Metaphor

Taken:
- **Archetype** — four disciplines as selectable classes
- **Archetype lineage** — each discipline shows how it grew, tied to real project history
- **Inherited skill** — one shared passive across all four: pure logic isolated from UI frameworks
- **Battle screen framing** — enemies are the real obstacles of each discipline

Rejected, with reason:
- Press-turn economy, HP/MP, formation — encode nothing about the owner
- Calendar, followers, Gauntlet Runner — add state and assets, add no information
- Any lose condition — a portfolio visitor must never be able to fail

### The battle screen

Selecting an archetype from the command fan repopulates the field with that discipline's obstacles. Clicking an obstacle transitions to a full detail page: what the problem is, the technique that beats it, and the project that proves it.

No HP, no turns, no combat resolution. One selection, one result.

---

## 2. Asset audit

The central question: what can be generated in code, and what has to be produced.

### 2.1 Covered entirely by code — no asset files

| Element | Technique | Notes |
|---|---|---|
| Torn paint washes | `feTurbulence` + `feDisplacementMap` on plain rects | Vary `seed` per screen. One filter definition serves the whole site. |
| Knockout wordmark | Two SVG `<mask>` elements producing an XOR | Text and triangle become one shape; overlap is punched out |
| Obstacle sigils | Procedural polygons from `(archetypeIndex, threatIndex)` | 12 distinct marks, one shape family, zero image files |
| Diagonal wipe | `clip-path: polygon()` animated by GSAP | Replaces the "screen shatter" idea; cheaper and more controllable |
| Shatter transition | Multiple `clip-path` shards on cloned layers | Only if the plain wipe proves too tame |
| Cascading menu | CSS custom properties per item (`--fs`, `--r`, `--i`) | Size, rotation, and indent all derive from one index |
| Paint slash behind selected item | Rect + turbulence filter + `scaleX` transform | |
| Targeting reticle | Dashed `border-radius: 50%` pseudo-element + rotate keyframe | |
| Film grain | Inline SVG `feTurbulence` as a base64 data URI | Under 300 bytes |
| Skewed status panels | `transform: skewX()` on the container, inverse skew on text | |
| 3D focal object | R3F primitive geometry, no model file | Icosahedron or similar; a `.glb` is not needed |
| Post-processing | `@react-three/postprocessing` | Chromatic aberration, vignette, noise |
| Letter-by-letter reveal | GSAP SplitText | Free since GSAP 3.13 |
| Menu SFX (option A) | Web Audio `OscillatorNode` + envelope | Synthesised blips; no audio files at all |

### 2.2 Requires produced assets

| Asset | Count | Format | Difficulty | Notes |
|---|---|---|---|---|
| **Project screenshots** | 12–18 | WebP, 1600px wide | Low effort, high value | The single most important asset group. Cannot be faked. 2–3 per project across DomPet, Patungan, StepOut, NULLFEED, Lantang, Emberfall. |
| **Display typeface** | 1 family | WOFF2 via Google Fonts | Trivial | Bodoni Moda (variable) recommended. Fraunces 900 acceptable. Self-host to avoid a render-blocking request. |
| **UI typeface** | 1 family | WOFF2 | Trivial | Archivo Narrow or Public Sans |
| **Monospace** | 1 family | WOFF2 | Trivial | JetBrains Mono, already in use elsewhere |
| **Menu SFX (option B)** | 5–6 clips | OGG + MP3, under 20KB each | Medium | Cursor move, confirm, cancel, warp, encounter start, error. Sourced from a royalty-free UI pack. Better texture than synthesis but adds files and a licence to track. |
| **OG / social card** | 1 | PNG 1200×630 | Low | Can be rendered with `next/og` at build time |
| **Favicon set** | 1 set | ICO + PNG | Low | |
| **Portrait photo** | 1 (optional) | WebP | Low | Only if the About section wants one |

### 2.3 Deliberately avoided

| Tempting asset | Why it is not needed |
|---|---|
| Illustrated enemy creatures | 12 illustrations is where this project would die. Procedural sigils solve it. |
| Painted background plates | Turbulence filters produce the same read at a fraction of the cost |
| Character art of the owner | Placing yourself in the protagonist slot overreaches; the command fan already anchors the left side |
| HDR environment map | The 3D object is unlit wireframe; no IBL required |
| Paper texture image | The grain data URI covers it |

**Summary: exactly one asset group carries real production cost, and it is screenshots of work already finished.** Everything else is code or a font file.

---

## 3. Tech stack

| Layer | Choice | Justification |
|---|---|---|
| Framework | Next.js 15, App Router, static export | Real HTML for crawlers behind the title screen. Known stack, so effort goes into interaction, not framework learning. |
| Language | TypeScript, `strict: true` | |
| 3D | React Three Fiber + drei + postprocessing | Most mature 3D ecosystem in React. Deliberately different from NULLFEED's Threlte. |
| Animation | GSAP 3.13+ with SplitText and MorphSVG | Fully free including plugins since April 2025. Timeline precision is required to sync DOM wipes with camera moves; Framer Motion cannot orchestrate across the canvas boundary. |
| State | Pure TS module wrapped by Zustand | See below |
| Styling | Tailwind v4 for layout, plain CSS modules for art direction | |
| Audio | Web Audio API, no library | Howler is unjustified for six short clips |
| Testing | Vitest | Runs against the pure nav module with no DOM |
| Hosting | Vercel | |

### Why Zustand specifically

Not preference. Inside `useFrame`, R3F components must read navigation state every frame without triggering React re-renders. `useStore.getState()` does this. React Context would re-render the component tree mid-animation.

### The R3F trap

The `<Canvas>` must live in a `'use client'` component, imported from the page via `dynamic()` with `ssr: false`. Otherwise the build fails during prerender because `window` is undefined. The error message does not point at the cause.

### Rejected alternatives

| Option | Why not |
|---|---|
| Astro | The interactive shell spans the whole page. Everything becomes one large island and Astro's advantage disappears. |
| SvelteKit + Threlte | Already used on NULLFEED. Repeating it narrows portfolio breadth for no technical gain. |
| Vite + React | No static HTML for crawlers. A real cost for a portfolio. |
| Framer Motion | Fine for component transitions, weak for cross-canvas timeline orchestration. |

---

## 4. Data model

```ts
// content/types.ts

export type ArchetypeId = 'mobile' | 'web' | 'software' | 'game';

export interface Threat {
  slug: string;              // url segment, e.g. 'tanpa-internet'
  name: string;              // display name
  level: string;             // flavour only, e.g. 'LV 32'
  tagline: string;           // one line shown on the field
  weakness: string;          // the technique that beats it
  body: string[];            // 2 paragraphs for the detail page
  proof: {
    project: string;
    kind: string;            // 'iOS' | 'Web' | 'Arsitektur' | ...
    note: string;
    href?: string;
    shots?: string[];        // paths into /public/shots
  };
}

export interface Archetype {
  id: ArchetypeId;
  name: string;              // 'Mobile development'
  short: string;             // 'Mobile' — used in the command fan
  field: string;             // subtitle under the fan label
  party: Array<[string, number]>;   // tool name, depth 0–100
  lineage: Array<{ title: string; note: string }>;
  threats: Threat[];         // exactly 3
}

export interface Project {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  repo?: string;
  live?: string;
  shots: string[];
  archetypes: ArchetypeId[]; // cross-links back to the battle screen
}

export interface SkillGroup {
  label: string;
  items: Array<[string, number]>;
}
```

`INHERITED_SKILL` is a single module-level constant, not a per-archetype field, because the whole point is that it is shared.

Content lives in typed TS files under `content/`, not MDX. There is no long-form prose here that would benefit from markdown authoring, and typed constants give compile-time safety on cross-links.

---

## 5. Navigation contract

```ts
// lib/nav/machine.ts — zero imports

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

export function transition(state: NavState, event: NavEvent): NavState;
```

Pure, deterministic, no imports. Tested with Vitest and no DOM.

### Transition table

| From | Event | To |
|---|---|---|
| title | enter | hub |
| hub | start | battle (mobile, cursor 0) |
| hub | warp | section |
| battle | selectArchetype | battle (new archetype, cursor 0) |
| battle | moveCursor | battle (cursor wraps) |
| battle | confirm | threat |
| battle | cancel | hub |
| threat | cancel | battle |
| section | warp | section |
| section | cancel | hub |

### Rules

- Every state has a route back. `Escape` climbs exactly one level.
- Transitions are interruptible. Input during a wipe jumps to the destination rather than being swallowed.
- Only `hub`, `section`, and `threat` push history entries. Transient animation is never a history entry.
- Warps are not smooth scroll. Wipe covers, jump happens underneath, wipe reveals. Under 450ms total.
- Hub and sections share one document. Manual scrolling works without touching the menu.

---

## 6. Folder structure

```
app/
  layout.tsx
  page.tsx                  server component, renders all section content as real HTML
  globals.css
components/
  shell/
    NavShell.tsx            'use client' — owns keyboard, gamepad, history
    Rail.tsx
    Wipe.tsx
    AudioToggle.tsx
  title/
    TitleScreen.tsx
    Wordmark.tsx            the XOR mask
  hub/
    Cascade.tsx
    HubMeta.tsx
  battle/
    BattleScreen.tsx
    CommandFan.tsx
    ThreatField.tsx
    Sigil.tsx               procedural
    PartyPanel.tsx
  threat/
    ThreatDetail.tsx
  sections/
    Projects.tsx  Skills.tsx  About.tsx  Contact.tsx
  three/
    Scene.tsx               'use client', dynamic import only
    FocalObject.tsx
lib/
  nav/
    machine.ts              pure
    machine.test.ts
    store.ts                zustand adaptor
  audio/
    sfx.ts
  motion/
    wipe.ts                 gsap timelines
content/
  types.ts  archetypes.ts  projects.ts  skills.ts  about.ts
public/
  shots/  fonts/  sfx/
```

`lib/nav/machine.ts` imports nothing. If an import ever appears there, the architecture has been broken.

---

## 7. Screen specification

### Title
Full viewport, no scroll. Wordmark with triangle knockout, small name beneath, horizontal rule, "Tekan tombol apa saja". 3D object drifts behind at low opacity. Any key or click advances.

`sessionStorage` records that the title has been seen; returning visitors in the same session skip straight to the hub. A permanently visible "lihat CV" link gives impatient visitors an exit.

### Hub
Five oversized words cascading down and to the right, each smaller, more indented, and rotated further than the last. Selected item gets a rust paint slash sweeping in from the left. Small skewed identity panel bottom right. Painted washes behind.

Menu items warp; they do not smooth-scroll.

### Battle
Command fan on the left, four archetypes with numbered key badges, rotated on the shared diagonal, paint splatter behind. Obstacles float at varied depths on the right, each with a name plate tied to its sigil by a thin line. Selected obstacle gets a slowly rotating dashed reticle. Party panel bottom right shows the active archetype's three main tools. Key hint bar along the bottom.

Switching archetype triggers a full exit and re-entry of the obstacle set, staggered per item. This is the most expensive animation on the site and it should be.

### Threat detail
Diagonal band header carrying discipline, level, and obstacle name. A rust-bordered "Lemah terhadap" plate naming the technique. Two paragraphs of explanation. Proof panel with the project, its stack, and screenshots. Navigation to the next obstacle without returning to the field.

### Sections
Conventional portfolio layout. Project grid, skill status groups, about prose with a facts table, contact links. These must be plain, readable, and fast — they are what a recruiter actually reads.

---

## 8. Build order

| Phase | Scope | Done when |
|---|---|---|
| 1 | `lib/nav/machine.ts` and its tests. No UI. | Every transition and every escape path is covered by a passing test |
| 2 | Content files fully populated with real copy and real numbers | No placeholder strings remain in `content/` |
| 3 | Static shell: hub, sections, rail, keyboard nav, history. No 3D, no GSAP. | Site is fully navigable and readable with JavaScript animation disabled |
| 4 | Art direction: typography, washes, wipes, cascade, GSAP timelines | Matches the reference read at a glance |
| 5 | Battle screen and threat detail | Twelve obstacles reachable, each with proof |
| 6 | 3D layer via R3F | Adds atmosphere; removing it must not break navigation |
| 7 | Audio, gamepad, reduced-motion audit, Lighthouse pass | |

Phase 3 before phase 4 is the important ordering. If the site is not navigable and readable before any animation exists, the animation is covering for a broken foundation.

---

## 9. Quality floor

- Full keyboard navigation, visible focus rings, correct `aria-pressed` and `aria-current`
- `prefers-reduced-motion` disables wipes, staggers, and the reticle spin
- Audio muted by default; toggle visible from the first screen
- Section content present in the static HTML regardless of navigation state
- Browser back and forward work across hub, sections, and threat pages
- Lighthouse performance above 90 on mobile
- Legible at 360px wide; the cascade reflows rather than overflowing

---

## 10. Open decisions

1. **Level numbers on obstacles.** Pure flavour. Keep for game texture, or cut as unearned precision?
2. **Skill percentages.** Same question, higher stakes — numbers on a portfolio invite challenge. Consider replacing with depth labels tied to evidence.
3. **Display typeface.** Bodoni Moda is closer to the reference; Fraunces is more flexible. Decide before phase 4, since type scale drives layout.
4. **SFX source.** Synthesised oscillators (zero files, thinner sound) versus a royalty-free pack (better texture, licence to track).
5. **Domain.** A custom domain is worth buying before this launches.
