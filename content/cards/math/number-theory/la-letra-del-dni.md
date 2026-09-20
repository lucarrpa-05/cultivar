---
id: math.number-theory.modular.la-letra-del-dni
topic: math.number-theory.modular
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, tool, numbers]
tags: [dni, digito-de-control, modulo-23, codigos-detectores]
hook: "La letra de tu DNI no es un adorno burocrático: es aritmética modular trabajando contra los dedos torpes."
sources:
  - {title: "Documento nacional de identidad (España)", type: wiki, url: "https://es.wikipedia.org/wiki/Documento_nacional_de_identidad_(Espa%C3%B1a)"}
  - {title: "Número de identificación fiscal", type: wiki, url: "https://es.wikipedia.org/wiki/N%C3%BAmero_de_identificaci%C3%B3n_fiscal"}
  - {title: "Dígito de control", type: wiki, url: "https://es.wikipedia.org/wiki/D%C3%ADgito_de_control"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# La letra del DNI es un teorema disfrazado de trámite

Todo DNI español termina en una letra. No la eligió nadie: se calcula. Divides el número entre 23, miras el resto y buscas la letra en una tabla fija de veintitrés posiciones. Nada más.

El punto no es la letra, es lo que detecta. Si te equivocas al teclear un dígito, el número cambia en $\pm d\cdot 10^{k}$, y como 23 es primo y no divide a ninguna potencia de diez, el resto cambia sí o sí: la letra ya no cuadra y el sistema te frena antes de crear un expediente fantasma.

Lo mismo con el error más humano de todos, intercambiar dos dígitos vecinos. Ahí el número cambia en un múltiplo de 9, y 23 tampoco perdona.

Hay un detalle de diseño escondido en la tabla, y explica por qué faltan cuatro letras del abecedario.

## Rigor

Sea $n$ el número del documento y $r=n \bmod 23$. La letra es la posición $r$ de la cadena
$$\texttt{T R W A G M Y F P D X B N J Z S Q V H L C K E}$$
(la I, la Ñ, la O y la U se excluyen: se confunden con 1, con N, con 0 y entre sí al leerlas a mano).

**Por qué funciona.** Trabajamos en $\mathbb{Z}/23\mathbb{Z}$, que es un cuerpo porque 23 es primo.

*Un dígito mal tecleado.* El error es $e=\pm d\cdot 10^{k}$ con $1\le d\le 9$. En $\mathbb{Z}/23\mathbb{Z}$, $10$ es invertible y $d\not\equiv 0$, luego $e\not\equiv 0 \pmod{23}$: el resto cambia y la letra falla. Detección del 100 % de los errores de un solo dígito.

*Transposición de vecinos.* Cambiar $\ldots ab \ldots$ por $\ldots ba \ldots$ altera el número en $\pm(a-b)\cdot 9\cdot 10^{k}$, con $|a-b|\le 9$. Como $23$ es primo y no divide ni a 9, ni a $10^k$, ni a $a-b$ salvo si $a=b$, el resto vuelve a moverse. Detección total.

Con módulo 10 (el dígito de control ingenuo) las transposiciones pasan desapercibidas: por eso el ISBN-10 usa 11 y el NIT colombiano usa 11 con pesos primos. La aritmética modular no adivina el número correcto, solo se niega a aceptar uno falso.

## Recall
type: mcq
Q: ¿Por qué el DNI usa módulo 23 y no módulo 10?
- [x] Porque 23 es primo y no divide a 9 ni a las potencias de 10 — eso garantiza detectar todo error de un dígito y toda transposición de vecinos.
- [ ] Porque hay 23 letras disponibles en el abecedario — la tabla tiene 23 entradas porque el módulo es 23, no al revés.
- [ ] Porque con 23 el resto nunca es cero — el resto 0 existe y corresponde a la letra T.
- [ ] Porque módulo 10 daría números demasiado grandes — el tamaño no cambia; lo que cambia es qué errores quedan invisibles.
