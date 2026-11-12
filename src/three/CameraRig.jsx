import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { sampleKeyframes, damp } from './sceneMath';

/**
 * Scroll-driven camera path with a damped mouse offset layered on top.
 * Scroll owns the base position/target; the mouse only adds a small,
 * spring-smoothed offset, so the two inputs never fight.
 *
 * Keyframes: [posX, posY, posZ, targetX, targetY, targetZ]
 */
const PATH = [
  { at: 0.0,  value: [19.5, 9.0, 23.5, -4.6, 2.6, 0] },   // distant blueprint approach
  { at: 0.12, value: [18.5, 8.2, 22.0, -4.4, 2.6, 0] },
  { at: 0.55, value: [17.5, 7.0, 20.5, -2.6, 2.8, 0] },   // formation
  { at: 0.78, value: [19.0, 6.4, 21.0, -1.0, 3.0, 0] },   // three-quarter reveal
  { at: 1.0,  value: [27.0, 13.5, 32.0, -0.6, 2.2, 0] },  // pull away
];

export default function CameraRig({ state }) {
  const { camera, size } = useThree();
  const tmp = useMemo(() => [0, 0, 0, 0, 0, 0], []);
  const pos = useRef(new THREE.Vector3(19.5, 9.0, 23.5));
  const target = useRef(new THREE.Vector3(-4.6, 2.6, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((_, dt) => {
    const p = state.phase.p;
    sampleKeyframes(PATH, p, tmp);

    // Portrait / narrow viewports: back the camera off so the villa fits
    const aspect = size.width / Math.max(1, size.height);
    // Portrait screens have a much narrower horizontal FOV, so pull back further
    const dist = aspect < 0.7 ? 2.0 : aspect < 1 ? 1.55 : aspect < 1.4 ? 1.12 : 1;
    const portrait = aspect < 1;

    mouse.current.x = damp(mouse.current.x, state.mouse.x, 3.2, dt);
    mouse.current.y = damp(mouse.current.y, state.mouse.y, 3.2, dt);

    const px = tmp[0] * dist + mouse.current.x * 1.3;
    const py = tmp[1] * dist + mouse.current.y * 0.7;
    const pz = tmp[2] * dist + mouse.current.x * 0.4;
    // Portrait: centre the villa horizontally and sit it in the lower half, below the copy
    const tx = portrait ? -1.6 : tmp[3];
    const ty = tmp[4] + (portrait ? 3.2 : 0);

    const lambda = 5;
    pos.current.x = damp(pos.current.x, px, lambda, dt);
    pos.current.y = damp(pos.current.y, py, lambda, dt);
    pos.current.z = damp(pos.current.z, pz, lambda, dt);
    target.current.x = damp(target.current.x, tx, lambda, dt);
    target.current.y = damp(target.current.y, ty, lambda, dt);
    target.current.z = damp(target.current.z, tmp[5], lambda, dt);

    camera.position.copy(pos.current);
    camera.lookAt(target.current);
  });

  return null;
}
