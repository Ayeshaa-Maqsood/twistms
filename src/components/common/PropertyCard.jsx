import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import { getListingDetails } from '../../data/propertyDetails';
import { isFinePointer, SPRING_SNAPPY } from '../../lib/motion';

/**
 * Listing card, information-first:
 *   photo (status, save, photo count) → price | acreage → location → title → specs → action.
 * Keeps the favourite button, Verified badge, gentle 3D tilt and hover lift.
 */
export default function PropertyCard({ property }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(property.id);
  const reduce = useReducedMotion();
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const info = getListingDetails(property);

  // Subtle tilt (motion values, no re-render per mouse move)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [3, -3]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-3, 3]), spring);
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

  const href = `/property/${property.id}`;
  const specs = [
    property.bedrooms > 0 && `${property.bedrooms} Beds`,
    property.bathrooms > 0 && `${property.bathrooms} Baths`,
    property.sqft > 0 && `${property.sqft.toLocaleString()} Sq Ft`,
  ].filter(Boolean);

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: tiltEnabled ? rotateX : 0,
        rotateY: tiltEnabled ? rotateY : 0,
        transformPerspective: 1200,
      }}
      animate={{ y: hovered && !reduce ? -6 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.7 }}
      className={`relative h-full flex flex-col bg-white rounded-2xl overflow-hidden border transition-[box-shadow,border-color] duration-500 ${
        hovered
          ? 'border-[#BFA668]/60 shadow-[0_26px_50px_-20px_rgba(26,35,21,0.35)]'
          : 'border-[#3E4E31]/12 shadow-[0_6px_18px_-10px_rgba(26,35,21,0.18)]'
      }`}
    >
      {/* ---------- Photo ---------- */}
      <Link to={href} className="relative block h-56 overflow-hidden bg-[#EDE6D6]" tabIndex={-1} aria-hidden="true">
        {!imgLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={property.image}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered && !reduce ? 'scale-[1.06]' : 'scale-100'
          } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0F140C]/60 to-transparent" />

        {/* Status ribbon */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pr-24">
          {property.featured && (
            <span className="badge-featured px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] uppercase rounded-md shadow">Featured</span>
          )}
          <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-md bg-[#1F2A17]/90 text-white shadow">
            For {property.type}
          </span>
        </div>

        {/* Photo count */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#0F140C]/70 text-white text-[10px] font-bold backdrop-blur">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 4h3.86a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <circle cx="12" cy="13" r="3" strokeWidth="2" />
          </svg>
          {info.photos.length}
          {info.videos.length > 0 && <span className="ml-1">· ▶ {info.videos.length}</span>}
        </span>
      </Link>

      {/* Save + Verified (outside the link so they don't navigate) */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        {property.verified && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-extrabold rounded-md bg-white/95 text-[#1A2315] shadow uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFA668]" /> Verified
          </span>
        )}
        <motion.button
          type="button"
          onClick={() => toggleFavorite(property)}
          whileTap={reduce ? undefined : { scale: 0.82 }}
          transition={SPRING_SNAPPY}
          aria-label={favorited ? 'Remove from saved properties' : 'Save property'}
          aria-pressed={favorited}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow cursor-pointer transition-colors duration-300 ${
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
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.button>
      </div>

      {/* ---------- Details ---------- */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">
        {/* Price | Acreage */}
        <p className="flex flex-wrap items-baseline gap-x-2 text-[#1A2315]">
          <span className="text-xl font-extrabold font-editorial">
            ${property.price.toLocaleString()}
            {property.pricePeriod && <span className="text-xs font-semibold text-[#596638] ml-0.5">{property.pricePeriod}</span>}
          </span>
          {property.acreage > 0 && (
            <>
              <span className="text-[#BFA668] font-bold" aria-hidden="true">|</span>
              <span className="text-sm font-extrabold text-[#3E4E31]">{property.acreage} Acres</span>
            </>
          )}
        </p>

        {/* Location */}
        <p className="mt-1 text-xs font-bold text-[#9E8547] uppercase tracking-wide">
          {[info.county, property.stateCode].filter(Boolean).join(', ')}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-base font-bold text-[#1A2315] leading-snug line-clamp-2 font-editorial">
          <Link to={href} className="hover:text-[#3E4E31] focus:outline-none after:absolute after:inset-0 after:content-[''] after:z-0">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-[#596638] font-medium">{property.city}, {property.state} {property.zip}</p>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="px-2 py-1 rounded-md bg-[#F4EDDA]/70 text-[11px] font-bold text-[#3E4E31]">{property.category}</span>
          {specs.map((sp) => (
            <span key={sp} className="px-2 py-1 rounded-md bg-[#FBF8F2] border border-[#3E4E31]/10 text-[11px] font-semibold text-[#1A2315]">{sp}</span>
          ))}
        </div>

        {/* Action */}
        <div className="mt-auto pt-4">
          <div className="relative pt-3 border-t border-[#3E4E31]/10 flex items-center justify-between text-xs">
            <span
              aria-hidden="true"
              className={`absolute top-[-1px] left-0 h-px bg-[#BFA668] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered ? 'w-full' : 'w-0'}`}
            />
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#838961]">ID {property.id.toUpperCase()}</span>
            <span className="inline-flex items-center gap-1.5 font-extrabold text-[#3E4E31]">
              View Property
              <span className={`inline-block transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
