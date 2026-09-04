import { SECTION_ORDER } from '@/lib/nav/machine';
import type { SectionId } from '@/lib/nav/machine';
import { Halftone } from './Halftone';

/**
 * Shared section header. The "0N/04" index is a drafting mark with a real
 * value (CLAUDE.md section 3b: "these must carry real values, not
 * decorative gibberish") — it's this section's actual position in
 * SECTION_ORDER out of the actual section count, not a made-up label.
 */
export function SectionHead({ id, title }: { id: SectionId; title: string }) {
  const index = SECTION_ORDER.indexOf(id) + 1;
  const label = `${String(index).padStart(2, '0')}/${String(SECTION_ORDER.length).padStart(2, '0')}`;
  return (
    <div className="sec-head">
      <Halftone />
      <span className="sec-index">{label}</span>
      <h2>{title}</h2>
    </div>
  );
}
