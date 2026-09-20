---
id: ai.llm.hallucination.por-que-te-inventa-la-bibliografia
topic: ai.llm.hallucination
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, paradox]
tags: [alucinacion, citas, verosimilitud, entropia-cruzada, rag]
hook: "Autores reales, revista real, año verosímil, volumen y páginas. Y el artículo no existe. No es un error del modelo: es su objetivo."
sources:
  - {title: "Survey of Hallucination in Natural Language Generation", author: "Ziwei Ji, Nayeon Lee, Rita Frieske et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2202.03629"}
  - {title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", author: "Patrick Lewis, Ethan Perez, Aleksandra Piktus et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.11401"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Rioplatense voseo (pedis, descompone, vos no tenes) replaced with the Colombian reader's usage."}
---

# Por qué te inventa la bibliografía con tanta seguridad

Le pides una referencia y te llega perfecta: autores que existen, revista que existe, año verosímil, volumen, páginas. Vas a buscarla y no está. Lo incómodo no es que falle, sino que falle con esa cara.

La explicación está en el objetivo de entrenamiento y en ningún otro lado. Al modelo se le pide poner probabilidad alta sobre la continuación que seguía en el texto; nunca se le pide que la continuación sea cierta. Y una cita bien formada es justamente lo más previsible del mundo: después de «Journal of» el siguiente token casi se escribe solo. La secuencia es altísimamente probable exista o no el artículo.

Ji y sus coautores agrupan todo esto bajo *alucinación*: texto fluido que no se sostiene en ninguna fuente. Lo peor es dónde aparece —en el borde de lo que el modelo sabe—, que es justo donde uno no tiene cómo notarlo.

Vale la pena ver por qué la forma y el hecho se separan tanto.

## Rigor

El entrenamiento minimiza la entropía cruzada

$$\mathcal{L} = -\sum_t \log p_\theta(x_t \mid x_{<t}),$$

y en esa expresión no hay ningún término que dependa de si lo dicho es verdad. El gradiente premia una cosa: previsibilidad condicional.

Ahí está la disociación. Descompón la probabilidad de una cita completa como producto de sus tokens. La estructura —apellido, coma, inicial, año entre paréntesis, nombre de revista, volumen, guion, páginas— tiene entropía condicional bajísima, porque el formato es rígido. La parte que codifica el hecho (que *ese* autor escribió *ese* artículo en *ese* volumen) aporta unos pocos tokens de entropía alta. El modelo es excelente en la primera parte y está adivinando en la segunda, y el texto resultante no distingue una de otra: sale con la misma fluidez.

De ahí que las mitigaciones que funcionan no sean «pedirle que no invente», sino cambiar el condicionamiento: poner la fuente real dentro del contexto, como en recuperación aumentada, para que la continuación verdadera sea también la más probable.

## Recall
type: mcq
Q: ¿Por qué una cita inventada suele salir con tanta fluidez y seguridad?
- [x] Porque el formato de una cita es casi determinista, así que la secuencia es muy probable aunque el hecho no exista. — la entropía baja está en la forma y la alta en el dato, y el texto no las separa.
- [ ] Porque el modelo guarda una base de datos de referencias y se equivoca al consultarla. — no hay base de datos: todo está disuelto en los pesos.
- [ ] Porque la temperatura estaba demasiado alta. — bajar la temperatura la vuelve más determinista, no más verdadera.
