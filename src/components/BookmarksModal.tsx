import React from 'react';
import { Article } from '../types/blog';
import { ALL_ARTICLES } from '../data/articles';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: string[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  const savedArticles = ALL_ARTICLES.filter(a => bookmarkedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 sm:pt-20">
      <div className="w-full max-w-xl bg-[#081c18] border border-[#5fdee7]/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#0a231e] border-b border-[#5fdee7]/25 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bookmark className="w-5 h-5 text-[#5fdee7]" />
            <h3 className="font-bold font-display text-base">Reading Archive & Saved Articles</h3>
            <span className="text-xs font-mono text-[#5fdee7] bg-[#5fdee7]/10 px-2 py-0.5 rounded border border-[#5fdee7]/25">
              {savedArticles.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-mono px-2 py-1 rounded hover:bg-[#081c18]"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#5fdee7]/10">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-sans text-slate-300">Your reading list is currently empty.</p>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Click the bookmark icon on any article card to save investigations for offline review.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group py-3.5 px-2 hover:bg-[#0b2721] rounded-lg transition-colors flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer flex items-center gap-3 min-w-0"
                >
                  {art.imageUrl && (
                    <div className="w-14 h-11 rounded-lg overflow-hidden bg-[#061512] shrink-0 border border-[#5fdee7]/20">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-[#5fdee7]">
                      {art.category} · ART {art.articleNumber}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#5fdee7] transition-colors font-display truncate">
                      {art.title}
                    </h4>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {art.readTime} · {art.author.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(art.id)}
                    title="Remove from saved"
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-[#081c18]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-1.5 text-[#5fdee7] group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#061512] border-t border-[#5fdee7]/15 text-[11px] font-mono text-slate-400 text-center">
          Saved locally in browser memory for offline research
        </div>

      </div>
    </div>
  );
};
