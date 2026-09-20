---
id: bio.neuro.decision-making.a-sequential-test-in-your-head
topic: bio.neuro.decision-making
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [drift-diffusion, sprt, evidence-accumulation, lip, speed-accuracy]
hook: "Wald's 1945 test for deciding when you have seen enough data has a candidate implementation in parietal cortex."
sources:
  - {title: "The neural basis of decision making, Annual Review of Neuroscience 30, 535–574", author: "Joshua I. Gold and Michael N. Shadlen", year: 2007, type: paper, url: "https://www.cns.nyu.edu/~tony/vns/readings/gold-shadlen-2007.pdf"}
  - {title: "The physics of optimal decision making, Psychological Review 113(4), 700–765", author: "Rafal Bogacz, Eric Brown, Jeff Moehlis, Philip Holmes, Jonathan D. Cohen", year: 2006, type: paper, url: "https://pubmed.ncbi.nlm.nih.gov/17014301/"}
  - {title: "Sequential probability ratio test", type: wiki, url: "https://en.wikipedia.org/wiki/Sequential_probability_ratio_test"}
  - {title: "Two-alternative forced choice (drift-diffusion model)", type: wiki, url: "https://en.wikipedia.org/wiki/Two-alternative_forced_choice"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 2 to 3: the rigor is Wald's SPRT plus drift-diffusion first-passage closed forms, on a par with the other level-3 cards in the shard."}
---

# Your brain may be running a test Wald wrote down in 1945

Show someone a cloud of flickering dots with a weak net drift and ask which way it moves. Give them longer and they do better; push them to answer fast and they do worse. That trade-off has a shape, and the shape is the interesting thing: it is what you would get from a decision-maker who keeps collecting evidence until it has enough, rather than one who looks once and guesses.

Record from parietal cortex in a monkey doing exactly this task and the firing rate climbs during the trial. The steeper the climb, the stronger the motion; and the eye movement comes roughly when the rate reaches the same level, whatever the motion strength. That is what accumulating evidence towards a fixed bound looks like from the outside.

Say "consistent with", not "is". Single-trial analyses have argued the ramps are really abrupt steps, and switching the region off barely changes behaviour. The neurons are a candidate implementation of the algorithm, not a proof of it.

The algorithm, though, is not a guess.

## Rigor

Wald's **sequential probability ratio test**: accumulate the log-likelihood ratio of your two hypotheses as evidence arrives,

$$\Lambda_n=\sum_{i=1}^{n}\log\frac{p(x_i\mid H_1)}{p(x_i\mid H_0)},$$

and stop the first time $\Lambda_n$ leaves $[\,\log\frac{\beta}{1-\alpha},\ \log\frac{1-\beta}{\alpha}\,]$. Wald and Wolfowitz proved in 1948 that this minimises the expected number of samples for given error rates $\alpha,\beta$ — no other test decides faster at that accuracy.

In continuous time with Gaussian noise this is the **drift–diffusion model**: $dx=\mu\,dt+\sigma\,dW$ with absorbing boundaries at $\pm a$, starting at $0$. It has closed forms,

$$P(\text{correct})=\frac{1}{1+e^{-2a\mu/\sigma^{2}}},\qquad \mathbb{E}[T]=\frac{a}{\mu}\tanh\!\left(\frac{a\mu}{\sigma^{2}}\right),$$

so the whole speed–accuracy trade-off is one curve traced by the single parameter $a$. Raising the bound buys accuracy at a cost in time, and the exchange rate is fixed by the signal-to-noise ratio $\mu/\sigma$. "Being careful" is not a personality trait here; it is a number.

Optimality is narrower than the fame suggests: two alternatives, stationary independent evidence, accuracy as the objective. With more options, drifting evidence, or a reward-rate objective, the plain bounded accumulator stops being optimal.

## Recall
type: mcq
Q: In the drift–diffusion account, what does a person change when they decide to "be more careful"?
- [x] The height of the decision bound $a$ — raising it demands more accumulated evidence, buying accuracy at a predictable cost in time.
- [ ] The drift rate $\mu$ — that is set by the stimulus and the quality of their senses, not by choice.
- [ ] The noise $\sigma$ — internal noise is not under voluntary control; only the stopping rule is.
- [ ] Which hypothesis they start from — the model starts unbiased at zero; a prior shifts the starting point, which is a separate knob.
