/** Throwaway DOM animations (CSS keyframes, cleaned up on finish). */
import { app, settings } from '@/app/state';

function motionOff(): boolean {
  if (settings().reduceMotion) return true;
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Six particles bursting from the tap point. */
export function heartBurst(host: HTMLElement, x: number, y: number): void {
  if (motionOff()) return;
  const rect = host.getBoundingClientRect();
  const wrap = document.createElement('div');
  wrap.className = 'heart-burst';
  wrap.style.left = `${x - rect.left}px`;
  wrap.style.top = `${y - rect.top}px`;
  wrap.style.position = 'absolute';
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('i');
    const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.4;
    const dist = 34 + Math.random() * 26;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.animationDelay = `${i * 14}ms`;
    wrap.append(p);
  }
  host.append(wrap);
  setTimeout(() => wrap.remove(), 700);
}

/** Bookmark flying toward the Saved tab. */
export function bookmarkFly(fromX: number, fromY: number): void {
  if (motionOff()) return;
  const tab = document.querySelector<HTMLElement>('[data-tab="saved"]');
  const el = document.createElement('div');
  el.className = 'fly-bookmark';
  el.innerHTML =
    '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/></svg>';
  el.style.left = `${fromX - 13}px`;
  el.style.top = `${fromY - 13}px`;
  const target = tab?.getBoundingClientRect();
  el.style.setProperty('--dx', `${(target ? target.left + target.width / 2 : innerWidth / 2) - fromX}px`);
  el.style.setProperty('--dy', `${(target ? target.top + 14 : innerHeight) - fromY}px`);
  document.body.append(el);
  setTimeout(() => el.remove(), 640);
  const badge = document.querySelector<HTMLElement>('.tab-badge');
  if (badge) {
    badge.classList.remove('is-bump');
    void badge.offsetWidth;
    badge.classList.add('is-bump');
  }
}

/** Confetti-lite for milestone cards. */
export function confetti(host: HTMLElement, count = 18): void {
  if (motionOff()) return;
  const colors = (app.taxonomy?.domains ?? []).map((d) => d.color);
  const wrap = document.createElement('div');
  wrap.className = 'confetti';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[i % Math.max(1, colors.length)] ?? 'var(--accent)';
    p.style.animationDelay = `${Math.random() * 700}ms`;
    p.style.animationDuration = `${1200 + Math.random() * 900}ms`;
    wrap.append(p);
  }
  host.append(wrap);
  setTimeout(() => wrap.remove(), 2600);
}
