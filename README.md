# Teče voda v Hradešíně?

Jednoduchá stránka s odpovědí ANO / NE a GIFy se zvířátky.

- Web: https://hradesin.github.io/
- Změna stavu: https://hradesin.github.io/admin/
- Repozitář: https://github.com/hradesin/hradesin.github.io (organizace `hradesin`)

## Jak se mění stav

Admin stránka uloží nový stav do `src/data/status.json` (commit přes GitHub API).
Bez admin stránky jde stav změnit i přímo na GitHubu:
https://github.com/hradesin/hradesin.github.io/edit/main/src/data/status.json
Commit spustí GitHub Actions, web se nasadí obvykle do minuty. Otevřené stránky
si nový stav načtou samy každou minutu.

### Heslo pro admin stránku

Na admin stránce se zadává heslo (GitHub secret `ADMIN_PASSWORD`). Za ním je
fine-grained GitHub token (secret `ADMIN_TOKEN`), který umí zapisovat jen do tohoto
repozitáře. Při buildu se token heslem zašifruje (PBKDF2-SHA256, 600 000 iterací,
AES-256-GCM) a do stránky jde jen šifrovaný blob. Heslo ani token v kódu nejsou,
rozšifrovaný token drží prohlížeč jen do zavření panelu.

Token:

1. [Nový fine-grained token](https://github.com/settings/personal-access-tokens/new?name=hradesin-voda-admin&description=Z%C3%A1pis+stavu+vody&target_name=hradesin&expires_in=365&contents=write)
   (formulář je předvyplněný, Resource owner = `hradesin`). V **Repository access** zvolte **Only select repositories** → `hradesin.github.io`.
2. Vložte ho jako secret `ADMIN_TOKEN`:
   https://github.com/hradesin/hradesin.github.io/settings/secrets/actions/new
3. Spusťte nasazení: Actions → Deploy → Run workflow.

Výměna hesla: přepsat secret `ADMIN_PASSWORD` a znovu spustit nasazení. Když token
vyprší nebo unikne, smažte ho na GitHubu, vytvořte nový a přepište `ADMIN_TOKEN`.

Krátké heslo jde z veřejného blobu offline hádat. Kdo ho uhodne, může zapisovat
do repozitáře, proto token platí jen pro tento repozitář a jen rok.

## GIFy

Základ je ručně vybraný balík skutečných záběrů v `src/data/gifs.json`
(žádné kreslené ani s textem):

- `ano` – 65 koupajících se zvířat,
- `nastvane` – 47 naštvaných zvířat (syčící kočky, vrčící čivavy, husy, mývalové),
- `smutne` – 54 smutných zvířat,
- `sucho` – 29 vtipných GIFů se suchem a žízní: nejde voda z kohoutku ani ze sprchy,
  lidé umírající žízní, kutálející se suchá tráva.

Při NE jsou teď jen smutná zvířátka. Poměr hromádek je `NE_MIX` v `src/config.ts`:
naštvaná a sucho jsou připravené, stačí jim dát nenulový podíl
(třeba 0.2 / 0.7 / 0.1 dá na 16 fotkách 2–4 smutná, 10–12 naštvaných a 1–2 suché).
V prohlížeči se hrají jako animovaný WebP v `<img>` – funguje na každém telefonu,
i v úsporném režimu, kde video samo nehraje. Každá návštěva
dostane náhodný výběr, dlaždice se samy prolínají a klik na dlaždici ukáže nový GIF.

### GIPHY (volitelné)

S klíčem se při každém buildu přidá až 100 (ANO) + 75 + 100 + 50 (NE) čerstvých GIFů z GIPHY. Build běží
při každé změně stavu a jednou denně.

1. Na https://developers.giphy.com vytvořte aplikaci typu API a zkopírujte klíč.
2. `gh secret set GIPHY_API_KEY --repo hradesin/hradesin.github.io`

## Vzhled

Úřední deska: uprostřed připíchnutý list s otázkou a razítkem ANO/NE, kolem nahodile
připíchnuté fotky (GIFy). Při ANO je nástěnka „zatopená“ modrou, při NE vyschlý korek.
Klik na fotku ji přepíchne s jiným zvířetem, klik na razítko bouchne znovu. Animace jde
zastavit tlačítkem vpravo dole (volba se pamatuje, `prefers-reduced-motion` se respektuje).

Písma z Google Fonts (OFL), uložená v `public/fonts/` a ořezaná na latinku s češtinou:

- **Big Shoulders** – razítko ANO/NE
- **Martian Mono** – text „psaný na stroji“

## Sdílení, ikony, SEO

- Náhled pro sdílení `public/og-ano.jpg` / `og-ne.jpg` (1200 × 630) podle stavu,
  `?v=` v adrese obejde cache Facebooku a WhatsAppu.
- Ikona v záložce podle stavu (`favicon-ano.svg` / `favicon-ne.svg`), web jde přidat
  na plochu (`manifest.webmanifest`, ikony 192/512/maskable, `apple-touch-icon.png`).
- Canonical, Open Graph, JSON-LD `WebPage` s `dateModified`, `robots.txt`, `sitemap.xml`.
- Stránka 404 ve stejném stylu.

## Návštěvnost

[Umami Cloud](https://cloud.umami.is) (bez cookies), měří jen na `hradesin.github.io`.
Řádek „Kolik tu dnes bylo Hradešíňáků?“ (návštěvníci od pražské půlnoci) čte veřejný
sdílený přehled Umami (jen čtení);
když Umami neodpoví, řádek se prostě nezobrazí. Nastavení v `src/config.ts` (`UMAMI`).

## Vývoj

```sh
nvm use        # Node 24 (.nvmrc)
pnpm install
pnpm dev       # http://localhost:4321/
pnpm build
```
