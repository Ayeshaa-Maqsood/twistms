import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { buildVillaParts } from './villaParts';
import { createBaseMaterials, makeLineMaterial, TARGET_OPACITY } from './materials';
import { smoothstep, damp } from './sceneMath';

const DASH = 20; // longer than the longest edge, so dashOffset sweeps a full draw

/**
 * Renders the procedural villa twice per part: a blueprint edge drawing
 * (LineSegments with an animated dash offset) and the solid mesh whose
 * opacity, elevation and lighting are driven by the scroll phase.
 *
 * Nothing here allocates per frame; all transforms are written directly to
 * the Three objects from the shared scene state.
 */
export default function Villa({ state, quality }) {
  const groupRef = useRef(null);
  const rotRef = useRef({ y: 0 });

  const parts = useMemo(() => buildVillaParts(quality === 'high' ? 'high' : 'low'), [quality]);
  const base = useMemo(() => createBaseMaterials(), []);

  // Build geometry + materials once
  const built = useMemo(() => {
    return parts.map((part) => {
      const geometry = new THREE.BoxGeometry(part.size[0], part.size[1], part.size[2]);
      const edges = new THREE.EdgesGeometry(geometry, 15);
      const material = base[part.mat].clone();
      const lineMaterial = makeLineMaterial(DASH);
      const line = new THREE.LineSegments(edges, lineMaterial);
      line.computeLineDistances();
      line.position.set(part.pos[0], part.pos[1], part.pos[2]);
      return { part, geometry, edges, material, lineMaterial, line, targetOpacity: TARGET_OPACITY[part.mat] ?? 1 };
    });
  }, [parts, base]);

  const meshRefs = useRef([]);

  // Dispose GPU resources on unmount
  useEffect(() => {
    return () => {
      built.forEach((b) => {
        b.geometry.dispose();
        b.edges.dispose();
        b.material.dispose();
        b.lineMaterial.dispose();
      });
      Object.values(base).forEach((m) => m.dispose());
    };
  }, [built, base]);

  useFrame((_, dt) => {
    const ph = state.phase;
    const t = state.elapsed;
    const group = groupRef.current;
    if (!group) return;

    // Slow base turn across the scroll, plus a damped mouse response
    const targetRot = -0.12 + ph.p * 0.3 + state.mouse.x * 0.09;
    rotRef.current.y = damp(rotRef.current.y, targetRot, 4, dt);
    group.rotation.y = rotRef.current.y;

    const env = 0.7 * ph.light;
    const dimLines = ph.lines;

    for (let i = 0; i < built.length; i++) {
      const b = built[i];
      const mesh = meshRefs.current[i];
      const phase = b.part.phase;

      // Blueprint drawing (time-based at load), ordered by phase
      const drawn = smoothstep(phase * 1.8, phase * 1.8 + 0.8, t);
      // Solidification (scroll-based), ordered by phase
      const solid = smoothstep(phase * 0.74, phase * 0.74 + 0.26, ph.buildRaw);

      // ---- lines
      const lineAlpha = drawn * (1 - solid * 0.85) * dimLines * 0.95;
      b.lineMaterial.opacity = lineAlpha;
      b.lineMaterial.dashOffset = DASH * (1 - drawn);
      b.line.visible = lineAlpha > 0.015;

      // ---- solid mesh
      if (mesh) {
        const isGlow = b.part.mat === 'glow';
        const alpha = isGlow ? solid * b.targetOpacity * (0.15 + 0.85 * ph.reveal) : solid * b.targetOpacity;
        b.material.opacity = alpha;
        mesh.visible = alpha > 0.01;
        // Opaque parts stop being "transparent" once built (better depth sorting)
        if (!isGlow && b.targetOpacity === 1) b.material.transparent = alpha < 0.995;
        if (b.material.envMapIntensity !== undefined && !isGlow) {
          b.material.envMapIntensity = b.part.mat === 'glass' || b.part.mat === 'water' ? 0.4 + env * 2.2 : env;
        }
        // Rise into place as it solidifies
        mesh.position.y = b.part.pos[1] - (1 - solid) * 0.6;
      }
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0.6]}>
      {built.map((b, i) => (
        <React.Fragment key={b.part.key}>
          <primitive object={b.line} />
          <mesh
            ref={(el) => (meshRefs.current[i] = el)}
            geometry={b.geometry}
            material={b.material}
            position={b.part.pos}
            castShadow={b.part.shadow !== false && quality === 'high'}
            receiveShadow={b.part.shadow !== false}
            visible={false}
          />
        </React.Fragment>
      ))}
    </group>
  );
}
