import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#FFFFFF] relative overflow-hidden text-[#334155] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex flex-col items-start gap-3">
              <img
                src="/logos/new-logo-removebg-preview.png"
                alt="TwistMS Properties"
                className="h-16 w-auto object-contain"
              />
              <span className="text-xl font-extrabold text-[#0F172A] font-editorial">TwistMS Properties</span>
            </Link>
            <p className="text-[#334155] leading-relaxed text-xs font-normal">
              USA-wide luxury and commercial real estate platform connecting discerning buyers, verified property sellers, and licensed brokerage agents.
            </p>
            <div className="text-[11px] font-mono text-blue-700 flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Verified MLS/IDX & Certified Deeds
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#0F172A] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Acquisitions
            </h4>
            <ul className="space-y-2.5 font-medium text-[#334155]">
              <li><Link to="/search" className="hover:text-blue-700 transition-colors">Residential Homes & Estates</Link></li>
              <li><Link to="/search" className="hover:text-blue-700 transition-colors">Timberland & Agricultural Land</Link></li>
              <li><Link to="/search" className="hover:text-blue-700 transition-colors">Commercial & Industrial Parks</Link></li>
              <li><Link to="/agents" className="hover:text-blue-700 transition-colors font-bold text-[#0F172A]">Find an Agent Directory →</Link></li>
              <li><Link to="/submit" className="hover:text-blue-700 transition-colors font-bold text-[#0F172A]">Submit Property Deed →</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-[#0F172A] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 font-medium text-[#334155]">
              <li><span className="text-[#0F172A] font-semibold">Fair Housing Act Compliant</span></li>
              <li><span className="text-[#0F172A] font-semibold">CCPA / CPRA Consumer Privacy</span></li>
              <li><span className="text-[#0F172A] font-semibold">Verified Deed Escrow Intake</span></li>
              <li><span className="text-[#0F172A] font-semibold">Document Authenticity Reviews</span></li>
              <li><Link to="/contact" className="hover:text-blue-700 transition-colors">Report Suspicious Property</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#0F172A] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Concierge Desk
            </h4>
            <p className="text-xs text-[#334155] mb-3 font-medium">
              Direct connection with our USA listing coordinator for rapid deed verification.
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 text-[#0F172A] border border-slate-300 hover:border-sky-500 transition-all font-bold"
              >
                <span>WhatsApp Priority Desk</span>
              </a>
              <p className="text-[11px] font-mono text-[#475569] pt-2 font-semibold">
                Official: support@twistmsproperties.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[#475569] font-medium">
          <p>© {new Date().getFullYear()} TwistMS Properties Inc. USA. All rights reserved.</p>
          <div className="flex gap-6 text-[11px] font-semibold text-[#334155]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
