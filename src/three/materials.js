import * as THREE from 'three';

export const COLORS = {
  ivory: '#F5F3EE',
  charcoal: '#171A1D',
  navy: '#172331',
  stage: '#0E141B',
  gold: '#BFA668',
  goldLight: '#E8DCB4',
  blueprint: '#8BAFD0',
  grey: '#D9D8D3',
};

/**
 * Base materials. Every part gets its own clone so opacity, envMapIntensity
 * and emissive strength can be animated per part without side effects.
 */
export function createBaseMaterials() {
  const std = (color, roughness, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, transparent: true, opacity: 0 });

  const glass = new THREE.MeshPhysicalMaterial({
    color: '#A9C9DF',
    roughness: 0.06,
    metalness: 0.08,
    transparent: true,
    opacity: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    reflectivity: 1,
    envMapIntensity: 1.5,
    depthWrite: false,
  });

  const water = new THREE.MeshPhysicalMaterial({
    color: '#3E7C9F',
    roughness: 0.04,
    metalness: 0.25,
    transparent: true,
    opacity: 0,
    clearcoat: 1,
    envMapIntensity: 1.8,
  });

  const glow = new THREE.MeshBasicMaterial({
    color: '#F6E3B8',
    transparent: true,
    opacity: 0,
    toneMapped: false,
  });

  return {
    concrete: std('#C4BEB1', 0.82),
    stone: std('#AFA796', 0.92),
    stoneDark: std('#6F675B', 0.9),
    charcoal: std('#2B2F34', 0.45, 0.65),
    wood: std('#B98C5E', 0.7),
    foliage: std('#33503A', 1),
    glass,
    water,
    glow,
  };
}

/** Target opacity once a part is fully "built". */
export const TARGET_OPACITY = {
  glass: 0.34,
  water: 0.88,
  glow: 0.9,
};

export function makeLineMaterial(dashSize = 20) {
  return new THREE.LineDashedMaterial({
    color: COLORS.blueprint,
    transparent: true,
    opacity: 0,
    dashSize,
    gapSize: dashSize,
    depthWrite: false,
  });
}
