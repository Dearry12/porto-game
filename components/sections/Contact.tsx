import { ABOUT } from '@/content/about';
import { SectionHead } from '../shell/SectionHead';

export function Contact() {
  return (
    <section id="contact">
      <SectionHead id="contact" title="Contact" />
      <p className="sec-lede">
        If there's something worth building, or you just want to talk architecture and JRPGs, send a message.
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
