import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Villa from './Villa';
import OrbitRings from './OrbitRings';
import Particles from './Particles';
import CameraRig from './CameraRig';
import { Environment, Lights, Ground, LocationMarker, Dimensions } from './Stage';
import { phaseState } from './sceneMath';

/**
 * Reads the shared motion values once per frame and writes the derived
 * phase / mouse / time into `state`, which every scene component consumes.
 * This is the single coordination point for scroll + mouse + time, so the
 * two inputs never compete for the same object properties.
 */
function StateDriver({ state, progress, mouseX, mouseY, frozenProgress }) {
  const start = useRef(null);
  useFrame(({ clock }) => {
    if (start.current === null) start.current = clock.elapsedTime;
    state.elapsed = frozenProgress !== null ? 10 : clock.elapsedTime - start.current;
    const p = frozenProgress !== null ? frozenProgress : progress.get();
    state.phase = phaseState(p);
    state.mouse.x = mouseX.get();
    state.mouse.y = mouseY.get();
  });
  return null;
}

/** In demand mode (reduced motion), request ~1.5s of frames so damping settles, then idle. */
function FrozenPump({ active }) {
  const left = useRef(90);
  useFrame(({ invalidate }) => {
    if (!active || left.current <= 0) return;
    left.current -= 1;
    invalidate();
  });
  return null;
}

/**
 * The 3D hero scene. Lazy-loaded by the hero section so Three only ships
 * when the homepage renders. `active` is controlled by the parent so the
 * renderer idles while the hero is off-screen.
 */
export default function HeroScene({
  progress,
  mouseX,
  mouseY,
  quality = 'high',
  active = true,
  frozenProgress = null,
  labelEls,
}) {
  const stateRef = useRef({ phase: phaseState(0), mouse: { x: 0, y: 0 }, elapsed: 0 });
  const state = stateRef.current;
  const frozen = frozenProgress !== null;
  const frameloop = frozen ? 'demand' : active ? 'always' : 'never';

  return (
    <Canvas
      frameloop={frameloop}
      shadows={quality === 'high'}
      dpr={quality === 'high' ? [1, 1.75] : [1, 1.4]}
      camera={{ fov: 36, near: 0.5, far: 140, position: [19.5, 9.0, 23.5] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <StateDriver state={state} progress={progress} mouseX={mouseX} mouseY={mouseY} frozenProgress={frozenProgress} />
      <FrozenPump active={frozen} />
      <Environment />
      <Lights state={state} quality={quality} />
      <Ground state={state} />
      <CameraRig state={state} />
      <Villa state={state} quality={quality} />
      <OrbitRings state={state} quality={quality} />
      <Particles state={state} quality={quality} />
      <LocationMarker state={state} />
      <Dimensions state={state} labelEls={labelEls} />
    </Canvas>
  );
}
