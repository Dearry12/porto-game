'use client';

import { useEffect, useState } from 'react';

import { useNavStore } from '@/lib/nav/store';
import { InkField } from '../shell/InkField';
import { RegistrationMarks } from '../shell/RegistrationMarks';
import { Wordmark } from './Wordmark';

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
      <InkField seed={2} />
      <RegistrationMarks />
      <Wordmark />
      <p className="cue">{isTouch ? 'Tap to start' : 'Press any key to start'}</p>
      <p className="build-line">v0.1.0 · 2026</p>
    </div>
  );
}
