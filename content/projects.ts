/**
 * Eight projects, translated from docs/CONTENT.md ("## Proyek") — see
 * CLAUDE.md's Konten section for the language decision. docs/CONTENT.md
 * supersedes the six terse cards in docs/prototype.html with real, verified
 * case-study copy — its own header says the numbers are confirmed from the
 * owner's CV and Academy portfolio. Grid order follows strength, not
 * chronology, per docs/CONTENT.md's own note. All technical claims (numbers,
 * percentages, method names) are translated for meaning, not reworded.
 *
 * `tagline` and `body` are new, optional fields (see content/types.ts) added
 * to hold this prose losslessly. Nothing renders them yet.
 *
 * `archetypes` links a project to a battle archetype only where that project
 * is named as the `proof.project` of one of that archetype's threats in
 * content/archetypes.ts — not from looser thematic association. Pivot and
 * HeatNest Tech are real, verified work but are not named as proof of any of
 * the twelve obstacles, so they carry no archetype cross-link; they exist in
 * the project grid only. This is not an oversight — see CLAUDE.md for the
 * same asymmetry already present in the software archetype, whose obstacle
 * proofs point at things ("laundry management system", "Random Forest and
 * SVM journal paper") that were never full grid cards either.
 *
 * `shots` is empty for all eight. Screenshots are the one asset group with
 * real production cost (docs/MASTER_PROMPT.md §9) and are not due until
 * Phase 6; an empty array here is not a placeholder, it is the honest current
 * state.
 */

