import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Subtle scroll-linked parallax. The outer div stays in normal flow and
 * provides the measurement target; the inner layer translates on the GPU.
 *
 * amount: total vertical travel in px across the element's scroll range.
 * Pass a negative amount for a layer that moves against the scroll.
 */
export default function ParallaxLayer({
  children,
  amount = 40,
  className = '',
  innerClassName = '',
  style,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div className={`will-change-transform ${innerClassName}`} style={{ y: reduce ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}
