/**
 * End-to-end tests run against the *built* app served by `vite preview`, which
 * is the only way to exercise the service worker, the precache and offline.
 *
 * One project: a touch-enabled Pixel 7. Cultivar is a phone app; a desktop run
 * would test a layout nobody uses.
 */
import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const BASE = `http://localhost:${PORT}/cultivar/`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: BASE,
    ...devices['Pixel 7'],
    // Service workers are the point of half these tests.
    serviceWorkers: 'allow',
    trace: 'retain-on-failure',
    video: 'off',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [{ name: 'pixel-7', use: { ...devices['Pixel 7'] } }],
  webServer: {
    // `vite build` only — the app bundle is what these tests are about, and
    // re-running the content validator here would make the suite fail whenever
    // a card is mid-edit. Run `npm run build:content` when content changes.
    command: `npx vite build && npx vite preview --port ${PORT} --strictPort`,
    url: BASE,
    // Never reuse: a server left over from an earlier run would quietly serve a
    // stale dist, and these tests exist to catch exactly that kind of lie.
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
