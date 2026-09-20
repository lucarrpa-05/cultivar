---
id: math.probability.markov-chains.markov-counted-pushkins-vowels
topic: math.probability.markov-chains
format: story
difficulty: 2
language: en
weight: medium
angles: [feud, history, origin]
tags: [markov, nekrasov, eugene-onegin, dependence, free-will]
hook: "Markov hand-counted 20,000 letters of Pushkin to win an argument about whether free will exists."
sources:
  - {title: "Markov chain", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_chain"}
  - {title: "The Life and Work of A.A. Markov", author: "Basharin, Langville and Naumov", year: 2004, type: paper, url: "https://doi.org/10.1016/j.laa.2003.12.041"}
  - {title: "Andrey Markov", type: wiki, url: "https://en.wikipedia.org/wiki/Andrey_Markov"}
dates: {written: 2026-09-19, event: 1913-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Markov counted 20,000 of Pushkin's letters to win a fight

Pavel Nekrasov, a Moscow mathematician trained first in a seminary, made a claim with theological weight: the law of large numbers requires independent events. Social statistics — crime rates, marriage rates — obey the law of large numbers. Therefore human acts must be independent. Therefore free will.

Markov, an atheist and a famously combative man, thought the premise was simply false, and set out to prove that dependent events can obey the law perfectly well. His first papers on chains of dependent variables came in 1906.

In 1913 he went looking for real dependent data and found it in literature. He took the first 20,000 letters of *Eugene Onegin*, stripped the punctuation and spaces, and classified every one by hand as vowel or consonant. Then he counted transitions.

The letters are plainly not independent: after a consonant, a vowel is far more likely than after a vowel. And the averages converge anyway. Nekrasov's premise was dead, and the by-product — a system whose next state depends only on its current one — became one of the most useful objects in applied mathematics.

## Recall
type: reveal
Q: What was Markov actually trying to prove with Pushkin?
A: That the law of large numbers does not require independence. Nekrasov had argued the reverse, and drawn a conclusion about free will from it. Markov's vowel-consonant sequence is strongly dependent — the next letter's odds hinge on the current one — and its running averages converge regardless, which is exactly what a Markov chain is for.
