import React, { useState } from 'react';
import { OFFICIAL_CONTACT } from '../data/editors';
import { CATEGORIES_LIST } from '../data/categories';
import { TechCategory } from '../types/blog';
import { Phone, Mail, MessageCircle, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { TechLogoFull } from './Logo';

interface FooterProps {
  onSelectCategory: (category: TechCategory) => void;
  onNavigateTab: (tab: 'feed' | 'about' | 'editors' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigateTab }) => {
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | 'standards' | 'adstxt' | null>(null);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);

  return (
    <footer className="bg-[#051310] border-t border-[#5fdee7]/25 text-slate-300 font-sans relative">
      
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#10b981] via-[#5fdee7] to-[#38bdf8]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <TechLogoFull size="md" showTagline={false} />

            <div className="text-xs font-mono text-[#5fdee7] tracking-wider uppercase">
              ENGINEERING JOURNAL — PUBLISHED DAILY
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              An independent technical journal investigating cybersecurity defenses, distributed cloud systems, high-ticket engineering consulting, and high-performance hardware benchmarks.
            </p>

            {/* Official Contact Pill Grid */}
            <div className="p-4 rounded-xl bg-[#081c18] border border-[#5fdee7]/25 space-y-2 text-xs font-mono">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Official Newsroom Hotlines:
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-400">Phone / WA:</span>
                <a 
                  href={OFFICIAL_CONTACT.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#5fdee7] hover:underline font-bold"
                >
                  {OFFICIAL_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-400">Official Email:</span>
                <a 
                  href={`mailto:${OFFICIAL_CONTACT.email}`} 
                  className="text-[#5fdee7] hover:underline truncate max-w-[200px]"
                >
                  {OFFICIAL_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Investigation Disciplines */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onNavigateTab('feed');
                    }}
                    className="text-slate-300 hover:text-[#5fdee7] transition-colors text-left"
                  >
                    {cat.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Journal Departments */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider mb-4">
              Newsroom Desks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigateTab('feed')} 
                  className="hover:text-[#5fdee7] transition-colors"
                >
                  Daily Wire Feed
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('about')} 
                  className="hover:text-[#5fdee7] transition-colors"
                >
                  Editorial Manifesto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('editors')} 
                  className="hover:text-[#5fdee7] transition-colors"
                >
                  Board of Editors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('contact')} 
                  className="hover:text-[#5fdee7] transition-colors"
                >
                  Submit Investigation / Pitch
                </button>
              </li>
              <li>
                <a 
                  href={OFFICIAL_CONTACT.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#10b981] transition-colors flex items-center gap-1 text-[#10b981]"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Direct WhatsApp Channel</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Editorial Standards & Policies */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider mb-4">
              Editorial Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => setActivePolicyModal('standards')}
                  className="hover:text-[#5fdee7] transition-colors text-left"
                >
                  Editorial Standards & Peer Review
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-[#5fdee7] transition-colors text-left"
                >
                  Privacy Policy (Zero-Tracking)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-[#5fdee7] transition-colors text-left"
                >
                  Terms & Conditions of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('adstxt')}
                  className="hover:text-[#5fdee7] transition-colors text-left"
                >
                  Authorized Sellers (ads.txt)
                </button>
              </li>
              <li>
                <a
                  href="/ads.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#5fdee7] transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Raw /ads.txt Endpoint ↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${OFFICIAL_CONTACT.email}?subject=Security Vulnerability Disclosure`}
                  className="text-slate-300 hover:text-[#5fdee7] transition-colors"
                >
                  Responsible Disclosure Program
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#5fdee7]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 TechAPark. All rights reserved. Published daily in Technology Park.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Editor-in-Chief: Sagheer Ahmad</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#5fdee7]">Vol. 2026.10</span>
          </div>
        </div>

      </div>

      {/* Editorial Policy Modals */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#081c18] border border-[#5fdee7]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#5fdee7]/20">
              <h3 className="text-xl font-bold font-display text-white">
                {activePolicyModal === 'standards' && 'TechAPark Editorial Standards'}
                {activePolicyModal === 'privacy' && 'TechAPark Privacy Policy (2026)'}
                {activePolicyModal === 'terms' && 'TechAPark Terms & Conditions'}
                {activePolicyModal === 'adstxt' && 'Authorized Digital Sellers (ads.txt)'}
              </h3>
              <button
                onClick={() => setActivePolicyModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-sans">
              {activePolicyModal === 'adstxt' && (
                <>
                  <p>In compliance with IAB Tech Lab standards, TechAPark publishes an Authorized Digital Sellers (<code>ads.txt</code>) file at the root of our web server to prevent fraudulent ad inventory.</p>
                  
                  <div className="p-3.5 rounded-xl bg-[#061512] border border-[#5fdee7]/25 font-mono text-[11px] text-[#5fdee7] space-y-1 select-all">
                    <p className="text-slate-400"># TechAPark Official ads.txt</p>
                    <p className="text-slate-400"># Domain: techapark.com</p>
                    <p className="text-white font-bold">google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0');
                        setCopiedAdsTxt(true);
                        setTimeout(() => setCopiedAdsTxt(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#0b2721] border border-[#5fdee7]/40 text-[#5fdee7] hover:bg-[#5fdee7] hover:text-[#081c18] font-mono text-xs font-semibold transition-colors"
                    >
                      {copiedAdsTxt ? '✓ Copied to Clipboard' : 'Copy ads.txt Record'}
                    </button>
                    <a
                      href="/ads.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#10b981] text-[#081c18] font-mono text-xs font-bold hover:bg-[#0ea372] transition-colors"
                    >
                      Open Raw /ads.txt ↗
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    File Location: <code>/public/ads.txt</code> (Served directly at <code>https://techapark.com/ads.txt</code> upon GitHub Sync and build).
                  </p>
                </>
              )}

              {activePolicyModal === 'standards' && (
                <>
                  <p>TechAPark operates under strict journalistic independence. All technical benchmarks and security analyses are conducted in air-gapped lab environments with reproducible methodologies.</p>
                  <p>We do not accept paid placement for product endorsements. Articles undergo dual-blind peer review by qualified systems engineers before appearing on the daily wire.</p>
                  <p>Inquiries regarding methodology or corrections may be transmitted directly to Editor-in-Chief Sagheer Ahmad at <span className="font-mono text-[#5fdee7]">{OFFICIAL_CONTACT.email}</span>.</p>
                </>
              )}

              {activePolicyModal === 'privacy' && (
                <>
                  <p>TechAPark practices data minimization by design. We do not deploy third-party behavioral trackers, cross-site identity beacons, or surveillance cookies.</p>
                  <p>All reader bookmarks and preferences are stored locally in your browser’s isolated client storage and are never synchronized to external telemetry databases.</p>
                  <p>Communications sent via our contact channels are encrypted in transit and purged in compliance with strict data protection frameworks.</p>
                </>
              )}

              {activePolicyModal === 'terms' && (
                <>
                  <p>The code samples, terminal configurations, and architectural guides published on TechAPark are provided for educational and defensive security engineering purposes.</p>
                  <p>Users are responsible for ensuring that security testing tools and penetration methods are deployed exclusively against authorized hardware and networks with explicit written consent.</p>
                  <p>© 2026 TechAPark. Content may be referenced with proper attribution to TechAPark Engineering Journal.</p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#5fdee7]/15 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-4 py-2 rounded-lg bg-[#5fdee7] text-[#081c18] font-bold text-xs font-mono"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
