import React, { useState, useMemo, useEffect } from 'react';
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
import { PrivacyPolicySection } from './components/PrivacyPolicySection';
import { TermsConditionsSection } from './components/TermsConditionsSection';
import { EditorialPolicySection } from './components/EditorialPolicySection';
import { Footer, NavTab } from './components/Footer';
import { FeedSidebar } from './components/FeedSidebar';
import { ALL_ARTICLES, FEATURED_ARTICLES, TRENDING_ARTICLES, getRelatedArticles, getArticleBySlug } from './data/articles';
import { CATEGORIES_LIST } from './data/categories';
import { Article, TechCategory } from './types/blog';
import { 
  Sparkles, Filter, ChevronLeft, ChevronRight, TrendingUp, 
  Flame, LayoutGrid, Layers, ArrowRight, ShieldCheck, Newspaper
} from 'lucide-react';

const ARTICLES_PER_PAGE = 12;

export default function App() {
  // Navigation and filtering states
  const [activeTab, setActiveTab] = useState<NavTab>('feed');
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

  const openArticle = (article: Article) => {
    setActiveArticle(article);
    try {
      window.history.pushState({ articleId: article.id }, '', `/articles/${article.slug}/`);
      document.title = `${article.title} | TechAPark Engineering Journal`;

      // Update canonical link for search engines & indexing crawlers
      let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://techapark.com/articles/${article.slug}/`);

      let ogUrl = document.querySelector("meta[property='og:url']") as HTMLMetaElement | null;
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', `https://techapark.com/articles/${article.slug}`);
    } catch {}
  };

  const closeArticle = () => {
    setActiveArticle(null);
    try {
      const targetPath = activeTab === 'feed' ? '/' : `/${activeTab}`;
      window.history.pushState({}, '', targetPath);
      syncDocumentTitle(activeTab);

      let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (canonical) {
        canonical.setAttribute('href', `https://techapark.com${targetPath === '/' ? '' : targetPath}`);
      }

      let ogUrl = document.querySelector("meta[property='og:url']") as HTMLMetaElement | null;
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://techapark.com${targetPath === '/' ? '' : targetPath}`);
      }
    } catch {}
  };

  const syncDocumentTitle = (tab: NavTab) => {
    switch (tab) {
      case 'about':
        document.title = 'About TechAPark | Engineering Journal & Laboratory';
        break;
      case 'contact':
        document.title = 'Newsroom Hotlines & Contact Desks | TechAPark';
        break;
      case 'privacy':
        document.title = 'Privacy Policy & Data Protection Charter | TechAPark';
        break;
      case 'terms':
        document.title = 'Terms & Conditions of Service | TechAPark';
        break;
      case 'editorial-standards':
        document.title = 'Editorial Standards & Peer Review Policy | TechAPark';
        break;
      case 'editors':
        document.title = 'Board of Editors | TechAPark Engineering Journal';
        break;
      case 'feed':
      default:
        document.title = 'TechAPark | Engineering Journal - Published Daily';
        break;
    }
  };

  const handleNavigateTab = (tab: NavTab) => {
    setActiveTab(tab);
    setActiveArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const targetPath = tab === 'feed' ? '/' : `/${tab}/`;
      window.history.pushState({ tab }, '', targetPath);
      syncDocumentTitle(tab);

      let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (canonical) {
        canonical.setAttribute('href', `https://techapark.com${targetPath === '/' ? '' : targetPath}`);
      }
    } catch {}
  };

  // Deep-linking & URL routing handler for all pages, categories, and articles
  useEffect(() => {
    const handleUrlNavigation = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const normPath = path.toLowerCase().replace(/\/index\.html$/i, '').replace(/\/+$/, '') || '/';

      // 1. Article direct link: /articles/:slug, /articles/:slug/, ?article=:slug, ?slug=:slug, ?p=/articles/:slug
      let targetSlug = searchParams.get('article') || searchParams.get('slug') || searchParams.get('id');
      if (!targetSlug && searchParams.get('p')) {
        const pVal = searchParams.get('p') || '';
        const match = pVal.match(/\/(?:articles|article)\/([^/?#]+)/);
        if (match) targetSlug = match[1];
      }
      if (!targetSlug && (normPath.startsWith('/articles/') || normPath.startsWith('/article/'))) {
        targetSlug = normPath
          .replace(/^\/(?:articles|article)\//, '')
          .replace(/\/$/, '');
      } else if (!targetSlug && (hash.includes('articles/') || hash.includes('article/'))) {
        const match = hash.match(/(?:articles|article)\/([^/?#]+)/);
        if (match) targetSlug = match[1];
      }

      if (targetSlug) {
        const cleanSlug = decodeURIComponent(targetSlug).toLowerCase().trim();
        const found = getArticleBySlug(cleanSlug) || ALL_ARTICLES.find(a => 
          a.slug.toLowerCase() === cleanSlug || 
          a.id.toLowerCase() === cleanSlug ||
          cleanSlug.includes(a.slug.toLowerCase())
        );
        if (found) {
          setActiveArticle(found);
          document.title = `${found.title} | TechAPark Engineering Journal`;
          return;
        }
      }

      // 2. Category direct link: /category/:slug, /categories/:slug, ?category=:slug
      let catSlug = searchParams.get('category');
      if (!catSlug && (normPath.startsWith('/category/') || normPath.startsWith('/categories/'))) {
        catSlug = normPath.replace(/^\/(?:category|categories)\//, '').replace(/\/$/, '');
      } else if (!catSlug && (hash.startsWith('category/') || hash.startsWith('categories/'))) {
        catSlug = hash.replace(/^(?:category|categories)\//, '');
      }

      if (catSlug) {
        const cleanCat = decodeURIComponent(catSlug).toLowerCase().trim();
        // Support aliases like hardware-troubleshooting for tech-tips-troubleshooting
        const catObj = CATEGORIES_LIST.find(c => 
          c.slug.toLowerCase() === cleanCat || 
          (cleanCat === 'hardware-troubleshooting' && c.slug === 'tech-tips-troubleshooting')
        );
        if (catObj) {
          setSelectedCategory(catObj.id);
          setActiveTab('feed');
          setActiveArticle(null);
          document.title = `${catObj.shortTitle} | TechAPark Engineering Journal`;
          return;
        }
      }

      // 3. Tab navigation: /about, /contact, /privacy, /terms, /editorial-standards, /editors, /feed
      if (normPath === '/about' || hash === 'about') {
        setActiveTab('about');
        setActiveArticle(null);
        syncDocumentTitle('about');
      } else if (normPath === '/contact' || hash === 'contact') {
        setActiveTab('contact');
        setActiveArticle(null);
        syncDocumentTitle('contact');
      } else if (normPath === '/privacy' || hash === 'privacy') {
        setActiveTab('privacy');
        setActiveArticle(null);
        syncDocumentTitle('privacy');
      } else if (normPath === '/terms' || hash === 'terms') {
        setActiveTab('terms');
        setActiveArticle(null);
        syncDocumentTitle('terms');
      } else if (normPath === '/editorial-standards' || hash === 'editorial-standards') {
        setActiveTab('editorial-standards');
        setActiveArticle(null);
        syncDocumentTitle('editorial-standards');
      } else if (normPath === '/editors' || hash === 'editors') {
        setActiveTab('editors');
        setActiveArticle(null);
        syncDocumentTitle('editors');
      } else if (normPath === '/feed' || hash === 'feed') {
        setActiveTab('feed');
        setActiveArticle(null);
        syncDocumentTitle('feed');
      }
    };

    handleUrlNavigation();
    window.addEventListener('popstate', handleUrlNavigation);
    return () => window.removeEventListener('popstate', handleUrlNavigation);
  }, []);

  // Filtered articles list based on selected category and selected keyword tag
  const filteredArticles = useMemo(() => {
    let list = ALL_ARTICLES;
    if (selectedCategory !== 'All') {
      list = list.filter(a => a.category === selectedCategory);
    }
    if (selectedTag) {
      list = list.filter(a => 
        a.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    return list;
  }, [selectedCategory, selectedTag]);

  // Pagination calculation: 12 articles per page on homepage; 3 articles per line/page in category sections to paginate onto Page 2
  const pageSize = selectedCategory === 'All' ? ARTICLES_PER_PAGE : 3;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  const handleCategoryChange = (cat: TechCategory | 'All') => {
    setSelectedCategory(cat);
    setSelectedTag(null);
    setCurrentPage(1);
    setActiveTab('feed');
    setActiveArticle(null);
    window.scrollTo({ top: 380, behavior: 'smooth' });

    try {
      if (cat === 'All') {
        window.history.pushState({}, '', '/');
        document.title = 'TechAPark | Engineering Journal - Published Daily';
        let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
        if (canonical) canonical.setAttribute('href', 'https://techapark.com/');
      } else {
        const catObj = CATEGORIES_LIST.find(c => c.id === cat);
        if (catObj) {
          const targetUrl = `/category/${catObj.slug}/`;
          window.history.pushState({ category: catObj.slug }, '', targetUrl);
          document.title = `${catObj.shortTitle} | TechAPark Engineering Journal`;
          let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
          if (canonical) canonical.setAttribute('href', `https://techapark.com${targetUrl}`);
        }
      }
    } catch {}
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    setActiveTab('feed');
    const target = document.getElementById('articles-feed-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearTag = () => {
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return getRelatedArticles(activeArticle.id);
  }, [activeArticle]);

  return (
    <div className="min-h-screen bg-[#051e18] text-slate-100 flex flex-col font-sans selection:bg-[#10b981]/30 selection:text-white">
      
      {/* 1. Header with Top Bar Contract & Tagline */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkedIds.length}
        onNavigateTab={handleNavigateTab}
        activeTab={activeTab}
      />

      {/* 2. Mandatory Continuously Scrolling Yellow Daily Wire Ribbon */}
      <TickerTape
        onTagClick={(tag) => {
          handleSelectTag(tag);
        }}
      />

      {/* Main View Router */}
      {activeTab === 'about' && (
        <main className="flex-1">
          <AboutSection onNavigateTab={handleNavigateTab} />
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

      {activeTab === 'privacy' && (
        <main className="flex-1">
          <PrivacyPolicySection 
            onBackToFeed={() => handleNavigateTab('feed')} 
            onNavigateTab={handleNavigateTab} 
          />
        </main>
      )}

      {activeTab === 'terms' && (
        <main className="flex-1">
          <TermsConditionsSection 
            onBackToFeed={() => handleNavigateTab('feed')} 
            onNavigateTab={handleNavigateTab} 
          />
        </main>
      )}

      {activeTab === 'editorial-standards' && (
        <main className="flex-1">
          <EditorialPolicySection 
            onBackToFeed={() => handleNavigateTab('feed')} 
            onNavigateTab={handleNavigateTab} 
          />
        </main>
      )}

      {activeTab === 'feed' && (
        <main className="flex-1">
          
          {/* 3. Metrics Counter Bar */}
          <MetricsBar />

          {/* 4. Primary Articles Feed Section: Exactly 3 Blogs in One Line + Right Sidebar */}
          <section id="articles-feed-section" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Feed Control Bar: Category Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#10b981]/25 mb-8">
              
              <div>
                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  {selectedCategory === 'All' ? 'Latest Blog Stories & Articles' : selectedCategory}
                </h3>
                <p className="text-xs text-emerald-400/90 font-mono mt-1">
                  Showing {paginatedArticles.length} of {filteredArticles.length} technical guides (3 in each line · {pageSize} per page)
                </p>
              </div>

              {/* Functional Segmented Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-[#10b981] text-[#021812] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'bg-[#062920] text-slate-300 hover:text-white border border-[#10b981]/25'
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
                        ? 'bg-[#10b981] text-[#021812] font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'bg-[#062920] text-slate-300 hover:text-white border border-[#10b981]/25'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>

            </div>

            {/* 2-Column Responsive Layout: Left 3-Column Articles (9 Cols) + Right Sidebar (3 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 9 Columns: Exactly 3 Equal Blogs per Row + Pagination */}
              <div className="lg:col-span-9 space-y-8">
                
                {/* Active Tag Filter Status Banner */}
                {selectedTag && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#092e24] border border-[#10b981] text-xs font-mono text-emerald-300">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#34d399]" />
                      <span>Filtered by keyword: <strong className="text-white">#{selectedTag}</strong> ({filteredArticles.length} matching articles)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearTag}
                      className="px-2.5 py-1 rounded bg-[#041a15] hover:bg-[#07241e] text-white border border-[#10b981]/40 flex items-center gap-1 transition-colors"
                    >
                      <span>Clear Filter</span>
                    </button>
                  </div>
                )}

                {paginatedArticles.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#07241e] border border-[#10b981]/25 text-slate-300 font-mono space-y-3">
                    <p className="text-sm">No articles found matching this selection.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedTag(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#10b981] text-[#041a15] font-bold text-xs"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  /* STRICTLY 3 EQUAL BLOGS IN ONE LINE */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onOpenArticle={(art) => openArticle(art)}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={toggleBookmark}
                        layoutVariant="standard"
                      />
                    ))}
                  </div>
                )}

                {/* Functional Pagination Component (12 Articles Per Page - 4 Rows of 3) */}
                {totalPages > 1 && (
                  <div className="pt-6 border-t border-[#10b981]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="text-xs font-mono text-slate-300">
                      Showing Page <span className="text-[#34d399] font-bold">{currentPage}</span> of{' '}
                      <span className="text-white font-bold">{totalPages}</span> ({filteredArticles.length} total articles · {pageSize} per page)
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.max(1, prev - 1));
                          window.scrollTo({ top: 380, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#062920] border border-[#10b981]/25 text-xs font-mono font-semibold text-slate-200 hover:border-[#34d399] hover:text-[#34d399] disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
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
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                              currentPage === num
                                ? 'bg-[#10b981] text-[#021812] shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                                : 'bg-[#062920] text-slate-400 hover:text-white border border-[#10b981]/20'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.min(totalPages, prev + 1));
                          window.scrollTo({ top: 380, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#062920] border border-[#10b981]/25 text-xs font-mono font-semibold text-slate-200 hover:border-[#34d399] hover:text-[#34d399] disabled:opacity-40 disabled:pointer-events-none transition-all active:scale-95"
                      >
                        <span>Next Page</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Right 3 Columns: Keywords Box with Slider + Quick Blogs Stream */}
              <div className="lg:col-span-3 lg:sticky lg:top-24">
                <FeedSidebar
                  articles={ALL_ARTICLES}
                  activeTag={selectedTag}
                  onSelectTag={handleSelectTag}
                  onClearTag={handleClearTag}
                  onOpenArticle={(art) => openArticle(art)}
                />
              </div>

            </div>

          </section>

        </main>
      )}

      {/* 7. Footer & Official Contact Info */}
      <Footer
        onSelectCategory={(cat) => handleCategoryChange(cat)}
        onNavigateTab={handleNavigateTab}
      />

      {/* 8. Full Interactive Article Reader Modal */}
      <ArticleReaderModal
        article={activeArticle}
        onClose={closeArticle}
        isBookmarked={activeArticle ? bookmarkedIds.includes(activeArticle.id) : false}
        onToggleBookmark={toggleBookmark}
        onSelectRelatedArticle={(art) => openArticle(art)}
        relatedArticles={relatedArticles}
      />

      {/* 9. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => {
          setIsSearchOpen(false);
          openArticle(art);
        }}
      />

      {/* 10. Bookmarks / Saved Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={bookmarkedIds}
        onSelectArticle={(art) => {
          setIsBookmarksOpen(false);
          openArticle(art);
        }}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

    </div>
  );
}
