import { NavShell } from '@/components/shell/NavShell';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

/**
 * Server component: everything inside <main> below is rendered to real HTML
 * at build time, unconditionally — architecture rule A3. NavShell (client)
 * only adds the interactive overlay on top of it.
 */
export default function Home() {
  return (
    <NavShell>
      <main>
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
    </NavShell>
  );
}
