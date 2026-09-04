/**
 * Halftone dot pattern — CLAUDE.md section 3b. Used sparingly: one small
 * badge per section header here, never a whole background, per the spec's
 * own instruction.
 */
export function Halftone({ size = 28 }: { size?: number }) {
  const id = `halftone-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" style={{ flex: 'none' }}>
      <defs>
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="var(--ochre)" />
        </pattern>
      </defs>
      <rect width="28" height="28" fill={`url(#${id})`} opacity="0.7" />
    </svg>
  );
}
