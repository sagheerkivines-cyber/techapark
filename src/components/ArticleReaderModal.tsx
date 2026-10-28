import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/blog';
import { InfographicViewer } from './InfographicViewer';
import { 
  X, Bookmark, Share2, Volume2, VolumeX, Check, 
  ArrowLeft, Clock, Calendar, User, Eye, 
  CheckCircle2, Copy, BookOpen, Sparkles, ArrowRight,
  Lock, ExternalLink, Globe
} from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onSelectRelatedArticle: (article: Article) => void;
  relatedArticles: Article[];
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelatedArticle,
  relatedArticles
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll and audio on article change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
    setIsPlayingAudio(false);
  }, [article?.id]);

  // Handle scroll tracking
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  // Keyboard navigation: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const canonicalFullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/articles/${article.slug}/` 
    : `https://techapark.com/articles/${article.slug}/`;

  const handleCopyArticleUrl = () => {
    navigator.clipboard.writeText(canonicalFullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle,
        url: canonicalFullUrl,
      }).catch(() => {});
    } else {
      handleCopyArticleUrl();
    }
  };

  const fontClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 md:p-6 transition-all duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full h-full max-w-5xl bg-[#081c18] border border-[#5fdee7]/30 rounded-none sm:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        
        {/* Sticky Reading Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#061512] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#10b981] via-[#5fdee7] to-[#38bdf8] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Top Action Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#0a231e] border-b border-[#5fdee7]/20 flex items-center justify-between gap-4 z-40">
          
          {/* Back / Close button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 hover:text-[#5fdee7] transition-colors p-1.5 rounded-lg hover:bg-[#081c18]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Feed</span>
          </button>

          {/* Center Reading Meta */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[#5fdee7]">TECHAPARK JOURNAL</span>
            <span aria-hidden="true">·</span>
            <span>{article.articleNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{Math.round(scrollProgress)}% READ</span>
          </div>

          {/* Right Action Controls: Audio, Font, Bookmark, Share, Close */}
          <div className="flex items-center gap-2">
            
            {/* Audio narration simulator toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              title={isPlayingAudio ? 'Pause synthetic audio readout' : 'Listen to audio narration'}
              className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'bg-[#10b981] text-[#081c18] font-bold border-[#10b981]'
                  : 'bg-[#081c18] text-slate-300 hover:text-[#5fdee7] border-[#5fdee7]/25'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isPlayingAudio ? 'Playing' : 'Listen'}</span>
            </button>

            {/* Font size toggles */}
            <div className="hidden sm:flex items-center bg-[#081c18] rounded-lg border border-[#5fdee7]/25 p-0.5 text-xs font-mono">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-[#5fdee7] text-[#081c18] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-[#5fdee7] text-[#081c18] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-[#5fdee7] text-[#081c18] font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-[#5fdee7] text-[#081c18] border-[#5fdee7]'
                  : 'bg-[#081c18] text-slate-300 hover:text-[#5fdee7] border-[#5fdee7]/25'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              title="Share article URL"
              className="p-2 rounded-lg bg-[#081c18] text-slate-300 hover:text-[#5fdee7] border border-[#5fdee7]/25 transition-all"
            >
              {copiedUrl || shareSuccess ? <Check className="w-4 h-4 text-[#10b981]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close cross */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#081c18] text-slate-300 hover:text-rose-400 border border-[#5fdee7]/25 transition-all"
              aria-label="Close reader"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Real Browser Address & Indexable Search URL Bar */}
        <div className="px-3 sm:px-6 py-2.5 bg-[#051713] border-b border-[#10b981]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-inner z-30">
          <div className="flex items-center gap-2.5 flex-1 min-w-[260px] bg-[#030e0b] border border-[#10b981]/40 rounded-lg px-3 py-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-1.5 text-[#10b981] font-semibold shrink-0">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-[10px] text-emerald-400 tracking-wider uppercase font-bold">Article Link:</span>
            </div>
            <a
              href={`/articles/${article.slug}/`}
              className="text-[#5fdee7] hover:underline truncate select-all flex-1 tracking-tight text-xs font-mono"
              title={`Permanent URL: ${canonicalFullUrl}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  handleCopyArticleUrl();
                }
              }}
            >
              {canonicalFullUrl}
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyArticleUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e3b31] hover:bg-[#10b981] text-[#a7f3d0] hover:text-[#041a15] font-bold border border-[#10b981]/50 transition-all shadow-sm active:scale-95"
              title="Copy exact article URL to clipboard for Google Search Console indexing"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Link Copied!' : 'Copy Link for Indexing'}</span>
            </button>

            <a
              href={`/articles/${article.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07241e] hover:bg-[#0a3329] text-slate-200 hover:text-[#5fdee7] border border-[#5fdee7]/30 transition-all shadow-sm"
              title="Open direct URL in separate browser tab so the top browser address bar shows the exact link"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5fdee7]" />
              <span className="hidden md:inline">Open in Browser Tab</span>
            </a>
          </div>
        </div>

        {/* Audio Narration Simulation Notice */}
        {isPlayingAudio && (
          <div className="px-6 py-2 bg-[#0e332b] border-b border-[#10b981]/30 flex items-center justify-between text-xs font-mono text-[#5fdee7]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>Simulated Studio Audio Readout: Voice Engine Active</span>
            </div>
            <span className="text-slate-300">Target Duration: {article.readTime}</span>
          </div>
        )}

        {/* Scrollable Article Body */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 bg-[#081c18]"
        >
          <div className="max-w-3xl mx-auto">
            
            {/* Header Masthead */}
            <div className="mb-8 pb-8 border-b border-[#5fdee7]/20">
              
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                <span className="text-[#5fdee7] font-semibold tracking-wider uppercase">
                  {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">ART {article.articleNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishDate}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5fdee7]" />
                  <span>{article.readTime}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{article.wordCount} words</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight mb-3">
                {article.title}
              </h1>

              {/* Subtitle Deck */}
              <p className="text-base sm:text-lg text-[#5fdee7] font-sans font-medium leading-relaxed mb-6">
                {article.subtitle}
              </p>

              {/* Author and Peer Review Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/25">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#081c18] border border-[#5fdee7]/50 flex items-center justify-center font-mono font-bold text-sm text-[#5fdee7]">
                    {article.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {article.author.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {article.author.role} · {article.author.institution}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Peer-Reviewed Technical Investigation</span>
                </div>
              </div>

            </div>

            {/* MANDATORY INFOGRAPHIC SECTION (Reference Design Standard) */}
            <InfographicViewer
              infographic={article.infographic}
              imageUrl={article.imageUrl}
              articleTitle={article.title}
            />

            {/* Key Engineering Takeaways Box */}
            <div className="my-8 p-6 rounded-xl bg-[#0b2721]/90 border border-[#5fdee7]/35 shadow-[0_0_20px_rgba(95,222,231,0.1)]">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold tracking-wider text-[#5fdee7] uppercase">
                <Sparkles className="w-4 h-4 text-[#5fdee7]" />
                <span>EXECUTIVE ENGINEERING TAKEAWAYS</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-200 font-sans">
                {article.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <span className="text-[#10b981] font-bold text-base leading-none select-none">✓</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-Depth Article Content Sections (Targeting 1200 - 1500 words) */}
            <div className={`space-y-8 text-slate-200 font-sans ${fontClass}`}>
              {article.sections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight pt-4 border-t border-[#5fdee7]/15">
                    {section.heading}
                  </h2>

                  {section.subheading && (
                    <h3 className="text-sm font-mono font-semibold text-[#5fdee7] uppercase tracking-wider">
                      {section.subheading}
                    </h3>
                  )}

                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-slate-300">
                      {paragraph}
                    </p>
                  ))}

                  {/* Render Code Block if present */}
                  {section.codeBlock && (
                    <div className="my-6 rounded-xl overflow-hidden bg-[#061512] border border-[#5fdee7]/30 shadow-lg">
                      <div className="px-4 py-2 bg-[#091f1a] border-b border-[#5fdee7]/20 flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>{section.codeBlock.caption || `${section.codeBlock.language.toUpperCase()} SNIPPET`}</span>
                        <button
                          onClick={() => handleCopyCode(section.codeBlock!.code, sIdx)}
                          className="flex items-center gap-1.5 text-xs text-[#5fdee7] hover:text-white transition-colors p-1"
                        >
                          {copiedCodeIndex === sIdx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#10b981]" />
                              <span className="text-[#10b981]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-xs font-mono text-[#5fdee7] bg-[#061512] leading-relaxed">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Render Technical Table if present */}
                  {section.table && (
                    <div className="my-6 overflow-x-auto rounded-xl border border-[#5fdee7]/25 shadow-md">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#0b2721] border-b border-[#5fdee7]/25 font-mono text-[#5fdee7] uppercase tracking-wider">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#5fdee7]/10 bg-[#081c18]">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#0b2721]/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-slate-300">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </section>
              ))}
            </div>

            {/* Tags Strip */}
            <div className="mt-12 pt-6 border-t border-[#5fdee7]/20 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">INDEXED TOPICS:</span>
              {article.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-2.5 py-1 text-xs font-mono rounded bg-[#0b2721] border border-[#5fdee7]/25 text-[#5fdee7]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Profile Card */}
            <div className="mt-8 p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#081c18] border-2 border-[#5fdee7] flex items-center justify-center font-mono font-bold text-lg text-[#5fdee7] shrink-0">
                {article.author.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-display text-base">{article.author.name}</span>
                  <span className="text-[11px] font-mono text-[#5fdee7] bg-[#5fdee7]/10 px-2 py-0.5 rounded border border-[#5fdee7]/30">
                    Lead Contributor
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {article.author.role} · {article.author.institution}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  Conducts rigorous systems evaluation, benchmark triage, and defensive security architectures for the TechAPark daily publication desk.
                </p>
              </div>
            </div>

            {/* Related Articles Carousel / Grid */}
            {relatedArticles.length > 0 && (
              <div className="mt-14 pt-8 border-t border-[#5fdee7]/25">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Further Reading in {article.category}
                    </h3>
                    <p className="text-xs font-mono text-[#5fdee7]/80 mt-0.5">
                      Peer-reviewed investigations from the same discipline
                    </p>
                  </div>
                  <BookOpen className="w-5 h-5 text-[#5fdee7]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelatedArticle(rel)}
                      className="group cursor-pointer rounded-xl bg-[#0b2721] border border-[#5fdee7]/20 hover:border-[#5fdee7] hover:bg-[#0e332b] transition-all flex flex-col justify-between overflow-hidden"
                    >
                      {rel.imageUrl && (
                        <div className="h-28 w-full overflow-hidden bg-[#061512]">
                          <img
                            src={rel.imageUrl}
                            alt={rel.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-[#5fdee7] mb-1">
                            ART {rel.articleNumber} · {rel.readTime}
                          </div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#5fdee7] transition-colors line-clamp-2 mb-2 font-display">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {rel.summary}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-[#5fdee7]/10 flex items-center justify-between text-[11px] font-semibold text-[#5fdee7]">
                          <span>Read Investigation</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
