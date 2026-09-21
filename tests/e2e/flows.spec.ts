/**
 * (e) the "too advanced" protocol end to end · (g) the ⋯ sheets ·
 * (j) a recall card that is actually due.
 */
import { expect, test } from '@playwright/test';
import {
  current,
  expectPersistedEvent,
  feed,
  goToIndex,
  meta,
  openApp,
  plan,
  prereqs,
  waitForFeed,
} from './helpers';

const DAY = 86_400_000;

test.describe('reader flows', () => {
  test('(e) "Over my head" promises groundwork and the feed delivers it', async ({ page }) => {
    await openApp(page);

    // A hard card whose topic has a prerequisite the reader has not learned and
    // that owns at least one easy, non-rigor card to backfill with.
    const target = await page.evaluate(() => {
      const api = (window as any).__cultivar;
      const st = api.state;
      const all = api.find({}).map((id: string) => api.meta(id)).filter(Boolean);
      const byTopic = new Map<string, any[]>();
      for (const m of all) {
        const list = byTopic.get(m.topic) ?? [];
        list.push(m);
        byTopic.set(m.topic, list);
      }
      for (const m of all) {
        if (m.difficulty < 3) continue;
        const gaps: string[] = api
          .prereqs(m.topic)
          .filter((p: string) => (st.topics[p]?.mastery ?? 0) < 0.35);
        const usable = gaps.some((g) =>
          (byTopic.get(g) ?? []).some((c: any) => c.difficulty <= 3 && c.layer !== 'rigor'),
        );
        if (usable) return m.id as string;
      }
      return undefined;
    });
    expect(target, 'a difficulty ≥ 3 card with an unlearned prerequisite').toBeTruthy();

    const flagged = await meta(page, target!);
    const flaggedPrereqs = await prereqs(page, flagged.topic);
    expect(flaggedPrereqs.length).toBeGreaterThan(0);

    await page.evaluate((id) => (window as any).__cultivar.jump(id), target!);
    await expect.poll(async () => (await current(page))?.id, { timeout: 15_000 }).toBe(target);

    await page.getByRole('button', { name: 'Too advanced', exact: true }).click();

    // The promise, in the reader's words.
    await expect(page.locator('.toast')).toContainText("Noted. I'll bring the groundwork first.");
    await expect(page.locator('.toast button')).toHaveText('Undo');
    await expectPersistedEvent(page, 'too_hard', target!);

    // The engine wrote the protocol down (ENGINE.md §9).
    const state = await page.evaluate(() => {
      const st = (window as any).__cultivar.state;
      return { backfill: st.backfill, revisit: st.revisit };
    });
    expect(state.backfill.length).toBeGreaterThan(0);
    expect(state.revisit.some((r: any) => r.card === target)).toBe(true);
    const backfillTopics: string[] = state.backfill.map((b: any) => b.topic);
    expect(backfillTopics.some((t) => flaggedPrereqs.includes(t))).toBe(true);

    // …and the groundwork shows up in the next few cards.
    await expect
      .poll(
        async () => {
          const upcoming = (await plan(page)).slice(0, 6);
          return upcoming.some((s) => s.slot === 'backfill');
        },
        { timeout: 15_000, message: 'a backfill slot within the next 6 cards' },
      )
      .toBe(true);

    const upcoming = (await plan(page)).slice(0, 6);
    const served = upcoming.find((s) => s.slot === 'backfill')!;
    const backfillCard = await meta(page, served.id);
    expect(flaggedPrereqs, 'the groundwork is a prerequisite of what was flagged').toContain(backfillCard.topic);
    expect(backfillCard.difficulty).toBeLessThanOrEqual(3);
    expect(backfillCard.layer).not.toBe('rigor');
    expect(served.why.join(' ')).toMatch(/Groundwork/i);

    // And the reader can see the promise on the card itself.
    const at = (await plan(page)).findIndex((s) => s.slot === 'backfill');
    const cursor = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    await goToIndex(page, cursor + at);
    await expect(page.locator(`.feed-section[data-i="${cursor + at}"] .chip`).filter({ hasText: 'Groundwork' })).toBeVisible();

    const beforeCredit = await page.evaluate((topic) =>
      (window as any).__cultivar.state.backfill.find((b: any) => b.topic === topic)?.served ?? 0,
      backfillCard.topic,
    );
    await page.getByRole('button', { name: 'Mark as read and go to the next card' }).click();
    const read = await expectPersistedEvent(page, 'view', served.id);
    expect(read.data).toMatchObject({ confirmed: true, slot: 'backfill' });
    await expect.poll(async () => page.evaluate((topic) =>
      (window as any).__cultivar.state.backfill.find((b: any) => b.topic === topic)?.served ?? 0,
      backfillCard.topic,
    )).toBe(beforeCredit + 1);
  });

  test('(g) ⋯ asks a question and explains the card', async ({ page }) => {
    await openApp(page);
    const served = await current(page);

    // "I have a question"
    await page.getByRole('button', { name: 'More actions', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /I have a question/ }).click();

    const box = page.locator('textarea.field');
    await expect(box).toBeFocused();
    await box.fill('why does the peak happen exactly at interpolation?');
    await page.getByRole('button', { name: 'Send it' }).click();

    await expect(page.locator('.toast')).toContainText(/Saved\./);
    const ev = await expectPersistedEvent(page, 'question', served!.id);
    expect((ev.data as any).text).toContain('interpolation');
    await expect
      .poll(async () => page.evaluate(() => ((window as any).__cultivar.state.questions ?? []).length))
      .toBeGreaterThan(0);

    // "Why this card?"
    await page.getByRole('button', { name: 'More actions', exact: true }).click();
    await page.getByRole('button', { name: /Why this card/ }).click();
    const sheet = page.getByRole('dialog', { name: 'Why this card?' });
    await expect(sheet).toBeVisible();
    await expect(sheet.locator('.why-list li').first()).toBeVisible();
    const reasons = await sheet.locator('.why-list li').allInnerTexts();
    expect(reasons.length).toBeGreaterThanOrEqual(1);
    expect(reasons[0].length).toBeGreaterThan(3);
    // It also names the topic and links into the map.
    await expect(sheet.getByText(/% mastery/)).toBeVisible();
    await expect(sheet.getByRole('button', { name: /See it in the map/ })).toBeVisible();
  });

  test('(j) a due recall card appears and grading records the event', async ({ page }) => {
    await openApp(page);

    // Seed a reading session three days ago over recall-capable cards, so FSRS
    // has them due (first due = first view + 20 h).
    const seeded = await page.evaluate(async () => {
      const api = (window as any).__cultivar;
      const ids: string[] = api
        .find({ hasRecall: true })
        .filter((id: string) => {
          const m = api.meta(id);
          return m && m.format !== 'recall' && m.language === 'en';
        })
        .slice(0, 8);
      const base = Date.now() - 3 * 86_400_000;
      const mk = (t: number, type: string, card?: string, data?: unknown) => ({
        id: `${t.toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        t,
        type,
        s: 'seed-1',
        ...(card ? { card } : {}),
        ...(data ? { data } : {}),
      });
      const events: any[] = [mk(base, 'session_start')];
      ids.forEach((id, i) => {
        const t = base + (i + 1) * 90_000;
        events.push(mk(t, 'view', id, { dwellMs: 70_000, readFraction: 0.95, slot: 'progress' }));
      });
      events.push(mk(base + 20 * 60_000, 'session_end', undefined, { minutes: 16, cards: ids.length }));
      await api.seed(events);
      return ids;
    });
    expect(seeded.length).toBeGreaterThan(3);

    // Reload: the engine replays the log and the schedule is real.
    await page.reload();
    await waitForFeed(page);

    const due = await page.evaluate(() => {
      const st = (window as any).__cultivar.state;
      const now = Date.now();
      return Object.entries(st.fsrs ?? {}).filter(([, f]: any) => f.due <= now).length;
    });
    expect(due, 'seeded cards are due for recall').toBeGreaterThan(0);

    // A recall slot is planned (§10.1: first one at position 3–5 of a daily session).
    await expect
      .poll(async () => (await plan(page)).findIndex((s) => s.slot === 'recall'), {
        timeout: 15_000,
        message: 'a recall slot in the plan',
      })
      .toBeGreaterThan(-1);

    const cursor = await page.evaluate(() => (window as any).__cultivar.cursor as number);
    const index = cursor + (await plan(page)).findIndex((s) => s.slot === 'recall');
    // Read the id before moving: scrolling re-bases the plan on the new cursor.
    const servedId = (await feed(page))[index].id;
    await goToIndex(page, index);

    const card = page.locator(`.feed-section[data-i="${index}"] .card.is-recall`);
    await expect(card).toBeVisible();
    await expect(card.locator('.chip').filter({ hasText: 'Quick one' })).toBeVisible();
    await expect(card.locator('.recall-q')).toBeVisible();

    const options = card.locator('.recall-opt');
    if (await options.count()) {
      await options.first().click();
      // Every option explains itself once answered.
      await expect(card.locator('.recall-why').first()).toBeVisible();
    } else {
      await card.getByRole('button', { name: 'Show answer' }).click();
      await card.getByRole('button', { name: 'Got it' }).click();
    }

    const ev = await expectPersistedEvent(page, 'recall', servedId);
    expect([1, 2, 3, 4]).toContain((ev.data as any).grade);
    await expect(card.getByRole('button', { name: 'Keep reading' })).toBeVisible();
  });
});
