# MASTER PROMPT — JRPG Portfolio

Give this file to Claude Code (or any implementing agent) as the primary context document. It is written to be self-sufficient: everything needed to build the project is here, including the real content. Do not invent content that is missing — ask instead.

Companion files:
- `SPEC.md` — the same decisions in reference form
- `portfolio-jrpg-prototype.html` — a working single-file prototype. Read it before writing any component. It contains the full obstacle body copy, the XOR wordmark mask, the procedural sigil function, and the turbulence filter, all of which should be ported rather than reinvented.

---

## 0. How to use this document

Work through §11 phase by phase. Do not skip ahead. Each phase has an explicit definition of done. Stop at the end of each phase and report.

Sections §1–§10 are context that applies to every phase.

---

## 1. Mission and non-negotiables

Build a personal portfolio for Derry Meiraldy, an Informatics graduate and mobile/web developer in Pontianak, Indonesia. The site presents his work through a navigation model borrowed from the JRPG *Metaphor: ReFantazio*.

### The one thing that must stay true

**The primary verb is `select`, not `scroll`.**

Camera, typography, and transitions are driven by a discrete state machine, not by scroll progress. The owner already has a scroll-driven 3D site (NULLFEED, SvelteKit + Threlte + GLSL). If this project ends up scroll-driven, it is a duplicate and has no reason to exist. Guard this in every design decision.

### Hard constraints

1. `lib/nav/machine.ts` imports nothing. Ever. If an import appears there, the architecture is broken.
2. The site must be fully navigable and readable with all animation disabled.
3. Section content must exist in the static HTML regardless of navigation state, so crawlers see it behind the title screen.
4. A visitor can never fail, lose, get stuck, or be forced to wait for an animation.
5. No third-party dependency enters without justification. The owner's standing rule: a package is admitted only if writing it would take more than a day or would be subtly wrong.

### Anti-goals

- Do not build a real combat system. No HP, no turns, no damage, no win/lose.
- Do not use scroll position to drive 3D camera movement.
- Do not add generic AI-design tells: cream background with terracotta accent, identical rounded cards with soft grey shadows, tracked-out all-caps eyebrows above every heading, `→` appended to every link.
- Do not reproduce any Atlus asset, logo, typeface, or artwork. The reference is a set of principles, not a source of files.

---

## 2. Concept

### Flow

```
title  →  hub  ──warp──→  sections (project / skill / about / contact)
            │
            └──start──→  battle  ──confirm──→  threat detail
```

- **Title.** Full viewport, no scroll. Wordmark with a triangle knockout. "Tekan tombol apa saja."
- **Hub.** Five oversized words cascading down and to the right. Four warp to sections; `Start` enters the battle screen.
- **Sections.** A conventional portfolio, in the same document as the hub. Manual scrolling works.
- **Battle.** Four archetypes in a command fan on the left. Selecting one repopulates the field with that discipline's obstacles.
- **Threat detail.** A full page per obstacle: what it is, the technique that beats it, the project that proves it.

### Systems borrowed from Metaphor

**Archetype.** The four disciplines are classes: Mobile, Website, Software, Game.

**Archetype lineage.** Each discipline shows how it grew, mapped onto real project history. Mobile went Flutter → SwiftUI → SpriteKit and Foundation Models. This is a growth story, not a skill list, and it is more persuasive than a progress bar.

**Inherited skill.** One passive shared by all four archetypes: logic that can be wrong is isolated into pure modules with zero UI-framework imports, tested headlessly. `SplitEngine`, `StepOutCore`, `LantangCore`, and `core/` in Emberfall all use this shape. This is the strongest single claim in the portfolio and the battle system exists partly to give it a stage.

**Enemies are obstacles, not creatures.** Each discipline has three real problems. Clicking one opens the answer and the evidence.

### Systems deliberately rejected

Press-turn economy, HP/MP, formation, calendar, followers, the Gauntlet Runner hub, and any lose condition. Each adds state and assets while encoding nothing about the owner.

---

## 3. Visual system

Full Metaphor direction, for both aesthetics and systems.

**The identity is typography and paint texture, not 3D.** In every reference frame, oversized display serif over torn painted washes fills the screen; 3D is the environment behind. Investment must follow that order. If the typography is timid, no shader will save it.

### Tokens

