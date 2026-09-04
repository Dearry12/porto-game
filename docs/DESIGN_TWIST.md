# DESIGN TWIST — Paraphrasing the reference

Append as §3b of `MASTER_PROMPT.md`. This section overrides §3 wherever they conflict.

---

## 1. The problem

The prototype currently reads as Metaphor with different colours. That is fine as a study and wrong as a portfolio. A hiring manager who recognises the source sees a fan project; one who does not sees something with no origin story.

**The fix is not to weaken the design. It is to keep the grammar and replace the vocabulary.**

Grammar worth keeping — this is what makes the reference work:
- Oversized display type as the primary compositional element
- A consistent diagonal running through every cut
- Colour fields behind type rather than beside it
- Asymmetric layout with one heavy side and one quiet side
- Sharp, short motion with staggered entry
- Information plates tied to their subject by a thin leader line

Vocabulary that must change — this is what makes it *Metaphor*:
- Oil paint splatter
- Magenta and cyan at full saturation
- Anime portrait occupying the right half
- Illuminated-manuscript ornament
- Japanese subtitle text in the small-label slot

---

## 2. The twist: from painting to printing

Replace the painted surface with a **misregistered two-ink print**, and replace the manuscript ornament with **technical drafting marks**.

Why this direction rather than any other:

The reference is a fantasy about a painted world. This site is about someone who separates pure logic from presentation and tests it headlessly. A drafting-and-print language says that without a word of copy. It also keeps the thing the owner actually liked — bold colour fields under giant type — while changing the process that produced them from painting to printing.

The result should read as a **screen-printed technical broadsheet**, not as a JRPG menu.

---

## 3. Texture recipe

### Misregistration

Every colour field is drawn twice from the same path, offset and rotated slightly, in two inks.

```css
.ink { mix-blend-mode: multiply; }
.ink--warm { fill: var(--rust); transform: translate(0,0); }
.ink--cool { fill: var(--teal); transform: translate(4px,-3px) rotate(0.4deg); }
```

The overlap darkens; the fringe shows a sliver of each ink. This single move is what makes the surface read as print rather than paint. Offset stays between 3 and 6px — larger looks like a mistake, smaller is invisible.

### Ink density

Instead of the turbulence displacement currently used for torn edges, apply turbulence as an **opacity mask** so the ink looks thin in places, as screen printing does.

```svg
<filter id="inkwash">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/>
  <feColorMatrix in="n" type="matrix"
    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0 0 0 0.5" result="m"/>
  <feComposite in="SourceGraphic" in2="m" operator="in"/>
</filter>
```

Keep the existing displacement filter for the torn edge, but layer this on top for density variation.

### Halftone

Small areas get an SVG dot pattern rather than flat fill. Use it sparingly — one or two elements per screen, never the whole background.

```svg
<pattern id="halftone" width="4" height="4" patternUnits="userSpaceOnUse">
  <circle cx="2" cy="2" r="1.1" fill="currentColor"/>
</pattern>
```

### Drafting marks

This is the ornament layer that replaces manuscript flourish. Draw in `--parch-dim` at 0.5px, opacity around 0.35.

- **Registration crosses** — a `+` inside a circle, 14px, at two or three frame corners
- **Dimension lines** — a hairline with tick ends and a monospace label giving a real number: viewport width, section index, obstacle count
- **Hairline grid** — 8px, opacity 0.05, visible only where a colour field sits behind it
- **Coordinate labels** — monospace, 9px, at the corner of major panels, e.g. `x:04 y:12`

These must carry real values, not decorative gibberish. If a label says `03/12` it is because there are twelve obstacles and this is the third.

---

## 4. Type

### The one swap that changes the most

In the reference, the small-text slot beneath each display word holds Japanese. Here it holds **monospace technical labels**. Every eyebrow, plate, hint, index, and caption uses JetBrains Mono, uppercase, tracked wide.

This alone shifts the read from "game menu" to "engineering document" without touching the display type at all.

### Scale

| Role | Face | Treatment |
|---|---|---|
| Display | Bodoni Moda 900 | Cascade, plates, section heads. Never below 40px. |
| Structural small | JetBrains Mono | All labels, indices, coordinates, hints, captions |
| Body | Archivo Narrow | Prose only: threat bodies, about, project summaries |

