import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, Sparkles } from 'lucide-react';
import { TechCategory } from '../types/blog';
import { TechLogoFull } from './Logo';

export type NavTab = 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards';

interface HeaderProps {
  currentCategory: TechCategory | 'All';
  onSelectCategory: (category: TechCategory | 'All') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  onNavigateTab: (tab: NavTab) => void;
  activeTab: NavTab;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
  onNavigateTab,
  activeTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#04241c]/95 backdrop-blur-md border-b border-[#10b981]/25 transition-colors shadow-lg">
      {/* Top utility sub-masthead with tagline */}
      <div className="w-full bg-[#021812] border-b border-[#10b981]/20 px-4 py-1.5 text-center flex items-center justify-between text-[11px] font-mono tracking-widest text-[#34d399]">
        <div className="hidden sm:flex items-center gap-2 text-emerald-300/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
          <span>EST. 2026</span>
          <span aria-hidden="true">·</span>
          <span>VOLUME IV</span>
        </div>
        <div className="mx-auto sm:mx-0 font-bold tracking-wider text-[#34d399]">
          ENGINEERING JOURNAL — PUBLISHED DAILY
        </div>
        <div className="hidden sm:flex items-center gap-3 text-emerald-300/70">
          <span>PEER-REVIEWED STANDARDS</span>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand wordmark with custom tech logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('All');
                }
              }}
              className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] rounded-lg"
              aria-label="TechAPark Home"
            >
              <TechLogoFull size="md" />
            </a>
          </div>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('All');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'feed' && currentCategory === 'All' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              Home Feed
            </a>
            <a
              href="/category/cyber-security-privacy/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Cyber Security & Privacy');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'feed' && currentCategory === 'Cyber Security & Privacy' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              Security & Privacy
            </a>
            <a
              href="/category/cloud-computing-hosting/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Cloud Computing & Hosting');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'feed' && currentCategory === 'Cloud Computing & Hosting' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              Cloud & Hosting
            </a>
            <a
              href="/about/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('about');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'about' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              About The Blog
            </a>
            <a
              href="/editors/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('editors');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'editors' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              Editors
            </a>
            <a
              href="/contact/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('contact');
                }
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#34d399] transition-colors ${
                activeTab === 'contact' ? 'text-[#34d399] font-bold' : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary action & utility triggers */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="p-2 text-slate-300 hover:text-[#34d399] hover:bg-[#073026] rounded-lg border border-transparent hover:border-[#10b981]/30 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBookmarks}
              aria-label="View saved articles"
              className="relative p-2 text-slate-300 hover:text-[#34d399] hover:bg-[#073026] rounded-lg border border-transparent hover:border-[#10b981]/30 transition-all"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] text-[#021812] text-[10px] font-bold font-mono flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <a
              href="/contact/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('contact');
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#021812] bg-[#10b981] hover:bg-[#34d399] shadow-[0_0_16px_rgba(16,185,129,0.4)] rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact Newsroom</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-300 hover:text-[#34d399] rounded-lg hover:bg-[#073026]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a231e] border-b border-[#10b981]/25 px-4 pt-3 pb-6 space-y-3">
          <div className="text-[11px] font-mono uppercase text-[#34d399]/70 tracking-wider">
            Explore Journal
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('All');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Home Feed
            </a>
            <a
              href="/category/cyber-security-privacy/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Cyber Security & Privacy');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Cyber Security
            </a>
            <a
              href="/category/cloud-computing-hosting/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Cloud Computing & Hosting');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Cloud & Hosting
            </a>
            <a
              href="/category/freelancing-remote-work/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Freelancing & Remote Work');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Freelancing
            </a>
            <a
              href="/category/gaming-tech-culture/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Gaming & Tech Culture');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Gaming Culture
            </a>
            <a
              href="/category/tech-tips-troubleshooting/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('feed');
                  onSelectCategory('Tech Tips & Troubleshooting');
                  setMobileMenuOpen(false);
                }
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#34d399] border border-[#10b981]/15 block"
            >
              Tech Tips
            </a>
          </div>

          <div className="pt-2 border-t border-[#10b981]/15 flex items-center justify-between text-sm">
            <a
              href="/about/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('about');
                  setMobileMenuOpen(false);
                }
              }}
              className="text-slate-300 hover:text-[#34d399]"
            >
              About The Blog
            </a>
            <a
              href="/editors/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('editors');
                  setMobileMenuOpen(false);
                }
              }}
              className="text-slate-300 hover:text-[#34d399]"
            >
              Editors
            </a>
            <a
              href="/contact/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  onNavigateTab('contact');
                  setMobileMenuOpen(false);
                }
              }}
              className="text-[#34d399] font-semibold"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
