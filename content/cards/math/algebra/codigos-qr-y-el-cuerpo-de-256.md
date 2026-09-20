---
id: math.algebra.fields-extensions.codigos-qr-y-el-cuerpo-de-256
topic: math.algebra.fields-extensions
format: idea
difficulty: 3
language: es
weight: medium
angles: [practical, connection]
tags: [cuerpos-finitos, reed-solomon, codigo-qr, correccion-de-errores, polinomios]
hook: "Tape con el pulgar una esquina de un código QR y sigue funcionando. La razón es aritmética en un cuerpo de 256 elementos."
sources:
  - {title: "QR code", type: wiki, url: "https://en.wikipedia.org/wiki/QR_code"}
  - {title: "Reed-Solomon", type: wiki, url: "https://es.wikipedia.org/wiki/Reed-Solomon"}
  - {title: "Cuerpo finito", type: wiki, url: "https://es.wikipedia.org/wiki/Cuerpo_finito"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The minimum-distance argument was wrong; rewrote it in the evaluation form and noted that the QR encoder uses the equivalent cyclic form."}
---

# Por qué un código QR sobrevive a que le tapen una esquina

Ponga el pulgar sobre una esquina de un código QR y el teléfono lo sigue leyendo. No es redundancia bruta, no es que el dibujo esté repetido: es álgebra de cuerpos finitos, impresa en cada etiqueta que usted escanea.

Los bytes de un QR no se tratan como números enteros sino como elementos de $\mathbb{F}_{256}$, un cuerpo con exactamente 256 elementos donde sumar es un XOR y multiplicar es multiplicar polinomios módulo $x^8+x^4+x^3+x^2+1$. Dentro de ese cuerpo, el mensaje se lee como los coeficientes de un polinomio, y se le añaden símbolos extra hasta que ese polinomio sea múltiplo de uno fijo. Eso es un código Reed–Solomon.

La gracia es vieja y simple: dos polinomios distintos de grado bajo coinciden en muy pocos puntos, así que dos mensajes válidos difieren en muchísimas posiciones. Los cuatro niveles del estándar recuperan aproximadamente el 7%, 15%, 25% y 30% de los bytes.

Lo que se usa aquí es exactamente el primer curso de cuerpos.

## Rigor

$\mathbb{F}_{256}=\mathbb{F}_2[x]/(x^8+x^4+x^3+x^2+1)$, con el polinomio elegido irreducible sobre $\mathbb{F}_2$. Sus elementos son los polinomios de grado menor que 8 con coeficientes en $\{0,1\}$, es decir, exactamente los bytes: sumar es XOR y multiplicar es multiplicar y reducir.

Un código Reed–Solomon de longitud $n\le 255$ y dimensión $k$ se define así: el mensaje $(m_0,\dots,m_{k-1})$ se lee como el polinomio $f(x)=m_0+m_1x+\cdots+m_{k-1}x^{k-1}$, y la palabra que se transmite es la lista de evaluaciones
$$\big(f(1),\,f(\alpha),\,f(\alpha^{2}),\,\dots,\,f(\alpha^{n-1})\big),$$
donde $\alpha$ genera el grupo multiplicativo $\mathbb{F}_{256}^{\times}$, cíclico de orden 255.

De ahí sale la distancia mínima en una línea: dos polinomios distintos de grado menor que $k$ coinciden a lo sumo en $k-1$ puntos, porque su diferencia es no nula de grado menor que $k$. Así que dos palabras distintas difieren en al menos $d=n-k+1$ posiciones. Con eso se corrigen $\lfloor (d-1)/2\rfloor$ errores en posiciones desconocidas, y se recuperan $d-1$ símbolos si se sabe dónde faltan — que es el caso del pulgar. El codificador del QR usa la forma cíclica equivalente: las palabras son los múltiplos de $g(x)=\prod_{i=0}^{n-k-1}(x-\alpha^{i})$ de grado menor que $n$, el mismo código salvo un reetiquetado de las posiciones.

## Recall
type: mcq
Q: ¿Por qué dos palabras distintas de un código Reed–Solomon difieren en tantas posiciones?
- [x] Porque cada palabra es la lista de valores de un polinomio de grado menor que $k$ — dos polinomios distintos de ese grado coinciden a lo sumo en $k-1$ de los $n$ puntos, así que las palabras difieren en al menos $n-k+1$.
- [ ] Porque los bytes se repiten varias veces en el dibujo — no hay repetición; la protección viene de la estructura algebraica, no de copiar datos.
- [ ] Porque $\mathbb{F}_{256}$ tiene característica 2 — la característica hace cómodo el XOR, pero la distancia mínima sale del grado del generador.
