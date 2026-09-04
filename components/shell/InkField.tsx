import type { CSSProperties } from 'react';

/**
 * Misregistered two-ink print field — CLAUDE.md section 3b, replacing the
 * painted-wash technique from section 3. Each colour field is drawn twice
 * from the same shape, offset 3-6px and rotated slightly, in two inks; the
 * overlap darkens, the fringe shows a sliver of each ink. A turbulence
 * filter is applied as a CSS mask for ink density variation, not as edge
 * displacement — screen-printed ink runs thin in places, it doesn't tear
 * like paint.
 *
 * These are plain HTML divs with `mix-blend-mode: multiply`, not SVG groups.
 * `mix-blend-mode` inside an SVG only blends against other SVG content in
 * the same document, not against the HTML page behind it (no isolation with
 * the page's actual background) — a first attempt at this used SVG `<g>`
 * elements and the ink came out as flat, washed-out rectangles instead of
 * darkened print, because there was nothing dark to multiply against inside
 * the SVG's own transparent canvas. CSS blend modes on real HTML elements
 * composite correctly against whatever is actually behind them.
 *
 * `seed` varies the mask per screen so title and hub don't look identical.
 */
export function InkField({ seed = 1, className }: { seed?: number; className?: string }) {
  const maskId = `inkwash-mask-${seed}`;
  // The inner <svg> needs explicit width/height — without them it has no
  // intrinsic size, so the browser can't rasterize it as a mask and silently
  // drops the whole `mask-image` (computed style reads "none"). globals.css's
  // .grain data URI already does this correctly; this one didn't, at first.
  const maskUrl =
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='${maskId}'%3E` +
    `%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' seed='${seed}' result='n'/%3E` +
    `%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.7 0 0 0 0.3'/%3E` +
    `%3C/filter%3E%3Crect width='400' height='400' filter='url(%23${maskId})'/%3E%3C/svg%3E")`;

  const ink = (color: string, opacity: number, tx: number, ty: number, rotate: number): CSSProperties => ({
    position: 'absolute',
    left: '4%',
    top: '8%',
    width: '52%',
    height: '58%',
    background: color,
    opacity,
    mixBlendMode: 'multiply',
    // `mask-image` (unlike the `mask` shorthand) only accepts an image value
    // — appending "center / cover" to the url() here, as the `mask`
    // shorthand allows, made the whole declaration invalid and silently
    // dropped (computed style read "none"). Position/size are separate
    // longhands instead.
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'cover',
    maskSize: 'cover',
    transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`,
  });

  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={ink('var(--rust)', 0.4, 0, 0, 0)} />
      <div style={ink('var(--teal)', 0.35, 5, -4, 0.4)} />
    </div>
  );
}
