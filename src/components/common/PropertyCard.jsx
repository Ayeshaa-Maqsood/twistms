import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { isFinePointer, SPRING_SNAPPY } from '../../lib/motion';

/**
 * Premium property card.
 * - 3D tilt driven by motion values (no React re-render per mouse move)
 * - Champagne glare that follows the cursor
 * - Elevation, image zoom and gradient hairline border on hover
 * - Skeleton shimmer while the photo loads (fixed height = no layout shift)
 * - Spring-animated favourite button, shimmering Featured badge
 * Listing data and links are unchanged.
 */
export default function PropertyCard({ property }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(property.id);
  const reduce = useReducedMotion();
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Normalised pointer position (-0.5 … 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(191, 166, 104, 0.42) 0%, rgba(191, 166, 104, 0) 58%)`;

  const tiltEnabled = !reduce && isFinePointer();

  const handlePointerMove = (e) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  const sizeLabel =
    property.acreage > 0
      ? { value: property.acreage, unit: 'Acres', accent: true }
      : property.sqft > 0
        ? { value: property.sqft.toLocaleString(), unit: 'SqFt', accent: false }
        : null;

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: tiltEnabled ? rotateX : 0,
        rotateY: tiltEnabled ? rotateY : 0,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{ y: hovered && !reduce ? -8 : 0, scale: hovered && tiltEnabled ? 1.015 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.7 }}
      className={`glass-panel-luxury glow-border rounded-2xl overflow-hidden flex flex-col group border border-[#3E4E31]/10 relative h-full transition-shadow duration-500 ${
        hovered ? 'shadow-[0_30px_60px_-18px_rgba(26,35,21,0.32)]' : 'shadow-md'
      }`}
    >
      {/* Champagne glare follows the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-2xl"
        style={{ background: glare }}
        animate={{ opacity: hovered && tiltEnabled ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* ---------- Image ---------- */}
      <div className="relative h-60 w-full overflow-hidden bg-[#EDE6D6]">
        {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />}
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? 'scale-[1.07]' : 'scale-100'
          } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Readability gradient, deepens on hover so the price pops */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0F140C]/85 via-[#0F140C]/15 to-transparent transition-opacity duration-500 ${
            hovered ? 'opacity-95' : 'opacity-75'
          }`}
        />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
          {property.featured && (
            <motion.span
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="badge-featured px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] uppercase rounded-full shadow-md"
            >
              Featured
            </motion.span>
          )}
          <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-white/95 text-[#1A2315] shadow-md backdrop-blur-md border border-[#3E4E31]/15">
            {property.category}
          </span>
          <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-[#3E4E31]/90 text-white shadow-md backdrop-blur-md">
            For {property.type}
          </span>
        </div>

        {/* Favourite + Verified */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-20">
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property);
            }}
            whileTap={reduce ? undefined : { scale: 0.82 }}
            whileHover={reduce ? undefined : { scale: 1.08 }}
            transition={SPRING_SNAPPY}
            aria-label={favorited ? 'Remove from saved properties' : 'Save property'}
            aria-pressed={favorited}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md cursor-pointer transition-colors duration-300 ${
              favorited ? 'bg-red-500 text-white' : 'bg-white/95 text-[#1A2315] hover:text-red-500'
            }`}
          >
            <AnimatePresence>
              {favorited && !reduce && (
                <motion.span
                  key="burst"
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                  initial={{ scale: 0.6, opacity: 0.9 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
            <motion.svg
              key={favorited ? 'on' : 'off'}
              initial={reduce ? false : { scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </motion.button>

          {property.verified && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-full bg-white/95 text-[#1A2315] shadow-md backdrop-blur-md border border-[#3E4E31]/15 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#BFA668] opacity-60 animate-ping [animation-duration:2.4s]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BFA668]" />
              </span>
              Verified
            </div>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-end justify-between gap-3">
          <motion.p
            animate={{ y: hovered && !reduce ? -3 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-editorial"
          >
            ${property.price.toLocaleString()}
            {property.pricePeriod && (
              <span className="text-xs font-sans font-medium text-white/90 ml-1">{property.pricePeriod}</span>
            )}
          </motion.p>
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="hidden sm:inline-flex text-[10px] font-mono font-bold tracking-widest uppercase text-[#E8DCB4]"
          >
            {property.id.toUpperCase()}
          </motion.span>
        </div>
      </div>

      {/* ---------- Details ---------- */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10 bg-white">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#BFA668] flex items-center gap-1 mb-1 font-bold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.stateCode} {property.zip}
          </p>
          <h3 className="text-lg font-bold text-[#1A2315] group-hover:text-[#9E8547] transition-colors duration-300 line-clamp-1 font-editorial">
            {property.title}
          </h3>
          <p className="text-xs text-[#596638] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {property.description}
          </p>
        </div>

        {/* Specs row with a champagne hairline that draws in on hover */}
        <div className="relative pt-3 border-t border-[#3E4E31]/10 flex items-center justify-between text-xs text-[#596638] font-medium">
          <span
            aria-hidden="true"
            className={`absolute top-[-1px] left-0 h-px bg-[#BFA668] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hovered ? 'w-full' : 'w-0'
            }`}
          />
          {property.bedrooms > 0 && (
            <div>
              <span className="text-[#1A2315] font-bold">{property.bedrooms}</span> Beds
            </div>
          )}
          {property.bathrooms > 0 && (
            <div>
              <span className="text-[#1A2315] font-bold">{property.bathrooms}</span> Baths
            </div>
          )}
          {sizeLabel && (
            <div>
              <span className={`font-bold ${sizeLabel.accent ? 'text-[#9E8547]' : 'text-[#1A2315]'}`}>{sizeLabel.value}</span>{' '}
              {sizeLabel.unit}
            </div>
          )}
        </div>

        {/* Action */}
        <div>
          <Link
            to={`/property/${property.id}`}
            className="group/btn flex items-center justify-center gap-2 text-center py-2.5 px-4 rounded-xl text-xs font-bold btn-luxury-outline w-full"
          >
            <span>Inspect Dossier & Legal Records</span>
            <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
