/** Recall cards: "Quick one", never "Quiz". No timer shown, no penalty. */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Ref } from 'preact';
import type { Card, ServedCard } from '@/types';
import { app, goTo } from '@/app/state';
import { accentStyle, domainInfo } from './domain';
import { Markdown } from './Markdown';
import { gradeRecall } from './actions';

interface Props {
  card: Card;
  served: ServedCard;
  active: boolean;
  cardRef?: Ref<HTMLElement>;
}

export function RecallCard({ card, active, cardRef }: Props) {
  const recall = card.recall!;
  const domain = domainInfo(card.domain);
  const started = useRef(Date.now());
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (active) started.current = Date.now();
  }, [active, card.id]);

  const fast = () => Date.now() - started.current < 4000;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = Boolean(recall.options?.[i]?.correct);
    gradeRecall(card.id, correct ? (fast() ? 4 : 3) : 1, correct);
    setDone(true);
  };

  const grade = (g: 1 | 2 | 3) => {
    gradeRecall(card.id, g === 3 && fast() ? 4 : g);
    setDone(true);
  };

  return (
    <article class="card is-recall" ref={cardRef} style={accentStyle(card.domain)}>
      <div class="card-body">
        <div class="card-inner">
          <div class="chips">
            <span class="chip chip-domain">
              <span class="chip-glyph" aria-hidden="true">
                {domain?.glyph ?? '·'}
              </span>
              {domain?.name ?? card.domain}
            </span>
            <span class="chip">Quick one</span>
          </div>

          <p class="recall-q" lang={card.language === 'es' ? 'es' : undefined}>
            {recall.question}
          </p>

          {recall.type === 'mcq' && recall.options ? (
            <div class="recall-opts" role="group" aria-label="Options">
              {recall.options.map((opt, i) => {
                const show = picked !== null;
                const cls = !show ? '' : opt.correct ? ' is-correct' : i === picked ? ' is-wrong' : '';
                return (
                  <button key={opt.text} class={`recall-opt${cls}`} onClick={() => pick(i)} disabled={show}>
                    {opt.text}
                    {show && opt.why ? <span class="recall-why">{opt.why}</span> : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {revealed ? (
                <div class="recall-answer">
                  <Markdown text={recall.answer ?? ''} lang={card.language} />
                </div>
              ) : (
                <button class="btn btn-primary" onClick={() => setRevealed(true)}>
                  Show answer
                </button>
              )}
              {revealed && !done ? (
                <div class="grade-row">
                  <button class="btn" onClick={() => grade(1)}>
                    Nope
                  </button>
                  <button class="btn" onClick={() => grade(2)}>
                    Almost
                  </button>
                  <button class="btn btn-primary" onClick={() => grade(3)}>
                    Got it
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {done ? (
            <p style={{ marginTop: '20px' }}>
              <button class="btn" onClick={() => goTo(app.cursor + 1)}>
                Keep reading
              </button>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
