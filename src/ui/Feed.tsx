/**
 * The feed: one card per viewport, vertical snap, three sections mounted.
 * Dwell is driven by an IntersectionObserver at 60% visibility.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { ServedCard } from '@/types';
import { app, onCardVisible, setTab, settings, useApp } from '@/app/state';
import { cardMeta } from '@/content/loader';
import { CardView } from './CardView';
import { ActionRail } from './ActionRail';
import { skipCard, toggleLike, toggleSave } from './actions';
import { useDoubleTap, useElement, useSwipe } from './hooks';
import { IconBookmark, IconDown, IconSkip } from './icons';

export function Feed() {
  const feed = useApp((s) => s.feed);
  const cursor = useApp((s) => s.cursor);
  const boot = useApp((s) => s.boot);
  const exhausted = useApp((s) => s.exhausted);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    app.scrollToIndex = (i, smooth = true) => {
      const root = scroller.current;
      const el = root?.children[i] as HTMLElement | undefined;
      if (!el) return;
      const reduce = settings().reduceMotion;
      el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });
    };
    // Coming back from another tab: restore the reader's place.
    if (app.cursor > 0) requestAnimationFrame(() => app.scrollToIndex?.(app.cursor, false));
    return () => {
      app.scrollToIndex = null;
    };
  }, []);

  useEffect(() => {
    const root = scroller.current;
    if (!root || !feed.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6) {
            const i = Number((entry.target as HTMLElement).dataset.i);
            if (!Number.isNaN(i)) onCardVisible(i);
          }
        }
      },
      { root, threshold: [0.6] },
    );
    for (const child of Array.from(root.children)) io.observe(child);
    return () => io.disconnect();
  }, [feed.length]);

  if (boot === 'loading') {
    return (
      <div class="empty">
        <p class="muted">Opening the library…</p>
      </div>
    );
  }

  if (boot === 'empty' || !feed.length) {
    return (
      <div class="empty">
        <h2>Nothing to read yet</h2>
        <p>
          {boot === 'empty'
            ? 'Connect once to download the library (about 5 MB).'
            : 'The plan came back empty. Try the map while the engine catches up.'}
        </p>
        <div class="row">
          <button class="btn" onClick={() => location.reload()}>
            Try again
          </button>
          <button class="btn btn-ghost" onClick={() => setTab('map')}>
            Open the map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="feed" ref={scroller}>
      {feed.map((served, i) => (
        <FeedSection key={`${served.id}:${i}`} served={served} index={i} active={i === cursor} mounted={Math.abs(i - cursor) <= 1} />
      ))}
      {exhausted ? (
        <section class="feed-section" data-i={feed.length}>
          <div class="empty">
            <h2>That is everything for now</h2>
            <p>
              You have seen everything at your level in the areas you like. Refresh adds more; meanwhile, here is the
              map.
            </p>
            <button class="btn" onClick={() => setTab('map')}>
              Open the map
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

interface SectionProps {
  served: ServedCard;
  index: number;
  active: boolean;
  mounted: boolean;
}

function FeedSection({ served, index, active, mounted }: SectionProps) {
  // A callback ref, not `useRef`: CardView replaces its root <article> when the
  // body finishes loading, and the gestures have to follow the live node.
  const [cardEl, setCardEl] = useElement<HTMLElement>();
  const hintLeft = useRef<HTMLDivElement>(null);
  const hintRight = useRef<HTMLDivElement>(null);
  const card = useApp((s) => s.cards[served.id]);
  const [dragging, setDragging] = useState(false);

  useSwipe(cardEl, {
    enabled: active && !served.id.startsWith('milestone:'),
    onLeft: () => skipCard(served.id),
    onRight: () => toggleSave(served.id),
    onProgress: (dx, ratio) => {
      setDragging(ratio > 0);
      if (hintLeft.current) hintLeft.current.style.opacity = dx < 0 ? String(ratio) : '0';
      if (hintRight.current) hintRight.current.style.opacity = dx > 0 ? String(ratio) : '0';
    },
  });

  useDoubleTap(
    cardEl,
    (x, y) => toggleLike(served.id, cardEl, x, y),
    active && !served.id.startsWith('milestone:'),
  );

  const peek = nextCardTitle(index + 1);

  return (
    <section class="feed-section" data-i={index}>
      {mounted ? (
        <CardView served={served} card={card} active={active} cardRef={setCardEl} />
      ) : (
        <article class="card" aria-hidden="true">
          <div class="card-body">
            <div class="card-inner dim small">{cardMeta(served.id)?.title ?? ''}</div>
          </div>
        </article>
      )}

      {active ? (
        <>
          <div class="drag-hint left" ref={hintLeft} aria-hidden="true">
            <IconSkip />
          </div>
          <div class="drag-hint right" ref={hintRight} aria-hidden="true">
            <IconBookmark />
          </div>
          <ActionRail cardId={served.id} host={cardEl} />
          {peek && !dragging ? (
            <div class="next-peek" aria-hidden="true">
              <IconDown style={{ width: '15px', height: '15px', flex: '0 0 auto' }} />
              <span>{peek}</span>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function nextCardTitle(index: number): string | null {
  const served = app.feed[index];
  if (!served) return null;
  if (served.id.startsWith('milestone:')) return 'A small milestone';
  return cardMeta(served.id)?.title ?? app.cards[served.id]?.title ?? null;
}
