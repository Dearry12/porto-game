import { ARCHETYPES } from '@/content/archetypes';
import type { ArchetypeId } from '@/lib/nav/machine';

/**
 * Evidence counts, not bars — decision c2 in CLAUDE.md. "Swift · 3" means
 * three shipped projects demonstrate it, a fact, not a self-rating.
 */
export function PartyPanel({ archetype }: { archetype: ArchetypeId }) {
  const data = ARCHETYPES.find((a) => a.id === archetype);
  if (!data) return null;

  return (
    <div className="b-party">
      {data.party.map(([tool, count]) => (
        <div className="party-row" key={tool}>
          <span>{tool}</span>
          <span className="lv">{count}</span>
        </div>
      ))}
    </div>
  );
}
