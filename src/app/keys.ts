/**
 * Desktop keyboard shortcuts for the feed. Extras only: every action is a button too.
 *
 * `keyAction` is a pure mapper (unit-tested without a DOM); `installKeys` wires
 * it to `keydown` once and returns an uninstaller.
 */
import type { Tab } from './state';
import { app, currentServed, goTo, isSynthetic, showToast } from './state';
import { confirmRead, skipCard, toggleLike, toggleSave, tooHard } from '@/ui/actions';

export type KeyAction = 'next' | 'prev' | 'read' | 'like' | 'save' | 'skip' | 'hard' | 'help';

export interface KeyCtx {
  tab: Tab;
  sheetOpen: boolean;
  /** ctrl, meta or alt held (shift is allowed: `?` needs it) */
  modifier: boolean;
  /** focus is in an input, textarea, select or contenteditable */
  typing: boolean;
  /** focus is on a button or link: Enter and Space belong to it */
  onControl?: boolean;
}

const MAP: Record<string, KeyAction> = {
  j: 'next',
  ArrowDown: 'next',
  ' ': 'next',
  Spacebar: 'next',
  k: 'prev',
  ArrowUp: 'prev',
  Enter: 'read',
  l: 'like',
  s: 'save',
  x: 'skip',
  h: 'hard',
  '?': 'help',
};

export const KEYS_HELP = 'j/k move · Enter read · l like · s save · x skip · h over my head';

export function keyAction(key: string, ctx: KeyCtx): KeyAction | null {
  if (ctx.tab !== 'feed' || ctx.sheetOpen || ctx.modifier || ctx.typing) return null;
  if (ctx.onControl && (key === 'Enter' || key === ' ' || key === 'Spacebar')) return null;
  return Object.prototype.hasOwnProperty.call(MAP, key) ? MAP[key] : null;
}

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.closest !== 'function') return false;
  if (el.isContentEditable) return true;
  return Boolean(el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'));
}

function isControl(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return Boolean(el && typeof el.closest === 'function' && el.closest('button, a[href], summary, [role="button"]'));
}

/** Toggles should not machine-gun when a key is held; moving may. */
const REPEATABLE = new Set<KeyAction>(['next', 'prev']);

export function runKeyAction(action: KeyAction): boolean {
  if (action === 'next') {
    goTo(Math.min(app.cursor + 1, Math.max(0, app.feed.length - 1)));
    return true;
  }
  if (action === 'prev') {
    goTo(Math.max(0, app.cursor - 1));
    return true;
  }
  if (action === 'help') {
    showToast(KEYS_HELP, undefined, 6000);
    return true;
  }
  const served = currentServed();
  if (!served || isSynthetic(served.id) || served.slot === 'wire' || served.wire) return false;
  const id = served.id;
  if (action === 'read') confirmRead(id);
  else if (action === 'like') toggleLike(id);
  else if (action === 'save') toggleSave(id);
  else if (action === 'skip') skipCard(id);
  else if (action === 'hard') tooHard(id);
  return true;
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.defaultPrevented || e.isComposing) return;
  const action = keyAction(e.key, {
    tab: app.tab,
    sheetOpen: app.sheet !== null,
    modifier: e.ctrlKey || e.metaKey || e.altKey,
    typing: isTyping(e.target),
    onControl: isControl(e.target),
  });
  if (!action) return;
  if (e.repeat && !REPEATABLE.has(action)) {
    e.preventDefault();
    return;
  }
  if (runKeyAction(action)) e.preventDefault();
}

let installed: (() => void) | null = null;

/** Listen for shortcuts on the document. Idempotent; returns an uninstaller. */
export function installKeys(): () => void {
  if (installed) return installed;
  if (typeof document === 'undefined') return () => {};
  document.addEventListener('keydown', onKeyDown);
  installed = () => {
    document.removeEventListener('keydown', onKeyDown);
    installed = null;
  };
  return installed;
}
