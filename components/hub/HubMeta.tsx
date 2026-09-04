import { ABOUT } from '@/content/about';

/**
 * `hubBlurb` from docs/CONTENT.md is explicitly written for this spot
 * ("di bawah kaskade menu") — it belongs here, not in the About section.
 */
export function HubMeta() {
  return (
    <div className="hub-meta" style={{ position: 'absolute', right: '3vw', bottom: '2rem', maxWidth: '32ch' }}>
      <p style={{ fontSize: '0.8rem' }}>{ABOUT.identity.name}</p>
      <p style={{ fontSize: '0.75rem', color: 'var(--parch-dim)', marginBottom: '0.6rem' }}>
        {ABOUT.identity.location}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--parch-dim)', lineHeight: 1.6 }}>{ABOUT.identity.hubBlurb}</p>
    </div>
  );
}
