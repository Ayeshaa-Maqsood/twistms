import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02040a] relative overflow-hidden text-slate-400 text-xs">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center">
                <span className="font-mono font-bold text-white text-sm">TX</span>
              </div>
              <span className="text-base font-bold text-white">TwistMS Properties</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Premier USA real-estate marketplace for residential, land, commercial, and luxury property acquisitions across all 50 states.
            </p>
            <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified US MLS/IDX & Direct Deeds
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/search" className="hover:text-cyan-300 transition-colors">Residential Homes & Estates</Link></li>
              <li><Link to="/search" className="hover:text-cyan-300 transition-colors">Agricultural & Timber Land</Link></li>
              <li><Link to="/search" className="hover:text-cyan-300 transition-colors">Commercial & Industrial Plots</Link></li>
              <li><Link to="/search" className="hover:text-cyan-300 transition-colors">Luxury Apartments & Rentals</Link></li>
              <li><Link to="/search" className="hover:text-cyan-300 transition-colors">Waterfront & Lake Properties</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5">
              <li><span className="text-slate-300">Fair Housing Act Compliant</span></li>
              <li><span className="text-slate-300">CCPA / CPRA Privacy Controls</span></li>
              <li><span className="text-slate-300">Verified Deed Escrow Process</span></li>
              <li><span className="text-slate-300">Title & Deed Document Checks</span></li>
              <li><Link to="/contact" className="hover:text-cyan-300 transition-colors">Report Suspicious Property</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase font-mono mb-4">
              Direct Inquiries
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need immediate listing support or property agent verification?
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.794 2.796.795 3.185 0 5.77-2.586 5.77-5.766 0-3.18-2.585-5.765-5.77-5.765zm3.385 8.167c-.14.394-.816.735-1.127.781-.311.047-.686.084-2.18-.535-1.906-.79-3.125-2.73-3.22-2.857-.095-.127-.775-1.031-.775-1.966s.491-1.396.666-1.587c.175-.19.381-.238.508-.238.127 0 .254.002.365.008.117.006.273-.044.427.327.159.381.54 1.317.587 1.413.048.095.079.206.016.333-.063.127-.095.206-.19.317-.095.111-.201.248-.287.333-.095.095-.194.198-.083.389.111.19.493.813 1.057 1.317.728.648 1.341.849 1.532.944.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.302.619.19.095.317.143.365.222.048.079.048.46-.095.857z"/>
                </svg>
                WhatsApp Priority Desk
              </a>
              <p className="text-[11px] font-mono text-slate-500 pt-2">
                Official: support@twistmsproperties.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} TwistMS Properties Inc. USA. All rights reserved.</p>
          <div className="flex gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
