---
id: css.methods.ethics-bias.anonymous-for-about-a-week
topic: css.methods.ethics-bias
format: story
difficulty: 1
language: en
weight: light
angles: [mistake, practical, human]
tags: [research-ethics, reidentification, tastes-ties-time, consent, data-release]
hook: "The dataset was anonymised, approved by an ethics board, and identified as one specific university almost immediately."
sources:
  - {title: "\"But the data is already public\": on the ethics of research in Facebook", author: "Michael Zimmer", year: 2010, type: paper, url: "https://doi.org/10.1007/s10676-010-9227-5"}
  - {title: "Bit by Bit: Tastes, Ties, and Time", author: "Matthew J. Salganik", year: 2017, type: book, url: "https://www.bitbybitbook.com/en/1st-ed/ethics/three-examples/tastes-ties-time/"}
dates: {written: 2026-09-19, event: 2010-12-01}
rigor: none
rigorNote: "a case study in research ethics; no formal layer to state"
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# It was anonymous for about a week

A team of sociologists got something researchers had dreamed about: the full Facebook profiles of an entire undergraduate cohort — roughly 1,700 students — followed over four years. Friendships, tastes in music and film, majors, how all of it changed. The project was called Tastes, Ties, and Time. The university's review board approved it. Names were stripped. A cleaned version was released for other researchers to use.

Michael Zimmer showed how fast that unravelled. Nothing in the file said which university it was, but the file listed the majors offered, and one combination of them fits exactly one school. Once you know it is Harvard's class of 2009, you have a named cohort of about 1,700 people, and a student who is the only woman from a particular country studying a particular subject is no longer anonymous to anyone who knows her.

The dataset was withdrawn. The students had never been asked.

The general lesson is not "strip more fields". It is that anonymity is not a property of a file. It is a property of a file plus everything else in the world, and the world keeps adding.

## Recall
type: reveal
Q: Why is anonymity not a property of a dataset?
A: Because re-identification uses outside information. Removing names does nothing if the remaining attributes — a list of majors, a combination of country, gender and subject — intersect with public knowledge to single someone out. Whether a file is anonymous depends on every other dataset that exists, including ones released after yours.
