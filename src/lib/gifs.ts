/**
 * GIFy kolem odpovědi.
 *
 * Když je při buildu nastavená proměnná GIPHY_API_KEY, stáhne se z GIPHY API
 * velký balík náhodných GIFů (8 dotazů na build, bezplatný klíč stačí).
 * Prohlížeč pak při každé návštěvě vybere jiných 12. API klíč se nikdy nedostane
 * do stránky. Bez klíče nebo při chybě API se použije ručně vybraný seznam.
 *
 * GIFy se přehrávají jako MP4 – bývají 2–5× menší než GIF/WebP.
 */

export type Gif = { src: string; title: string };
export type GifPools = { ano: Gif[]; ne: Gif[]; source: 'giphy' | 'fallback' };

const ANO_QUERIES = ['cat bath', 'dog bath', 'otter swimming', 'puppy swimming pool'];
const NE_QUERIES = ['sad cat', 'sad puppy', 'crying cat', 'sad hamster'];
const PER_QUERY = 25;
const MAX_POOL = 60;
const MIN_POOL = 12;

/** Jeden host pro všechna videa = jedno HTTP/2 spojení. */
const mp4 = (id: string) => `https://media.giphy.com/media/${id}/200w.mp4`;
const gif = (id: string, title: string): Gif => ({ src: mp4(id), title });

/** Ručně vybrané a ověřené GIFy (lehčí varianty, většinou do 300 kB). */
const FALLBACK: Omit<GifPools, 'source'> = {
  ano: [
    gif('1YyLHwUA1HYKGhyeen', 'Pejsek ve sprše'),
    gif('1n5GD4wUX16YLtLlT7', 'Vydra plave pod vodou'),
    gif('7p7vIPiySlSiuqVSYC', 'Kočička ve vaně plné pěny'),
    gif('Xeu98yGdKIKoo', 'Pejsek s koupací čepicí'),
    gif('bbs6sIFJB37c5jHhsa', 'Pejsek plave s míčkem'),
    gif('efHwZH4DeN9ss', 'Kočička zabalená v ručníku'),
    gif('p08OmsVHekXks', 'Kočička ve vaně s gumovou kachničkou'),
    gif('8Bkqq19phBmRsZEVks', 'Kachna s kachňátky'),
    gif('ZbfdzUhcnGULFIQVT0', 'Kreslený pejsek plave'),
    gif('3oz8xEFHNzQE3VIRCE', 'Štěňátko při koupání'),
    gif('mEQCh7ISLcaB0UyGQK', 'Štěňátko plave v bazénu'),
    gif('lkcXO6i4cXIvIVFQ18', 'Kreslený pejsek ve sprše'),
  ],
  ne: [
    gif('1syJZUCK8ey2KBem9n', 'Smutné štěňátko'),
    gif('7AzEXdIb1wyCTWJntb', 'Plačící kočička'),
    gif('AKWXpDjlLgYFe1cZou', 'Smutný kreslený corgi'),
    gif('EW79wVgSajjv44E8Hs', 'Smutný mopslík za oknem v dešti'),
    gif('Lr6hRUytUcabMUlHS6', 'Smutné koťátko'),
    gif('OzlmyoTC2n3aOTXGFi', 'Smutné štěňátko'),
    gif('TZBED1pP5m8N2', 'Zklamaná kočka sedí u zdi'),
    gif('UrhRmF81nrHG3cBIqO', 'Kočička se slzami v očích'),
    gif('c4AFaiFaNSWCP0yFBD', 'Plačící kočka'),
    gif('lR3pWtb80Hz22UjrYj', 'Plačící kreslený tuleň'),
    gif('ySM2PakMSmw7u', 'Smutný pejsek'),
    gif('RJleG0mJsWCcYZ3hUR', 'Vzlykající kočka'),
  ],
};

type GiphyItem = { id?: string; title?: string };

async function search(apiKey: string, q: string): Promise<Gif[]> {
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
  const json = (await res.json()) as { data?: GiphyItem[] };

  return (json.data ?? []).flatMap((g) =>
    g.id && /^[A-Za-z0-9]+$/.test(g.id) ? [gif(g.id, g.title?.trim() || q)] : [],
  );
}

async function pool(apiKey: string, queries: string[]): Promise<Gif[]> {
  const results = (await Promise.all(queries.map((q) => search(apiKey, q)))).flat();
  const seen = new Set<string>();
  return results
    .filter((g) => (seen.has(g.src) ? false : (seen.add(g.src), true)))
    .slice(0, MAX_POOL);
}

let cached: Promise<GifPools> | undefined;

export function getGifPools(): Promise<GifPools> {
  cached ??= load();
  return cached;
}

async function load(): Promise<GifPools> {
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    console.info('[gifs] GIPHY_API_KEY není nastavený, používám ruční seznam.');
    return { ...FALLBACK, source: 'fallback' };
  }
  try {
    const [ano, ne] = await Promise.all([pool(apiKey, ANO_QUERIES), pool(apiKey, NE_QUERIES)]);
    if (ano.length < MIN_POOL || ne.length < MIN_POOL) throw new Error('GIPHY vrátilo málo GIFů');
    console.info(`[gifs] GIPHY: ${ano.length} veselých, ${ne.length} smutných.`);
    return { ano, ne, source: 'giphy' };
  } catch (err) {
    console.warn('[gifs] GIPHY selhalo, používám ruční seznam:', (err as Error).message);
    return { ...FALLBACK, source: 'fallback' };
  }
}
