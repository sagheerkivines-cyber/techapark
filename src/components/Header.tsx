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
    <header className="sticky top-0 z-40 bg-[#081c18]/95 backdrop-blur-md border-b border-[#5fdee7]/20 transition-colors">
      {/* Top utility sub-masthead with tagline */}
      <div className="w-full bg-[#061512] border-b border-[#5fdee7]/10 px-4 py-1.5 text-center flex items-center justify-between text-[11px] font-mono tracking-widest text-[#5fdee7]/80">
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span>EST. 2026</span>
          <span aria-hidden="true">·</span>
          <span>VOLUME IV</span>
        </div>
        <div className="mx-auto sm:mx-0 font-semibold tracking-wider text-[#5fdee7]">
          ENGINEERING JOURNAL — PUBLISHED DAILY
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span>PEER-REVIEWED STANDARDS</span>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand wordmark with new custom tech logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('All');
              }}
              className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fdee7] rounded-lg"
              aria-label="TechAPark Home"
            >
              <TechLogoFull size="md" />
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('All');
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'feed' && currentCategory === 'All' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              Home Feed
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Cyber Security & Privacy');
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'feed' && currentCategory === 'Cyber Security & Privacy' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              Security & Privacy
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Cloud Computing & Hosting');
              }}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'feed' && currentCategory === 'Cloud Computing & Hosting' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              Cloud & Hosting
            </button>
            <button
              onClick={() => onNavigateTab('about')}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'about' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              About The Blog
            </button>
            <button
              onClick={() => onNavigateTab('editors')}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'editors' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              Editors
            </button>
            <button
              onClick={() => onNavigateTab('contact')}
              className={`whitespace-nowrap shrink-0 hover:text-[#5fdee7] transition-colors ${
                activeTab === 'contact' ? 'text-[#5fdee7] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary action & utility triggers */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="p-2 text-slate-300 hover:text-[#5fdee7] hover:bg-[#0b2721] rounded-lg border border-transparent hover:border-[#5fdee7]/30 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBookmarks}
              aria-label="View saved articles"
              className="relative p-2 text-slate-300 hover:text-[#5fdee7] hover:bg-[#0b2721] rounded-lg border border-transparent hover:border-[#5fdee7]/30 transition-all"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5fdee7] text-[#081c18] text-[10px] font-bold font-mono flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigateTab('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#081c18] bg-[#5fdee7] hover:bg-[#4bc7cf] shadow-[0_0_15px_rgba(95,222,231,0.3)] rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact Newsroom</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-300 hover:text-[#5fdee7] rounded-lg hover:bg-[#0b2721]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a231e] border-b border-[#5fdee7]/25 px-4 pt-3 pb-6 space-y-3">
          <div className="text-[11px] font-mono uppercase text-[#5fdee7]/60 tracking-wider">
            Explore Journal
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('All');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Home Feed
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Cyber Security & Privacy');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Cyber Security
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Cloud Computing & Hosting');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Cloud & Hosting
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Freelancing & Remote Work');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Freelancing
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Gaming & Tech Culture');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Gaming Culture
            </button>
            <button
              onClick={() => {
                onNavigateTab('feed');
                onSelectCategory('Tech Tips & Troubleshooting');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-[#081c18] text-left text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/15"
            >
              Tech Tips
            </button>
          </div>

          <div className="pt-2 border-t border-[#5fdee7]/15 flex items-center justify-between text-sm">
            <button
              onClick={() => {
                onNavigateTab('about');
                setMobileMenuOpen(false);
              }}
              className="text-slate-300 hover:text-[#5fdee7]"
            >
              About The Blog
            </button>
            <button
              onClick={() => {
                onNavigateTab('editors');
                setMobileMenuOpen(false);
              }}
              className="text-slate-300 hover:text-[#5fdee7]"
            >
              Editors
            </button>
            <button
              onClick={() => {
                onNavigateTab('contact');
                setMobileMenuOpen(false);
              }}
              className="text-[#5fdee7] font-semibold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
