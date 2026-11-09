import type { APIRoute } from 'astro';
import status from '../data/status.json';
import { AKTUALIZOVANO } from '../data/prehled';

/** Hlavní stránka (lastmod = poslední změna stavu) a přehled situace. */
export const GET: APIRoute = ({ site }) => {
  const url = new URL(import.meta.env.BASE_URL, site).href;
  const prehled = new URL('prehled/', url).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}</loc><lastmod>${status.zmeneno}</lastmod></url>
  <url><loc>${prehled}</loc><lastmod>${AKTUALIZOVANO}</lastmod></url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
