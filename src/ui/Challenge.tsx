/**
 * The solution to a puzzle card, behind a gentle read gate.
 *
 * Locked until the reader has either spent a fair while on the card or scrolled
 * the body to the end; then "Show me the solution" folds the answer down and
 * offers a one-shot self-grade ("I had it" / "Not quite" / "Just curious").
 * A grade is an ordinary `recall` event with `data.solution: true`, so the fold
 * schedules the card with FSRS and a miss comes back as a re-read.
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Card } from '@/types';
import { app, dwellMs, markRead } from '@/app/state';
import { Markdown } from './Markdown';
import { gradeRecall } from './actions';
import { haptic } from './anim';
import { useTick } from './hooks';
import { IconDown, IconRight } from './icons';

/** Reading pace used by every gate, in words per second. */
const WORDS_PER_SEC = 3.3;

/**
 * How long the reader must dwell before a gate opens: `share` of the expected
 * read time of the body, never less than `floorMs`.
 */
export function gateMs(bodyWords: number | undefined, share: number, floorMs: number): number {
  return Math.max(floorMs, share * ((bodyWords ?? 120) / WORDS_PER_SEC) * 1000);
}

/** A gate is open once the dwell passed `needMs`, or the body was scrolled to the end. */
export function gateOpen(cardId: string, needMs: number, atEnd: boolean): boolean {
  return atEnd || dwellMs(cardId) >= needMs;
}

const STOP = new Set(
  'a an the is are was were be of to in on at for and or but it its this that what which how do does did you your with by as from'.split(' '),
);

function words(s: string | undefined): Set<string> {
  const out = new Set<string>();
  for (const w of (s ?? '').toLowerCase().replace(/\$[^$]*\$/g, ' ').split(/[^\p{L}\p{N}]+/u)) {
    if (w && !STOP.has(w)) out.add(w);
  }
  return out;
}

function overlap(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / a.size;
}

/** Show the question only when it adds something the title and hook do not already say. */
export function questionAddsSomething(question: string | undefined, title: string, hook?: string): boolean {
  const q = words(question);
  if (!q.size) return false;
  return Math.max(overlap(q, words(title)), overlap(q, words(hook))) < 0.7;
}

type Outcome = null | 'right' | 'wrong' | 'curious';

interface ViewState {
  id: string;
  open: boolean;
  hint: boolean;
  outcome: Outcome;
}

const fresh = (id: string): ViewState => ({ id, open: false, hint: false, outcome: null });

interface Props {
  card: Card;
  active: boolean;
  /** the card body was scrolled to its end (lifted from CardShell) */
  atEnd?: boolean;
}

export function ChallengeSolution({ card, active, atEnd = false }: Props) {
  const recall = card.recall;
  // State is keyed by card id: the feed keeps sections mounted and swaps cards
  // under them, and a keyed state resets on the very render the id changes
  // (a reset effect would run a frame late and could undo a fast first tap).
  const [view, setView] = useState<ViewState>(() => fresh(card.id));
  const cur = view.id === card.id ? view : fresh(card.id);
  const { open, hint, outcome } = cur;
  const patch = (p: Partial<ViewState>) =>
    setView((v) => ({ ...(v.id === card.id ? v : fresh(card.id)), ...p }));
  const hintTimer = useRef<number | undefined>(undefined);

  const needMs = useMemo(() => gateMs(card.words?.body, 0.4, 8000), [card.id, card.words?.body]);
  // A puzzle the reader already read (from the Library, the Today card, a
  // revisit) needs no waiting: they have had their think.
  const seenBefore = useMemo(() => (app.engineState?.seen[card.id]?.views ?? 0) > 0, [card.id]);
  const locked = !open && !seenBefore && !gateOpen(card.id, needMs, atEnd);
  useTick(600, active && locked);

  useEffect(() => () => clearTimeout(hintTimer.current), [card.id]);

  if (!recall || recall.type !== 'reveal' || !recall.answer) return null;
  const answer = recall.answer;

  const toggle = () => {
    if (!open && !seenBefore && !gateOpen(card.id, needMs, atEnd)) {
      patch({ hint: true });
      clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => patch({ hint: false }), 2500) as unknown as number;
      return;
    }
    if (!open) {
      void markRead(card.id);
      haptic('tap');
    }
    patch({ open: !open, hint: false });
  };

  const grade = (o: Exclude<Outcome, null>) => {
    if (outcome) return;
    patch({ outcome: o });
    if (o === 'right') {
      gradeRecall(card.id, 3, true, { solution: true });
      haptic('success');
    } else if (o === 'wrong') {
      gradeRecall(card.id, 1, false, { solution: true });
    }
  };

  const showQuestion = questionAddsSomething(recall.question, card.title, card.hook);
  const isLocked = locked && !open;

  return (
    <div class="puzzle">
      {showQuestion ? (
        <div class="puzzle-question">
          <Markdown text={recall.question} lang={card.language} />
        </div>
      ) : null}
      <button
        class={`puzzle-btn${isLocked ? ' is-locked' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-disabled={isLocked}
        aria-label={open ? 'Hide the solution' : 'Show me the solution'}
      >
        {open ? 'Hide the solution' : 'Show me the solution'}
        {open ? <IconDown /> : <IconRight />}
      </button>
      {hint ? (
        <p class="puzzle-hint" role="status">
          Give it a minute first.
        </p>
      ) : null}
      {open ? (
        <div class="puzzle-panel">
          <Markdown text={answer} lang={card.language} />
          {outcome === null ? (
            <div class="puzzle-grade" role="group" aria-label="How did it go?">
              <button class="btn puzzle-grade-btn" onClick={() => grade('right')} aria-label="I had it">
                I had it
              </button>
              <button class="btn puzzle-grade-btn" onClick={() => grade('wrong')} aria-label="Not quite">
                Not quite
              </button>
              <button class="btn btn-ghost puzzle-grade-btn" onClick={() => grade('curious')} aria-label="Just curious">
                Just curious
              </button>
            </div>
          ) : outcome === 'right' ? (
            <p class="puzzle-after" role="status">
              Nice.
            </p>
          ) : outcome === 'wrong' ? (
            <p class="puzzle-after" role="status">
              Now you have seen it. It will come back around.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
