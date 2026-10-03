import React from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { Home, Search, Grid, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, conversations, setIsChatModalOpen, userRole } = useApp();

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const handleTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center text-center">
        
        {/* Home */}
        <button
          onClick={() => handleTab('home')}
          className={`flex flex-col items-center py-1 text-[10px] font-medium transition ${
            activeTab === 'home' ? 'text-[#5865F2] font-bold' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Search */}
        <button
          onClick={() => handleTab('providers')}
          className={`flex flex-col items-center py-1 text-[10px] font-medium transition ${
            activeTab === 'providers' ? 'text-[#5865F2] font-bold' : 'text-gray-500'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Search</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => handleTab('services')}
          className={`flex flex-col items-center py-1 text-[10px] font-medium transition ${
            activeTab === 'services' ? 'text-[#5865F2] font-bold' : 'text-gray-500'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Services</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => setIsChatModalOpen(true)}
          className="relative flex flex-col items-center py-1 text-[10px] font-medium text-gray-500 hover:text-[#5865F2]"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#5865F2]" />
            )}
          </div>
          <span>Chat</span>
        </button>

        {/* Account / Portal */}
        <button
          onClick={() => {
            if (userRole === 'admin') handleTab('admin');
            else if (userRole === 'provider') handleTab('provider-dashboard');
            else handleTab('user-dashboard');
          }}
          className={`flex flex-col items-center py-1 text-[10px] font-medium transition ${
            activeTab.includes('dashboard') || activeTab === 'admin'
              ? 'text-[#5865F2] font-bold'
              : 'text-gray-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="capitalize">{userRole}</span>
        </button>

      </div>
    </div>
  );
};
