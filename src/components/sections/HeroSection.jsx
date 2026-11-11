import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';
import SplitText from '../motion/SplitText';
import BlueprintLines from '../motion/BlueprintLines';
import MagneticButton from '../motion/MagneticButton';
import { EASE, introOffset, isFinePointer } from '../../lib/motion';

const HERO_IMG = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811';
export const heroSrc = (w) => `${HERO_IMG}?auto=format&fit=crop&w=${w}&q=${w > 1600 ? 68 : 75}`;

const US_STATES = [
  { code: '', label: 'All 50 US States' },
  { code: 'TX', label: 'Texas (TX)' },
  { code: 'CO', label: 'Colorado (CO)' },
  { code: 'FL', label: 'Florida (FL)' },
  { code: 'CA', label: 'California (CA)' },
  { code: 'MT', label: 'Montana (MT)' },
  { code: 'NY', label: 'New York (NY)' },
];

/**
 * Cinematic homepage hero. All search state lives in <Home/> so the
 * live-filtering of the featured grid and the /search navigation are
 * unchanged; this component only renders the experience.
 */
export default function HeroSection({
  categories,
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  selectedState,
  setSelectedState,
  onSubmit,
  stats,
}) {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const base = introOffset();

  /* ---- Mouse parallax (desktop only, spring-smoothed) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 22, mass: 1.2 });
  const sy = useSpring(my, { stiffness: 40, damping: 22, mass: 1.2 });
  const bgX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const bgY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const fgX = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const fgY = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  const onPointerMove = (e) => {
    if (reduce || !isFinePointer() || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  /* ---- Scroll-linked exit: content lifts and fades as the hero leaves ---- */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  const enter = (d, dist = 22) => ({
    initial: reduce ? false : { opacity: 0, y: dist },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, ease: EASE, delay: base + d },
  });

  const fieldClass =
    'input-luxury w-full bg-white text-xs text-[#1A2315] font-semibold border border-transparent rounded-2xl px-4 py-3.5 focus:outline-none shadow-sm';

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[88vh] md:min-h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-[#0F140C] text-white"
      aria-label="TwistMS Properties: nationwide architectural real estate marketplace"
    >
      {/* ---------- Cinematic background ---------- */}
      <motion.div className="absolute -inset-[3%]" style={{ x: reduce ? 0 : bgX, y: reduce ? 0 : bgY }}>
        <img
          src={heroSrc(1920)}
          srcSet={`${heroSrc(800)} 800w, ${heroSrc(1280)} 1280w, ${heroSrc(1920)} 1920w, ${heroSrc(2560)} 2560w`}
          sizes="100vw"
          alt="Modern architectural residence at dusk"
          className="hero-kenburns w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Readability + depth overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F140C]/95 via-[#0F140C]/60 to-[#0F140C]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F140C] via-[#0F140C]/5 to-[#0F140C]/40" />
      <motion.div className="absolute inset-0 bg-[#0F140C]" style={{ opacity: overlayOpacity }} />

      {/* Fine architectural grid + ambient champagne light */}
      <div className="absolute inset-0 grid-fine-light opacity-80 pointer-events-none" />
      <div className="absolute -top-24 right-[8%] w-[560px] h-[560px] rounded-full bg-[#BFA668]/10 blur-[130px] ambient-pulse pointer-events-none" />
      <BlueprintLines variant="corners" tone="light" delay={base + 0.3} inView={false} />

      {/* ---------- Content ---------- */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-14 pb-24 md:pt-16 md:pb-28"
        style={{ y: reduce ? 0 : contentY, opacity: contentOpacity }}
      >
        <motion.div style={{ x: reduce ? 0 : fgX, y: reduce ? 0 : fgY }}>
          {/* Nationwide pill */}
          <motion.div {...enter(0)} className="inline-flex">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-dark text-[11px] font-mono font-bold tracking-widest uppercase text-[#E8DCB4]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#BFA668] opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BFA668]" />
              </span>
              USA Nationwide Marketplace · All 50 States
            </div>
          </motion.div>

          {/* Headline */}
          <SplitText
            as="h1"
            lines={[
              { text: 'Architectural Living,', className: 'text-[#FBF8F2]' },
              { text: 'Verified & Engineered Across America.', className: 'text-champagne' },
            ]}
            className="mt-7 text-4xl sm:text-6xl lg:text-[4.6rem] font-extrabold tracking-tight leading-[1.04] font-editorial max-w-4xl"
            delay={base + 0.15}
            stagger={0.05}
          />

          <motion.p
            {...enter(0.6)}
            className="mt-6 text-base sm:text-lg text-[#FBF8F2]/75 max-w-2xl leading-relaxed font-medium text-balance"
          >
            Curating premier residential sanctuaries, high-yield commercial assets, and sprawling
            timberland with verified ownership deeds across America.
          </motion.p>

          {/* Search console */}
          <motion.form
            {...enter(0.78, 28)}
            onSubmit={onSubmit}
            className="mt-10 max-w-4xl glass-panel-dark rounded-3xl p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center relative z-20"
            role="search"
            aria-label="Property search"
          >
            <div className="sm:col-span-3">
              <label className="sr-only" htmlFor="hero-category">Category</label>
              <select
                id="hero-category"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className={`${fieldClass} cursor-pointer`}
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white text-[#1A2315]">
                    {c === 'All' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4">
              <label className="sr-only" htmlFor="hero-query">City, ZIP or landmark</label>
              <input
                id="hero-query"
                type="text"
                placeholder="City, ZIP, or landmark (e.g. Austin, Aspen)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${fieldClass} font-medium placeholder:text-[#838961]`}
              />
            </div>

            <div className="sm:col-span-3">
              <label className="sr-only" htmlFor="hero-state">State</label>
              <select
                id="hero-state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className={`${fieldClass} cursor-pointer`}
              >
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code} className="bg-white text-[#1A2315]">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <MagneticButton className="block w-full" strength={0.18} radius={8}>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold btn-luxury flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </MagneticButton>
            </div>
          </motion.form>

          {/* Quick links */}
          <motion.div {...enter(0.95)} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono font-bold tracking-wider uppercase text-[#FBF8F2]/60">
            <Link to="/search" className="link-draw hover:text-[#E8DCB4] transition-colors">Browse all listings</Link>
            <Link to="/agents" className="link-draw hover:text-[#E8DCB4] transition-colors">Find a licensed agent</Link>
            <Link to="/submit" className="link-draw hover:text-[#E8DCB4] transition-colors">List a property</Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            {...enter(1.1)}
            className="mt-12 md:mt-14 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 border-t border-white/10 pt-7"
          >
            {stats.map((stat, i) => (
              <div key={i} className="pl-4 border-l border-[#BFA668]/40">
                <p className="text-2xl sm:text-3xl font-extrabold font-editorial text-white tracking-tight">
                  <AnimatedCounter target={stat.value} delay={(base + 1.2) * 1000 + i * 120} />
                </p>
                <p className="text-[10px] text-[#D4C28E]/85 mt-1.5 uppercase tracking-[0.2em] font-mono font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Vertical brand label (desktop) */}
      <div className="hidden lg:block absolute right-8 top-1/2 z-10" style={{ transform: 'translateY(-50%)' }}>
        <motion.div
          {...enter(1.3)}
          className="flex items-center gap-3 text-[10px] font-mono tracking-[0.35em] uppercase text-white/45"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="w-px h-16 bg-white/30" />
          TwistMS Properties · Est. USA
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10" style={{ transform: 'translateX(-50%)' }}>
        <motion.div {...enter(1.5)} className="flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-white/50">Scroll</span>
          <span className="relative block w-px h-10 bg-white/15 overflow-hidden">
            <span className="absolute inset-0 bg-[#BFA668] scroll-cue-line" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
