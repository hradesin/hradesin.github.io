// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://kovic77.github.io/hradesin-voda/
export default defineConfig({
  site: 'https://kovic77.github.io',
  base: '/hradesin-voda',
  build: {
    // Jedna malá stránka: CSS rovnou do HTML, žádný další request.
    inlineStylesheets: 'always',
  },
});
