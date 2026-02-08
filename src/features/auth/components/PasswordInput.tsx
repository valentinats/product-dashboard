import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import PasswordIcon from "@/shared/components/ui/assets/password-icon.svg";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || "password";

    return (
      <div className="mt-4 mb-5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-[6px] text-[18px] font-medium text-gray-60 leading-[150%]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
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
            src={PasswordIcon}
            alt="password icon"
            className="absolute h-5 w-5 left-4 top-1/2 -translate-y-1/2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-30"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9C9C9C70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="2" y1="2" x2="20" y2="20" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9C9C9C70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
