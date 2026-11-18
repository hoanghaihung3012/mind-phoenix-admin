import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAFBFC] font-poppins selection:bg-[#5D5FEF] selection:text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenMenu={() => setIsSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
