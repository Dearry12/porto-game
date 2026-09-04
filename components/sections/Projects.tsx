import { PROJECTS } from '@/content/projects';

/**
 * Server component: this markup is real HTML at build time, present in
 * view-source regardless of navigation state (architecture rule A3). Renders
 * `summary` only — `tagline`/`body`/`meta` are held in content/projects.ts
 * for the case-study pages listed as future work, not this grid.
 */
export function Projects() {
  return (
    <section id="project">
      <div className="sec-head">
        <span className="diamond">◆</span>
        <h2>Project</h2>
      </div>
      <p className="sec-lede">
        Delapan proyek yang saya kerjakan sampai selesai. Sebagian besar punya modul logika yang berdiri sendiri
        tanpa framework antarmuka.
      </p>
      <div className="grid">
        {PROJECTS.map((project) => (
          <article className="cell" key={project.slug}>
            <span className="tag">{project.kind}</span>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <p className="stack-row">{project.stack.join(' · ')}</p>
            {(project.repo || project.live) && (
              <p className="links">
                {project.live && (
                  <a className="lk" href={project.live} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
                {project.repo && (
                  <a className="lk" href={project.repo} target="_blank" rel="noopener noreferrer">
                    Repo
                  </a>
                )}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
