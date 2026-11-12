import { useMemo } from 'react';

let cached;

/** True when the browser can create a WebGL context. Result is memoised. */
export function detectWebGL() {
  if (cached !== undefined) return cached;
  if (typeof window === 'undefined') return (cached = false);
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    cached = !!gl;
    if (gl && gl.getExtension) {
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
  } catch {
    cached = false;
  }
  return cached;
}

/**
 * Picks a rendering quality tier from device signals.
 * 'low' trims geometry detail, particle count, shadow resolution and DPR.
 */
export function detectQuality() {
  if (typeof window === 'undefined') return 'low';
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8;
  if (coarse || narrow || cores <= 4 || memory <= 4) return 'low';
  return 'high';
}

export function useWebGLSupport() {
  return useMemo(() => ({ supported: detectWebGL(), quality: detectQuality() }), []);
}
