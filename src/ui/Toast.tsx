/** One toast at a time, 4 seconds, with an optional Undo. */
import { dismissToast, useApp } from '@/app/state';

export function Toast() {
  const toast = useApp((s) => s.toast);
  return (
    <div class="toast-wrap" aria-live="polite">
      {toast ? (
        <div class="toast" key={toast.id}>
          <span class="grow">{toast.text}</span>
          {toast.action ? (
            <button
              onClick={() => {
                toast.action?.();
                dismissToast();
              }}
            >
              {toast.actionLabel ?? 'Undo'}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
