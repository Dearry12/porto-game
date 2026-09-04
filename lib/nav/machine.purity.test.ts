import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/**
 * Architecture rule A1, enforced instead of merely documented.
 *
 * The zero-import rule on the navigation machine is the load-bearing claim of
 * this repository, and it is the kind of rule that erodes through one reasonable
 * exception at a time. A failing test is a cheaper reminder than a code review.
 */
describe('machine.ts stays pure', () => {
  const source = readFileSync(fileURLToPath(new URL('./machine.ts', import.meta.url)), 'utf8');

  it('contains no import statement', () => {
    expect(source).not.toMatch(/^\s*import\b/m);
  });

  it('contains no dynamic import, require, or module-level side channel', () => {
    expect(source).not.toMatch(/\brequire\s*\(/);
    expect(source).not.toMatch(/\bimport\s*\(/);
    expect(source).not.toMatch(/\bexport\s+.*\bfrom\b/);
  });

  it('reaches for no browser or platform global', () => {
    for (const global of ['window', 'document', 'localStorage', 'sessionStorage', 'process', 'globalThis']) {
      expect(source).not.toMatch(new RegExp(`\\b${global}\\b`));
    }
  });

  it('draws no randomness and reads no clock, so a transition is reproducible', () => {
    expect(source).not.toMatch(/Math\.random/);
    expect(source).not.toMatch(/\bDate\b/);
    expect(source).not.toMatch(/performance\.now/);
  });
});
