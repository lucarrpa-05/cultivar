/** You: streak, today, four charts, milestones, monthly recap, settings. */
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useApp } from '@/app/state';
import { cardMeta, loadRecap } from '@/content/loader';
import { dayKey, minutesLabel, monthKey, monthName } from '@/app/util';
import { GoalRing } from './GoalRing';
import { Markdown } from './Markdown';
import { DomainsChart, MasteryChart, MinutesChart, RecallChart } from './Charts';
import { SettingsPanel } from './SettingsPanel';
import { useEvents } from './useEvents';
import { domainInfo, topicName } from './domain';

const MILESTONES: [string, string][] = [
  ['first-10-cards', 'Ten cards'],
  ['first-like', 'First like'],
  ['first-rigor', 'First rigor'],
  ['first-too-hard', 'Found a gap'],
  ['first-callback', 'First callback'],
  ['first-revisit-solved', 'Revisit solved'],
  ['streak-7', '7-day streak'],
  ['streak-30', '30-day streak'],
  ['streak-100', '100 days'],
  ['cards-100', '100 cards'],
  ['cards-500', '500 cards'],
  ['cards-1000', '1000 cards'],
  ['first-binge', 'A long sitting'],
  ['all-domains', 'All domains'],
  ['recall-streak-10', '10 recalls'],
];

export function YouScreen() {
  const streak = useApp((s) => s.engineState?.streak);
  const metrics = useApp((s) => s.engineState?.metrics);
  const milestones = useApp((s) => s.engineState?.milestones ?? []);
  const minutes = useApp((s) => s.liveMinutes);
  const goal = useApp((s) => s.engineState?.settings.goalMinutes ?? 10);
  const events = useEvents();

  const today = useMemo(() => {
    const key = dayKey();
    let cards = 0;
    let likes = 0;
    for (const ev of events) {
      if (dayKey(ev.t) !== key) continue;
      if (ev.type === 'view') cards++;
      if (ev.type === 'like') likes++;
    }
    return { cards, likes };
  }, [events]);

  return (
    <div class="scroll">
      <h1 class="screen-title">You</h1>

      <div class="streak-head">
        <GoalRing progress={goal ? minutes / goal : 0} size={62} label={`${Math.round(minutes)} of ${goal} minutes today`} />
        <div class="grow">
          <div class="streak-num">{streak?.current ?? 0}</div>
          <p class="small muted" style={{ margin: 0 }}>
            {streak?.current === 1 ? 'day' : 'days'} · best {streak?.best ?? 0}
            {streak?.freezes ? ` · ${'❄'.repeat(streak.freezes)} banked` : ''}
          </p>
          {streak && streak.current === 0 && streak.best > 0 ? (
            <p class="small dim" style={{ margin: 0 }}>
              New streak starts today. Your best is {streak.best}.
            </p>
          ) : null}
        </div>
      </div>

      <div class="stat-row">
        <div class="stat">
          <b>{minutesLabel(minutes)}</b>
          <span>today</span>
        </div>
        <div class="stat">
          <b>{today.cards}</b>
          <span>cards</span>
        </div>
        <div class="stat">
          <b>{today.likes}</b>
          <span>likes</span>
        </div>
      </div>

      <div class="card-panel">
        <h3>Minutes per day</h3>
        <MinutesChart events={events} />
      </div>
      <div class="card-panel">
        <h3>Cards per domain · 30 days</h3>
        <DomainsChart events={events} />
      </div>
      <div class="card-panel">
        <h3>Mastery by domain</h3>
        <MasteryChart events={events} />
      </div>
      <div class="card-panel">
        <h3>Recall · 14 days</h3>
        <RecallChart events={events} />
      </div>

      <div class="card-panel">
        <h3>Milestones</h3>
        <div class="milestone-grid">
          {MILESTONES.map(([id, label]) => (
            <div key={id} class={`ms${milestones.some((m) => m === id || m.startsWith(`${id}:`)) ? ' is-on' : ''}`}>
              {label}
            </div>
          ))}
        </div>
      </div>

      <Recap events={events} />

      {metrics ? (
        <p class="small dim" style={{ marginTop: '18px' }}>
          {metrics.cardsSeen} cards · {minutesLabel(metrics.totalMinutes)} · since {metrics.firstDay}
        </p>
      ) : null}

      <SettingsPanel />
    </div>
  );
}

function Recap({ events }: { events: { t: number; type: string; card?: string }[] }) {
  const month = monthKey();
  const [text, setText] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    void loadRecap(month).then((md) => {
      setText(md);
      setChecked(true);
    });
  }, [month]);

  const local = useMemo(() => {
    const since = Date.now() - 30 * 86_400_000;
    const domains = new Map<string, number>();
    const topics = new Map<string, number>();
    for (const ev of events) {
      if (ev.type !== 'view' || !ev.card || ev.t < since) continue;
      const meta = cardMeta(ev.card);
      const d = meta?.domain ?? ev.card.split('.')[0] ?? '';
      domains.set(d, (domains.get(d) ?? 0) + 1);
      if (meta?.topic) topics.set(meta.topic, (topics.get(meta.topic) ?? 0) + 1);
    }
    const top = [...domains.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    const grew = [...topics.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    return { top, grew };
  }, [events]);

  if (!checked) return null;

  return (
    <div class="card-panel">
      <h3>{monthName(month)}</h3>
      {text ? (
        <Markdown text={text} />
      ) : local.top.length ? (
        <>
          <p class="small muted" style={{ marginTop: 0 }}>
            A quick local read while the refresh writes the real one.
          </p>
          <p class="small">
            Mostly {local.top.map(([d]) => domainInfo(d)?.name ?? d).join(', ')}.
          </p>
          {local.grew.length ? (
            <p class="small">Growing: {local.grew.map(([t]) => topicName(t)).join(', ')}.</p>
          ) : null}
        </>
      ) : (
        <p class="small dim" style={{ margin: 0 }}>
          Your recap appears here after a few days of reading.
        </p>
      )}
    </div>
  );
}
