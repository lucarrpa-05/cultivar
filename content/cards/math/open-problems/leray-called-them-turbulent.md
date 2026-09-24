---
id: math.open-problems.navier-stokes.leray-called-them-turbulent
topic: math.open-problems.navier-stokes
format: fact
difficulty: 3
language: en
weight: light
angles: [history, origin]
tags: [leray, weak-solutions, navier-stokes, energy-inequality, turbulence]
hook: "In 1934 Jean Leray proved that fluid flow never stops existing. He had to let it be rough, and he called the rough solutions turbulent."
sources:
  - {title: "Sur le mouvement d'un liquide visqueux emplissant l'espace", author: "Jean Leray", year: 1934, type: paper, url: "https://doi.org/10.1007/BF02547354"}
  - {title: "Leray's fundamental work on the Navier–Stokes equations: a modern review", author: "Wojciech S. Ożański and Benjamin C. Pooley", year: 2017, type: paper, url: "https://arxiv.org/abs/1708.09787"}
  - {title: "Navier–Stokes existence and smoothness", type: wiki, url: "https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_existence_and_smoothness"}
dates: {written: 2026-09-23, event: 1934-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Qualified the open question as the unforced one (a forced blowup was claimed in Sept 2026). Difficulty 2 to 3: the rigor is weak solutions and the energy inequality."}
---

# In 1934 Leray proved water flows forever, if you let it be rough

In 1934 Jean Leray proved that the Navier–Stokes equations in three dimensions always have a solution defined for all time, from any starting flow with finite energy. The catch: his solutions may be rough, satisfying the equations only on average. He called them *solutions turbulentes*. Whether a smooth start can ever turn rough is the question the Clay Institute priced at a million dollars in 2000.

## Rigor

On $\mathbb{R}^3$, the incompressible Navier–Stokes equations for velocity $u$ and pressure $p$ are
$$\partial_tu+(u\cdot\nabla)u=\nu\Delta u-\nabla p,\qquad\nabla\cdot u=0 .$$

**Leray (1934).** For every divergence-free $u_0\in L^2$ there is a weak solution on $[0,\infty)$ satisfying the energy inequality
$$\tfrac12\|u(t)\|_{L^2}^2+\nu\int_0^t\|\nabla u(s)\|_{L^2}^2\,ds\ \le\ \tfrac12\|u_0\|_{L^2}^2 .$$
"Weak" means the equation holds after integrating against smooth test fields, so no derivative of $u$ is ever taken pointwise. He also proved that the solution is smooth for a short time, smooth forever when the data are small, agrees with any smooth solution for as long as one exists, and can only fail to be smooth on a closed set of times of measure zero.

The open part is the gap between the two halves: whether, with no external force, a Leray solution starting from smooth data can develop a singularity at all.
