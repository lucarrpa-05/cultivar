---
id: math.open-problems.collatz-goldbach.goldbach-tiene-dos-mitades
topic: math.open-problems.collatz-goldbach
topics: [math.number-theory.divisibility-primes]
format: story
difficulty: 3
language: es
weight: medium
angles: [human, history, open-problem]
tags: [goldbach, helfgott, conjetura-ternaria, metodo-del-circulo, vinogradov, primos]
hook: "Una carta de 1742 dejó dos preguntas sobre primos. Un matemático nacido en Lima cerró una en 2013. La otra sigue abierta."
related: [math.number-theory.prime-distribution.seventy-million-and-falling]
sources:
  - {title: "Conjetura de Goldbach", type: wiki, url: "https://es.wikipedia.org/wiki/Conjetura_de_Goldbach"}
  - {title: "Harald Helfgott", type: wiki, url: "https://es.wikipedia.org/wiki/Harald_Helfgott"}
  - {title: "The ternary Goldbach conjecture is true", author: "H. A. Helfgott", year: 2013, type: paper, url: "https://arxiv.org/abs/1312.7748"}
  - {title: "Numerical Verification of the Ternary Goldbach Conjecture up to 8.875e30", author: "H. A. Helfgott y D. J. Platt", year: 2013, type: paper, url: "https://arxiv.org/abs/1305.3062"}
dates: {written: 2026-09-23, event: 2013-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Euler's 30 June reply recalled the even version as an earlier idea of Goldbach's, it was not Euler's own: fixed. Difficulty 2 to 3 (the rigor is the circle method). Trimmed to 120 words."}
---

# La conjetura de Goldbach tiene dos mitades, y un limeño cerró una

El 7 de junio de 1742 Christian Goldbach le escribió a Euler que todo entero mayor que 2 parecía ser suma de tres primos; él contaba el 1 como primo. Euler le contestó el 30 de junio recordándole una idea anterior del propio Goldbach, la que hoy lleva su nombre: todo número par es suma de dos primos.

La pregunta se parte en dos. La mitad impar: todo impar mayor que 5 es suma de tres primos. Vinogradov la probó en 1937 para impares "suficientemente grandes", con un umbral de millones de cifras. En 2013 Harald Helfgott, nacido en Lima, bajó el umbral hasta que un computador pudo revisar el resto.

La mitad par, la famosa, sigue abierta.

## Rigor

**Enunciados.** Binaria (fuerte): todo par $n\ge4$ es $p+q$ con $p,q$ primos. Ternaria (débil): todo impar $n\ge7$ es $p+q+r$. La fuerte implica la débil, porque $n-3$ es par.

**El método del círculo.** Con $S(\alpha)=\sum_{p\le n}e^{2\pi ip\alpha}$, el número de representaciones como suma de tres primos es
$$r_3(n)=\int_0^1S(\alpha)^3\,e^{-2\pi in\alpha}\,d\alpha .$$
Cerca de los racionales de denominador pequeño (los *arcos mayores*) $S$ es grande y se puede calcular; el término principal resulta del orden de $n^2/\log^3n$. En el resto (los *arcos menores*) hay que acotar $|S|$. Si esa cota es menor que el término principal, $r_3(n)>0$.

**Helfgott** afinó las dos estimaciones con constantes explícitas; la verificación numérica con David Platt cubre todos los impares hasta $8{,}875\cdot10^{30}$, y el análisis se encarga de los de arriba.

**Por qué la binaria resiste.** Con dos primos la integral es $\int_0^1S(\alpha)^2e^{-2\pi in\alpha}d\alpha$, cuyo término principal es del orden de $n/\log^2n$. Pero por Parseval $\int_0^1|S|^2=\pi(n)\approx n/\log n$: incluso la mejor cota promedio de los arcos menores es más grande que lo que se quiere probar. Lo más cerca que se ha llegado es Chen (1973): todo par grande es un primo más un número con a lo sumo dos factores primos.

## Recall
type: reveal
Q: ¿Por qué la conjetura fuerte (dos primos) implica la débil (tres primos)?
A: Si $n\ge7$ es impar, $n-3$ es par y mayor o igual que 4; escríbelo como $p+q$ y entonces $n=3+p+q$. El camino inverso no funciona, por eso probar la débil no resuelve la fuerte.
