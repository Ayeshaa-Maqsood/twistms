import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import MagneticButton from '../motion/MagneticButton';
import { EASE, SPRING_SOFT, SPRING_SNAPPY } from '../../lib/motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const { favorites, setIsDrawerOpen } = useFavorites();

  // Compact, more opaque bar once the page scrolls (no height change = no layout shift)
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  const navLinks = [
    { name: 'Marketplace', path: '/' },
    { name: 'Browse Properties', path: '/search' },
    { name: 'Find an Agent', path: '/agents' },
    { name: 'Pricing Tiers', path: '/pricing' },
    { name: 'Direct Escrow & Contact', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? 'bg-[#FBF8F2]/95 border-[#3E4E31]/15 shadow-[0_10px_30px_-18px_rgba(26,35,21,0.35)]'
          : 'bg-[#FBF8F2]/85 border-[#3E4E31]/10 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 py-2">

          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group" aria-label="TwistMS Properties home">
            <motion.img
              src="/logos/new-logo-removebg-preview.png"
              alt="TwistMS Properties Logo"
              animate={{ scale: scrolled ? 0.86 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-md origin-left group-hover:drop-shadow-lg transition-[filter] duration-300"
            />
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold tracking-tight text-[#1A2315] flex items-center gap-1.5 font-editorial">
                TwistMS <span className="text-[#BFA668] font-sans text-xs uppercase font-extrabold tracking-widest px-2 py-0.5 rounded bg-[#F4EDDA] border border-[#BFA668]/40">USA</span>
              </span>
              <span className="block text-[11px] tracking-wider text-[#596638] uppercase font-mono font-bold">
                Architectural Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with sliding active indicator */}
          <nav
            className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-[#3E4E31]/20 shadow-sm backdrop-blur-md"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-full text-xs transition-colors duration-300 ${
                    active
                      ? 'text-[#FBF8F2] font-bold'
                      : 'text-[#596638] hover:text-[#3E4E31] hover:bg-[#F4EDDA] font-semibold'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[#3E4E31] shadow-sm"
                      transition={reduce ? { duration: 0 } : SPRING_SOFT}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Properties Pill */}
            <motion.button
              onClick={() => setIsDrawerOpen(true)}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#3E4E31]/30 text-xs font-bold text-[#1A2315] hover:border-[#BFA668] hover:shadow-md shadow-sm transition-[border-color,box-shadow] duration-300 cursor-pointer"
              aria-label={`Open saved properties, ${favorites.length} saved`}
            >
              <motion.svg
                key={favorites.length > 0 ? 'filled' : 'empty'}
                initial={reduce ? false : { scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={SPRING_SNAPPY}
                className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'text-red-500 fill-current' : 'text-[#596638] fill-current'}`}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </motion.svg>
              <span>Saved</span>
              <span className="relative inline-flex min-w-[1.4rem] justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={favorites.length}
                    initial={reduce ? false : { y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="tabular-nums"
                  >
                    ({favorites.length})
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.button>

            <MagneticButton strength={0.22} radius={8}>
              <Link
                to="/submit"
                className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <span>+ List Property</span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3E4E31] hover:bg-[#F4EDDA] transition-colors"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.path
                      key="close"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      key="open"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </AnimatePresence>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
            className="md:hidden overflow-hidden border-b border-[#3E4E31]/10 bg-[#FBF8F2]"
          >
            <motion.div
              className="px-4 pt-3 pb-6 space-y-1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        active ? 'bg-[#3E4E31] text-[#FBF8F2]' : 'text-[#596638] hover:bg-[#F4EDDA] active:bg-[#F4EDDA]'
                      }`}
                    >
                      {link.name}
                      <span aria-hidden="true" className={active ? 'text-[#D4C28E]' : 'text-[#BFA668]'}>→</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: EASE }}
                className="pt-4 mt-3 border-t border-[#3E4E31]/10 flex flex-col gap-2"
              >
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsDrawerOpen(true); }}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-bold btn-luxury-outline"
                >
                  Saved Properties ({favorites.length})
                </button>
                <Link
                  to="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-semibold btn-luxury"
                >
                  + List Property
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
