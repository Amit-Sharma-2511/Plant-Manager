import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const plants = await getCollection('plants');
  const blogs = await getCollection('blog');

  // Dynamically gather categories from active plant profiles
  const categorySet = new Set<string>();
  plants.forEach(p => {
    p.data.categories.forEach(cat => categorySet.add(cat));
  });

  const domain = 'https://growmyplant.online';

  // Base list of platform pages
  const urls = [
    `${domain}/`,
    `${domain}/plants`,
    `${domain}/blog`,
    `${domain}/garden`,
    ...plants.map(p => `${domain}/plants/${p.id}`),
    ...blogs.map(b => `${domain}/blog/${b.id}`),
    ...Array.from(categorySet).map(c => `${domain}/category/${c}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === (domain + '/') ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
