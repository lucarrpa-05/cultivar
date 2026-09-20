/** Thin ring around the You tab: today's active minutes against the daily goal. */
interface Props {
  progress: number;
  size?: number;
  label?: string;
}

export function GoalRing({ progress, size = 34, label }: Props) {
  const p = Math.max(0, Math.min(1, progress));
  const r = (size - 3) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg
      class="goal-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" stroke-width="2" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={p >= 1 ? 'var(--accent)' : 'var(--accent)'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray={`${c * p} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        opacity={p > 0 ? 1 : 0}
        style={p >= 1 ? { filter: 'drop-shadow(0 0 4px var(--accent))' } : undefined}
      />
    </svg>
  );
}
