import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#2C3539]/10 bg-[#FFFFFF] relative overflow-hidden text-[#64748B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex flex-col items-start gap-3">
              <img
                src="/logos/TwistMs-Main-Logo-removebg-preview.png"
                alt="TwistMS Properties"
                className="h-20 w-auto object-contain"
              />
              <span className="text-xl font-bold text-[#1A202C] font-editorial">TwistMS Properties</span>
            </Link>
            <p className="text-[#64748B] leading-relaxed text-xs font-light">
              USA-wide luxury and commercial real estate platform connecting discerning buyers, verified property sellers, and licensed brokerage agents.
            </p>
            <div className="text-[11px] font-mono text-[#A6885E] flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
              Verified MLS/IDX & Certified Deeds
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#1A202C] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Acquisitions
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/search" className="hover:text-[#A6885E] transition-colors">Residential Homes & Estates</Link></li>
              <li><Link to="/search" className="hover:text-[#A6885E] transition-colors">Timberland & Agricultural Land</Link></li>
              <li><Link to="/search" className="hover:text-[#A6885E] transition-colors">Commercial & Industrial Parks</Link></li>
              <li><Link to="/agents" className="hover:text-[#A6885E] transition-colors font-medium text-[#1A202C]">Find an Agent Directory →</Link></li>
              <li><Link to="/submit" className="hover:text-[#A6885E] transition-colors font-medium text-[#1A202C]">Submit Property Deed →</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-[#1A202C] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5">
              <li><span className="text-[#1A202C] font-medium">Fair Housing Act Compliant</span></li>
              <li><span className="text-[#1A202C] font-medium">CCPA / CPRA Consumer Privacy</span></li>
              <li><span className="text-[#1A202C] font-medium">Verified Deed Escrow Intake</span></li>
              <li><span className="text-[#1A202C] font-medium">Document Authenticity Reviews</span></li>
              <li><Link to="/contact" className="hover:text-[#A6885E] transition-colors">Report Suspicious Property</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1A202C] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Concierge Desk
            </h4>
            <p className="text-xs text-[#64748B] mb-3 font-light">
              Direct connection with our USA listing coordinator for rapid deed verification.
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/15550199000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F4ECE1] text-[#1A202C] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all font-semibold"
              >
                <span>WhatsApp Priority Desk</span>
              </a>
              <p className="text-[11px] font-mono text-[#64748B] pt-2">
                Official: support@twistmsproperties.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#2C3539]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[#9CA3AF]">
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
