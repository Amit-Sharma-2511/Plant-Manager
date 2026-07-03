import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Sitemap generator — /sitemap.xml
 *
 * Improvements:
 * - Removed non-existent /garden URL (was causing 404 in sitemap)
 * - Added all static pages: /about, /contact, /faq, /privacy, /terms
 * - Added <lastmod> with ISO dates
 * - Proper <priority> differentiation per page type
 * - Proper <changefreq> per page type
 * - Category pages given 0.9 priority (high crawl value)
 */
export const GET: APIRoute = async () => {
  const plants = await getCollection('plants');
  const blogs  = await getCollection('blog');

  const domain  = 'https://growmyplant.online';
  const today   = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Gather all unique categories from active plant data
  const categorySet = new Set<string>();
  plants.forEach(p => p.data.categories.forEach(cat => categorySet.add(cat)));

  type SitemapEntry = {
    url: string;
    lastmod?: string;
    changefreq: string;
    priority: string;
  };

  // Static pages with appropriate priorities
  const staticPages: SitemapEntry[] = [
    { url: `${domain}/`,        lastmod: today, changefreq: 'daily',   priority: '1.0' },
    { url: `${domain}/plants`,  lastmod: today, changefreq: 'daily',   priority: '0.9' },
    { url: `${domain}/blog`,    lastmod: today, changefreq: 'weekly',  priority: '0.8' },
    { url: `${domain}/faq`,     lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { url: `${domain}/about`,   lastmod: today, changefreq: 'monthly', priority: '0.6' },
    { url: `${domain}/contact`, lastmod: today, changefreq: 'monthly', priority: '0.5' },
    { url: `${domain}/privacy`, lastmod: today, changefreq: 'yearly',  priority: '0.3' },
    { url: `${domain}/terms`,   lastmod: today, changefreq: 'yearly',  priority: '0.3' },
  ];

  // Category pages — high crawl priority (they aggregate many plant pages)
  const categoryPages: SitemapEntry[] = Array.from(categorySet).map(c => ({
    url: `${domain}/category/${c}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  }));

  // Individual plant pages — the core content
  const plantPages: SitemapEntry[] = plants.map(p => ({
    url: `${domain}/plants/${p.id}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8'
  }));

  // Blog posts — sorted by publish date (newest first)
  const blogPages: SitemapEntry[] = blogs
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
    .map(b => ({
      url: `${domain}/blog/${b.id}`,
      lastmod: new Date(b.data.publishDate).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }));

  const allEntries: SitemapEntry[] = [
    ...staticPages,
    ...categoryPages,
    ...plantPages,
    ...blogPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${allEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
