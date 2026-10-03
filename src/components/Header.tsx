import React, { useState, useEffect } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  Menu, 
  X, 
  PlusCircle, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  User, 
  Briefcase, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Server
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    userRole, 
    setUserRole, 
    activeTab, 
    setActiveTab, 
    conversations,
    setIsChatModalOpen,
    setIsHostingerModalOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navLinks: { label: string; labelUrdu: string; tab: NavTab }[] = [
    { label: 'Home', labelUrdu: 'ہوم', tab: 'home' },
    { label: 'Services', labelUrdu: 'سروسز', tab: 'services' },
    { label: 'Providers', labelUrdu: 'کاریگر', tab: 'providers' },
    { label: 'How It Works', labelUrdu: 'طریقہ کار', tab: 'how-it-works' },
    { label: 'Pricing', labelUrdu: 'پیکجز', tab: 'pricing' },
    { label: 'Blog', labelUrdu: 'بلاگ', tab: 'blog' },
    { label: 'Contact', labelUrdu: 'رابطہ', tab: 'contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5'
          : 'bg-white border-b border-gray-100/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Urdu Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          >
            {/* Custom Brand Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#111A4A] flex items-center justify-center shadow-sm shadow-[#111A4A]/20 transition-transform group-hover:scale-105">
              <svg className="w-6 h-6" viewBox="0 0 512 512" fill="none">
                <path d="M256 70 C160 70 86 144 86 240 C86 330 200 415 242 443 C250 448 262 448 270 443 C312 415 426 330 426 240 C426 144 352 70 256 70 Z" fill="#5865F2" />
                <path d="M256 140 L166 220 L196 220 L196 320 L316 320 L316 220 L346 220 Z" fill="#FFFFFF" />
                <circle cx="256" cy="245" r="26" fill="#18B88A" />
                <path d="M246 245 L252 251 L266 237" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="340" cy="150" r="14" fill="#F5A623" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#111A4A]">
                  PakPattan
                </span>
                <span className="font-heading font-semibold text-lg sm:text-xl tracking-tight text-[#5865F2]">
                  Services Hub
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                {language === 'ur' ? 'پاکپتن کی ہر سروس، ایک جگہ' : 'Hyperlocal Service Directory & Marketplace'}
              </p>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => {
              const isActive = activeTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`text-sm font-medium transition-colors hover:text-[#5865F2] ${
                    isActive
                      ? 'text-[#5865F2] font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {language === 'ur' ? link.labelUrdu : link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Language Switcher: English | اردو */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:border-[#5865F2] hover:text-[#5865F2] transition bg-white"
              title="Toggle English / Urdu Language"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span className={language === 'ur' ? 'font-urdu font-bold' : ''}>
                {language === 'en' ? 'اردو' : 'English'}
              </span>
            </button>

            {/* Internal Chat Button with Badge */}
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="relative p-2 rounded-lg text-gray-600 hover:text-[#111A4A] hover:bg-gray-100 transition"
              title="Open Chat Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {totalUnread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5865F2] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </button>

            {/* Role Switcher & Portal Selector */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700 transition"
              >
                {userRole === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5865F2]" />
                ) : userRole === 'provider' ? (
                  <Briefcase className="w-3.5 h-3.5 text-[#18B88A]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-gray-600" />
                )}
                <span className="capitalize">{userRole} View</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-1.5 z-50 text-xs animate-in fade-in"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-semibold text-gray-400">
                    Switch App Experience:
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                      setActiveTab('user-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 ${userRole === 'customer' ? 'text-[#5865F2] font-semibold bg-gray-50' : 'text-gray-700'}`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('provider');
                      setActiveTab('provider-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 ${userRole === 'provider' ? 'text-[#18B88A] font-semibold bg-gray-50' : 'text-gray-700'}`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Provider Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setActiveTab('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 ${userRole === 'admin' ? 'text-[#111A4A] font-semibold bg-gray-50' : 'text-gray-700'}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Control Center</span>
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsHostingerModalOpen(true);
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-50"
                    >
                      <Server className="w-3.5 h-3.5 text-[#5865F2]" />
                      <span>Hostinger Deployment</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Become a Service Provider Button (Prompt Section 1) */}
            <button
              onClick={() => handleNavClick('register-provider')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#18B88A]/40 bg-[#E2FFF5] hover:bg-[#d0fced] px-3.5 py-2 text-xs font-bold text-[#111A4A] transition whitespace-nowrap active:scale-95"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#18B88A]" />
              <span>{language === 'ur' ? 'کاریگر بنیں' : 'Become a Service Provider'}</span>
            </button>

            {/* Primary CTA: Post a Task (Orange/Yellow Accent per Brand Spec) */}
            <button
              onClick={() => handleNavClick('post-task')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#F5A623] hover:bg-[#e09419] px-4 py-2 text-xs font-semibold text-[#111A4A] shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#111A4A]" />
              <span>{language === 'ur' ? 'کام درج کریں' : 'Post a Task'}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Quick Task + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnread > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#5865F2]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('post-task')}
              className="rounded-lg bg-[#F5A623] px-3 py-1.5 text-xs font-bold text-[#111A4A]"
            >
              {language === 'ur' ? 'کام درج کریں' : 'Post Task'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          
          {/* Quick Language & Role bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-700"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{language === 'en' ? 'اردو زبان' : 'Switch to English'}</span>
            </button>

            <div className="flex items-center gap-1 text-xs">
              <span className="text-gray-400">View:</span>
              <button
                onClick={() => { setUserRole('customer'); setActiveTab('user-dashboard'); setMobileMenuOpen(false); }}
                className={`px-2 py-0.5 rounded text-[11px] ${userRole === 'customer' ? 'bg-[#5865F2] text-white font-semibold' : 'text-gray-600'}`}
              >
                User
              </button>
              <button
                onClick={() => { setUserRole('provider'); setActiveTab('provider-dashboard'); setMobileMenuOpen(false); }}
                className={`px-2 py-0.5 rounded text-[11px] ${userRole === 'provider' ? 'bg-[#18B88A] text-white font-semibold' : 'text-gray-600'}`}
              >
                Provider
              </button>
              <button
                onClick={() => { setUserRole('admin'); setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`px-2 py-0.5 rounded text-[11px] ${userRole === 'admin' ? 'bg-[#111A4A] text-white font-semibold' : 'text-gray-600'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Links list */}
          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === link.tab
                    ? 'bg-[#F0EEFF] text-[#5865F2] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {language === 'ur' ? link.labelUrdu : link.label}
              </button>
            ))}
          </div>

          {/* PWA & Hostinger options in mobile menu */}
          <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={() => handleNavClick('register-provider')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#E2FFF5] border border-[#18B88A]/40 text-[#111A4A] text-xs font-bold flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#18B88A]" />
              <span>Become a Service Provider</span>
            </button>
            <button
              onClick={() => handleNavClick('provider-login')}
              className="w-full py-2 px-3 rounded-xl bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <User className="w-3.5 h-3.5 text-[#5865F2]" />
              <span>Provider Portal Login</span>
            </button>
            <PWAInstallButton variant="menu" />
            <button
              onClick={() => {
                setIsHostingerModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Server className="w-4 h-4 text-[#5865F2]" />
              <span>Hostinger Production Deployment Guide</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
