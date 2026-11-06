# Teče voda v Hradešíně?

Jednoduchá stránka s odpovědí ANO / NE a GIFy se zvířátky.

- Web: https://kovic77.github.io/hradesin-voda/
- Změna stavu: https://kovic77.github.io/hradesin-voda/admin/

## Jak se mění stav

Admin stránka uloží nový stav do `src/data/status.json` (commit přes GitHub API).
Commit spustí GitHub Actions, web se nasadí obvykle do minuty. Otevřené stránky
si nový stav načtou samy každou minutu.

### Heslo pro admin stránku

Heslo je **fine-grained GitHub token**, který umí zapisovat jen do tohoto repozitáře:

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
2. Repository access: **Only select repositories** → `hradesin-voda`
3. Permissions → Repository permissions → **Contents: Read and write**
4. Token vložte na admin stránce do pole Heslo. Zařízení si ho zapamatuje.

Token není nikde v kódu, takže zdrojáky webu nic neprozradí. Když ho ztratíte,
na GitHubu ho smažte a vytvořte nový.

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
