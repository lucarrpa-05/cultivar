---
id: math.foundations.cardinality.la-biblioteca-de-babel-no-es-infinita
topic: math.foundations.cardinality
format: idea
difficulty: 2
language: es
weight: medium
angles: [numbers, connection, beautiful]
tags: [borges, biblioteca-de-babel, combinatoria, finito-vs-infinito]
hook: "Borges describe una biblioteca con todos los libros posibles. La cuenta exacta cabe en una línea, y es finita."
sources:
  - {title: "La biblioteca de Babel", type: wiki, url: "https://es.wikipedia.org/wiki/La_biblioteca_de_Babel"}
  - {title: "The Library of Babel", type: wiki, url: "https://en.wikipedia.org/wiki/The_Library_of_Babel"}
  - {title: "Ficciones", author: "Jorge Luis Borges", year: 1944, type: book, url: "https://es.wikipedia.org/wiki/Ficciones"}
dates: {written: 2026-09-19, event: 1941-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Decía que la biblioteca cayó \"del lado numerable\"; el punto del cuento es que cayó del lado finito."}
---

# La biblioteca de Babel no es infinita, y eso es lo bueno

Borges publica el cuento en 1941 y da las especificaciones como si fuera un pliego de imprenta: cada libro tiene 410 páginas, cada página 40 renglones, cada renglón unas 80 letras, y el alfabeto entero consta de veinticinco símbolos ortográficos. La biblioteca contiene todos los libros posibles con ese formato.

De ahí sale un número, no una metáfora. Son $25^{1\,312\,000}$ volúmenes: un uno seguido de más de un millón ochocientos mil ceros. Más que átomos en el universo observable, por un margen ridículo. Y sin embargo finito.

Esa es la trampa elegante del cuento. Lo inimaginable y lo infinito no son lo mismo. Si la biblioteca fuera infinita, un bibliotecario podría recorrerla para siempre sin repetir; como es finita, basta ser suficientemente terco para agotarla, y el catálogo que la describe también está adentro.

Borges lo sabía: al final anota que la biblioteca es «ilimitada y periódica». Ilimitada, no infinita. La diferencia tiene una cuenta exacta.

## Rigor

Longitud de cada libro: $410\times 40\times 80 = 1\,312\,000$ caracteres. Con un alfabeto de $k=25$ símbolos, el número de cadenas posibles es $k^{n}$, y cada libro de la biblioteca es exactamente una de esas cadenas:
$$N = 25^{1\,312\,000}.$$
Para leer el tamaño, pasa a base diez: $\log_{10} N = 1\,312\,000\cdot \log_{10} 25 \approx 1\,312\,000 \times 1{,}39794 \approx 1{,}834\times 10^{6}$, es decir $N\approx 10^{1\,834\,097}$.

Compara: el universo observable tiene del orden de $10^{80}$ átomos. La biblioteca no es grande, es absurda — y aun así pertenece a la misma clase de cardinalidad que $\{1,2,3\}$: es finita, biyectable con $\{1,\dots,N\}$.

El contraste que importa: el conjunto de *todas* las secuencias infinitas de 25 símbolos sí es incontable, con cardinal $25^{\aleph_0}=2^{\aleph_0}$. Borges eligió 410 páginas, y con ese solo detalle su biblioteca cayó del lado finito del abismo. Un libro de longitud infinita habría cambiado el cuento entero.

## Recall
type: mcq
Q: ¿Por qué la biblioteca de Babel es finita si contiene «todos los libros»?
- [x] Porque la longitud está fija — 1 312 000 caracteres sobre 25 símbolos dan $25^{1\,312\,000}$ cadenas, un número enorme pero terminado.
- [ ] Porque el alfabeto es finito — un alfabeto finito con textos de longitud libre ya daría infinitos libros, aunque numerables.
- [ ] Porque los libros se repiten — el cuento dice que no hay dos libros idénticos; la finitud viene de la longitud fija.
- [ ] Porque no cabe en el universo — la cardinalidad no depende de que el objeto quepa en algún lado.
