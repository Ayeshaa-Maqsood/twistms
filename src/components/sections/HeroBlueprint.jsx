import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import SplitText from '../motion/SplitText';
import MagneticButton from '../motion/MagneticButton';
import HeroFallback from './HeroFallback';
import HeroHandoff from './HeroHandoff';
import { useWebGLSupport } from '../../three/useWebGLSupport';
import { DIMENSIONS } from '../../three/dimensions';
import { phaseLabel, PHASE } from '../../three/sceneMath';
import { EASE, introOffset, isFinePointer } from '../../lib/motion';

// Three.js ships in its own chunk, fetched only when the homepage renders.
const HeroScene = lazy(() => import('../../three/HeroScene'));

const HEADER_PX = 96; // sticky header height (h-24)

/**
 * Blueprint-to-reality hero.
 *
 * A tall section pins a full-viewport stage with CSS sticky; the scroll
 * progress across the section (a Framer MotionValue) drives the 3D
 * transformation, the camera path and every overlay. Mouse position feeds
 * two spring-smoothed motion values. Scrolling back reverses everything.
 */
export default function HeroBlueprint() {
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const labelEls = useRef([]);
  const reduce = useReducedMotion();
  const { supported, quality } = useWebGLSupport();
  const base = introOffset();

  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(() => phaseLabel(0));

  // Long enough that a normal-speed scroll shows every stage of the build
  const pinVh = reduce ? 100 : quality === 'high' ? 420 : 300;

  /* ---- scroll progress across the pinned section ---- */
  const { scrollYProgress: rawProgress } = useScroll({
    target: pinRef,
    offset: [`start ${HEADER_PX}px`, 'end end'],
  });

  // Eased progress: the animation glides after the scrollbar, so even a quick
  // flick plays out over about a second instead of jumping to the end.
  const scrollYProgress = useSpring(rawProgress, { stiffness: 38, damping: 16, mass: 0.9, restDelta: 0.0005 });

  /* ---- mouse / touch input ---- */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20, mass: 1 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20, mass: 1 });

  const onPointerMove = (e) => {
    if (reduce || !isFinePointer() || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // Touch devices: a gentle automatic sway replaces the cursor parallax
  useEffect(() => {
    if (reduce || isFinePointer()) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = (now - t0) / 1000;
      rawX.set(Math.sin(t * 0.25) * 0.45);
      rawY.set(Math.cos(t * 0.18) * 0.25);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, rawX, rawY]);

  /* ---- render only while on screen ---- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- overlay motion derived from scroll ---- */
  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.3], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const textEvents = useTransform(scrollYProgress, (v) => (v < 0.26 ? 'auto' : 'none'));
  const annotOpacity = useTransform(scrollYProgress, [0, 0.1, PHASE.B_END, PHASE.C_END - 0.05], [0, 1, 1, 0]);
  const revealOpacity = useTransform(scrollYProgress, [PHASE.B_END + 0.05, PHASE.C_END, 0.9, 1], [0, 1, 1, 0]);
  // Phase D: scene recedes (fades + scales back) while a linen wipe rises from below
  const stageOpacity = useTransform(scrollYProgress, [PHASE.C_END, 1], [1, 0.35]);
  const stageScale = useTransform(scrollYProgress, [PHASE.C_END, 1], [1, 0.94]);
  const wipeEdge = useTransform(scrollYProgress, [PHASE.C_END + 0.04, 1], [0, 140]);
  const wipeSolid = useTransform(wipeEdge, (v) => v - 40);
  const wipeBg = useMotionTemplate`linear-gradient(to top, #FBF8F2 ${wipeSolid}%, rgba(251,248,242,0) ${wipeEdge}%)`;
  const readoutOpacity = useTransform(scrollYProgress, [0.86, 0.96], [1, 0]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = phaseLabel(v);
    setPhase((prev) => (prev.n === next.n ? prev : next));
  });

  const frozenProgress = reduce ? 0.72 : null;
  const enter = (d, dist = 22) => ({
    initial: reduce ? false : { opacity: 0, y: dist },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, ease: EASE, delay: base + d },
  });

  const sceneProps = useMemo(
    () => ({ progress: scrollYProgress, mouseX, mouseY, quality, labelEls }),
    [scrollYProgress, mouseX, mouseY, quality]
  );

  return (
    <section ref={pinRef} style={{ height: `${pinVh}vh` }} className="relative" aria-label="Where vision becomes reality">
      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="sticky overflow-hidden bg-[#0E141B] text-[#F5F3EE]"
        style={{ top: HEADER_PX, height: `calc(100vh - ${HEADER_PX}px)` }}
      >
        {/* ---------- 3D stage ---------- */}
        <motion.div className="absolute inset-0" style={{ opacity: reduce ? 1 : stageOpacity, scale: reduce ? 1 : stageScale }}>
          {supported ? (
            <Suspense fallback={<HeroFallback />}>
              <HeroScene {...sceneProps} active={visible} frozenProgress={frozenProgress} />
            </Suspense>
          ) : (
            <HeroFallback animate={!reduce} />
          )}
        </motion.div>

        {/* Readability gradients (left for copy, bottom for the page hand-off) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0E141B]/90 via-[#0E141B]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0E141B]/80 to-transparent" />
        {/* Projected dimension labels (positioned by the scene; hidden on phones to keep the copy clear) */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block" aria-hidden="true">
          {DIMENSIONS.map((d, i) => (
            <span
              key={d.label}
              ref={(el) => (labelEls.current[i] = el)}
              className="absolute top-0 left-0 px-1.5 py-0.5 rounded bg-[#0E141B]/70 border border-[#8BAFD0]/40 text-[#8BAFD0] font-mono text-[10px] tracking-widest whitespace-nowrap will-change-transform"
              style={{ opacity: 0 }}
            >
              {d.label}
            </span>
          ))}
        </div>

        {/* ---------- Hero copy (Phase A) ---------- */}
        <motion.div
          className="absolute inset-0 flex items-center"
          style={{ opacity: reduce ? 1 : textOpacity, y: reduce ? 0 : textY, pointerEvents: reduce ? 'auto' : textEvents }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl lg:max-w-2xl pt-6 pb-24 md:pb-10">
              <motion.p {...enter(0)} className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#BFA668] font-bold">
                Real Estate, Reimagined.
              </motion.p>
              <SplitText
                as="h1"
                text="Where Vision Becomes Reality."
                className="mt-5 text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.02] font-editorial text-[#F5F3EE]"
                delay={base + 0.15}
                stagger={0.06}
              />
              <motion.p {...enter(0.55)} className="mt-6 text-base sm:text-lg text-[#F5F3EE]/75 leading-relaxed font-medium max-w-lg text-balance">
                Discover exceptional properties, explore new opportunities and find your next place across the United States.
              </motion.p>
              <motion.div {...enter(0.72, 26)} className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 py-3.5 px-7 rounded-2xl text-[11px] font-extrabold tracking-[0.2em] uppercase bg-[#BFA668] text-[#1A2315] hover:bg-[#E8DCB4] transition-colors duration-300 shadow-[0_18px_40px_-16px_rgba(191,166,104,0.7)]"
                  >
                    Explore Properties
                    <span aria-hidden="true">→</span>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/submit" className="btn-ghost-light inline-flex items-center py-3.5 px-7 rounded-2xl text-[11px] tracking-[0.2em] uppercase">
                    List Your Property
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Technical annotations (Phases A–B) ---------- */}
        <motion.div className="absolute inset-0 pointer-events-none hidden sm:block" style={{ opacity: reduce ? 0 : annotOpacity }} aria-hidden="true">
          <div className="absolute top-6 right-6 lg:right-10 text-right font-mono text-[10px] tracking-[0.3em] uppercase text-[#8BAFD0]/80 space-y-1">
            <p>Structure 001</p>
            <p className="text-[#F5F3EE]/50">Architectural form</p>
          </div>
          <div className="absolute bottom-24 right-6 lg:right-10 text-right font-mono text-[10px] tracking-[0.3em] uppercase text-[#8BAFD0]/80 space-y-1">
            <p>Location / USA</p>
            <p className="text-[#F5F3EE]/50">N 39.8283° · W 98.5795°</p>
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F5F3EE]/45">
            <span className="w-8 h-px bg-[#8BAFD0]/50" />
            Blueprint to reality
            <span className="w-8 h-px bg-[#8BAFD0]/50" />
          </div>
        </motion.div>

        {/* ---------- Reveal annotations (Phase C) ---------- */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: reduce ? 1 : revealOpacity }}>
          <div className="absolute bottom-24 left-4 sm:left-6 lg:left-10 max-w-sm">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#BFA668] font-bold">Architectural reveal</p>
            <p className="mt-2 text-xl sm:text-2xl font-extrabold font-editorial text-[#F5F3EE] leading-tight">
              Verified ownership. <span className="text-champagne">Engineered living.</span>
            </p>
            <p className="mt-2 text-xs text-[#F5F3EE]/60 font-medium">
              Every listing is vetted against deeds, tax records and surveys before it reaches the marketplace.
            </p>
          </div>
        </motion.div>

        {/* ---------- Phase readout + progress ---------- */}
        {!reduce && (
          <motion.div
            className="absolute bottom-6 left-4 sm:left-6 lg:left-10 right-4 sm:right-6 lg:right-10 flex items-end justify-between gap-6 pointer-events-none"
            style={{ opacity: readoutOpacity }}
            aria-hidden="true"
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F5F3EE]/55">
              <span className="text-[#BFA668] font-bold">Phase {phase.n}</span>
              <span className="w-4 h-px bg-[#F5F3EE]/30" />
              <span>{phase.name}</span>
            </div>
            <div className="hidden sm:block w-40 h-px bg-[#F5F3EE]/15 relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-[#BFA668]" style={{ width: progressBar }} />
            </div>
          </motion.div>
        )}

        {/* ---------- Phase D hand-off: linen wipe into the marketplace ---------- */}
        {!reduce && <motion.div className="absolute inset-0 pointer-events-none" style={{ background: wipeBg }} aria-hidden="true" />}
        {/* Interactive category picker shown on the cream hand-off screen */}
        {!reduce && <HeroHandoff progress={scrollYProgress} mouseX={mouseX} mouseY={mouseY} />}

        {/* ---------- Scroll cue ---------- */}
        {!reduce && (
          <motion.div className="absolute bottom-6 left-1/2 z-10" style={{ x: '-50%', opacity: cueOpacity }}>
            <motion.div {...enter(1.4)} className="flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-[#F5F3EE]/50">Scroll to build</span>
              <span className="relative block w-px h-10 bg-white/15 overflow-hidden">
                <span className="absolute inset-0 bg-[#BFA668] scroll-cue-line" />
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
