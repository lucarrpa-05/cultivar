/** Loads the raw event log for the charts and sparklines (cached for a minute). */
import { useEffect, useState } from 'preact/hooks';
import type { Event, KnowledgeMapNode } from '@/types';
import { app } from '@/app/state';

let cache: Event[] = [];
let cachedAt = 0;

export function useEvents(): Event[] {
  const [events, setEvents] = useState<Event[]>(cache);
  useEffect(() => {
    if (Date.now() - cachedAt < 60_000 && cache.length) {
      setEvents(cache);
      return;
    }
    let alive = true;
    void app.store
      ?.listEvents()
      .then((list) => {
        cache = list ?? [];
        cachedAt = Date.now();
        if (alive) setEvents(cache);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);
  return events;
}

export function invalidateEvents(): void {
  cachedAt = 0;
}

let mapCache: { count: number; nodes: KnowledgeMapNode[] } | null = null;

/** engine.map() is not cheap with 700 nodes; recompute only when events move. */
export function knowledgeMap(): KnowledgeMapNode[] {
  const count = app.engineState?.eventCount ?? -1;
  if (mapCache && mapCache.count === count) return mapCache.nodes;
  let nodes: KnowledgeMapNode[] = [];
  try {
    nodes = app.engine?.map() ?? [];
  } catch {
    nodes = [];
  }
  mapCache = { count, nodes };
  return nodes;
}
