import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { EASE } from '../../lib/motion';

export default function FavoritesDrawer() {
  const { favorites, isDrawerOpen, setIsDrawerOpen, toggleFavorite, clearFavorites } = useFavorites();
  const reduce = useReducedMotion();

  // Escape closes; body scroll is locked while open
  useEffect(() => {
    if (!isDrawerOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Saved properties">

          {/* Dimmed Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0A0A0A]/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Slide-out Drawer */}
          <motion.div
            key="panel"
            initial={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 } }}
            exit={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1, transition: { duration: 0.3, ease: 'easeIn' } }}
            className="relative w-full max-w-md bg-[#FAFAFA] h-full shadow-2xl border-l border-[#2B2B2B]/15 flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#2B2B2B]/10 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B4B4B4]" />
                <h3 className="text-xl font-extrabold text-[#111111] font-editorial">
                  Saved Acquisitions ({favorites.length})
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#EFEFEF] transition-colors"
                aria-label="Close saved properties"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Saved Listings Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {favorites.length > 0 ? (
                  favorites.map((prop, i) => (
                    <motion.div
                      key={prop.id}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE, delay: i * 0.04 } }}
                      exit={{ opacity: 0, x: 40, scale: 0.96, transition: { duration: 0.22 } }}
                      className="glass-panel-luxury glow-border p-3.5 rounded-2xl border border-[#2B2B2B]/10 bg-white flex gap-3 relative group shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={prop.image}
                        alt={prop.title}
                        loading="lazy"
                        decoding="async"
                        className="w-24 h-24 rounded-xl object-cover shrink-0 bg-[#EFEFEF] border border-[#2B2B2B]/10"
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#B4B4B4] uppercase">
                            {prop.city}, {prop.stateCode}
                          </span>
                          <h4 className="text-sm font-bold text-[#111111] font-editorial line-clamp-1">
                            {prop.title}
                          </h4>
                          <p className="text-sm font-extrabold text-[#111111] font-editorial mt-0.5">
                            ${prop.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#2B2B2B]/10">
                          <Link
                            to={`/property/${prop.id}`}
                            onClick={() => setIsDrawerOpen(false)}
                            className="link-draw text-[11px] font-bold text-[#6E6E6E]"
                          >
                            View Dossier →
                          </Link>
                          <button
                            onClick={() => toggleFavorite(prop)}
                            className="text-[11px] text-[#555555] hover:text-red-500 font-mono font-bold transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-20 text-center space-y-3"
                  >
                    <motion.div
                      initial={reduce ? false : { scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      className="w-12 h-12 rounded-full bg-[#EFEFEF] text-[#B4B4B4] flex items-center justify-center mx-auto text-xl font-bold"
                    >
                      ♡
                    </motion.div>
                    <h4 className="text-base font-bold text-[#111111] font-editorial">No Saved Properties Yet</h4>
                    <p className="text-xs text-[#555555] max-w-xs mx-auto font-medium">
                      Click the heart icon on any property card across the marketplace to pin listings to your private dossier.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Drawer Footer Actions */}
            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.div
                  key="footer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="p-4 border-t border-[#2B2B2B]/10 bg-white space-y-2"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsDrawerOpen(false)}
                    className="btn-luxury w-full py-3 rounded-xl text-xs font-bold text-center block"
                  >
                    Inquire on All {favorites.length} Saved Properties →
                  </Link>
                  <button
                    onClick={clearFavorites}
                    className="w-full py-2 text-center text-xs text-[#555555] hover:text-red-600 font-mono font-bold cursor-pointer transition-colors"
                  >
                    Clear Saved Dossier
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
