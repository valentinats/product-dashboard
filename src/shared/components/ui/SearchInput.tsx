import { type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export function SearchInput({
  className,
  onSearch,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <svg
        className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className={cn(
          "w-full bg-gray-5 pl-[52px] pr-5 py-3 rounded-lg text-gray-60 placeholder:text-gray-70 text-sm focus:outline-none",
          className,
        )}
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
    </div>
  );
}
