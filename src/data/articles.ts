import { Article, TechCategory } from '../types/blog';
import { CATEGORY_1_ARTICLES } from './articles/category1';
import { CATEGORY_2_ARTICLES } from './articles/category2';
import { CATEGORY_3_ARTICLES } from './articles/category3';
import { CATEGORY_4_ARTICLES } from './articles/category4';
import { CATEGORY_5_ARTICLES } from './articles/category5';
import { ARTICLE_IMAGES } from './articleImages';

// Assemble raw articles and ensure every single article is assigned its unique generated infographic image
const RAW_ARTICLES: Article[] = [
  ...CATEGORY_1_ARTICLES,
  ...CATEGORY_2_ARTICLES,
  ...CATEGORY_3_ARTICLES,
  ...CATEGORY_4_ARTICLES,
  ...CATEGORY_5_ARTICLES
];

export const ALL_ARTICLES: Article[] = RAW_ARTICLES.map(article => ({
  ...article,
  imageUrl: ARTICLE_IMAGES[article.id] || article.imageUrl
}));

export const FEATURED_ARTICLES: Article[] = ALL_ARTICLES.filter(a => a.featured);
export const TRENDING_ARTICLES: Article[] = ALL_ARTICLES.filter(a => a.trending);

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find(a => a.slug === slug || a.id === slug);
}

export function getArticlesByCategory(category: TechCategory): Article[] {
  return ALL_ARTICLES.filter(a => a.category === category);
}

export function getRelatedArticles(currentArticleId: string, limit = 3): Article[] {
  const current = ALL_ARTICLES.find(a => a.id === currentArticleId);
  if (!current) return ALL_ARTICLES.slice(0, limit);
  return ALL_ARTICLES
    .filter(a => a.id !== currentArticleId && a.category === current.category)
    .slice(0, limit);
}

export function searchArticles(query: string, categoryFilter?: TechCategory | 'All'): Article[] {
  let list = ALL_ARTICLES;
  if (categoryFilter && categoryFilter !== 'All') {
    list = list.filter(a => a.category === categoryFilter);
  }
  if (!query.trim()) return list;

  const q = query.toLowerCase().trim();
  return list.filter(a => 
    a.title.toLowerCase().includes(q) ||
    a.subtitle.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q)) ||
    a.author.name.toLowerCase().includes(q) ||
    a.infographic.title.toLowerCase().includes(q)
  );
}

export const TICKER_ITEMS = [
  { tag: 'SECURITY', text: 'Zero-Knowledge Cryptographic Vaults Deployed Across TechAPark Labs' },
  { tag: 'CLOUD IaaS', text: 'Multi-Tenant KVM Hypervisors Pass Zero-Downtime Migration Benchmarks' },
  { tag: 'PRIVACY', text: 'FIDO2 Hardware Passkeys Mandated for Identity Assertion Protocols' },
  { tag: 'REMOTE WORK', text: 'Decentralized High-Ticket Engineering Retainers Surge by 42%' },
  { tag: 'HARDWARE', text: '175W Ada Lovelace GPUs Tested in Sintered Vapor Chamber Enclosures' },
  { tag: 'TECH TIPS', text: 'Windows 11 Kernel Shortcut Ring (Win+V, Win+Shift+S) Workflow Acceleration' },
  { tag: 'FINTECH', text: '3D Secure 2.0 Biometric Handshakes Neutralize Magecart Skimming Vectors' },
  { tag: 'INFRASTRUCTURE', text: 'Prometheus Node Exporter and BBR Congestion Control Guidelines Live' },
  { tag: 'VR OPTICS', text: 'Pancake Optical Lens Teardown: Micro-OLED 3500 PPI Elimination of SDE' },
  { tag: 'BATTERY', text: 'OLED Pure Black (#000000) Saves 39% Milliamp Draw on Mobile Displays' }
];

export const METRICS_DATA = [
  { label: 'Published Engineering Investigations', value: '20', suffix: '', change: '+100% Peer-Reviewed' },
  { label: 'Original Lab Research Reports', value: '84', suffix: 'k', change: '+28.4% Monthly Readership' },
  { label: 'Verified Global Tech Readers', value: '142', suffix: 'k+', change: 'Over 120 Countries' },
  { label: 'Editorial Citations & Backlinks', value: '3,850', suffix: '', change: '99.98% Verification Score' }
];
