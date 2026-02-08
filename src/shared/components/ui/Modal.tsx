import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-0 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative bg-white p-[6px] rounded-[40px]"
        style={{
          filter: "drop-shadow(0px 24px 32px rgba(0, 0, 0, 0.05))",
        }}
      >
        <div
          className={cn(
            "relative bg-white rounded-[34px] w-fit p-12 transform transition-all",
            className,
          )}
          style={{
            backgroundImage: `linear-gradient(
            180deg,
            rgba(35, 35, 35, 0.05) 0%,
            rgba(35, 35, 35, 0) 35%
          )`,
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
