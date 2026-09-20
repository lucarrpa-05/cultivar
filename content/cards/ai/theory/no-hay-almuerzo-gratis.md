---
id: ai.theory.no-free-lunch.no-hay-almuerzo-gratis
topic: ai.theory.no-free-lunch
format: idea
difficulty: 2
language: es
weight: medium
angles: [paradox, beautiful]
tags: [no-free-lunch, sesgo-inductivo, wolpert, induccion]
hook: "Promediado sobre todos los mundos posibles, tu mejor modelo empata con lanzar una moneda. La trampa está en 'todos'."
sources:
  - {title: "The Lack of A Priori Distinctions Between Learning Algorithms", author: "David H. Wolpert", year: 1996, type: paper, url: "https://doi.org/10.1162/neco.1996.8.7.1341"}
  - {title: "Teorema No Free Lunch", type: wiki, url: "https://es.wikipedia.org/wiki/Teorema_No_Free_Lunch"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# No hay almuerzo gratis: ningún algoritmo le gana a los demás

Existe un teorema que dice que tu algoritmo favorito no sirve para nada. Literalmente: promediado sobre todas las funciones objetivo posibles, cualquier método de aprendizaje acierta fuera de la muestra tanto como cualquier otro, incluido el que responde al azar. Wolpert lo demostró en 1996.

La prueba es casi trivial, y ahí está la gracia. Para cada mundo en el que tu modelo acierta en los datos que no vio, existe otro mundo idéntico en los datos que sí vio y opuesto en todo lo demás. Bajo un promedio uniforme los dos pesan igual y se cancelan. La muestra no dice nada sobre lo que está afuera, a menos que uno agregue un supuesto.

La trampa, claro, es el promedio uniforme: casi todas esas funciones son ruido sin estructura, y el mundo no es así.

Lo que el teorema prohíbe no es aprender. Es aprender sin apostar.

## Rigor

Sea $\mathcal X$ finito, $f:\mathcal X\to\{0,1\}$ la función objetivo, $S$ una muestra de tamaño $n$ y $A$ un algoritmo que devuelve $h_A=A(S)$. El error fuera de la muestra es

$$E_{\text{fuera}}(A,f,S)=\frac{1}{|\mathcal X\setminus S|}\sum_{x\notin S}\mathbb 1\big[h_A(x)\neq f(x)\big].$$

**Teorema.** Promediando uniformemente sobre todas las $f$ compatibles con las etiquetas observadas en $S$, el valor esperado de $E_{\text{fuera}}$ es $1/2$ para *todo* algoritmo $A$.

La demostración es una involución. Empareja cada $f$ con la $f'$ que coincide con $f$ dentro de $S$ y difiere en todo punto de fuera. La biyección preserva la compatibilidad con la muestra y convierte cada acierto en un error, así que cada pareja aporta exactamente $|\mathcal X\setminus S|$ errores en total. El promedio da $1/2$ sin que la identidad de $A$ intervenga en ningún paso.

Dos lecturas honestas. La primera: el resultado habla de la *medida uniforme* sobre funciones, que concentra casi toda su masa en funciones incompresibles, es decir ruido. La segunda, la útil: como ningún sesgo inductivo gana en promedio, elegir un algoritmo equivale a afirmar algo sobre el mundo. La pregunta correcta nunca fue cuál algoritmo es mejor, sino qué supuesto sobre los datos uno está dispuesto a defender.

## Recall
type: mcq
Q: ¿Qué prohíbe exactamente el teorema del no free lunch?
- [x] Que un algoritmo le gane a otro promediando sobre todas las funciones objetivo posibles — dentro de una clase estructurada de problemas sí hay métodos mejores.
- [ ] Que se pueda aprender a partir de datos finitos — se aprende perfectamente bien; lo que hace falta es un supuesto sobre qué mundos son plausibles.
- [ ] Que existan algoritmos buenos en la práctica — el teorema es compatible con que un método domine en todos los problemas que a uno le importan.
