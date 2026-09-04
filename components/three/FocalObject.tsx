'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useNavStore } from '@/lib/nav/store';

/**
 * Per-state target: opacity, how far right it sits, and how large it is.
 * Ported from docs/prototype.html's own target values (title 0.5, hub 0.28,
 * elsewhere 0.05), adjusted for DESIGN_TWIST.md §6:
 * - title: "behind and cropped by the frame edge... the slot a character
 *   portrait would take... do not centre it" — offset right, not centred.
 * - hub: decision (f) in CLAUDE.md — "fill more of the frame with low
 *   opacity behind the cascade", not a separate object on the right. Bigger
 *   scale, lower opacity than title.
 * - everything else: nearly invisible, matching the prototype's own 0.05.
 */
const TARGETS: Record<string, { opacity: number; x: number; scale: number }> = {
  title: { opacity: 0.5, x: 2.4, scale: 1.15 },
  hub: { opacity: 0.22, x: 1.6, scale: 1.55 },
  default: { opacity: 0.04, x: 2.4, scale: 1 },
};

export function FocalObject() {
  const wireRef = useRef<THREE.LineSegments>(null);
  const solidRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);
  const scaleRef = useRef(1);
  const xRef = useRef(2.4);

  const geometry = useRef(new THREE.IcosahedronGeometry(2.1, 1)).current;

  // Queried once and kept current via a change listener, rather than calling
  // matchMedia() on every frame — cheap either way, but there's no reason to
  // re-parse a media query 60 times a second when a listener tells us when
  // it actually changes.
  const reducedRef = useRef(false);
  useEffect(() => {
    const mql = matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mql.matches;
    const onChange = () => {
      reducedRef.current = mql.matches;
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useFrame((frameState, delta) => {
    // Reads the store without subscribing — the one reason this project uses
    // Zustand over React Context (lib/nav/store.ts's own doc comment).
    // Subscribing here would re-render this component on every nav change;
    // getState() just reads the current value on this frame's tick.
    const state = useNavStore.getState().state;
    const target = TARGETS[state.kind] ?? TARGETS.default!;

    const reduced = reducedRef.current;
    const spin = reduced ? 0.06 : 0.32;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * spin;
      groupRef.current.rotation.x = Math.sin(frameState.clock.elapsedTime * (reduced ? 0.06 : 0.6)) * 0.22;
    }

    opacityRef.current += (target.opacity - opacityRef.current) * 0.05;
    scaleRef.current += (target.scale - scaleRef.current) * 0.05;
    xRef.current += (target.x - xRef.current) * 0.05;

    if (wireRef.current) {
      (wireRef.current.material as THREE.LineBasicMaterial).opacity = opacityRef.current;
    }
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
      groupRef.current.position.x = xRef.current;
    }
  });

  return (
    // Position/scale set explicitly here too, matching the refs' initial
    // values (2.4, 1) — without this, the group sits at three.js's own
    // default (0,0,0 / scale 1) for whatever the first render is, and only
    // useFrame's lerp nudges it toward 2.4 from there. Explicit props mean
    // the very first frame is already in the right spot.
    <group ref={groupRef} position={[2.4, 0, 0]} scale={1}>
      <mesh ref={solidRef} geometry={geometry}>
        <meshBasicMaterial color="#0c0f22" />
      </mesh>
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#c8973f" transparent opacity={0} />
      </lineSegments>
    </group>
  );
}
