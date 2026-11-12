/**
 * Obsah stránky /prehled/ – co se děje s vodou v Hradešíně.
 *
 * Jen ověřené údaje: oznámení obcí Hradešín a Přišimasy (web, přílohy)
 * a dopisy provozovatele Stavokomplet. Žádné odhady ani drby z diskuzí.
 * Obecné informace o rozborech vody: vyhláška 252/2004 Sb., metodika SZÚ (2014).
 * Při aktualizaci přepiš AKTUALIZOVANO a dotčené bloky.
 */

export const AKTUALIZOVANO = '2026-11-12';

/** Poslední ohlášená dodávka (dlaždice „Jak to vypadá teď“). Datum se na stránce samo změní na „dnes“ / „včera“. */
export const DODAVKA = {
  datum: '2026-11-12',
  cas: 'asi 15\u00a0h',
  pozn: 'ohlášené obnovení dodávky',
};

/* ---------- Kde stojí cisterny ---------- */

const mapa = (lat: number, lon: number) => `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`;

/**
 * Oznámení obce 16. 10.: „jedna bude u obecního úřadu a druhá u hřbitova“.
 * Oznámení obce 9. 11.: „cisterna od obecního úřadu je přemístěná k čp. 119 k hlavní silnici (u Vítovských)“.
 * Oznámení obce 11. 11.: „Cisterna je opět umístěna od čp. 119 před obecní úřad.“
 */
export const MISTA = {
  urad: mapa(50.0382729, 14.7562835), // obecní úřad Hradešín 114 (kontakty); cisterna tu stála do 9. 11. a znovu od 11. 11.
  cp119: mapa(50.0390385, 14.755669), // cisterna tu stála 9.–11. 11., u hlavní silnice, adresní bod čp. 119 (RÚIAN v OSM)
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
  { datum: '2026-11-06', stav: 'vypadek', pozn: 'Odpoledne pravděpodobné přerušení, obnovení ohlášeno na neděli 8. 11. Z přivaděče odebrány další vzorky vody (podle obce Přišimasy 10. 11. nevyhověly).' },
  { datum: '2026-11-07', stav: 'vypadek', pozn: 'Bez vody.' },
  { datum: '2026-11-08', stav: 'vypadek', pozn: 'Ve vrtech dál ubývá vody. Dodávka jen 18–20 h, do vodojemu natéká pomaleji, než se čekalo.' },
  { datum: '2026-11-09', stav: 'vypadek', pozn: 'Podle Stavokompletu je situace stále kritická. Voda poteče jen od 19 h, asi přes hodinu, dokud se čerpadla sama nevypnou. Pravidelné pouštění vody nejde domluvit, některý den voda nepoteče vůbec. Cisterny jsou uzamčené, cisterna od úřadu je přemístěná k čp. 119 u hlavní silnice.' },
  { datum: '2026-11-10', stav: 'vypadek', pozn: 'Voda poteče opět od 19 h, dokud automatický systém nevypne čerpadla, asi přes hodinu. Ani druhé vzorky z přivaděče nevyhověly, další odběr je naplánovaný na pátek 13. 11.' },
  { datum: '2026-11-11', stav: 'vypadek', pozn: 'Voda poteče opět od 19 h, dokud se nevypnou čerpadla. Cisterna od čp. 119 je zpátky před obecním úřadem. Provizorní napojení přivaděče na vodojem je hotové. Druhé vzorky nevyhověly, nadlimitní hodnoty ale klesají. Kontrolní vzorek se odebere v pátek 13. 11.' },
  { datum: '2026-11-12', stav: 'vypadek', pozn: 'Obce a provozovatel rozhodli: dokud se nespustí přivaděč, bude se vodojem doplňovat vodou z cisteren. Dodávka se má obnovit kolem 15 h. Obec doufá, že další výpadky už nenastanou, a prosí dál šetřit vodou.' },
];

/* ---------- Přivaděč z Úval ---------- */

export type KrokStav = 'hotovo' | 'probiha' | 'ceka';