```css
--ink:        #14110F;   /* base surface, linework */
--indigo:     #1A1F3D;   /* panel, depth */
--indigo-deep:#0C0F22;   /* alternating section surface */
--parch:      #E3D9C6;   /* primary text, wordmark */
--parch-dim:  #8E8574;   /* secondary text */
--rule:       #3A342C;   /* hairlines */
--ochre:      #C8973F;   /* cursor, active state, single accent */
--rust:       #8C2B24;   /* paint slash, weakness plate */
--teal:       #2E7C8E;   /* wash only, never text */
--cut:        8deg;      /* the one diagonal, reused everywhere */
```

Reference frames use bright magenta and cyan. Those work on screen because a detailed 3D scene absorbs the contrast. On a flat web background they hurt and destroy legibility of parchment text. Rust and teal are the substitutes. Do not raise their saturation.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | Bodoni Moda (variable) or Fraunces 900 | Heavy, high contrast. Decision open, see §12. |
| UI | Archivo Narrow or Public Sans | Menu labels, plates, hints |
| Numeric | JetBrains Mono | Levels, stats, versions, years |

Display type is an active element of the composition, not a delivery vehicle. It should be large enough to overlap the paint washes.

### Geometry and motion

- One diagonal, 8°, reused in every cut, wipe, and panel skew. Consistency is what makes it read as intentional.
- Wipes: cover 220ms, jump underneath, reveal 200ms. Under 450ms total.
- Cursor movement: 120ms, sharp ease-out.
- Archetype switch is the most expensive animation on the site, and should be. Full exit and staggered re-entry of the obstacle set.
- Nothing eases slowly. Nothing fades in on scroll.

### Techniques already solved in the prototype

Port these; do not reinvent.

| Effect | Technique |
|---|---|
| Torn paint washes | `feTurbulence` + `feDisplacementMap` on plain rects, vary `seed` |
| Knockout wordmark | Two SVG masks producing an XOR of text and triangle |
| Obstacle sigils | Procedural polygons from `(archetypeIndex, threatIndex)` |
| Cascading menu | CSS custom properties `--fs`, `--r`, `--i` derived from one index |
| Paint slash | Rect + turbulence filter + `scaleX` from `transform-origin: left` |
| Reticle | Dashed circular pseudo-element with a slow rotate keyframe |
| Grain | Inline SVG turbulence as a base64 data URI, under 300 bytes |
| Diagonal wipe | `clip-path: polygon()` driven by GSAP |

---

## 4. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router, static export |
| Language | TypeScript, `strict: true` |
| 3D | React Three Fiber + `@react-three/drei` + `@react-three/postprocessing` |
| Animation | GSAP 3.13+ with SplitText and MorphSVG |
| State | Pure TS module wrapped by Zustand |
| Styling | Tailwind v4 for layout, plain CSS for art direction |
| Audio | Web Audio API, no library |
| Testing | Vitest |
| Hosting | Vercel |

### Justifications

**Next.js over Astro or Vite.** The interactive shell spans the whole page, so Astro's island model gives nothing. Vite loses static HTML for crawlers. Next also keeps the owner on known ground so effort goes into interaction rather than framework learning.

**R3F over Threlte.** Deliberately different from NULLFEED, and the React 3D ecosystem is more mature for postprocessing.

**GSAP over Framer Motion.** Timeline precision is needed to sync DOM wipes with camera moves. Framer Motion cannot orchestrate across the canvas boundary. GSAP has been fully free including all plugins since April 2025.

**Zustand for a specific reason, not preference.** Inside `useFrame`, R3F components must read navigation state every frame without triggering React re-renders. `useStore.getState()` does this. React Context would re-render the tree mid-animation.

**No Howler.** Six short clips do not justify a library.

### Known traps

1. The `<Canvas>` must live in a `'use client'` component imported via `dynamic()` with `ssr: false`. Otherwise the build fails during prerender because `window` is undefined, and the error message does not point at the cause.
2. Tailwind v4 is CSS-first. Do not add a `tailwind.config.js`; use `@theme` in CSS.
3. Do not force the XOR masks, turbulence filters, skews, or cascade variables into Tailwind utility classes. They belong in plain CSS. A three-line `className` is a failure.
4. GSAP must be registered client-side only: `gsap.registerPlugin(SplitText)` inside a `useEffect` or a client module.

---

## 5. Architecture rules

