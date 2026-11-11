import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export default function PropertyCard({ property }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Magnetic Tilt Physics Calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;  // Max 6deg

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
      }}
      className="glass-panel-luxury rounded-2xl overflow-hidden flex flex-col group border border-[#3E4E31]/10 hover:border-[#BFA668]/60 relative will-change-transform shadow-md hover:shadow-2xl"
    >
      {/* Dynamic Champagne Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(191, 166, 104, 0.45) 0%, transparent 60%)`,
        }}
      />

      {/* Property Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-[#E2E3E5]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/80 via-transparent to-transparent opacity-60" />

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-white text-[#1A2315] shadow-md backdrop-blur-md border border-[#3E4E31]/20">
            {property.category}
          </span>
          <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-[#3E4E31]/90 text-white shadow-md backdrop-blur-md">
            For {property.type}
          </span>
        </div>

        {/* Favorite Heart Button & Verified Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property);
            }}
            aria-label="Save Property"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md cursor-pointer ${
              favorited
                ? 'bg-red-500 text-white shadow-red-500/30 scale-110'
                : 'bg-white/95 text-[#1A2315] hover:text-red-500 hover:scale-110'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          {property.verified && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full bg-white text-[#1A2315] shadow-md backdrop-blur-md border border-[#3E4E31]/20">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BFA668]"></span>
              <span className="font-bold text-[10px] uppercase tracking-wider">Verified</span>
            </div>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <p className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-editorial">
            ${property.price.toLocaleString()}
            {property.pricePeriod && (
              <span className="text-xs font-sans font-medium text-white/90 ml-1">{property.pricePeriod}</span>
            )}
          </p>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10 bg-white">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#BFA668] flex items-center gap-1 mb-1 font-bold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.stateCode} {property.zip}
          </p>
          <h3 className="text-lg font-bold text-[#1A2315] group-hover:text-[#BFA668] transition-colors line-clamp-1 font-editorial">
            {property.title}
          </h3>
          <p className="text-xs text-[#596638] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {property.description}
          </p>
        </div>

        {/* Specs Row */}
        <div className="pt-3 border-t border-[#3E4E31]/10 flex items-center justify-between text-xs text-[#596638] font-medium">
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
          {property.acreage > 0 ? (
            <div>
              <span className="text-[#BFA668] font-bold">{property.acreage}</span> Acres
            </div>
          ) : property.sqft > 0 ? (
            <div>
              <span className="text-[#1A2315] font-bold">{property.sqft.toLocaleString()}</span> SqFt
            </div>
          ) : null}
        </div>

        {/* Action Button */}
        <div>
          <Link
            to={`/property/${property.id}`}
            className="block text-center py-2.5 px-4 rounded-xl text-xs font-bold btn-luxury-outline w-full"
          >
            Inspect Dossier & Legal Records →
          </Link>
        </div>
      </div>
    </div>
  );
}
