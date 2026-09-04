'use client';

import { useEffect, useState } from 'react';

import { useNavStore } from '@/lib/nav/store';

/**
 * The XOR wordmark knockout from docs/prototype.html is phase 4 work. This is
 * plain text standing in for it so the title screen exists and is navigable
 * now — see CLAUDE.md phase 3 scope ("minimal styling").
 */
export function TitleScreen() {
  const state = useNavStore((s) => s.state);
  const dispatch = useNavStore((s) => s.dispatch);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(matchMedia('(pointer: coarse)').matches);
  }, []);

  if (state.kind !== 'title') return null;

  return (
    <div
      id="s-title"
      className="screen on"
      role="button"
      tabIndex={0}
      onClick={() => dispatch({ type: 'enter' })}
    >
      <h1 className="wm">DERRY MEIRALDY</h1>
      <p className="cue">{isTouch ? 'Ketuk untuk mulai' : 'Tekan tombol apa saja'}</p>
    </div>
  );
}
