import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { COLORS } from './materials';
import { lerp, smoothstep, damp } from './sceneMath';

const RINGS = [
  { radius: 8.4, tiltA: 1.12, tiltC: 1.42, speed: 0.10, color: COLORS.gold, emissive: 0.35, alpha: 0.9, offset: 0.0 },
  { radius: 10.8, tiltA: 0.72, tiltC: 1.22, speed: -0.065, color: COLORS.blueprint, emissive: 0.45, alpha: 0.75, offset: 2.1 },
  { radius: 6.9, tiltA: 1.35, tiltC: 1.52, speed: 0.15, color: COLORS.gold, emissive: 0.2, alpha: 0.5, offset: 4.0, highOnly: true },
];

/**
 * Three thin orbital rings around the villa. Each ring sits on a pivot that
 * precesses around world-Y, so the tilted ring appears to orbit. Tilt,
 * opacity and scale follow the scroll phase; the group leans with the mouse.
 */
export default function OrbitRings({ state, quality }) {
  const groupRef = useRef(null);
  const lean = useRef({ x: 0, z: 0 });
  const rings = useMemo(() => RINGS.filter((r) => quality === 'high' || !r.highOnly), [quality]);

  const objects = useMemo(
    () =>
      rings.map((r) => {
        const geometry = new THREE.TorusGeometry(r.radius, 0.022, 8, quality === 'high' ? 180 : 110);
        const material = new THREE.MeshStandardMaterial({
          color: r.color,
          emissive: r.color,
          emissiveIntensity: r.emissive,
          metalness: 0.85,
          roughness: 0.3,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const bead = new THREE.SphereGeometry(0.09, 12, 12);
        const beadMat = new THREE.MeshBasicMaterial({ color: COLORS.goldLight, transparent: true, opacity: 0, toneMapped: false });
        return { r, geometry, material, bead, beadMat };
      }),
    [rings, quality]
  );

  useEffect(
    () => () => objects.forEach((o) => { o.geometry.dispose(); o.material.dispose(); o.bead.dispose(); o.beadMat.dispose(); }),
    [objects]
  );

  const pivotRefs = useRef([]);
  const ringRefs = useRef([]);

  useFrame((_, dt) => {
    const ph = state.phase;
    const t = state.elapsed;
    const g = groupRef.current;
    if (!g) return;

    lean.current.x = damp(lean.current.x, state.mouse.y * 0.07, 3, dt);
    lean.current.z = damp(lean.current.z, -state.mouse.x * 0.06, 3, dt);
    g.rotation.x = lean.current.x;
    g.rotation.z = lean.current.z;

    const intro = smoothstep(0.9, 2.4, t);
    const scale = 1 + ph.exit * 0.5;
    g.scale.setScalar(scale);
    g.position.y = lerp(3.4, 2.9, ph.reveal) + ph.exit * 0.6;

    for (let i = 0; i < objects.length; i++) {
      const { r, material, beadMat } = objects[i];
      const pivot = pivotRefs.current[i];
      const ring = ringRefs.current[i];
      if (!pivot || !ring) continue;
      pivot.rotation.y = r.offset + t * r.speed * (1 + ph.exit * 0.6);
      ring.rotation.x = lerp(r.tiltA, r.tiltC, ph.reveal);
      const alpha = intro * r.alpha * (1 - ph.exit * 0.8);
      material.opacity = alpha;
      beadMat.opacity = alpha;
      ring.visible = alpha > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[-0.6, 3.4, 0]}>
      {objects.map((o, i) => (
        <group key={i} ref={(el) => (pivotRefs.current[i] = el)}>
          <group ref={(el) => (ringRefs.current[i] = el)}>
            <mesh geometry={o.geometry} material={o.material} />
            {/* Orbiting bead on the ring */}
            <mesh geometry={o.bead} material={o.beadMat} position={[o.r.radius, 0, 0]} />
          </group>
        </group>
      ))}
    </group>
  );
}
