import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { MetricsBar } from './components/MetricsBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AboutSection } from './components/AboutSection';
import { EditorsSection } from './components/EditorsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ALL_ARTICLES, FEATURED_ARTICLES, TRENDING_ARTICLES, getRelatedArticles } from './data/articles';
import { CATEGORIES_LIST } from './data/categories';
import { Article, TechCategory } from './types/blog';
import { 
  Sparkles, Filter, ChevronLeft, ChevronRight, TrendingUp, 
  Flame, LayoutGrid, Layers, ArrowRight, ShieldCheck, Newspaper
} from 'lucide-react';

const ARTICLES_PER_PAGE = 8;

export default function App() {
  // Navigation and filtering states
  const [activeTab, setActiveTab] = useState<'feed' | 'about' | 'editors' | 'contact'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'magazine'>('grid');

  // Modal states
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarking state (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techapark_bookmarks');
      return saved ? JSON.parse(saved) : ['data-privacy-best-practices', 'high-end-gaming-laptops'];
    } catch {
      return ['data-privacy-best-practices', 'high-end-gaming-laptops'];
    }
  });

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      try {
        localStorage.setItem('techapark_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
    try {
      localStorage.removeItem('techapark_bookmarks');
    } catch {}
  };

  // Filtered articles list based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return ALL_ARTICLES;
    return ALL_ARTICLES.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleCategoryChange = (cat: TechCategory | 'All') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setActiveTab('feed');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return getRelatedArticles(activeArticle.id);
  }, [activeArticle]);

  return (
    <div className="min-h-screen bg-[#081c18] text-slate-100 flex flex-col font-sans selection:bg-[#5fdee7]/25 selection:text-[#5fdee7]">
      
      {/* 1. Header with Top Bar Contract & Tagline */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkedIds.length}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      {/* 2. Mandatory Continuously Scrolling Ticker Tape Bar */}
      <TickerTape
        onTagClick={(tag) => {
          setIsSearchOpen(true);
        }}
      />

      {/* Main View Router */}
      {activeTab === 'about' && (
        <main className="flex-1">
          <AboutSection />
        </main>
      )}

      {activeTab === 'editors' && (
        <main className="flex-1">
          <EditorsSection />
        </main>
      )}

      {activeTab === 'contact' && (
        <main className="flex-1">
          <ContactSection />
        </main>
      )}

      {activeTab === 'feed' && (
        <main className="flex-1">
          
          {/* 3. Metrics Counter Bar */}
          <MetricsBar />

          {/* 4. Featured Showcase / Lead Story Hero Banner */}
          {selectedCategory === 'All' && currentPage === 1 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#5fdee7]" />
                  <span>FEATURED EDITORIAL SHOWCASE</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Vol. IV · Leading Daily Research
                </div>
              </div>

              {/* Dominant Hero Card */}
              {FEATURED_ARTICLES.length > 0 && (
                <div 
                  onClick={() => setActiveArticle(FEATURED_ARTICLES[0])}
                  className="group relative cursor-pointer rounded-3xl bg-[#0b2721] border border-[#5fdee7]/35 hover:border-[#5fdee7] transition-all duration-300 shadow-[0_12px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(95,222,231,0.25)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Left Column: Image with glow */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#061512]">
                    <img
                      src={FEATURED_ARTICLES[0].imageUrl}
                      alt={FEATURED_ARTICLES[0].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#0b2721]/90" />
                    
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#081c18]/90 border border-[#5fdee7]/40 text-xs font-mono font-bold text-[#5fdee7]">
                      FLAGSHIP INVESTIGATION
                    </div>
                  </div>

                  {/* Right Column: Narrative Deck */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      {/* Zero-Pill Unboxed Metadata Line */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                        <span className="text-[#5fdee7] font-semibold">{FEATURED_ARTICLES[0].category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{FEATURED_ARTICLES[0].publishDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{FEATURED_ARTICLES[0].readTime}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white group-hover:text-[#5fdee7] transition-colors leading-tight mb-3">
                        {FEATURED_ARTICLES[0].title}
                      </h2>

                      <p className="text-xs sm:text-sm font-mono text-[#5fdee7]/80 mb-4 line-clamp-1">
                        {FEATURED_ARTICLES[0].subtitle}
                      </p>

                      <p className="text-sm text-slate-300 font-sans leading-relaxed line-clamp-4 mb-6">
                        {FEATURED_ARTICLES[0].summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#5fdee7]/15 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#081c18] border border-[#5fdee7]/50 flex items-center justify-center font-mono font-bold text-xs text-[#5fdee7]">
                          {FEATURED_ARTICLES[0].author.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{FEATURED_ARTICLES[0].author.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{FEATURED_ARTICLES[0].wordCount} words · 6-Panel Blueprint</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold font-mono text-[#5fdee7] group-hover:translate-x-1.5 transition-transform">
                        <span>Read Full Paper</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </section>
          )}

          {/* 5. Trending Topics Strip */}
          {selectedCategory === 'All' && currentPage === 1 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="p-6 rounded-2xl bg-[#071916] border border-[#5fdee7]/25 shadow-lg">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#f43f5e]" />
                    <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                      TRENDING INVESTIGATIONS WIRE
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Highest Peer Engagement
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {TRENDING_ARTICLES.slice(0, 4).map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticle(art)}
                      className="group cursor-pointer rounded-xl bg-[#0b2721] border border-[#5fdee7]/20 hover:border-[#5fdee7] hover:bg-[#0e332b] transition-all flex flex-col justify-between overflow-hidden"
                    >
                      {art.imageUrl && (
                        <div className="h-28 w-full overflow-hidden bg-[#061512]">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-[#5fdee7] mb-1">
                            {art.category} · ART {art.articleNumber}
                          </div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#5fdee7] transition-colors line-clamp-2 font-display mb-1.5">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 font-sans">
                            {art.summary}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#5fdee7]/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>{art.readTime}</span>
                          <span className="text-[#5fdee7] group-hover:translate-x-1 transition-transform">Read →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 6. Primary Articles Feed Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Feed Control Bar: Category Filter + View Modes */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#5fdee7]/20 mb-8">
              
              <div>
                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  {selectedCategory === 'All' ? 'Latest Blog Stories & Articles' : selectedCategory}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  Showing {paginatedArticles.length} of {filteredArticles.length} comprehensive technical guides (1200+ words each)
                </p>
              </div>

              {/* Functional Segmented Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-[#5fdee7] text-[#081c18] font-bold shadow-[0_0_12px_rgba(95,222,231,0.3)]'
                      : 'bg-[#0b2721] text-slate-300 hover:text-white border border-[#5fdee7]/20'
                  }`}
                >
                  All ({ALL_ARTICLES.length})
                </button>
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#5fdee7] text-[#081c18] font-bold shadow-[0_0_12px_rgba(95,222,231,0.3)]'
                        : 'bg-[#0b2721] text-slate-300 hover:text-white border border-[#5fdee7]/20'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>

            </div>

            {/* Articles Grid (Card-Based System) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article, idx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpenArticle={(art) => setActiveArticle(art)}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={toggleBookmark}
                  layoutVariant={idx === 0 && currentPage === 1 && selectedCategory !== 'All' ? 'featured' : 'standard'}
                />
              ))}
            </div>

            {/* Functional Pagination Component */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-[#5fdee7]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="text-xs font-mono text-slate-300">
                  Showing Page <span className="text-[#5fdee7] font-bold">{currentPage}</span> of{' '}
                  <span className="text-slate-200 font-bold">{totalPages}</span> ({filteredArticles.length} total articles)
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono font-semibold text-slate-200 hover:border-[#5fdee7] hover:text-[#5fdee7] disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Page</span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setCurrentPage(num);
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                          currentPage === num
                            ? 'bg-[#5fdee7] text-[#081c18] shadow-[0_0_10px_rgba(95,222,231,0.3)]'
                            : 'bg-[#0b2721] text-slate-400 hover:text-white border border-[#5fdee7]/20'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono font-semibold text-slate-200 hover:border-[#5fdee7] hover:text-[#5fdee7] disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
                  >
                    <span>Next Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </section>

        </main>
      )}

      {/* 7. Footer & Official Contact Info */}
      <Footer
        onSelectCategory={(cat) => handleCategoryChange(cat)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 8. Full Interactive Article Reader Modal */}
      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={toggleBookmark}
        onSelectRelatedArticle={(art) => setActiveArticle(art)}
        relatedArticles={relatedArticles}
      />

      {/* 9. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => setActiveArticle(art)}
      />

      {/* 10. Bookmarks / Saved Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={bookmarkedIds}
        onSelectArticle={(art) => setActiveArticle(art)}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

    </div>
  );
}
