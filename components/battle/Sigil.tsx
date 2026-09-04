/**
 * Procedural obstacle sigil, ported from the `sigil(a, t)` function in
 * docs/prototype.html: twelve distinct marks from one shape family, derived
 * purely from (archetypeIndex, threatIndex) — zero image files, per
 * MASTER_PROMPT.md §3's technique table.
 */
function ring(cx: number, cy: number, r: number, n: number, rot: number): string {
  const points: string[] = [];
  for (let k = 0; k < n; k++) {
    const a = rot + (k * 2 * Math.PI) / n;
    points.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return points.join(' ');
}

export function Sigil({ archetypeIndex, threatIndex }: { archetypeIndex: number; threatIndex: number }) {
  const s = archetypeIndex * 3 + threatIndex;
  const n = 3 + (s % 4);
  const m = 3 + ((s + 2) % 5);

  return (
    <svg className="sig" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="47" />
      <polygon points={ring(60, 60, 43, n, -Math.PI / 2)} />
      <polygon points={ring(60, 60, 27, m, Math.PI / 2 + s)} />
      <line x1="60" y1="4" x2="60" y2="20" />
      <line x1="60" y1="100" x2="60" y2="116" />
      <polygon className="solid" points={ring(60, 60, 8, 4, 0)} />
    </svg>
  );
}
