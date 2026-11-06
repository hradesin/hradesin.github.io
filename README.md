# Teče voda v Hradešíně?

Jednoduchá stránka s odpovědí ANO / NE a GIFy se zvířátky.

- Web: https://kovic77.github.io/hradesin-voda/
- Změna stavu: https://kovic77.github.io/hradesin-voda/admin/

## Jak se mění stav

Admin stránka uloží nový stav do `src/data/status.json` (commit přes GitHub API).
Bez admin stránky jde stav změnit i přímo na GitHubu:
https://github.com/Kovic77/hradesin-voda/edit/main/src/data/status.json
Commit spustí GitHub Actions, web se nasadí obvykle do minuty. Otevřené stránky
si nový stav načtou samy každou minutu.

### Heslo pro admin stránku

Na admin stránce se zadává heslo (GitHub secret `ADMIN_PASSWORD`). Za ním je
fine-grained GitHub token (secret `ADMIN_TOKEN`), který umí zapisovat jen do tohoto
repozitáře. Při buildu se token heslem zašifruje (PBKDF2-SHA256, 600 000 iterací,
AES-256-GCM) a do stránky jde jen šifrovaný blob. Heslo ani token v kódu nejsou,
rozšifrovaný token drží prohlížeč jen do zavření panelu.

Token:

1. [Nový fine-grained token](https://github.com/settings/personal-access-tokens/new?name=hradesin-voda-admin&description=Z%C3%A1pis+stavu+vody&target_name=Kovic77&expires_in=365&contents=write)
   (formulář je předvyplněný). V **Repository access** zvolte **Only select repositories** → `hradesin-voda`.
2. Vložte ho jako secret `ADMIN_TOKEN`:
   https://github.com/Kovic77/hradesin-voda/settings/secrets/actions/new
3. Spusťte nasazení: Actions → Deploy → Run workflow.

Výměna hesla: přepsat secret `ADMIN_PASSWORD` a znovu spustit nasazení. Když token
vyprší nebo unikne, smažte ho na GitHubu, vytvořte nový a přepište `ADMIN_TOKEN`.

Krátké heslo jde z veřejného blobu offline hádat. Kdo ho uhodne, může zapisovat
do repozitáře, proto token platí jen pro tento repozitář a jen rok.

## GIFy

Základ je ručně vybraný balík skutečných zvířat v `src/data/gifs.json`
(53 koupajících se pro ANO, 47 smutných pro NE, žádné kreslené). Každá návštěva
dostane náhodný výběr, dlaždice se samy prolínají a klik na dlaždici ukáže nový GIF.

### GIPHY (volitelné)

S klíčem se při každém buildu přidá až 100 + 100 čerstvých GIFů z GIPHY. Build běží
při každé změně stavu a jednou denně.

1. Na https://developers.giphy.com vytvořte aplikaci typu API a zkopírujte klíč.
2. `gh secret set GIPHY_API_KEY --repo Kovic77/hradesin-voda`

## Písma

Obě z Brna, licence OFL, ořezaná na latinku s češtinou (`public/fonts/`):

- **Handjet** (Rosetta) – odpověď ANO/NE složená z kapek a čas aktualizace
- **Montagu Slab** (Florian Karsten) – otázka a texty

## Vývoj

```sh
nvm use        # Node 24 (.nvmrc)
pnpm install
pnpm dev       # http://localhost:4321/hradesin-voda/
pnpm build
```
