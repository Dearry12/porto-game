'use client';

import { useEffect, useState } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * DESIGN_TWIST.md §6: a line from the active fan item to the selected
 * obstacle's centre, rust, 1px, with a small circle at the obstacle end.
 * Recomputed via getBoundingClientRect on selection change; hidden below
 * 700px (matches the mobile breakpoint where the fan and field both drop
 * out of absolute positioning, so there's nothing meaningful to point at).
 */
export function TargetingLine({ archetype, cursor }: { archetype: string; cursor: number }) {
  const [line, setLine] = useState<Line | null>(null);

  useEffect(() => {
    function recompute() {
      if (window.innerWidth < 700) {
        setLine(null);
        return;
      }
      const fan = document.querySelector('.fan[aria-pressed="true"]');
      const target = document.querySelector('.threat.sel .halo');
      if (!fan || !target) {
        setLine(null);
        return;
      }
      const a = fan.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      setLine({
        x1: a.left + a.width / 2,
        y1: a.top + a.height / 2,
        x2: b.left + b.width / 2,
        y2: b.top + b.height / 2,
      });
    }

    // A frame's delay lets layout (and any in-flight stagger tween) settle
    // before measuring — measuring synchronously on the same tick that
    // triggered the change can catch elements mid-reflow.
    const raf = requestAnimationFrame(recompute);
    window.addEventListener('resize', recompute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', recompute);
    };
  }, [archetype, cursor]);

  if (!line) return null;

  return (
    <svg
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 2, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="var(--rust)" strokeWidth={1} />
      <circle cx={line.x2} cy={line.y2} r={3.5} fill="var(--rust)" />
    </svg>
  );
}
