/**
 * The four battle archetypes, per docs/MASTER_PROMPT.md §8, translated from
 * the Indonesian source — see CLAUDE.md's Konten section for the language
 * decision. Obstacle names, taglines, weaknesses, and body copy trace back
 * to the ARCH data in docs/prototype.html by way of a faithful English
 * translation, not a rewrite; every technical claim (numbers, method names,
 * project names) carries the same meaning as the Indonesian original.
 *
 * `slug` values are now English kebab-case to match — nothing in the
 * codebase looks threats up by slug yet (ThreatDetail.tsx indexes by array
 * position), so renaming them here has no functional effect.
 *
 * `party` counts: computed by counting, per archetype, how many of the
 * projects in content/projects.ts that are cross-linked to that archetype
 * list the tool in their `stack`. content/projects.ts now holds eight
 * projects (docs/CONTENT.md), but only six carry an archetype cross-link —
 * Pivot and HeatNest Tech are real, verified work but aren't named as proof
 * of any of the twelve obstacles below, so they don't move these counts.
 * These numbers still only know about the six cross-linked projects, not
 * other real work (e.g. the Uneed Developer site, the laundry management
 * system) that has no project card at all. Several counts below are 0 or 1
 * as a result, which understates real usage, most visibly for "Module
 * architecture" — the inherited-skill pattern is the strongest claim in the
 * whole portfolio and spans every project, not zero. Treat these as
 * provisional and confirm the real per-tool project counts before this
 * renders in Phase 4/5.
 *
 * `lineage` notes: only the mobile archetype's lineage in the master prompt
 * names a project per stage ("(DomPet)", "(Patungan)", "(StepOut, Lantang)").
 * The other three archetypes' lineage lines are a bare arrow-chain with no
 * per-stage project name, so their `note` is left as an empty string rather
 * than guessing which project belongs to which stage.
 */

import type { Archetype } from './types';

export const INHERITED_SKILL = {
  // Reused verbatim from the "The Invisible Bug" threat below, so this
  // shared passive isn't a new sentence invented for this constant.
  name: 'Pure modules with no framework imports',
  note: "SplitEngine, StepOutCore, LantangCore, and Emberfall's core/ all use the same shape.",
};