import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    slug: 'patungan',
    name: 'Patungan',
    kind: 'iOS',
    meta: '2026 · Solo, personal initiative · Fully functional',
    summary: "Splitting one bill four ways without anyone doing math at the table.",
    tagline: "Splitting one bill four ways without anyone doing math at the table.",
    body: [
      "Create an event, pull participants straight from Contacts, then scan a receipt or enter it by hand. Each item is assigned to whoever ordered it, tax and service charges are split proportionally, and the app resolves all of it into the smallest possible list of transfers: not an abstract who-owes-what, but the exact payments that need to be sent.",
      "Built entirely on Apple's own frameworks, with zero third-party dependencies. Partly discipline, partly the actual point: I wanted to know what the platform genuinely already provides before reaching for someone else's package.",
      "The part I'm proudest of is invisible. Split 43,500 three ways and the result is clean. Split most real totals and the rounded amounts don't add back up to what was actually paid. The gap is one rupiah and nobody would notice, but the ledger is wrong, and a bill-splitting app whose numbers don't balance isn't a bill-splitting app. The largest remainder method solves it: everything rounds down, and the leftover rupiah goes to whoever rounding shortchanged the most.",
      "This is my first Swift app. I deliberately picked a problem I already understood, so the difficulty would be in the language, not the domain.",
    ],
    stack: ['SwiftUI', 'SwiftData', 'Vision', 'VisionKit', 'Swift Charts'],
    repo: 'https://github.com/Dearry12/patungan',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'dompet',
    name: 'DomPet',
    kind: 'Flutter',
    meta: '2026 · Individual thesis · Complete',
    summary: 'A finance app that makes manual logging fast enough to actually stick with.',
    tagline: 'A finance app that makes manual logging fast enough to actually stick with.',
    body: [
      "Tap-to-pay removes the friction from spending, and it removes the pain of paying along with it. Writing down every expense does restore that awareness, the problem is almost nobody sticks with it, because typing the same thing over and over is boring.",
      "So I kept manual logging, and attacked the boredom instead. Two AI features cut down the effort of logging, and one behavioral layer gives a reason to come back tomorrow. No account syncing, deliberately: the app never stores credentials or transaction history it doesn't need, and both models run on-device, so receipt photos and voice recordings never leave the phone.",
      "Results: 83.33% OCR accuracy on 30 real receipts (100% on clear print, 66.67% in low light), 100% Indonesian voice processing across 22 test sentences, an 88.22% User Acceptance Test score (397/450), 85 passing unit tests across 15 features, zero static analysis findings.",
      "Calibrating the OCR was the longest fight in this project. A receipt is a hostile input: faded thermal paper, a fold right across the total line, glare, low light. One fix that helped one condition would quietly break another, and the margin for error is unforgiving — reading 27,300 instead of 27,800 is a wrong answer, not a close one. I stopped chasing one perfect pass and started testing against five deliberately bad receipt categories instead. Rather than hide the gaps, the app shows its own confidence score and lets the user correct it.",
      "What I learned: a feature doesn't get cheap just because it sounds simple. Its price is the time it takes to understand properly, and every other part of the build ends up paying that bill.",
    ],
    stack: ['Flutter', 'Firebase', 'Google ML Kit', 'Speech-to-Text'],
    repo: 'https://github.com/Dearry12/dompet_app',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'lantang',
    name: 'Lantang',
    kind: 'iOS',
    meta: '2026 · Solo, personal initiative · Core package complete, 11 passing tests',
    summary: 'A public-speaking coach that listens in Indonesian, and says one useful thing instead of forty.',
    tagline: 'A public-speaking coach that listens in Indonesian, and says one useful thing instead of forty.',
    body: [
      "Practicing alone gives no feedback at all. Recording yourself and watching it back is exhausting and unfocused, so most people try it once and stop. And the apps that exist are built for English, which means they misread how Indonesian actually sounds.",
      "That last part is heavier than it sounds. Our filler words — jadi, kayak, nah — are mostly real words doing real work in ordinary sentences. Match against a word list and you'll accuse the speaker constantly, and wrongly.",
      "The rule the architecture enforces: the language model is never asked to count anything. Every number comes out of deterministic code, because a language model can't be trusted with arithmetic, and I don't want to find that out from a user. The work splits into three layers. LantangCore is a pure Swift package with no UI dependencies: layer one measures, layer two picks one strength and one focus area out of everything measured. Only layer three, an on-device Foundation Model, turns that verdict into a sentence a person would actually want to read.",
      'Where it stands now: LantangCore exists with 11 passing unit tests. Everything above the core is designed and documented but not yet built. I\'m currently answering the riskiest question before writing a single detector — whether SpeechTranscriber supports the id-ID locale, and whether non-lexical sounds like "uh" survive in the transcript or get discarded as noise. The answer determines whether I need one analysis path or two.',
      "Lantang means to speak clearly and be heard. Not loud, but confident. There's an irony I like in that: an app called Lantang spends a lot of its time teaching the value of silence.",
    ],
    stack: ['SpeechAnalyzer', 'Foundation Models', 'SwiftData', 'Swift Charts'],
    repo: 'https://github.com/Dearry12/Lantang',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'stepout',
    name: 'StepOut',
    kind: 'iOS',
    meta: '2026 · Solo · Public repo',
    summary: "A roguelite whose game core doesn't know anything about how it's drawn.",
    tagline: "A roguelite whose game core doesn't know anything about how it's drawn.",
    body: [
      'StepOutCore is a headless Swift Package with zero SpriteKit imports. Its contract is resolve(state, action) -> (RunState, [BattleEvent]): state and action go in, a new state and a stream of events come out. The display layer only reads that stream.',
      "A SplitMix64 RNG with an explicit seed that is itself part of the game state, so the same seed produces the exact same run. The turn scheduler uses a tick accumulator — pure integer arithmetic with no real-time clock — so the order is identical on any device.",
      'Six enemy types, 15 upgrades across four build paths: Venom, Riposte, Brink, and Tempo.',
      "Balancing wasn't done by playing it over and over. There's a harness that runs 2,000 simulated runs without ever opening the game window, and its findings aren't just win-loss numbers but structural ones: which paths collapse at which round, which upgrades never get picked. All of it is logged in BALANCING.md.",
    ],
    stack: ['SpriteKit', 'Swift Package'],
    repo: 'https://github.com/Dearry12/StepOut',
    shots: [],
    archetypes: ['game'],
  },
  {
    slug: 'pivot',
    name: 'Pivot',
    kind: 'Web',
    meta: '2026 · Team of three, frontend programmer role · 3rd place nationally',
    summary: 'A financial-recovery platform built around one number: the income you actually need.',
    tagline: 'A financial-recovery platform built around one number: the income you actually need.',
    body: [
      "Someone in financial trouble is told to cut back, told to upskill, told to apply for jobs. Each piece lives in a different app and none of them talk to each other. Budgeting tools show you what you spend but never how much you need to earn. What's left: that person has to become their own strategist, at exactly the moment their capacity is lowest.",
      "It starts from one number. Living costs plus debt obligations produce a Target Income, a monthly figure that puts someone back on stable footing. Everything below it is filtered through that number: roles that pay enough, the skills those roles need, a 14–30 day roadmap built from free resources, an ATS-ready CV, job listings filtered against the target, and freelance work to close the gap before the main job arrives.",
      "Privacy as architecture, not a setting. Debt is the most embarrassing data a person holds, so debt figures — amounts, interest, lender names — are computed entirely in the browser and never sent to our servers. It isn't an option a user has to find; it's the only way the app works.",
      "We placed third, and the gap between us and the top two sat exactly in the parts that weren't finished. An idea this broad is easy to explain and hard to deliver whole, and a competition deadline will find that out for you.",
      '3rd place nationally, Technology Innovative Challenge 9.0, Universitas Jember. Team Uneed Developer.',
    ],
    stack: ['Nuxt', 'Vue', 'Vercel'],
    repo: 'https://github.com/uneeddeveloper/Pivot.id',
    live: 'https://pivot-id.vercel.app',
    shots: [],
    archetypes: [],
  },
  {
    slug: 'nullfeed',
    name: 'NULLFEED',
    kind: 'Web',
    meta: 'Solo · Production build',
    summary: 'A scroll-driven horror promo page, built to show range outside the Next.js/React stack I normally use.',
    tagline: 'A scroll-driven horror promo page, built to show range outside the Next.js/React stack I normally use.',
    body: [
      'An icosahedron distorted by a single uniform called corruption, a hand-written GLSL shader, chromatic aberration through a post-processing pipeline. Original horror lore built around an entity called The Carrier.',
      "What makes it work isn't the number of effects. All the boldness is spent on one object, and everything else stays still.",
    ],
    stack: ['SvelteKit', 'Threlte', 'GLSL', 'GSAP ScrollTrigger'],
    shots: [],
    archetypes: ['web'],
  },
  {
    slug: 'heatnest-tech',
    name: 'HeatNest Tech',
    kind: 'IoT',
    meta: 'July 2025 · Team of four, firmware and hardware role · 1st place out of 10 teams',
    summary: "An IoT system that keeps a chicken coop at the right temperature, and tells the farmer when it isn't.",
    tagline: "An IoT system that keeps a chicken coop at the right temperature, and tells the farmer when it isn't.",
    body: [
      "Chickens only tolerate a narrow temperature range. Too hot and they stop eating, lose weight, lay fewer eggs. Too cold and growth stalls while disease risk rises. But most small and mid-sized farmers still check a wall thermometer by hand: a reading only happens when someone walks past, nothing gets logged, and a sudden spike at three in the morning isn't caught until hours later.",
      "An ESP8266 reads temperature and humidity every two seconds and drives the heating relay. Auto mode holds the coop at 32–35°C with 1°C hysteresis so the relay doesn't chatter around the threshold and wear out. A web dashboard shows live readings and a 24-hour trend; a Telegram bot sends alerts when temperature leaves the safe range and accepts /status, /on, /off from anywhere.",
      "The competition's theme paired IoT with artificial intelligence, and we could have called this control loop that. We didn't. What the coop needs is thresholds, hysteresis, and alerts that actually arrive. A rule-based system already does all of that, and a model would only make it harder to trust.",
      "This changed how I understand the cost of a bug. When software fails, you get a wrong number on a screen. Here the code closes a relay that sends electricity to a heater, inside a wooden structure, around living animals.",
      '1st place out of 10 teams, IT Bootcamp, Universitas Bina Sarana Informatika.',
    ],
    stack: ['ESP8266', 'DHT sensor', 'relay'],
    shots: [],
    archetypes: [],
  },
  {
    slug: 'emberfall',
    name: 'Emberfall',
    kind: 'Godot',
    meta: 'Design phase',
    summary: "An HD-2D JRPG demo as a systems programmer's portfolio piece.",
    tagline: "An HD-2D JRPG demo as a systems programmer's portfolio piece.",
    body: [
      'A split between core/ and game/: deterministic, headlessly-testable logic in core, Nodes and animation in presentation. Combat uses Break/Boost mechanics with a Turn Weaving system.',
      "The PRD, architecture document, and execution guide are done. The code isn't yet.",
    ],
    stack: ['Godot 4.5', 'GDScript'],
    shots: [],
    archetypes: ['game'],
  },
];
