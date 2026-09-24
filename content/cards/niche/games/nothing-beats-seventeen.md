---
id: niche.games.puzzles.nothing-beats-seventeen
topic: niche.games.puzzles
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, tool]
tags: [bridge, torch, crossing, optimality, lower-bound, case-analysis]
hook: "Letting the fastest walker escort everyone takes 19 minutes. The fix is to hide the 5-minute walk inside the 10-minute one."
related: [niche.games.puzzles.bridge-and-torch]
answersQuestion: q-2026-09-20-vy5t
sources:
  - {title: "Crossing the Bridge at Night", author: "Günter Rote", year: 2002, type: paper, url: "https://page.mi.fu-berlin.de/rote/Papers/pdf/Crossing+the+bridge+at+night.pdf"}
  - {title: "Bridge and torch problem", type: wiki, url: "https://en.wikipedia.org/wiki/Bridge_and_torch_problem"}
dates: {written: 2026-09-23}
diagram: {file: niche/bridge-two-plans.svg, caption: "Both plans on one clock: escorting pays for the 5 and the 10 separately and runs out of torch; pairing them hides the 5 inside the 10.", alt: "Two minute timelines. Escort plan: 2, 1, 5, 1, 10, ending at 19, past a dashed line at 17. Slow-pair plan: 2, 1, 10, 2, 2, ending exactly at 17, its long block labelled 5 and 10."}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Seventeen is the best possible, and the slow pair is why

The schedule: 1 and 2 cross (2 minutes), 1 comes back (1), 5 and 10 cross together (10), 2 comes back (2), 1 and 2 cross again (2). Seventeen.

The obvious plan has the 1 escort everyone: 2 + 1 + 5 + 1 + 10 = 19. It pays for the 5 and the 10 separately. The 10's walk costs ten minutes regardless, so put the 5 on it and the 5's slowness vanishes. The catch is the torch: someone fast must already be waiting on the far side to bring it back, which is why 1 and 2 go first. You spend 2 + 2 to save 5 + 1.

Could a cleverer schedule get under 17? No, and three short cases prove it.

## Rigor

First, some bookkeeping. Trips alternate forward and back, starting and ending forward. A forward trip moves at most two people and a back trip returns at least one, so four people need at least three forward trips and two back trips. Every trip costs at least 1.

**Case 1: 5 and 10 never cross forward together.** Their forward trips cost 10 and at least 5; one more forward trip and two back trips add at least 3. Total $\ge 18$.

**Case 2: 5 or 10 ever walks back.** That walk costs at least 5, the 10's forward trip costs 10, and at least three other trips add 3. Total $\ge 18$.

**Case 3: 5 and 10 cross together once and never return.** Call that trip $T$. It is not the first trip, or 5 or 10 would have to bring the torch back. It is not the last, because whoever made the last back trip must cross again, on the last trip. So one back trip comes right before $T$ and one right after, both walked by people from $\{1,2\}$. Whoever walked back before $T$ is still on the near side after it, so the two walkers differ: they are 1 and 2, costing $1 + 2 = 3$. Since 2 walked back, 2 crosses forward twice, on trips other than $T$, each costing at least 2. Total $\ge 10 + 3 + 2 + 2 = 17$.

The cases cover every schedule, so 17 is optimal; "the 5 rides free" is Case 3. Rote (2002) solves the general puzzle. For four walkers with times $t_1 \le t_2 \le t_3 \le t_4$ the optimum is

$$\min\left(2t_1 + t_2 + t_3 + t_4,\ t_1 + 3t_2 + t_4\right),$$

so escorting wins exactly when $t_1 + t_3 < 2t_2$.

## Recall
type: mcq
Q: Same bridge, but the walkers now take 1, 4, 5 and 10 minutes. Which plan is fastest?
- [ ] 5 and 10 together, as before — the setup now costs two 4-minute walks, so it totals 23.
- [x] The 1 escorts everyone, 21 minutes — hiding the 5 still saves 5 + 1, but it now costs 4 + 4.
- [ ] They tie — the plans differ by $2t_2 - t_1 - t_3 = 2$ minutes, not zero.
