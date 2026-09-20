---
id: niche.places.maps-projections.mercator-was-doing-his-job
topic: niche.places.maps-projections
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, mistake]
tags: [mercator, conformal, rhumb-line, area-distortion, cartography]
related: [niche.places.maps-projections.how-many-greenlands]
hook: "Mercator's map is not a bad picture of the world. It is a very good picture of a compass bearing."
sources:
  - {title: "Mercator projection", type: wiki, url: "https://en.wikipedia.org/wiki/Mercator_projection"}
  - {title: "Map projection", type: wiki, url: "https://en.wikipedia.org/wiki/Map_projection"}
dates: {written: 2026-09-19, event: 1569-01-01}
diagram: {file: niche/mercator-area-inflation.svg, caption: "Four patches of identical true size, drawn where Mercator puts them: the area factor is the square of the secant of the latitude.", alt: "A map grid with four circles at the equator and at thirty, sixty and seventy-five degrees north; each is larger than the one below, labelled area times one, one point three, four and fifteen"}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the reciprocal related link to the Greenland challenge card."}
---

# Greenland is not the size of Africa, and Mercator knew

Gerardus Mercator published his world map in 1569 with a title that gives away the whole game: *…ad Usum Navigantium*, for the use of navigators. He was not trying to show you how big places are. He was solving one problem: make a course of constant compass bearing come out as a straight line you can rule on the chart.

That problem has exactly one solution, and the solution demands the distortion. To keep angles right, the map has to stretch north–south by exactly as much as it has already stretched east–west — and near the poles that is a lot. Greenland ends up looking the size of Africa, which has about fourteen times the area.

So the familiar complaint is aimed at the wrong target. A Mercator map on a ship's table is a precision instrument. The same map on a classroom wall, where nobody is plotting a course and everybody is comparing continents, is a category error that has been repeated for four centuries.

The stretching factor is worth deriving, because it explains the whole thing.

## Rigor

A parallel at latitude $\varphi$ has true length $2\pi R\cos\varphi$, but on a rectangular map it is drawn the full width. So the east–west scale factor is $\sec\varphi$.

Conformality — angles preserved — requires the north–south scale to match it at every point. That forces

$$\frac{dy}{d\varphi}=\sec\varphi \quad\Longrightarrow\quad y(\varphi)=\ln\!\left|\tan\!\left(\tfrac{\pi}{4}+\tfrac{\varphi}{2}\right)\right| ,$$

the Mercator ordinate, and a divergence at $\varphi\to\pm 90^{\circ}$: the poles are infinitely far up the page, which is why no Mercator map shows them.

Area scales as the product of the two factors:

$$\text{area factor}=\sec^{2}\varphi .$$

At $30^{\circ}$ that is $1.33$. At $60^{\circ}$ it is exactly $4$. At $75^{\circ}$ it is about $15$. Greenland lies almost entirely north of $60^{\circ}$ and Africa straddles the equator, so the two are being drawn on wildly different scales in the same picture. Nothing is wrong with the map; the reader is just using it for a question it was never asked.

## Recall
type: mcq
Q: Why must a map that turns constant compass bearings into straight lines inflate the polar regions?
- [x] Keeping angles correct forces the north–south stretch to equal the east–west stretch $\sec\varphi$, so areas grow as $\sec^{2}\varphi$ — unbounded as you approach the poles.
- [ ] Because the Earth is an oblate spheroid rather than a sphere — a real but tiny effect, nothing like the polar inflation.
- [ ] Because paper is rectangular and the Earth is not — many rectangular projections preserve area; the inflation comes from conformality specifically.
