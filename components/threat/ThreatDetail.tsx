'use client';

import { useNavStore } from '@/lib/nav/store';
import { ARCHETYPES } from '@/content/archetypes';
import { PROJECTS } from '@/content/projects';

/**
 * Full layout per docs/SPEC.md §7: a diagonal band header carrying
 * discipline, level, and obstacle name; a rust-bordered "Weak against"
 * plate; two paragraphs of body copy; a proof panel; navigation to the next
 * obstacle without returning to the field.
 *
 * "Next obstacle" and "View all projects" aren't `warp`/`confirm` events —
 * lib/nav/machine.ts only gives `threat` a `cancel` handler. Both compose
 * existing events instead of adding a new one: cancel restores `battle` with
 * the cursor already on the obstacle just read, so cancel + moveCursor(+1) +
 * confirm lands on the next obstacle, and cancel + cancel + warp reaches a
 * section. Same technique already used for the rail's Start button in
 * components/shell/Rail.tsx.
 */
export function ThreatDetail() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);

  if (state.kind !== 'threat') return null;

  const archetype = ARCHETYPES.find((a) => a.id === state.archetype);
  const threat = archetype?.threats[state.threat];

  if (!archetype || !threat) {
    return (
      <div id="s-threat" className="screen on">
        <p>Obstacle not found.</p>
        <button type="button" className="lk" onClick={() => dispatch({ type: 'cancel' })}>
          Back
        </button>
      </div>
    );
  }

  // Only some proofs name something with its own case-study card — e.g.
  // "The core pattern across every project" and "Laundry management system"
  // don't match any content/projects.ts entry, deliberately (see
  // content/projects.ts's own comment on this asymmetry). No link then, not
  // a broken one.
  const proofProject = PROJECTS.find((p) => p.name === threat.proof.project);

  return (
    <div id="s-threat" className="screen on">
      <div className="t-band">
        <p className="cue">
          {archetype.name} · {threat.level}
        </p>
        <h2>{threat.name}</h2>
        <div className="t-weak">
          <b>Weak against</b>
          <span>{threat.weakness}</span>
        </div>
      </div>

      <div className="t-body">
        <div className="prose">
          {threat.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="t-proof">
          <span className="tag">Proof · {threat.proof.kind}</span>
          <h4>{threat.proof.project}</h4>
          <p>{threat.proof.note}</p>
          {proofProject && (proofProject.repo || proofProject.live) && (
            <p className="links" style={{ marginTop: '0.8rem' }}>
              {proofProject.live && (
                <a className="lk" href={proofProject.live} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              )}
              {proofProject.repo && (
                <a className="lk" href={proofProject.repo} target="_blank" rel="noopener noreferrer">
                  Repo
                </a>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="t-nav">
        <button type="button" className="lk" onClick={() => dispatch({ type: 'cancel' })}>
          Back
        </button>
        <button
          type="button"
          className="lk"
          onClick={() => {
            dispatch({ type: 'cancel' });
            dispatch({ type: 'moveCursor', delta: 1 });
            dispatch({ type: 'confirm' });
          }}
        >
          Next obstacle
        </button>
        <button
          type="button"
          className="lk"
          onClick={() => {
            dispatch({ type: 'cancel' });
            dispatch({ type: 'cancel' });
            dispatch({ type: 'warp', to: 'project' });
          }}
        >
          View all projects
        </button>
      </div>
    </div>
  );
}
