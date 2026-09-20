/**
 * CardView dispatches by format; every format shares the same shell
 * (chips · title · hook · body · diagram · rigor gate · sources · related).
 *
 * To add a format: add a branch in `CardView` and, if it needs different body
 * typography, a small component that renders `<CardShell>` with its own children.
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Ref } from 'preact';
import type { Card, CardId, ServedCard, Source } from '@/types';
import { app, dwellMs, jumpToCard, reportReadFraction, useApp } from '@/app/state';
import { cardMeta } from '@/content/loader';
import { friendlyDate } from '@/app/util';
import { accentStyle, domainInfo, topicName } from './domain';
import { Markdown } from './Markdown';
import { Diagram } from './Diagram';
import { RecallCard } from './RecallCard';
import { WireCard, MilestoneCard } from './SpecialCards';
import { askSeriesNext, openRigor, openSource, showWhy as showWhySheet } from './actions';
import { useTick } from './hooks';
import { IconDown, IconRight } from './icons';

interface Props {
  served: ServedCard;
  card: Card | null | undefined;
  active: boolean;
  cardRef?: Ref<HTMLElement>;
}

export function CardView({ served, card, active, cardRef }: Props) {
  if (served.slot === 'milestone' || served.id.startsWith('milestone:')) {
    return <MilestoneCard served={served} cardRef={cardRef} />;
  }
  if (served.slot === 'wire' || served.wire) {
    return <WireCard served={served} cardRef={cardRef} />;
  }
  if (card === undefined || card === null) {
    return (
      <article class="card" ref={cardRef}>
        <div class="card-body">
          <div class="card-inner muted small">{card === null ? 'That card is not in the library yet.' : 'Loading…'}</div>
        </div>
      </article>
    );
  }
  if (served.slot === 'recall' && card.recall) {
    return <RecallCard card={card} served={served} active={active} cardRef={cardRef} />;
  }
  return <CardShell card={card} served={served} active={active} cardRef={cardRef} />;
}

// ── shell ──────────────────────────────────────────────────────────────────

interface ShellProps extends Props {
  card: Card;
}

export function CardShell({ card, served, active, cardRef }: ShellProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [rigorOpen, setRigorOpen] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [nudge, setNudge] = useState(false);

  const gateMs = useMemo(() => Math.max(6000, 0.4 * ((card.words?.body ?? 120) / 3.3) * 1000), [card.id]);
  const locked = !atEnd && dwellMs(card.id) < gateMs;
  useTick(600, active && card.hasRigor && locked && !rigorOpen);

  useEffect(() => {
    setRigorOpen(false);
    setAtEnd(false);
  }, [card.id]);

  const onScroll = () => {
    const el = bodyRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const fraction = max > 0 ? Math.min(1, (el.scrollTop + el.clientHeight) / el.scrollHeight) : 1;
    reportReadFraction(card.id, fraction);
    if (max > 40 && el.scrollTop >= max - 24) setAtEnd(true);
  };

  const toggleRigor = () => {
    if (locked) {
      setNudge(true);
      setTimeout(() => setNudge(false), 2600);
      return;
    }
    if (!rigorOpen) openRigor(card.id);
    setRigorOpen((v) => !v);
  };

  const body = <FormatBody card={card} />;

  return (
    <article class={`card is-${card.format}`} ref={cardRef} style={accentStyle(card.domain)}>
      <div class="card-body" ref={bodyRef} onScroll={onScroll}>
        <div class="card-inner">
          <CardChips card={card} served={served} />
          <WhyLine card={card} served={served} />
          <h1 class="card-title">{card.title}</h1>
          {card.hook && card.format !== 'quote' ? <p class="card-hook">{card.hook}</p> : null}

          {body}

          {card.diagram ? <Diagram diagram={card.diagram} /> : null}

          {card.hasRigor && card.rigor ? (
            <div class="rigor">
              <button
                class={`rigor-btn${locked && !rigorOpen ? ' is-locked' : ''}`}
                onClick={toggleRigor}
                aria-expanded={rigorOpen}
                aria-disabled={locked && !rigorOpen}
              >
                {rigorOpen ? 'Hide the rigor' : 'Show me the rigor'}
                {rigorOpen ? <IconDown /> : <IconRight />}
              </button>
              {nudge ? <p class="rigor-hint">Read the intuition first.</p> : null}
              {rigorOpen ? (
                <div class="rigor-panel">
                  <Markdown text={card.rigor} lang={card.language} />
                </div>
              ) : null}
            </div>
          ) : null}

          {card.series && card.seriesNext ? (
            <p style={{ marginTop: '22px' }}>
              <button class="btn" onClick={() => askSeriesNext(card.id)}>
                Next episode <IconRight />
              </button>
            </p>
          ) : null}

          <Sources card={card} />
          <Related card={card} />
        </div>
      </div>
    </article>
  );
}

function FormatBody({ card }: { card: Card }) {
  if (card.format === 'quote') {
    const attrib = card.sources?.[0];
    return (
      <div>
        <div class="quote-mark" aria-hidden="true">
          “
        </div>
        <Markdown class="quote-text" text={card.body} lang={card.language} />
        {attrib ? (
          <p class="quote-attrib">
            {attrib.author ?? attrib.title}
            {attrib.year ? `, ${attrib.year}` : ''}
          </p>
        ) : null}
      </div>
    );
  }
  if (card.format === 'callback' && card.callback) {
    return (
      <div>
        <p class="card-hook" style={{ marginTop: '-8px' }}>
          Remember {topicName(card.callback.from)}?
        </p>
        <Markdown text={card.body} lang={card.language} />
      </div>
    );
  }
  if (card.format === 'challenge') {
    return (
      <div>
        <Markdown text={card.body} lang={card.language} />
        <p class="small dim">Sit with it. No answer needed.</p>
      </div>
    );
  }
  return <Markdown text={card.body} lang={card.language} />;
}

// ── chips ──────────────────────────────────────────────────────────────────

const FORMAT_LABEL: Record<string, string> = {
  fact: 'Fact',
  quote: 'Quote',
  story: 'Story',
  callback: 'Callback',
  challenge: 'A puzzle',
  news: 'News',
  recall: 'Quick one',
};

export function CardChips({ card, served }: { card: Card; served: ServedCard }) {
  const domain = domainInfo(card.domain);
  const asked = useApp((s) => Boolean(s.engineState?.questions.some((q) => q.card === card.id)));
  const chips: string[] = [];

  if (card.series) chips.push(`Episode ${card.series.index}/${card.series.total} · ${card.series.title}`);
  else if (card.format === 'news') {
    const when = card.dates.event ?? card.dates.written;
    chips.push(`Fresh · ${friendlyDate(Date.parse(when))}`);
  } else if (FORMAT_LABEL[card.format]) chips.push(FORMAT_LABEL[card.format]);

  if (served.slot === 'revisit' && served.revisitOf) {
    chips.push(`Revisit · flagged ${friendlyDate(served.revisitOf.flaggedAt)}`);
  }
  if (served.slot === 'backfill') chips.push('Groundwork');
  if (card.answersQuestion || served.slot === 'answer') chips.push('You asked');
  if (card.context || served.slot === 'context') chips.push('For what you are working on');
  if (served.slot === 'serendipity') chips.push('Something else');
  if (asked) chips.push('asked');

  return (
    <div class="chips">
      <span class="chip chip-domain">
        <span class="chip-glyph" aria-hidden="true">
          {domain?.glyph ?? '·'}
        </span>
        {domain?.name ?? card.domain}
      </span>
      {chips.map((c) => (
        <span class="chip" key={c}>
          {c}
        </span>
      ))}
    </div>
  );
}

/** One line of "why this card", when the reader keeps that setting on. */
function WhyLine({ card, served }: { card: Card; served: ServedCard }) {
  const showWhy = useApp((s) => s.engineState?.settings.showWhy ?? true);
  const line = (served.why ?? []).find((w) => w && w !== 'fallback');
  if (!showWhy || !line) return null;
  return (
    <button class="why-line" onClick={() => showWhySheet(card.id)}>
      {line}
    </button>
  );
}

