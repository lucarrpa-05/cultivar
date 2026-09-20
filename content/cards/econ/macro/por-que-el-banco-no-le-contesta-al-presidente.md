---
id: econ.macro.central-banks.por-que-el-banco-no-le-contesta-al-presidente
topic: econ.macro.central-banks
topics: [econ.history-thought.colombian-economy]
format: idea
difficulty: 2
language: es
weight: medium
angles: [practical, history]
tags: [banco-de-la-republica, constitucion-1991, independencia, inconsistencia-temporal, inflacion-objetivo]
hook: "La Constitución de 1991 dice que el banco central no le presta plata al gobierno salvo por unanimidad. Esa frase tiene teoría detrás."
sources:
  - {title: "Banco de la República (Colombia) — autonomía, Junta Directiva y Ley 31 de 1992", type: wiki, url: "https://es.wikipedia.org/wiki/Banco_de_la_Rep%C3%BAblica_(Colombia)"}
  - {title: "Constitución de Colombia de 1991", type: encyclopedia, url: "https://es.wikipedia.org/wiki/Constituci%C3%B3n_de_Colombia_de_1991"}
  - {title: "Rules Rather than Discretion: The Inconsistency of Optimal Plans", author: "Finn E. Kydland & Edward C. Prescott", year: 1977, type: paper, url: "https://doi.org/10.1086/260580"}
dates: {written: 2026-09-19, event: 1991-07-04}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Por qué el Banco de la República no le contesta al presidente

La Constitución de 1991 hizo algo poco romántico y muy efectivo: les quitó a los políticos la máquina de imprimir. Los artículos 371 a 373 crearon un banco central con autonomía, una junta directiva que es la máxima autoridad monetaria, cambiaria y crediticia, y un mandato explícito —mantener la capacidad adquisitiva de la moneda—. Financiar al gobierno requiere el voto unánime de esa junta.

La razón no es que los políticos sean malos, sino que el problema es de incentivos. A cualquier gobierno le conviene prometer inflación baja y luego, una vez firmados los contratos y los salarios, dar un empujón monetario para ganar algo de empleo. Como todo el mundo sabe que le conviene, nadie le cree: los salarios se negocian con la inflación esperada incorporada y el país termina con inflación alta y el mismo empleo de antes. Kydland y Prescott le pusieron nombre en 1977: inconsistencia temporal.

La solución es institucional. Si quien decide no gana elecciones, la promesa se vuelve creíble. La inflación colombiana pasó de niveles de dos dígitos a comienzos de los noventa a un dígito desde finales de la década.

## Rigor

Tómese una curva de Phillips aumentada por expectativas, $u=u_n-a(\pi-\pi^e)$, y un gobierno que minimiza

$$L=(u-ku_n)^2+\theta\pi^2,\qquad 0<k<1,$$

es decir, que quiere desempleo por debajo del natural. Bajo **discreción**, el gobierno elige $\pi$ tomando $\pi^e$ como dado; la condición de primer orden da $\pi>0$. Pero en equilibrio los agentes no se dejan sorprender de forma sistemática: $\pi^e=\pi$, y entonces $u=u_n$.

Resultado: inflación positiva y ningún empleo adicional. Bajo **regla** —un banco que simplemente anuncia y cumple $\pi=0$— se obtiene el mismo desempleo con inflación cero. La regla domina, y aun así no es un equilibrio si quien manda puede cambiar de opinión mañana.

De ahí el diseño: la independencia no es una opinión sobre la bondad de los banqueros, es un mecanismo de compromiso. Y por eso tiene su propia tensión democrática — una autoridad con enorme poder distributivo y sin urnas encima.

## Recall
type: mcq
Q: ¿Cuál es el argumento económico para que el banco central sea independiente?
- [x] Sin compromiso, el gobierno siempre tiene incentivo a sorprender con inflación, y como todos lo anticipan el resultado es inflación alta sin ganancia de empleo. — la independencia hace creíble la promesa.
- [ ] Porque los tecnócratas entienden la economía mejor que los políticos. — el argumento no depende de quién sea más competente, sino de quién puede comprometerse.
- [ ] Porque así se elimina el desempleo de largo plazo. — el desempleo de largo plazo no depende de la política monetaria en este modelo.
- [ ] Porque impide que el banco central pierda dinero. — la solvencia del banco no es el problema que motiva el diseño.
