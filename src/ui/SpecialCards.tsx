/** Wire cards (live items) and milestone cards. */
import { useEffect, useRef } from 'preact/hooks';
import type { Ref } from 'preact';
import type { ServedCard } from '@/types';
import { app, endSession, goTo, setTab, useApp } from '@/app/state';
import { friendlyDate, monthName } from '@/app/util';
import { accentStyle, domainInfo, topicName } from './domain';
import { confetti } from './anim';
import { wireAction } from './actions';
import { IconSpark } from './icons';

// ── wire ───────────────────────────────────────────────────────────────────

export function WireCard({ served, cardRef }: { served: ServedCard; cardRef?: Ref<HTMLElement> }) {
  const item = useApp((s) => s.wire.find((w) => w.id === (served.wire ?? served.id)));
  const seen = useRef(false);

  useEffect(() => {
    if (item && !seen.current) {
      seen.current = true;
      wireAction(item.id, 'view');
    }
  }, [item?.id]);

  if (!item) {
    return (
      <article class="card" ref={cardRef}>
        <div class="card-body">
          <div class="card-inner muted small">This live item is no longer in the inbox.</div>
        </div>
      </article>
    );
  }

  const domain = domainInfo(item.domain);
  return (
    <article class="card is-wire" ref={cardRef} style={accentStyle(item.domain)}>
      <div class="card-body">
        <div class="card-inner">
          <div class="chips">
            <span class="chip chip-domain">
              <span class="chip-glyph" aria-hidden="true">
                {domain?.glyph ?? '·'}
              </span>
              {item.sourceName}
            </span>
            <span class="chip">{friendlyDate(Date.parse(item.published))}</span>
          </div>
          <div class="wire-card">
            <h1 class="card-title" style={{ fontSize: '21px' }} lang={item.lang === 'es' ? 'es' : undefined}>
              {item.title}
            </h1>
            <p class="wire-summary">{item.summary}</p>
            <div class="row" style={{ marginTop: '16px' }}>
              <a
                class="btn"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => wireAction(item.id, 'open')}
              >
                Read ↗
              </a>
              <button class="btn btn-ghost" onClick={() => wireAction(item.id, 'like')}>
                Distill this?
              </button>
            </div>
          </div>
          {item.topicHint ? <p class="small dim" style={{ marginTop: '14px' }}>Near {topicName(item.topicHint)}</p> : null}
        </div>
      </div>
    </article>
  );
}

// ── milestones ─────────────────────────────────────────────────────────────

function milestoneCopy(id: string): { title: string; line: string } {
  const st = app.engineState;
  const streak = st?.streak.current ?? 0;
  if (id.startsWith('topic-solid:')) return { title: 'Solid ✨', line: `${topicName(id.slice(12))} is solid now.` };
  if (id.startsWith('domain-touched:')) {
    return { title: 'New ground ✨', line: `First card in ${domainInfo(id.slice(15))?.name ?? id.slice(15)}.` };
  }
  if (id.startsWith('month-')) {
    return { title: 'Recap ready ✨', line: `Your ${monthName(new Date().toISOString().slice(0, 7))} recap is in You.` };
  }
  switch (id) {
    case 'goal-reached':
      return { title: 'Goal done ✨', line: `${streak + 1} days · keep going?` };
    case 'first-10-cards':
      return { title: 'Ten cards in ✨', line: 'The feed is starting to know you.' };
    case 'first-like':
      return { title: 'First like ✨', line: 'More of that, then.' };
    case 'first-rigor':
      return { title: 'Into the rigor ✨', line: 'Intuition first, proof second. That is the deal.' };
    case 'first-too-hard':
      return { title: 'Good ✨', line: 'Now I know where to build.' };
    case 'first-callback':
      return { title: 'Two ideas, one shape ✨', line: 'That is what the map is for.' };
    case 'first-revisit-solved':
      return { title: 'You got it ✨', line: 'You flagged this one. You just got it.' };
    case 'first-binge':
      return { title: 'A long sitting ✨', line: 'That was a proper session.' };
    case 'all-domains':
      return { title: 'Every domain ✨', line: 'You have touched all eleven.' };
    case 'recall-streak-10':
      return { title: 'Ten in a row ✨', line: 'Recall is sticking.' };
    default:
      if (id.startsWith('streak-')) return { title: `${id.slice(7)} days ✨`, line: 'In a row. Quietly impressive.' };
      if (id.startsWith('cards-')) return { title: `${id.slice(6)} cards ✨`, line: 'Ideas add up.' };
      return { title: 'A small milestone ✨', line: 'Keep going.' };
  }
}

export function MilestoneCard({ served, cardRef }: { served: ServedCard; cardRef?: Ref<HTMLElement> }) {
  const id = served.id.startsWith('milestone:') ? served.id.slice(10) : served.id;
  const host = useRef<HTMLElement>(null);
  const { title, line } = milestoneCopy(id);

  useEffect(() => {
    if (host.current) confetti(host.current);
  }, [id]);

  return (
    <article class="card" ref={cardRef}>
      <div class="card-body">
        <div class="card-inner milestone" ref={host as never}>
          <IconSpark style={{ width: '34px', height: '34px', color: 'var(--accent)' }} />
          <h2>{title}</h2>
          <p class="muted">{line}</p>
          <button class="btn btn-primary" onClick={() => goTo(app.cursor + 1)}>
            Keep going
          </button>
          <button
            class="btn btn-ghost small"
            onClick={() => {
              endSession();
              setTab('you');
            }}
          >
            Done for today
          </button>
        </div>
      </div>
    </article>
  );
}