// ── sources + related ──────────────────────────────────────────────────────

function sourceLabel(s: Source): string {
  const bits = [s.author, s.title].filter(Boolean) as string[];
  return bits.join(', ');
}

function Sources({ card }: { card: Card }) {
  if (!card.sources?.length) return null;
  return (
    <div class="sources">
      {card.sources.map((s, i) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => openSource(card.id, s.url)}
        >
          {i === 0 ? 'Source: ' : 'Also: '}
          {sourceLabel(s)} ↗
        </a>
      ))}
    </div>
  );
}

function Related({ card }: { card: Card }) {
  const related = (card.related ?? []).filter((id) => cardMeta(id));
  if (!related.length) return null;
  return (
    <div class="related">
      <p class="related-label">Keep pulling this thread</p>
      <div class="chips">
        {related.slice(0, 3).map((id) => (
          <button
            key={id}
            class="chip"
            onClick={() => jumpToCard(id, 'progress', ['You pulled this thread'])}
          >
            {cardMeta(id)?.title ?? id}
          </button>
        ))}
      </div>
    </div>
  );
}

export function nextTitle(index: number): string | null {
  const served = app.feed[index];
  if (!served) return null;
  if (served.id.startsWith('milestone:')) return 'A small milestone';
  return cardMeta(served.id)?.title ?? app.cards[served.id]?.title ?? null;
}
