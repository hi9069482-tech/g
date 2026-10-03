import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProviders } from './components/FeaturedProviders';
import { LocationCoverage } from './components/LocationCoverage';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerCTA, ProviderCTA } from './components/CTASections';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { BlogPostView } from './components/BlogPostView';
import { SearchResults } from './components/SearchResults';
import { ProviderDetail } from './components/ProviderDetail';
import { PostTaskPage } from './components/PostTaskPage';
import { ServicesDirectory } from './components/ServicesDirectory';
import { UserDashboard } from './components/UserDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { ProviderRegisterPortal } from './components/ProviderRegisterPortal';
import { ProviderLoginPage } from './components/ProviderLoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { ChatModal } from './components/ChatModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { OfflineIndicator } from './components/PWAInstallButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-[#111A4A] text-white px-4 py-3 text-xs font-semibold shadow-2xl border border-white/10 animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-[#18B88A]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Offline Status */}
      <OfflineIndicator />

      {/* Header */}
      <Header />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <CategoryGrid />
            <FeaturedProviders />
            <LocationCoverage />
            <HowItWorks />
            <WhyChooseUs />
            <CustomerCTA />
            <PricingSection />
            <Testimonials />
            <ProviderCTA />
            <BlogSection />
          </>
        )}

        {activeTab === 'services' && <ServicesDirectory />}

        {activeTab === 'providers' && <SearchResults />}

        {activeTab === 'provider-detail' && <ProviderDetail />}

        {activeTab === 'post-task' && <PostTaskPage />}

        {activeTab === 'user-dashboard' && <UserDashboard />}

        {activeTab === 'provider-dashboard' && <ProviderDashboard />}

        {activeTab === 'register-provider' && <ProviderRegisterPortal />}

        {activeTab === 'provider-login' && <ProviderLoginPage />}

        {activeTab === 'admin' && <AdminDashboard />}

        {activeTab === 'blog' && (
          <div className="pt-6">
            <BlogSection />
          </div>
        )}

        {activeTab === 'blog-post' && <BlogPostView />}

        {activeTab === 'pricing' && <PricingSection />}

        {activeTab === 'how-it-works' && <HowItWorks />}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat System Modal */}
      <ChatModal />

      {/* Hostinger Guide Modal */}
      <HostingerGuideModal />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
