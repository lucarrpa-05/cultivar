/** Gesture and timing hooks. Gestures are always extras: every action is a button too. */
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

/** Re-render on an interval (used by the rigor gate countdown). */
export function useTick(ms: number, enabled = true): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);
  return n;
}

/**
 * A ref whose identity is *observable*: the component re-renders — and so any
 * effect keyed on it re-runs — the moment the DOM node behind it is replaced.
 *
 * A plain `useRef` cannot do this. `ref.current` is read during render, one
 * commit behind, so when a component swaps its root element (CardView goes from
 * the "Loading…" placeholder to the real card) the gesture listeners end up
 * bound to a node that is no longer in the document. Everything looks fine and
 * nothing works.
 */
export function useElement<T extends HTMLElement>(): [T | null, (el: T | null) => void] {
  const [el, setEl] = useState<T | null>(null);
  const set = useCallback((node: T | null) => setEl((prev) => (prev === node ? prev : node)), []);
  return [el, set];
}

const EDGE_GUARD = 24; // px: leave the browser's back/forward edge swipes alone

interface SwipeOpts {
  enabled: boolean;
  onLeft: () => void;
  onRight: () => void;
  onProgress?: (dx: number, ratio: number) => void;
}

/**
 * Horizontal drag inside the card body. Commits past 35% of the width:
 * left = skip, right = save. Drags starting near a screen edge are ignored.
 */
export function useSwipe(el: HTMLElement | null, opts: SwipeOpts): void {
  const state = useRef({ id: -1, x0: 0, y0: 0, locked: false, active: false });
  const cb = useRef(opts);
  cb.current = opts;

  useEffect(() => {
    if (!el) return;

    const reset = (animate: boolean) => {
      state.current = { id: -1, x0: 0, y0: 0, locked: false, active: false };
      el.dataset.dragging = '0';
      el.dataset.settling = animate ? '1' : '0';
      el.style.transform = '';
      cb.current.onProgress?.(0, 0);
      if (animate) setTimeout(() => el && (el.dataset.settling = '0'), 240);
    };

    const down = (e: PointerEvent) => {
      if (!cb.current.enabled || e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.clientX < EDGE_GUARD || e.clientX > innerWidth - EDGE_GUARD) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, [data-no-swipe]')) return;
      state.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, locked: false, active: true };
    };

    const move = (e: PointerEvent) => {
      const s = state.current;
      if (!s.active || e.pointerId !== s.id) return;
      const dx = e.clientX - s.x0;
      const dy = e.clientY - s.y0;
      if (!s.locked) {
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
          s.active = false; // vertical: let the feed scroll
          return;
        }
        if (Math.abs(dx) < 12) return;
        s.locked = true;
        el.dataset.dragging = '1';
        el.dataset.settling = '0';
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      const ratio = Math.min(1, Math.abs(dx) / (innerWidth * 0.35));
      el.style.transform = `translateX(${dx}px) rotate(${dx * 0.02}deg)`;
      cb.current.onProgress?.(dx, ratio);
    };

    const up = (e: PointerEvent) => {
      const s = state.current;
      if (!s.active || e.pointerId !== s.id) return;
      const dx = e.clientX - s.x0;
      const committed = s.locked && Math.abs(dx) >= innerWidth * 0.35;
      reset(true);
      if (!committed) return;
      if (dx < 0) cb.current.onLeft();
      else cb.current.onRight();
    };

    const cancel = () => reset(true);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel);
    };
  }, [el, opts.enabled]);
}

/** Double-tap (not dblclick: it must work with touch and not fight scrolling). */
export function useDoubleTap(el: HTMLElement | null, onDouble: (x: number, y: number) => void, enabled = true): void {
  const last = useRef({ t: 0, x: 0, y: 0 });
  const cb = useRef(onDouble);
  cb.current = onDouble;

  useEffect(() => {
    if (!el || !enabled) return;
    const handler = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea')) return;
      const now = Date.now();
      const prev = last.current;
      if (now - prev.t < 320 && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 36) {
        last.current = { t: 0, x: 0, y: 0 };
        cb.current(e.clientX, e.clientY);
        return;
      }
      last.current = { t: now, x: e.clientX, y: e.clientY };
    };
    el.addEventListener('pointerup', handler);
    return () => el.removeEventListener('pointerup', handler);
  }, [el, enabled]);
}

/** Long-press helper returning props to spread on a button. */
export function useLongPress(onLong: () => void, ms = 500) {
  const timer = useRef<number | undefined>(undefined);
  const fired = useRef(false);
  const start = () => {
    fired.current = false;
    timer.current = setTimeout(() => {
      fired.current = true;
      onLong();
    }, ms) as unknown as number;
  };
  const stop = () => clearTimeout(timer.current);
  return {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    didLongPress: () => fired.current,
  };
}
