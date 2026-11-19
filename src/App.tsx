import React, { useState } from 'react';
import { AuthProvider, useAuth } from './application/AuthContext';
import { LanguageProvider } from './application/LanguageContext';
import { LoginPage } from './presentation/pages/LoginPage';
import { MainLayout } from './presentation/components/layout/MainLayout';
import { DashboardPage } from './presentation/pages/DashboardPage';
import { AnalyticsPage } from './presentation/pages/AnalyticsPage';
import { OrdersPage } from './presentation/pages/OrdersPage';
import { ProductsPage } from './presentation/pages/ProductsPage';
import { LeaderboardPage } from './presentation/pages/LeaderboardPage';
import { ContactsPage } from './presentation/pages/ContactsPage';
import { MessagesPage } from './presentation/pages/MessagesPage';
import { SettingsPage } from './presentation/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { user, token, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center font-poppins text-sm text-[#737791]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#5D5FEF] border-t-transparent rounded-full animate-spin" />
          <span>Đang xác thực phiên quản trị viên...</span>
        </div>
      </div>
    );
  }

  // Admin not logged in: only show admin login (single account hhh/hhh)
  if (!token || !user) {
    return <LoginPage />;
  }

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardPage onNavigateTab={setActiveTab} />}
      {activeTab === 'analytics' && <AnalyticsPage />}
      {activeTab === 'orders' && <OrdersPage />}
      {activeTab === 'products' && <ProductsPage />}
      {activeTab === 'leaderboard' && <LeaderboardPage />}
      {activeTab === 'contacts' && <ContactsPage />}
      {activeTab === 'messages' && <MessagesPage />}
      {activeTab === 'settings' && <SettingsPage />}
    </MainLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
