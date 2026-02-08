import { useState } from "react";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { useNotifications } from "@/features/notifications/context/NotificationContext";
import { NotificationDropdown } from "@/features/notifications/components/NotificationDropdown";
import LanguageIcon from "@/shared/components/ui/assets/lang-icon.svg";
import NotificationIcon from "@/shared/components/ui/assets/notification-icon.svg";
import EmailIcon from "@/shared/components/ui/assets/email-header-icon.svg";
import SettingsIcon from "@/shared/components/ui/assets/settings-icon.svg";

interface ProductsHeaderProps {
  onSearch: (value: string) => void;
}

export function ProductsHeader({ onSearch }: ProductsHeaderProps) {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotificationClick = () => {
    if (!isDropdownOpen) {
      markAllAsRead();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white mx-8 mt-5 mb-[30px] py-[26px] px-8 rounded-[10px] relative">
      <div className="flex w-full items-center justify-between">
        <span className="text-xl font-semibold text-black">Товары</span>
        <div className="absolute flex flex-row gap-[146px] w-full items-center inset-x-1/2 transform -translate-x-1/2 w-full max-w-[1000px] px-4">
          <SearchInput placeholder="Найти" onSearch={onSearch} />
          <div className="w-px h-[56px] bg-gray-80"></div>
        </div>
        <div className="flex gap-[30px] items-center">
          <img
            src={LanguageIcon}
            alt="language icon"
            className="w-7 h-7 p-[3px] cursor-pointer"
          />
          <div className="relative">
            <img
              src={NotificationIcon}
              alt="notification icon"
              className="w-7 h-7 p-[3px] cursor-pointer"
              onClick={handleNotificationClick}
            />
            {unreadCount > 0 && (
              <div className="absolute -top-3 -right-2 bg-g-purple text-white text-xs w-[26px] h-[26px] rounded-full flex items-center justify-center font-semibold border border-[3px] border-white">
                {unreadCount}
              </div>
            )}
            <NotificationDropdown
              notifications={notifications}
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
          <img
            src={EmailIcon}
            alt="email icon"
            className="w-7 h-7 p-[3px] cursor-pointer"
          />
          <img
            src={SettingsIcon}
            alt="settings icon"
            className="w-7 h-7 p-[3px] cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
