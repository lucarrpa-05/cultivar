/**
 * Map: domain tiles (level 1) → a layered prerequisite DAG per domain (level 2).
 * Node colour = mastery level in the domain's colour; locked nodes are dashed.
 */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { KnowledgeMapNode, TopicId } from '@/types';
import { app, record, setMapDomain, setTab, showToast, useApp } from '@/app/state';
import { friendlyDate, startOfDay } from '@/app/util';
import { cardMeta } from '@/content/loader';
import { accentStyle, domainInfo, nodeInfo } from './domain';
import { knowledgeMap, useEvents } from './useEvents';
import { Sheet } from './Sheets';
import { IconLock, IconRight, IconSearch } from './icons';

const LEVEL_LABEL = ['Unseen', 'Touched', 'Learning', 'Solid', 'Mastered'];

export function MapScreen() {
  const domain = useApp((s) => s.mapDomain);
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [query, setQuery] = useState('');
  const nodes = knowledgeMap();
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return (app.taxonomy?.nodes ?? [])
      .filter((n) => n.name.toLowerCase().includes(q) || n.id.includes(q))
      .slice(0, 24);
  }, [query, app.taxonomy]);

  return (
    <div class={domain && !query ? 'screen' : 'scroll'} style={{ height: '100%' }}>
      {domain && !query ? (
        <MapGraph
          domain={domain}
          nodes={nodes}
          onBack={() => setMapDomain(null)}
          onPick={setTopic}
          query={query}
          setQuery={setQuery}
        />
      ) : (
        <>
          <h1 class="screen-title">Map</h1>
          <SearchBox value={query} onInput={setQuery} />
          {hits.length ? (
            <div class="search-results">
              {hits.map((n) => (
                <button
                  key={n.id}
                  class="search-hit"
                  onClick={() => {
                    setQuery('');
                    setMapDomain(n.id.split('.')[0] ?? null);
                    setTopic(n.id);
                  }}
                >
                  <b>{n.name}</b>
                  <span class="small dim">
                    {' '}
                    · {domainInfo(n.id.split('.')[0] ?? '')?.name ?? ''}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <MapDomains nodes={nodes} />
          )}
        </>
      )}

      {topic ? <TopicSheet id={topic} node={byId.get(topic)} onClose={() => setTopic(null)} /> : null}
    </div>
  );
}

function SearchBox({ value, onInput }: { value: string; onInput: (v: string) => void }) {
  return (
    <div class="row" style={{ marginBottom: '14px' }}>
      <IconSearch style={{ width: '18px', height: '18px', color: 'var(--fg-dim)' }} />
      <input
        class="field"
        type="search"
        placeholder="Search topics"
        value={value}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}

// ── level 1 ────────────────────────────────────────────────────────────────

function MapDomains({ nodes }: { nodes: KnowledgeMapNode[] }) {
  const events = useEvents();
  const domains = app.taxonomy?.domains ?? [];
  const weekly = useMemo(() => weeklyByDomain(events), [events]);

  return (
    <div class="domain-grid">
      {domains.map((d) => {
        const node = nodes.find((n) => n.id === d.id);
        const topics = nodes.filter((n) => n.kind === 'topic' && n.id.startsWith(`${d.id}.`));
        // "Touched" means the reader has actually read a card there, not prior knowledge.
        const touched = topics.filter((t) => t.cardsSeen > 0).length;
        return (
          <button key={d.id} class="domain-tile" style={accentStyle(d.id)} onClick={() => setMapDomain(d.id)}>
            <span class="glyph" aria-hidden="true">
              {d.glyph}
            </span>
            <h3>{d.name}</h3>
            <div class="bar">
              <i style={{ width: `${Math.round((node?.mastery ?? 0) * 100)}%` }} />
            </div>
            <span class="small dim">
              {touched} of {topics.length} topics touched
            </span>
            <Sparkline values={weekly.get(d.id) ?? new Array(8).fill(0)} />
          </button>
        );
      })}
    </div>
  );
}

function weeklyByDomain(events: { t: number; type: string; card?: string }[]): Map<string, number[]> {
  const out = new Map<string, number[]>();
  const now = startOfDay(Date.now());
  for (const ev of events) {
    if (ev.type !== 'view' || !ev.card) continue;
    const domain = cardMeta(ev.card)?.domain ?? ev.card.split('.')[0];
    if (!domain) continue;
    const week = Math.floor((now - startOfDay(ev.t)) / (7 * 86_400_000));
    if (week < 0 || week > 7) continue;
    const arr = out.get(domain) ?? new Array(8).fill(0);
    arr[7 - week] += 1;
    out.set(domain, arr);
  }
  return out;
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const pts = values
    .map((v, i) => `${(i / Math.max(1, values.length - 1)) * 100},${22 - (v / max) * 20}`)
    .join(' ');
  return (
    <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" stroke="currentColor" stroke-width="1.6" vector-effect="non-scaling-stroke" />
    </svg>
  );
}

// ── level 2 ────────────────────────────────────────────────────────────────

interface GraphProps {
  domain: string;
  nodes: KnowledgeMapNode[];
  onBack: () => void;
  onPick: (id: TopicId) => void;
  query: string;
  setQuery: (v: string) => void;
}

interface Placed {
  node: KnowledgeMapNode;
  x: number;
  y: number;
}

const NODE_W = 132;
const NODE_H = 34;
/** The toolbar floats over the graph, so the first row of nodes starts below it. */
const GRAPH_TOP = 64;
const COL = 186;
const ROW = 50;

function MapGraph({ domain, nodes, onBack, onPick, query, setQuery }: GraphProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ x: 12, y: GRAPH_TOP, k: 1 });
  const drag = useRef({ active: false, captured: false, x: 0, y: 0, ox: 0, oy: 0, dist: 0, k: 1 });

  const { placed, edges, width, height } = useMemo(() => layout(domain, nodes), [domain, nodes]);

  useEffect(() => {
    setView({ x: 12, y: GRAPH_TOP, k: 1 });
  }, [domain]);

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { ...drag.current, active: true, captured: false, x: e.clientX, y: e.clientY, ox: view.x, oy: view.y };
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.captured) {
      // Capture only once this is really a pan. Capturing on pointerdown
      // retargets the pointer to the <svg>, and then the browser fires `click`
      // there instead of on the node — which silently kills tapping a topic.
      if (Math.hypot(dx, dy) < 6) return;
      drag.current.captured = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    setView((v) => ({ ...v, x: drag.current.ox + dx, y: drag.current.oy + dy }));
  };
  const onPointerUp = () => {
    drag.current.active = false;
    drag.current.captured = false;
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    setView((v) => ({ ...v, k: Math.max(0.4, Math.min(2.4, v.k * (e.deltaY > 0 ? 0.92 : 1.08))) }));
  };

  // pinch
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const points = new Map<number, { x: number; y: number }>();
    let startDist = 0;
    let startK = 1;
    const down = (e: PointerEvent) => {
      points.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (points.size === 2) {
        const [a, b] = [...points.values()];
        startDist = Math.hypot(a.x - b.x, a.y - b.y);
        startK = view.k;
        drag.current.active = false;
      }
    };
    const move = (e: PointerEvent) => {
      if (!points.has(e.pointerId)) return;
      points.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (points.size === 2 && startDist > 0) {
        const [a, b] = [...points.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        setView((v) => ({ ...v, k: Math.max(0.4, Math.min(2.4, (startK * dist) / startDist)) }));
      }
    };
    const up = (e: PointerEvent) => {
      points.delete(e.pointerId);
      if (points.size < 2) startDist = 0;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [view.k]);

  const info = domainInfo(domain);
  const color = info?.color ?? 'var(--accent)';

  return (
    <div class="graph-wrap" ref={wrap} style={accentStyle(domain)}>
      <div class="map-toolbar">
        <button class="btn" onClick={onBack} aria-label="Back to domains">
          ← {info?.name ?? domain}
        </button>
        <input
          class="field"
          type="search"
          placeholder="Search topics"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
      </div>

      <svg
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        role="application"
        aria-label={`${info?.name ?? domain} prerequisite map`}
      >
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          {edges.map((e) => (
            <path key={e.key} class={`edge${e.locked ? ' locked' : ''}`} d={e.d} />
          ))}
          {placed.map(({ node, x, y }) => {
            const fill = node.level === 0 ? 'transparent' : color;
            const opacity = [0, 0.18, 0.34, 0.55, 0.8][node.level] ?? 0.2;
            const glow = !node.unlocked && unlocksNext(node);
            return (
              <g
                key={node.id}
                class={`node-box${glow ? ' node-glow' : ''}`}
                transform={`translate(${x} ${y})`}
                onClick={() => onPick(node.id)}
              >
                <rect
                  class="plate"
                  width={NODE_W}
                  height={NODE_H}
                  rx="9"
                  fill={fill}
                  fill-opacity={opacity}
                  stroke={node.level === 0 ? 'var(--line)' : color}
                  stroke-dasharray={node.unlocked ? undefined : '4 3'}
                />
                <text class="node-label" x="9" y={NODE_H / 2 + 3.5}>
                  {truncate(node.name, 20)}
                </text>
                {!node.unlocked ? (
                  <text class="node-label" x={NODE_W - 14} y={NODE_H / 2 + 4} aria-hidden="true">
                    🔒
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
        <rect width={width} height={height} fill="none" />
      </svg>

      <div class="map-legend">
        {LEVEL_LABEL.map((l, i) => (
          <span key={l}>
            <svg width="9" height="9" style={{ marginRight: '3px' }}>
              <rect
                width="9"
                height="9"
                rx="2"
                fill={i === 0 ? 'transparent' : color}
                fill-opacity={[0, 0.18, 0.34, 0.55, 0.8][i]}
                stroke={i === 0 ? 'var(--line)' : color}
              />
            </svg>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function unlocksNext(node: KnowledgeMapNode): boolean {
  const weak = node.prereqs.filter((p) => (app.engineState?.topics[p]?.mastery ?? 0) < 0.25);
  return weak.length === 1;
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function layout(domain: string, nodes: KnowledgeMapNode[]) {
  const inDomain = nodes.filter((n) => n.id.startsWith(`${domain}.`) && n.kind !== 'domain');
  const byId = new Map(inDomain.map((n) => [n.id, n]));
  const depth = new Map<string, number>();

  const depthOf = (id: string, seen = new Set<string>()): number => {
    const cached = depth.get(id);
    if (cached !== undefined) return cached;
    if (seen.has(id)) return 0;
    seen.add(id);
    const node = byId.get(id);
    const prereqs = (node?.prereqs ?? []).filter((p) => byId.has(p));
    const d = prereqs.length ? Math.max(...prereqs.map((p) => depthOf(p, seen))) + 1 : 0;
    depth.set(id, d);
    return d;
  };

  const layers = new Map<number, KnowledgeMapNode[]>();
  for (const n of inDomain) {
    const d = depthOf(n.id);
    const arr = layers.get(d) ?? [];
    arr.push(n);
    layers.set(d, arr);
  }

  const pos = new Map<string, { x: number; y: number }>();
  const placed: Placed[] = [];
  for (const [d, list] of [...layers.entries()].sort((a, b) => a[0] - b[0])) {
    list.sort((a, b) => a.id.localeCompare(b.id));
    list.forEach((node, i) => {
      const x = d * COL;
      const y = i * ROW;
      pos.set(node.id, { x, y });
      placed.push({ node, x, y });
    });
  }

  const edges: { key: string; d: string; locked: boolean }[] = [];
  for (const n of inDomain) {
    for (const p of n.prereqs) {
      const from = pos.get(p);
      const to = pos.get(n.id);
      if (!from || !to) continue;
      const x1 = from.x + NODE_W;
      const y1 = from.y + NODE_H / 2;
      const x2 = to.x;
      const y2 = to.y + NODE_H / 2;
      const mid = (x1 + x2) / 2;
      edges.push({
        key: `${p}->${n.id}`,
        d: `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
        locked: !n.unlocked,
      });
    }
  }

  const width = ([...layers.keys()].length + 1) * COL;
  const height = Math.max(...[...layers.values()].map((l) => l.length), 1) * ROW + 40;
  return { placed, edges, width, height };
}

// ── topic sheet ────────────────────────────────────────────────────────────

function TopicSheet({ id, node, onClose }: { id: TopicId; node?: KnowledgeMapNode; onClose: () => void }) {
  const tax = nodeInfo(id);
  const topicState = useApp((s) => s.engineState?.topics[id]);
  const focus = useApp((s) => s.engineState?.focus);
  const level = node?.level ?? 0;
  const mastery = node?.mastery ?? topicState?.mastery ?? 0;
  const lastSeen = topicState?.lastServed;
  const emptyTopic = (node?.cardsTotal ?? 0) === 0;

  const missing = (node?.prereqs ?? []).filter((p) => (app.engineState?.topics[p]?.mastery ?? 0) < 0.25);

  return (
    <Sheet title={tax?.name ?? id} onClose={onClose}>
      {tax?.blurb ? <p class="muted">{tax.blurb}</p> : null}
      <p class="small">
        {LEVEL_LABEL[level]} · {node ? `${node.cardsSeen} of ${node.cardsTotal} cards` : 'no cards yet'}
        {lastSeen ? ` · last seen ${friendlyDate(lastSeen)}` : ''}
      </p>
      <div class="bar" style={{ margin: '10px 0 14px' }}>
        <i style={{ width: `${Math.round(mastery * 100)}%` }} />
      </div>

      {node && !node.unlocked && missing.length ? (
        <p class="small muted">
          <IconLock style={{ width: '14px', height: '14px', verticalAlign: '-2px' }} /> Locked: needs{' '}
          {missing
            .map((p) => `${nodeInfo(p)?.name ?? p} (you're at ${Math.round((app.engineState?.topics[p]?.mastery ?? 0) * 100)}%)`)
            .join(', ')}
          .
        </p>
      ) : null}

      {(node?.prereqs ?? []).length ? (
        <div class="chips" style={{ marginTop: '10px' }}>
          {node?.prereqs.map((p) => (
            <span class="chip" key={p}>
              {nodeInfo(p)?.name ?? p} · {Math.round((app.engineState?.topics[p]?.mastery ?? 0) * 100)}%
            </span>
          ))}
        </div>
      ) : null}

      {emptyTopic ? (
        <p class="small muted" role="status">Nothing on {tax?.name?.toLowerCase() ?? 'this topic'} yet. More cards are coming.</p>
      ) : null}
      <button
        class="btn btn-primary btn-block"
        style={{ marginTop: '16px' }}
        onClick={() => {
          void record('focus', { topic: id, data: { topic: id, available: !emptyTopic } });
          onClose();
          if (emptyTopic) showToast(`Nothing on ${tax?.name?.toLowerCase() ?? 'this topic'} yet.`);
          else setTab('feed');
        }}
      >
        Explore this <IconRight />
      </button>
      {focus ? (
        <button
          class="btn btn-ghost btn-block"
          style={{ marginTop: '8px' }}
          onClick={() => {
            void record('focus', { data: { topic: null } });
            onClose();
          }}
        >
          Clear focus
        </button>
      ) : null}
    </Sheet>
  );
}