/** pozor = krátká zpráva, která se u kroku zvýrazní červeně (něco nevyšlo); odkaz = kotva na podrobnosti níž na stránce. */
export const PRIVADEC: { stav: KrokStav; co: string; kdy: string; pozor?: string; odkaz?: string }[] = [
  // Každý krok doslova podle zdroje v závorce: P = obec Přišimasy, H = obec Hradešín.
  { stav: 'hotovo', co: 'Propojení u vodojemu Úvaly-jih', kdy: 'dokončeno, technologie oživená (P 3. 11.)' },
  { stav: 'hotovo', co: 'Tlakové zkoušky celé trasy z Úval', kdy: '3. 11., výsledek vyhovující (H 6. 11.)' },
  { stav: 'probiha', co: 'Rozbor vody', odkaz: '#rozbor', pozor: 'nevyhověly vzorky z 3. 11. ani z 6. 11.', kdy: 'nadlimitní hodnoty klesají, po novém proplachu kontrolní vzorek v pátek 13. 11. (H 11. 11.)' },
  { stav: 'hotovo', co: 'Propojení s vodojemem Hradešín', kdy: 'provizorní napojení dokončeno, řeší se už jen řízení nátoku (H 11. 11.)' },
  { stav: 'ceka', co: 'Povolení k předčasnému užívání', kdy: 'předjednáno: po vyhovujícím rozboru vydá hygiena (KHS) stanovisko obratem a vodoprávní úřad v Českém Brodě zahájí řízení (H 11. 11.)' },
  { stav: 'ceka', co: 'Voda z Úval poteče do vodojemu', kdy: 'až povolení nabude právní moci; účastníci se vzdají odvolání, aby to bylo co nejdřív. Termín zatím není (H 11. 11.)' },
];

/* ---------- Rozbor vody z přivaděče ---------- */

export type OdberStav = 'nevyhovel' | 'ceka' | 'vyhovel' | 'planovano';

/**
 * Odběry vzorků z nového přivaděče podle obcí Hradešín (9. 11., 11. 11.) a Přišimasy (10. 11., 11. 11.). Nový odběr přidej na konec.
 * pred = popisek spojnice před odběrem (výchozí „znovu“), jen když je krok mezi odběry ověřený.
 */
export const ODBERY: { datum: string; stav: OdberStav; pred?: string }[] = [
  { datum: '2026-11-03', stav: 'nevyhovel' },
  { datum: '2026-11-06', stav: 'nevyhovel' },
  { datum: '2026-11-13', stav: 'planovano', pred: 'proplach' },
];

/* ---------- Zdroje ---------- */

export const ZDROJE = [
  {
    nazev: 'Obec Hradešín – všechny aktuality k vodě (16. 10. – 12. 11.)',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/',
  },
  {
    nazev: 'Obec Hradešín – 12. 11.: vodojem se bude doplňovat z cisteren, dodávka se má obnovit kolem 15 h',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/aktuality-situace-s-pitnou-vodou-12112026-83cs.html',
  },
  {
    nazev: 'Obec Hradešín – jednání 11. 11.: napojení na vodojem hotové, druhý vzorek nevyhověl, postup povolení',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/aktualni-informace-k-situaci-s-pitnou-vodou-11-11-2026-82cs.html',
  },
  {
    nazev: 'Obec Hradešín – 11. 11.: dodávka od 19 h, cisterna zpět před úřadem, další vzorky 13. 11.',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-voda-81cs.html',
  },
  {
    nazev: 'Obec Hradešín – dodávka 10. 11. od 19 h',
    url: 'https://www.hradesin.cz/obecni-urad/aktuality/informace-k-dodavce-vody-do-domacnosti-79cs.html',
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
    nazev: 'Vyhláška o pitné vodě 252/2004 Sb. – § 4 odst. 7 (vzorek z nové části vodovodu), § 9 (opakování odběru)',
    url: 'https://www.zakonyprolidi.cz/cs/2004-252',
  },
  {
    nazev: 'Státní zdravotní ústav – Zásady správné praxe při výstavbě a opravách vodovodní sítě (2014, PDF)',
    url: 'https://szu.gov.cz/wp-content/uploads/2023/02/pece_o_sit.pdf',
  },
  {
    nazev: 'Obec Přišimasy – 12. 11.: vodojem se doplňuje z cisteren, prosba šetřit vodou i v Přišimasech',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/prosime-setrete-vodou-1643cs.html',
  },
  {
    nazev: 'Obec Přišimasy – přivaděč 11. 11.: napojení na vodojem hotové, další proplach a dezinfekce, odběr 13. 11.',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/aktualne-k-privadeci-vody-1642cs.html',
  },
  {
    nazev: 'Obec Přišimasy – přivaděč 10. 11.: ani druhý vzorek nevyhověl, další odběr 13. 11., dohoda s Úvaly, KHS',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/privadec-vody-aktualni-stav-1641cs.html',
  },
  {
    nazev: 'Obec Přišimasy – přivaděč, stav 3. 11.',
    url: 'https://www.prisimasy.cz/zivot-v-obci/aktuality/privadec-vody-aktualni-stav-1636cs.html',
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
