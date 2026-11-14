import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, whatsappLink } from '../../config/brand';

const SOCIAL_ICONS = {
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" />
  ),
  tiktok: (
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.68a5.68 5.68 0 0 0-.8-.06A5.7 5.7 0 0 0 4.16 15.3 5.7 5.7 0 0 0 9.86 21a5.7 5.7 0 0 0 5.69-5.7V9.01a7.35 7.35 0 0 0 4.29 1.37V7.3a4.27 4.27 0 0 1-3.24-1.48z" />
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-[#2B2B2B]/15 bg-[#FFFFFF] relative overflow-hidden text-[#555555] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3" aria-label={`${BRAND.fullName} home`}>
              <img
                src={BRAND.logo.color}
                alt=""
                className="h-16 w-16 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold text-[#111111] font-editorial">{BRAND.name}</span>
                <span className="mt-1 text-[10px] tracking-[0.32em] uppercase font-bold text-[#6E6E6E]">Properties · {BRAND.market}</span>
              </span>
            </Link>
            <p className="text-[#555555] leading-relaxed text-xs font-normal">
              USA-wide luxury and commercial real estate platform connecting discerning buyers, verified property sellers, and licensed brokerage agents.
            </p>
            <div className="text-[11px] font-mono text-[#B4B4B4] flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B4B4B4]"></span>
              Verified MLS/IDX & Certified Deeds
            </div>
            <div className="flex items-center gap-2 pt-1" aria-label="Official US social channels">
              {BRAND.social.map((sc) => (
                <a
                  key={sc.key}
                  href={sc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sc.label}
                  title={sc.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1C1C1C] text-[#FAFAFA] hover:bg-[#B4B4B4] hover:text-[#111111] transition-colors duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">{SOCIAL_ICONS[sc.key]}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Acquisitions
            </h4>
            <ul className="space-y-2.5 font-medium text-[#555555]">
              <li><Link to="/search" className="hover:text-[#B4B4B4] transition-colors">Residential Homes & Estates</Link></li>
              <li><Link to="/search" className="hover:text-[#B4B4B4] transition-colors">Timberland & Agricultural Land</Link></li>
              <li><Link to="/search" className="hover:text-[#B4B4B4] transition-colors">Commercial & Industrial Parks</Link></li>
              <li><Link to="/agents" className="hover:text-[#B4B4B4] transition-colors font-bold text-[#111111]">Find an Agent Directory →</Link></li>
              <li><Link to="/submit" className="hover:text-[#B4B4B4] transition-colors font-bold text-[#111111]">Submit Property Deed →</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 font-medium text-[#555555]">
              <li><span className="text-[#111111] font-semibold">Fair Housing Act Compliant</span></li>
              <li><span className="text-[#111111] font-semibold">CCPA / CPRA Consumer Privacy</span></li>
              <li><span className="text-[#111111] font-semibold">Verified Deed Escrow Intake</span></li>
              <li><span className="text-[#111111] font-semibold">Document Authenticity Reviews</span></li>
              <li><Link to="/contact" className="hover:text-[#B4B4B4] transition-colors">Report Suspicious Property</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#111111] font-bold text-xs tracking-widest uppercase font-mono mb-4">
              Concierge Desk
            </h4>
            <p className="text-xs text-[#555555] mb-3 font-medium">
              Direct connection with our USA listing coordinator for rapid deed verification.
            </p>
            <div className="space-y-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#EFEFEF] text-[#111111] border border-[#B4B4B4]/40 hover:border-[#B4B4B4] transition-all font-bold"
              >
                <span>WhatsApp Priority Desk</span>
              </a>
              <p className="text-[11px] font-mono text-[#555555] pt-2 font-semibold">
                Official: <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-[#6E6E6E]">{BRAND.supportEmail}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#2B2B2B]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[#555555] font-medium">
          <p>© {new Date().getFullYear()} {BRAND.fullName} Inc. {BRAND.market}. All rights reserved.</p>
          <div className="flex gap-6 text-[11px] font-semibold text-[#555555]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
