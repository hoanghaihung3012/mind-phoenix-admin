import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  ShoppingCart,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Flame,
  Inbox,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../../application/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen = false,
  onClose,
}) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { id: 'orders', label: 'Order', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'contacts', label: 'Khách hàng liên hệ', icon: <Inbox className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          'bg-white flex flex-col justify-between p-6 shrink-0 z-50 transition-transform duration-300 ease-in-out',
          // Desktop styles: fixed height, border, sticky
          'lg:static lg:h-screen lg:w-64 lg:border-r lg:border-[#F8F9FA] lg:translate-x-0 lg:shadow-none',
          // Mobile styles: fixed drawer
          'fixed inset-y-0 left-0 w-72 shadow-2xl lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5D5FEF] flex items-center justify-center text-white shadow-[0px_4px_14px_rgba(93,95,239,0.35)] shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#151D48] tracking-tight">MindPhoenix</h1>
                <span className="text-[10px] uppercase font-bold text-[#5D5FEF] bg-[#5D5FEF]/10 px-1.5 py-0.5 rounded tracking-wider">
                  Admin Portal
                </span>
              </div>
            </div>

            {/* Close button for mobile drawer */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-[#737791] hover:text-[#151D48] hover:bg-[#F9FAFB] lg:hidden"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {menuItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={clsx(
                    'w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left',
                    isActive
                      ? 'bg-[#5D5FEF] text-white shadow-[0px_4px_14px_rgba(93,95,239,0.25)]'
                      : 'text-[#737791] hover:text-[#151D48] hover:bg-[#F9FAFB]'
                  )}
                >
                  <span className={clsx('shrink-0', isActive ? 'text-white' : 'text-[#737791]')}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#F8F9FA] mt-auto">
          {/* Pro Card */}
          <div className="bg-gradient-to-br from-[#5D5FEF] to-[#7F81FF] rounded-[24px] p-4 sm:p-5 text-white shadow-[0px_10px_24px_rgba(93,95,239,0.25)] mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2.5">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-sm font-bold tracking-tight">MindPhoenix Admin</h4>
            <p className="text-[11px] text-white/80 mt-0.5">
              Admin: <span className="font-bold underline">hhh</span>
            </p>
          </div>

          {/* Sign Out */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-semibold text-[#FA5A7D] hover:bg-[#FFE2E5]/50 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
