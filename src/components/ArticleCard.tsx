import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Bookmark, Clock, Eye, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  layoutVariant?: 'featured' | 'standard' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark,
  layoutVariant = 'standard'
}) => {
  const isFeatured = layoutVariant === 'featured' || (article.featured && layoutVariant !== 'compact');

  return (
    <article
      onClick={() => onOpenArticle(article)}
      className={`group relative cursor-pointer rounded-2xl bg-[#0b2721] border border-[#5fdee7]/20 hover:border-[#5fdee7] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_30px_rgba(95,222,231,0.2)] hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
        isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Visual Thumbnail Area */}
      <div className={`relative w-full overflow-hidden bg-[#061512] ${isFeatured ? 'h-64 sm:h-80' : 'h-48 sm:h-52'}`}>
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* High-Tech Fallback Pattern */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center tech-grid-pattern relative bg-gradient-to-br from-[#0b2721] to-[#061512]">
            <div className="w-12 h-12 rounded-xl bg-[#081c18] border border-[#5fdee7]/30 flex items-center justify-center text-[#5fdee7] mb-3 shadow-[0_0_20px_rgba(95,222,231,0.15)] group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-[#5fdee7]" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#5fdee7] uppercase">
              {article.category}
            </span>
            <span className="text-base font-display font-semibold text-white mt-1 max-w-sm line-clamp-2">
              {article.title}
            </span>
          </div>
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2721] via-transparent to-transparent opacity-80" />

        {/* Quick bookmark affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(article.id);
          }}
          aria-label={isBookmarked ? 'Remove from bookmarks' : 'Save to bookmarks'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-lg backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-[#5fdee7] text-[#081c18] shadow-[0_0_12px_rgba(95,222,231,0.5)]'
              : 'bg-[#081c18]/80 text-slate-300 hover:text-[#5fdee7] hover:bg-[#081c18] border border-[#5fdee7]/25'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Article ID index tag in corner */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#081c18]/85 backdrop-blur-md border border-[#5fdee7]/30 text-[11px] font-mono font-bold text-[#5fdee7]">
          ART {article.articleNumber}
        </div>
      </div>

      {/* Card Body Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2.5">
            <span className="text-[#5fdee7] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title with Hover Glow */}
          <h3 className={`font-bold font-display tracking-tight text-white group-hover:text-[#5fdee7] transition-colors leading-snug ${
            isFeatured ? 'text-xl sm:text-2xl mb-2' : 'text-lg mb-2'
          }`}>
            {article.title}
          </h3>

          {/* Subtitle / Deck */}
          <p className="text-xs font-mono text-[#5fdee7]/80 mb-3 line-clamp-1">
            {article.subtitle}
          </p>

          {/* Editorial Summary */}
          <p className="text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
            {article.summary}
          </p>
        </div>

        {/* Card Footer: Author + Interactive Arrow Glide */}
        <div className="pt-4 border-t border-[#5fdee7]/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#5fdee7]">
              {article.author.avatar}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-200 block">{article.author.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">{article.wordCount} words</span>
            </div>
          </div>

          {/* Fluid arrow-glide translation on hover */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5fdee7] group-hover:translate-x-1.5 transition-transform duration-200">
            <span>Read Investigation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </article>
  );
};
