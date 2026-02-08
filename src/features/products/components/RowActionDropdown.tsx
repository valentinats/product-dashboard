import { useEffect, useRef } from "react";

interface RowActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function RowActionDropdown({
  isOpen,
  onClose,
  onEdit,
}: RowActionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-14 bg-white rounded-[10px] shadow-lg border border-gray-20 z-50 animate-fade-in"
    >
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="w-full p-4 text-sm text-black hover:bg-gray-5 transition-colors rounded-[10px]"
      >
        Редактировать
      </button>
    </div>
  );
}
