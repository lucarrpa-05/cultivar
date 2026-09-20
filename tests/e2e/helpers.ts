/**
 * Shared helpers for the end-to-end suite: booting the app, reading the debug
 * hook, and looking into IndexedDB the way the store wrote it.
 */
import { expect, type Page } from '@playwright/test';
import type { CardId, Event, ServedCard } from '../../src/types';

/** The debug surface installed by `src/app/debug.ts` when `?debug=1` is present. */
export const DEBUG_URL = './?debug=1';

export async function openApp(page: Page, url: string = DEBUG_URL): Promise<void> {
  await page.goto(url);
  await waitForFeed(page);
}

/** The feed is up when a real card with a title is on screen. */
export async function waitForFeed(page: Page): Promise<void> {
  await expect(page.locator('.feed .feed-section').first()).toBeVisible({ timeout: 30_000 });
  await expect(page.locator('.card-title').first()).toBeVisible({ timeout: 30_000 });
}

export async function plan(page: Page): Promise<ServedCard[]> {
  return page.evaluate(() => (window as any).__cultivar.plan as ServedCard[]);
}

export async function feed(page: Page): Promise<ServedCard[]> {
  return page.evaluate(() => (window as any).__cultivar.feed as ServedCard[]);
}

export async function current(page: Page): Promise<ServedCard | undefined> {
  return page.evaluate(() => (window as any).__cultivar.current as ServedCard | undefined);
}

export async function meta(page: Page, id: CardId): Promise<any> {
  return page.evaluate((cardId) => (window as any).__cultivar.meta(cardId), id);
}

export async function prereqs(page: Page, topic: string): Promise<string[]> {
  return page.evaluate((t) => (window as any).__cultivar.prereqs(t) as string[], topic);
}

/**
 * Every event the store has persisted. Read through the app's own store so the
 * test does not have to know the IndexedDB schema — and then cross-checked
 * against the raw object store in `expectPersistedEvent`.
 */
export async function storedEvents(page: Page): Promise<Event[]> {
  return page.evaluate(async () => ((await (window as any).__cultivar.events()) ?? []) as Event[]);
}

/** Reads the `events` object store straight out of IndexedDB. */
export async function rawIdbEvents(page: Page): Promise<Event[]> {
  return page.evaluate(async () => {
    const dbs = (await (indexedDB as any).databases?.()) ?? [];
    const names: string[] = dbs.map((d: any) => d.name).filter(Boolean);
    for (const name of names) {
      const out = await new Promise<Event[] | null>((resolve) => {
        const req = indexedDB.open(name);
        req.onerror = () => resolve(null);
        req.onsuccess = () => {
          const db = req.result;
          if (!Array.from(db.objectStoreNames).includes('events')) {
            db.close();
            resolve(null);
            return;
          }
          const tx = db.transaction('events', 'readonly');
          const all = tx.objectStore('events').getAll();
          all.onsuccess = () => {
            db.close();
            resolve(all.result as Event[]);
          };
          all.onerror = () => {
            db.close();
            resolve(null);
          };
        };
      });
      if (out) return out;
    }
    return [];
  });
}

/** Waits until an event of `type` (optionally for `card`) is in IndexedDB. */
export async function expectPersistedEvent(page: Page, type: string, card?: CardId): Promise<Event> {
  let found: Event | undefined;
  await expect
    .poll(
      async () => {
        const events = await rawIdbEvents(page);
        found = events.find((e) => e.type === type && (!card || e.card === card));
        return Boolean(found);
      },
      { timeout: 10_000, message: `no persisted "${type}" event${card ? ` for ${card}` : ''}` },
    )
    .toBe(true);
  return found as Event;
}

/** Scroll the feed to a given index and wait for the engine to follow. */
export async function goToIndex(page: Page, index: number): Promise<void> {
  await page.evaluate((i) => {
    const root = document.querySelector('.feed');
    const el = root?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, index);
  await expect.poll(async () => page.evaluate(() => (window as any).__cultivar.cursor), { timeout: 10_000 }).toBe(index);
}

/** Move forward one card the way a reader does, and wait for the cursor. */
export async function advance(page: Page): Promise<number> {
  const at = await page.evaluate(() => (window as any).__cultivar.cursor as number);
  await goToIndex(page, at + 1);
  return at + 1;
}

/** Dismiss the update pill if a stale service worker offers one. */
export async function dismissUpdatePill(page: Page): Promise<void> {
  const pill = page.locator('.update-pill');
  if (await pill.isVisible().catch(() => false)) {
    const later = pill.getByRole('button', { name: /later|dismiss|close/i });
    if (await later.count()) await later.first().click();
  }
}

export async function waitForServiceWorker(page: Page): Promise<boolean> {
  return page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg?.active) return true;
    const ready = await Promise.race([
      navigator.serviceWorker.ready.then(() => true),
      new Promise<boolean>((r) => setTimeout(() => r(false), 15_000)),
    ]);
    return ready;
  });
}
