import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { propertiesData } from '../../data/properties';

const count = (cat) => propertiesData.filter((p) => p.category === cat).length;

const TILES = [
  {
    cat: 'Residential',
    label: 'Homes & Estates',
    hint: 'Family homes, estates, townhouses',
    icon: 'M3 11.5L12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5h4v5',
  },
  {
    cat: 'Land',
    label: 'Land & Ranches',
    hint: 'Acreage, farms, hunting, timber',
    icon: 'M3 18c3-4 6-6 9-6s6 2 9 6M3 21h18M7 10a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM7 10v4',
  },
  {
    cat: 'Commercial',
    label: 'Commercial',
    hint: 'Offices, industrial, investment',
    icon: 'M4 21V5l8-2v18M12 8h8v13M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M3 21h18',
  },
  {
    cat: 'Rental',
    label: 'Rentals',
    hint: 'Monthly homes & residences',
    icon: 'M15 7a4 4 0 11-3.9 4.9L4 19v2h3v-2h2v-2h2l1.1-1.1A4 4 0 0115 7zM16 10h.01',
  },
];

/**
 * Content for the end of the 3D hero, where the cream wipe covers the scene.
 * Fades in with the wipe, follows the cursor slightly, and every tile is a
 * real link into search. Clicks only register once the panel is visible.
 */
export default function HeroHandoff({ progress, mouseX, mouseY }) {
  const opacity = useTransform(progress, [0.9, 0.97], [0, 1]);
  const y = useTransform(progress, [0.9, 1], [40, 0]);
  const pointerEvents = useTransform(progress, (v) => (v > 0.93 ? 'auto' : 'none'));
  // Gentle cursor parallax: heading and tiles drift in opposite directions
  const headX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const headY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const tilesX = useTransform(mouseX, [-1, 1], [12, -12]);
  const tilesY = useTransform(mouseY, [-1, 1], [8, -8]);

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center py-4 sm:py-8"
      style={{ opacity, y, pointerEvents }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div style={{ x: headX, y: headY }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#9E8547]">From blueprint to your front door</p>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A2315] font-editorial text-balance">
            What are you looking for?
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#596638] font-medium max-w-xl mx-auto">
            Choose a property type to jump straight to matching listings, or keep scrolling to search by city, ZIP or state.
          </p>
        </motion.div>

        <motion.div style={{ x: tilesX, y: tilesY }} className="mt-5 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TILES.map((t) => (
            <motion.div key={t.cat} whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <Link
                to={`/search?cat=${t.cat}`}
                className="group relative flex flex-col items-center gap-1.5 sm:gap-3 p-3 sm:p-5 lg:p-6 rounded-2xl bg-white border border-[#3E4E31]/12 shadow-[0_14px_34px_-22px_rgba(26,35,21,0.5)] hover:border-[#BFA668] hover:shadow-[0_26px_50px_-22px_rgba(191,166,104,0.75)] transition-[border-color,box-shadow] duration-300 overflow-hidden"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F4EDDA]/0 to-[#F4EDDA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#1F2A17] text-[#D4C28E] flex items-center justify-center group-hover:bg-[#BFA668] group-hover:text-[#1A2315] group-hover:rotate-[8deg] transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={t.icon} />
                  </svg>
                </span>
                <span className="relative text-sm sm:text-base font-extrabold text-[#1A2315] font-editorial">{t.label}</span>
                <span className="relative hidden sm:block text-[11px] text-[#596638] font-medium">{t.hint}</span>
                <span className="relative text-[10px] font-bold uppercase tracking-widest text-[#9E8547]">
                  {count(t.cat)} featured <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="hidden sm:block mt-6 lg:mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#838961] animate-bounce">Scroll to search ↓</p>
      </div>
    </motion.div>
  );
}
