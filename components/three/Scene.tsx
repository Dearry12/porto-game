'use client';

import { Canvas } from '@react-three/fiber';

import { FocalObject } from './FocalObject';

/**
 * The whole 3D layer, per CLAUDE.md phase 6: "adds atmosphere and removing
 * the whole three/ folder does not break navigation." Nothing in lib/nav/ or
 * the shell reaches into this file — it only reads nav state one-way via
 * FocalObject's useNavStore.getState() call. Deleting the folder and the
 * `<Scene />` line that renders it is the whole removal.
 *
 * Unlit materials only (MeshBasicMaterial, LineBasicMaterial), matching
 * docs/prototype.html's own approach — no lights to set up, one fewer thing
 * to get wrong.
 */
export function Scene() {
  return (
    <Canvas
      camera={{ fov: 42, position: [0, 0, 6.2] }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
    >
      <FocalObject />
    </Canvas>
  );
}
