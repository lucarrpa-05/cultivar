---
id: hist.medieval.black-death.the-plague-travelled-the-trade-routes
topic: hist.medieval.black-death
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, history]
tags: [contagion, trade-networks, caffa, ports, transmission]
hook: "Remember that epidemics spread along networks, not across maps? Here is the fourteenth century proving it."
callback: {from: css.networks.contagion, to: hist.medieval.black-death}
related: [hist.medieval.black-death.the-wages-that-would-not-fall]
sources:
  - {title: "Black Death", type: wiki, url: "https://en.wikipedia.org/wiki/Black_Death"}
  - {title: "Siege of Caffa", type: wiki, url: "https://en.wikipedia.org/wiki/Siege_of_Caffa"}
  - {title: "Second plague pandemic", type: wiki, url: "https://en.wikipedia.org/wiki/Second_plague_pandemic"}
dates: {written: 2026-09-19, event: 1347-10-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Corrected the 1347-48 chronology (Genoa/Marseille that winter, Tunis by April 1348). The Caffa catapult story is uncorroborated (de' Mussi, not an eyewitness), not 'treated with caution'."}
---

# Remember that contagion follows edges, not distance?

When you met contagion on networks, the punchline was that the map is a bad predictor. What matters is who is connected to whom, and one long-range edge can drop an outbreak into a fresh population geography would have protected for months.

The Black Death is that model drawn in blood. It did not creep outward from a point; it rode the Genoese and Venetian shipping lanes: from the Black Sea, where it broke out during the siege of Caffa in 1346, to Messina in October 1347, then Genoa and Marseille over the winter of 1347–48, and Tunis by April 1348. Ports fell first and hard; inland districts a week's cart ride from a harbour often had months of grace, and a few mountain valleys were barely touched. Distance from the outbreak predicts little. Distance along the trade graph predicts a lot.

The story attached to Caffa — besiegers catapulting plague corpses over the walls — rests on a single late chronicle by Gabriele de' Mussi, who was not there: uncorroborated rather than refuted. The network, though, is not legend: Europe's commercial connectivity, its great fourteenth-century asset, was also its delivery system.

## Rigor

A contagion on a graph is governed by the contact structure, not by Euclidean position. In the simplest branching approximation, an outbreak grows while the basic reproduction number $R_0 > 1$, and on a network with degree distribution $p_k$ the relevant quantity is the mean excess degree,

$$\kappa = \frac{\langle k^2 \rangle}{\langle k \rangle},$$

so hubs — the ports — dominate both the speed and the probability of takeoff. Medieval Europe's trade graph is exactly the heavy-tailed, small-world case: a few enormously connected harbours, many weakly connected villages, and occasional long edges that make the effective diameter small.

That is why the honest historical claim is conditional. Mortality in 1348 correlates with commercial connectivity far better than with distance from the Black Sea, and the same structure explains why plague kept returning: reintroduction along the same edges, not persistence in place.

One caveat worth carrying: the *transmission* mechanism inside a town — rat fleas, human ectoparasites, or person-to-person in pneumonic form — is still argued over, and it changes the local dynamics without changing the network story at all.

## Recall
type: mcq
Q: Why did some inland regions escape the worst of 1348 while distant ports were devastated?
- [ ] Inland populations had partial immunity — no evidence supports prior immunity in 1347.
- [x] Transmission followed trade connections — a well-connected harbour was effectively closer to the outbreak than a nearby inland valley.
- [ ] Colder inland climates killed the bacterium — plague struck cold regions, including Norway, severely.
