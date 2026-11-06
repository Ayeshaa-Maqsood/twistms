import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="glass-panel glass-panel-interactive rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
      {/* Property Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-80" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
            {property.category}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 backdrop-blur-md">
            For {property.type}
          </span>
        </div>

        {property.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Verified Deed</span>
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <p className="text-2xl font-bold text-white tracking-tight">
            ${property.price.toLocaleString()}
            {property.pricePeriod && (
              <span className="text-xs font-normal text-slate-300">{property.pricePeriod}</span>
            )}
          </p>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-mono text-cyan-400 flex items-center gap-1 mb-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.city}, {property.stateCode} {property.zip}
          </p>
          <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            {property.description}
          </p>
        </div>

        {/* Key Specs Row */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">{property.bedrooms}</span> Beds
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">{property.bathrooms}</span> Baths
            </div>
          )}
          {property.acreage > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-cyan-300 font-medium">{property.acreage}</span> Acres
            </div>
          ) : property.sqft > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">{property.sqft.toLocaleString()}</span> SqFt
            </div>
          ) : null}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            to={`/property/${property.id}`}
            className="block text-center py-2 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-cyan-500/20 text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
          >
            Inspect Property & Records →
          </Link>
        </div>
      </div>
    </div>
  );
}
