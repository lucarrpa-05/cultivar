---
id: niche.games.puzzles.el-divisor-sin-pareja
topic: niche.games.puzzles
format: idea
difficulty: 2
language: es
weight: medium
angles: [beautiful, tool]
tags: [casilleros, divisores, cuadrados-perfectos, involucion, paridad]
hook: "Sigue a un casillero, no a las personas: cada divisor lo toca una vez, y los divisores llegan en parejas."
related: [niche.games.puzzles.cien-casilleros]
answersQuestion: q-2026-09-20-aiz5
sources:
  - {title: "Divisibility, Western PA ARML Practice, problema 4 (los casilleros)", author: "Misha Lavrov", year: 2015, type: article, url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-20-15-solutions.pdf"}
  - {title: "Función divisor", type: wiki, url: "https://es.wikipedia.org/wiki/Funci%C3%B3n_divisor"}
  - {title: "Divisor function", type: wiki, url: "https://en.wikipedia.org/wiki/Divisor_function"}
dates: {written: 2026-09-23}
diagram: {file: niche/divisores-en-pareja.svg, caption: "Los divisores de 36 se emparejan de a dos, salvo el 6; los de 12 se emparejan todos.", alt: "Divisores unidos por arcos. Los de 36: 1 con 36, 2 con 18, 3 con 12, 4 con 9, y el 6 con un lazo propio. Los de 12: 1 con 12, 2 con 6, 3 con 4."}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "'Cabe en dos frases' became 'dos pasos' (each step of the proof is several sentences). Math, divisor list, 48 recall and diagram checked."}
---

# Los casilleros abiertos son los cuadrados: un divisor baila solo

Quedan abiertos exactamente los cuadrados perfectos: 1, 4, 9, 16, 25, 36, 49, 64, 81 y 100.

Para verlo, deja de seguir a las personas y sigue un solo casillero. Al 36 lo tocan las personas 1, 2, 3, 4, 6, 9, 12, 18 y 36: una vez por cada divisor. Empareja cada divisor con el que multiplicado da 36: 1 con 36, 2 con 18, 3 con 12, 4 con 9. Cada pareja abre y cierra, y se anula. El 6 no tiene con quién bailar, porque su pareja es él mismo, y ese toque suelto deja el casillero abierto. Al 12 todos sus divisores le llegan en pareja: termina cerrado.

La prueba completa cabe en dos pasos.

## Rigor

**Primer paso.** La persona $k$ toca el casillero $n$ si y solo si $k \mid n$. Como todo divisor de $n$ cumple $k \le n \le 100$, el casillero $n$ cambia de estado exactamente $\tau(n)$ veces, donde $\tau(n)$ es el número de divisores de $n$. Empieza cerrado, así que termina abierto si y solo si $\tau(n)$ es impar.

**Segundo paso.** La función $d \mapsto n/d$ manda divisores de $n$ en divisores de $n$ y, aplicada dos veces, devuelve el original: es una involución del conjunto $D(n)$ de divisores. Por eso $D(n)$ se parte en parejas $\{d,\ n/d\}$ y puntos fijos, que son los $d$ con $d^2 = n$. Hay exactamente un punto fijo si $n$ es un cuadrado, y ninguno si no. Entonces

$$\tau(n) \equiv \#\{d \in D(n) : d^2 = n\} \pmod 2,$$

y $\tau(n)$ es impar justo cuando $n$ es un cuadrado. Entre 1 y 100 hay $\lfloor \sqrt{100} \rfloor = 10$ cuadrados.

El divisor que baila solo es el punto fijo. Y si esta semana estás con acciones de grupo, esto es una: $\mathbb{Z}/2$ actúa sobre $D(n)$, las órbitas tienen tamaño 1 o 2, y la paridad de $|D(n)|$ es la paridad del número de puntos fijos.

**Otra ruta.** Si $n = p_1^{a_1}\cdots p_r^{a_r}$, entonces $\tau(n) = (a_1+1)\cdots(a_r+1)$, que es impar si y solo si todos los $a_i$ son pares, es decir, si $n$ es un cuadrado.

## Recall
type: reveal
Q: ¿El casillero 48 termina abierto o cerrado? Da el argumento en una línea.
A: Cerrado. 48 no es un cuadrado, así que sus divisores se emparejan todos: 1–48, 2–24, 3–16, 4–12, 6–8. Son diez toques, un número par.