The owner applies one pattern across every project: pure logic in a headless, unit-testable module with zero UI-framework imports; the rendering layer is a pure consumer. `SplitEngine`, `StepOutCore`, `LantangCore`, `core/` in Emberfall. This project must follow it.

```
app/
  layout.tsx
  page.tsx                  server component; renders all section content as real HTML
  globals.css
components/
  shell/    NavShell.tsx  Rail.tsx  Wipe.tsx  AudioToggle.tsx
  title/    TitleScreen.tsx  Wordmark.tsx
  hub/      Cascade.tsx  HubMeta.tsx
  battle/   BattleScreen.tsx  CommandFan.tsx  ThreatField.tsx  Sigil.tsx  PartyPanel.tsx
  threat/   ThreatDetail.tsx
  sections/ Projects.tsx  Skills.tsx  About.tsx  Contact.tsx
  three/    Scene.tsx  FocalObject.tsx        // dynamic import only
lib/
  nav/      machine.ts  machine.test.ts  store.ts
  audio/    sfx.ts
  motion/   wipe.ts
content/    types.ts  archetypes.ts  projects.ts  skills.ts  about.ts
public/     shots/  fonts/  sfx/
```

Content lives in typed TS files, not MDX. There is no long-form authoring need here, and typed constants give compile-time safety on cross-links between archetypes and projects.

---

## 6. Data model

```ts
export type ArchetypeId = 'mobile' | 'web' | 'software' | 'game';
export type SectionId = 'project' | 'skill' | 'about' | 'contact';

export interface Threat {
  slug: string;
  name: string;
  level: string;
  tagline: string;
  weakness: string;
  body: string[];            // exactly 2 paragraphs
  proof: {
    project: string;
    kind: string;
    note: string;
    href?: string;
    shots?: string[];
  };
}

export interface Archetype {
  id: ArchetypeId;
  name: string;
  short: string;
  field: string;
  party: Array<[string, number]>;
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
  archetypes: ArchetypeId[];
}
```

`INHERITED_SKILL` is a single module-level constant, not a per-archetype field, because the point is that it is shared.

---

## 7. Navigation contract

