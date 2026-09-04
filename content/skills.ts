/**
 * Skill groups, translated from the "Keahlian" section of docs/CONTENT.md —
 * see CLAUDE.md's Konten section for the language decision. The Indonesian
 * source is the historical source of truth for meaning; this is a faithful
 * translation of it, not a paraphrase, and is what the site now ships.
 *
 * Percentages are discarded per CLAUDE.md decision c. docs/CONTENT.md
 * resolved what was left as TODO after phase 1: each group is a
 * comma-separated tool list paired with one evidence-tied sentence, not a
 * percentage per tool. That shape fits the existing `items: Array<[string,
 * string]>` tuple as one tuple per group rather than one per tool, so no
 * type change was needed here.
 *
 * Eight groups, matching docs/CONTENT.md exactly — more granular than the
 * prototype's four stat-groups (Mobile/Web/Backend/Game), because the real
 * content is more granular. "Other" and "Languages" have no evidence
 * sentence in the source; their second tuple element is left as an empty
 * string rather than inventing one.
 */

import type { SkillGroup } from './types';

export const SKILLS: SkillGroup[] = [
  {
    label: 'iOS',
    items: [
      [
        'Swift, SwiftUI, SwiftData, Vision, VisionKit, Swift Charts, Swift Testing / XCTest',
        'Three apps: Patungan, fully functional and tested with real receipts; StepOut, with a headless core; LantangCore, with 11 passing tests.',
      ],
    ],
  },
  {
    label: 'Cross-platform mobile',
    items: [
      [
        'Flutter, Dart, Firebase, Google ML Kit, Speech-to-Text',
        'DomPet: 15 features, 85 passing unit tests, 88.22% UAT score.',
      ],
    ],
  },
  {
    label: 'Web',
    items: [
      [
        'Next.js, React, TypeScript, Tailwind, Nuxt, Vue, Laravel, PHP, Hugo, REST API',
        'Pivot (3rd place nationally), the studio site with Prisma/PostgreSQL, the provincial government site with Hugo and AWDI integration.',
      ],
    ],
  },
  {
    label: '3D and web graphics',
    items: [
      [
        'Three.js, Threlte, GLSL, GSAP',
        'NULLFEED: a hand-written shader and post-processing pipeline, shipped to production.',
      ],
    ],
  },
  {
    label: 'Architecture and testing',
    items: [
      [
        'Pure modules with no UI dependencies, headless testing, deterministic RNG',
        "The same pattern in SplitEngine, StepOutCore, LantangCore, and Emberfall's core/.",
      ],
    ],
  },
  {
    label: 'Game',
    items: [
      [
        'Godot, GDScript, SpriteKit, systems design',
        'StepOut: 15 upgrades across four build paths, balanced with 2,000 simulated runs.',
      ],
    ],
  },
  {
    label: 'Other',
    items: [['Git & GitHub, Figma, ESP8266 / IoT basics, C++ and Unreal Engine (self-taught)', '']],
  },
  {
    label: 'Languages',
    items: [['Indonesian (native), English (conversational)', '']],
  },
];
