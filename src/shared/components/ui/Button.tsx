import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "accent", isLoading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "mt-5 py-4 rounded-xl text-[18px] font-semibold leading-[115%] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "accent" &&
            "bg-accent text-white border-[1px] border-solid border-g-light-blue",
          className,
        )}
        {...props}
      >
        {isLoading ? "Загрузка..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";
