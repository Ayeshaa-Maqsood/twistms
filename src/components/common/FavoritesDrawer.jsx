import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesDrawer() {
  const { favorites, isDrawerOpen, setIsDrawerOpen, toggleFavorite, clearFavorites } = useFavorites();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Dimmed Overlay */}
      <div
        className="fixed inset-0 bg-[#1A202C]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#FBF8F2] h-full shadow-2xl border-l border-[#2C3539]/15 flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 className="text-xl font-extrabold text-[#0F172A] font-editorial">
              Saved Acquisitions ({favorites.length})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#334155] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Saved Listings Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {favorites.length > 0 ? (
            favorites.map((prop) => (
              <div
                key={prop.id}
                className="glass-panel-luxury p-3.5 rounded-2xl border border-slate-200 bg-white flex gap-3 relative group shadow-sm hover:shadow-md"
              >
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-100 border border-slate-200"
                />
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                      {prop.city}, {prop.stateCode}
                    </span>
                    <h4 className="text-sm font-bold text-[#0F172A] font-editorial line-clamp-1">
                      {prop.title}
                    </h4>
                    <p className="text-sm font-extrabold text-[#0F172A] font-editorial mt-0.5">
                      ${prop.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <Link
                      to={`/property/${prop.id}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-[11px] font-bold text-blue-700 hover:underline"
                    >
                      View Dossier →
                    </Link>
                    <button
                      onClick={() => toggleFavorite(prop)}
                      className="text-[11px] text-[#475569] hover:text-red-500 font-mono font-bold transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center mx-auto text-xl font-bold">
                ♡
              </div>
              <h4 className="text-base font-bold text-[#0F172A] font-editorial">No Saved Properties Yet</h4>
              <p className="text-xs text-[#334155] max-w-xs mx-auto font-medium">
                Click the heart icon on any property card across the marketplace to pin listings to your private dossier.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white space-y-2">
            <Link
              to="/contact"
              onClick={() => setIsDrawerOpen(false)}
              className="btn-luxury w-full py-3 rounded-xl text-xs font-bold text-center block"
            >
              Inquire on All {favorites.length} Saved Properties →
            </Link>
            <button
              onClick={clearFavorites}
              className="w-full py-2 text-center text-xs text-[#475569] hover:text-red-600 font-mono font-bold cursor-pointer"
            >
              Clear Saved Dossier
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

