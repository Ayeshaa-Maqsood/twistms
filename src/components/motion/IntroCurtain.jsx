import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, EASE_IO, INTRO_HOLD, INTRO_WIPE, shouldPlayIntro } from '../../lib/motion';

/**
 * One-time cinematic entrance: deep charcoal curtain, brand mark settles,
 * a champagne hairline draws, then the curtain wipes upward to reveal the
 * hero. Plays once per session and never for reduced-motion users.
 */
export default function IntroCurtain() {
  const [show, setShow] = useState(() => shouldPlayIntro());

  useEffect(() => {
    if (!show) return undefined;
    const t = setTimeout(() => setShow(false), INTRO_HOLD * 1000);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-curtain"
          className="fixed inset-0 z-[200] bg-[#0F140C] flex items-center justify-center overflow-hidden"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: INTRO_WIPE, ease: EASE_IO } }}
          aria-hidden="true"
        >
          {/* Fine grid texture */}
          <div className="absolute inset-0 grid-fine-light opacity-60" />

          <div className="relative flex flex-col items-center gap-5">
            <motion.img
              src="/logos/new-logo-white-removebg-preview.png"
              alt=""
              className="h-20 sm:h-24 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
              exit={{ opacity: 0, y: -14, transition: { duration: 0.3, ease: 'easeIn' } }}
            />
            <motion.div
              className="h-px w-40 bg-gradient-to-r from-transparent via-[#BFA668] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
            <motion.span
              className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#D4C28E]/80"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              TwistMS Properties
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
