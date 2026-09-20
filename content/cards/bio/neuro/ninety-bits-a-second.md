---
id: bio.neuro.neural-coding.ninety-bits-a-second
topic: bio.neuro.neural-coding
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers]
tags: [neural-coding, entropy, mutual-information, spike-trains, h1-neuron]
callback: {from: math.probability.information-entropy, to: bio.neuro.neural-coding}
hook: "Entropy told you how much a message could say. Point it at a fly's spike train and you get a number: about 90 bits a second."
sources:
  - {title: "Entropy and Information in Neural Spike Trains, Physical Review Letters 80, 197", author: "Steven P. Strong, Roland Koberle, Rob de Ruyter van Steveninck, William Bialek", year: 1998, type: paper, url: "https://doi.org/10.1103/PhysRevLett.80.197"}
  - {title: "Function and coding in the blowfly H1 neuron during naturalistic optic flow, Journal of Neuroscience 25", author: "J. H. van Hateren, R. Kern, G. Schwerdtfeger, M. Egelhaaf", year: 2005, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6725116/"}
  - {title: "Spikes: Exploring the Neural Code", author: "Fred Rieke, David Warland, Rob de Ruyter van Steveninck, William Bialek", year: 1997, type: book, url: "https://mitpress.mit.edu/9780262681087/spikes/"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Dropped an unsupported claim (rates \"double from 25 ms to sub-millisecond\"): Strong et al. scan 800 ms to 2 ms, entropy rate rising ~40x at ~50% efficiency. 90 bits/s and 0.5-2 bits/spike verified."}
---

# Remember entropy? A fly's neuron carries about 90 bits a second

Entropy measured how much a distribution could surprise you: the average number of yes/no questions needed to pin down an outcome. A spike train is a message written in that alphabet — spike, no spike, at some time resolution — so the same machinery applies without modification, and it gives a number.

The recipe is beautifully direct. Show a fly a moving visual scene and record one motion-sensitive neuron. Chop the spike train into short words. Measure how much variety the words show over the whole recording: that is the total entropy, the neuron's full vocabulary. Then replay exactly the same scene over and over and measure how much variety remains: that is noise, the part of the vocabulary the stimulus does not control. Subtract.

What is left is information, and for the blowfly's H1 neuron it runs up to about 90 bits per second, roughly one to two bits per spike — within about a factor of two of the ceiling set by the spike train's own entropy.

One honest warning before the arithmetic: bits per spike is not a constant of nature.

## Rigor

Write $R$ for the response word and $S$ for the stimulus. With words built as binary vectors over $T/\Delta\tau$ bins,

$$H(R)=-\sum_r p(r)\log_2 p(r), \qquad H(R\mid S)=\Big\langle -\sum_r p(r\mid s)\log_2 p(r\mid s)\Big\rangle_s,$$

$$I(R;S)=H(R)-H(R\mid S).$$

$H(R)$ is estimated from the whole recording, $H(R\mid S)$ from repeated presentations of the identical stimulus at matched times. Both are biased upward by finite sampling, so you extrapolate in $1/N$, and both depend on $T$, so you extrapolate the rates in $1/T$.

Two consequences worth carrying. First, $I(R;S)\le H(R)$: a neuron can never transmit more than the entropy of its own spike train, which makes "efficiency" $I/H(R)$ a meaningful quantity — and H1 runs at roughly half of its own ceiling.

Second, the numbers are conditional on your choices. Finer $\Delta\tau$ reveals more structure and raises the estimate: across the range Strong and colleagues scanned, 800 ms bins down to 2 ms, the spike train's own entropy rate climbs by a factor of about forty, and the information climbs roughly in step — efficiency stays near half the whole way. Different stimulus statistics then move bits per spike from about 0.5 to about 2 in the very same neuron. Information is a property of the channel *and* of what you send down it — which is exactly what entropy said in the first place.

## Recall
type: mcq
Q: In the direct method, what does subtracting the noise entropy from the total entropy accomplish?
- [x] It removes the variability the stimulus does not control, leaving only the variety that actually depends on the input — that residual is the information.
- [ ] It corrects for the neuron's background firing rate — rate is already inside both terms; what is removed is trial-to-trial unreliability.
- [ ] It converts the spike count into bits — the count becomes bits as soon as you build word distributions; the subtraction is about reliability.
- [ ] It compensates for finite sampling bias — real, but handled separately by extrapolating in the number of samples.
