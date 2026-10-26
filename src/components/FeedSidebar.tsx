import React, { useState, useMemo, useRef } from 'react';
import { Article } from '../types/blog';
import { 
  Hash, ChevronUp, ChevronDown, Search, X, 
  BookOpen, ArrowRight, Clock, Sparkles, Filter
} from 'lucide-react';

interface FeedSidebarProps {
  articles: Article[];
  activeTag: string | null;
  onSelectTag: (tag: string) => void;
  onClearTag: () => void;
  onOpenArticle: (article: Article) => void;
}

export const FeedSidebar: React.FC<FeedSidebarProps> = ({
  articles,
  activeTag,
  onSelectTag,
  onClearTag,
  onOpenArticle
}) => {
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const keywordsContainerRef = useRef<HTMLDivElement>(null);
  const blogsContainerRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags with count
  const tagStats = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach(art => {
      art.tags.forEach(t => {
        const clean = t.trim();
        if (clean) {
          counts[clean] = (counts[clean] || 0) + 1;
        }
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [articles]);

  // Filter tags by search input
  const filteredTags = useMemo(() => {
    if (!tagSearchQuery.trim()) return tagStats;
    const q = tagSearchQuery.toLowerCase();
    return tagStats.filter(t => t.name.toLowerCase().includes(q));
  }, [tagStats, tagSearchQuery]);

  // Articles to show in the Quick Blogs Stream
  // If activeTag is selected, prioritize or filter matching articles
  const streamArticles = useMemo(() => {
    if (!activeTag) return articles;
    const matching = articles.filter(a => 
      a.tags.some(t => t.toLowerCase() === activeTag.toLowerCase())
    );
    const nonMatching = articles.filter(a => 
      !a.tags.some(t => t.toLowerCase() === activeTag.toLowerCase())
    );
    return [...matching, ...nonMatching];
  }, [articles, activeTag]);

  // Programmatic scroll handlers for Keywords box
  const scrollKeywords = (direction: 'up' | 'down') => {
    if (keywordsContainerRef.current) {
      const scrollAmount = direction === 'up' ? -120 : 120;
      keywordsContainerRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Programmatic scroll handlers for Quick Blogs stream
  const scrollBlogs = (direction: 'up' | 'down') => {
    if (blogsContainerRef.current) {
      const scrollAmount = direction === 'up' ? -180 : 180;
      blogsContainerRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="space-y-6">
      
      {/* ======================================================== */}
      {/* BOX 1: KEYWORDS EXPLORER WITH SCROLLBAR & SLIDER CONTROLS */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-[#07241e] border border-[#10b981]/30 shadow-xl overflow-hidden">
        
        {/* Header with Title and Up/Down Slider Controls */}
        <div className="px-5 py-4 bg-[#041a15] border-b border-[#10b981]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0e3b31] border border-[#10b981]/40 text-[#34d399]">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">
                Keywords Explorer
              </h3>
              <p className="text-[11px] font-mono text-emerald-400/80">
                {tagStats.length} Indexed Topics
              </p>
            </div>
          </div>

          {/* Slider Up / Down Controls */}
          <div className="flex items-center gap-1 bg-[#092b23] p-1 rounded-lg border border-[#10b981]/20">
            <button
              type="button"
              onClick={() => scrollKeywords('up')}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#10473a] transition-colors"
              title="Slide Up Keywords"
              aria-label="Slide up keywords"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollKeywords('down')}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#10473a] transition-colors"
              title="Slide Down Keywords"
              aria-label="Slide down keywords"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tag Quick Search & Filter Indicator */}
        <div className="p-4 pb-2 space-y-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={tagSearchQuery}
              onChange={(e) => setTagSearchQuery(e.target.value)}
              placeholder="Filter keywords..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#031713] border border-[#10b981]/20 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#34d399] transition-colors"
            />
            {tagSearchQuery && (
              <button
                type="button"
                onClick={() => setTagSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active Tag Filter Status Pill */}
          {activeTag && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-[#10b981] text-xs font-mono text-emerald-300">
              <span className="flex items-center gap-1.5 truncate">
                <Filter className="w-3 h-3 text-[#34d399] shrink-0" />
                <span className="truncate">Active: <strong>#{activeTag}</strong></span>
              </span>
              <button
                type="button"
                onClick={onClearTag}
                className="ml-2 px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-800 text-white text-[10px] flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Reset</span>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Keywords List */}
        <div 
          ref={keywordsContainerRef}
          className="h-64 overflow-y-auto px-4 pb-4 space-y-1.5 scroll-smooth focus:outline-none"
          tabIndex={0}
          aria-label="Scrollable list of keywords"
        >
          {filteredTags.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 font-mono">
              No keywords match "{tagSearchQuery}"
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {filteredTags.map(({ name, count }) => {
                const isSelected = activeTag?.toLowerCase() === name.toLowerCase();
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        onClearTag();
                      } else {
                        onSelectTag(name);
                      }
                    }}
                    className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 text-left ${
                      isSelected
                        ? 'bg-[#10b981] text-[#041a15] font-bold shadow-[0_0_12px_rgba(16,185,129,0.5)] scale-[1.02]'
                        : 'bg-[#0a3329] border border-[#10b981]/25 text-slate-200 hover:border-[#34d399] hover:text-white hover:bg-[#0e4437]'
                    }`}
                  >
                    <span>#{name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      isSelected 
                        ? 'bg-[#041a15] text-[#34d399]' 
                        : 'bg-[#041a15]/70 text-slate-400 group-hover:text-emerald-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Hint */}
        <div className="px-4 py-2 bg-[#041a15]/80 border-t border-[#10b981]/15 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Click any tag to filter blogs</span>
          <span className="text-emerald-400">↑↓ Scroll or slide</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOX 2: QUICK BLOGS STREAM WITH SLIDER & UP/DOWN SCROLLER  */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-[#07241e] border border-[#10b981]/30 shadow-xl overflow-hidden">
        
        {/* Header with Title and Slider Controls */}
        <div className="px-5 py-4 bg-[#041a15] border-b border-[#10b981]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0e3b31] border border-[#10b981]/40 text-[#34d399]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">
                Quick Blog Stream
              </h3>
              <p className="text-[11px] font-mono text-emerald-400/80">
                {activeTag ? `Filtering: #${activeTag}` : 'Live Article Feed'}
              </p>
            </div>
          </div>

          {/* Slider Up / Down Controls */}
          <div className="flex items-center gap-1 bg-[#092b23] p-1 rounded-lg border border-[#10b981]/20">
            <button
              type="button"
              onClick={() => scrollBlogs('up')}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#10473a] transition-colors"
              title="Slide Up Articles"
              aria-label="Slide up articles"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBlogs('down')}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-[#10473a] transition-colors"
              title="Slide Down Articles"
              aria-label="Slide down articles"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Blogs Container */}
        <div
          ref={blogsContainerRef}
          className="h-[460px] overflow-y-auto p-3 space-y-3 scroll-smooth focus:outline-none"
          tabIndex={0}
          aria-label="Scrollable list of blog articles"
        >
          {streamArticles.map((art) => {
            const matchesActiveTag = activeTag 
              ? art.tags.some(t => t.toLowerCase() === activeTag.toLowerCase())
              : false;

            return (
              <div
                key={art.id}
                onClick={() => onOpenArticle(art)}
                className={`group cursor-pointer rounded-xl p-3 border transition-all duration-200 flex gap-3 ${
                  matchesActiveTag
                    ? 'bg-[#0c382e] border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-[#092c23] border-[#10b981]/20 hover:border-[#34d399] hover:bg-[#0c382e]'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#031713] shrink-0 border border-[#10b981]/20 relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {matchesActiveTag && (
                    <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-[#10b981] text-[#041a15] text-[9px] font-mono font-bold leading-none">
                      MATCH
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                      <span className="truncate max-w-[120px] font-semibold">{art.category}</span>
                      <span className="text-slate-400 flex items-center gap-1 shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        {art.readTime}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#34d399] line-clamp-2 font-display leading-snug transition-colors">
                      {art.title}
                    </h4>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="truncate max-w-[110px]">{art.author.name}</span>
                    <span className="text-[#34d399] group-hover:translate-x-1 transition-transform font-bold flex items-center gap-0.5">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Bar */}
        <div className="px-4 py-2.5 bg-[#041a15] border-t border-[#10b981]/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>{streamArticles.length} Articles in Feed</span>
          <span className="text-[#34d399]">Click card to read</span>
        </div>
      </div>

    </aside>
  );
};
