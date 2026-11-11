import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { isFinePointer } from '../../lib/motion';

/**
 * Wraps any button/link so it gently follows the cursor while hovered.
 * Desktop-only (no effect for touch or reduced-motion users). The child
 * stays a normal interactive element so forms, links and a11y are intact.
 */
export default function MagneticButton({
  children,
  strength = 0.28,
  radius = 14,
  className = 'inline-block',
  as = 'div',
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const enabled = !reduce && isFinePointer();

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-radius, Math.min(radius, dx * strength)));
    y.set(Math.max(-radius, Math.min(radius, dy * strength)));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </Comp>
  );
}
