---
id: math.analysis.uniform-convergence.la-escalera-y-la-diagonal
topic: math.analysis.uniform-convergence
format: challenge
difficulty: 2
language: es
weight: light
angles: [paradox, weird]
tags: [convergencia-uniforme, longitud-de-arco, escalera, semicontinuidad, contraejemplo]
hook: "Una escalera de longitud 2 se pega a la diagonal de longitud raíz de 2. ¿En qué momento se pierde la longitud?"
sources:
  - {title: "Convergencia uniforme", type: wiki, url: "https://es.wikipedia.org/wiki/Convergencia_uniforme"}
  - {title: "Arc length", type: wiki, url: "https://en.wikipedia.org/wiki/Arc_length"}
dates: {written: 2026-09-19}
diagram: {file: math/escalera-diagonal.svg, caption: "Cuatro escalones y dieciséis: la longitud no cambia, la forma sí.", alt: "Dos cuadrados con su diagonal punteada; dentro de cada uno una escalera que sube del vértice inferior izquierdo al superior derecho, con cuatro y con dieciséis escalones."}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# La escalera que se pega a la diagonal y nunca se le parece

Dibuja el cuadrado unitario y su diagonal. Ahora aproxímala con una escalera: $n$ escalones horizontales y $n$ verticales, todos del mismo tamaño, subiendo desde $(0,0)$ hasta $(1,1)$.

La longitud de esa escalera es siempre la misma, sin importar cuántos escalones tenga: los tramos horizontales suman $1$ y los verticales suman $1$. Total, $2$.

Pero la escalera se acerca a la diagonal de forma uniforme: cada punto de la escalera queda a distancia menor que $1/n$ de la diagonal. Y la diagonal mide $\sqrt{2}\approx 1{,}414$.

Entonces $2\to 2$, pero el límite mide $1{,}414$. La longitud del límite no es el límite de las longitudes.

La pregunta no es si el dibujo engaña. La pregunta es: ¿qué hipótesis del argumento «la longitud pasa al límite» se está violando, y qué habría que pedirle a la sucesión para que sí pase?

## Recall
type: reveal
Q: ¿Por qué falla el paso al límite, y qué condición lo arreglaría?
A: Porque la longitud depende de las derivadas, no de los valores. La convergencia uniforme controla la posición de la curva y no la dirección: las pendientes de la escalera son $0$ e $\infty$ alternadamente y nunca se acercan a $1$. Con convergencia uniforme de las derivadas (clase $C^1$) la longitud sí pasa al límite. Sin ella solo queda una desigualdad: la longitud del límite es menor o igual que el límite inferior de las longitudes.
