"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  body?: string;
  duration: number;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, "id">) => void;
  success: (title: string, body?: string) => void;
  error: (title: string, body?: string) => void;
  warning: (title: string, body?: string) => void;
  info: (title: string, body?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const ACCENTS: Record<ToastVariant, string> = {
  success: "border-l-[var(--color-success)]",
  warning: "border-l-[var(--color-warning)]",
  danger: "border-l-[var(--color-danger)]",
  info: "border-l-[var(--color-info)]",
  neutral: "border-l-[var(--border-strong)]",
};

const ICON_COLORS: Record<ToastVariant, string> = {
  success: "text-[var(--color-success)]",
  warning: "text-[var(--color-warning)]",
  danger: "text-[var(--color-danger)]",
  info: "text-[var(--color-info)]",
  neutral: "text-[var(--fg-muted)]",
};

const DEFAULT_ICONS: Record<ToastVariant, string> = {
  success: "✓",
  warning: "⚠",
  danger: "✕",
  info: "ℹ",
  neutral: "•",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const item: ToastItem = {
        id,
        ...opts,
        duration: opts.duration ?? 4000,
      };
      setToasts((prev) => [...prev, item]);
      setTimeout(() => dismiss(id), item.duration);
    },
    [dismiss],
  );

  const success = useCallback(
    (title: string, body?: string) =>
      toast({ variant: "success", title, body, duration: 3500 }),
    [toast],
  );
  const error = useCallback(
    (title: string, body?: string) =>
      toast({ variant: "danger", title, body, duration: 5000 }),
    [toast],
  );
  const warning = useCallback(
    (title: string, body?: string) =>
      toast({ variant: "warning", title, body, duration: 4500 }),
    [toast],
  );
  const info = useCallback(
    (title: string, body?: string) =>
      toast({ variant: "info", title, body, duration: 4000 }),
    [toast],
  );

  return (
    <ToastContext.Provider
      value={{ toast, success, error, warning, info, dismiss }}
    >
      {children}

      {/* Toast container — fixed bottom-right */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          aria-label="Notifications"
          className="fixed bottom-6 right-6 z-[800] flex flex-col gap-2 items-end"
        >
          {toasts.map((t) => (
            <div
              key={t.id}
              role="status"
              className={[
                "flex items-start gap-3 rounded-xl border border-l-4 p-4",
                "bg-[var(--bg-surface)] shadow-[var(--shadow-xl)]",
                "w-[360px] max-w-[calc(100vw-48px)]",
                "animate-[notif-enter_0.35s_var(--ease-bounce)_both]",
                ACCENTS[t.variant],
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "mt-0.5 shrink-0 text-base font-bold leading-none",
                  ICON_COLORS[t.variant],
                ].join(" ")}
              >
                {DEFAULT_ICONS[t.variant]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-semibold text-[var(--fg-base)]">
                  {t.title}
                </p>
                {t.body && (
                  <p className="font-sans text-xs text-[var(--fg-muted)] mt-0.5 leading-relaxed">
                    {t.body}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="shrink-0 text-lg leading-none font-light text-[var(--fg-subtle)] opacity-50 hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
