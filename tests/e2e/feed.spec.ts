/**
 * (a) first load · (c) the rigor gate and KaTeX · (d) like / save / skip ·
 * (f) gestures · (k) the update pill never blocks reading.
 */
import { expect, test } from '@playwright/test';
import {
  advance,
  current,
  expectPersistedEvent,
  meta,
  openApp,
  plan,
  rawIdbEvents,
  storedEvents,
} from './helpers';

test.describe('the feed', () => {
  test('(a) first load shows a real card: title, domain chip, action rail', async ({ page }) => {
    await openApp(page);

    const card = page.locator('.feed-section').first().locator('.card');
    await expect(card).toBeVisible();
    await expect(card.locator('.card-title')).toBeVisible();
    await expect(await card.locator('.card-title').innerText()).not.toBe('');
    await expect(card.locator('.chip-domain')).toBeVisible();

    // The action rail is the thumb zone: four actions plus ⋯.
    for (const name of ['Like', 'Save', 'Not for me', 'Too advanced', 'More actions']) {
      await expect(page.getByRole('button', { name, exact: true })).toBeVisible();
    }

    // Cold start (ENGINE.md §13): an `open` slot, a math card, never a recall.
    const served = await current(page);
    expect(served).toBeTruthy();
    expect(served!.slot).toBe('open');
    expect(served!.slot).not.toBe('recall');

    const m = await meta(page, served!.id);
    expect(m.domain).toBe('math');
    expect(m.format).not.toBe('recall');
    expect(m.weight).not.toBe('heavy');

    // And the plan is a real plan, not one card.
    expect((await plan(page)).length).toBeGreaterThan(3);

    // A deliberate read must preserve the planner's slot in the durable log.
    // Without this, the fold silently treats every card as `progress` and
    // groundwork, recall and session pacing cannot complete correctly.
    await page.getByRole('button', { name: 'Mark as read and go to the next card' }).click();
    const read = await expectPersistedEvent(page, 'view', served!.id);
    expect(read.data).toMatchObject({ confirmed: true, slot: served!.slot });
    await expect.poll(async () => page.evaluate(() => (window as any).__cultivar.state.session.slots.open)).toBe(1);
  });

  test('(c) the rigor gate opens after dwell and renders KaTeX', async ({ page }) => {
    await openApp(page);

    // Pick the shortest math card that has a rigor layer: the gate is
    // max(6 s, 0.4 x expected read), so a short body keeps this test honest
    // about the real timer without waiting half a minute for it.
    const target = await page.evaluate(() => {
      const api = (window as any).__cultivar;
      const ids: string[] = api.find({ domain: 'math', hasRigor: true });
      const metas = ids.map((id) => api.meta(id)).filter(Boolean);
      metas.sort((a: any, b: any) => (a.words?.body ?? 999) - (b.words?.body ?? 999));
      return metas[0]?.id as string | undefined;
    });
    expect(target, 'a math card with a rigor layer').toBeTruthy();

    await page.evaluate((id) => (window as any).__cultivar.jump(id), target!);
    await expect.poll(async () => (await current(page))?.id, { timeout: 15_000 }).toBe(target);

    // Scope to the section the reader is actually on: earlier cards have rigor
    // buttons of their own and `.first()` would quietly test the wrong card.
    const at = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    const button = page.locator(`.feed-section[data-i="${at}"] .rigor-btn`);
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/is-locked/);
    await expect(button).toHaveAttribute('aria-disabled', 'true');

    // Locked: tapping nudges instead of opening. Read the state and click in the
    // same tick — the gate is a live timer and would otherwise race the assert.
    // (A direct .click() because Playwright treats aria-disabled as unclickable;
    // a real reader can and should be able to tap it.)
    const wasLocked = await page.evaluate((sel) => {
      const btn = document.querySelector(sel) as HTMLButtonElement | null;
      if (!btn) return false;
      const locked = btn.classList.contains('is-locked');
      btn.click();
      return locked;
    }, `.feed-section[data-i="${at}"] .rigor-btn`);
    expect(wasLocked, 'the rigor button starts locked').toBe(true);
    await expect(page.locator(`.feed-section[data-i="${at}"] .rigor-hint`)).toBeVisible();
    await expect(page.locator(`.feed-section[data-i="${at}"] .rigor-panel`)).toHaveCount(0);

    // Wait the gate out, then it opens for real.
    await expect(button).not.toHaveClass(/is-locked/, { timeout: 40_000 });
    await button.click();

    const panel = page.locator(`.feed-section[data-i="${at}"] .rigor-panel`);
    await expect(panel).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    // KaTeX is a lazy chunk: it has to load and render before anything is math.
    await expect(panel.locator('.katex').first()).toBeVisible({ timeout: 20_000 });

    await expectPersistedEvent(page, 'rigor_open', target!);
  });

  test('(d) like records an event, save reaches the Saved tab, skip advances', async ({ page }) => {
    await openApp(page);
    const first = await current(page);
    expect(first).toBeTruthy();

    // Like ──────────────────────────────────────────────────────────────────
    const like = page.getByRole('button', { name: 'Like', exact: true });
    await like.click();
    await expect(page.getByRole('button', { name: 'Liked', exact: true })).toBeVisible();
    const liked = await expectPersistedEvent(page, 'like', first!.id);
    expect(liked.card).toBe(first!.id);
    // The heart burst is a real element while it animates.
    expect(await page.locator('.burst, .rail-btn.is-on').count()).toBeGreaterThan(0);

    // Save ──────────────────────────────────────────────────────────────────
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Saved', exact: true })).toBeVisible();
    await expectPersistedEvent(page, 'save', first!.id);

    const title = await meta(page, first!.id).then((m) => m.title as string);
    await page.getByRole('tab', { name: /saved/i }).click();
    await expect(page.locator('.saved, .screen').first()).toBeVisible();
    await expect(page.getByText(title, { exact: false }).first()).toBeVisible();

    // Skip ──────────────────────────────────────────────────────────────────
    await page.getByRole('tab', { name: /feed/i }).click();
    const before = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    await page.getByRole('button', { name: 'Not for me', exact: true }).click();
    await expect(page.locator('.toast')).toContainText(/less like that/i);
    await expect
      .poll(async () => page.evaluate(() => (window as any).__cultivar.cursor as number), { timeout: 10_000 })
      .toBeGreaterThan(before);
    await expectPersistedEvent(page, 'skip', first!.id);
  });

  test('(f) double tap likes and a horizontal drag saves', async ({ page }) => {
    await openApp(page);
    const served = await current(page);
    const box = await page.locator('.feed-section').first().locator('.card-body').boundingBox();
    expect(box).toBeTruthy();
    const cx = box!.x + box!.width / 2;
    const cy = box!.y + box!.height / 2;

    // Double tap = like.
    await page.touchscreen.tap(cx, cy);
    await page.waitForTimeout(60);
    await page.touchscreen.tap(cx, cy);
    await expect(page.getByRole('button', { name: 'Liked', exact: true })).toBeVisible();
    await expectPersistedEvent(page, 'like', served!.id);

    // Horizontal drag right past 35% of the width = save.
    const width = page.viewportSize()!.width;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    for (let x = cx; x <= cx + width * 0.55; x += 24) {
      await page.mouse.move(x, cy, { steps: 2 });
    }
    await page.mouse.up();

    await expect(page.getByRole('button', { name: 'Saved', exact: true })).toBeVisible({ timeout: 10_000 });
    await expectPersistedEvent(page, 'save', served!.id);

    // A short drag snaps back; a full drag left skips and moves to the next card.
    const at = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - width * 0.2, cy, { steps: 8 });
    await page.mouse.up();
    expect(await page.evaluate(() => (window as any).__cultivar.cursor)).toBe(at);
    expect((await rawIdbEvents(page)).some((e) => e.type === 'skip' && e.card === served!.id)).toBe(false);

    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - width * 0.55, cy, { steps: 12 });
    await page.mouse.up();
    await expect.poll(async () => page.evaluate(() => (window as any).__cultivar.cursor)).toBeGreaterThan(at);
    await expectPersistedEvent(page, 'skip', served!.id);
  });

  test('(k) the update pill never blocks the feed', async ({ page }) => {
    await openApp(page);
    const pill = page.locator('.update-pill');
    // It may or may not be offered; either way reading continues.
    if (await pill.isVisible().catch(() => false)) {
      await expect(pill).toContainText(/update/i);
    }
    const before = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    await advance(page);
    expect(await page.evaluate(() => (window as any).__cultivar.cursor as number)).toBeGreaterThan(before);
    // …and the events from that reading landed.
    const events = await rawIdbEvents(page);
    expect(events.length).toBeGreaterThan(0);
    expect((await storedEvents(page)).length).toBe(events.length);
  });
});
