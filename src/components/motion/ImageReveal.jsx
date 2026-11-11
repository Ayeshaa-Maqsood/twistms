import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

const CLIP = {
  up:    { from: 'inset(100% 0 0 0)',  to: 'inset(0% 0 0 0)' },
  down:  { from: 'inset(0 0 100% 0)',  to: 'inset(0 0 0% 0)' },
  left:  { from: 'inset(0 100% 0 0)',  to: 'inset(0 0% 0 0)' },
  right: { from: 'inset(0 0 0 100%)',  to: 'inset(0 0 0 0%)' },
};

/**
 * Architectural clip-mask reveal for photography. The mask slides open
 * while the image settles from a slight over-scale, so the photo feels
 * like it is being "uncovered" rather than faded in.
 *
 * Pass either `src`/`alt` (renders an <img>) or children (any media).
 */
export default function ImageReveal({
  src,
  alt = '',
  children,
  direction = 'up',
  delay = 0,
  duration = 1.1,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  once = true,
  style,
  ...imgProps
}) {
  const reduce = useReducedMotion();
  const clip = CLIP[direction] || CLIP.up;

  const content = src ? (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`w-full h-full object-cover ${imgClassName}`}
      {...imgProps}
    />
  ) : (
    children
  );

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className}`} style={style}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={style}
      initial={{ clipPath: clip.from }}
      whileInView={{ clipPath: clip.to }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, margin: '0px 0px -10% 0px' }}
        transition={{ duration: duration * 1.25, ease: EASE, delay }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
