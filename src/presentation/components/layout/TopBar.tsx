import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../../application/AuthContext';
import { useLanguage } from '../../../application/LanguageContext';
import { Avatar } from '../ui/Avatar';

interface TopBarProps {
  onOpenMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMenu }) => {
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-[#F8F9FA] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Area: Mobile Hamburger + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
        {onOpenMenu && (
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-2 -ml-1 rounded-xl text-[#151D48] hover:bg-[#F9FAFB] active:bg-[#EFF1F6] lg:hidden transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
          <Search className="w-4 h-4 text-[#737791] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#F9FAFB] border border-[#EFF1F6] rounded-2xl pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs text-[#151D48] placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
        {/* Language switcher - Interactive button */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#EFF1F6] bg-[#F9FAFB] hover:bg-[#EFF1F6] hover:border-[#D0D4E4] transition-all text-xs font-semibold text-[#151D48] cursor-pointer shadow-2xs"
          title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
        >
          {language === 'vi' ? (
            <>
              <span className="w-5 h-3.5 bg-red-600 rounded-[2px] inline-flex items-center justify-center text-[9px] text-yellow-300 font-bold shadow-2xs shrink-0 select-none">
                ★
              </span>
              <span className="font-bold text-[#151D48]">VIE</span>
            </>
          ) : (
            <>
              <span className="w-5 h-3.5 bg-blue-700 rounded-[2px] inline-flex items-center justify-center text-[8px] text-white font-bold tracking-tighter shadow-2xs shrink-0 select-none">
                EN
              </span>
              <span className="font-bold text-[#151D48]">ENG</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label={t('notifications')}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFF4DE] text-[#FFA800] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shrink-0"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#FA5A7D] ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 border-l border-[#EFF1F6]">
          <Avatar
            src={user?.avatar}
            name={user?.name || t('adminRole')}
            size="md"
            isOnline={true}
          />
          <div className="text-left hidden sm:block">
            <div className="text-xs sm:text-sm font-bold text-[#151D48] leading-tight truncate max-w-[120px] md:max-w-none">
              {user?.name || t('adminRole')}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#737791] font-medium">
              {t('account')}: <span className="text-[#5D5FEF] font-bold">hhh</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
