import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.BASE_PATH ?? '/cultivar/';
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as { version: string };

const BG = '#0e1014';

/**
 * The app reads priors and the taxonomy from `public/content/`. The content build
 * (scripts/build-content.mjs) writes taxonomy/index/cards there; priors are authored
 * in `content/priors.json`, so copy them across on every build and dev boot.
 */
function copyContentAssets(): Plugin {
  const copyIfNewer = (from: string, to: string) => {
    if (!existsSync(from)) return;
    if (existsSync(to) && statSync(to).mtimeMs >= statSync(from).mtimeMs) return;
    copyFileSync(from, to);
  };
  const run = () => {
    const out = path.join(root, 'public', 'content');
    mkdirSync(out, { recursive: true });
    copyIfNewer(path.join(root, 'content', 'priors.json'), path.join(out, 'priors.json'));
    // The content build owns taxonomy.json; seed it so the app works before that build runs.
    copyIfNewer(path.join(root, 'content', 'taxonomy.json'), path.join(out, 'taxonomy.json'));
  };
  return { name: 'cultivar:copy-content', buildStart: run, configureServer: run };
}

export default defineConfig({
  base,
  plugins: [
    copyContentAssets(),
    preact(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png', 'robots.txt'],
      manifest: {
        id: base,
        name: 'Cultivar',
        short_name: 'Cultivar',
        description: 'A personal infinite feed of ideas worth keeping.',
        lang: 'en',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: BG,
        theme_color: BG,
        categories: ['education', 'books'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}', 'content/**/*.json'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            // Wire items (data/inbox/*.json) live in the private data repo.
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cultivar-wire',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 64, maxAgeSeconds: 6 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Sync writes must never be served from a cache.
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: { '@': path.join(root, 'src') },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    target: 'es2020',
    cssTarget: 'safari15',
    sourcemap: false,
    reportCompressedSize: true,
  },
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  // Vitest owns tests/**; tests/e2e is Playwright's (see playwright.config.ts).
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'tests/e2e/**'],
  },
});
