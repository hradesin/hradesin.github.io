// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://hradesin.github.io/ (repozitář hradesin/hradesin.github.io)
export default defineConfig({
  site: 'https://hradesin.github.io',
  build: {
    // Jedna malá stránka: CSS rovnou do HTML, žádný další request.
    inlineStylesheets: 'always',
  },
});
