/**
 * The daily opener: a synthetic card (`today:<YYYY-MM-DD>`) shown once per day
 * at the head of the feed. A friend saying what is new since last time, with a
 * way in. Everything comes from `buildToday()`; this component only renders it.
 */
import { useMemo } from 'preact/hooks';
import type { Ref } from 'preact';
import type { ServedCard } from '@/types';
import { app, goTo, useApp } from '@/app/state';
import { buildToday, yesterdayLine } from '@/app/today';
import { accentStyle } from './domain';

export function TodayCard({ served, cardRef }: { served: ServedCard; active: boolean; cardRef?: Ref<HTMLElement> }) {
  const state = useApp((s) => s.engineState);
  const count = useApp((s) => s.cardCount);
  const brief = useMemo(() => buildToday(), [state, count, served.id]);

  return (
    <article class="card is-today" ref={cardRef} aria-label="Today">
      <div class="card-body">
        <div class="card-inner today">
          <div class="chips">
            <span class="chip">Today</span>
          </div>
          <h1 class="card-title">{brief.greeting}</h1>
          <p class="muted today-date">{brief.dateLine}</p>
          <p class="today-streak">{brief.streak.line}</p>

          {brief.items.length ? (
            <ul class="today-items">
              {brief.items.map((item) => (
                <li
                  key={item.kind}
                  class={`today-item is-${item.kind}${item.domain ? ' has-domain' : ''}`}
                  style={item.domain ? accentStyle(item.domain) : undefined}
                >
                  <div class="today-item-text">
                    <p class="today-item-title">{item.title}</p>
                    {item.line ? <p class="today-item-line small muted">{item.line}</p> : null}
                  </div>
                  <button
                    class="btn today-item-btn"
                    aria-label={item.line ? `${item.action.label}: ${item.line}` : item.action.label}
                    onClick={() => item.action.run()}
                  >
                    {item.action.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p class="muted today-quiet">Nothing waiting on you. The feed is warm.</p>
          )}

          <div class="today-foot">
            {brief.yesterday ? <p class="small dim">{yesterdayLine(brief.yesterday)}</p> : null}
            {brief.shelfLine ? <p class="small dim">{brief.shelfLine}</p> : null}
          </div>

          <button
            class="btn btn-primary btn-block today-start"
            aria-label="Start reading"
            onClick={() => goTo(app.cursor + 1)}
          >
            Start reading
          </button>
        </div>
      </div>
    </article>
  );
}
