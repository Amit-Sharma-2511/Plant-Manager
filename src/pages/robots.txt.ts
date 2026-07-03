import type { APIRoute } from 'astro';

/**
 * robots.txt generator — /robots.txt
 *
 * Improvements:
 * - Disallow search/filter query-string URLs (duplicate content prevention)
 * - Disallow /search-index.json (no crawl value, just data)
 * - Allow all core content pages
 * - References sitemap
 * - NO Crawl-delay (per spec: not honoured by Googlebot, per user requirement)
 * - Clean, standards-compliant format
 */
export const GET: APIRoute = () => {
  const robots = `# robots.txt — growmyplant.online
# Updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Prevent crawling of duplicate search/filter result pages
# (URL param variations create thin, near-duplicate content)
Disallow: /plants?*search=
Disallow: /plants?*category=
Disallow: /plants?*difficulty=
Disallow: /plants?*zone=
Disallow: /plants?*toxic=

# Data endpoints — no crawl value
Disallow: /search-index.json

# Staging domain is blocked separately via X-Robots-Tag: noindex header
# on plant-manager-7cp.pages.dev — this file only applies to growmyplant.online

Sitemap: https://growmyplant.online/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