export const ARCHETYPES: Archetype[] = [
  {
    id: 'mobile',
    name: 'Mobile development',
    short: 'Mobile',
    field: 'iOS and Flutter apps',
    party: [
      ['Swift, SwiftUI', 2],
      ['Flutter, Dart', 1],
      ['SwiftData', 1],
    ],
    lineage: [
      { title: 'Flutter and Firebase', note: 'DomPet' },
      { title: 'SwiftUI and SwiftData', note: 'Patungan' },
      { title: 'SpriteKit and Foundation Models', note: 'StepOut, Lantang' },
    ],
    threats: [
      {
        slug: 'offline-first',
        name: 'No Internet',
        level: 'LV 32',
        tagline: 'Every feature has to keep working offline',
        weakness: 'Local storage as the source of truth',
        body: [
          'Finance apps get used exactly when signal is bad: at the register, in a parking lot, at a corner shop. If the data lives on a server, the app dies along with the connection.',
          'In Patungan I made local storage the single source of truth, not a cache. SwiftData holds the entire state, and no code path waits on the network before showing something. Syncing, if it exists, is an extra layer on top, not a requirement.',
        ],
        proof: {
          project: 'Patungan',
          kind: 'iOS',
          note: 'Four pure Swift engines with zero third-party dependencies. Largest-remainder splitting and debt simplification both run entirely on-device.',
        },
      },
      {
        slug: 'blurry-receipts',
        name: 'Blurry Receipts',
        level: 'LV 41',
        tagline: 'Real-world OCR is never clean',
        weakness: 'A staged pipeline with confidence scoring',
        body: [
          "Real receipts are folded, blurry, and printed with ink that's nearly out. A text-recognition model that looks great on a benchmark will fail under these conditions.",
          "The fix isn't a bigger model, it's a pipeline that admits uncertainty. Image preprocessing, text extraction, then rule-based parsing that assigns a confidence score per line. Low-scoring lines get handed back to the user for correction, instead of being silently stored as wrong data.",
        ],
        proof: {
          project: 'DomPet',
          kind: 'Flutter',
          note: '83.33% accuracy across 30 real receipts, 88.22% acceptance-test score, 85 unit tests.',
        },
      },
      {
        slug: 'battery-and-memory',
        name: 'Battery and Memory',
        level: 'LV 47',
        tagline: 'Language processing without touching a server',
        weakness: 'Measure first, only then let the language model speak',
        body: [
          'Running a language model on a phone is expensive. If every assessment calls the model, the battery drains and results stop being consistent between attempts.',
          'In Lantang I split it into three layers. The first layer measures deterministically: filler-word density, pause taxonomy, speaking rate in syllables per second. The second layer picks which findings are worth surfacing, by formula, not by model. The language model only enters at the third layer, purely to phrase the sentence. The numbers are always the same for the same recording.',
        ],
        proof: {
          project: 'Lantang',
          kind: 'iOS',
          note: 'On-device Foundation Models, LantangCore as a headless Swift Package with 11 unit tests.',
        },
      },
    ],
  },
  {
    id: 'web',
    name: 'Website development',
    short: 'Website',
    field: 'Static interfaces and 3D',
    party: [
      ['TypeScript', 0],
      ['Next.js, React', 0],
      ['Three.js, GLSL', 1],
    ],
    lineage: [
      { title: 'Laravel and SQLite', note: '' },
      { title: 'Next.js and Tailwind', note: '' },
      { title: 'SvelteKit, Threlte, GLSL', note: '' },
    ],
    threats: [
      {
        slug: 'first-load',
        name: 'First Load',
        level: 'LV 28',
        tagline: 'Heavy behind the scenes, instant to the eye',
        weakness: 'Static generation and a dependency budget',
        body: [
          "A page that takes three seconds to appear has already lost before anyone reads it. And the most common cause isn't images, it's JavaScript shipped for something that was actually static.",
          "My approach: generate HTML at build time, ship JavaScript only for what's genuinely interactive, and treat every dependency as debt that has to justify itself. My portfolio runs without a single animation library because CSS is already enough.",
        ],
        proof: {
          project: 'derrymeiraldy.vercel.app',
          kind: 'Web',
          note: 'Next.js App Router, strict TypeScript, Tailwind v4, static generation on Vercel.',
        },
      },
      {
        slug: 'the-dead-page',
        name: 'The Dead Page',
        level: 'LV 44',
        tagline: 'Tidy, correct, and completely forgettable',
        weakness: 'One bold moment, stillness everywhere else',
        body: [
          "A lot of portfolios are technically correct but leave nothing behind in anyone's head. The problem usually isn't too few effects, it's too many: every section has its own entrance animation, and nothing stands out.",
          "In NULLFEED I spent all the boldness in one place. One object, one uniform called corruption driving the distortion, and the entire rest of the page stays still around it. What makes it work isn't the number of effects, it's the decision about what doesn't get animated.",
        ],
        proof: {
          project: 'NULLFEED',
          kind: 'Web',
          note: 'SvelteKit with Svelte 5 runes, Threlte, a hand-written GLSL shader, GSAP ScrollTrigger, post-processing.',
        },
      },
      {
        slug: 'the-dependency-pile',
        name: 'The Dependency Pile',
        level: 'LV 35',
        tagline: 'Every package is debt that comes due',
        weakness: 'Say no before you add',
        body: [
          'Web projects bloat easily. One date library, one icon library, one animation library, and suddenly security updates become a weekly chore.',
          "My rule is simple: a package gets in only if writing it myself would take more than a day, or would risk being subtly wrong. Date formatting doesn't clear that bar. A post-processing shader does.",
        ],
        proof: {
          project: 'Uneed Developer site',
          kind: 'Web',
          note: 'Next.js 15, React 19, Tailwind v4, Prisma with PostgreSQL, NextAuth.js.',
        },
      },
    ],
  },
  {
    id: 'software',
    name: 'Software development',
    short: 'Software',
    field: 'Core logic and data models',
    party: [
      ['Module architecture', 0],
      ['Testing', 0],
      ['Prisma, PostgreSQL', 0],
    ],
    lineage: [
      { title: 'Unit testing', note: '' },
      { title: 'Prisma and PostgreSQL', note: '' },
      { title: 'Python and scikit-learn', note: '' },
    ],
    threats: [
      {
        slug: 'the-invisible-bug',
        name: 'The Invisible Bug',
        level: 'LV 50',
        tagline: 'Logic that never gets tested on its own',
        weakness: 'Pure modules with no framework imports',
        body: [
          "Logic that's glued to a widget can only be tested by running the whole app. Which means it rarely gets tested, and mistakes only surface in a user's hands.",
          "I flip the order. The part that can be wrong — splitting money, scheduling turns, assessing speech — goes into a module that doesn't import a single UI framework. That module gets tested without ever opening a simulator. The interface arrives later, as a reader.",
        ],
        proof: {
          project: 'The core pattern across every project',
          kind: 'Architecture',
          note: "SplitEngine, StepOutCore, LantangCore, and Emberfall's core/ all use the same shape.",
        },
      },
      {
        slug: 'the-tangled-schema',
        name: 'The Tangled Schema',
        level: 'LV 38',
        tagline: 'Relations that grow with no plan',
        weakness: 'Schema first, features after',
        body: [
          'A schema left to grow feature-by-feature ends up with columns whose meaning depends on other columns, and queries nobody dares touch.',
          'I start from the data model, not the page. For the studio site, I locked down the entities and relations in a Prisma schema before writing a single component. Migrations become a readable history, not a pile of patches.',
        ],
        proof: {
          project: 'Laundry management system',
          kind: 'Backend',
          note: 'Laravel 11 with SQLite, the Waterfall method, Black Box testing, fully documented.',
        },
      },
      {
        slug: 'shifting-requirements',
        name: 'Shifting Requirements',
        level: 'LV 36',
        tagline: 'Requirements shift mid-build',
        weakness: 'Clear module boundaries',
        body: [
          "Requirement changes can't be prevented. What can be controlled is how far a change propagates.",
          'If a business rule lives in one pure module, changing it means editing one file and rerunning its tests. If that rule is scattered across seven UI components, changing it means hunting.',
        ],
        proof: {
          project: 'Random Forest and SVM journal paper',
          kind: 'Research',
          note: 'Real scikit-learn experiments on the Pima Indians Diabetes Dataset, published in JUKTISI format with 17 IEEE references.',
        },
      },
    ],
  },
  {
    id: 'game',
    name: 'Game development',
    short: 'Game',
    field: 'An enthusiast with systems that actually run',
    party: [
      ['Systems design', 0],
      ['Godot, GDScript', 1],
      ['SpriteKit', 1],
    ],
    lineage: [
      { title: 'Systems design', note: '' },
      { title: 'SpriteKit', note: '' },
      { title: 'Godot 4.5', note: '' },
    ],
    threats: [
      {
        slug: 'balance',
        name: 'Balance',
        level: 'LV 46',
        tagline: 'Numbers that feel right but are unproven',
        weakness: 'Thousands of simulated runs, not a hunch',
        body: [
          "Balancing a game by playing it yourself means trusting a feeling after twenty attempts. That's not enough to catch a build path that's simply too strong.",
          'In StepOut I built a harness that runs 2,000 simulated runs without ever opening the game window. The results aren\'t just win-loss numbers, they\'re structural findings: which paths collapse at which round, and which upgrades never get picked. I log all of it in BALANCING.md.',
        ],
        proof: {
          project: 'StepOut',
          kind: 'iOS',
          note: '15 upgrades across four build paths: Venom, Riposte, Brink, and Tempo.',
        },
      },
      {
        slug: 'unrepeatable-randomness',
        name: 'Unrepeatable Randomness',
        level: 'LV 39',
        tagline: 'A bug that vanishes when you go looking for it',
        weakness: 'A seeded, reproducible RNG',
        body: [
          'If randomness comes from a system source, a single run can never be replayed. Bug reports become useless and automated testing becomes impossible.',
          "I use SplitMix64 with an explicit seed that's itself part of the game state. The same seed produces the exact same run, so the balancing harness can run deterministically and every mistake can be reproduced.",
        ],
        proof: {
          project: 'StepOutCore',
          kind: 'Swift Package',
          note: 'Zero SpriteKit imports. The resolve(state, action) contract returns a new state and a stream of events.',
        },
      },
      {
        slug: 'chaotic-turn-order',
        name: 'Chaotic Turn Order',
        level: 'LV 42',
        tagline: "An action order you can't predict",
        weakness: 'A tick accumulator, not an ad hoc queue',
        body: [
          "A turn system built from timers and callbacks will produce a different order on different devices. For a tactical game, that's fatal.",
          'I built the scheduler as a tick accumulator: every entity accumulates a value based on its speed, and whoever crosses the threshold first gets the turn. Pure integer arithmetic, no real-time clock, so the outcome is identical everywhere.',
        ],
        proof: {
          project: 'Emberfall',
          kind: 'Godot',
          note: 'Break and Boost mechanics with a Turn Weaving system, combat logic kept pure in core/.',
        },
      },
    ],
  },
];
