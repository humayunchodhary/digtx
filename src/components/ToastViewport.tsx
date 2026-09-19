import { useToast } from '../context/ToastContext';

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-[2rem] left-1/2 z-[200] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-[0.8rem]"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast flex items-center justify-between gap-[1rem] rounded-[8px] px-[1.4rem] py-[1.1rem] text-[1.35rem] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${
            t.type === 'error'
              ? 'bg-[#ec0101]'
              : t.type === 'info'
                ? 'bg-[#222]'
                : 'bg-[#109533]'
          }`}
          role="status"
        >
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="text-white/80 hover:text-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
