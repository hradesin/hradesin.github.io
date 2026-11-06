import type { APIRoute } from 'astro';
import { getVault } from '../../lib/admin-vault';

/**
 * Šifrovaný token zvlášť, ať si ho admin stáhne vždy čerstvý (no-store).
 * HTML na GitHub Pages se cachuje až 10 minut, a po výměně tokenu by
 * jinak heslo chvíli odemykalo ten starý.
 */
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await getVault()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
