/**
 * Obsah stránky /prehled/ – co se děje s vodou v Hradešíně.
 *
 * Jen ověřené údaje: oznámení obcí Hradešín a Přišimasy (web, přílohy)
 * a dopisy provozovatele Stavokomplet. Žádné odhady ani drby z diskuzí.
 * Při aktualizaci přepiš AKTUALIZOVANO a dotčené bloky.
 */

export const AKTUALIZOVANO = '2026-11-09';

/* ---------- Kde stojí cisterny ---------- */

const mapa = (lat: number, lon: number) => `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`;

/**
 * Oznámení obce 16. 10.: „jedna bude u obecního úřadu a druhá u hřbitova“.
 * Oznámení obce 9. 11.: „cisterna od obecního úřadu je přemístěná k čp. 119 k hlavní silnici (u Vítovských)“.
 */
export const MISTA = {
  urad: mapa(50.0382729, 14.7562835), // obecní úřad Hradešín 114 (kontakty); cisterna tu stála do 9. 11.
  cp119: mapa(50.0390385, 14.755669), // cisterna u čp. 119 u hlavní silnice, adresní bod čp. 119 (RÚIAN v OSM)
  hrbitov: mapa(50.0363168, 14.7596479), // cisterna u hřbitova, místo upřesnil správce webu
};

/* ---------- Kalendář výpadků ---------- */

/** vypadek = aspoň část dne bez vody (podle oznámení obce), ok = výpadek nebyl hlášen, nevime = dnešek / zatím bez zpráv. */
export type DenStav = 'vypadek' | 'ok' | 'nevime';

export interface Den {
  /** ISO datum, místní čas. */
  datum: string;
  stav: DenStav;
  pozn?: string;
}

export const KALENDAR: Den[] = [
  { datum: '2026-10-16', stav: 'ok', pozn: 'Podle Stavokompletu dochází voda ve zdroji. Pro případ výpadku budou přistaveny dvě cisterny: u obecního úřadu a u hřbitova.' },
  { datum: '2026-10-17', stav: 'ok' },
  { datum: '2026-10-18', stav: 'ok' },
  { datum: '2026-10-19', stav: 'vypadek', pozn: 'Bez vody. Voda z vodojemu vytékala rychleji, než přitékala ze zdroje.' },
  { datum: '2026-10-20', stav: 'vypadek', pozn: 'Voda má znovu téct, přesnou hodinu ale Stavokomplet nedokázal určit.' },
  { datum: '2026-10-21', stav: 'ok' },
  { datum: '2026-10-22', stav: 'ok' },
  { datum: '2026-10-23', stav: 'ok' },
  { datum: '2026-10-24', stav: 'vypadek', pozn: 'Do vodojemu natéká pomaleji, než domácnosti spotřebují. Čerpadla musela být vypnuta, aby se nepoškodila.' },
  { datum: '2026-10-25', stav: 'ok' },
  { datum: '2026-10-26', stav: 'ok', pozn: 'Obec: dodávky teď fungují, prosíme dál šetřit vodou.' },
  { datum: '2026-10-27', stav: 'vypadek', pozn: 'Večer přerušení dodávky, obnovení pravděpodobně ve čtvrtek ráno.' },
  { datum: '2026-10-28', stav: 'vypadek', pozn: 'Bez vody.' },
  { datum: '2026-10-29', stav: 'vypadek', pozn: 'Ráno se čekalo obnovení, večer ohlášeno další přerušení až do soboty. Na obecním úřadě jednání o urychlení přivaděče.' },
  { datum: '2026-10-30', stav: 'vypadek', pozn: 'Bez vody.' },
  { datum: '2026-10-31', stav: 'vypadek', pozn: 'Ohlášené obnovení dodávky.' },
  { datum: '2026-11-01', stav: 'ok' },
  { datum: '2026-11-02', stav: 'vypadek', pozn: 'Kolem 17 h přerušení dodávky, obnovení plánováno na středu 4. 11.' },
  { datum: '2026-11-03', stav: 'vypadek', pozn: 'Bez vody. Tlakové zkoušky přivaděče vyhověly, odebrány první vzorky vody z přivaděče (podle obce 9. 11. nevyhověly). Stavokomplet vysvětluje, proč Přišimasy vodu mají a Hradešín ne.' },
  { datum: '2026-11-04', stav: 'vypadek', pozn: 'Plánované obnovení. Večer ale ve vodojemu zase dochází voda, další obnovení v pátek.' },
  { datum: '2026-11-05', stav: 'vypadek', pozn: 'Bez vody, obnovení ohlášeno na pátek.' },
  { datum: '2026-11-06', stav: 'vypadek', pozn: 'Odpoledne pravděpodobné přerušení, obnovení ohlášeno na neděli 8. 11. Z přivaděče odebrány další vzorky vody.' },
  { datum: '2026-11-07', stav: 'vypadek', pozn: 'Bez vody.' },
  { datum: '2026-11-08', stav: 'vypadek', pozn: 'Ve vrtech dál ubývá vody. Dodávka jen 18–20 h, do vodojemu natéká pomaleji, než se čekalo.' },
  { datum: '2026-11-09', stav: 'vypadek', pozn: 'Podle Stavokompletu je situace stále kritická. Voda poteče jen od 19 h, asi přes hodinu, dokud se čerpadla sama nevypnou. Pravidelné pouštění vody nejde domluvit, některý den voda nepoteče vůbec. Cisterny jsou uzamčené, cisterna od úřadu je přemístěná k čp. 119 u hlavní silnice.' },
];

