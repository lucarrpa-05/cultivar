/**
 * HTML/SVG sanitising. Card bodies come from our own build, but they are
 * rendered with innerHTML, so they go through an allowlist anyway.
 */

const ALLOWED = new Set([
  'p', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
  'h3', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'sup', 'sub',
]);

/** Tags whose content is dropped entirely rather than unwrapped. */
const DROP = new Set(['script', 'style', 'iframe', 'object', 'embed', 'template', 'svg', 'math', 'form', 'input', 'button']);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href']),
  span: new Set(['data-math', 'data-display']),
};

export function sanitizeHtml(html: string): string {
  if (typeof DOMParser === 'undefined') return '';
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  walk(doc.body);
  return doc.body.innerHTML;
}

function walk(root: Element): void {
  for (const el of [...root.children]) {
    const tag = el.tagName.toLowerCase();
    if (DROP.has(tag)) {
      el.remove();
      continue;
    }
    walk(el);
    if (!ALLOWED.has(tag)) {
      // Unwrap: keep the text, lose the element (h1/h2/img/div/…).
      el.replaceWith(...el.childNodes);
      continue;
    }
    const allowed = ALLOWED_ATTRS[tag];
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (!allowed?.has(name)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (name === 'href') {
        const href = attr.value.trim();
        if (!/^https:\/\//i.test(href)) el.removeAttribute('href');
        else {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  }
}

/**
 * Diagrams are inline SVG produced by our build (validated by the content
 * tooling), but scripts and handlers are stripped defensively anyway.
 */
export function sanitizeSvg(svg: string): string | null {
  if (typeof DOMParser === 'undefined') return null;
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || root.nodeName === 'parsererror' || root.nodeName.toLowerCase() !== 'svg') return null;
  const stack: Element[] = [root];
  while (stack.length) {
    const el = stack.pop() as Element;
    const tag = el.nodeName.toLowerCase();
    if (tag === 'script' || tag === 'foreignobject') {
      el.remove();
      continue;
    }
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      if ((name === 'href' || name === 'xlink:href') && !attr.value.startsWith('#')) el.removeAttribute(attr.name);
      if (name === 'style' && /url\s*\(|expression/i.test(attr.value)) el.removeAttribute(attr.name);
    }
    for (const child of [...el.children]) stack.push(child);
  }
  root.removeAttribute('width');
  root.removeAttribute('height');
  root.setAttribute('focusable', 'false');
  return new XMLSerializer().serializeToString(root);
}
