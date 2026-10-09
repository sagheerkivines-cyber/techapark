import React, { useState } from 'react';
import { Article, TechCategory } from '../types/blog';
import { ALL_ARTICLES, searchArticles } from '../data/articles';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<TechCategory | 'All'>('All');

  if (!isOpen) return null;

  const results = searchArticles(query, categoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 sm:pt-20">
      <div className="w-full max-w-2xl bg-[#081c18] border border-[#5fdee7]/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#0a231e] border-b border-[#5fdee7]/25 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5fdee7]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, titles, tags, or authors (e.g. FIDO2, RTX, Linux)..."
            autoFocus
            className="flex-1 bg-transparent border-none text-white placeholder-slate-400 focus:outline-none text-sm font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#061512] text-slate-300 hover:text-[#5fdee7] border border-[#5fdee7]/20"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills (Functional Interactive Filter) */}
        <div className="px-4 py-2.5 bg-[#061512] border-b border-[#5fdee7]/15 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-2.5 py-1 rounded-md font-mono whitespace-nowrap transition-colors ${
              categoryFilter === 'All'
                ? 'bg-[#5fdee7] text-[#081c18] font-bold'
                : 'text-slate-400 hover:text-white bg-[#081c18]'
            }`}
          >
            All Categories ({ALL_ARTICLES.length})
          </button>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-md font-mono whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-[#5fdee7] text-[#081c18] font-bold'
                  : 'text-slate-400 hover:text-white bg-[#081c18]'
              }`}
            >
              {cat.shortTitle}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#5fdee7]/10">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 text-[#5fdee7]/40 mx-auto mb-2" />
              <p className="text-sm font-sans">No technical articles found matching "{query}".</p>
              <p className="text-xs font-mono text-slate-500 mt-1">Try searching for keywords like "privacy", "cloud", "gaming", or "windows".</p>
            </div>
          ) : (
            results.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="group cursor-pointer py-3.5 px-2 hover:bg-[#0b2721] rounded-lg transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {art.imageUrl && (
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#061512] shrink-0 border border-[#5fdee7]/20">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="text-[#5fdee7]">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>ART {art.articleNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#5fdee7] transition-colors font-display truncate">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-1 font-sans">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-2 text-slate-400 group-hover:text-[#5fdee7] group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#061512] border-t border-[#5fdee7]/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Showing {results.length} of {ALL_ARTICLES.length} published investigations</span>
          <span className="text-[#5fdee7]">TechAPark Core Index</span>
        </div>

      </div>
    </div>
  );
};
