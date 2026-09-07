"use client";
import { useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function Dialog({
  title,
  trigger,
  children,
  buttonClass = "button button-outline",
  onOpen,
}: {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  buttonClass?: string;
  onOpen?: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  return (
    <>
      <button
        className={buttonClass}
        onClick={() => {
          ref.current?.showModal();
          onOpen?.();
        }}
      >
        {trigger}
      </button>
      <dialog
        className="dialog"
        ref={ref}
        aria-labelledby={id}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            )
              ref.current?.close();
          }
        }}
      >
        <div className="dialog-header">
          <h2 id={id}>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={() => ref.current?.close()}
          >
            <X size={21} />
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </dialog>
    </>
  );
}
