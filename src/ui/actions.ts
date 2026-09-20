/** Every card action in one place, so the rail, the gestures and the sheets agree. */
import type { CardId } from '@/types';
import {
  app,
  closeSheet,
  goTo,
  markRead,
  openSheet,
  reactWithUndo,
  record,
  showToast,
} from '@/app/state';
import { cardMeta } from '@/content/loader';
import { topicName } from './domain';
import { bookmarkFly, heartBurst } from './anim';

export function isLiked(id: CardId): boolean {
  return Boolean(app.engineState?.seen[id]?.liked);
}

export function isSaved(id: CardId): boolean {
  return Boolean(app.engineState?.saved.includes(id) || app.engineState?.seen[id]?.saved);
}

export function toggleLike(id: CardId, host?: HTMLElement | null, x?: number, y?: number): void {
  if (isLiked(id)) {
    void record('unlike', { card: id });
    return;
  }
  void markRead(id);
  void record('like', { card: id });
  if (host && x !== undefined && y !== undefined) heartBurst(host, x, y);
}

export function toggleSave(id: CardId, x?: number, y?: number): void {
  if (isSaved(id)) {
    void record('unsave', { card: id });
    showToast('Removed from saved.');
    return;
  }
  void markRead(id);
  void record('save', { card: id });
  if (x !== undefined && y !== undefined) bookmarkFly(x, y);
}

function advance(): void {
  goTo(app.cursor + 1);
}

/** The Read button: the only way a merely displayed card becomes "read". Then move on. */
export function confirmRead(id: CardId): void {
  void markRead(id);
  advance();
}

export function skipCard(id: CardId): void {
  void reactWithUndo('skip', id, 'Noted. Less like that.');
  advance();
}

export function tooHard(id: CardId): void {
  void reactWithUndo('too_hard', id, "Noted. I'll bring the groundwork first.");
  advance();
}

export function tooEasy(id: CardId): void {
  const topic = cardMeta(id)?.topic;
  void reactWithUndo('too_easy', id, `Got it. Turning it up a notch in ${topic ? topicName(topic) : 'this topic'}.`);
  advance();
}

export function openRigor(id: CardId): void {
  void markRead(id);
  void record('rigor_open', { card: id, quiet: true });
}

export function openSource(id: CardId, url: string): void {
  void markRead(id);
  void record('source_open', { card: id, data: { url }, quiet: true });
}

export function askSeriesNext(id: CardId): void {
  void markRead(id);
  void record('series_next', { card: id });
  advance();
}

export function askQuestion(id: CardId, text: string): void {
  const trimmed = text.trim().slice(0, 240);
  if (!trimmed) return;
  void record('question', { card: id, data: { text: trimmed } });
  closeSheet();
  showToast('Saved. Your next refresh will answer it as a card.');
}

export function gradeRecall(id: CardId, grade: 1 | 2 | 3 | 4, correct?: boolean): void {
  void markRead(id);
  void record('recall', { card: id, data: correct === undefined ? { grade } : { grade, correct } });
}

export function wireAction(wireId: string, action: 'view' | 'like' | 'skip' | 'open', card?: CardId): void {
  void record('wire', { card, data: { wire: wireId, action }, quiet: action === 'view' });
}

export function showWhy(id: CardId): void {
  openSheet({ kind: 'why', card: id });
}

/** The public repo, derived from the Pages URL (owner.github.io/repo/). */
export function publicRepoUrl(): string {
  const host = location.hostname;
  const owner = host.endsWith('.github.io') ? host.split('.')[0] : 'cultivar';
  const repo = location.pathname.split('/').filter(Boolean)[0] ?? 'cultivar';
  return `https://github.com/${owner}/${repo}`;
}

export function cardLink(id: CardId): string {
  return `${location.origin}${location.pathname}#card=${encodeURIComponent(id)}`;
}

export async function copyLink(id: CardId): Promise<void> {
  const link = cardLink(id);
  try {
    await navigator.clipboard.writeText(link);
    showToast('Link copied.');
  } catch {
    showToast(link);
  }
  closeSheet();
}

export function reportError(id: CardId): void {
  const title = encodeURIComponent(`Error in card ${id}`);
  const body = encodeURIComponent(`Card: ${id}\nWhat looks wrong:\n\n`);
  open(`${publicRepoUrl()}/issues/new?title=${title}&body=${body}`, '_blank', 'noopener');
  closeSheet();
}
