---
id: ai.llm.evaluation.the-exam-was-in-the-training-set
topic: ai.llm.evaluation
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, practical]
tags: [contamination, benchmarks, evaluation, data-leakage, gpt-3]
hook: "Every benchmark old enough to be trusted is old enough to be on the web. The model has probably read the answer key."
sources:
  - {title: "Language Models are Few-Shot Learners", author: "Tom B. Brown et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.14165"}
  - {title: "Documenting Large Webtext Corpora: A Case Study on the Colossal Clean Crawled Corpus", author: "Jesse Dodge, Maarten Sap, Ana Marasović et al.", year: 2021, type: paper, url: "https://arxiv.org/abs/2104.08758"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The exam was already in the training set

Buried in the GPT-3 paper, in the section on measuring memorisation of benchmarks, is one of the more honest sentences in the field: "Unfortunately, a bug resulted in only partial removal of all detected overlaps from the training data. Due to the cost of training, it wasn't feasible to retrain the model."

They found it, said so, and spent a section measuring the damage. That disclosure is far rarer than the problem it discloses.

The problem is structural, not a lapse. A benchmark has to be public to be comparable, public means indexed, indexed means it lands in a web crawl, and the crawl is the training set. Dodge and colleagues documented exactly this in 2021, finding evaluation examples from other benchmark datasets sitting inside the C4 corpus. Nobody cheats; the answer key simply arrives with everything else. A model can score well on a test it has effectively already sat, and nothing in the score tells you which case you are in.

Which makes "how would you even detect this?" the interesting question.

## Rigor

The standard detector is $n$-gram overlap: mark a test example as dirty if any $n$-gram of it (GPT-3 used 13-gram matches, with variants) appears in the training corpus. Then split the benchmark into clean and dirty halves and compare accuracy. A large clean-minus-dirty gap is evidence of contamination; a small one is weak evidence of its absence.

Weak, because the test has two failure directions. Paraphrases, translations and reformatted copies pass an $n$-gram check untouched, so the clean set is contaminated too. And the split is not random — examples that are easy to phrase in common language are both likelier to be duplicated online and likelier to be easy, which biases the comparison in an unknown direction.

For a model whose training data you cannot inspect at all, the detector is unavailable and the question becomes unanswerable from the outside.

The only structural fix is a test the model could not have seen: written after the training cut-off, or held privately and never published. Everything else is an estimate of how much of the score is memory.

## Recall
type: mcq
Q: A model scores 92% on a public benchmark. What does contamination make uncertain?
- [x] Whether the score measures ability or recall, since the test may be in the training crawl. — a public benchmark is indexable, and an indexable benchmark ends up in the data.
- [ ] Whether the benchmark's questions are correct — question quality is a separate problem from leakage.
- [ ] Whether the model was trained long enough — contamination concerns what was in the data, not how many steps were taken.
