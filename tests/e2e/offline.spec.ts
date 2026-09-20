/** (b) manifest, service worker, and a feed that still reads with the network off. */
import { expect, test } from '@playwright/test';
import { openApp, waitForFeed, waitForServiceWorker } from './helpers';

test.describe('installable and offline', () => {
  test('(b) the manifest and the service worker are real', async ({ page }) => {
    await openApp(page);

    const href = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(href, 'a manifest link in the document').toBeTruthy();

    const manifest = await page.evaluate(async (url) => {
      const res = await fetch(url!);
      return res.ok ? ((await res.json()) as Record<string, unknown>) : null;
    }, href);
    expect(manifest).toBeTruthy();
    expect(manifest!.name).toBe('Cultivar');
    expect(manifest!.display).toBe('standalone');
    expect(manifest!.start_url).toBe('/cultivar/');
    const icons = manifest!.icons as { sizes: string; purpose?: string }[];
    expect(icons.some((i) => i.sizes === '192x192')).toBe(true);
    expect(icons.some((i) => i.sizes === '512x512')).toBe(true);
    expect(icons.some((i) => (i.purpose ?? '').includes('maskable'))).toBe(true);

    // iOS bits the spec asks for.
    await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);

    expect(await waitForServiceWorker(page), 'a service worker controls the page').toBe(true);
  });

  test('(b) offline: the feed still reads from the cache', async ({ page, context }) => {
    await openApp(page);
    expect(await waitForServiceWorker(page)).toBe(true);

    // Read a couple of cards so their shards are fetched and cached.
    await page.waitForTimeout(1500);
    const before = await page.locator('.card-title').first().innerText();
    expect(before.length).toBeGreaterThan(0);

    // Let the service worker finish precaching before pulling the plug.
    await expect
      .poll(
        async () =>
          page.evaluate(async () => {
            const names = await caches.keys();
            let n = 0;
            for (const name of names) n += (await (await caches.open(name)).keys()).length;
            return n;
          }),
        { timeout: 60_000, message: 'precache to fill' },
      )
      .toBeGreaterThan(30);

    await context.setOffline(true);
    await page.reload();
    await waitForFeed(page);

    const title = await page.locator('.card-title').first().innerText();
    expect(title.length).toBeGreaterThan(0);
    // A real card body, not the "not in the library yet" placeholder.
    await expect(page.locator('.feed-section').first().locator('.card-body')).not.toContainText(
      'not in the library yet',
    );
    await expect(page.locator('.empty')).toHaveCount(0);

    // The map and the saved list work offline too.
    await page.getByRole('tab', { name: 'Map' }).click();
    await expect(page.locator('.domain-tile')).toHaveCount(11);

    await context.setOffline(false);
  });
});
