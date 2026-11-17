import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activeTab,
  setActiveTab,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-[#FAFBFC] font-poppins selection:bg-[#5D5FEF] selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};
