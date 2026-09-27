/** Inside a series episode: where you are, and "save the series for later". */
import { useState } from 'preact/hooks';
import type { Card } from '@/types';
import { app, goTo, record, showToast, useApp } from '@/app/state';
import { allMeta } from '@/content/loader';
import { accentStyle } from './domain';
import { IconBookmark } from './icons';

export function SeriesBar({ card }: { card: Card }) {
  const ref = card.series;
  const paused = useApp((s) => (ref ? Boolean(s.engineState?.series[ref.id]?.paused) : false));
  // Re-render when reads land, so the dots stay honest.
  useApp((s) => s.engineState?.eventCount ?? 0);
  const [done, setDone] = useState(false);
  if (!ref) return null;

  const episodes = allMeta()
    .filter((m) => m.series?.id === ref.id)
    .sort((a, b) => a.series!.index - b.series!.index);
  const total = Math.max(ref.total, episodes.length);
  const seen = app.engineState?.seen ?? {};
  const later = paused || done;

  const saveForLater = () => {
    if (later) return;
    if (!app.engineState?.saved.includes(card.id)) {
      void record('save', { card: card.id, data: { later: true, series: ref.id } });
    }
    setDone(true);
    showToast('Saved. It is under Library › Series when you want it.');
    goTo(app.cursor + 1);
  };

  return (
    <div class="series-bar" style={accentStyle(card.domain)}>
      <div class="series-bar-head">
        <span class="small">
          Episode {ref.index} of {total} · {ref.title}
        </span>
        <EpisodeDots
          count={total}
          filled={(i) => {
            const ep = episodes.find((m) => m.series!.index === i + 1);
            return i + 1 === ref.index || Boolean(ep && seen[ep.id]?.views);
          }}
          current={ref.index - 1}
        />
      </div>
      <button
        class="btn btn-ghost series-bar-btn"
        aria-label={later ? 'Saved for later' : 'Save the series for later'}
        disabled={later}
        onClick={saveForLater}
      >
        <IconBookmark filled={later} style={{ width: '16px', height: '16px' }} />
        {later ? 'Saved for later' : 'Save the series for later'}
      </button>
    </div>
  );
}

export function EpisodeDots({
  count,
  filled,
  current,
}: {
  count: number;
  filled: (i: number) => boolean;
  current?: number;
}) {
  return (
    <span class="ep-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} class={`${filled(i) ? 'is-on' : ''}${i === current ? ' is-here' : ''}`} />
      ))}
    </span>
  );
}
