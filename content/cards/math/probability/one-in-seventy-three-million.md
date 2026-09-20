---
id: math.probability.conditional-bayes.one-in-seventy-three-million
topic: math.probability.conditional-bayes
format: story
difficulty: 2
language: en
weight: medium
angles: [mistake, practical, human]
tags: [sally-clark, prosecutors-fallacy, independence, expert-evidence]
hook: "A paediatrician squared a probability in court. It cost a woman three years in prison and, eventually, her life."
sources:
  - {title: "Sally Clark", type: wiki, url: "https://en.wikipedia.org/wiki/Sally_Clark"}
  - {title: "Prosecutor's fallacy", type: wiki, url: "https://en.wikipedia.org/wiki/Prosecutor%27s_fallacy"}
  - {title: "Royal Statistical Society concerned by issues raised in Sally Clark case", year: 2001, type: primary, url: "https://www.inference.org.uk/sallyclark/RSS.html"}
dates: {written: 2026-09-19, event: 1999-11-09}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One in seventy-three million

Sally Clark's first son died in December 1996, her second in January 1998. Both were infants; both deaths were initially recorded as natural. She was convicted of murdering them on 9 November 1999.

The number the jury remembered came from the paediatrician Roy Meadow: the chance of two cot deaths in a family like hers was 1 in 73 million. He got it by estimating a single cot death at 1 in 8,543 and squaring.

Squaring assumes independence. Two infants in one family share genes, a house, a cot, and a mother — whatever raised the first risk raises the second, so the true figure is far larger. That was error one.

Error two was worse and invisible. Even granting the number, it answers "how unlikely is this if she is innocent?" The jury heard "how unlikely is it that she is innocent?" Double murder of infants is also extraordinarily rare; the case turns on the *ratio*, and nobody computed it.

The Royal Statistical Society said so publicly in October 2001. Her conviction was quashed in January 2003. She died in 2007.

## Recall
type: reveal
Q: Both of Meadow's errors have names. What are they?
A: Assuming independence — squaring a single-death probability ignores the shared genetic and environmental causes that make a second death more likely, not equally likely. And the prosecutor's fallacy — confusing $P(\text{evidence}\mid\text{innocent})$ with $P(\text{innocent}\mid\text{evidence})$. The second needs the prior odds of murder versus natural death, which are themselves tiny, and which nobody put in front of the jury.
