---
id: ai.llm.rlhf-alignment-training.prediction-is-not-answering
topic: ai.llm.rlhf-alignment-training
format: series
difficulty: 3
language: en
weight: medium
angles: [connection, practical]
tags: [rlhf, instructgpt, reward-model, preference-learning, kl-penalty]
hook: "A raw pretrained model asked a question will often reply with more questions. It is not being difficult — it is predicting."
series: {id: ai.llm.how-a-model-thinks, index: 6, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Training language models to follow instructions with human feedback", author: "Long Ouyang et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.02155"}
  - {title: "Reinforcement learning from human feedback", type: wiki, url: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Predicting text and answering a person are different jobs

Ask a purely pretrained model "List three causes of the French Revolution." Out in the wild, the likeliest continuation is four more homework questions. The model is not being unhelpful. It is doing exactly what episode five trained it to do.

Ouyang and colleagues' 2022 recipe has three steps. Pay people to write good answers and fine-tune on them. Then show those people pairs of the model's own answers and ask which is better — comparisons, not scores, because humans are far more reliable at "this one" than at "7 out of 10". Fit a second network to reproduce those judgements. Then push the model toward what that network likes.

The result that made the point: evaluators preferred the answers of the tuned 1.3-billion-parameter model to those of the original 175-billion one.

And yet nothing underneath has moved. The thing still emits one token at a time from a list it built by gluing frequent pairs of bytes together, still rebuilding each word as a weighted average of the others. Six episodes later, that is all that is happening. Helpfulness is a thin, expensive coat of paint on a next-token predictor.

## Rigor

Step two fits a reward model $r_\phi(x,y)$ on preference pairs. With $y_w$ preferred to $y_l$ for prompt $x$, the loss is

$$-\log \sigma\big(r_\phi(x,y_w) - r_\phi(x,y_l)\big),$$

the Bradley–Terry likelihood. Only differences of $r_\phi$ are identified, so the scale and origin are arbitrary — a reward model has no absolute meaning.

Step three maximises, over the policy $\pi_\theta$,

$$\mathbb{E}_{x,\;y\sim\pi_\theta}\big[r_\phi(x,y)\big] \; - \; \beta\, \mathrm{KL}\!\left(\pi_\theta(\cdot\mid x)\,\|\,\pi^{\text{SFT}}(\cdot\mid x)\right).$$

The KL term is the load-bearing one. $r_\phi$ is a finite-sample fit, so it has exploitable seams; without a leash the policy walks straight into them and produces text that scores beautifully and reads like nothing human. The penalty keeps the new policy near the supervised one — the "thin coat of paint" of the intuition, enforced as a constraint rather than hoped for.

## Recall
type: mcq
Q: Why does the RLHF objective include a KL penalty against the supervised model?
- [ ] To keep the answers short — length is controlled by the data and the sampling, not by this term.
- [x] Because the reward model is an imperfect fit, and a policy free to roam will find and exploit its errors. — the penalty keeps the policy in the region where the reward model was actually trained.
- [ ] Because reinforcement learning cannot optimise a neural reward — it can; the problem is that it optimises it too well.
