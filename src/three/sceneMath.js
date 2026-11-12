/**
 * Pure math helpers for the blueprint-to-reality scene.
 * Everything here is framework-free so it can be unit-tested or reused.
 */

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Hermite smoothstep between e0 and e1. */
export const smoothstep = (e0, e1, x) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/** Frame-rate independent exponential damping. */
export const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));

/* -------------------------------------------------------------------------
   Scroll phases (progress 0 → 1 across the pinned hero)
   A  blueprint        0.00 – 0.12
   B  formation        0.12 – 0.55
   C  full reveal      0.55 – 0.78
   D  pull-away        0.78 – 1.00
------------------------------------------------------------------------- */
export const PHASE = { A_END: 0.12, B_END: 0.55, C_END: 0.78 };

export function phaseState(p) {
  const buildRaw = clamp01((p - PHASE.A_END) / (PHASE.B_END - PHASE.A_END)); // linear, for ordering parts
  const build = smoothstep(PHASE.A_END, PHASE.B_END, p);
  const reveal = smoothstep(PHASE.B_END, PHASE.C_END, p);
  const exit = smoothstep(PHASE.C_END, 1, p);
  // Blueprint lines fade across late B / early C
  const lines = 1 - smoothstep(PHASE.B_END - 0.08, PHASE.C_END - 0.06, p);
  // Overall scene light: some during formation, full at reveal
  const light = 0.35 * build + 0.65 * reveal;
  return { p, buildRaw, build, reveal, exit, lines, light };
}

export function phaseLabel(p) {
  if (p < PHASE.A_END) return { n: '01', name: 'Blueprint' };
  if (p < PHASE.B_END) return { n: '02', name: 'Structural formation' };
  if (p < PHASE.C_END) return { n: '03', name: 'Architectural reveal' };
  return { n: '04', name: 'Marketplace' };
}

/** Piecewise-linear keyframe sampling: frames = [{ at, value: number[] }] */
export function sampleKeyframes(frames, t, out) {
  if (t <= frames[0].at) return out.splice(0, out.length, ...frames[0].value) && out;
  for (let i = 1; i < frames.length; i++) {
    const f0 = frames[i - 1];
    const f1 = frames[i];
    if (t <= f1.at) {
      const k = smoothstep(f0.at, f1.at, t);
      for (let j = 0; j < f0.value.length; j++) out[j] = lerp(f0.value[j], f1.value[j], k);
      return out;
    }
  }
  const last = frames[frames.length - 1].value;
  for (let j = 0; j < last.length; j++) out[j] = last[j];
  return out;
}
