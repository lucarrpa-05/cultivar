/** Settings: Sync · Backup · Reading · Appearance · About · Danger zone. */
import { useEffect, useState } from 'preact/hooks';
import type { SyncConfig } from '@/types';
import {
  app,
  exportBackup,
  forgetSync,
  importBackup,
  patchSettings,
  pullSync,
  pushSync,
  resetAll,
  resetReadingHistory,
  saveSyncConfig,
  showToast,
  useApp,
} from '@/app/state';
import { friendlyDate } from '@/app/util';
import { publicRepoUrl } from './actions';

export function SettingsPanel() {
  return (
    <>
      <SyncSettings />
      <BackupSettings />
      <ReadingSettings />
      <AppearanceSettings />
      <AboutPanel />
      <DangerZone />
    </>
  );
}

// ── sync ───────────────────────────────────────────────────────────────────

export function SyncSettings() {
  const cfg = useApp((s) => s.syncConfig);
  const status = useApp((s) => s.syncStatus);
  const hasSync = useApp((s) => Boolean(s.sync));
  const [draft, setDraft] = useState<SyncConfig>({ owner: '', repo: '', token: '' });
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (cfg) setDraft({ ...cfg });
  }, [cfg?.owner, cfg?.repo]);

  const run = async (label: string, fn: () => Promise<void>) => {
    setBusy(label);
    try {
      await fn();
    } finally {
      setBusy('');
    }
  };

  return (
    <div class="card-panel">
      <h3>Sync</h3>
      <p class="small muted" style={{ marginTop: 0 }}>
        Your history syncs to a private GitHub repo. The token stays on this device.
      </p>

      <label class="field-label" for="sync-owner">
        Owner
      </label>
      <input
        id="sync-owner"
        class="field"
        value={draft.owner}
        placeholder="your-github-user"
        onInput={(e) => setDraft({ ...draft, owner: (e.target as HTMLInputElement).value.trim() })}
      />
      <label class="field-label" for="sync-repo" style={{ marginTop: '10px' }}>
        Repo
      </label>
      <input
        id="sync-repo"
        class="field"
        value={draft.repo}
        placeholder="cultivar-data"
        onInput={(e) => setDraft({ ...draft, repo: (e.target as HTMLInputElement).value.trim() })}
      />
      <label class="field-label" for="sync-token" style={{ marginTop: '10px' }}>
        Fine-grained token (Contents: read and write)
      </label>
      <input
        id="sync-token"
        class="field"
        type="password"
        autocomplete="off"
        value={draft.token}
        placeholder="github_pat_…"
        onInput={(e) => setDraft({ ...draft, token: (e.target as HTMLInputElement).value.trim() })}
      />

      <div class="row" style={{ marginTop: '12px', flexWrap: 'wrap' }}>
        <button
          class="btn"
          disabled={!hasSync || !!busy}
          onClick={() =>
            run('test', async () => {
              await saveSyncConfig(draft);
              const res = await app.sync?.test();
              setMessage(res?.message ?? 'No sync module in this build.');
            })
          }
        >
          {busy === 'test' ? 'Testing…' : 'Test'}
        </button>
        <button
          class="btn btn-primary"
          disabled={!!busy}
          onClick={() =>
            run('save', async () => {
              await saveSyncConfig(draft);
              setMessage('Saved on this device.');
            })
          }
        >
          Save
        </button>
        <button
          class="btn btn-ghost"
          disabled={!!busy}
          onClick={() =>
            run('forget', async () => {
              await forgetSync();
              setDraft({ owner: '', repo: '', token: '' });
              setMessage('Token removed from this device.');
            })
          }
        >
          Forget
        </button>
      </div>

      <p class={`status-line${status?.error ? ' is-error' : ''}`}>
        {!hasSync
          ? 'Sync is not available in this build yet.'
          : status?.error
            ? status.error
            : status?.lastPush
              ? `Last push ${friendlyDate(status.lastPush)} · ${status.pendingEvents} waiting`
              : 'Not synced yet.'}
        {message ? ` · ${message}` : ''}
      </p>

      <div class="row" style={{ flexWrap: 'wrap' }}>
        <button class="btn" disabled={!hasSync || !!busy} onClick={() => run('push', () => pushSync())}>
          {busy === 'push' ? 'Syncing…' : 'Sync now'}
        </button>
        <button
          class="btn btn-ghost"
          disabled={!hasSync || !!busy}
          onClick={() =>
            run('restore', async () => {
              const restore = (app.sync as unknown as { restore?: () => Promise<{ merged: number }> })?.restore;
              const merged = restore ? (await restore.call(app.sync)).merged : await pullSync();
              showToast(merged ? `Restored ${merged} events. Reloading.` : 'Nothing new in the repo.');
              if (merged) setTimeout(() => location.reload(), 900);
            })
          }
        >
          Restore from repo
        </button>
      </div>
      {app.degradedStore ? (
        <p class="small dim">This browser blocked local storage, so history is kept in memory only.</p>
      ) : null}
    </div>
  );
}

// ── backup ─────────────────────────────────────────────────────────────────

