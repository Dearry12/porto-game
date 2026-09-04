/**
 * Skill groups, lifted verbatim from the "Keahlian" section of docs/CONTENT.md.
 *
 * Percentages are discarded per CLAUDE.md decision c. docs/CONTENT.md resolves
 * what was left as TODO after phase 1: each group is a comma-separated tool
 * list paired with one evidence-tied sentence, not a percentage per tool. That
 * shape fits the existing `items: Array<[string, string]>` tuple as one tuple
 * per group rather than one per tool, so no type change was needed here.
 *
 * Eight groups, matching docs/CONTENT.md exactly — more granular than the
 * prototype's four stat-groups (Mobile/Web/Backend/Game), because the real
 * content is more granular. "Lainnya" and "Bahasa" have no evidence sentence
 * in the source; their second tuple element is left as an empty string rather
 * than inventing one.
 */

import type { SkillGroup } from './types';

export const SKILLS: SkillGroup[] = [
  {
    label: 'iOS',
    items: [
      [
        'Swift, SwiftUI, SwiftData, Vision, VisionKit, Swift Charts, Swift Testing / XCTest',
        'Tiga aplikasi: Patungan berfungsi penuh dan diuji dengan struk asli, StepOut dengan core headless, LantangCore dengan 11 test lulus.',
      ],
    ],
  },
  {
    label: 'Mobile lintas platform',
    items: [
      [
        'Flutter, Dart, Firebase, Google ML Kit, Speech-to-Text',
        'DomPet: 15 fitur, 85 unit test lulus, UAT 88,22%.',
      ],
    ],
  },
  {
    label: 'Web',
    items: [
      [
        'Next.js, React, TypeScript, Tailwind, Nuxt, Vue, Laravel, PHP, Hugo, REST API',
        'Pivot (juara 3 nasional), situs studio dengan Prisma/PostgreSQL, situs pemerintah provinsi dengan Hugo dan integrasi AWDI.',
      ],
    ],
  },
  {
    label: '3D dan grafis web',
    items: [
      [
        'Three.js, Threlte, GLSL, GSAP',
        'NULLFEED: shader tulisan sendiri dan pipeline post-processing, production build.',
      ],
    ],
  },
  {
    label: 'Arsitektur dan pengujian',
    items: [
      [
        'Modul murni tanpa dependensi UI, pengujian headless, RNG deterministik',
        'Pola yang sama di SplitEngine, StepOutCore, LantangCore, dan core/ Emberfall.',
      ],
    ],
  },
  {
    label: 'Game',
    items: [
      [
        'Godot, GDScript, SpriteKit, desain sistem',
        'StepOut: 15 upgrade di empat jalur, diseimbangkan lewat 2.000 run simulasi.',
      ],
    ],
  },
  {
    label: 'Lainnya',
    items: [['Git & GitHub, Figma, dasar ESP8266 / IoT, C++ dan Unreal Engine (belajar mandiri)', '']],
  },
  {
    label: 'Bahasa',
    items: [['Indonesia (asli), Inggris (percakapan)', '']],
  },
];
