import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimatingOut) return null;

  return createPortal(
    <div
      className={cn(
        "fixed bottom-6 right-[30px] z-50 flex items-center gap-3 bg-white px-5 py-4 rounded-[10px] shadow-lg border border-gray-20",
        isAnimatingOut ? "animate-toast-out" : "animate-toast-in",
      )}
    >
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-gray-40 font-medium">{message}</span>
      <button
        onClick={() => {
          setIsAnimatingOut(true);
          setTimeout(() => {
            setIsAnimatingOut(false);
            onClose();
          }, 300);
        }}
        className="ml-2 text-gray-40"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
