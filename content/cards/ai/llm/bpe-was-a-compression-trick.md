---
id: ai.llm.tokenization.bpe-was-a-compression-trick
topic: ai.llm.tokenization
format: story
difficulty: 1
language: en
weight: light
angles: [origin, history]
tags: [byte-pair-encoding, compression, sennrich, philip-gage, subword-units]
hook: "The alphabet every chatbot reads in was designed in 1994 to shrink files, by a man who was not thinking about language."
sources:
  - {title: "Byte-pair encoding", type: wiki, url: "https://en.wikipedia.org/wiki/Byte-pair_encoding"}
  - {title: "Neural Machine Translation of Rare Words with Subword Units", author: "Rico Sennrich, Barry Haddow & Alexandra Birch", year: 2016, type: paper, url: "https://arxiv.org/abs/1508.07909"}
dates: {written: 2026-09-19, event: 1994-02-01}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A file-shrinking trick from 1994 became the alphabet of chatbots

In February 1994 Philip Gage published a short algorithm in *The C Users Journal* under the title "A New Algorithm for Data Compression". Find the pair of adjacent bytes that occurs most often. Replace every occurrence with a byte the file never uses. Write the swap in a table. Repeat. No theory, no mathematics to speak of — a loop.

It sat in the compression literature for two decades.

In 2015, Rico Sennrich, Barry Haddow and Alexandra Birch were stuck on a different problem: a translation system with a fixed vocabulary keeps running into words it has never seen. They noticed Gage's loop answered it. Run the merges over text rather than binary, stop after a few tens of thousands of them, and you get a vocabulary where common words are single units and rare ones fall apart into familiar fragments. Nothing is ever out of vocabulary again.

Their paper was about German and Russian. Its table is now the alphabet almost every large language model reads in.

## Recall
type: reveal
Q: What problem was byte pair encoding invented for, and what problem does it actually solve today?
A: Invented in 1994 to compress files by merging frequent byte pairs. Since Sennrich, Haddow and Birch's 2016 paper it is used to build a subword vocabulary, so a model never meets a word it cannot represent.
