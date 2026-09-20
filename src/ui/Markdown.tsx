/**
 * Markdown + KaTeX.
 *
 * `$…$` and `$$…$$` are pulled out before `marked` runs (so the parser never
 * sees them) and re-inserted as empty spans; KaTeX is imported lazily on the
 * first card that needs it and fills the spans. The HTML is sanitised with an
 * allowlist either way.
 */
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitize';

interface MathBit {
  tex: string;
  display: boolean;
}

marked.setOptions({ gfm: true, breaks: false });

/** Mask fenced/inline code so `$` inside code is never treated as math. */
function maskCode(src: string): { text: string; code: string[] } {
  const code: string[] = [];
  const text = src
    .replace(/```[\s\S]*?```/g, (m) => `@@C${code.push(m) - 1}@@`)
    .replace(/`[^`\n]*`/g, (m) => `@@C${code.push(m) - 1}@@`);
  return { text, code };
}

/** One pass, so the placeholders come out in document order. */
const MATH_RE = /\$\$([\s\S]+?)\$\$|(?<!\\)\$([^$\n]+?)(?<!\\)\$/g;

function extractMath(src: string): { text: string; math: MathBit[] } {
  const math: MathBit[] = [];
  const text = src.replace(MATH_RE, (_m, block: string | undefined, inline: string | undefined) => {
    const tex = (block ?? inline ?? '').trim();
    return `@@M${math.push({ tex, display: block !== undefined }) - 1}@@`;
  });
  return { text, math };
}

export function renderMarkdown(src: string): { html: string; math: MathBit[] } {
  const masked = maskCode(src ?? '');
  const extracted = extractMath(masked.text);
  const restored = extracted.text.replace(/@@C(\d+)@@/g, (_m, i: string) => masked.code[Number(i)] ?? '');
  const raw = marked.parse(restored, { async: false }) as string;
  const withMath = raw.replace(
    /@@M(\d+)@@/g,
    (_m, i: string) =>
      `<span data-math="${i}" data-display="${extracted.math[Number(i)]?.display ? '1' : '0'}"></span>`,
  );
  return { html: sanitizeHtml(withMath), math: extracted.math };
}

let katexPromise: Promise<typeof import('katex').default | null> | null = null;

function loadKatex(): Promise<typeof import('katex').default | null> {
  katexPromise ??= Promise.all([import('katex'), import('katex/dist/katex.min.css')])
    .then(([mod]) => mod.default)
    .catch(() => null);
  return katexPromise;
}

interface Props {
  text: string;
  lang?: string;
  class?: string;
}

export function Markdown({ text, lang, class: className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const { html, math } = useMemo(() => renderMarkdown(text), [text]);

  useEffect(() => {
    const el = host.current;
    if (!el || !math.length) return;
    let cancelled = false;
    void loadKatex().then((katex) => {
      if (cancelled || !katex) {
        // No KaTeX: show the source so the reader still gets the formula.
        el.querySelectorAll<HTMLElement>('[data-math]').forEach((node) => {
          const bit = math[Number(node.dataset.math)];
          if (bit) node.textContent = bit.display ? `\n${bit.tex}\n` : bit.tex;
        });
        return;
      }
      el.querySelectorAll<HTMLElement>('[data-math]').forEach((node) => {
        const bit = math[Number(node.dataset.math)];
        if (!bit) return;
        try {
          node.innerHTML = katex.renderToString(bit.tex, {
            displayMode: bit.display,
            throwOnError: false,
            output: 'html',
            strict: 'ignore',
          });
          node.classList.add('math');
        } catch {
          node.textContent = bit.tex;
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      ref={host}
      class={`prose${className ? ` ${className}` : ''}`}
      lang={lang && lang !== 'en' ? lang : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