Three faces, three jobs, no overlap. If a piece of text is not prose, it is monospace.

### Outline

The reference outlines its display type heavily. Do not copy that. Instead, when display type sits over a colour field, cut it out of the field using the existing XOR mask technique. Knockout instead of outline — same legibility, different signature.

---

## 5. Geometry: the measurement rule

The cascade currently hangs in space. Anchor it to a **vertical measurement rule** running down the left edge.

- A hairline with a tick every 24px
- Each menu item aligns to a major tick, labelled in monospace: `01` through `05`
- The rule continues into the sections, where the active section's tick is filled ochre

This replaces the rail as a decorative element with something that reads as a drawing instrument, and it gives the cascade a reason for its stagger instead of it being arbitrary. It also solves an earlier concern — it is visibly not the calibration rail from the current portfolio, because it carries indices rather than measurements.

---

## 6. Composition per screen

### Title
Wordmark with the XOR triangle knockout stays. Behind it, two misregistered ink fields instead of paint blobs. Registration crosses at the top-left and bottom-right of the frame. Monospace line beneath the rule reading the build version and year.

The 3D object sits **behind and cropped by the frame edge**, occupying the compositional slot the reference gives to a character portrait. Do not centre it.

### Hub
Cascade anchored to the measurement rule on the left. One large misregistered ink field behind the middle three items. Identity panel bottom right, now bordered with a dimension line rather than a skewed bar. Halftone on one element only.

### Battle
Command fan stays as a staggered fan, not a true radial arc. Trigonometric placement breaks with variable label lengths and reads worse than the stagger — the reference itself uses a stagger, not a circle.

Add from the proposal:
- **Targeting line.** Full-screen absolute SVG, one `<line>` from the active fan item to the selected obstacle's centre, in rust, 1px, with a small circle at the obstacle end. Recompute on selection change via `getBoundingClientRect`. On mobile, hide it.
- **Name plate skew.** `clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%)` on the obstacle plate, filled rust, display type inside.
- **Enter and exit timeline.** On archetype change: current obstacles `opacity: 0, x: 40` staggered 0.04s, swap data, new obstacles `opacity: 1, x: 0` with `expo.out`, stagger 0.06s.

Party panel keeps three tools per archetype but shows **evidence counts, not bars** — `Swift · 3` meaning three shipped projects. Full bars for everything communicate nothing.

---

## 7. Rejected from the radial-menu proposal

| Proposal | Why not |
|---|---|
| Four named monsters (Fragmentation Beast, State Chimera, Data Loss Demon, Non-Deterministic Horror) | Invented names claiming problems the owner has not demonstrably solved. The twelve real obstacles in `MASTER_PROMPT.md` §8 each carry a number or an artefact behind them. Fantasy naming trades that away. |
| One obstacle per discipline | Collapses twelve pieces of evidence into four sentences |
| `mix-blend-mode: difference` on text | Unpredictable over multi-colour fields; frequently illegible. Use the XOR knockout instead. |
| Full HP bars per tech | Meaningless. Every bar full says nothing; a bar not full invites a question with no answer. |
| Trigonometric radial placement | Breaks with variable label lengths. The reference uses a stagger. |
| L / R / Y controller glyphs for quick links | Obscure to anyone who has not played the source. The keyboard hint bar already covers affordance. |
| Magenta and cyan at full saturation | Already rejected in §3. Works on a detailed 3D scene, hurts on a flat web background. |

---

## 8. The similarity test

Before shipping any screen, apply this: **describe the screen to someone who has not seen the reference. If the description only makes sense by naming the game, the paraphrase failed.**

A passing description of the hub: *five oversized serif words descending down a measurement rule, over two misregistered ink fields, with monospace indices and registration marks.*

A failing description: *like the Metaphor main menu but in cream and rust.*

Warning signs that the paraphrase has slipped:
- Colour fields drawn as organic blobs rather than misregistered geometry
- Small text set in a serif or sans rather than monospace
- Drafting labels carrying decorative rather than real values
- Display type gaining a heavy outline
- Anything placed where a character portrait would be
