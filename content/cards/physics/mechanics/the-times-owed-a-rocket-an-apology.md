---
id: physics.mechanics.momentum.the-times-owed-a-rocket-an-apology
topic: physics.mechanics.momentum
format: idea
difficulty: 1
language: en
weight: medium
angles: [mistake, history]
tags: [momentum, conservation, rockets, goddard, third-law]
hook: "In 1920 the New York Times explained that rockets cannot work in space. It ran the correction 49 years later."
sources:
  - {title: "Robert H. Goddard", type: wiki, url: "https://en.wikipedia.org/wiki/Robert_H._Goddard"}
  - {title: "Momentum", type: wiki, url: "https://en.wikipedia.org/wiki/Momentum"}
  - {title: "Tsiolkovsky rocket equation", type: wiki, url: "https://en.wikipedia.org/wiki/Tsiolkovsky_rocket_equation"}
dates: {written: 2026-09-19, event: 1969-07-17}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The New York Times owed a rocket an apology for 49 years

On 13 January 1920 the *New York Times* ran an editorial on Robert Goddard's claim that a rocket could reach the Moon. A rocket in vacuum has nothing to push against, it explained; Goddard "only seems to lack the knowledge ladled out daily in high schools."

On 17 July 1969, with Apollo 11 on its way, the paper printed a correction: "Further investigation and experimentation have confirmed the findings of Isaac Newton in the 17th Century and it is now definitely established that a rocket can function in a vacuum as well as in an atmosphere. The Times regrets the error."

The mistake is worth naming. A rocket does not push on the air. It pushes on its own exhaust. Stand on a skateboard and throw bricks backwards: every brick you send one way sends you the other way, and the street has nothing to do with it. Air only ever costs a rocket speed.

What is conserved is the total momentum. Here is what that buys you, and what it charges.

## Rigor

For an isolated system $\frac{d}{dt}\sum_i m_i\mathbf{v}_i = \sum_i \mathbf{F}_i^{\text{ext}} = 0$, because internal forces cancel in pairs: Newton's third law and conservation of momentum are the same statement.

Apply it to a rocket throwing mass backwards at exhaust speed $v_e$. In the instantaneous rest frame $m\,dv = -v_e\,dm$, and integrating,

$$\Delta v = v_e \ln\!\frac{m_0}{m_1}.$$

That logarithm is the bill. Chemical engines give $v_e \approx 3$ km/s; low Earth orbit costs roughly $\Delta v \approx 9.4$ km/s once you include gravity and drag losses, so $m_0/m_1 = e^{9.4/3} \approx 23$. Twenty-three kilograms on the pad per kilogram in orbit, which is why a rocket is mostly tank. The skateboard picture survives exactly: you gain speed linearly by throwing the bricks *faster*, and only logarithmically by throwing *more* of them.

## Recall
type: mcq
Q: A rocket coasting in empty space fires its engine. What does it push against?
- [ ] The surrounding air, which is thin but not absent. — in vacuum there is no air at all, and engines are more efficient there than at sea level.
- [x] Its own exhaust: the propellant it throws backwards carries momentum, so the rocket carries the opposite. — the total stays fixed, which is all a rocket ever needs.
- [ ] Earth's gravitational field, which supplies the reaction. — gravity is an external force on the rocket; it changes total momentum, it does not create thrust.
- [ ] Nothing — exhaust pressure accelerates it with no reaction involved. — pressure on the nozzle *is* the exhaust pushing back; it is momentum bookkeeping either way.
