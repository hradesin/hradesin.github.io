/** GitHub repozitář, do kterého admin stránka ukládá stav. */
export const REPO = 'hradesin/hradesin.github.io';
export const BRANCH = 'main';
export const STATUS_PATH = 'src/data/status.json';

/** Kolik GIFů je vidět najednou (na desktopu rámují odpověď). */
export const GIF_SLOTS = 16;

/** Jedna fotka se sama vymění v náhodném intervalu (ms) – pravidelný rytmus působí strojově. */
export const GIF_ROTATE_MS = [4000, 9000] as const;

/**
 * Při NE: podíl hromádek na nástěnce (0 = hromádka se nepoužije).
 * Teď jen smutná zvířátka; naštvaná a sucho jsou v gifs.json připravené,
 * např. { smutne: 0.2, nastvane: 0.7, sucho: 0.1 } dá na 16 fotkách 2–4 / 10–12 / 1–2.
 */
export const NE_MIX: Record<'smutne' | 'nastvane' | 'sucho', number> = { smutne: 1, nastvane: 0, sucho: 0 };


/**
 * Návštěvnost (Umami Cloud, EU, bez cookies). Skript měří jen na ostré doméně.
 * Počítadlo na stránce čte veřejný sdílený přehled (jen čtení, jen „overview“ a „realtime“).
 */
export const UMAMI = {
  websiteId: '52070947-cd2b-494a-a927-73dbd0ba1fa6',
  domain: 'hradesin.github.io',
  shareId: 'jW0l68jDlmy9hENH',
  api: 'https://cloud.umami.is/analytics/eu/api',
} as const;
