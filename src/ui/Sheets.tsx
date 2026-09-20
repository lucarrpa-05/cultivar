/** Bottom sheets: ⋯ actions, "Why this card?", "I have a question". */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import type { CardId } from '@/types';
import { app, closeSheet, openSheet, setMapDomain, setTab, useApp } from '@/app/state';
import { cardMeta } from '@/content/loader';
import { topicName } from './domain';
import { askQuestion, copyLink, reportError, tooEasy } from './actions';
import { IconFlag, IconLink, IconPeak, IconQuestion, IconSpark } from './icons';

export function Sheet({
  title,
  children,
  onClose,
}: {
  title?: string;
  children: ComponentChildren;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div class="scrim" onClick={onClose} />
      <div class="sheet" role="dialog" aria-modal="true" aria-label={title ?? 'Options'}>
        <div class="sheet-grip" />
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </>
  );
}

export function SheetHost() {
  const sheet = useApp((s) => s.sheet);
  if (!sheet) return null;
  if (sheet.kind === 'more') return <MoreSheet card={sheet.card} />;
  if (sheet.kind === 'why') return <WhySheet card={sheet.card} />;
  if (sheet.kind === 'question') return <QuestionSheet card={sheet.card} />;
  return null;
}

function MoreSheet({ card }: { card: CardId }) {
  return (
    <Sheet onClose={closeSheet}>
      <button
        class="sheet-item"
        onClick={() => {
          closeSheet();
          tooEasy(card);
        }}
      >
        <IconPeak /> Too easy
      </button>
      <button class="sheet-item" onClick={() => openSheet({ kind: 'question', card })}>
        <IconQuestion /> I have a question
      </button>
      <button class="sheet-item" onClick={() => openSheet({ kind: 'why', card })}>
        <IconSpark /> Why this card?
      </button>
      <button class="sheet-item" onClick={() => void copyLink(card)}>
        <IconLink /> Copy link
      </button>
      <button class="sheet-item" onClick={() => reportError(card)}>
        <IconFlag /> Report an error
      </button>
    </Sheet>
  );
}

function WhySheet({ card }: { card: CardId }) {
  const served = useApp((s) => s.feed.find((f) => f.id === card));
  const meta = cardMeta(card);
  const topic = meta?.topic;
  const mastery = useApp((s) => (topic ? s.engineState?.topics[topic]?.mastery ?? 0 : 0));

  let why = served?.why ?? [];
  if ((!why.length || why[0] === 'fallback') && app.engine) {
    try {
      const explained = app.engine.explain(card);
      if (explained?.length) why = explained;
    } catch {
      /* keep what we have */
    }
  }
  const lines = why.filter((w) => w && w !== 'fallback');

  return (
    <Sheet title="Why this card?" onClose={closeSheet}>
      {lines.length ? (
        <ul class="why-list">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p class="muted">It is next in a simple pass through the library while the engine warms up.</p>
      )}
      {topic ? (
        <>
          <p class="small muted">
            {topicName(topic)} · {Math.round(mastery * 100)}% mastery
          </p>
          <button
            class="btn btn-block"
            onClick={() => {
              closeSheet();
              setMapDomain(meta?.domain ?? null);
              setTab('map');
            }}
          >
            See it in the map
          </button>
        </>
      ) : null}
    </Sheet>
  );
}

function QuestionSheet({ card }: { card: CardId }) {
  const [text, setText] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Sheet title="I have a question" onClose={closeSheet}>
      <textarea
        ref={ref}
        class="field"
        rows={3}
        maxLength={240}
        placeholder="What's on your mind about this?"
        value={text}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
      />
      <p class="counter">{240 - text.length} left</p>
      <button class="btn btn-primary btn-block" disabled={!text.trim()} onClick={() => askQuestion(card, text)}>
        Send it
      </button>
    </Sheet>
  );
}
