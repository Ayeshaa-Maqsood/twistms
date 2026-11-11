import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites, setIsDrawerOpen } = useFavorites();

  const navLinks = [
    { name: 'Marketplace', path: '/' },
    { name: 'Browse Properties', path: '/search' },
    { name: 'Find an Agent', path: '/agents' },
    { name: 'Pricing Tiers', path: '/pricing' },
    { name: 'Direct Escrow & Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#FBF8F2]/90 border-b border-slate-200/80 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 py-2">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <img
              src="/logos/new-logo-removebg-preview.png"
              alt="TwistMS Properties Logo"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold tracking-tight text-[#0F172A] flex items-center gap-1.5 font-editorial">
                TwistMS <span className="text-blue-700 font-sans text-xs uppercase font-extrabold tracking-widest px-2 py-0.5 rounded bg-blue-50 border border-blue-200">USA</span>
              </span>
              <span className="block text-[11px] tracking-wider text-[#334155] uppercase font-mono font-bold">
                Architectural Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                    active
                      ? 'bg-[#0F172A] text-white shadow-sm font-bold'
                      : 'text-[#334155] hover:text-[#0F172A] hover:bg-slate-100 font-semibold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Properties Pill */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-300 text-xs font-bold text-[#0F172A] hover:border-sky-500 shadow-sm transition-colors cursor-pointer"
            >
              <svg className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'text-red-500 fill-current' : 'text-slate-600'}`} viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Saved ({favorites.length})</span>
            </button>

            <Link
              to="/submit"
              className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <span>+ List Property</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0F172A] hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2C3539]/10 bg-[#FBF8F2] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-[#2C3539] hover:bg-[#F4ECE1] font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#2C3539]/10 flex flex-col gap-2">
            <Link
              to="/submit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold btn-luxury"
            >
              + List Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
