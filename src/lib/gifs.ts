/**
 * GIFy kolem odpovědi – v prohlížeči se z GIPHY ID skládá URL na MP4
 * (2–5× menší než GIF/WebP).
 *
 * Základ je ručně vybraný balík skutečných zvířat (src/data/gifs.json):
 * při ANO se koupou, při NE jsou smutná, žíznivá nebo zklamaná.
 * Když je při buildu nastavená proměnná GIPHY_API_KEY, přidá se k němu
 * čerstvý výběr z GIPHY API (8 dotazů na build, bezplatný klíč stačí).
 * API klíč se nikdy nedostane do stránky.
 */
import curated from '../data/gifs.json';

export type GifPools = { ano: string[]; ne: string[]; source: 'giphy' | 'curated' };

const ANO_QUERIES = ['dog bath', 'bird bath', 'otter swimming', 'dog sprinkler'];
const NE_QUERIES = ['sad dog', 'disappointed cat', 'sad puppy eyes', 'grumpy cat'];
const PER_QUERY = 25;
const ID = /^[A-Za-z0-9]+$/;

async function search(apiKey: string, q: string): Promise<string[]> {
  const url = new URL('https://api.giphy.com/v1/gifs/search');
  url.search = new URLSearchParams({
    api_key: apiKey,
    q,
    limit: String(PER_QUERY),
    offset: String(Math.floor(Math.random() * 50)),
    rating: 'g',
    lang: 'en',
  }).toString();

  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`GIPHY ${res.status} pro "${q}"`);
  const json = (await res.json()) as { data?: { id?: string }[] };
  return (json.data ?? []).flatMap((g) => (g.id && ID.test(g.id) ? [g.id] : []));
}

const unique = (ids: string[]) => [...new Set(ids)];

let cached: Promise<GifPools> | undefined;

export function getGifPools(): Promise<GifPools> {
  cached ??= load();
  return cached;
}

async function load(): Promise<GifPools> {
  const base = { ano: curated.ano, ne: curated.ne };
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) return { ...base, source: 'curated' };

  try {
    const fetchAll = async (qs: string[]) =>
      (await Promise.all(qs.map((q) => search(apiKey, q)))).flat();
    const [ano, ne] = await Promise.all([fetchAll(ANO_QUERIES), fetchAll(NE_QUERIES)]);
    console.info(`[gifs] GIPHY: +${ano.length} veselých, +${ne.length} smutných.`);
    return { ano: unique([...base.ano, ...ano]), ne: unique([...base.ne, ...ne]), source: 'giphy' };
  } catch (err) {
    console.warn('[gifs] GIPHY selhalo, používám ruční výběr:', (err as Error).message);
    return { ...base, source: 'curated' };
  }
}
