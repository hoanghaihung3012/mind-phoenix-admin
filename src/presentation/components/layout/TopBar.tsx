import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../../application/AuthContext';
import { Avatar } from '../ui/Avatar';

export const TopBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-[#F8F9FA] px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-[#737791] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-[#F9FAFB] border border-[#EFF1F6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#151D48] placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF] transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Language selector */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#151D48] cursor-pointer hover:opacity-80">
          <span className="w-5 h-3.5 bg-red-600 rounded-sm inline-block relative overflow-hidden shadow-xs">
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-300">★</span>
          </span>
          <span>VIE (VN)</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-2xl bg-[#FFF4DE] text-[#FFA800] flex items-center justify-center hover:opacity-90 transition-opacity">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FA5A7D] ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#EFF1F6]">
          <Avatar
            src={user?.avatar}
            name={user?.name || 'Administrator'}
            size="md"
            isOnline={true}
          />
          <div className="text-left">
            <div className="text-sm font-bold text-[#151D48] leading-tight">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[11px] text-[#737791] font-medium">
              Account: <span className="text-[#5D5FEF] font-bold">hhh</span> (Admin)
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
