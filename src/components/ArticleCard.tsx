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
  const isFeatured = layoutVariant === 'featured';

  return (
    <article
      className={`group relative rounded-2xl bg-[#07251e] border border-[#10b981]/25 hover:border-[#34d399] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-full ${
        isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Full-card link for accessibility & SEO crawlers */}
      <a
        href={`/articles/${article.slug}/`}
        onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
            e.preventDefault();
            onOpenArticle(article);
          }
        }}
        className="absolute inset-0 z-10"
        aria-label={`Read article: ${article.title}`}
      >
        <span className="sr-only">Read {article.title}</span>
      </a>

      {/* Visual Thumbnail Area - Uniform equal height */}
      <div className={`relative w-full overflow-hidden bg-[#041a15] shrink-0 ${isFeatured ? 'h-64' : 'h-48'}`}>
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const clean = article.imageUrl?.split('/').pop();
              if (clean && !target.src.includes('/assets/images/')) {
                target.src = `/assets/images/${clean}`;
              }
            }}
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
            e.preventDefault();
            onToggleBookmark(article.id);
          }}
          aria-label={isBookmarked ? 'Remove from bookmarks' : 'Save to bookmarks'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-lg backdrop-blur-md transition-all z-20 ${
            isBookmarked
              ? 'bg-[#10b981] text-[#021812] shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'bg-[#041a15]/80 text-slate-300 hover:text-[#34d399] hover:bg-[#07251e] border border-[#10b981]/25'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Article ID index tag in corner */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#041a15]/85 backdrop-blur-md border border-[#10b981]/30 text-[11px] font-mono font-bold text-emerald-300 z-20">
          ART {article.articleNumber}
        </div>
      </div>

      {/* Card Body Area */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-20 pointer-events-none">
        <div>
          {/* Zero-Pill Unboxed Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2.5">
            <span className="text-[#34d399] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title with Hover Glow - Fixed 2-line rhythm for equal card heights */}
          <h3 className="font-bold font-display tracking-tight text-white group-hover:text-[#34d399] transition-colors leading-snug text-lg mb-2 line-clamp-2 h-[3.25rem] pointer-events-auto">
            <a
              href={`/articles/${article.slug}/`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onOpenArticle(article);
                }
              }}
              className="hover:underline"
            >
              {article.title}
            </a>
          </h3>

          {/* Subtitle / Deck */}
          <p className="text-xs font-mono text-emerald-400/80 mb-3 line-clamp-1">
            {article.subtitle}
          </p>

          {/* Editorial Summary - Fixed 3-line clamp for equal card heights */}
          <p className="text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 h-[4rem] mb-4">
            {article.summary}
          </p>
        </div>

        {/* Card Footer: Author + Interactive Arrow Glide */}
        <div className="pt-4 border-t border-[#10b981]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#041a15] border border-[#10b981]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#34d399]">
              {article.author.avatar}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-200 block">{article.author.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">{article.wordCount} words</span>
            </div>
          </div>

          {/* Fluid arrow-glide translation on hover */}
          <a
            href={`/articles/${article.slug}/`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onOpenArticle(article);
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#34d399] group-hover:translate-x-1.5 transition-transform duration-200 pointer-events-auto"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </article>
  );
};
