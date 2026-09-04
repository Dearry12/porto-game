import { ABOUT } from '@/content/about';
import { SectionHead } from '../shell/SectionHead';

export function About() {
  const { identity, prose, facts, education, experience, academicOther, awards, interests } = ABOUT;

  return (
    <section id="about">
      <SectionHead id="about" title="About" />
      <p className="sec-lede">
        {identity.role} — {identity.location}
      </p>

      <div className="prose">
        {prose.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="facts">
        {facts.map((fact) => (
          <div className="fact" key={fact.label}>
            <span>{fact.label}</span>
            <span>{fact.value}</span>
          </div>
        ))}
      </div>

      <div className="facts">
        <div className="fact">
          <span>Education</span>
          <span>
            {education.degree}, {education.institution} — {education.location}. {education.graduation},{' '}
            {education.gpa}.
          </span>
        </div>
        <div className="fact">
          <span>Thesis</span>
          <span>{education.thesis}</span>
        </div>
      </div>

      <div className="timeline">
        {experience.map((entry) => (
          <div className="fact" key={entry.role + entry.org}>
            <span>{entry.period || entry.org}</span>
            <span>
              <strong>
                {entry.role} — {entry.org}
              </strong>
              {entry.description.map((line) => (
                <p key={line} style={{ marginTop: '0.4rem' }}>
                  {line}
                </p>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className="facts">
        {academicOther.map((line) => (
          <div className="fact" key={line}>
            <span>—</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="facts">
        {awards.map((line) => (
          <div className="fact" key={line}>
            <span>Award</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="prose" style={{ marginTop: '2rem' }}>
        {interests.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
