import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="glass-panel-luxury glass-card-interactive rounded-2xl overflow-hidden flex flex-col group border border-[#2C3539]/10 hover:border-[#C5A880]/60 transition-all duration-300">
      
      {/* Property Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-[#E2E3E5]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/80 via-transparent to-transparent opacity-60" />

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-[#FFFFFF]/90 text-[#1A202C] shadow-sm backdrop-blur-md">
            {property.category}
          </span>
          <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-[#F4ECE1]/90 text-[#64748B] shadow-sm backdrop-blur-md">
            For {property.type}
          </span>
        </div>

        {property.verified && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full bg-[#FFFFFF]/90 text-[#2C3539] shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
            <span className="font-semibold text-[10px] uppercase tracking-wider">Verified Deed</span>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3.5 left-3.5">
          <p className="text-2xl font-bold text-white tracking-tight drop-shadow-sm font-editorial">
            ${property.price.toLocaleString()}
            {property.pricePeriod && (
              <span className="text-xs font-sans font-normal text-white/90 ml-1">{property.pricePeriod}</span>
            )}
          </p>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-1 mb-1 font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.stateCode} {property.zip}
          </p>
          <h3 className="text-lg font-bold text-[#1A202C] group-hover:text-[#A6885E] transition-colors line-clamp-1 font-editorial">
            {property.title}
          </h3>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs Row */}
        <div className="pt-3 border-t border-[#2C3539]/10 flex items-center justify-between text-xs text-[#64748B]">
          {property.bedrooms > 0 && (
            <div>
              <span className="text-[#1A202C] font-semibold">{property.bedrooms}</span> Beds
            </div>
          )}
          {property.bathrooms > 0 && (
            <div>
              <span className="text-[#1A202C] font-semibold">{property.bathrooms}</span> Baths
            </div>
          )}
          {property.acreage > 0 ? (
            <div>
              <span className="text-[#A6885E] font-semibold">{property.acreage}</span> Acres
            </div>
          ) : property.sqft > 0 ? (
            <div>
              <span className="text-[#1A202C] font-semibold">{property.sqft.toLocaleString()}</span> SqFt
            </div>
          ) : null}
        </div>

        {/* Action Button */}
        <div>
          <Link
            to={`/property/${property.id}`}
            className="block text-center py-2.5 px-4 rounded-xl text-xs font-semibold btn-luxury-outline w-full"
          >
            Inspect Dossier & Legal Records →
          </Link>
        </div>
      </div>
    </div>
  );
}
