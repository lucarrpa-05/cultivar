/** Inline SVG diagram. The SVG comes from our build; it is still stripped defensively. */
import { useMemo } from 'preact/hooks';
import type { Diagram as DiagramData } from '@/types';
import { sanitizeSvg } from './sanitize';

export function Diagram({ diagram }: { diagram: DiagramData }) {
  const svg = useMemo(() => (diagram.svg ? sanitizeSvg(diagram.svg) : null), [diagram.svg]);
  if (!svg) return null;
  return (
    <figure class="diagram">
      <div role="img" aria-label={diagram.alt} dangerouslySetInnerHTML={{ __html: svg }} />
      {diagram.caption ? <figcaption>{diagram.caption}</figcaption> : null}
    </figure>
  );
}
