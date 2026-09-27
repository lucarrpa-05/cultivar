/**
 * Share a card: as a 1080×1350 PNG (Web Share, else a download) or as plain text.
 *
 * The pure parts (Markdown → text, word wrap, layout) take an injected
 * `measure` so they run in tests without a canvas; only `renderCardImage`
 * touches the DOM, and it returns null when there is no 2D context.
 * Sharing records no engine event of its own; it only marks the card read.
 */
import type { Card, CardId } from '@/types';
import { app, closeSheet, markRead, showToast } from '@/app/state';
import { loadCard } from '@/content/loader';
import { cardLink } from './actions';
import { accentFor, domainInfo } from './domain';

// ── Markdown → plain text ──────────────────────────────────────────────────

const OPEN = '';
const CLOSE = '';

/** Markdown to readable plain text. Keeps TeX source, drops the dollars. */
export function stripMarkdown(md: string): string {
  const keep: string[] = [];
  const hold = (s: string) => `${OPEN}${keep.push(s) - 1}${CLOSE}`;

  let text = (md ?? '').replace(/\r\n?/g, '\n');

  // Code first, so `*` and `$` inside it survive untouched.
  text = text
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_m, code: string) => hold(code.replace(/\n+$/, '')))
    .replace(/`([^`\n]+)`/g, (_m, code: string) => hold(code));

  // Math: display on its own line, inline in place.
  text = text
    .replace(/[ \t]*\$\$([\s\S]+?)\$\$[ \t]*/g, (m: string, tex: string, at: number, all: string) => {
      const before = at === 0 || all[at - 1] === '\n' ? '' : '\n';
      const after = at + m.length >= all.length || all[at + m.length] === '\n' ? '' : '\n';
      return `${before}${hold(tex.trim().replace(/\s*\n\s*/g, ' '))}${after}`;
    })
    .replace(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g, (_m, tex: string) => hold(tex.trim()));

  text = text
    .replace(/<\/?[a-z][^>\n]*>/gi, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

  const lines = text.split('\n').map((line) => {
    let l = line.replace(/\s+$/, '');
    if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(l)) return '';
    l = l.replace(/^\s{0,3}#{1,6}\s+/, '').replace(/\s+#+\s*$/, '');
    while (/^\s*>\s?/.test(l)) l = l.replace(/^\s*>\s?/, '');
    l = l.replace(/^(\s*)[-*+]\s+/, (_m, ind: string) => `${ind}· `);
    return l;
  });
  text = lines.join('\n');

  text = text
    .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '$2')
    .replace(/\*(?=\S)([^*\n]*?\S)\*/g, '$1')
    .replace(/(^|[^\w])_(?=\S)([^_\n]*?\S)_(?!\w)/g, '$1$2')
    .replace(/~~(?=\S)([^~\n]*?\S)~~/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!$>])/g, '$1');

  text = text.replace(new RegExp(`${OPEN}(\\d+)${CLOSE}`, 'g'), (_m, i: string) => keep[Number(i)] ?? '');

  return text
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sourceLine(card: Card): string {
  const s = card.sources?.[0];
  if (!s) return '';
  return `Source: ${s.author ? `${s.author}, ${s.title}` : s.title}`;
}

/** The card as a message: title, hook, body, source, link. */
export function plainText(card: Card): string {
  const parts = [card.title.trim()];
  if (card.hook?.trim()) parts.push(card.hook.trim());
  const body = stripMarkdown(card.body);
  if (body) parts.push(body);
  const src = sourceLine(card);
  parts.push(src ? `${src}\n${cardLink(card.id)}` : cardLink(card.id));
  return parts.join('\n\n');
}

// ── wrapping ───────────────────────────────────────────────────────────────

export type Measure = (s: string) => number;

/** Hard-break a word that is wider than the line on its own. */
function breakWord(word: string, maxWidth: number, measure: Measure): string[] {
  const out: string[] = [];
  let cur = '';
  for (const ch of Array.from(word)) {
    if (cur && measure(cur + ch) > maxWidth) {
      out.push(cur);
      cur = ch;
    } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

/** Greedy word wrap. Each `\n` starts a new line; empty input lines stay empty. */
export function wrapLines(text: string, maxWidth: number, measure: Measure): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    const words = para.split(/\s+/).filter(Boolean);
    if (!words.length) {
      out.push('');
      continue;
    }
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (measure(candidate) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) out.push(line);
      if (measure(word) <= maxWidth) {
        line = word;
      } else {
        const pieces = breakWord(word, maxWidth, measure);
        out.push(...pieces.slice(0, -1));
        line = pieces[pieces.length - 1] ?? '';
      }
    }
    if (line) out.push(line);
  }
  return out;
}

/** Keep at most `max` lines; the last kept one ends in an ellipsis that fits. */
function clampLines(lines: string[], max: number, maxWidth: number, measure: Measure): string[] {
  if (lines.length <= max) return lines;
  const kept = lines.slice(0, max);
  let last = kept[max - 1].replace(/\s+$/, '');
  while (last && measure(`${last}…`) > maxWidth) last = last.slice(0, -1).replace(/\s+$/, '');
  kept[max - 1] = `${last}…`;
  return kept;
}

// ── layout ─────────────────────────────────────────────────────────────────

export const FONT_STACK = "-apple-system, 'Segoe UI', Roboto, sans-serif";
export const IMAGE_W = 1080;
export const IMAGE_H = 1350;
export const BAND_H = 14;

export type RunRole = 'domain' | 'title' | 'hook' | 'body' | 'more' | 'cta' | 'source' | 'wordmark' | 'label';
export type RunColor = 'fg' | 'muted' | 'dim' | 'accent';

export interface TextRun {
  text: string;
  role: RunRole;
  /** left edge, or right edge when `align` is 'right' */
  x: number;
  /** top of the line box */
  y: number;
  lineHeight: number;
  size: number;
  /** a CSS font shorthand, ready for `ctx.font` */
  font: string;
  color: RunColor;
  align: 'left' | 'right';
}

export interface LayoutOptions {
  /** width of `s` set in the CSS font `font` */
  measure: (s: string, font: string) => number;
  width?: number;
  height?: number;
  padX?: number;
  padTop?: number;
  padBottom?: number;
  titleSize?: number;
  hookSize?: number;
  bodySize?: number;
  smallSize?: number;
  /** "∑ Mathematics"; defaults to the taxonomy's glyph and name */
  domainLabel?: string;
}

export interface CardLayout {
  width: number;
  height: number;
  runs: TextRun[];
  truncated: boolean;
}

const FORMAT_LABEL: Partial<Record<Card['format'], string>> = {
  challenge: 'A puzzle',
  story: 'A story',
  quote: 'A quote',
};

export function formatLabel(card: Pick<Card, 'format'>): string {
  return FORMAT_LABEL[card.format] ?? '';
}

function defaultDomainLabel(card: Card): string {
  const d = domainInfo(card.domain);
  return d ? `${d.glyph} ${d.name}` : card.domain;
}

/** Positions every line of text on the image. Pure. */
export function layoutCard(card: Card, opts: LayoutOptions): CardLayout {
  const W = opts.width ?? IMAGE_W;
  const H = opts.height ?? IMAGE_H;
  const padX = opts.padX ?? 88;
  const padTop = opts.padTop ?? 72;
  const padBottom = opts.padBottom ?? 72;
  const sizes = {
    title: opts.titleSize ?? 60,
    hook: opts.hookSize ?? 38,
    body: opts.bodySize ?? 40,
    small: opts.smallSize ?? 30,
  };
  const lh = {
    title: Math.round(sizes.title * 1.25),
    hook: Math.round(sizes.hook * 1.35),
    body: Math.round(sizes.body * 1.45),
    small: Math.round(sizes.small * 1.35),
  };
  const fonts = {
    title: `bold ${sizes.title}px ${FONT_STACK}`,
    hook: `italic ${sizes.hook}px ${FONT_STACK}`,
    body: `${sizes.body}px ${FONT_STACK}`,
    small: `${sizes.small}px ${FONT_STACK}`,
    smallBold: `bold ${sizes.small}px ${FONT_STACK}`,
  };
  const innerW = W - padX * 2;
  const m = (font: string): Measure => (s) => opts.measure(s, font);
  const runs: TextRun[] = [];
  const push = (
    text: string,
    role: RunRole,
    y: number,
    kind: keyof typeof lh,
    font: string,
    color: RunColor,
    align: 'left' | 'right' = 'left',
  ) => {
    runs.push({
      text,
      role,
      x: align === 'right' ? W - padX : padX,
      y,
      lineHeight: lh[kind],
      size: sizes[kind],
      font,
      color,
      align,
    });
  };

  // Bottom block first, so the body knows where to stop.
  const footerTop = H - padBottom - lh.small;
  push('cultivar', 'wordmark', footerTop, 'small', fonts.smallBold, 'dim');
  const label = formatLabel(card);
  if (label) push(label, 'label', footerTop, 'small', fonts.small, 'dim', 'right');

  const src = sourceLine(card);
  const srcLines = src ? clampLines(wrapLines(src, innerW, m(fonts.small)), 2, innerW, m(fonts.small)) : [];
  const sourceTop = srcLines.length ? footerTop - 28 - srcLines.length * lh.small : footerTop;
  srcLines.forEach((line, i) => push(line, 'source', sourceTop + i * lh.small, 'small', fonts.small, 'muted'));
  const bodyLimit = sourceTop - 36;

  // Top: domain, title, hook. These always go in.
  let y = padTop;
  const domainLabel = opts.domainLabel ?? defaultDomainLabel(card);
  const [domainLine] = clampLines(wrapLines(domainLabel, innerW, m(fonts.smallBold)), 1, innerW, m(fonts.smallBold));
  push(domainLine ?? '', 'domain', y, 'small', fonts.smallBold, 'accent');
  y += lh.small + 44;

  const titleLines = clampLines(wrapLines(card.title.trim(), innerW, m(fonts.title)), 6, innerW, m(fonts.title));
  for (const line of titleLines) {
    push(line, 'title', y, 'title', fonts.title, 'fg');
    y += lh.title;
  }
  const hook = card.hook?.trim();
  if (hook) {
    y += 20;
    const hookLines = clampLines(wrapLines(hook, innerW, m(fonts.hook)), 5, innerW, m(fonts.hook));
    for (const line of hookLines) {
      push(line, 'hook', y, 'hook', fonts.hook, 'muted');
      y += lh.hook;
    }
  }
  y += 44;

  // Body: paragraphs until space runs out.
  const paraGap = Math.round(sizes.body * 0.55);
  const paragraphs = stripMarkdown(card.body)
    .split(/\n{2,}/)
    .map((p) => wrapLines(p, innerW, m(fonts.body)).filter((l) => l !== ''))
    .filter((p) => p.length);

  let total = 0;
  paragraphs.forEach((p, i) => (total += (i ? paraGap : 0) + p.length * lh.body));
  const truncated = y + total > bodyLimit;
  const limit = truncated ? bodyLimit - (paraGap + lh.body) - (12 + lh.small) : bodyLimit;

  let placed = 0;
  outer: for (const [pi, para] of paragraphs.entries()) {
    const gap = pi ? paraGap : 0;
    for (const [li, line] of para.entries()) {
      const top = y + (li === 0 ? gap : 0);
      if (top + lh.body > limit) break outer;
      push(line, 'body', top, 'body', fonts.body, 'fg');
      y = top + lh.body;
      placed++;
    }
  }

  if (truncated) {
    y += placed ? paraGap : 0;
    push('…', 'more', y, 'body', fonts.body, 'fg');
    y += lh.body + 12;
    push('Read the rest in Cultivar', 'cta', y, 'small', fonts.smallBold, 'accent');
  }

  return { width: W, height: H, runs, truncated };
}

// ── canvas ─────────────────────────────────────────────────────────────────

const DARK = { bg: '#0e1014', fg: '#e9edf3', muted: '#a0aab8', dim: '#7a8391', accent: '#5fd3a0' };

function palette(domain: string): Record<RunColor | 'bg', string> {
  let css: CSSStyleDeclaration | null = null;
  try {
    css = getComputedStyle(document.documentElement);
  } catch {
    css = null;
  }
  const read = (name: string, fallback: string) => css?.getPropertyValue(name).trim() || fallback;
  const accentVar = read('--accent', DARK.accent);
  const domainColor = accentFor(domain);
  return {
    bg: read('--bg', DARK.bg),
    fg: read('--fg', DARK.fg),
    muted: read('--fg-muted', DARK.muted),
    dim: read('--fg-dim', DARK.dim),
    accent: domainColor.startsWith('var(') ? accentVar : domainColor,
  };
}

function getContext(): CanvasRenderingContext2D | null {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    if (typeof canvas.getContext !== 'function') return null;
    canvas.width = IMAGE_W;
    canvas.height = IMAGE_H;
    return canvas.getContext('2d');
  } catch {
    return null;
  }
}

/** Paints the card at a fixed 1080×1350 and returns a PNG, or null without canvas. */
export async function renderCardImage(card: Card): Promise<Blob | null> {
  const ctx = getContext();
  if (!ctx || typeof ctx.canvas.toBlob !== 'function') return null;
  try {
    const colors = palette(card.domain);
    const measure = (s: string, font: string) => {
      ctx.font = font;
      return ctx.measureText(s).width;
    };
    const layout = layoutCard(card, { measure });

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, IMAGE_W, IMAGE_H);
    ctx.fillStyle = colors.accent;
    ctx.fillRect(0, 0, IMAGE_W, BAND_H);

    ctx.textBaseline = 'middle';
    for (const run of layout.runs) {
      ctx.font = run.font;
      ctx.fillStyle = colors[run.color];
      ctx.textAlign = run.align;
      ctx.fillText(run.text, run.x, run.y + run.lineHeight / 2);
    }

    return await new Promise<Blob | null>((resolve) => ctx.canvas.toBlob((b) => resolve(b), 'image/png'));
  } catch {
    return null;
  }
}

// ── actions ────────────────────────────────────────────────────────────────

async function getCard(id: CardId): Promise<Card | null> {
  const cached = app.cards[id];
  if (cached) return cached;
  try {
    return await loadCard(id);
  } catch {
    return null;
  }
}

function fileName(id: CardId): string {
  return `${id.replace(/[^\w.-]+/g, '-')}.png`;
}

function download(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function preview(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > 80 ? `${flat.slice(0, 80)}…` : flat;
}

/** Share as image: the system share sheet if it takes files, else a download. */
export async function shareCard(id: CardId): Promise<void> {
  closeSheet();
  const card = await getCard(id);
  if (!card) {
    showToast('That card did not load. Try again in a moment.');
    return;
  }
  void markRead(id);

  const blob = await renderCardImage(card);
  if (!blob) {
    const text = plainText(card);
    showToast((await writeClipboard(text)) ? 'Copied as text instead.' : preview(text));
    return;
  }

  const name = fileName(id);
  const file = new File([blob], name, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  let canShare = false;
  try {
    canShare = Boolean(nav.canShare?.({ files: [file] }));
  } catch {
    canShare = false;
  }
  if (canShare) {
    try {
      await navigator.share({ files: [file], title: card.title, text: cardLink(id) });
      return;
    } catch (e) {
      if ((e as { name?: string } | null)?.name === 'AbortError') return;
      /* fall through to a download */
    }
  }
  download(blob, name);
  showToast('Image saved.');
}

/** Copy as text: title, hook, body, source and link, ready to paste into a chat. */
export async function copyCardText(id: CardId): Promise<void> {
  closeSheet();
  const card = await getCard(id);
  if (!card) {
    showToast('That card did not load. Try again in a moment.');
    return;
  }
  void markRead(id);
  const text = plainText(card);
  showToast((await writeClipboard(text)) ? 'Copied.' : preview(text));
}
