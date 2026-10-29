import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORY_1_ARTICLES } from '../src/data/articles/category1';
import { CATEGORY_2_ARTICLES } from '../src/data/articles/category2';
import { CATEGORY_3_ARTICLES } from '../src/data/articles/category3';
import { CATEGORY_4_ARTICLES } from '../src/data/articles/category4';
import { CATEGORY_5_ARTICLES } from '../src/data/articles/category5';

const ALL_ARTICLES = [
  ...CATEGORY_1_ARTICLES,
  ...CATEGORY_2_ARTICLES,
  ...CATEGORY_3_ARTICLES,
  ...CATEGORY_4_ARTICLES,
  ...CATEGORY_5_ARTICLES
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const articlesDir = path.resolve(publicDir, 'articles');

// Ensure public/articles directory exists
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

console.log(`Generating static HTML pages for ${ALL_ARTICLES.length} articles...`);

for (const article of ALL_ARTICLES) {
  const articleFolder = path.resolve(articlesDir, article.slug);
  if (!fs.existsSync(articleFolder)) {
    fs.mkdirSync(articleFolder, { recursive: true });
  }

  // Pre-render content sections for SEO crawlers (Googlebot, Bingbot)
  const sectionsHtml = (article.sections || []).map(sec => `
    <section class="article-section" style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #5fdee7; margin-bottom: 0.75rem;">${escapeHtml(sec.heading)}</h2>
      ${sec.subheading ? `<h3 style="font-size: 1.15rem; font-weight: 600; color: #34d399; margin-bottom: 0.75rem;">${escapeHtml(sec.subheading)}</h3>` : ''}
      ${(sec.content || []).map(p => `<p style="font-size: 1.05rem; line-height: 1.8; color: #cbd5e1; margin-bottom: 1rem;">${escapeHtml(p)}</p>`).join('\n')}
      ${sec.codeBlock ? `
        <pre style="background: #020c0a; border: 1px solid rgba(95,222,231,0.25); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: monospace; color: #5fdee7; font-size: 0.9rem;"><code>${escapeHtml(sec.codeBlock.code)}</code></pre>
      ` : ''}
      ${sec.table ? `
        <div style="overflow-x: auto; margin: 1.5rem 0;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; color: #e2e8f0;">
            <thead>
              <tr style="border-bottom: 2px solid rgba(16,185,129,0.4); background: #06231c;">
                ${sec.table.headers.map(h => `<th style="padding: 0.75rem 1rem; color: #34d399;">${escapeHtml(h)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${sec.table.rows.map(row => `
                <tr style="border-bottom: 1px solid rgba(95,222,231,0.15);">
                  ${row.map(cell => `<td style="padding: 0.75rem 1rem;">${escapeHtml(cell)}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    </section>
  `).join('\n');

  // Key takeaways block
  const takeawaysHtml = article.keyTakeaways && article.keyTakeaways.length > 0 ? `
    <div style="background: #06231c; border-left: 4px solid #10b981; padding: 1.25rem 1.5rem; margin: 2rem 0; border-radius: 0.5rem;">
      <strong style="color: #34d399; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.75rem;">Key Engineering Takeaways:</strong>
      <ul style="margin: 0; padding-left: 1.25rem; color: #e2e8f0; line-height: 1.7;">
        ${article.keyTakeaways.map(t => `<li style="margin-bottom: 0.5rem;">${escapeHtml(t)}</li>`).join('\n')}
      </ul>
    </div>
  ` : '';

  // FAQ schema & html if available
  const faqHtml = article.faq && article.faq.length > 0 ? `
    <section class="article-faq" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(95,222,231,0.2);">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #5fdee7; margin-bottom: 1.25rem;">Frequently Asked Questions</h2>
      ${article.faq.map(item => `
        <div style="margin-bottom: 1.5rem; background: #06231c; padding: 1.25rem; border-radius: 0.75rem; border: 1px solid rgba(16,185,129,0.25);">
          <h3 style="font-size: 1.15rem; font-weight: 600; color: #34d399; margin-bottom: 0.5rem;">${escapeHtml(item.question)}</h3>
          <p style="color: #cbd5e1; line-height: 1.7; margin: 0;">${escapeHtml(item.answer)}</p>
        </div>
      `).join('\n')}
    </section>
  ` : '';

  const imageFileName = article.imageUrl ? path.basename(article.imageUrl) : '';
  const publicImageUrl = imageFileName ? `/assets/images/${imageFileName}` : '';
  const fullAbsoluteImageUrl = imageFileName ? `https://techapark.com/assets/images/${imageFileName}` : '';

  // Structured Data Schema (JSON-LD) for Google Search Console
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "alternativeHeadline": article.subtitle,
    "description": article.summary,
    "image": fullAbsoluteImageUrl || undefined,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
      "affiliation": {
        "@type": "Organization",
        "name": article.author.institution
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechAPark",
      "logo": {
        "@type": "ImageObject",
        "url": "https://techapark.com/favicon.svg"
      }
    },
    "datePublished": "2026-10-27T08:00:00+00:00",
    "dateModified": "2026-10-28T08:00:00+00:00",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://techapark.com/articles/${article.slug}`
    },
    "keywords": article.tags.join(', '),
    "wordCount": article.wordCount,
    "articleSection": article.category
  };

  const html = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(article.title)} | TechAPark Engineering Journal</title>
    <meta name="description" content="${escapeHtml(article.summary)}" />
    <meta name="keywords" content="${escapeHtml(article.tags.join(', '))}" />
    <link rel="canonical" href="https://techapark.com/articles/${article.slug}" />

    <!-- OpenGraph / Facebook -->
    <meta property="og:title" content="${escapeHtml(article.title)} | TechAPark" />
    <meta property="og:description" content="${escapeHtml(article.summary)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://techapark.com/articles/${article.slug}" />
    <meta property="og:site_name" content="TechAPark" />
    ${fullAbsoluteImageUrl ? `<meta property="og:image" content="${fullAbsoluteImageUrl}" />` : ''}
    <meta property="article:published_time" content="2026-10-27T08:00:00+00:00" />
    <meta property="article:author" content="${escapeHtml(article.author.name)}" />
    <meta property="article:section" content="${escapeHtml(article.category)}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.title)}" />
    <meta name="twitter:description" content="${escapeHtml(article.summary)}" />
    ${fullAbsoluteImageUrl ? `<meta name="twitter:image" content="${fullAbsoluteImageUrl}" />` : ''}

    <meta name="theme-color" content="#081c18" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate icon" href="/favicon.svg" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Schema.org JSON-LD Structured Data for Google Search Console -->
    <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
    </script>

    <style>
      body {
        margin: 0;
        background-color: #081c18;
        color: #f1f5f9;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }
      .ssr-banner {
        background: #041a15;
        border-bottom: 1px solid rgba(16,185,129,0.3);
        padding: 0.75rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
      }
      .ssr-banner a {
        color: #5fdee7;
        text-decoration: none;
        font-weight: 600;
      }
      .ssr-content {
        max-width: 860px;
        margin: 0 auto;
        padding: 3rem 1.5rem;
      }
    </style>
  </head>
  <body class="bg-[#081c18] text-slate-100 antialiased selection:bg-[#5fdee7]/25 selection:text-[#5fdee7]">
    
    <!-- React Hydration Root -->
    <div id="root">
      <!-- Fallback Semantic HTML for Googlebot / SEO crawlers before JS executes -->
      <header class="ssr-banner">
        <div>
          <a href="/">← TechAPark Engineering Journal</a>
          <span style="color: #64748b; margin: 0 0.5rem;">/</span>
          <span style="color: #10b981;">${escapeHtml(article.category)}</span>
        </div>
        <a href="/" style="background: #0e3b31; color: #34d399; padding: 0.35rem 0.75rem; border-radius: 0.375rem; border: 1px solid rgba(16,185,129,0.3);">
          Open Full Interactive Journal
        </a>
      </header>

      <main class="ssr-content">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #5fdee7; text-transform: uppercase; margin-bottom: 0.75rem;">
          ${escapeHtml(article.category)} · Article ${escapeHtml(article.articleNumber)} · ${escapeHtml(article.readTime)} · ${escapeHtml(article.publishDate)}
        </div>

        <h1 style="font-size: 2.25rem; font-weight: 800; font-family: 'Outfit', sans-serif; line-height: 1.25; color: #ffffff; margin-top: 0; margin-bottom: 0.75rem;">
          ${escapeHtml(article.title)}
        </h1>

        <p style="font-size: 1.15rem; color: #a7f3d0; font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5rem; line-height: 1.5;">
          ${escapeHtml(article.subtitle)}
        </p>

        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-top: 1px solid rgba(95,222,231,0.2); border-bottom: 1px solid rgba(95,222,231,0.2); margin-bottom: 2.5rem; font-size: 0.9rem; color: #94a3b8;">
          <div>
            <strong style="color: #f1f5f9; display: block;">${escapeHtml(article.author.name)}</strong>
            <span>${escapeHtml(article.author.role)} — ${escapeHtml(article.author.institution)}</span>
          </div>
          <div style="margin-left: auto; text-align: right; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <span>${article.wordCount} words</span> · <span>Peer Reviewed</span>
          </div>
        </div>

        ${imageFileName ? `
          <div style="margin-bottom: 2.5rem; border-radius: 1rem; overflow: hidden; border: 1px solid rgba(16,185,129,0.35); background: #041a15; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <img 
              src="${publicImageUrl}" 
              onerror="if(this.src.indexOf('../../')===-1){this.src='../../assets/images/${imageFileName}';}" 
              alt="${escapeHtml(article.title)}" 
              style="width: 100%; max-height: 650px; object-fit: contain; display: block; margin: 0 auto; background: #020c0a;" 
              loading="eager"
            />
            <div style="padding: 0.6rem 1rem; background: #061e18; border-top: 1px solid rgba(16,185,129,0.2); font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #5fdee7; display: flex; justify-content: space-between; align-items: center;">
              <span>Infographic Schematic · ${escapeHtml(article.infographic?.title || article.title)}</span>
              <span style="color: #34d399; font-weight: 600;">● High-Res Infographic</span>
            </div>
          </div>
        ` : ''}

        <div class="article-body">
          ${takeawaysHtml}
          ${sectionsHtml}
          ${faqHtml}
        </div>
      </main>
    </div>

    <!-- SPA Hydration Script -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.resolve(articleFolder, 'index.html'), html.trim(), 'utf-8');
}

console.log(`Successfully generated static HTML pages for all ${ALL_ARTICLES.length} articles in /public/articles/[slug]/index.html`);

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
