/**
 * Procedural contemporary villa.
 *
 * The building is described as a list of box "parts" in metres, Y-up, with
 * the entrance front facing +Z. Each part carries a `phase` (0 → 1) that
 * orders both the blueprint line-drawing and the wireframe-to-solid
 * transformation: foundations first, roof and interior light last.
 *
 * Materials (see materials.js): concrete | stone | stoneDark | charcoal |
 * wood | glass | water | glow | foliage
 *
 * Composition
 *   - Plinth / terrace with pool and front steps
 *   - Ground-floor glass pavilion (mullioned curtain wall, solid west wall)
 *   - East stone service block with entrance canopy
 *   - Vertical stair core rising above the roof
 *   - Cantilevered upper floor over the pool, timber slat screen, balcony
 *   - Roof slab with fascia, skylight, slim steel columns
 *   - Low garden wall and planters
 */

const P = (key, pos, size, mat, phase, extra = {}) => ({ key, pos, size, mat, phase, ...extra });

const range = (from, to, step) => {
  const out = [];
  for (let v = from; v <= to + 1e-6; v += step) out.push(+v.toFixed(3));
  return out;
};

export function buildVillaParts(detail = 'high') {
  const hi = detail === 'high';
  const parts = [];

  /* ---------------- Plinth, terrace, pool ---------------- */
  parts.push(P('plinth', [0, 0.15, 0], [19.2, 0.3, 14], 'stone', 0));
  parts.push(P('steps', [2.5, 0.02, 7.5], [6, 0.18, 1.0], 'stone', 0.02));
  parts.push(P('steps2', [2.5, -0.06, 8.3], [6, 0.12, 0.7], 'stone', 0.03));
  parts.push(P('pool-coping', [-6, 0.33, 3.4], [5.6, 0.1, 3.4], 'charcoal', 0.06));
  parts.push(P('pool-water', [-6, 0.36, 3.4], [5.2, 0.04, 3.0], 'water', 0.95, { shadow: false }));

  /* ---------------- Ground-floor glass pavilion ---------------- */
  parts.push(P('gf-floor', [-1, 0.42, 0], [10.4, 0.25, 7.4], 'concrete', 0.08));
  parts.push(P('gf-back', [-1, 1.95, -3.35], [10, 3.0, 0.3], 'concrete', 0.15));
  parts.push(P('gf-west', [-5.85, 1.95, 0], [0.3, 3.0, 7.0], 'stone', 0.2));
  parts.push(P('gf-fire-wall', [-3.2, 1.8, -0.2], [0.25, 2.8, 3.2], 'charcoal', 0.3));
  parts.push(P('gf-slab', [-1, 3.6, 0.3], [11.2, 0.35, 8.2], 'concrete', 0.4));

  // Front curtain wall (z = 3.45)
  const fx = hi ? range(-5.6, 3.6, 1.15) : range(-5.6, 3.6, 2.3);
  fx.forEach((x, i) => parts.push(P(`gf-mul-f${i}`, [x, 1.95, 3.45], [0.1, 3.0, 0.1], 'charcoal', 0.3)));
  for (let i = 0; i < fx.length - 1; i++) {
    const cx = (fx[i] + fx[i + 1]) / 2;
    const w = fx[i + 1] - fx[i] - 0.1;
    parts.push(P(`gf-pane-f${i}`, [cx, 1.95, 3.45], [w, 2.95, 0.04], 'glass', 0.35, { shadow: false }));
  }
  // East side glass (x = 3.95)
  const fz = hi ? range(-3.3, 3.3, 1.65) : range(-3.3, 3.3, 3.3);
  fz.forEach((z, i) => parts.push(P(`gf-mul-e${i}`, [3.95, 1.95, z], [0.1, 3.0, 0.1], 'charcoal', 0.3)));
  for (let i = 0; i < fz.length - 1; i++) {
    const cz = (fz[i] + fz[i + 1]) / 2;
    const d = fz[i + 1] - fz[i] - 0.1;
    parts.push(P(`gf-pane-e${i}`, [3.95, 1.95, cz], [0.04, 2.95, d], 'glass', 0.35, { shadow: false }));
  }
  parts.push(P('gf-glow', [-1, 1.9, 2.9], [8.8, 2.5, 0.02], 'glow', 1.0, { shadow: false }));

  /* ---------------- East service block + canopy ---------------- */
  parts.push(P('svc-block', [6.65, 1.95, -3], [4.7, 3.3, 5], 'stoneDark', 0.25));
  parts.push(P('svc-roof', [6.65, 3.75, -3], [5.1, 0.3, 5.4], 'concrete', 0.45));
  parts.push(P('svc-door', [5.2, 1.35, -0.46], [1.1, 2.3, 0.06], 'wood', 0.55, { shadow: false }));
  parts.push(P('svc-garage', [7.4, 1.35, -0.46], [2.4, 2.3, 0.06], 'wood', 0.52, { shadow: false }));
  parts.push(P('svc-strip', [6.65, 2.95, -0.46], [3.9, 0.5, 0.06], 'glow', 0.98, { shadow: false }));
  parts.push(P('canopy', [6.6, 3.3, 2.0], [4.6, 0.2, 3.4], 'concrete', 0.6));
  parts.push(P('canopy-col-a', [8.6, 1.8, 3.4], [0.14, 3.0, 0.14], 'charcoal', 0.14));
  parts.push(P('canopy-col-b', [4.7, 1.8, 3.4], [0.14, 3.0, 0.14], 'charcoal', 0.14));

  /* ---------------- Stair core ---------------- */
  parts.push(P('core', [3.0, 4.2, -4.6], [2.4, 8.4, 2.0], 'stoneDark', 0.45));
  parts.push(P('core-slot', [3.0, 5.6, -3.58], [0.4, 4.4, 0.06], 'glow', 0.98, { shadow: false }));

  /* ---------------- Upper floor (cantilevered west over the pool) ---------------- */
  parts.push(P('uf-slab', [-3.0, 3.95, -0.4], [12.2, 0.4, 6.6], 'concrete', 0.5));
  parts.push(P('uf-back', [-3.0, 5.6, -3.55], [12.0, 2.9, 0.3], 'concrete', 0.55));
  parts.push(P('uf-west', [-8.85, 5.6, -0.4], [0.3, 2.9, 6.3], 'stone', 0.58));
  parts.push(P('uf-east', [2.85, 5.6, -0.4], [0.3, 2.9, 6.3], 'concrete', 0.58));
  parts.push(P('uf-glass', [-3.0, 5.6, 2.55], [11.4, 2.85, 0.04], 'glass', 0.62, { shadow: false }));
  (hi ? range(-8.4, 1.6, 2.0) : range(-8.4, 1.6, 4.0)).forEach((x, i) =>
    parts.push(P(`uf-mul${i}`, [x, 5.6, 2.55], [0.1, 2.85, 0.1], 'charcoal', 0.6))
  );
  // Timber slat screen in front of the upper glass
  (hi ? range(-8.2, 2.2, 0.32) : range(-8.2, 2.2, 0.64)).forEach((x, i) =>
    parts.push(P(`slat${i}`, [x, 5.6, 2.95], [0.12, 2.8, 0.06], 'wood', 0.66 + (i % 7) * 0.004))
  );
  parts.push(P('uf-glow', [-3.0, 5.6, 2.3], [10.8, 2.4, 0.02], 'glow', 1.0, { shadow: false }));
  parts.push(P('uf-roof', [-3.0, 7.25, -0.4], [13.2, 0.35, 7.6], 'concrete', 0.8));
  parts.push(P('fascia-f', [-3.0, 7.55, 3.35], [13.2, 0.25, 0.1], 'charcoal', 0.85));
  parts.push(P('fascia-b', [-3.0, 7.55, -4.15], [13.2, 0.25, 0.1], 'charcoal', 0.85));
  parts.push(P('fascia-w', [-9.55, 7.55, -0.4], [0.1, 0.25, 7.6], 'charcoal', 0.86));
  parts.push(P('fascia-e', [3.55, 7.55, -0.4], [0.1, 0.25, 7.6], 'charcoal', 0.86));
  parts.push(P('skylight', [-1.2, 7.55, -1.6], [2.4, 0.3, 1.6], 'glass', 0.88, { shadow: false }));
  parts.push(P('col-w1', [-8.6, 2.02, -3.2], [0.16, 3.45, 0.16], 'charcoal', 0.12));
  parts.push(P('col-w2', [-8.6, 2.02, 2.4], [0.16, 3.45, 0.16], 'charcoal', 0.12));

  // Balcony projecting from the upper front
  parts.push(P('balcony', [-5.5, 4.0, 3.6], [6, 0.2, 1.5], 'concrete', 0.7));
  parts.push(P('balcony-glass', [-5.5, 4.62, 4.3], [6, 1.0, 0.04], 'glass', 0.72, { shadow: false }));
  parts.push(P('balcony-cap', [-5.5, 5.15, 4.3], [6, 0.06, 0.08], 'charcoal', 0.74));

  /* ---------------- Landscape ---------------- */
  parts.push(P('garden-wall', [9.3, 0.7, 1.5], [0.3, 0.8, 9], 'stone', 0.3));
  parts.push(P('planter-w', [-8.4, 0.6, 6.0], [1.4, 0.6, 1.4], 'charcoal', 0.9));
  parts.push(P('planter-e', [8.0, 0.6, 5.8], [1.4, 0.6, 1.4], 'charcoal', 0.9));
  parts.push(P('hedge-w', [-8.4, 1.12, 6.0], [1.15, 0.5, 1.15], 'foliage', 0.92));
  parts.push(P('hedge-e', [8.0, 1.12, 5.8], [1.15, 0.5, 1.15], 'foliage', 0.92));

  return parts;
}
