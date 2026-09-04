/**
 * Data model for site content, per docs/MASTER_PROMPT.md §6.
 *
 * Deliberate deviations from that section, all authorized in CLAUDE.md:
 * - Archetype['party'] numbers are project counts, not a 0-100 depth score
 *   (decision c2). The tuple shape is unchanged.
 * - SkillGroup['items'] holds evidence-tied labels instead of percentages
 *   (decision c), so its second tuple element is a string, not a number.
 * - Project gained three optional fields (`tagline`, `body`, `meta`) once
 *   docs/CONTENT.md arrived with full case-study prose, not just the terse
 *   card copy the SPEC's Project interface was sized for. Discarding that
 *   prose down to one `summary` line would have thrown away verified,
 *   verbatim content; `summary` stays as the short card line and `body`
 *   holds the paragraphs, ready for the case-study pages already listed as
 *   future work in MASTER_PROMPT.md §13.
 * - AboutContent grew from three fields to hold the full identity, education,
 *   experience, awards, and interests docs/CONTENT.md supplies. It was sized
 *   for the prototype's three-fact table; the real data is much richer.
 */

export type ArchetypeId = 'mobile' | 'web' | 'software' | 'game';
export type SectionId = 'project' | 'skill' | 'about' | 'contact';

export interface ThreatProof {
  project: string;
  kind: string;
  note: string;
  href?: string;
  shots?: string[];
}

export interface Threat {
  slug: string;
  name: string;
  level: string;
  tagline: string;
  weakness: string;
  body: string[]; // exactly 2 paragraphs
  proof: ThreatProof;
}

export interface LineageStep {
  title: string;
  note: string;
}

export interface Archetype {
  id: ArchetypeId;
  name: string;
  short: string;
  field: string;
  /** [tool name, number of projects that demonstrate it] — see decision c2 in CLAUDE.md. */
  party: Array<[string, number]>;
  lineage: LineageStep[];
  threats: Threat[]; // exactly 3
}

export interface Project {
  slug: string;
  name: string;
  kind: string;
  /** Short card line, e.g. for the project grid. */
  summary: string;
  /** One-line hook from docs/CONTENT.md, e.g. "Membagi satu tagihan untuk empat orang...". */
  tagline?: string;
  /** Full case-study paragraphs, verbatim from docs/CONTENT.md. Not yet rendered anywhere. */
  body?: string[];
  /** Verbatim meta line from docs/CONTENT.md, e.g. "iOS · 2026 · Individu, inisiatif pribadi · Berfungsi penuh". */
  meta?: string;
  stack: string[];
  repo?: string;
  live?: string;
  shots: string[];
  archetypes: ArchetypeId[];
}

export interface SkillGroup {
  label: string;
  /** [tool name, evidence-tied label] — percentages were discarded per decision c in CLAUDE.md. */
  items: Array<[string, string]>;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  graduation: string;
  gpa: string;
  thesis: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  description: string[];
}

export interface Identity {
  name: string;
  role: string;
  location: string;
  /** Quoted verbatim from docs/CONTENT.md, meant for the hub screen under the cascade. */
  hubBlurb: string;
}

export interface AboutContent {
  identity: Identity;
  prose: string[];
  facts: AboutFact[];
  education: EducationEntry;
  experience: ExperienceEntry[];
  /** The "Akademik dan lainnya" bullet list — real work with no full case-study card. */
  academicOther: string[];
  awards: string[];
  /** Each string is one paragraph from the "Minat" section, kept whole rather than split. */
  interests: string[];
  contact: ContactLink[];
}
