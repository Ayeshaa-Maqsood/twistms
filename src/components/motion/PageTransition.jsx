import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/** Resets scroll when a new page mounts (runs after the previous page has exited). */
function Page({ children, reduce }) {
  useLayoutEffect(() => {
    // Instant jump; the fade-in makes it feel like a cut, not a scroll.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
      exit={{ opacity: 0, y: reduce ? 0 : -10, transition: { duration: 0.22, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps the router outlet so route changes crossfade with a short lift,
 * and every new page starts at the top. Keyed on pathname so query-string
 * changes (e.g. search filters) do not retrigger a transition.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Page key={location.pathname} reduce={reduce}>
        {children}
      </Page>
    </AnimatePresence>
  );
}
