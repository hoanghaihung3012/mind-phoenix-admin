import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../../application/AuthContext';
import { Avatar } from '../ui/Avatar';

interface TopBarProps {
  onOpenMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMenu }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-[#F8F9FA] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Area: Mobile Hamburger + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
        {onOpenMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-2 -ml-1 rounded-xl text-[#151D48] hover:bg-[#F9FAFB] active:bg-[#EFF1F6] lg:hidden transition-colors"
            aria-label="Mở menu điều hướng"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
          <Search className="w-4 h-4 text-[#737791] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full bg-[#F9FAFB] border border-[#EFF1F6] rounded-2xl pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs text-[#151D48] placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0">
        {/* Language selector - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#151D48] cursor-pointer hover:opacity-80">
          <span className="w-5 h-3.5 bg-red-600 rounded-sm inline-block relative overflow-hidden shadow-xs shrink-0">
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-300">★</span>
          </span>
          <span className="hidden md:inline">VIE (VN)</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Thông báo"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFF4DE] text-[#FFA800] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shrink-0"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#FA5A7D] ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-[#EFF1F6]">
          <Avatar
            src={user?.avatar}
            name={user?.name || 'Administrator'}
            size="md"
            isOnline={true}
          />
          <div className="text-left hidden sm:block">
            <div className="text-xs sm:text-sm font-bold text-[#151D48] leading-tight truncate max-w-[120px] md:max-w-none">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#737791] font-medium">
              Account: <span className="text-[#5D5FEF] font-bold">hhh</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
