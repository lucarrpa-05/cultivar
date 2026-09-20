---
id: css.networks.community-detection.communities-you-find-depend-on-how-you-look
topic: css.networks.community-detection
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, tool, numbers]
tags: [modularity, community-detection, resolution-limit, newman-girvan, louvain]
hook: "Run the standard algorithm on a graph with no communities at all and it will hand you communities."
sources:
  - {title: "Finding and evaluating community structure in networks", author: "M. E. J. Newman and M. Girvan", year: 2004, type: paper, url: "https://doi.org/10.1103/PhysRevE.69.026113"}
  - {title: "Resolution limit in community detection", author: "Santo Fortunato and Marc Barthélemy", year: 2007, type: paper, url: "https://doi.org/10.1073/pnas.0605965104"}
  - {title: "Modularity (networks)", type: wiki, url: "https://en.wikipedia.org/wiki/Modularity_(networks)"}
dates: {written: 2026-09-19, event: 2007-01-02}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Your algorithm will find communities. Even when there are none.

Split a network into groups so that links inside groups are dense and links between them are sparse. That is community detection, it is one of the most used tools in the field, and the standard score for it is modularity: how many more within-group edges you have than you would expect by chance.

Two problems arrive together, and neither is a bug in anyone's code.

First, random graphs have high-modularity partitions. Chance produces lumps, an optimiser finds them, and nothing in the output says "this was noise". Modularity has no null hypothesis attached.

Second, and stranger: modularity cannot see small groups. Fortunato and Barthélemy showed in 2007 that maximising it will merge genuine communities if they are small enough relative to the whole network — and "small enough" depends on the total number of edges, a quantity no local community knows anything about.

So the communities you report are partly a property of the society and partly a property of how big your download was.

## Rigor

For a partition into groups, modularity is
$$Q=\frac{1}{2m}\sum_{i,j}\left(A_{ij}-\frac{k_ik_j}{2m}\right)\delta(c_i,c_j),$$
with $m$ edges; the subtracted term is the expected number of edges between $i$ and $j$ in the configuration model.

The resolution limit follows from that $2m$. Take two groups holding $\ell_1$ and $\ell_2$ internal edges and joined by $\ell_{12}$ edges. Merging them changes modularity by
$$\Delta Q \approx \frac{\ell_{12}}{m}-\frac{2\,\ell_1\ell_2}{m^{2}},$$
so the merge wins whenever $\ell_{12} > 2\ell_1\ell_2/m$. Even with a single connecting edge, $\ell_{12}=1$, the optimiser swallows both groups once $m>2\ell_1\ell_2$ — so modules with fewer than roughly $\sqrt{m/2}$ internal edges can be invisible no matter how tightly knit they are. Grow the network, leave the groups untouched, and they disappear.

Two working responses. Add a resolution parameter $\gamma$ to the null term and scan it, reporting how the partition changes rather than one answer. Or test against a matched null — rewire the graph preserving the degree sequence and check that your $Q$ is not what chance delivers.

## Recall
type: mcq
Q: Why does modularity maximisation miss small communities?
- [x] Its null term carries a global scale — the $m$ in the denominator means whether two groups merge depends on the size of the whole network, not just on them.
- [ ] Small groups have low internal density — they can be complete cliques and still be absorbed.
- [ ] The optimiser gets stuck in local maxima — that happens too, but the resolution limit is a property of $Q$ itself, at its global maximum.
