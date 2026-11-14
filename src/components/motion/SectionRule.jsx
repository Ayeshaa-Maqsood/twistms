import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Architectural section divider: a numbered mono label, a hairline that
 * draws from left to right, and a small champagne marker. Place it inside
 * the section's own container; used sparingly so transitions feel intentional.
 */
export default function SectionRule({ index, label, tone = 'dark', className = '' }) {
  const reduce = useReducedMotion();
  const lineColor = tone === 'light' ? 'bg-white/25' : 'bg-[#2B2B2B]/20';
  const textColor = tone === 'light' ? 'text-[#D0D0D0]' : 'text-[#8A8A8A]';

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <motion.span
        className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold shrink-0 ${textColor}`}
        initial={reduce ? false : { opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {index} <span className="opacity-50">/</span> {label}
      </motion.span>
      <motion.div
        className={`h-px flex-1 origin-left ${lineColor}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rotate-45 bg-[#B4B4B4] shrink-0"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -5% 0px' }}
        transition={{ duration: 0.5, ease: EASE, delay: 1.1 }}
      />
    </div>
  );
}
