---
id: math.topology.knots.your-dna-is-knotted
topic: math.topology.knots
topics: [bio.genetics.dna-structure]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, practical]
tags: [dna-topology, topoisomerase, linking-number, supercoiling]
hook: "Remember that knottedness lives in the complement, not the curve? Your cells run an enzyme whose whole job is knot theory."
callback: {from: math.topology.knots, to: bio.genetics.dna-structure}
sources:
  - {title: "DNA supercoil", type: wiki, url: "https://en.wikipedia.org/wiki/DNA_supercoil"}
  - {title: "Topoisomerase", type: wiki, url: "https://en.wikipedia.org/wiki/Topoisomerase"}
  - {title: "DNA topology", type: wiki, url: "https://en.wikipedia.org/wiki/DNA_topology"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember knots? Your cells employ a professional untangler

Remember the point about knottedness: it is not a property of the curve, it is a property of how the curve sits in space, and no amount of stretching fixes it. Biology ran into that wall about three billion years before anyone wrote it down.

DNA is two strands wound around each other roughly once every 10.5 base pairs, and in bacteria the whole molecule is a closed loop. Now try to read it. The replication machinery has to separate the strands, and separating strands of a closed double helix means unwinding it — which, because the ends are joined, cannot be done. The twist has nowhere to go. It piles up ahead of the fork as supercoiling, and the molecule seizes.

Cells solve it the only way topology allows: they cut. Topoisomerases break one strand or both, pass the other through the gap, and reseal. That is a move no continuous deformation can perform, and it is exactly the move that changes the knot type.

## Rigor

For a closed double helix, the **linking number** $Lk$ — the number of times one strand encircles the other — is a topological invariant of the two closed curves. It cannot change under any deformation that keeps both backbones intact. Călugăreanu's identity splits it into geometry:
$$Lk = Tw + Wr,$$
where $Tw$ is the twist of the strands about the duplex axis and $Wr$ is the writhe, the coiling of the axis in space. Relaxed B-DNA has $Lk_0 \approx N/10.5$ for $N$ base pairs; the superhelical density is $\sigma=(Lk-Lk_0)/Lk_0$, typically about $-0.06$ in bacteria.

Unwinding at a replication fork lowers $Tw$ locally. Since $Lk$ is fixed, $Wr$ must absorb the difference: the axis writhes, and the molecule supercoils.

Type I topoisomerases nick a single strand and change $Lk$ by $\pm1$; type II enzymes (gyrase, topo IV) cut both strands and pass a duplex segment through, changing $Lk$ by $\pm2$ and using ATP. Type II enzymes also unknot and unlink whole chromosomes after replication, and the knots they leave behind have been identified by gel electrophoresis and matched against knot tables.

## Recall
type: mcq
Q: Why must a cell cut DNA to relieve supercoiling?
- [x] Linking number is a topological invariant of the closed double helix — no deformation can change it, so only a cut-and-reseal can.
- [ ] Because the molecule is too long to rotate — length slows things down, but even a short closed duplex has a linking number that deformation cannot alter.
- [ ] Because the two strands are chemically different — they are complementary, and chemistry is not what blocks the unwinding; the closure of the loop is.
