---
id: ai.rl.alphago-mcts.the-move-no-human-would-play
topic: ai.rl.alphago-mcts
format: story
difficulty: 1
language: en
weight: medium
angles: [human, weird, history]
tags: [alphago, move-37, lee-sedol, self-play, go]
hook: "AlphaGo's own model of human play said one professional in ten thousand would make that move. It made it anyway."
sources:
  - {title: "AlphaGo versus Lee Sedol", type: wiki, url: "https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol"}
  - {title: "Mastering the game of Go with deep neural networks and tree search", author: "Silver et al.", year: 2016, type: paper, url: "https://doi.org/10.1038/nature16961"}
  - {title: "AlphaGo", type: wiki, url: "https://en.wikipedia.org/wiki/AlphaGo"}
dates: {written: 2026-09-19, event: 2016-03-10}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The one-in-ten-thousand figure is David Silver's recollection, not in the Nature paper; the card now says so. Dropped the unsourced 'left the room' detail for what commentary records."}
---

# The move no human would have played

Seoul, 10 March 2016, second game of five. On its 37th move AlphaGo put a black stone on the fifth line, out in open space, away from the fighting. Michael Redmond, commentating, called it creative and unique. Lee Sedol took an extraordinarily long time to answer it.

The number that makes this a story comes from DeepMind's own telling. AlphaGo had a network trained to predict what a human professional would play, and David Silver has said it put this move at roughly one in ten thousand — his recollection, not a figure in the paper. The search liked the move anyway, and the search won the argument.

That is the whole event in one sentence. The imitation part of the system was trained on human games; the self-play and search parts were not, and were not obliged to agree. When they disagreed, the machine stopped playing like us.

It ran both ways. In game four Lee played move 78, a wedge that commentators called divine, and AlphaGo's evaluation fell apart afterwards — its policy network had not rated that move likely either. He won that game. The final score was 4–1.

## Recall
type: reveal
Q: Why could AlphaGo play a move its own policy network thought was absurd?
A: Because the policy network only proposes and orders candidates. The tree search, guided by a value network trained on self-play, evaluates them — and it was free to overrule the imitation of human play.
