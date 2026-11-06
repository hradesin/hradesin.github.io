import type { APIRoute } from 'astro';
import status from '../data/status.json';

/** Jediná veřejná stránka; lastmod = poslední změna stavu. */
export const GET: APIRoute = ({ site }) => {
  const url = new URL(import.meta.env.BASE_URL, site).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}</loc><lastmod>${status.zmeneno}</lastmod></url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
