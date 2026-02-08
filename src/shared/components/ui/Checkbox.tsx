import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center">
        <label className="flex items-center cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="absolute opacity-0 w-0 h-0"
            {...props}
          />
          <div
            className={cn(
              "w-[18px] h-[18px] border-2 border-gray-30 rounded-md flex items-center justify-center transition-colors duration-200",
              className,
            )}
          >
            <svg
              className={cn(
                "w-[18px] h-[18px] text-black",
                "opacity-0 transition-opacity duration-200",
                "group-has-[:checked]:opacity-100",
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth={3}
            >
              <polyline
                points="20 6 9 17 4 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {label && (
            <span className="ml-[10px] text-base font-medium text-gray-40 leading-[150%]">
              {label}
            </span>
          )}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
