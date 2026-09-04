/**
 * XOR knockout wordmark, ported from docs/prototype.html: two SVG masks make
 * the triangle punch a hole out of the text and the text punch a hole out of
 * the triangle, so the overlap disappears from both — the "knockout instead
 * of outline" rule from CLAUDE.md section 3b.
 */
export function Wordmark() {
  return (
    <svg className="wordmark" viewBox="0 0 1000 340" role="img" aria-label="Derry Meiraldy">
      <defs>
        <mask id="wordmark-not-triangle">
          <rect width="1000" height="340" fill="#fff" />
          <polygon points="40,52 960,52 500,258" fill="#000" />
        </mask>
        <mask id="wordmark-not-text">
          <rect width="1000" height="340" fill="#fff" />
          <text
            x="500"
            y="196"
            textAnchor="middle"
            textLength="900"
            lengthAdjust="spacingAndGlyphs"
            fill="#000"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 132 }}
          >
            MEIRALDY
          </text>
        </mask>
      </defs>
      <g fill="var(--parch)">
        <text
          x="500"
          y="196"
          textAnchor="middle"
          textLength="900"
          lengthAdjust="spacingAndGlyphs"
          mask="url(#wordmark-not-triangle)"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 132 }}
        >
          MEIRALDY
        </text>
        <polygon points="40,52 960,52 500,258" mask="url(#wordmark-not-text)" />
      </g>
      {/*
        Below y=258 (the triangle's apex), not at the prototype's original
        y=232 — at 232 this sits inside the triangle's narrow tip, painted
        the same parch colour as the triangle itself, so the word vanishes.
        That's a latent bug in docs/prototype.html surfaced by porting it
        faithfully; fixed here rather than reproduced.
      */}
      <text
        x="500"
        y="284"
        textAnchor="middle"
        fill="var(--parch)"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 19, letterSpacing: '0.5em' }}
      >
        DERRY
      </text>
      <rect x="40" y="316" width="920" height="2" fill="var(--parch)" opacity="0.8" />
    </svg>
  );
}
