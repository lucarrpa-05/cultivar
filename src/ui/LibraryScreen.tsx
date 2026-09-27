/**
 * Library: the place to go get something specific. Search, mood shelves,
 * series to pick back up, and everything saved (swipe left to unsave).
 */
import { useMemo, useState } from 'preact/hooks';
import type { CardId, CardMeta } from '@/types';
import { app, enqueue, jumpToCard, record, showToast, useApp } from '@/app/state';
import { allMeta, cardMeta } from '@/content/loader';
import {
  pickFromShelf,
  searchCards,
  seriesList,
  shelves,
  surpriseMe,
  unreadIn,
  type SeriesEntry,
  type Shelf,
} from '@/app/library';
import { dayKey } from '@/app/util';
import { accentStyle, domainInfo } from './domain';
import { useElement, useSwipe } from './hooks';
import { IconClose, IconDice, IconLeft, IconSearch, IconShuffle } from './icons';
import { EpisodeDots } from './SeriesBar';

const FORMAT_LABEL: Record<string, string> = {
  idea: 'Idea',
  fact: 'Fact',
  quote: 'Quote',
  story: 'Story',
  callback: 'Callback',
  challenge: 'A puzzle',
  news: 'News',
  series: 'Series',
  recall: 'Quick one',
};

const NUMBER_WORD = ['None', 'One', 'Two', 'Three', 'Four', 'Five'];

/** Re-render whenever an event lands (the engine mutates state in place). */
function useStateVersion(): number {
  return useApp((s) => s.engineState?.eventCount ?? 0);
}

export function LibraryScreen() {
  const [query, setQuery] = useState('');
  const version = useStateVersion();
  const index = useApp(() => allMeta());
  const q = query.trim();
  const results = useMemo(() => (q.length >= 2 ? searchCards(q, 40) : []), [q, index]);

  return (
    <div class="scroll library">
      <h1 class="screen-title">Library</h1>
      <label class="lib-search">
        <IconSearch aria-hidden="true" />
        <input
          class="field"
          type="search"
          placeholder="Find a card, a topic, a name"
          aria-label="Search the library"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
      </label>

      {q.length >= 2 ? (
        <section aria-label="Search results">
          {results.length ? (
            <div class="stack">
              {results.map((m) => (
                <CardRow key={m.id} meta={m} why="You went looking for this" />
              ))}
            </div>
          ) : (
            <p class="muted">Nothing by that name yet. Try one word from a title or a topic.</p>
          )}
        </section>
      ) : (
        <>
          <MoodSection version={version} />
          <SeriesSection version={version} />
          <SavedSection />
        </>
      )}
    </div>
  );
}

// ── rows ───────────────────────────────────────────────────────────────────

