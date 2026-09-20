/** (h) the Map · (i) the You tab, backup and sync settings. */
import { expect, test } from '@playwright/test';
import { openApp, storedEvents } from './helpers';

test.describe('the other three tabs', () => {
  test('(h) the map goes domains → graph → topic sheet → focus', async ({ page }) => {
    await openApp(page);
    await page.getByRole('tab', { name: 'Map' }).click();

    // Level 1: eleven domains, each with a mastery bar and a count.
    const tiles = page.locator('.domain-tile');
    await expect(tiles).toHaveCount(11);
    await expect(tiles.first().locator('.bar')).toBeVisible();
    await expect(tiles.first().locator('.glyph')).toBeVisible();
    await expect(tiles.filter({ hasText: 'Mathematics' })).toHaveCount(1);

    // Level 2: the prerequisite graph.
    await tiles.filter({ hasText: 'Mathematics' }).click();
    const graph = page.locator('svg[role="application"]');
    await expect(graph).toBeVisible();
    await expect(graph).toHaveAttribute('aria-label', /prerequisite map/);
    const nodes = graph.locator('.node-box');
    await expect(nodes.first()).toBeVisible();
    expect(await nodes.count()).toBeGreaterThan(5);
    await expect(page.locator('.map-legend')).toBeVisible();

    // Panning still works (the pointer is captured only once it is a real drag).
    const readTransform = () => graph.locator('g').first().getAttribute('transform');
    const before = await readTransform();
    const gb = (await graph.boundingBox())!;
    await page.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2);
    await page.mouse.down();
    await page.mouse.move(gb.x + gb.width / 2 - 70, gb.y + gb.height / 2, { steps: 6 });
    await page.mouse.up();
    expect(await readTransform(), 'the graph pans').not.toBe(before);

    // A node opens the topic sheet — a tap and a click both have to work.
    await nodes.first().click();
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeVisible();
    await expect(sheet.getByText(/% ·|mastery|Locked|cards/i).first()).toBeVisible();
    const explore = sheet.getByRole('button', { name: /Explore this/ });
    await expect(explore).toBeVisible();

    // "Explore this" sets the focus and returns to the feed.
    await explore.click();
    await expect.poll(async () => page.evaluate(() => (window as any).__cultivar.tab)).toBe('feed');
    await expect
      .poll(async () => page.evaluate(() => (window as any).__cultivar.state?.focus ?? null))
      .not.toBeNull();
    expect((await storedEvents(page)).some((e) => e.type === 'focus')).toBe(true);

    // Back out of the graph.
    await page.getByRole('tab', { name: 'Map' }).click();
    await page.getByRole('button', { name: 'Back to domains' }).click();
    await expect(page.locator('.domain-tile')).toHaveCount(11);
  });

  test('(i) You shows the streak, the goal ring, charts and settings', async ({ page }) => {
    await openApp(page);
    await page.getByRole('tab', { name: 'You' }).click();

    await expect(page.getByRole('heading', { name: 'You' })).toBeVisible();
    await expect(page.locator('.streak-head')).toBeVisible();
    await expect(page.locator('.streak-num')).toBeVisible();
    // The goal ring lives on the You tab button.
    await expect(page.locator('[data-tab="you"] svg').first()).toBeVisible();
    await expect(page.locator('.chart, .spark, svg').first()).toBeVisible();

    // Settings are on the same screen.
    await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset all local data' })).toBeVisible();
  });

  test('(i) Export downloads a backup and Sync Test without a token says why', async ({ page }) => {
    await openApp(page);
    // Make sure there is at least one event worth exporting.
    await page.getByRole('button', { name: 'Like', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Liked', exact: true })).toBeVisible();

    await page.getByRole('tab', { name: 'You' }).click();

    const download = page.waitForEvent('download', { timeout: 20_000 });
    await page.getByRole('button', { name: 'Export' }).click();
    const file = await download;
    expect(file.suggestedFilename()).toMatch(/^cultivar-backup-\d{4}-\d{2}-\d{2}\.json$/);
    const path = await file.path();
    expect(path).toBeTruthy();

    // Sync with no token: a clear message, never a silent failure.
    const test = page.getByRole('button', { name: /^Test(ing…)?$/ });
    await expect(test).toBeVisible();
    await test.click();
    const status = page.locator('.status-line');
    await expect(status).toBeVisible();
    await expect(status).not.toHaveText('');
    await expect(status).toContainText(/token|sign in|not available|no sync|fail|denied|unauthor/i, {
      timeout: 15_000,
    });
  });
});
