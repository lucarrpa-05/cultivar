/**
 * Deterministic randomness. Pure arithmetic, no crypto, no Node/DOM APIs.
 *
 * - `mulberry32` is the seeded uniform source used by tests and by the app's
 *   per-session seed.
 * - `sampleGamma` is Marsaglia–Tsang (2000), which needs a normal deviate; we
 *   get it from the uniform source with Box–Muller.
 * - `sampleBeta(a, b) = X / (X + Y)` with `X ~ Γ(a)`, `Y ~ Γ(b)` — the Thompson
 *   sampling primitive used for every bandit arm.
 */

/** Seeded uniform in [0, 1). */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return function next(): number {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable 32-bit hash of a string, for deriving seeds from ids. */
export function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Standard normal via Box–Muller, driven by a uniform source. */
export function sampleNormal(random: () => number): number {
  let u = random();
  if (u < 1e-12) u = 1e-12;
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Gamma(shape k, scale 1) via Marsaglia–Tsang. Handles k < 1 by the standard
 * boost `Γ(k) = Γ(k+1) · U^(1/k)`.
 */
export function sampleGamma(random: () => number, shape: number): number {
  let k = shape;
  if (!(k > 0)) return 0;
  let boost = 1;
  if (k < 1) {
    const u = Math.max(random(), 1e-12);
    boost = Math.pow(u, 1 / k);
    k += 1;
  }
  const d = k - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  // Bounded loop: the acceptance rate is > 0.95, so 64 tries never runs out in
  // practice, and the bound keeps the function total.
  for (let i = 0; i < 64; i++) {
    let x = 0;
    let v = 0;
    do {
      x = sampleNormal(random);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = random();
    if (u < 1 - 0.0331 * x * x * x * x) return boost * d * v;
    if (Math.log(Math.max(u, 1e-300)) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return boost * d * v;
    }
  }
  return boost * d;
}

/** Beta(a, b) sample in (0, 1). */
export function sampleBeta(random: () => number, a: number, b: number): number {
  const x = sampleGamma(random, Math.max(a, 1e-6));
  const y = sampleGamma(random, Math.max(b, 1e-6));
  const s = x + y;
  if (!(s > 0) || !isFinite(s)) return a / Math.max(a + b, 1e-6);
  const r = x / s;
  return r <= 0 ? 1e-6 : r >= 1 ? 1 - 1e-6 : r;
}

/** Uniform integer in [0, n). */
export function randomInt(random: () => number, n: number): number {
  if (n <= 1) return 0;
  const v = Math.floor(random() * n);
  return v >= n ? n - 1 : v < 0 ? 0 : v;
}

/** Uniform integer in [lo, hi] inclusive. */
export function randomRange(random: () => number, lo: number, hi: number): number {
  if (hi <= lo) return lo;
  return lo + randomInt(random, hi - lo + 1);
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
