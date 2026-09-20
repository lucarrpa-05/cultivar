---
id: ai.alignment.constitutional-ai.a-model-that-criticises-itself
topic: ai.alignment.constitutional-ai
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, connection, practical]
tags: [constitutional-ai, rlaif, preference-model, bradley-terry, kl-penalty]
hook: "The human's job shrinks from ranking thousands of harmful answers to writing down the rules. Then the model does the ranking."
sources:
  - {title: "Constitutional AI: Harmlessness from AI Feedback", author: "Bai et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2212.08073"}
  - {title: "Deep reinforcement learning from human preferences", author: "Christiano et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03741"}
  - {title: "Reinforcement learning from human feedback", type: wiki, url: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback"}
dates: {written: 2026-09-19, event: 2022-12-15}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Training a model by making it criticise itself

Standard preference training needs people to read the model's worst output and rank it. That is slow, expensive, and genuinely unpleasant work, and it scales with the number of things you want the model to get right.

Bai and colleagues at Anthropic, December 2022, asked what happens if the human contribution shrinks to a written list of principles.

Stage one is supervised. Ask the model something it should refuse. When it answers badly, show it one principle drawn at random from the list and ask it to critique its own answer against that principle. Then ask it to rewrite. Fine-tune the model on the rewrites.

Stage two is reinforcement learning. Have the model compare pairs of its own responses against the principles, train a preference model on those machine-generated comparisons, and optimise the policy against it. They call it RLAIF: reinforcement learning from AI feedback.

The claim worth taking seriously is not that a model supervises itself. It is that the supervision becomes a document — something you can read, disagree with, and put under version control.

## Rigor

The preference model is the usual Bradley–Terry likelihood. For two responses $y_1,y_2$ to a prompt $x$, fit a scalar $r_\theta$ so that
$$P(y_1\succ y_2\mid x)=\sigma\big(r_\theta(x,y_1)-r_\theta(x,y_2)\big),\qquad \sigma(z)=\frac{1}{1+e^{-z}}.$$
Only *differences* of $r_\theta$ are identified — the scale is arbitrary, which is why reward numbers are never comparable across runs. In RLHF the comparison labels come from people; in Constitutional AI they come from a feedback model shown both responses plus a principle, with its answer read off the probability it assigns to each option.

The policy is then optimised for
$$\mathbb{E}_{y\sim\pi}\big[r_\theta(x,y)\big]\;-\;\beta\,\mathrm{KL}\big(\pi\,\|\,\pi_{\text{ref}}\big),$$
maximising the learned reward while staying close to the supervised starting model.

That KL term is not a technicality. $r_\theta$ is a proxy, fitted on a finite sample of comparisons, and it is wrong somewhere. The penalty caps how far the policy may travel into the region where it is wrong. It is the optimizer's curse, written into the loss function as a leash.

## Recall
type: mcq
Q: What is the KL penalty in preference-based fine-tuning actually for?
- [ ] Keeping the model's outputs grammatical — fluency comes from pretraining; the penalty is about distance from the reference policy.
- [x] Limiting how far the policy can move from the reference model — because the learned reward is a proxy that is wrong somewhere out there.
- [ ] Preventing the preference model from overfitting its training comparisons — that is a concern for fitting $r_\theta$, not for constraining the policy.
