import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Viewport-triggered stagger container. Children that use <StaggerItem>
 * reveal one after another when the group scrolls into view.
 */
export function StaggerGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  once = true,
  margin = '0px 0px -10% 0px',
  as = 'div',
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className = '', distance = 24, as = 'div', style }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}
