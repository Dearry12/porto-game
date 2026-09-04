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

export const metadata: Metadata = {
  title: 'Derry Meiraldy',
  description:
    'Mobile & Web Developer, peminat game development. Portfolio dengan navigasi select-not-scroll.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${bodoniModa.variable} ${archivoNarrow.variable} ${jetBrainsMono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
