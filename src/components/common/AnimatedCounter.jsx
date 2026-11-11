import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/motion';

/**
 * Counts up to the numeric portion of `target` (e.g. "500+" → 500) with an
 * ease-out curve. Starts only once the element enters the viewport, and
 * renders the final value immediately for reduced-motion users.
 */
export default function AnimatedCounter({ target, suffix = '', duration = 1800, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  // Extract pure numeric portion from target string (e.g. "500+" -> 500)
  const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;
  const [count, setCount] = useState(() => (prefersReducedMotion() ? numericTarget : 0));

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      if (inView) setCount(numericTarget);
      return undefined;
    }

    let frameId;
    let startTime = null;
    const timeout = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * numericTarget));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
        } else {
          setCount(numericTarget);
        }
      };
      frameId = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [inView, numericTarget, duration, delay]);

  // If target has no numeric part (e.g. "All 50 States"), display cleanly
  if (isNaN(numericTarget) || numericTarget === 0) {
    return <span ref={ref}>{target}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {String(target).includes('+') ? '+' : ''}
      {String(target).includes('%') ? '%' : ''}
      {suffix}
    </span>
  );
}
