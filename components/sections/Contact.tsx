import { ABOUT } from '@/content/about';

export function Contact() {
  return (
    <section id="contact">
      <div className="sec-head">
        <span className="diamond">◆</span>
        <h2>Contact</h2>
      </div>
      <p className="sec-lede">
        Kalau ada yang ingin dibangun, atau sekadar ingin membahas arsitektur dan JRPG, silakan kirim pesan.
      </p>
      <div className="links">
        {ABOUT.contact.map((link) => (
          <a
            className="lk"
            key={link.label}
            href={link.href}
            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
