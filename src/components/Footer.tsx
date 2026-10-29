import React from 'react';
import { OFFICIAL_CONTACT } from '../data/editors';
import { CATEGORIES_LIST } from '../data/categories';
import { TechCategory } from '../types/blog';
import { Phone, Mail, MessageCircle, Shield, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { TechLogoFull } from './Logo';

export type NavTab = 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards';

interface FooterProps {
  onSelectCategory: (category: TechCategory) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigateTab }) => {
  return (
    <footer className="bg-[#031d16] border-t border-[#10b981]/25 text-slate-300 font-sans relative">
      
      {/* Top Banner Accent with emerald and yellow highlight */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#10b981] via-[#facc15] to-[#34d399]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <TechLogoFull size="md" showTagline={false} />

            <div className="text-xs font-mono text-[#34d399] tracking-wider uppercase font-bold">
              ENGINEERING JOURNAL — PUBLISHED DAILY
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An independent technical journal investigating cybersecurity defenses, distributed cloud systems, high-ticket engineering consulting, and high-performance hardware benchmarks.
            </p>

            {/* Official Contact Pill Grid */}
            <div className="p-4 rounded-xl bg-[#062920] border border-[#10b981]/25 space-y-2 text-xs font-mono">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Official Newsroom Hotlines:
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-400">Phone / WA:</span>
                <a 
                  href={OFFICIAL_CONTACT.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#34d399] hover:underline font-bold"
                >
                  {OFFICIAL_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-400">Official Email:</span>
                <a 
                  href={`mailto:${OFFICIAL_CONTACT.email}`} 
                  className="text-[#34d399] hover:underline truncate max-w-[200px]"
                >
                  {OFFICIAL_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Investigation Disciplines */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#34d399] uppercase tracking-wider mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.slug}/`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                        e.preventDefault();
                        onSelectCategory(cat.id);
                        onNavigateTab('feed');
                      }
                    }}
                    className="text-slate-300 hover:text-[#34d399] transition-colors text-left block"
                  >
                    {cat.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Journal Departments */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#34d399] uppercase tracking-wider mb-4">
              Newsroom Desks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a 
                  href="/feed/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('feed');
                    }
                  }} 
                  className="hover:text-[#34d399] transition-colors block"
                >
                  Daily Wire Feed
                </a>
              </li>
              <li>
                <a 
                  href="/about/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('about');
                    }
                  }} 
                  className="hover:text-[#34d399] transition-colors block"
                >
                  Editorial Manifesto
                </a>
              </li>
              <li>
                <a 
                  href="/editors/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('editors');
                    }
                  }} 
                  className="hover:text-[#34d399] transition-colors block"
                >
                  Board of Editors
                </a>
              </li>
              <li>
                <a 
                  href="/contact/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('contact');
                    }
                  }} 
                  className="hover:text-[#34d399] transition-colors block"
                >
                  Submit Investigation / Pitch
                </a>
              </li>
              <li>
                <a 
                  href={OFFICIAL_CONTACT.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#34d399] transition-colors flex items-center gap-1 text-[#10b981]"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 5 Essential Mandatory Editorial & Legal Pages */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#34d399] uppercase tracking-wider mb-4">
              Editorial Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href="/about/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('about');
                    }
                  }}
                  className="hover:text-[#34d399] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>About Us</span>
                  <span className="text-[10px] font-mono text-[#34d399] bg-[#10b981]/15 px-1.5 py-0.5 rounded">Core</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('contact');
                    }
                  }}
                  className="hover:text-[#34d399] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Contact Us</span>
                  <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/15 px-1.5 py-0.5 rounded">Desk</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('privacy');
                    }
                  }}
                  className="hover:text-[#34d399] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Privacy Policy</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">GDPR</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('terms');
                    }
                  }}
                  className="hover:text-[#34d399] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Terms & Conditions</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Legal</span>
                </a>
              </li>
              <li>
                <a
                  href="/editorial-standards/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      onNavigateTab('editorial-standards');
                    }
                  }}
                  className="hover:text-[#34d399] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Editorial Standards & Peer Review</span>
                </a>
              </li>
              <li className="pt-1 border-t border-[#10b981]/15">
                <a
                  href={`mailto:${OFFICIAL_CONTACT.email}?subject=Security Vulnerability Disclosure`}
                  className="text-slate-400 hover:text-[#34d399] transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Responsible Disclosure Program</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#10b981]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 TechAPark. All rights reserved. Published daily in Technology Park.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Editor-in-Chief: Sagheer Ahmad</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#34d399]">Vol. 2026.10</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