```ts
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

| From | Event | To |
|---|---|---|
| title | enter | hub |
| hub | start | battle, archetype `mobile`, cursor 0 |
| hub | warp | section |
| battle | selectArchetype | battle, new archetype, cursor 0 |
| battle | moveCursor | battle, cursor wraps within bounds |
| battle | confirm | threat |
| battle | cancel | hub |
| threat | cancel | battle, cursor restored |
| section | warp | section |
| section | cancel | hub |

Rules:
- Every state has a route back. `Escape` climbs exactly one level.
- Transitions are interruptible. Input during a wipe jumps to the destination rather than being swallowed.
- Only `hub`, `section`, and `threat` push history entries. Transient animation is never a history entry.
- Warps are not smooth scroll. Wipe covers, jump happens underneath, wipe reveals.
- Unknown event on a state returns the state unchanged. Never throw.

Input map:
- Battle: `←` `→` move cursor, `↑` `↓` cycle archetype, `1`–`4` jump to archetype, `Enter` confirm, `Escape` cancel
- Hub: `↑` `↓` move cursor, `Enter` confirm
- Title: any key advances

---

## 8. Content

All content below is final and real. Do not paraphrase, embellish, or invent additions. The two-paragraph `body` for each obstacle already exists in `portfolio-jrpg-prototype.html`; lift it verbatim.

UI copy is Indonesian. Code, comments, and commit messages are English.

### Archetype: Mobile development
Short `Mobile` · field "Aplikasi iOS dan Flutter"
Party: Swift/SwiftUI 82, Flutter/Dart 76, SwiftData 68
Lineage: Flutter and Firebase (DomPet) → SwiftUI and SwiftData (Patungan) → SpriteKit and Foundation Models (StepOut, Lantang)

| Obstacle | Level | Tagline | Weakness | Proof |
|---|---|---|---|---|
| Tanpa Internet | LV 32 | Semua fitur harus tetap jalan offline | Penyimpanan lokal sebagai sumber kebenaran | Patungan |
| Struk yang Buram | LV 41 | OCR di dunia nyata tidak pernah bersih | Pipeline bertahap dengan skor keyakinan | DomPet |
| Baterai dan Memori | LV 47 | Pemrosesan bahasa tanpa menyentuh server | Ukur dulu, baru minta model bahasa bicara | Lantang |

### Archetype: Website development
Short `Website` · field "Antarmuka statis dan 3D"
Party: TypeScript 85, Next.js/React 84, Three.js/GLSL 61
Lineage: Laravel and SQLite → Next.js and Tailwind → SvelteKit, Threlte, GLSL

| Obstacle | Level | Tagline | Weakness | Proof |
|---|---|---|---|---|
| Muat Pertama | LV 28 | Berat di balik layar, instan di depan mata | Static generation dan anggaran dependensi | derrymeiraldy.vercel.app |
| Halaman yang Mati | LV 44 | Rapi, benar, dan sama sekali tak berkesan | Satu momen berani, sisanya diam | NULLFEED |
| Tumpukan Dependensi | LV 35 | Setiap paket adalah utang yang jatuh tempo | Menolak sebelum menambah | Situs Uneed Developer |

### Archetype: Software development
Short `Software` · field "Logika inti dan model data"
Party: Arsitektur modul 80, Pengujian 78, Prisma/PostgreSQL 70
Lineage: Unit testing → Prisma and PostgreSQL → Python and scikit-learn

| Obstacle | Level | Tagline | Weakness | Proof |
|---|---|---|---|---|
| Bug yang Tak Terlihat | LV 50 | Logika yang tidak pernah diuji sendirian | Modul murni tanpa import framework | Pola inti di semua proyek |
| Data yang Kusut | LV 38 | Relasi yang tumbuh tanpa rencana | Skema dulu, fitur belakangan | Sistem manajemen laundry |
| Aturan yang Berubah | LV 36 | Kebutuhan bergeser di tengah pengerjaan | Batas modul yang jelas | Jurnal Random Forest dan SVM |

### Archetype: Game development
Short `Game` · field "Peminat dengan sistem yang sudah jalan"
Party: Desain sistem 74, Godot/GDScript 66, SpriteKit 63
Lineage: Desain sistem → SpriteKit → Godot 4.5

| Obstacle | Level | Tagline | Weakness | Proof |
|---|---|---|---|---|
| Keseimbangan | LV 46 | Angka yang terasa benar tapi tak terbukti | Simulasi ribuan run, bukan firasat | StepOut |
| Acak yang Tak Terulang | LV 39 | Bug yang menghilang saat dicari | RNG berbenih yang dapat direproduksi | StepOutCore |
| Giliran yang Kacau | LV 42 | Urutan aksi yang tidak bisa diprediksi | Tick accumulator, bukan antrean ad hoc | Emberfall |

### Projects

| Project | Kind | Stack | Repo |
|---|---|---|---|
| Patungan | iOS | SwiftUI, SwiftData, Vision | github.com/Dearry12/patungan |
| StepOut | iOS | SpriteKit, Swift Package | github.com/Dearry12/StepOut |
| DomPet | Flutter | Flutter, Firebase, ML Kit | — |
| NULLFEED | Web | SvelteKit, Threlte, GLSL | — |
| Lantang | iOS | Foundation Models, Swift | github.com/Dearry12/Lantang |
| Emberfall | Godot | Godot 4.5, GDScript | — |

Summaries exist in the prototype. Lift them verbatim.

### About

Informatics graduate, Universitas Bina Sarana Informatika, Pontianak. Thesis was DomPet. Studio: Uneed Developer. Internship: Diskominfo Provinsi Kalimantan Barat. Certification: Program Analyst, BNSP. Plays guitar by ear. Building Emberfall in Godot.

Full prose exists in the prototype.

### Missing — ask, do not invent

Email address, GitHub profile URL, LinkedIn URL, and the final skill numbers. Leave `TODO` markers and report them.

---

## 9. Assets

Only one asset group carries real production cost.

**Required:** 12–18 project screenshots (WebP, 1600px wide, 2–3 per project); three font families via WOFF2, self-hosted; one OG image (can be rendered with `next/og` at build time); a favicon set.

**Optional:** five or six UI sound clips (cursor, confirm, cancel, warp, encounter, error) as OGG plus MP3, under 20KB each. The alternative is synthesising blips with `OscillatorNode`, which needs zero files but sounds thinner.

**Explicitly not needed:** enemy illustrations, painted background plates, paper texture images, `.glb` models, HDR environment maps, character art of the owner. Each is replaced by a technique listed in §3.

---

## 10. Quality floor

- Full keyboard navigation with visible focus rings; correct `aria-pressed` and `aria-current`
- Gamepad API support in the battle screen (roughly 30 lines, and worth talking about)
- `prefers-reduced-motion` disables wipes, staggers, and the reticle spin
- Audio muted by default, toggle visible from the first screen; open `AudioContext` on the first interaction at the title screen
- `sessionStorage` records that the title has been seen; returning visitors skip straight to the hub
- A "lihat CV" link visible at all times as an exit for impatient visitors
- Section content present in the static HTML regardless of navigation state
- Browser back and forward work across hub, sections, and threat pages
- Lighthouse performance above 90 on mobile
- Legible at 360px wide; the cascade reflows rather than overflowing
- On touch, "Tekan tombol apa saja" becomes a tap prompt and keyboard hints are hidden

---

## 11. Build phases

Work these in order. Report at the end of each.

### Phase 1 — Navigation core
Write `lib/nav/machine.ts` and `machine.test.ts`. No UI, no styling, no dependencies.
**Done when:** every transition in §7 and every escape path has a passing Vitest case, including unknown-event-returns-unchanged.

### Phase 2 — Content
Populate `content/` with the real copy from §8 and the prototype. Type everything against §6.
**Done when:** no placeholder strings remain except the `TODO` markers listed in §8.

### Phase 3 — Static shell
Hub, sections, rail, keyboard navigation, history integration. No 3D, no GSAP, minimal styling.
**Done when:** the site is fully navigable and readable with JavaScript animation disabled, and `view-source` shows all section content.

This ordering matters. If the site is not navigable and readable before any animation exists, the animation is covering for a broken foundation.

### Phase 4 — Art direction
Typography, paint washes, wipes, cascade, XOR wordmark, GSAP timelines.
**Done when:** a glance at the hub and title reads as the reference direction.

### Phase 5 — Battle and threat detail
Command fan, threat field, sigils, party panel, archetype switch animation, detail pages.
**Done when:** all twelve obstacles are reachable by keyboard and pointer, each with its proof panel.

### Phase 6 — 3D layer
R3F scene, focal object, postprocessing, state-driven camera.
**Done when:** it adds atmosphere and removing the whole `three/` folder does not break navigation.

### Phase 7 — Polish
Audio, gamepad, reduced-motion audit, Lighthouse, 360px check, OG image.

---

## 12. Open decisions — ask before deciding

1. **Level numbers on obstacles.** Pure flavour. Keep for game texture, or cut as unearned precision?
2. **Skill percentages.** Higher stakes. Numbers on a portfolio invite the question "based on what?" Consider replacing with evidence-tied labels such as "four shipped apps" instead of "82".
3. **Display typeface.** Bodoni Moda is closer to the reference; Fraunces is more flexible. Must be decided before Phase 4 because the type scale drives layout.
4. **SFX source.** Synthesised oscillators versus a royalty-free pack.
5. **Hub composition.** Current design places the cascade left with the 3D object behind. A bolder version puts the menu over a full-bleed 3D scene, closer to a real title screen but riskier for legibility.

---

## 13. Future direction

### After v1 ships

- **Case study pages.** Each project gets its own route with a real write-up. The battle screen currently points at projects but the projects have no depth beyond a card. This is the highest-value next addition.
- **Custom domain.** Worth buying before launch, not after.
- **Devlog.** A dated log of the build itself, written in the same visual language. Portfolios that show process outperform portfolios that show only results.
- **Gamepad and controller glyphs.** If gamepad support lands in Phase 7, showing controller prompts when a pad is connected is a small, memorable detail.
- **English toggle.** UI copy is Indonesian. An English layer widens the audience for international applications.

### Deliberately deferred

- CMS. Content is small, typed, and rarely changes. A CMS would add a dependency and a build step for no gain.
- Analytics beyond a privacy-preserving page counter.
- More archetypes. Four is the right number; five would weaken the fan composition and dilute the claim.
- Animated transitions between sections. Sections are for reading. Keep them still.

### Signals that the project has drifted

- Scroll position starts driving 3D or camera behaviour
- `lib/nav/machine.ts` acquires an import
- The obstacle count grows past three per archetype
- A visitor can reach a state with no way back
- Screenshots are still `TODO` at Phase 6
