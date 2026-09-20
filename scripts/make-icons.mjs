#!/usr/bin/env node
/**
 * Generates the PWA PNG icons from the same mark as public/icons/icon.svg.
 *
 * No native dependencies: the mark is a handful of filled polygons plus a
 * stroked polyline, rasterised with 3x3 supersampling and written as PNG
 * with node zlib. Run `npm run icons` after changing the mark.
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');

// ---- geometry (in the 512x512 space of icon.svg, group shifted by -10 in y) ----
const quad = (p0, p1, p2, n = 24) => {
  const pts = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n, u = 1 - t;
    pts.push([
      u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
      u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    ]);
  }
  return pts;
};
const cubic = (p0, p1, p2, p3, n = 32) => {
  const pts = [p0];
  for (let i = 1; i <= n; i++) {
    const t = i / n, u = 1 - t;
    pts.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]);
  }
  return pts;
};
const shift = (pts) => pts.map(([x, y]) => [x, y - 10]);

const leafRight = shift([[254, 282], ...quad([254, 282], [330, 158], [404, 166]), ...quad([404, 166], [356, 262], [254, 282])]);
const leafLeft = shift([[247, 312], ...quad([247, 312], [176, 224], [112, 244]), ...quad([112, 244], [150, 322], [247, 312])]);
const stem = shift(cubic([256, 404], [256, 344], [254, 306], [248, 274]));
const seed = { c: [256, 394], r: 11 };

const inPoly = (x, y, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const distSeg = (x, y, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy || 1;
  let t = ((x - a[0]) * dx + (y - a[1]) * dy) / l2;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(a[0] + t * dx - x, a[1] + t * dy - y);
};
const nearPolyline = (x, y, pts, w) => {
  for (let i = 1; i < pts.length; i++) if (distSeg(x, y, pts[i - 1], pts[i]) <= w) return true;
  return false;
};
const inRoundRect = (x, y, size, r) => {
  const cx = Math.min(Math.max(x, r), size - r), cy = Math.min(Math.max(y, r), size - r);
  return Math.hypot(x - cx, y - cy) <= r;
};

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const BG_TOP = hex('#181f28'), BG_BOT = hex('#0b0d11');
const LEAF_A = hex('#3fbd8d'), LEAF_B = hex('#7ff0c0'), LEAF_DARK = hex('#35a175'), STEM = hex('#3fa77c');

/** Colour of the mark at a point in 512-space, or null where only the plate shows. */
function mark(x, y) {
  if (inPoly(x, y, leafRight)) {
    return mix(LEAF_A, LEAF_B, clamp01(((x - 240) / 170) * 0.6 + ((300 - y) / 170) * 0.4));
  }
  if (inPoly(x, y, leafLeft)) return LEAF_DARK;
  if (nearPolyline(x, y, stem, 8.5)) return STEM;
  if (Math.hypot(x - seed.c[0], y - seed.c[1] + 10) <= seed.r) return STEM;
  return null;
}

function render(size, opts) {
  const maskable = Boolean(opts && opts.maskable);
  const SS = 3;
  const contentScale = maskable ? 0.62 : 0.86; // maskable keeps the mark inside the 80% safe zone
  const radius = maskable ? 0 : (112 / 512) * size;
  const buf = Buffer.alloc(size * size * 4);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const fx = (px + (sx + 0.5) / SS) / size, fy = (py + (sy + 0.5) / SS) / size;
          if (radius > 0 && !inRoundRect(fx * size, fy * size, size, radius)) continue;
          let col = mix(BG_TOP, BG_BOT, clamp01(fy));
          const mx = 256 + ((fx - 0.5) * 512) / contentScale;
          const my = 256 + ((fy - 0.5) * 512) / contentScale;
          const m = mark(mx, my);
          if (m) col = m;
          r += col[0]; g += col[1]; b += col[2]; a += 255;
        }
      }
      const n = SS * SS, i = (py * size + px) * 4;
      const cov = a / (n * 255);
      buf[i] = Math.round(cov ? r / (n * cov) : 0);
      buf[i + 1] = Math.round(cov ? g / (n * cov) : 0);
      buf[i + 2] = Math.round(cov ? b / (n * cov) : 0);
      buf[i + 3] = Math.round(a / n);
    }
  }
  return buf;
}

// ---- minimal PNG encoder ----
const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function png(size, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0;
    rgba.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync(OUT, { recursive: true });
const jobs = [
  ['icon-192.png', 192, {}],
  ['icon-512.png', 512, {}],
  ['icon-maskable-192.png', 192, { maskable: true }],
  ['icon-maskable-512.png', 512, { maskable: true }],
  ['apple-touch-icon.png', 180, { maskable: true }],
];
for (const job of jobs) {
  writeFileSync(path.join(OUT, job[0]), png(job[1], render(job[1], job[2])));
  console.log('wrote public/icons/' + job[0]);
}
