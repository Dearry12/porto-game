import type { Metadata } from 'next';
import { Bodoni_Moda, Archivo_Narrow, JetBrains_Mono } from 'next/font/google';

import './globals.css';

/**
 * next/font downloads these at build time and serves them from this site's
 * own origin — that's what "self-hosted" in CLAUDE.md means in practice, with
 * no manual WOFF2 files or a render-blocking request to Google's servers.
 *
 * Weight is pinned per CLAUDE.md section 3b's type scale: display is always
 * 900, and only ever used at 40px or larger — the outline of Bodoni Moda's
 * hairline strokes disappears below that.
 */
const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-display',
  display: 'swap',
});

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// No metadataBase yet: unset, it defaults to localhost during build (the
// warning `next build` prints), which is harmless while the site isn't
// deployed anywhere. TODO once a real production URL exists (Vercel's
// assigned domain or a custom one) — set metadataBase: new URL(...) here so
// og:image/twitter:image resolve to absolute URLs that actually work when
// shared. Not invented now; CLAUDE.md rules out guessing URLs that haven't
// been given.
export const metadata: Metadata = {
  title: 'Derry Meiraldy',
  description: 'Mobile & Web Developer, game development enthusiast. A portfolio navigated by select, not scroll.',
  openGraph: {
    title: 'Derry Meiraldy',
    description: 'Mobile & Web Developer, game development enthusiast. A portfolio navigated by select, not scroll.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derry Meiraldy',
    description: 'Mobile & Web Developer, game development enthusiast. A portfolio navigated by select, not scroll.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${archivoNarrow.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
