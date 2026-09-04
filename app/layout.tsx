import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Derry Meiraldy',
  description:
    'Mobile & Web Developer, peminat game development. Portfolio dengan navigasi select-not-scroll.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
