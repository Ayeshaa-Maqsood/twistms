import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import MagneticButton from '../motion/MagneticButton';
import { EASE, SPRING_SOFT, SPRING_SNAPPY } from '../../lib/motion';
import { BRAND } from '../../config/brand';

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
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? 'bg-[#111111]/95 border-[#B4B4B4]/35 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.65)]'
          : 'bg-[#1C1C1C] border-[#B4B4B4]/20 shadow-[0_6px_18px_-14px_rgba(0,0,0,0.5)]'
      } backdrop-blur-xl`}
    >
      {/* Gold hairline + soft forest-to-olive sheen */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#232323] via-[#1C1C1C] to-[#282828] opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B4B4B4]/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-24">

          {/* Logo + brand name: one unit, so they always scale and move together */}
          <Link to="/" className="group shrink-0" aria-label={`${BRAND.fullName} home`}>
            <motion.div
              className="flex items-center gap-3 origin-left"
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAFAFA] ring-2 ring-[#B4B4B4]/60 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.6)] group-hover:ring-[#B4B4B4] transition-[box-shadow,ring-color] duration-300">
                <img
                  src={BRAND.logo.color}
                  alt=""
                  className="w-[88%] h-[88%] object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#FAFAFA] font-editorial">
                    {BRAND.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-[#B4B4B4] text-[#111111]">
                    {BRAND.market}
                  </span>
                </span>
                <span className="mt-1 text-[10px] sm:text-[11px] tracking-[0.32em] text-[#D0D0D0] uppercase font-bold">
                  Properties
                </span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation with sliding active indicator */}
          <nav
            className="hidden lg:flex items-center gap-1 bg-white/[0.06] p-1.5 rounded-full border border-white/10"
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
                      ? 'text-[#111111] font-bold'
                      : 'text-[#FAFAFA]/80 hover:text-white hover:bg-white/10 font-semibold'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[#B4B4B4] shadow-sm"
                      transition={reduce ? { duration: 0 } : SPRING_SOFT}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Saved Properties Pill */}
            <motion.button
              onClick={() => setIsDrawerOpen(true)}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/20 text-xs font-bold text-[#FAFAFA] hover:border-[#B4B4B4] hover:bg-white/10 transition-[border-color,background-color] duration-300 cursor-pointer"
              aria-label={`Open saved properties, ${favorites.length} saved`}
            >
              <motion.svg
                key={favorites.length > 0 ? 'filled' : 'empty'}
                initial={reduce ? false : { scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={SPRING_SNAPPY}
                className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'text-red-400 fill-current' : 'text-[#D0D0D0] fill-current'}`}
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
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 bg-[#B4B4B4] text-[#111111] hover:bg-[#E0E0E0] shadow-[0_10px_24px_-10px_rgba(180, 180, 180,0.8)] transition-colors duration-300"
              >
                <span>+ List Property</span>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#FAFAFA] border border-white/15 hover:bg-white/10 transition-colors"
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
            className="lg:hidden relative overflow-hidden border-t border-white/10 bg-[#111111]"
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
                        active ? 'bg-[#B4B4B4] text-[#111111] font-bold' : 'text-[#FAFAFA]/85 hover:bg-white/10 active:bg-white/10'
                      }`}
                    >
                      {link.name}
                      <span aria-hidden="true" className={active ? 'text-[#111111]' : 'text-[#B4B4B4]'}>→</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35, ease: EASE }}
                className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-2"
              >
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsDrawerOpen(true); }}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-bold btn-ghost-light"
                >
                  Saved Properties ({favorites.length})
                </button>
                <Link
                  to="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-extrabold bg-[#B4B4B4] text-[#111111]"
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
