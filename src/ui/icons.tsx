/** Inline 24x24 icons, stroke: currentColor. No icon font, no images. */
import type { JSX } from 'preact';

type P = JSX.SVGAttributes<SVGSVGElement> & { filled?: boolean };

const base = (props: P): JSX.SVGAttributes<SVGSVGElement> => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 1.7,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'aria-hidden': 'true',
  ...props,
});

export const IconHeart = ({ filled, ...p }: P) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.6-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.7C19 15.4 12 20 12 20z" />
  </svg>
);

export const IconBookmark = ({ filled, ...p }: P) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z" />
  </svg>
);

export const IconSkip = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h13" />
    <path d="m13 7 5 5-5 5" />
  </svg>
);

export const IconPeak = (p: P) => (
  <svg {...base(p)}>
    <path d="m3 19 6-11 4 6 2.5-3.5L21 19z" />
    <path d="M14 4.5h3.5V8" />
  </svg>
);

export const IconDots = (p: P) => (
  <svg {...base(p)}>
    <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFeed = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="3.5" width="16" height="12" rx="2.5" />
    <path d="M7.5 19.5h9" />
  </svg>
);

export const IconMap = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="7" r="2.2" />
    <circle cx="18" cy="9" r="2.2" />
    <circle cx="11" cy="17.5" r="2.2" />
    <path d="M8 7.8 15.9 9M7.1 9 10 15.4M16.8 11l-4 5" />
  </svg>
);

export const IconSaved = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4.4L5.5 20.5v-16a1 1 0 0 1 1-1z" />
  </svg>
);

export const IconYou = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c2 3.2 2 5.4 0 8-2-2.6-2-4.8 0-8z" />
    <path d="M12 11.5v9" />
    <path d="M12 14c-1.8-2.2-3.8-2.6-6-1.4 1.2 2.4 3 3.2 6 2.4z" />
    <path d="M12 16.5c1.8-2.2 3.8-2.6 6-1.4-1.2 2.4-3 3.2-6 2.4z" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6" />
    <path d="m16 16 4 4" />
  </svg>
);

export const IconLink = (p: P) => (
  <svg {...base(p)}>
    <path d="M10 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L11 7.5" />
    <path d="M14 10.5a3.5 3.5 0 0 0-5 0L6.5 13a3.5 3.5 0 0 0 5 5l1.5-1.5" />
  </svg>
);

export const IconFlag = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 20V4.5h11l-2 3.5 2 3.5H6" />
  </svg>
);

export const IconQuestion = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 1.9-2.2 3.4" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.7L12 18l-1.6-5.7L5 10.6 10.4 9z" />
  </svg>
);

export const IconDown = (p: P) => (
  <svg {...base(p)}>
    <path d="m7 10 5 5 5-5" />
  </svg>
);

export const IconRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m10 7 5 5-5 5" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);

export const IconRefresh = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4v4.5h-4.5" />
  </svg>
);

export const IconShuffle = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 6h3.5l9 12H20M4 18h3.5l2.2-3M14.3 9l2.2-3H20" />
    <path d="M17.5 3.5 20 6l-2.5 2.5M17.5 15.5 20 18l-2.5 2.5" />
  </svg>
);
