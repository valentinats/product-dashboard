import { type InputHTMLAttributes, forwardRef, useRef } from "react";
import { cn } from "@/shared/lib/cn";
import EmailIcon from "@/shared/components/ui/assets/email-icon.svg";
import ClearIcon from "@/shared/components/ui/assets/close-icon.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const combinedRef = (node: HTMLInputElement) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          (ref as { current: HTMLInputElement | null }).current = node;
        }
      }
      inputRef.current = node;
    };

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-[6px] text-[18px] font-medium text-gray-60 leading-[150%]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <div className="relative">
            <input
              ref={combinedRef}
              id={inputId}
              className={cn(
                "w-full p-4 px-[54px] text-gray-60 rounded-xl focus:outline-none focus:ring-1 focus:ring-g-light-blue border transition-colors",
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-30 focus:border-g-light-blue",
                className,
              )}
              {...props}
            />
            <img
              src={EmailIcon}
              alt="email icon"
              className="absolute h-4 w-5 left-4 top-1/2 -translate-y-1/2"
            />
            <img
              src={ClearIcon}
              alt="clear icon"
              className="absolute h-4 w-[14px] right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleClear}
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
