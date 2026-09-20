/** Saved cards: grouped by domain, searchable, swipe left to unsave. */
import { useMemo, useState } from 'preact/hooks';
import type { CardId } from '@/types';
import { jumpToCard, record, showToast, useApp } from '@/app/state';
import { cardMeta } from '@/content/loader';
import { accentStyle, domainInfo } from './domain';
import { useElement, useSwipe } from './hooks';
import { IconClose, IconSearch, IconShuffle } from './icons';

export function SavedScreen() {
  const saved = useApp((s) => s.engineState?.saved ?? []);
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map = new Map<string, CardId[]>();
    for (const id of [...saved].reverse()) {
      const meta = cardMeta(id);
      if (q && !(meta?.title ?? id).toLowerCase().includes(q) && !(meta?.hook ?? '').toLowerCase().includes(q)) continue;
      const d = meta?.domain ?? id.split('.')[0] ?? 'other';
      map.set(d, [...(map.get(d) ?? []), id]);
    }
    return [...map.entries()];
  }, [saved, query]);

  const openRandom = () => {
    const pool = saved;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) jumpToCard(pick, 'progress', ['One you saved']);
  };

  return (
    <div class="scroll">
      <h1 class="screen-title">Saved</h1>

      {saved.length ? (
        <>
          <div class="row" style={{ marginBottom: '8px' }}>
            <IconSearch style={{ width: '18px', height: '18px', color: 'var(--fg-dim)' }} />
            <input
              class="field"
              type="search"
              placeholder="Search saved"
              value={query}
              onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            />
          </div>
          <button class="btn btn-ghost" onClick={openRandom}>
            <IconShuffle style={{ width: '17px', height: '17px' }} /> Random saved card
          </button>
        </>
      ) : (
        <p class="muted">Nothing saved yet. The bookmark on a card keeps it here.</p>
      )}

      {groups.map(([domain, ids]) => (
        <div key={domain} style={accentStyle(domain)}>
          <h2 class="group-head">
            <span aria-hidden="true">{domainInfo(domain)?.glyph ?? '·'}</span>
            {domainInfo(domain)?.name ?? domain}
          </h2>
          <div class="stack">
            {ids.map((id) => (
              <SavedRow key={id} id={id} />
            ))}
          </div>
        </div>
      ))}
    </div>
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
          onClick={() => jumpToCard(id, 'progress', ['One you saved'])}
        >
          <h4>{meta?.title ?? id}</h4>
          {meta?.hook ? <p class="small muted" style={{ margin: 0 }}>{meta.hook}</p> : null}
        </button>
        <button aria-label="Remove from saved" onClick={unsave} class="dim">
          <IconClose style={{ width: '17px', height: '17px' }} />
        </button>
      </div>
    </div>
  );
}
