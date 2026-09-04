import { SKILLS } from '@/content/skills';

export function Skills() {
  return (
    <section id="skill">
      <div className="sec-head">
        <span className="diamond">◆</span>
        <h2>Skill</h2>
      </div>
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
