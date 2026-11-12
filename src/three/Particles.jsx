import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { smoothstep } from './sceneMath';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    vColor = aColor;
    vec3 p = position;
    // Slow, layered drift
    p.y += sin(uTime * 0.18 + aPhase * 6.2831) * 0.35;
    p.x += cos(uTime * 0.12 + aPhase * 3.1415) * 0.25;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (34.0 / -mv.z);
    // Twinkle
    vFade = 0.55 + 0.45 * sin(uTime * 0.9 + aPhase * 12.56);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * uOpacity * vFade);
  }
`;

const PALETTE = [
  new THREE.Color('#F5F3EE'),
  new THREE.Color('#E8DCB4'),
  new THREE.Color('#BFA668'),
  new THREE.Color('#8BAFD0'),
];

/**
 * Lightweight atmospheric particles on a single additive draw call.
 * Motion lives in the vertex shader; only two uniforms change per frame.
 */
export default function Particles({ state, quality }) {
  const count = quality === 'high' ? 420 : 140;
  const matRef = useRef(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const color = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Shell around the building, more density at mid height
      const r = 9 + Math.random() * 16;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.random() * 13 - 1;
      pos[i * 3 + 2] = Math.sin(a) * r * 0.85;
      size[i] = 0.5 + Math.random() * 1.6;
      phase[i] = Math.random();
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      color[i * 3] = c.r; color[i * 3 + 1] = c.g; color[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ gl }) => {
    const m = matRef.current;
    if (!m) return;
    const ph = state.phase;
    m.uniforms.uTime.value = state.elapsed;
    m.uniforms.uPixelRatio.value = gl.getPixelRatio();
    m.uniforms.uOpacity.value = smoothstep(0.4, 1.8, state.elapsed) * (1 - ph.reveal * 0.45) * (1 - ph.exit) * 0.85;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{ uTime: { value: 0 }, uPixelRatio: { value: 1 }, uOpacity: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
