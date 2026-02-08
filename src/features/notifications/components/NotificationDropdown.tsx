import { useEffect, useRef } from "react";
import type { Notification } from "../types/notification";

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "только что";
  if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  return `${diffDays} дн. назад`;
}

export function NotificationDropdown({
  notifications,
  isOpen,
  onClose,
}: NotificationDropdownProps) {
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
      className="absolute top-full right-0 mt-2 w-[300px] bg-white rounded-[10px] shadow-lg border border-gray-20 z-50 animate-fade-in"
    >
      <div className="p-4 border-b border-gray-20">
        <h3 className="font-semibold text-gray-40">Уведомления</h3>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-40">Нет уведомлений</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-20 last:border-b-0 hover:bg-gray-0 transition-colors"
            >
              <p className="text-sm text-gray-40">{notification.message}</p>
              <p className="text-xs text-gray-40 mt-1">
                {formatTimeAgo(notification.timestamp)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
