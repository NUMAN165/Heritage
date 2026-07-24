import React from 'react';
import { Landmark, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-slate-800 mt-20 pt-12 pb-8 px-6 md:px-12 text-slate-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500 rounded-lg text-slate-950">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-amber-400 text-lg tracking-wider">HERITAGE</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Official E-Ticketing portal for national monuments, UNESCO sites, and ancient forts managed by the Archaeological Survey of India (ASI).
          </p>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> ASI Verified Gateway
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-slate-200 mb-4 text-sm tracking-wide">Quick Exploration</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/sites?category=Fort" className="hover:text-amber-400 transition-colors">Historical Forts</Link>
            </li>
            <li>
              <Link to="/sites?category=Tomb" className="hover:text-amber-400 transition-colors">Royal Tombs & Mausoleums</Link>
            </li>
            <li>
              <Link to="/sites?category=Palace" className="hover:text-amber-400 transition-colors">Palaces & Estates</Link>
            </li>
            <li>
              <Link to="/sites?category=Cave" className="hover:text-amber-400 transition-colors">Rock-cut Caves</Link>
            </li>
          </ul>
        </div>

        {/* Guidelines */}
        <div>
          <h4 className="font-serif font-bold text-slate-200 mb-4 text-sm tracking-wide">Visitor Guidelines</h4>
          <ul className="space-y-2.5 text-xs">
            <li className="hover:text-slate-300">Valid ID Proof mandatory at gate entry</li>
            <li className="hover:text-slate-300">Tickets are valid for specific visit date</li>
            <li className="hover:text-slate-300">Strict restriction on plastic & inflammable items</li>
            <li className="hover:text-slate-300">Free entry for children under 15 years</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-serif font-bold text-slate-200 mb-4 text-sm tracking-wide">ASI Help Desk</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Janpath, New Delhi - 110011</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 11 2301 3561</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>support@heritagepass.gov.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Archaeological Survey of India (ASI). All Rights Reserved.</p>
        <p className="font-sans">Engineered for Seamless Cultural Heritage Exploration.</p>
      </div>
    </footer>
  );
};
