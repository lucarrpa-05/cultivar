---
id: ai.llm.tokenization.el-espanol-cuesta-mas-tokens
topic: ai.llm.tokenization
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, numbers]
tags: [tokenizacion, idiomas, costo, ventana-de-contexto, equidad]
hook: "El mismo párrafo, traducido, puede costar el triple. El tokenizador cobra por pedazo, y no todos los idiomas se parten igual."
sources:
  - {title: "Language Model Tokenizers Introduce Unfairness Between Languages", author: "Aleksandar Petrov, Emanuele La Malfa, Philip H.S. Torr & Adel Bibi", year: 2023, type: paper, url: "https://arxiv.org/abs/2305.15425"}
  - {title: "Byte-pair encoding", type: wiki, url: "https://en.wikipedia.org/wiki/Byte-pair_encoding"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# El mismo texto, en español, sale más caro

Un modelo no cobra por palabra ni por letra: cobra por token, esos pedazos en que parte el texto antes de leerlo. Y los pedazos se aprenden de un corpus de entrenamiento donde el inglés manda. Las fusiones que sobreviven son las frecuentes en inglés.

Resultado: una palabra inglesa común suele entrar entera, mientras que «desafortunadamente» llega hecha cuatro o cinco fragmentos. Petrov y sus coautores midieron esto en 2023 y encontraron diferencias de hasta quince veces en la longitud tokenizada de la misma frase traducida a distintos idiomas. El español no es el caso extremo —eso les toca a las lenguas con otro alfabeto— pero paga recargo.

Y no es solo plata. La ventana de contexto se mide en tokens, así que el mismo documento en español ocupa más espacio y deja menos sitio para la conversación. La latencia también sube: más tokens, más pasos.

Vale la pena ver de dónde sale exactamente el recargo.

## Rigor

Sea un texto de $n$ caracteres que el tokenizador parte en $T$ tokens. La razón $n/T$ es la tasa de compresión del tokenizador sobre ese texto, y depende por completo del corpus donde se entrenaron las fusiones.

El algoritmo de *byte pair encoding* añade una fusión nueva cada vez que un par de símbolos adyacentes es el más frecuente del corpus. Con un vocabulario fijo de tamaño $V$ hay un presupuesto cerrado de fusiones: cada una que se gasta en un patrón del inglés es una que no se gasta en «-mente», «-ción» o «-áramos». Si el corpus es mayoritariamente inglés, el español hereda las sobras.

El costo aparece en tres sitios a la vez, porque los tres se miden en tokens: el precio por llamada crece como $T$; el contexto disponible se reduce en $T$; y el tiempo de generación es lineal en $T$. Una diferencia de tres veces en la tokenización es una diferencia de tres veces en las tres cosas.

Lo que el tokenizador descartó —los caracteres de los que hablaba la primera tarjeta— es justo lo que habría hecho equitativa la cuenta.

## Recall
type: mcq
Q: ¿Por qué un texto en español suele gastar más tokens que su traducción al inglés?
- [x] Porque las fusiones del vocabulario se aprendieron sobre un corpus dominado por el inglés, y las palabras españolas se parten en más pedazos. — el vocabulario es un presupuesto fijo repartido según la frecuencia en el corpus.
- [ ] Porque el español tiene palabras más largas en promedio. — la longitud ayuda poco: lo que manda es si la secuencia aparecía seguido en el corpus de entrenamiento.
- [ ] Porque los acentos ocupan dos tokens cada uno. — se codifican en bytes, y las fusiones frecuentes los absorben sin problema.