function CardRow({ meta, why }: { meta: CardMeta; why: string }) {
  const seen = app.engineState?.seen[meta.id];
  const saved = app.engineState?.saved.includes(meta.id);
  const chips = [FORMAT_LABEL[meta.format] ?? meta.format];
  if (seen?.views) chips.push('read');
  if (seen?.liked) chips.push('liked');
  if (saved) chips.push('saved');
  return (
    <button
      class="saved-item lib-row"
      style={accentStyle(meta.domain)}
      aria-label={`Open ${meta.title}`}
      onClick={() => jumpToCard(meta.id, 'progress', [why])}
    >
      <span class="lib-glyph" aria-hidden="true">
        {domainInfo(meta.domain)?.glyph ?? '·'}
      </span>
      <span class="grow">
        <span class="lib-title">{meta.title}</span>
        {meta.hook ? <span class="small muted lib-hook">{meta.hook}</span> : null}
        <span class="lib-chips">
          {chips.map((c) => (
            <span key={c} class="chip">
              {c}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

// ── mood shelves ───────────────────────────────────────────────────────────

function readFive(shelf: Shelf): void {
  const ids = pickFromShelf(shelf, 5, dayKey());
  if (!unreadIn(shelf) || !ids.length) {
    showToast('You have read every one. More come with the next refresh.');
    return;
  }
  const n = enqueue(ids, 'progress', [`From the ${shelf.name} shelf`]);
  if (!n) {
    showToast('You have read every one. More come with the next refresh.');
    return;
  }
  showToast(`${NUMBER_WORD[n] ?? n} from the ${shelf.name.toLowerCase()} shelf, coming up.`);
}

function MoodSection({ version }: { version: number }) {
  const index = useApp(() => allMeta());
  const list = useMemo(() => shelves(), [index]);
  const [open, setOpen] = useState<string | null>(null);
  const shelf = list.find((s) => s.id === open);

  const surprise = () => {
    const id = surpriseMe();
    if (id) jumpToCard(id, 'serendipity', ['You asked for a surprise']);
    else showToast('You have read every one. More come with the next refresh.');
  };

  return (
    <section class="lib-section" aria-label="In the mood for">
      <div class="row-between">
        <h2 class="lib-head">In the mood for…</h2>
        <button class="btn btn-ghost lib-small-btn" aria-label="Surprise me" onClick={surprise}>
          <IconDice /> Surprise me
        </button>
      </div>
      {shelf ? (
        <ShelfList shelf={shelf} onBack={() => setOpen(null)} version={version} />
      ) : (
        <div class="domain-grid lib-grid">
          {list.map((s) => (
            <div key={s.id} class="domain-tile lib-tile">
              <button class="lib-tile-open" aria-label={`Open the ${s.name} shelf`} onClick={() => setOpen(s.id)}>
                <h3>{s.name}</h3>
                <span class="small muted">{s.blurb}</span>
                <span class="small dim">
                  {unreadIn(s)} unread of {s.ids.length}
                </span>
              </button>
              <button
                class="btn btn-ghost lib-small-btn"
                aria-label={`Read five from the ${s.name} shelf`}
                onClick={() => readFive(s)}
                disabled={!s.ids.length}
              >
                Read five
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ShelfList({ shelf, onBack }: { shelf: Shelf; onBack: () => void; version: number }) {
  const [limit, setLimit] = useState(30);
  const seen = app.engineState?.seen ?? {};
  const ordered = [...shelf.ids]
    .map((id) => cardMeta(id))
    .filter((m): m is CardMeta => Boolean(m))
    .sort((a, b) => Number(Boolean(seen[a.id]?.views)) - Number(Boolean(seen[b.id]?.views)) || a.title.localeCompare(b.title));
  return (
    <div class="lib-shelf">
      <div class="row-between lib-shelf-head">
        <button class="btn btn-ghost lib-small-btn" aria-label="Back to the shelves" onClick={onBack}>
          <IconLeft /> Shelves
        </button>
        <button class="btn btn-primary lib-small-btn" aria-label={`Read five from the ${shelf.name} shelf`} onClick={() => readFive(shelf)}>
          Read five
        </button>
      </div>
      <h3 class="lib-shelf-title">{shelf.name}</h3>
      <p class="small muted lib-shelf-blurb">
        {shelf.blurb} · {unreadIn(shelf)} unread of {shelf.ids.length}
      </p>
      {ordered.length ? (
        <div class="stack">
          {ordered.slice(0, limit).map((m) => (
            <CardRow key={m.id} meta={m} why={`From the ${shelf.name} shelf`} />
          ))}
        </div>
      ) : (
        <p class="muted">Empty for now. More come with the next refresh.</p>
      )}
      {ordered.length > limit ? (
        <button class="btn btn-ghost btn-block lib-more" aria-label="Show more from this shelf" onClick={() => setLimit(limit + 30)}>
          Show more
        </button>
      ) : null}
    </div>
  );
}

// ── series ─────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<SeriesEntry['status'], string> = {
  paused: 'Paused',
  reading: 'Reading',
  new: 'New',
  finished: 'Finished',
};

const ACTION_LABEL: Record<SeriesEntry['status'], string> = {
  paused: 'Continue',
  reading: 'Continue',
  new: 'Start',
  finished: 'Read again',
};

function SeriesSection({ version }: { version: number }) {
  const index = useApp(() => allMeta());
  const list = useMemo(() => seriesList(), [index, version]);
  const [all, setAll] = useState(false);
  if (!list.length) return null;
  const shown = all ? list : list.slice(0, 6);

  const go = (s: SeriesEntry) => {
    const n = enqueue([s.nextId], 'series', [`You came back to ${s.title}`]);
    if (!n) jumpToCard(s.nextId, 'series', [`You came back to ${s.title}`]);
  };

  return (
    <section class="lib-section" aria-label="Series">
      <h2 class="lib-head">Series</h2>
      <div class="stack">
        {shown.map((s) => (
          <div key={s.id} class={`saved-item lib-series is-${s.status}`} style={accentStyle(s.domain)}>
            <span class="lib-glyph" aria-hidden="true">
              {domainInfo(s.domain)?.glyph ?? '·'}
            </span>
            <div class="grow">
              <h4>{s.title}</h4>
              <div class="row lib-series-meta">
                <EpisodeDots count={s.total} filled={(i) => Boolean(s.read[i])} />
                <span class="chip lib-status">{STATUS_LABEL[s.status]}</span>
              </div>
            </div>
            <button
              class={`btn ${s.status === 'paused' || s.status === 'reading' ? 'btn-primary' : 'btn-ghost'} lib-small-btn`}
              aria-label={`${ACTION_LABEL[s.status]} ${s.title}`}
              onClick={() => go(s)}
            >
              {ACTION_LABEL[s.status]}
            </button>
          </div>
        ))}
      </div>
      {list.length > 6 ? (
        <button
          class="btn btn-ghost btn-block lib-more"
          aria-label={all ? 'Show fewer series' : 'Show all series'}
          onClick={() => setAll(!all)}
        >
          {all ? 'Show fewer' : `Show all ${list.length}`}
        </button>
      ) : null}
    </section>
  );
}

// ── saved ──────────────────────────────────────────────────────────────────

function SavedSection() {
  const saved = useApp((s) => s.engineState?.saved ?? []);
  const count = useApp((s) => s.engineState?.saved.length ?? 0);

  const groups = useMemo(() => {
    const map = new Map<string, CardId[]>();
    for (const id of [...saved].reverse()) {
      const d = cardMeta(id)?.domain ?? id.split('.')[0] ?? 'other';
      map.set(d, [...(map.get(d) ?? []), id]);
    }
    return [...map.entries()];
  }, [saved, count]);

  const openRandom = () => {
    const pick = saved[Math.floor(Math.random() * saved.length)];
    if (pick) jumpToCard(pick, 'progress', ['One you saved']);
  };

  return (
    <section class="lib-section" aria-label="Saved">
      <div class="row-between">
        <h2 class="lib-head">Saved</h2>
        {saved.length ? (
          <button class="btn btn-ghost lib-small-btn" aria-label="Random saved card" onClick={openRandom}>
            <IconShuffle /> Random
          </button>
        ) : null}
      </div>
      {saved.length ? null : <p class="muted">Nothing saved yet. The bookmark on a card keeps it here.</p>}
      {groups.map(([domain, ids]) => (
        <div key={domain} style={accentStyle(domain)}>
          <h3 class="group-head">
            <span aria-hidden="true">{domainInfo(domain)?.glyph ?? '·'}</span>
            {domainInfo(domain)?.name ?? domain}
          </h3>
          <div class="stack">
            {ids.map((id) => (
              <SavedRow key={id} id={id} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function SavedRow({ id }: { id: CardId }) {
  const [row, setRow] = useElement<HTMLDivElement>();
  const meta = cardMeta(id);

  const unsave = () => {
    void record('unsave', { card: id });
    showToast('Removed from saved.', {
      label: 'Undo',
      run: () => void record('save', { card: id }),
    });
  };

  useSwipe(row, { enabled: true, onLeft: unsave, onRight: () => undefined });

  return (
    <div ref={setRow}>
      <div class="saved-item">
        <button
          class="grow"
          style={{ textAlign: 'left' }}
          aria-label={`Open ${meta?.title ?? id}`}
          onClick={() => jumpToCard(id, 'progress', ['One you saved'])}
        >
          <h4>{meta?.title ?? id}</h4>
          {meta?.hook ? (
            <p class="small muted" style={{ margin: 0 }}>
              {meta.hook}
            </p>
          ) : null}
        </button>
        <button aria-label="Remove from saved" onClick={unsave} class="dim">
          <IconClose style={{ width: '17px', height: '17px' }} />
        </button>
      </div>
    </div>
  );
}
