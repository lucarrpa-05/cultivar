---
id: css.networks.small-world.the-chains-that-never-arrived
topic: css.networks.small-world
format: story
difficulty: 1
language: en
weight: light
angles: [history, mistake, numbers]
tags: [milgram, six-degrees, chain-letters, kleinfeld, attrition]
hook: "\"Six degrees of separation\" is a real finding from an experiment in which most of the chains never arrived."
sources:
  - {title: "An Experimental Study of the Small World Problem", author: "Jeffrey Travers and Stanley Milgram", year: 1969, type: paper, url: "https://doi.org/10.2307/2786545"}
  - {title: "Small-world experiment", type: wiki, url: "https://en.wikipedia.org/wiki/Small-world_experiment"}
  - {title: "Six degrees of separation", type: wiki, url: "https://en.wikipedia.org/wiki/Six_degrees_of_separation"}
dates: {written: 2026-09-19, event: 1969-12-01}
rigor: none
rigorNote: "a history-of-method card; the mechanism is on the rewiring card"
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The famous six degrees, and the letters that never showed up

Stanley Milgram's design was beautiful. Give people in Nebraska a packet addressed to a stockbroker in Boston they have never met. You may not mail it to him. Mail it to one person you know on first-name terms who seems closer to him, and ask them to do the same.

Of 296 chains started, 64 arrived. The completed ones had passed through a mean of about five intermediaries, which Travers and Milgram published in 1969 and a playwright later turned into "six degrees of separation".

Now the part that rarely gets repeated. Roughly four out of five packets simply stopped. Judith Kleinfeld, going back to Milgram's own archives in 2002, made the obvious and uncomfortable point: the chains that died are exactly the ones you would expect to be *long*, because every extra hop is another chance for someone to shrug. Averaging only the survivors biases the number downward, possibly by a lot.

The finding survived anyway — later work on email and messaging platforms found short paths at enormous scale. But "six" was measured on the winners.

## Recall
type: reveal
Q: What is the selection problem in Milgram's small-world result?
A: Only 64 of 296 chains completed, and a chain dies whenever any one participant drops out — so long chains are systematically more likely to be lost. The mean of about five intermediaries is an average over survivors, which biases it downward.
