/** Four tabs in the thumb zone. The You tab carries the goal ring. */
import type { Tab } from '@/app/state';
import { setTab, useApp } from '@/app/state';
import { GoalRing } from './GoalRing';
import { IconFeed, IconMap, IconSaved, IconYou } from './icons';

const TABS: { id: Tab; label: string; Icon: (p: Record<string, unknown>) => preact.JSX.Element }[] = [
  { id: 'feed', label: 'Feed', Icon: IconFeed },
  { id: 'map', label: 'Map', Icon: IconMap },
  { id: 'saved', label: 'Saved', Icon: IconSaved },
  { id: 'you', label: 'You', Icon: IconYou },
];

export function TabBar() {
  const tab = useApp((s) => s.tab);
  const savedCount = useApp((s) => s.engineState?.saved.length ?? 0);
  const minutes = useApp((s) => s.liveMinutes);
  const goal = useApp((s) => s.engineState?.settings.goalMinutes ?? 10);

  return (
    <nav class="tabbar" role="tablist" aria-label="Sections">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          class="tab"
          data-tab={id}
          role="tab"
          aria-selected={tab === id}
          aria-label={label}
          onClick={() => setTab(id)}
        >
          {id === 'you' ? <GoalRing progress={goal ? minutes / goal : 0} /> : null}
          <Icon />
          {id === 'saved' && savedCount ? <span class="tab-badge">{savedCount}</span> : null}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
