/** Four small charts, hand-drawn in SVG. No chart library. */
import { useMemo } from 'preact/hooks';
import type { Event } from '@/types';
import { app } from '@/app/state';
import { cardMeta } from '@/content/loader';
import { dayKey, startOfDay } from '@/app/util';
import { knowledgeMap } from './useEvents';

const W = 300;
const H = 84;

function lastDays(n: number): string[] {
  const out: string[] = [];
  const today = startOfDay(Date.now());
  for (let i = n - 1; i >= 0; i--) out.push(dayKey(today - i * 86_400_000));
  return out;
}

/** Minutes of active reading per day, from view dwell. */
export function MinutesChart({ events }: { events: Event[] }) {
  const days = useMemo(() => lastDays(30), []);
  const byDay = useMemo(() => {
    const m = new Map<string, number>();
    for (const ev of events) {
      if (ev.type !== 'view') continue;
      const ms = Number(ev.data?.dwellMs ?? 0);
      if (!ms) continue;
      const k = dayKey(ev.t);
      m.set(k, (m.get(k) ?? 0) + ms / 60000);
    }
    return m;
  }, [events]);
  const values = days.map((d) => byDay.get(d) ?? 0);
  const max = Math.max(10, ...values);
  const goal = app.engineState?.settings.goalMinutes ?? 10;
  const bw = W / days.length;

  return (
    <svg class="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Minutes read per day, last 30 days">
      <line class="axis" x1="0" y1={H - 12} x2={W} y2={H - 12} />
      <line
        class="axis"
        x1="0"
        y1={H - 12 - (goal / max) * (H - 22)}
        x2={W}
        y2={H - 12 - (goal / max) * (H - 22)}
        stroke-dasharray="3 3"
        stroke="var(--accent)"
        opacity="0.5"
      />
      {values.map((v, i) => {
        const h = (v / max) * (H - 22);
        return (
          <rect
            key={i}
            class="barfill"
            x={i * bw + 1}
            y={H - 12 - h}
            width={Math.max(1.5, bw - 2)}
            height={Math.max(0, h)}
            rx="1.5"
            opacity={v >= goal ? 1 : 0.55}
          />
        );
      })}
      <text class="label" x="0" y={H - 2}>
        30 days ago
      </text>
      <text class="label" x={W} y={H - 2} text-anchor="end">
        today
      </text>
    </svg>
  );
}

/** Cards seen per domain over the last 30 days. */
export function DomainsChart({ events }: { events: Event[] }) {
  const cutoff = Date.now() - 30 * 86_400_000;
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const ev of events) {
      if (ev.type !== 'view' || ev.t < cutoff || !ev.card) continue;
      const d = cardMeta(ev.card)?.domain ?? ev.card.split('.')[0];
      if (d) m.set(d, (m.get(d) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [events]);

  if (!counts.length) return <p class="small dim">Nothing in the last 30 days yet.</p>;
  const max = Math.max(...counts.map((c) => c[1]));
  const rowH = 17;

  return (
    <svg
      class="chart"
      viewBox={`0 0 ${W} ${counts.length * rowH + 4}`}
      role="img"
      aria-label="Cards per domain, last 30 days"
    >
      {counts.map(([id, n], i) => {
        const d = app.taxonomy?.domains.find((x) => x.id === id);
        return (
          <g key={id} transform={`translate(0 ${i * rowH})`}>
            <text class="label" x="0" y="11">
              {d?.name ?? id}
            </text>
            <rect x="110" y="3" width={(n / max) * (W - 130)} height="10" rx="3" fill={d?.color ?? 'var(--accent)'} />
            <text class="label" x={W} y="11" text-anchor="end">
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Mastery by domain: now versus an estimate for 30 days ago
 * (mastery scaled by the share of views that happened before the cutoff).
 */
export function MasteryChart({ events }: { events: Event[] }) {
  const nodes = knowledgeMap().filter((n) => n.kind === 'domain');
  const cutoff = Date.now() - 30 * 86_400_000;
  const shares = useMemo(() => {
    const before = new Map<string, number>();
    const total = new Map<string, number>();
    for (const ev of events) {
      if (ev.type !== 'view' || !ev.card) continue;
      const d = cardMeta(ev.card)?.domain ?? ev.card.split('.')[0];
      if (!d) continue;
      total.set(d, (total.get(d) ?? 0) + 1);
      if (ev.t < cutoff) before.set(d, (before.get(d) ?? 0) + 1);
    }
    return { before, total };
  }, [events]);

  const rows = nodes.filter((n) => n.mastery > 0);
  if (!rows.length) return <p class="small dim">Mastery grows as you read.</p>;
  const rowH = 17;

  return (
    <svg class="chart" viewBox={`0 0 ${W} ${rows.length * rowH + 4}`} role="img" aria-label="Mastery by domain">
      {rows.map((n, i) => {
        const d = app.taxonomy?.domains.find((x) => x.id === n.id);
        const t = shares.total.get(n.id) ?? 0;
        const then = t ? n.mastery * ((shares.before.get(n.id) ?? 0) / t) : 0;
        return (
          <g key={n.id} transform={`translate(0 ${i * rowH})`}>
            <text class="label" x="0" y="11">
              {d?.name ?? n.id}
            </text>
            <rect x="110" y="3" width={Math.max(1, then * (W - 130))} height="10" rx="3" fill="var(--line)" />
            <rect
              x="110"
              y="5"
              width={Math.max(1, n.mastery * (W - 130))}
              height="6"
              rx="3"
              fill={d?.color ?? 'var(--accent)'}
            />
            <text class="label" x={W} y="11" text-anchor="end">
              {Math.round(n.mastery * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Recall accuracy over the last 14 days. */
export function RecallChart({ events }: { events: Event[] }) {
  const days = useMemo(() => lastDays(14), []);
  const byDay = useMemo(() => {
    const m = new Map<string, { n: number; ok: number }>();
    for (const ev of events) {
      if (ev.type !== 'recall') continue;
      const k = dayKey(ev.t);
      const rec = m.get(k) ?? { n: 0, ok: 0 };
      rec.n++;
      if (Number(ev.data?.grade ?? 0) >= 3) rec.ok++;
      m.set(k, rec);
    }
    return m;
  }, [events]);

  const points = days.map((d, i) => {
    const rec = byDay.get(d);
    return { i, value: rec && rec.n ? rec.ok / rec.n : null, n: rec?.n ?? 0 };
  });
  if (!points.some((p) => p.value !== null)) return <p class="small dim">No recall answers yet.</p>;

  const x = (i: number) => (i / (days.length - 1)) * (W - 16) + 8;
  const y = (v: number) => H - 14 - v * (H - 26);
  const line = points
    .filter((p) => p.value !== null)
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'}${x(p.i)} ${y(p.value as number)}`)
    .join(' ');

  return (
    <svg class="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Recall accuracy, last 14 days">
      <line class="axis" x1="0" y1={H - 14} x2={W} y2={H - 14} />
      <path d={line} fill="none" stroke="var(--accent)" stroke-width="1.8" />
      {points
        .filter((p) => p.value !== null)
        .map((p) => (
          <circle key={p.i} cx={x(p.i)} cy={y(p.value as number)} r="2.4" fill="var(--accent)" />
        ))}
      <text class="label" x="0" y={H - 3}>
        14 days ago
      </text>
      <text class="label" x={W} y={H - 3} text-anchor="end">
        today
      </text>
    </svg>
  );
}
