const CROSS = (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <g stroke="var(--parch-dim)" strokeWidth="0.5" opacity="0.35" fill="none">
      <circle cx="11" cy="11" r="7" />
      <line x1="0" y1="11" x2="22" y2="11" />
      <line x1="11" y1="0" x2="11" y2="22" />
    </g>
  </svg>
);

/**
 * Registration crosses — the drafting-marks ornament layer from CLAUDE.md
 * section 3b, replacing manuscript flourish. Two per frame corner, per the
 * spec ("at two or three frame corners"). Positioned as plain HTML corners
 * rather than one shared SVG viewBox, since SVG's `transform` attribute has
 * no `calc()` to place a mark relative to the far edge.
 */
export function RegistrationMarks() {
  return (
    <>
      <div style={{ position: 'absolute', top: 18, left: 18, pointerEvents: 'none' }}>{CROSS}</div>
      <div style={{ position: 'absolute', bottom: 18, right: 18, pointerEvents: 'none' }}>{CROSS}</div>
    </>
  );
}
