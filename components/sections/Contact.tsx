import { ABOUT } from '@/content/about';
import { SectionHead } from '../shell/SectionHead';

export function Contact() {
  return (
    <section id="contact">
      <SectionHead id="contact" title="Contact" />
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
