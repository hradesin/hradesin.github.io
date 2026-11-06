// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// GitHub Pages: https://kovic77.github.io/hradesin-voda/
export default defineConfig({
  site: 'https://kovic77.github.io',
  base: '/hradesin-voda',
  build: {
    // Jedna malá stránka: CSS rovnou do HTML, žádný další request.
    inlineStylesheets: 'always',
  },
  // Písmo se při buildu stáhne a hostuje se z našeho webu (žádné Google Fonts za běhu).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-brand',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