/* ---------- Přivaděč z Úval ---------- */

export type KrokStav = 'hotovo' | 'probiha' | 'ceka';

export const PRIVADEC: { stav: KrokStav; co: string; kdy: string }[] = [
  // Každý krok doslova podle zdroje v závorce: P = obec Přišimasy, H = obec Hradešín.
  { stav: 'hotovo', co: 'Propojení u vodojemu Úvaly-jih', kdy: 'dokončeno, technologie oživená (P 3. 11.)' },
  { stav: 'hotovo', co: 'Tlakové zkoušky celé trasy z Úval', kdy: '3. 11., výsledek vyhovující (H 6. 11.)' },
  { stav: 'probiha', co: 'Rozbor vody', kdy: 'vzorky z 3. 11. nevyhověly, nové odebrány 6. 11., čeká se na výsledky (H 9. 11.)' },
  { stav: 'probiha', co: 'Propojení s vodojemem Hradešín', kdy: 'zhotovitel dodělává dočasné propojovací potrubí (H 6. 11.)' },
  { stav: 'ceka', co: 'Povolení k předčasnému užívání', kdy: 'žádost plánovaná na 1. polovinu listopadu (P 3. 11.)' },
  { stav: 'ceka', co: 'Voda z Úval poteče do vodojemu', kdy: 'až po povolení, termín zatím nebyl oznámen (H 29. 10.)' },
];

/* ---------- Zdroje ---------- */

export const ZDROJE = [
  {
    nazev: 'Obec Hradešín – všechny aktuality k vodě (16. 10. – 9. 11.)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/',
  },
  {
    nazev: 'Obec Hradešín – 9. 11.: omezené dodávky, cisterny, rozbor vody (příloha PDF)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-voda-78cs.html',
  },
  {
    nazev: 'Obec Hradešín – dodávka 8. 11. od 18 do 20 h',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-voda-77cs.html',
  },
  {
    nazev: 'Obec Hradešín – stav přivaděče 6. 11. (příloha PDF)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-voda-silnice-75cs.html',
  },
  {
    nazev: 'Obec Hradešín – jednání o přivaděči 29. 10. (příloha PDF)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/aktuality-k-reseni-nedostatku-pitne-vody-69cs.html',
  },
  {
    nazev: 'Obec Hradešín – pondělní aktuality 26. 10.: nové vrty, kdo za co odpovídá (příloha PDF)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/pondelni-aktuality-z-obce-65cs.html',
  },
  {
    nazev: 'Stavokomplet – vyjádření 3. 11. (na webu obce Hradešín)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-k-prerusovani-dodavek-pitne-vody-v-obci-hradesin-72cs.html',
  },
  {
    nazev: 'Obec Přišimasy – přivaděč, stav 3. 11.',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/privadec-vody-aktualni-stav-1636cs.html',
  },
  {
    nazev: 'Obec Přišimasy – přivaděč, harmonogram 20. 9.',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/privadec-pitne-vody-stavba-pokracuje-1594cs.html',
  },
  {
    nazev: 'Obec Přišimasy – předání staveniště 4. 2. 2026',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/predani-staveniste-privadec-pitne-vody-1497cs.html',
  },
  {
    nazev: 'Obec Přišimasy – zásobování 24. 10. (kde teče samospádem)',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/aktualni-informace-o-zasobovani-pitnou-vodou-24-10-2026-1630cs.html',
  },
];
