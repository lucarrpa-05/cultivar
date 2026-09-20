/** "New cards available · Tap to update" — shown when a new service worker is waiting. */
import { useApp } from '@/app/state';
import { applyUpdate } from '@/app/wiring';
import { IconRefresh } from './icons';

export function UpdatePill() {
  const ready = useApp((s) => s.updateReady);
  if (!ready) return null;
  return (
    <button class="update-pill" onClick={applyUpdate}>
      <IconRefresh style={{ width: '16px', height: '16px' }} />
      New cards available · Tap to update
    </button>
  );
}
