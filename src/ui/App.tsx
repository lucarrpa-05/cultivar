/** App shell: tab router + the global overlays. */
import { useEffect } from 'preact/hooks';
import { app, jumpToCard, useApp } from '@/app/state';
import { Feed } from './Feed';
import { MapScreen } from './MapScreen';
import { SavedScreen } from './SavedScreen';
import { YouScreen } from './YouScreen';
import { TabBar } from './TabBar';
import { Toast } from './Toast';
import { SheetHost } from './Sheets';
import { UpdatePill } from './UpdatePill';

export function App() {
  const tab = useApp((s) => s.tab);
  const boot = useApp((s) => s.boot);

  // Deep link: #card=<id> opens that card next.
  useEffect(() => {
    if (boot !== 'ready') return;
    const match = /card=([^&]+)/.exec(location.hash);
    if (!match) return;
    const id = decodeURIComponent(match[1]);
    history.replaceState(null, '', location.pathname + location.search);
    if (app.feed.some((s) => s.id === id)) return;
    jumpToCard(id, 'progress', ['You opened a link']);
  }, [boot]);

  return (
    <>
      <UpdatePill />
      <main class="screen">
        {tab === 'feed' ? <Feed /> : null}
        {tab === 'map' ? <MapScreen /> : null}
        {tab === 'saved' ? <SavedScreen /> : null}
        {tab === 'you' ? <YouScreen /> : null}
      </main>
      <TabBar />
      <Toast />
      <SheetHost />
    </>
  );
}
