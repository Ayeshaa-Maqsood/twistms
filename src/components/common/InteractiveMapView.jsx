import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE, SPRING_SNAPPY } from '../../lib/motion';

// Approximate relative coordinates for 6 USA states on the map canvas
const STATE_COORDINATES = {
  TX: { top: 65, left: 46 },
  CO: { top: 48, left: 38 },
  FL: { top: 78, left: 76 },
  CA: { top: 48, left: 14 },
  MT: { top: 22, left: 32 },
  NY: { top: 34, left: 84 },
};

// Small deterministic spread so several listings in the same state don't stack
const SPREAD = [
  [0, 0], [3.2, -2.4], [-3, 2.6], [2.6, 3], [-2.8, -2.8], [0.5, 4.2], [4, 1], [-4, 0.6],
];

export default function InteractiveMapView({ properties, onSelectProperty }) {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const reduce = useReducedMotion();

  const pins = useMemo(() => {
    const perState = {};
    return properties.map((prop) => {
      const base = STATE_COORDINATES[prop.stateCode] || { top: 50, left: 50 };
      const n = (perState[prop.stateCode] = (perState[prop.stateCode] || 0) + 1) - 1;
      const [dx, dy] = SPREAD[n % SPREAD.length];
      return { prop, top: base.top + dy, left: base.left + dx };
    });
  }, [properties]);

  const select = (prop) => {
    setSelected(prop);
    if (typeof onSelectProperty === 'function') onSelectProperty(prop);
  };

  const selectedPin = selected ? pins.find((p) => p.prop.id === selected.id) : null;

  return (
    <div className="glass-panel-luxury rounded-3xl border border-[#2B2B2B]/10 bg-white p-4 sm:p-6 overflow-hidden shadow-xl space-y-4">

      {/* Map Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#2B2B2B]/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#B4B4B4] opacity-70 animate-ping [animation-duration:2.2s]" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B4B4B4]" />
          </span>
          <h3 className="text-sm font-bold text-[#111111] font-mono uppercase tracking-wider">
            USA Interactive Satellite Map (PRD §7)
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
          <span className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={properties.length}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="tabular-nums font-bold text-[#111111]"
              >
                {properties.length}
              </motion.span>
            </AnimatePresence>
            Active Pins
          </span>
          <span className="text-[11px] font-mono text-[#6E6E6E]">
            *Click pin to inspect parcel preview
          </span>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden bg-[#111111] border border-[#2B2B2B]/15">

        {/* Stylized Minimalist Map Texture Backing */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/55" />
        {/* Vignette for depth */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10, 10, 10,0.65)_100%)]" />

        {/* Map Grid Watermark (slow drift) */}
        <div className="absolute inset-0 grid-fine-light grid-drift opacity-60 pointer-events-none" />

        {/* Territory Compass Watermark */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="absolute top-4 left-4 z-10 glass-panel-luxury px-3 py-1.5 rounded-xl bg-white/90 text-[10px] font-mono font-bold text-[#111111]"
        >
          MAP DATUM: WGS84 · CONTINENTAL USA
        </motion.div>

        {/* Crosshair guides for the selected parcel */}
        <AnimatePresence>
          {selectedPin && !reduce && (
            <React.Fragment key={`guides-${selected.id}`}>
              <motion.div
                className="absolute left-0 right-0 h-px bg-[#B4B4B4]/45 pointer-events-none z-10 origin-left"
                style={{ top: `${selectedPin.top}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-px bg-[#B4B4B4]/45 pointer-events-none z-10 origin-top"
                style={{ left: `${selectedPin.left}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </React.Fragment>
          )}
        </AnimatePresence>

        {/* Interactive Property Map Pins */}
        {pins.map(({ prop, top, left }, i) => {
          const isSelected = selected?.id === prop.id;
          const isHovered = hoveredId === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)' }}
              className={`absolute ${isSelected || isHovered ? 'z-30' : 'z-20'}`}
            >
              <motion.button
                type="button"
                initial={reduce ? false : { opacity: 0, y: -18, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.15 + i * 0.05 }}
                onClick={() => select(prop)}
                onPointerEnter={() => setHoveredId(prop.id)}
                onPointerLeave={() => setHoveredId(null)}
                whileHover={reduce ? undefined : { scale: 1.08 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
                className="relative block cursor-pointer group focus:outline-none"
                aria-label={`${prop.title}, ${prop.city} ${prop.stateCode}, $${prop.price.toLocaleString()}`}
                aria-pressed={isSelected}
              >
                {/* Concentric pulse */}
                <span className={`absolute inset-0 m-auto w-8 h-8 rounded-full ring-expand ${isSelected ? 'opacity-100' : 'opacity-60'}`} />

                {/* Pin Head Pill */}
                <span
                  className={`relative px-2.5 py-1 rounded-full text-[11px] font-bold font-editorial shadow-lg flex items-center gap-1.5 transition-colors duration-300 border ${
                    isSelected
                      ? 'bg-[#B4B4B4] text-[#111111] border-white/80 ring-2 ring-[#B4B4B4]/40'
                      : 'bg-[#111111] text-white border-white/20 group-hover:bg-[#B4B4B4] group-hover:text-[#111111]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#111111]' : 'bg-[#B4B4B4] group-hover:bg-[#111111]'}`} />
                  <span className="tabular-nums">${(prop.price / 1000).toFixed(0)}k</span>
                </span>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.span
                      key="tip"
                      initial={{ opacity: 0, y: 4, scale: 0.96, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                      exit={{ opacity: 0, y: 4, scale: 0.96, x: '-50%' }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute left-1/2 bottom-full mb-2 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-white text-[#111111] text-[10px] font-bold shadow-xl border border-[#2B2B2B]/10 pointer-events-none"
                    >
                      <span className="block font-mono text-[#6E6E6E] uppercase tracking-wider text-[9px]">{prop.city}, {prop.stateCode}</span>
                      <span className="block max-w-[180px] truncate">{prop.title}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        })}

        {/* Selected Property Preview Card */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } }}
              exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.18 } }}
              className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-[340px] z-40 glass-panel-luxury glow-border is-active p-3.5 rounded-2xl border border-[#2B2B2B]/20 bg-white/95 shadow-2xl flex gap-3"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#EFEFEF] shrink-0">
                <motion.img
                  src={selected.image}
                  alt={selected.title}
                  initial={reduce ? false : { scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <span className="text-[10px] font-mono text-[#6E6E6E] uppercase font-bold">
                    {selected.city}, {selected.stateCode}
                  </span>
                  <h4 className="text-xs font-bold text-[#111111] font-editorial line-clamp-1">
                    {selected.title}
                  </h4>
                  <p className="text-sm font-bold text-[#111111] font-editorial mt-0.5">
                    ${selected.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2B2B2B]/10">
                  <Link
                    to={`/property/${selected.id}`}
                    className="btn-luxury px-3 py-1.5 rounded-lg text-[10px] font-semibold"
                  >
                    View Details →
                  </Link>
                  <motion.button
                    onClick={() => setSelected(null)}
                    whileTap={reduce ? undefined : { scale: 0.9 }}
                    transition={SPRING_SNAPPY}
                    className="text-[10px] text-[#8A8A8A] hover:text-[#111111] font-mono transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
