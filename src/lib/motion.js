/**
 * Shared motion system for TwistMS Properties.
 * Centralises easing curves, device capability checks and the
 * one-time intro timing so every component animates consistently.
 */

// Expo-out: fast start, long elegant settle (used for reveals / entrances)
export const EASE = [0.16, 1, 0.3, 1];
// Quart in-out: symmetrical, used for wipes and curtain transitions
export const EASE_IO = [0.76, 0, 0.24, 1];

export const SPRING_SOFT = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 30, mass: 0.6 };

let _finePointer;
/** True on devices with a precise hover-capable pointer (desktop / laptop). */
export function isFinePointer() {
  if (typeof window === 'undefined') return false;
  if (_finePointer === undefined) {
    _finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }
  return _finePointer;
}

/** True when the OS asks for reduced motion. Re-evaluated each call (cheap). */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* -------------------------------------------------------------------------
   Intro curtain timing. Plays once per browser session on first paint,
   never for reduced-motion users. Memoised so the hero and the curtain
   agree on whether it is running during this page load.
------------------------------------------------------------------------- */
export const INTRO_HOLD = 0.75;   // seconds the brand mark is held
export const INTRO_WIPE = 0.8;    // seconds for the curtain wipe

let _playIntro;
export function shouldPlayIntro() {
  if (_playIntro !== undefined) return _playIntro;
  if (typeof window === 'undefined') return (_playIntro = false);
  try {
    const seen = window.sessionStorage.getItem('twistms_intro_seen');
    _playIntro = !seen && !prefersReducedMotion();
    if (_playIntro) window.sessionStorage.setItem('twistms_intro_seen', '1');
  } catch {
    _playIntro = false;
  }
  return _playIntro;
}

/** Delay (s) hero entrances should wait so they begin as the curtain lifts. */
export function introOffset() {
  return shouldPlayIntro() ? INTRO_HOLD + INTRO_WIPE * 0.45 : 0;
}

/* -------------------------------------------------------------------------
   Reusable variants
------------------------------------------------------------------------- */
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
