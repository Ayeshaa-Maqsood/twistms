import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Decorative architectural line art, drawn on with stroke animation.
 *
 * variant="corners": four thin L-brackets that frame a hero / panel
 * variant="plan":    faint floor-plan style outlines and dimension lines
 *                    for promotional / trust sections
 *
 * Always absolutely positioned and pointer-events: none.
 * tone="light" for dark surfaces, tone="dark" for light surfaces.
 */
export default function BlueprintLines({
  variant = 'corners',
  tone = 'light',
  className = '',
  delay = 0,
  inView = true,
  inset = 24,
}) {
  const reduce = useReducedMotion();
  const stroke = tone === 'light' ? 'rgba(232, 220, 180, 0.6)' : 'rgba(62, 78, 49, 0.3)';
  const strokeSoft = tone === 'light' ? 'rgba(232, 220, 180, 0.24)' : 'rgba(62, 78, 49, 0.13)';

  const draw = (i, dur = 1.6) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          ...(inView
            ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
            : { animate: { pathLength: 1, opacity: 1 } }),
          transition: { duration: dur, ease: EASE, delay: delay + i * 0.12 },
        };

  if (variant === 'corners') {
    const corners = [
      { pos: { top: inset, left: inset }, rot: 'rotate-0' },
      { pos: { top: inset, right: inset }, rot: 'rotate-90' },
      { pos: { bottom: inset, right: inset }, rot: 'rotate-180' },
      { pos: { bottom: inset, left: inset }, rot: '-rotate-90' },
    ];
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
        {corners.map((c, i) => (
          <svg
            key={i}
            className={`absolute w-10 h-10 ${c.rot}`}
            style={c.pos}
            viewBox="0 0 40 40"
            fill="none"
          >
            <motion.path d="M 1 40 V 1 H 40" stroke={stroke} strokeWidth="1" {...draw(i, 1.2)} />
            <motion.path d="M 1 10 H 6 M 10 1 V 6" stroke={strokeSoft} strokeWidth="1" {...draw(i + 1, 0.6)} />
          </svg>
        ))}
      </div>
    );
  }

  // variant === 'plan'
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
    >
      {/* Floor-plan outline */}
      <motion.rect x="760" y="90" width="340" height="230" stroke={stroke} strokeWidth="1" {...draw(0, 2)} />
      <motion.path d="M 760 205 H 930 V 320" stroke={stroke} strokeWidth="1" {...draw(1, 1.6)} />
      <motion.path d="M 930 90 V 160" stroke={stroke} strokeWidth="1" {...draw(2, 1)} />
      <motion.path d="M 1000 205 H 1100" stroke={strokeSoft} strokeWidth="1" {...draw(3, 1)} />
      {/* Door swing arcs */}
      <motion.path d="M 930 160 A 45 45 0 0 1 975 205" stroke={strokeSoft} strokeWidth="1" {...draw(4, 1)} />
      <motion.path d="M 845 320 A 55 55 0 0 1 790 265" stroke={strokeSoft} strokeWidth="1" {...draw(5, 1)} />
      {/* Dimension lines with end ticks */}
      <motion.path d="M 760 360 H 1100 M 760 352 V 368 M 1100 352 V 368" stroke={strokeSoft} strokeWidth="1" {...draw(6, 1.4)} />
      <motion.path d="M 1140 90 V 320 M 1132 90 H 1148 M 1132 320 H 1148" stroke={strokeSoft} strokeWidth="1" {...draw(7, 1.4)} />
      {/* Long elevation guide across the panel */}
      <motion.path d="M 40 470 H 1160" stroke={strokeSoft} strokeWidth="1" strokeDasharray="6 10" {...draw(8, 2.2)} />
      <motion.circle cx="760" cy="90" r="3" stroke={stroke} strokeWidth="1" {...draw(9, 0.6)} />
      <motion.circle cx="1100" cy="320" r="3" stroke={stroke} strokeWidth="1" {...draw(10, 0.6)} />
    </svg>
  );
}
