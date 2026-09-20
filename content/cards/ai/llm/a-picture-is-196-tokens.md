---
id: ai.llm.multimodal.a-picture-is-196-tokens
topic: ai.llm.multimodal
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [vision-transformer, patches, clip, contrastive-learning, zero-shot]
hook: "Chop the photo into 196 squares, call each one a word, and feed it to the same machine that reads text. It works."
sources:
  - {title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale", author: "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2010.11929"}
  - {title: "Learning Transferable Visual Models From Natural Language Supervision", author: "Alec Radford, Jong Wook Kim, Chris Hallacy et al.", year: 2021, type: paper, url: "https://arxiv.org/abs/2103.00020"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A picture is worth 196 tokens

Dosovitskiy and colleagues gave their 2020 paper the title "An Image is Worth 16x16 Words", and meant it operationally. Cut the image into 16-by-16 pixel squares. Flatten each square into a vector of numbers. Multiply by one learned matrix. You now have a sequence, and a 224-by-224 image gives exactly $(224/16)^2 = 196$ of them. Hand that to a plain transformer. No convolutions anywhere: "a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks."

The second step is what makes a model *multimodal* rather than just visual. CLIP trains an image encoder and a text encoder side by side on 400 million image-caption pairs, with one objective: predict which caption goes with which image. Nothing is labelled with categories.

What comes out is a single space holding both pictures and sentences, so you can classify an image by asking which sentence it lands nearest to. Radford and colleagues report matching "the accuracy of the original ResNet-50 on ImageNet zero-shot without needing to use any of the 1.28 million training examples it was trained on."

## Rigor

Patch embedding is a convolution whose kernel equals its stride: with patch size $P$, an $H\times W$ image becomes $N = HW/P^2$ tokens of dimension $d$. Since attention costs $\Theta(N^2)$, halving the patch size quadruples the tokens and multiplies attention cost by sixteen. That single exponent is why resolution is the expensive axis in vision transformers.

CLIP's objective is contrastive. For a batch of $N$ pairs, encode to $u_i$ (image) and $v_j$ (text), $\ell_2$-normalise, and form the $N\times N$ matrix $S_{ij} = \langle u_i, v_j\rangle / \tau$. The loss is a symmetric cross-entropy: softmax over each row with the diagonal as the correct class, plus softmax over each column likewise. The correct pairing is pulled together and all $N-1$ mismatches in that batch are pushed apart, which is why large batches matter here.

Zero-shot classification then needs no classifier at all. Write each label as a sentence, encode it, and take $\arg\max_c \langle u, v_c\rangle$ — a nearest-neighbour lookup in the shared space, exactly the inner-product geometry from the embedding card, now with pictures in it.

## Recall
type: mcq
Q: What makes CLIP able to classify images it was never given labels for?
- [x] Images and captions are trained into one shared space, so a label can be written as a sentence and compared by inner product. — classification becomes a nearest-neighbour lookup, not a fixed output layer.
- [ ] It memorised 400 million labelled categories — the training data is captions, which have no fixed category set at all.
- [ ] It generates a caption and matches the text — CLIP does not generate; it embeds and compares.
