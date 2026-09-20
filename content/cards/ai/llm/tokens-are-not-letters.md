---
id: ai.llm.tokenization.tokens-are-not-letters
topic: ai.llm.tokenization
format: series
difficulty: 1
language: en
weight: medium
angles: [weird, tool]
tags: [tokenization, byte-pair-encoding, vocabulary, subword]
hook: "A language model has never seen a letter. Before it reads anything, your sentence has already been shredded."
series: {id: ai.llm.how-a-model-thinks, index: 1, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Neural Machine Translation of Rare Words with Subword Units", author: "Rico Sennrich, Barry Haddow & Alexandra Birch", year: 2016, type: paper, url: "https://arxiv.org/abs/1508.07909"}
  - {title: "Byte-pair encoding", type: wiki, url: "https://en.wikipedia.org/wiki/Byte-pair_encoding"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The model has never seen a letter

Before a language model reads anything, the text is chopped into pieces drawn from a fixed list — typically 50,000 to 200,000 of them. Common words get one piece each. Rare ones shatter into three or four. A leading space usually belongs to the piece that follows it, so " the" and "the" are two different entries in the list.

From there on, the model's entire universe is a sequence of row numbers into that list. It has never met a character. Asking it how many r's are in a word is like asking you to count the brushstrokes in a word you have only ever heard spoken aloud — the information was discarded before the question arrived.

The list is not handed down by anyone. It is grown from the training text by a procedure that keeps gluing together whichever pair of neighbours shows up most often.

And then the model throws the row numbers away. Token 4842 is not bigger than token 4841, and it is not more similar to it either. A row number carries no meaning at all. So what does the model replace it with?

## Rigor

Byte pair encoding, the standard construction (Sennrich, Haddow and Birch 2016, borrowing a 1994 compression algorithm):

1. Start with the vocabulary of all 256 byte values, and write the corpus as a sequence of those symbols.
2. Count every adjacent pair. Take the most frequent pair $(a,b)$, add the new symbol $ab$ to the vocabulary, and replace every occurrence.
3. Repeat until the vocabulary reaches the target size $V$.

Encoding new text means replaying the learned merges in the order they were discovered. Two consequences follow immediately. First, a string of $n$ bytes becomes between $1$ and $n$ tokens, so token count is a property of the *training corpus*, not of the language. Second, the segmentation is frequency-driven, not morphological: nothing forces "running" to split as "run" + "ning".

The model then sees $x = (x_1,\dots,x_T)$ with each $x_t \in \{1,\dots,V\}$ — categorical labels, carrying no order and no metric. The "brushstrokes" of the intuition are gone: spelling survives only as a statistical shadow of how words happen to fragment.

## Recall
type: mcq
Q: Why is counting the letters in a word genuinely hard for a language model?
- [x] The word may arrive as two or three tokens, and the model never sees the individual characters — it has to infer spelling indirectly. — the character information is destroyed before the model gets the input.
- [ ] Models cannot count at all. — they count other things fine; it is the access to characters that is missing.
- [ ] The vocabulary is too small to hold every word. — an unknown word simply splits into more pieces; nothing is lost that way.
