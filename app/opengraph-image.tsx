import { ImageResponse } from 'next/og';

// Required for `output: 'export'` — this route has no params to be dynamic
// about, but Next still needs the opt-in stated explicitly.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Satori (next/og's renderer) can't reach next/font's build cache — it needs
 * raw font bytes handed to it directly. Fetching Google's CSS API and then
 * the font file it points at is the same fetch-once-at-build-time trick
 * next/font itself uses; it runs in Node during `next build`, never in a
 * visitor's browser, so it doesn't reintroduce the render-blocking Google
 * Fonts request CLAUDE.md's typography section rules out for the site itself.
 */
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype)'\)/);
  if (!match) throw new Error(`${family} font URL not found in Google Fonts CSS response`);
  const fontResponse = await fetch(match[1]!);
  return fontResponse.arrayBuffer();
}

export default async function OpengraphImage() {
  const wordmark = 'MEIRALDY';
  const eyebrow = 'MOBILE & WEB DEVELOPER';
  const tagline = 'A PORTFOLIO NAVIGATED BY SELECT, NOT SCROLL';

  const [bodoniModa, jetBrainsMono] = await Promise.all([
    loadGoogleFont('Bodoni+Moda', 900, wordmark),
    loadGoogleFont('JetBrains+Mono', 500, eyebrow + tagline),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#0C0F22',
          color: '#E3D9C6',
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 8, color: '#8E8574' }}>{eyebrow}</div>
        <div style={{ fontFamily: 'Bodoni Moda', fontWeight: 900, fontSize: 156, lineHeight: 1, marginTop: 24, color: '#E3D9C6' }}>
          {wordmark}
        </div>
        <div style={{ width: 140, height: 2, background: '#C8973F', marginTop: 36 }} />
        <div style={{ fontSize: 26, letterSpacing: 3, color: '#C8973F', marginTop: 28 }}>{tagline}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bodoni Moda', data: bodoniModa, weight: 900, style: 'normal' },
        { name: 'JetBrains Mono', data: jetBrainsMono, weight: 500, style: 'normal' },
      ],
    },
  );
}
