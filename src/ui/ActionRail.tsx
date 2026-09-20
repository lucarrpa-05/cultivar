/** The four thumb-zone actions plus the ⋯ sheet. Labels are real; gestures are extras. */
import { useState } from 'preact/hooks';
import type { CardId } from '@/types';
import { openSheet, useApp } from '@/app/state';
import { isLiked, isSaved, skipCard, toggleLike, toggleSave, tooEasy, tooHard } from './actions';
import { useLongPress } from './hooks';
import { IconBookmark, IconDots, IconHeart, IconPeak, IconSkip } from './icons';

interface Props {
  cardId: CardId;
  host: HTMLElement | null;
}

export function ActionRail({ cardId, host }: Props) {
  const liked = useApp(() => isLiked(cardId));
  const saved = useApp(() => isSaved(cardId));
  const [secondary, setSecondary] = useState(false);
  const long = useLongPress(() => setSecondary(true));

  return (
    <div class="rail">
      {secondary ? (
        <button
          class="btn small"
          style={{ padding: '7px 12px' }}
          onClick={() => {
            setSecondary(false);
            tooEasy(cardId);
          }}
        >
          Too easy
        </button>
      ) : null}

      <button
        class={`rail-btn${liked ? ' is-on' : ''}`}
        aria-label={liked ? 'Liked' : 'Like'}
        aria-pressed={liked}
        onClick={(e) => toggleLike(cardId, host, e.clientX, e.clientY)}
      >
        <IconHeart filled={liked} />
      </button>

      <button
        class={`rail-btn${saved ? ' is-on' : ''}`}
        aria-label={saved ? 'Saved' : 'Save'}
        aria-pressed={saved}
        onClick={(e) => toggleSave(cardId, e.clientX, e.clientY)}
      >
        <IconBookmark filled={saved} />
      </button>

      <button class="rail-btn" aria-label="Not for me" onClick={() => skipCard(cardId)}>
        <IconSkip />
      </button>

      <button
        class="rail-btn"
        aria-label="Too advanced"
        {...long}
        onClick={() => {
          if (long.didLongPress()) return;
          tooHard(cardId);
        }}
      >
        <IconPeak />
      </button>

      <button
        class="rail-btn is-more"
        aria-label="More actions"
        onClick={() => openSheet({ kind: 'more', card: cardId })}
      >
        <IconDots />
      </button>
    </div>
  );
}
