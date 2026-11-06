import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Marketplace', path: '/' },
    { name: 'Browse Properties', path: '/search' },
    { name: 'Pricing Tiers', path: '/pricing' },
    { name: 'Direct Escrow & Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#FBF8F2]/85 border-b border-[#2C3539]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#1A202C] text-[#FBF8F2] flex items-center justify-center shadow-md group-hover:bg-[#C5A880] group-hover:text-[#1A202C] transition-all duration-300">
              <span className="font-editorial text-xl font-bold italic tracking-wider">T</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1A202C] flex items-center gap-1.5 font-editorial">
                TwistMS <span className="text-[#C5A880] font-sans text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#F4ECE1] border border-[#C5A880]/30">USA</span>
              </span>
              <span className="block text-[9px] tracking-widest text-[#64748B] uppercase font-mono">
                Architectural Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4ECE1]/70 p-1.5 rounded-full border border-[#2C3539]/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'bg-[#FFFFFF] text-[#1A202C] shadow-sm font-semibold'
                      : 'text-[#64748B] hover:text-[#1A202C] hover:bg-[#FFFFFF]/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/search"
              className="text-xs font-semibold text-[#64748B] hover:text-[#1A202C] px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/contact"
              className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <span>+ List Property</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C3539] hover:bg-[#F4ECE1]"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
              to="/contact"
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
