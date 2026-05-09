"use client";
import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@kwasu-portal/utils-others";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[920px]",
  full: "max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)]",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: string;
  size?: ModalSize;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
  closeOnOverlay = true,
  className,
}: ModalProps) {
  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-6",
        "animate-[fade-in_150ms_ease_both]",
      )}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
        aria-hidden="true"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-desc" : undefined}
        className={cn(
          "relative z-10 w-full flex flex-col",
          "max-h-[90vh] overflow-hidden",
          "rounded-2xl bg-[var(--bg-surface)] shadow-[var(--shadow-2xl)]",
          "animate-[scale-in_200ms_var(--ease-bounce)_both]",
          SIZE_CLASSES[size],
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-serif text-2xl font-semibold text-[var(--fg-base)] leading-snug"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-desc"
                  className="font-sans text-sm text-[var(--fg-muted)] mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 mt-0.5 rounded-lg p-1.5 text-[var(--fg-subtle)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg-base)] transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/** Confirm dialog shorthand */
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  dangerous?: boolean;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  dangerous = false,
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-[var(--border-base)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-sm font-semibold transition-all disabled:opacity-50",
              dangerous
                ? "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-dark)]"
                : "bg-[var(--color-gold-500)] text-[var(--color-green-900)] hover:bg-[var(--color-gold-300)]",
            )}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {confirmLabel}
          </button>
        </>
      }
    >
      <div />
    </Modal>
  );
}
