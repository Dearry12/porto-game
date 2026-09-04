'use client';

import { ARCHETYPES } from '@/content/archetypes';
import { useNavStore } from '@/lib/nav/store';
import type { ArchetypeId } from '@/lib/nav/machine';
import { Sigil } from './Sigil';

/** Ported verbatim from docs/prototype.html's SPOTS — three fixed field positions. */
const SPOTS = [
  { top: '16%', right: '7%', scale: 1 },
  { top: '41%', right: '34%', scale: 0.86 },
  { top: '63%', right: '9%', scale: 0.95 },
];

export function ThreatField({ archetype, cursor }: { archetype: ArchetypeId; cursor: number }) {
  const dispatch = useNavStore((s) => s.dispatch);
  const archetypeIndex = ARCHETYPES.findIndex((a) => a.id === archetype);
  const data = ARCHETYPES[archetypeIndex];
  if (!data) return null;

  return (
    <div className="b-threats">
      {data.threats.map((threat, i) => {
        const spot = SPOTS[i] ?? SPOTS[0]!;
        return (
          <button
            key={threat.slug}
            type="button"
            className={`threat${i === cursor ? ' sel' : ''}`}
            style={{ top: spot.top, right: spot.right, transform: `scale(${spot.scale})` }}
            onClick={() => {
              dispatch({ type: 'moveCursor', delta: i - cursor });
              dispatch({ type: 'confirm' });
            }}
          >
            <span className="halo">
              <Sigil archetypeIndex={archetypeIndex} threatIndex={i} />
            </span>
            <span className="tie" />
            <span className="plate">
              <span className="nm">{threat.name}</span>
              <span className="lv">{threat.level}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
