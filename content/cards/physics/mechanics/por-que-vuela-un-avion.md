---
id: physics.mechanics.fluids.por-que-vuela-un-avion
topic: physics.mechanics.fluids
format: idea
difficulty: 2
language: es
weight: medium
angles: [mistake, practical]
tags: [fluidos, sustentacion, bernoulli, alas, mito]
hook: "La explicación del ala que te enseñaron en el colegio es falsa, y la NASA tiene una página entera dedicada a decirlo."
sources:
  - {title: "Incorrect Lift Theory (NASA Glenn Research Center)", type: article, url: "https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/wrong1.html"}
  - {title: "Sustentación (mecánica de fluidos)", type: wiki, url: "https://es.wikipedia.org/wiki/Sustentaci%C3%B3n"}
  - {title: "Lift (force)", type: wiki, url: "https://en.wikipedia.org/wiki/Lift_(force)"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 1 to 2: the rigor is circulation and Kutta-Joukowski, past the no-equations bar for level 1. NASA Incorrect Lift Theory page verified live and supporting."}
---

# El avión no vuela por lo que te enseñaron en el colegio

La historia de siempre: el ala es más curva arriba que abajo, entonces el aire de arriba tiene que recorrer más camino en el mismo tiempo, va más rápido, y por Bernoulli la presión baja. Listo, sustentación.

Hay un problema. Nadie ha explicado nunca por qué las dos porciones de aire tendrían que reencontrarse atrás al mismo tiempo. No se reencuentran: medido, el aire de arriba llega bastante antes. La NASA tiene una página del Glenn Research Center titulada precisamente "Incorrect Lift Theory", y su argumento es letal: un perfil simétrico, con el mismo camino arriba que abajo, genera muchísima sustentación. Por eso los aviones acrobáticos vuelan de cabeza.

Lo que sí pasa es más simple y más satisfactorio: el ala desvía aire hacia abajo. Toneladas de aire por segundo, hacia abajo. El aire empuja el ala hacia arriba con la misma fuerza. Tercera ley, la misma del cohete.

Bernoulli no está mal; lo que está mal es la historia del tiempo igual.

## Rigor

Bernoulli para flujo estacionario, incompresible e irrotacional a lo largo de una línea de corriente dice

$$p + \tfrac12\rho v^2 + \rho g h = \text{constante},$$

así que donde el aire va más rápido la presión sí baja. El error del mito no es la ecuación: es suponer que la velocidad de arriba queda fijada por la longitud del camino.

La velocidad la fija la **circulación**. Definimos $\Gamma = \oint_C \mathbf{v}\cdot d\boldsymbol\ell$ alrededor del perfil. La condición de Kutta (el flujo debe salir suavemente por el borde de fuga) selecciona un único $\Gamma$, y el teorema de Kutta–Joukowski da la sustentación por unidad de envergadura:

$$L' = \rho\, v_\infty\, \Gamma .$$

Con ángulo de ataque $\alpha$ pequeño, la teoría de perfil delgado da $\Gamma = \pi c\, v_\infty \alpha$, es decir un coeficiente de sustentación $C_L = 2\pi\alpha$: la sustentación depende sobre todo del *ángulo*, no de la curvatura, y por eso un ala plana inclinada vuela.

Las dos versiones son la misma cuenta vista de dos maneras: $L' = \rho v_\infty \Gamma$ es exactamente el flujo de momento vertical que el ala le entrega al aire por segundo. Presión abajo arriba, aire empujado hacia abajo: una sola factura.

## Recall
type: mcq
Q: ¿Por qué falla la explicación de "el aire de arriba recorre más camino en el mismo tiempo"?
- [ ] Porque Bernoulli no se aplica al aire, que es compresible. — a las velocidades de un avión comercial en crucero bajo, Bernoulli funciona bien; el problema es otro.
- [x] Porque no hay ninguna razón para que las dos porciones de aire lleguen juntas al borde de fuga, y medido no llegan juntas. — la del extradós llega antes, así que el "tiempo igual" es una suposición inventada.
- [ ] Porque las alas modernas son simétricas y no tienen curvatura. — muchas sí la tienen; el punto es que la curvatura no es lo que manda.
- [ ] Porque la sustentación la produce el motor, no el ala. — el motor da empuje horizontal; un planeador sin motor vuela igual.
