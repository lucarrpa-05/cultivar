---
id: ai.neural-nets.rnn-lstm.insufficient-decaying-error-back-flow
topic: ai.neural-nets.rnn-lstm
format: quote
difficulty: 1
language: en
weight: light
angles: [history, origin]
tags: [lstm, hochreiter, schmidhuber, error-backflow, recurrent-networks]
hook: "The 1997 paper that ran translation and speech for two decades opens by naming its enemy in one phrase."
sources:
  - {title: "Long Short-Term Memory", author: "Sepp Hochreiter & Jürgen Schmidhuber", year: 1997, type: paper, url: "https://www.bioinf.jku.at/publications/older/2604.pdf"}
dates: {written: 2026-09-19, event: 1997-11-01}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Insufficient, decaying error back flow

"Learning to store information over extended time intervals via recurrent backpropagation takes a very long time, mostly due to insufficient, decaying error back flow."

So opens Hochreiter and Schmidhuber in *Neural Computation* 9(8), 1997. Their remedy, in their spelling, was to enforce "constant error flow through 'constant error carrousels' within special units". That sentence describes the machinery behind machine translation and speech recognition for the next two decades, until attention took over.
