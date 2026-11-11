import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Staggered word reveal. Each word rises out of a clipped line box, which
 * gives the "architectural" masked-text entrance without any layout shift
 * (the final layout is identical to plain text).
 *
 * Usage:
 *   <SplitText as="h1" lines={[{ text: 'Architectural Living,' }, { text: 'Verified…', className: 'text-champagne' }]} />
 *   <SplitText text="Explore Prime US Territories" inView />
 */
export default function SplitText({
  as: Tag = 'div',
  text,
  lines,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  inView = false,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const lineList = lines || [{ text: text || '' }];

  // Reduced motion: render plain, fully static markup
  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {lineList.map((ln, i) => (
          <span key={i} className={`block ${ln.className || ''}`}>{ln.text}</span>
        ))}
      </Tag>
    );
  }

  let wordIndex = 0;

  const animProps = inView
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once, margin: '0px 0px -12% 0px' },
      }
    : { initial: 'hidden', animate: 'visible' };

  return (
    <Tag className={className} {...rest}>
      <motion.span className="block" {...animProps}>
        {lineList.map((ln, li) => (
          <span key={li} className="block">
            {ln.text.split(' ').map((word, wi, arr) => {
              const idx = wordIndex++;
              return (
                <span
                  key={wi}
                  className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
                >
                  <motion.span
                    className={`inline-block will-change-transform ${ln.className || ''} ${wordClassName}`}
                    variants={{
                      hidden: { y: '112%', opacity: 0, rotateX: -18 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        transition: { duration, ease: EASE, delay: delay + idx * stagger },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < arr.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
