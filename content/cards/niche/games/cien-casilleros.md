---
id: niche.games.puzzles.cien-casilleros
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: es
weight: light
angles: [weird, beautiful]
tags: [casilleros, divisores, cuadrados-perfectos, paridad]
hook: "Cien personas abren y cierran casilleros. Al final quedan abiertos exactamente diez."
sources:
  - {title: "Locker Doors", type: article, url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-20-15-solutions.pdf"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# Los diez casilleros que no se cierran

Hay cien casilleros cerrados, numerados del 1 al 100. La primera persona cambia el estado de todos. La segunda cambia cada segundo casillero; la tercera, cada tercero. Así hasta la persona cien, que solo toca el suyo. ¿Cuáles quedan abiertos?

Seguir a las personas una por una sería tedioso. Sigue, en cambio, al casillero 36: lo tocan exactamente las personas cuyos números dividen 36. Casi todos los divisores llegan por parejas, como 2 y 18. Pero uno puede quedarse sin pareja. ¿Cuál? Esa pequeña excepción explica por qué sobreviven abiertos tan pocos casilleros.

## Recall
type: reveal
Q: ¿Qué casilleros quedan abiertos, y por qué?
A: Los cuadrados perfectos: 1, 4, 9, …, 100. Cada divisor provoca un cambio, y los divisores se emparejan salvo la raíz cuadrada de un cuadrado perfecto; por eso solo esos casilleros cambian un número impar de veces.
