/**
 * The knowledge map (ENGINE.md §18).
 *
 * One flat array of nodes — domains, areas, topics — with everything the map
 * screen needs to draw and to answer "what's next": mastery, level, whether the
 * node is unlocked, and, for the locked ones, whether a single prerequisite is
 * the only thing standing in the way.
 */

import type { EngineState, KnowledgeMapNode, TopicId } from '../types.ts';
import type { EngineContext } from './context.ts';
import { createMasteryView } from './mastery.ts';
import { nextUnlock } from './readiness.ts';

export function knowledgeMap(state: EngineState, ctx: EngineContext, now?: number): KnowledgeMapNode[] {
  const at = now === undefined ? ctx.now() : now;
  const mv = createMasteryView(state, ctx, at);

  const seenUnder: Record<string, number> = {};
  for (const id of Object.keys(state.seen)) {
    const card = ctx.cards.byId(id);
    if (!card) continue;
    const marked: Record<string, true> = {};
    const topics: TopicId[] = [card.topic];
    if (card.topics) for (const t of card.topics) topics.push(t);
    for (const t of topics) {
      for (const anc of ctx.graph.ancestors(t)) {
        if (marked[anc]) continue;
        marked[anc] = true;
        seenUnder[anc] = (seenUnder[anc] || 0) + 1;
      }
    }
  }

  const out: KnowledgeMapNode[] = [];
  const emit = (id: TopicId, kind: 'domain' | 'area' | 'topic') => {
    const unlocked = mv.unlocked(id);
    const node: KnowledgeMapNode = {
      id,
      kind,
      name: ctx.graph.name(id),
      mastery: mv.of(id),
      level: mv.level(id),
      unlocked,
      cardsTotal: ctx.cards.under(id).length,
      cardsSeen: seenUnder[id] || 0,
      prereqs: ctx.graph.prereqs(id),
      children: ctx.graph.children(id),
    };
    const domainMeta = ctx.graph.domainMeta(ctx.graph.domain(id));
    if (domainMeta) node.color = domainMeta.color;
    if (!unlocked) {
      const blocker = nextUnlock(id, ctx, mv);
      if (blocker) {
        node.unlockedNext = true;
        node.blockedBy = blocker;
      }
    }
    out.push(node);
  };

  for (const d of ctx.graph.domainIds) emit(d, 'domain');
  for (const a of ctx.graph.areaIds) emit(a, 'area');
  for (const t of ctx.graph.topicIds) emit(t, 'topic');
  return out;
}
