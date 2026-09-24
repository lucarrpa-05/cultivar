---
id: econ.behavioral.bounded-rationality.the-result-that-ruined-the-experiment
topic: econ.behavioral.bounded-rationality
topics: [econ.behavioral.heuristics-biases]
format: story
difficulty: 3
language: en
weight: medium
angles: [mistake, paradox, human]
tags: [recognition-heuristic, less-is-more, ecological-rationality, gigerenzer, goldstein]
hook: "German students were supposed to find American cities hard. They scored better on them than on German ones."
related: [econ.behavioral.bounded-rationality.scissors-with-two-blades]
sources:
  - {title: "The recognition heuristic: A decade of research, Judgment and Decision Making 6(1)", author: "Gerd Gigerenzer, Daniel G. Goldstein", year: 2011, type: paper, url: "https://www.dangoldstein.com/papers/Gigerenzer_Goldstein_Recognition_Heuristic_Decade_JDM2011.pdf"}
  - {title: "Models of ecological rationality: The recognition heuristic, Psychological Review 109(1)", author: "Daniel G. Goldstein, Gerd Gigerenzer", year: 2002, type: paper, url: "https://doi.org/10.1037/0033-295X.109.1.75"}
  - {title: "Recognition heuristic", type: wiki, url: "https://en.wikipedia.org/wiki/Recognition_heuristic"}
dates: {written: 2026-09-23}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Added the year (2011) to the verbatim quote."}
---

# The result that ruined the experiment, and why knowing less helped

Ulrich Hoffrage's dissertation, in Gerd Gigerenzer's group, needed an easy quiz and a hard one. German students would judge which of two cities was larger: German cities easy, American cities hard.

The students scored slightly higher on the American cities. "The result ruined the experiment," Gigerenzer and Goldstein wrote in 2011. For days nobody could explain it, until Anton Kühberger pointed out that not knowing a city is information: if you have heard of one and not the other, the one you know is probably bigger. About German cities, the students knew too much to use it.

Asked whether Detroit or Milwaukee is larger, about 60% of American students got it right, and 90% of German ones.

## Rigor

Goldstein and Gigerenzer turned the story into arithmetic. Take $N$ cities, of which you recognise $n$. When you recognise exactly one city in a pair, pick it: you are right with probability $\alpha$, the recognition validity. When you recognise both, use what you know, right with probability $\beta$. When you recognise neither, guess. For a random pair,

$$f(n)=\frac{2n(N-n)}{N(N-1)}\,\alpha+\frac{(N-n)(N-n-1)}{N(N-1)}\cdot\frac12+\frac{n(n-1)}{N(N-1)}\,\beta .$$

Compare knowing all the cities with knowing all but one: $f(N)=\beta$, while

$$f(N-1)=\frac{2\alpha+(N-2)\beta}{N},$$

so $f(N-1)>f(N)$ exactly when $\alpha>\beta$. If fame tracks size better than your knowledge does, learning the last city makes you worse. With $\alpha$ and $\beta$ constant, $\alpha>\beta$ is the condition for a less-is-more effect.

This is Simon's second blade: the heuristic is good because of how the environment is built, where the famous cities are the big ones. The BBC reran Detroit against Milwaukee in 2009 and got 65% right in New York, 82% in London. The model itself is contested, since people do not always ignore knowledge that contradicts recognition, but the arithmetic is not.

## Recall
type: mcq
Q: When does knowing fewer cities make you better at picking the larger one?
- [x] When recognition predicts size better than your other knowledge does (α > β) — ignorance then lets you use the stronger cue more often.
- [ ] Never, since more knowledge always helps — true for fitting known data, not for predicting with cues of different quality.
- [ ] When you recognise exactly half the cities — that maximises how often recognition applies, but the effect still requires α > β.
