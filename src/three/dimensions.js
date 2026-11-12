/**
 * Blueprint dimension annotations. Plain data shared by the 3D stage
 * (which draws the guide lines and projects the label positions) and the
 * DOM overlay (which renders the label text). No Three import here so the
 * overlay bundle stays free of the 3D chunk.
 */
export const DIMENSIONS = [
  { a: [-9.6, 0.5, 8.2], b: [9.6, 0.5, 8.2], label: '19.20 m', at: [0, 0.5, 8.2] },
  { a: [10.6, 0.3, -7.4], b: [10.6, 8.4, -7.4], label: '8.40 m', at: [10.6, 4.4, -7.4] },
  { a: [-10.4, 0.5, -7], b: [-10.4, 0.5, 7], label: '14.00 m', at: [-10.4, 0.5, 0] },
];
