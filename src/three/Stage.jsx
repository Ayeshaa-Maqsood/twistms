import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { COLORS } from './materials';
import { DIMENSIONS } from './dimensions';
import { smoothstep } from './sceneMath';

/* ------------------------------------------------------------------------
   Image-based lighting without any asset: Three's procedural RoomEnvironment
   pre-filtered through PMREM. Gives the glass and steel real reflections.
------------------------------------------------------------------------ */
export function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ------------------------------------------------------------------------
   Lights that brighten with the transformation
------------------------------------------------------------------------ */
export function Lights({ state, quality }) {
  const key = useRef(null);
  const fill = useRef(null);
  const amb = useRef(null);
  const hemi = useRef(null);

  useFrame(() => {
    const L = state.phase.light;
    if (key.current) key.current.intensity = 2.6 * L;
    if (fill.current) fill.current.intensity = 0.3 + 0.5 * L;
    if (amb.current) amb.current.intensity = 0.1 + 0.25 * L;
    if (hemi.current) hemi.current.intensity = 0.1 + 0.35 * L;
  });

  const shadowSize = quality === 'high' ? 2048 : 1024;

  return (
    <>
      <ambientLight ref={amb} intensity={0.14} color="#DCE4EE" />
      <hemisphereLight ref={hemi} intensity={0.12} color={COLORS.blueprint} groundColor="#1A1F26" />
      <directionalLight
        ref={key}
        color="#FFE7C4"
        intensity={0}
        position={[13, 17, 10]}
        castShadow={quality === 'high'}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={2}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <directionalLight ref={fill} color={COLORS.blueprint} intensity={0.35} position={[-14, 8, -8]} />
    </>
  );
}

/* ------------------------------------------------------------------------
   Floor, blueprint grid and fog
------------------------------------------------------------------------ */
export function Ground({ state }) {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(80, 80, COLORS.blueprint, COLORS.blueprint);
    g.material.transparent = true;
    g.material.opacity = 0;
    g.material.depthWrite = false;
    g.position.y = 0.012;
    return g;
  }, []);
  const gridFine = useMemo(() => {
    const g = new THREE.GridHelper(80, 320, COLORS.blueprint, COLORS.blueprint);
    g.material.transparent = true;
    g.material.opacity = 0;
    g.material.depthWrite = false;
    g.position.y = 0.01;
    return g;
  }, []);
  useEffect(
    () => () => {
      grid.geometry.dispose();
      grid.material.dispose();
      gridFine.geometry.dispose();
      gridFine.material.dispose();
    },
    [grid, gridFine]
  );

  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.Fog(COLORS.stage, 34, 80);
    scene.background = new THREE.Color(COLORS.stage);
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  useFrame(() => {
    const ph = state.phase;
    const intro = smoothstep(0.0, 1.4, state.elapsed);
    grid.material.opacity = intro * 0.32 * (1 - ph.reveal) * (1 - ph.exit);
    gridFine.material.opacity = intro * 0.08 * (1 - ph.build * 0.6) * (1 - ph.reveal);
  });

  return (
    <>
      <primitive object={grid} />
      <primitive object={gridFine} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#121920" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------------
   Location marker that drops in at the full reveal
------------------------------------------------------------------------ */
export function LocationMarker({ state }) {
  const ref = useRef(null);
  const ringRef = useRef(null);
  useFrame(() => {
    const ph = state.phase;
    const s = smoothstep(0.45, 0.95, ph.reveal) * (1 - ph.exit * 0.4);
    const g = ref.current;
    if (!g) return;
    g.visible = s > 0.01;
    g.scale.setScalar(s);
    g.position.y = 9.6 + Math.sin(state.elapsed * 1.4) * 0.12 + (1 - s) * 2;
    if (ringRef.current) {
      const k = (state.elapsed * 0.6) % 1;
      ringRef.current.scale.setScalar(0.6 + k * 1.6);
      ringRef.current.material.opacity = (1 - k) * 0.7;
    }
  });
  return (
    <group ref={ref} position={[-0.6, 9.6, 0]} visible={false}>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.6, 6]} />
        <meshBasicMaterial color={COLORS.gold} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial color={COLORS.gold} emissive={COLORS.gold} emissiveIntensity={0.9} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
        <ringGeometry args={[0.5, 0.56, 48]} />
        <meshBasicMaterial color={COLORS.gold} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------------
   Dimension annotations (blueprint phase): 3D guide lines, plus projection
   of label anchors onto DOM elements owned by the overlay (`labelEls`).
------------------------------------------------------------------------ */
export function Dimensions({ state, labelEls }) {
  const { camera, size } = useThree();
  const groupRef = useRef(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  const wp = useMemo(() => new THREE.Vector3(), []);
  const wq = useMemo(() => new THREE.Quaternion(), []);

  const lines = useMemo(
    () =>
      DIMENSIONS.map((d) => {
        const a = new THREE.Vector3(...d.a);
        const b = new THREE.Vector3(...d.b);
        const dir = b.clone().sub(a).normalize();
        const tick = Math.abs(dir.y) > 0.9 ? new THREE.Vector3(0.35, 0, 0) : new THREE.Vector3(0, 0.35, 0);
        const pts = [a.clone().sub(tick), a.clone().add(tick), a, b, b.clone().sub(tick), b.clone().add(tick)];
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        const m = new THREE.LineBasicMaterial({ color: COLORS.blueprint, transparent: true, opacity: 0, depthWrite: false });
        return { geometry: g, material: m, line: new THREE.LineSegments(g, m) };
      }),
    []
  );
  useEffect(
    () => () =>
      lines.forEach((l) => {
        l.geometry.dispose();
        l.material.dispose();
      }),
    [lines]
  );

  useFrame(() => {
    const ph = state.phase;
    const alpha = smoothstep(1.2, 2.4, state.elapsed) * (1 - smoothstep(0.0, 0.5, ph.buildRaw)) * 0.85;
    for (let i = 0; i < lines.length; i++) lines[i].material.opacity = alpha;

    const g = groupRef.current;
    const els = labelEls?.current;
    if (!g || !els) return;
    g.getWorldQuaternion(wq);
    g.getWorldPosition(wp);
    for (let i = 0; i < DIMENSIONS.length; i++) {
      const el = els[i];
      if (!el) continue;
      const d = DIMENSIONS[i];
      v.set(d.at[0], d.at[1], d.at[2]).applyQuaternion(wq).add(wp).project(camera);
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (-v.y * 0.5 + 0.5) * size.height;
      const visible = v.z < 1 && alpha > 0.02;
      el.style.opacity = visible ? alpha.toFixed(3) : '0';
      el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0.6]}>
      {lines.map((l, i) => (
        <primitive key={i} object={l.line} />
      ))}
    </group>
  );
}