function BackupSettings() {
  return (
    <div class="card-panel">
      <h3>Backup</h3>
      <div class="row">
        <button class="btn" onClick={() => void exportBackup()}>
          Export
        </button>
        <label class="btn btn-ghost">
          Import
          <input
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) void importBackup(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}

// ── reading ────────────────────────────────────────────────────────────────

function ReadingSettings() {
  const s = useApp((st) => st.engineState?.settings);
  const spanish = Math.round((s?.spanishShare ?? 0.12) * 100);
  const goal = s?.goalMinutes ?? 10;

  return (
    <div class="card-panel">
      <h3>Reading</h3>

      <div class="setting">
        <label for="es-share">Spanish share · {spanish}%</label>
        <input
          id="es-share"
          type="range"
          min="0"
          max="30"
          step="1"
          value={spanish}
          onChange={(e) => void patchSettings({ spanishShare: Number((e.target as HTMLInputElement).value) / 100 })}
        />
      </div>

      <div class="setting">
        <label>Quick ones</label>
        <div class="seg">
          {(['auto', 'less', 'more', 'off'] as const).map((v) => (
            <button
              key={v}
              aria-pressed={(s?.quizFrequency ?? 'auto') === v}
              onClick={() => void patchSettings({ quizFrequency: v })}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div class="setting">
        <label for="goal">Daily goal · {goal} min</label>
        <input
          id="goal"
          type="range"
          min="5"
          max="30"
          step="1"
          value={goal}
          onChange={(e) => void patchSettings({ goalMinutes: Number((e.target as HTMLInputElement).value) })}
        />
      </div>
    </div>
  );
}

// ── appearance ─────────────────────────────────────────────────────────────

function AppearanceSettings() {
  const s = useApp((st) => st.engineState?.settings);
  return (
    <div class="card-panel">
      <h3>Appearance</h3>

      <div class="setting">
        <label>Theme</label>
        <div class="seg">
          {(['dark', 'light', 'system'] as const).map((v) => (
            <button key={v} aria-pressed={(s?.theme ?? 'dark') === v} onClick={() => void patchSettings({ theme: v })}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div class="setting">
        <label>Text size</label>
        <div class="seg">
          {(['S', 'M', 'L'] as const).map((v) => (
            <button key={v} aria-pressed={(s?.textSize ?? 'M') === v} onClick={() => void patchSettings({ textSize: v })}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div class="setting">
        <label for="reduce-motion">Reduce motion</label>
        <input
          id="reduce-motion"
          type="checkbox"
          checked={Boolean(s?.reduceMotion)}
          onChange={(e) => void patchSettings({ reduceMotion: (e.target as HTMLInputElement).checked })}
        />
      </div>

      <div class="setting">
        <label for="show-why">Show why a card was chosen</label>
        <input
          id="show-why"
          type="checkbox"
          checked={s?.showWhy ?? true}
          onChange={(e) => void patchSettings({ showWhy: (e.target as HTMLInputElement).checked })}
        />
      </div>
    </div>
  );
}

// ── about ──────────────────────────────────────────────────────────────────

function AboutPanel() {
  const builtAt = useApp((s) => s.builtAt);
  const count = useApp((s) => s.cardCount);
  return (
    <div class="card-panel">
      <h3>About</h3>
      <p class="small muted" style={{ margin: 0 }}>
        Cultivar {typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''} · {count} cards
        {builtAt ? ` · content built ${friendlyDate(Date.parse(builtAt))}` : ''}
      </p>
      <p class="small" style={{ marginBottom: 0 }}>
        <a href={`${publicRepoUrl()}/issues/new`} target="_blank" rel="noopener noreferrer">
          Report a bug ↗
        </a>
      </p>
    </div>
  );
}

// ── danger zone ────────────────────────────────────────────────────────────

function ResetReading() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div class="card-panel">
      <h3>Mark everything unread</h3>
      {!open ? (
        <button class="btn" onClick={() => setOpen(true)}>
          Reset reading history
        </button>
      ) : (
        <>
          <p class="small muted">
            Clears every read, like, quiz and streak on this phone and in your data repo, so you start fresh. Your
            token and settings stay.
          </p>
          <div class="row" style={{ marginTop: '10px' }}>
            <button
              class="btn btn-danger"
              disabled={busy}
              onClick={() => {
                setBusy(true);
                void resetReadingHistory().then((r) => setMsg(r.message));
              }}
            >
              {busy ? 'Resetting…' : 'Yes, mark everything unread'}
            </button>
            <button class="btn btn-ghost" disabled={busy} onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
          {msg ? <p class="small muted">{msg}</p> : null}
        </>
      )}
    </div>
  );
}

function DangerZone() {
  const [typed, setTyped] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div class="card-panel">
      <ResetReading />
      <h3>Danger zone</h3>
      {!open ? (
        <button class="btn btn-danger" onClick={() => setOpen(true)}>
          Reset all local data
        </button>
      ) : (
        <>
          <p class="small muted">
            This deletes every event, snapshot and setting on this device. If sync is on, the repo still has your
            history. Type <b>reset</b> to confirm.
          </p>
          <input class="field" value={typed} onInput={(e) => setTyped((e.target as HTMLInputElement).value)} />
          <div class="row" style={{ marginTop: '10px' }}>
            <button class="btn btn-danger" disabled={typed.trim().toLowerCase() !== 'reset'} onClick={() => void resetAll()}>
              Reset
            </button>
            <button class="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
