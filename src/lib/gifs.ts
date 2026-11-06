/**
 * GIFy kolem odpovědi – v prohlížeči se z GIPHY ID skládá URL na animovaný
 * WebP (200w.webp), který se na telefonech přehraje vždycky, i bez videa.
 *
 * Základ je ručně vybraný balík skutečných záběrů (src/data/gifs.json):
 * při ANO se zvířata koupou, při NE jsou hlavně naštvaná (`nastvane`),
 * k tomu smutná (`smutne`) a desetina vtipného sucha a žízně (`sucho`:
 * nejde voda, žízniví lidé, kutálející se suchá tráva). Poměr je NE_MIX v config.ts.
 * Když je při buildu nastavená proměnná GIPHY_API_KEY, přidá se k němu
 * čerstvý výběr z GIPHY API (13 dotazů na build, bezplatný klíč stačí).
 * API klíč se nikdy nedostane do stránky.
 */
import curated from '../data/gifs.json';

export type GifPools = {
  ano: string[];
  smutne: string[];
  nastvane: string[];
  sucho: string[];
  source: 'giphy' | 'curated';
};

const ANO_QUERIES = ['dog bath', 'bird bath', 'otter swimming', 'dog sprinkler'];
const SMUTNE_QUERIES = ['sad dog', 'disappointed cat', 'sad puppy eyes'];
const NASTVANE_QUERIES = ['angry cat', 'hissing cat', 'angry chihuahua', 'angry goose'];
const SUCHO_QUERIES = ['tumbleweed', 'no water'];
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
  const base = { ano: curated.ano, smutne: curated.smutne, nastvane: curated.nastvane, sucho: curated.sucho };
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) return { ...base, source: 'curated' };

  try {
    const fetchAll = async (qs: string[]) =>
      (await Promise.all(qs.map((q) => search(apiKey, q)))).flat();
    const [ano, smutne, nastvane, sucho] = await Promise.all([
      fetchAll(ANO_QUERIES),
      fetchAll(SMUTNE_QUERIES),
      fetchAll(NASTVANE_QUERIES),
      fetchAll(SUCHO_QUERIES),
    ]);
    console.info(
      `[gifs] GIPHY: +${ano.length} veselých, +${smutne.length} smutných, +${nastvane.length} naštvaných, +${sucho.length} suchých.`,
    );
    // Jeden GIF jen v jedné hromádce, jinak by nesedělo počítání poměru na nástěnce.
    const suchoAll = unique([...base.sucho, ...sucho]);
    const nastvaneAll = unique([...base.nastvane, ...nastvane]).filter((id) => !suchoAll.includes(id));
    const smutneAll = unique([...base.smutne, ...smutne]).filter(
      (id) => !suchoAll.includes(id) && !nastvaneAll.includes(id),
    );
    return {
      ano: unique([...base.ano, ...ano]),
      smutne: smutneAll,
      nastvane: nastvaneAll,
      sucho: suchoAll,
      source: 'giphy',
    };
  } catch (err) {
    console.warn('[gifs] GIPHY selhalo, používám ruční výběr:', (err as Error).message);
    return { ...base, source: 'curated' };
  }
}
