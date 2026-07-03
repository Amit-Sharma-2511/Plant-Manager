import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Static JSON endpoint: /search-index.json
 *
 * Serves the full plant search index as a static file fetched on-demand
 * by the client-side search autocomplete ONLY when the user interacts
 * with the search bar. This removes ~200KB of inline JSON from every page.
 *
 * Built at compile time — zero runtime cost. Cached by CDN.
 */
export const GET: APIRoute = async () => {
  const allPlants = await getCollection('plants');

  const searchIndex = allPlants.map(p => ({
    name: p.data.commonName,
    scientific: p.data.scientificName,
    slug: p.data.slug,
    image: p.data.image,
    categories: p.data.categories,
    nicknames: p.data.nicknames || []
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Cache for 1 day on CDN, 1 hour stale-while-revalidate
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600'
    }
  });
};
