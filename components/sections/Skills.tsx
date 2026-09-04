import { SKILLS } from '@/content/skills';
import { SectionHead } from '../shell/SectionHead';

export function Skills() {
  return (
    <section id="skill">
      <SectionHead id="skill" title="Skill" />
      <p className="sec-lede">
        Tanpa persentase. Tiap baris membawa buktinya sendiri.
      </p>
      <div className="stats">
        {SKILLS.map((group) => (
          <div className="stat-group" key={group.label}>
            <h4>{group.label}</h4>
            {group.items.map(([tools, evidence]) => (
              <div className="stat-row" key={tools}>
                <span className="tools">{tools}</span>
                {evidence && <span className="evidence">{evidence}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
