'use client';

import { ARCHETYPES } from '@/content/archetypes';
import { useNavStore } from '@/lib/nav/store';
import type { ArchetypeId } from '@/lib/nav/machine';

/**
 * The four archetypes, staggered per docs/prototype.html rather than placed
 * on a radial arc — DESIGN_TWIST.md §6 keeps this deliberately: variable
 * label lengths break trigonometric placement, and the reference itself
 * uses a stagger, not a circle.
 */
export function CommandFan({ active }: { active: ArchetypeId }) {
  const dispatch = useNavStore((s) => s.dispatch);

  return (
    <div className="b-fan">
      {ARCHETYPES.map((archetype, i) => (
        <button
          key={archetype.id}
          type="button"
          className="fan"
          aria-pressed={archetype.id === active}
          onClick={() => dispatch({ type: 'selectArchetype', id: archetype.id })}
        >
          <span className="key">{i + 1}</span>
          <span>
            <span className="big">{archetype.short}</span>
            <span className="sm">{archetype.field}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
