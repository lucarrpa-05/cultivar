---
id: econ.macro.unemployment-cycles.good-news-raises-unemployment
topic: econ.macro.unemployment-cycles
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, tool]
tags: [unemployment-rate, participation, discouraged-workers, okuns-law, informality]
hook: "A recovery can push the unemployment rate up, and it is not a statistical error. It is the definition doing its job."
sources:
  - {title: "Unemployment — measurement, discouraged workers and participation", type: wiki, url: "https://en.wikipedia.org/wiki/Unemployment"}
  - {title: "Okun's law", type: wiki, url: "https://en.wikipedia.org/wiki/Okun%27s_law"}
  - {title: "Workforce — labour force participation and how it is measured", type: wiki, url: "https://en.wikipedia.org/wiki/Workforce"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source title corrected to match the article it actually links to."}
---

# Good news can push the unemployment rate up

To be counted as unemployed you must satisfy two conditions: no job, and actively looking for one. Drop the second and you vanish from the statistic altogether — you are "out of the labour force", indistinguishable on paper from a retiree.

Now run a recovery. Firms start hiring, word gets around, and people who had given up looking begin again. Each one arrives in the statistics as *unemployed*, because looking is what the definition requires. The denominator grows, the numerator grows, and the published rate can rise in the same month that employment rises. Newspapers report a worsening job market on the day the job market improved.

This is why nobody serious watches the unemployment rate alone. The employment-to-population ratio has no such trapdoor, and participation tells you which way the door is swinging.

And in an economy where a large share of work is informal — no contract, no registration, a stall or a motorbike — being "employed" carries much less information than the word suggests, so the same rate can mean very different things in Bogotá and in Berlin.

## Rigor

With $E$ employed and $U$ unemployed, the labour force is $L=E+U$ and the rate is $u=U/L$. Move one discouraged person from outside the labour force into active search:

$$u'=\frac{U+1}{L+1}>\frac{U}{L}=u \iff L>U \iff E>0 .$$

So re-entry raises the measured rate whenever anyone is employed at all. The effect is not small in a recovery, when re-entry can run for months.

For the cyclical part, **Okun's law** ties the rate to output,

$$\Delta u_t \approx -\beta\,(g_t-g^*),$$

with $\beta$ around $0.5$ in postwar US data: two points of growth above trend buys about one point off unemployment. It is an empirical regularity, not a theorem — $\beta$ differs by country and era, and it drifts precisely because participation and hours absorb part of the adjustment.

## Recall
type: mcq
Q: Employment rose 1% last quarter and the unemployment rate also rose. What is the most likely explanation?
- [x] Discouraged workers resumed searching, entering the labour force and the unemployment count at the same time. — the rate mixes a demand story with a participation story.
- [ ] The statistics agency made an error; the two cannot both rise. — they can and often do, because the labour force is not fixed.
- [ ] Firms replaced full-time jobs with part-time ones. — that would change hours, not the count of employed people.
- [ ] Inflation rose, shifting the Phillips curve. — the Phillips curve relates inflation to unemployment; it does not explain this accounting effect.
