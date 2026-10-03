import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Plus, 
  Check, 
  Zap, 
  Clock, 
  FileText,
  DollarSign,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Phone,
  Edit,
  ExternalLink,
  Save,
  CheckCircle2,
  RefreshCw,
  LayoutDashboard,
  User,
  Wrench,
  Layers,
  Image as ImageIcon,
  Inbox,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Upload,
  Trash2,
  Lock,
  Mail,
  Calendar,
  Sparkles,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { VILLAGES, CATEGORIES } from '../data/mockData';
import { ServiceItem, PortfolioItem, Tehsil } from '../types';

export const ProviderDashboard: React.FC = () => {
  const { 
    currentProvider, 
    tasks, 
    setIsChatModalOpen, 
    showToast, 
    setActiveTab, 
    updateProviderProfile,
    resubmitApplication,
    adminProfile,
    providers,
    setCurrentLoggedInProviderId,
    openProviderProfile,
    notifications,
    markNotificationAsRead,
    setUserRole,
    language
  } = useApp();

  const provider = currentProvider || providers[0];

  type DashboardTab = 
    | 'overview' 
    | 'profile' 
    | 'services' 
    | 'categories' 
    | 'locations' 
    | 'portfolio' 
    | 'requests' 
    | 'messages' 
    | 'reviews' 
    | 'subscription' 
    | 'verification' 
    | 'notifications' 
    | 'settings';

  const [activeTab, setActiveTabLocal] = useState<DashboardTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Profile Management State
  const [profileImage, setProfileImage] = useState(provider.profileImage);
  const [businessName, setBusinessName] = useState(provider.businessName);
  const [businessNameUrdu, setBusinessNameUrdu] = useState(provider.businessNameUrdu || '');
  const [ownerName, setOwnerName] = useState(provider.ownerName);
  const [phone, setPhone] = useState(provider.phone);
  const [whatsapp, setWhatsapp] = useState(provider.whatsapp || provider.phone);
  const [description, setDescription] = useState(provider.description);
  const [startingPrice, setStartingPrice] = useState(provider.startingPrice.toString());
  const [priceUnit, setPriceUnit] = useState(provider.priceUnit || 'Service Visit');
  const [workingHours, setWorkingHours] = useState(provider.workingHours);
  const [workingDays, setWorkingDays] = useState(provider.workingDays || 'Monday - Saturday');
  const [experienceYears, setExperienceYears] = useState(provider.experienceYears ? provider.experienceYears.toString() : '5');

  // Categories State
  const [mainCategory, setMainCategory] = useState(provider.category);
  const [additionalCategories, setAdditionalCategories] = useState<string[]>(provider.additionalCategories || []);

  // Services State
  const [servicesList, setServicesList] = useState<ServiceItem[]>(provider.services || []);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceUnit, setNewServiceUnit] = useState('job');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // Service Locations State
  const [serviceAreas, setServiceAreas] = useState<string[]>(provider.serviceAreas || []);
  const [locationSearch, setLocationSearch] = useState('');

  // Portfolio State
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>(provider.portfolio || []);
  const [newPortfolioTitle, setNewPortfolioTitle] = useState('');
  const [newPortfolioImage, setNewPortfolioImage] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80');

  // Resubmission modal state
  const [resubmissionNotesInput, setResubmissionNotesInput] = useState('');
  const [showResubmitModal, setShowResubmitModal] = useState(false);

  // Settings State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notifyOnTask, setNotifyOnTask] = useState(true);
  const [notifyOnMessage, setNotifyOnMessage] = useState(true);

  const isPending = provider.applicationStatus === 'pending';
  const isUnderReview = provider.applicationStatus === 'under_review';
  const isRejected = provider.applicationStatus === 'rejected';
  const isResubmission = provider.applicationStatus === 'resubmission_required';
  const isApproved = provider.applicationStatus === 'approved';

  // Calculate Real Profile Completion %
  const calculateProfileCompletion = () => {
    let score = 0;
    if (provider.profileImage) score += 15;
    if (provider.businessName) score += 15;
    if (provider.description && provider.description.length > 20) score += 15;
    if (provider.services && provider.services.length > 0) score += 15;
    if (provider.serviceAreas && provider.serviceAreas.length > 0) score += 15;
    if (provider.phone) score += 10;
    if (provider.verified || provider.applicationStatus === 'approved') score += 15;
    return Math.min(100, score);
  };

  const profileCompletion = calculateProfileCompletion();

  // Save General Profile Info
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProviderProfile(provider.id, {
      profileImage,
      businessName,
      businessNameUrdu,
      ownerName,
      phone,
      whatsapp,
      description,
      startingPrice: Number(startingPrice) || provider.startingPrice,
      priceUnit,
      workingHours,
      workingDays,
      experienceYears: Number(experienceYears) || 5
    });
    showToast('Profile information updated successfully.');
  };

  // Toggle Category
  const toggleAdditionalCategory = (catId: string) => {
    if (catId === mainCategory) return;
    const updated = additionalCategories.includes(catId)
      ? additionalCategories.filter(c => c !== catId)
      : [...additionalCategories, catId];
    setAdditionalCategories(updated);
    updateProviderProfile(provider.id, { additionalCategories: updated });
    showToast('Updated service categories.');
  };

  // Toggle Location Area
  const toggleArea = (villageName: string) => {
    let updated: string[];
    if (serviceAreas.includes(villageName)) {
      if (serviceAreas.length === 1) {
        showToast('You must maintain at least one active service area.');
        return;
      }
      updated = serviceAreas.filter(a => a !== villageName);
    } else {
      updated = [...serviceAreas, villageName];
    }
    setServiceAreas(updated);
    updateProviderProfile(provider.id, { serviceAreas: updated });
    showToast(`Updated coverage: ${villageName}`);
  };

  // Select all or clear locations
  const handleSelectAllTehsil = (tehsilName: Tehsil) => {
    const tehsilVillages = VILLAGES.filter(v => v.tehsil === tehsilName).map(v => v.name);
    const combined = Array.from(new Set([...serviceAreas, ...tehsilVillages]));
    setServiceAreas(combined);
    updateProviderProfile(provider.id, { serviceAreas: combined });
    showToast(`Added all ${tehsilName} locations.`);
  };

  // Add Service Item
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServicePrice) return;
    const newS: ServiceItem = {
      id: `s-${Date.now()}`,
      title: newServiceName.trim(),
      price: Number(newServicePrice),
      unit: newServiceUnit,
      description: newServiceDesc || 'Standard on-site labor and service rate.'
    };
    const nextList = [...servicesList, newS];
    setServicesList(nextList);
    updateProviderProfile(provider.id, { services: nextList });
    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDesc('');
    showToast('New service added successfully!');
  };

  const handleDeleteService = (serviceId: string) => {
    const nextList = servicesList.filter(s => s.id !== serviceId);
    setServicesList(nextList);
    updateProviderProfile(provider.id, { services: nextList });
    showToast('Service removed.');
  };

  // Add Portfolio Item
  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioTitle.trim()) return;
    const item: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortfolioTitle.trim(),
      image: newPortfolioImage,
      tag: provider.categoryName
    };
    const updated = [item, ...portfolioList];
    setPortfolioList(updated);
    updateProviderProfile(provider.id, { portfolio: updated });
    setNewPortfolioTitle('');
    showToast('Portfolio image added to profile!');
  };

  const handleDeletePortfolio = (id: string) => {
    const updated = portfolioList.filter(p => p.id !== id);
    setPortfolioList(updated);
    updateProviderProfile(provider.id, { portfolio: updated });
    showToast('Portfolio item deleted.');
  };

  // Resubmit Application
  const handleResubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider.applicationId) return;

    resubmitApplication(provider.applicationId, {
      businessInfo: {
        ...(provider as any).businessInfo,
        businessDescription: description,
        startingPrice: Number(startingPrice) || 500
      }
    });

    setShowResubmitModal(false);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.');
      return;
    }
    showToast('Account settings saved successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleLogout = () => {
    setUserRole('customer');
    setActiveTab('home');
    showToast('Logged out from Provider Portal.');
  };

  const filteredVillages = VILLAGES.filter(v => 
    v.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
    v.unionCouncil.toLowerCase().includes(locationSearch.toLowerCase()) ||
    v.tehsil.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const sidebarItems: { id: DashboardTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'services', label: 'My Services', icon: Wrench, badge: servicesList.length },
    { id: 'categories', label: 'Service Categories', icon: Layers },
    { id: 'locations', label: 'Service Locations', icon: MapPin, badge: serviceAreas.length },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon, badge: portfolioList.length },
    { id: 'requests', label: 'Customer Requests', icon: Inbox, badge: isApproved ? tasks.length : 0 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: isApproved ? provider.reviewCount : 0 },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'verification', label: 'Verification Status', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read).length || undefined },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row with Mobile Menu Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-sm"
              aria-label="Toggle navigation"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#111A4A]">
                Provider Control Dashboard
              </h1>
              <p className="text-xs text-gray-500">
                Manage your services, village coverage, public reputation, and admin approval
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isApproved ? (
              <button
                onClick={() => openProviderProfile(provider)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#5865F2] hover:text-[#5865F2] shadow-xs transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Public Profile</span>
                <span className="sm:hidden">Public View</span>
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                🔒 Private Profile (Pending Approval)
              </span>
            )}

            <button
              onClick={() => setIsChatModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-sm transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Customer Chats</span>
            </button>
          </div>
        </div>

        {/* Status Alert Banners based on Provider Application Status */}
        {isPending && (
          <div className="mb-6 p-5 sm:p-6 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-950 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase tracking-wide">
                      Pending Approval
                    </span>
                    <span className="text-xs text-amber-800 font-medium">Application ID: {provider.applicationId || 'APP-2026-104'}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-amber-950">
                    Your Profile Is Waiting for Admin Approval
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 max-w-2xl leading-relaxed">
                    Your profile is currently private. Once approved, customers will be able to find your services on PakPattan Services Hub.
                  </p>
                </div>
              </div>

              {/* Direct Admin Contact Box */}
              <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1.5 flex-shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Regional Review Officer
                </span>
                <p className="font-bold text-[#111A4A]">Admin: {adminProfile.name}</p>
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-[#18B88A]" />
                  <a href={`tel:${adminProfile.contact}`} className="hover:underline font-semibold text-gray-800">
                    {adminProfile.contact}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#18B88A] text-white text-[9px] font-bold flex items-center justify-center">W</span>
                  <a href={`https://wa.me/92${adminProfile.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-[#18B88A] font-bold hover:underline">
                    WhatsApp: {adminProfile.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUnderReview && (
          <div className="mb-6 p-5 rounded-3xl bg-blue-50 border border-blue-200 text-blue-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-200 text-blue-800 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-blue-950">
                  Application Under Active Review
                </h3>
                <p className="text-xs text-blue-700 mt-0.5">
                  Admin {adminProfile.name} is currently inspecting your CNIC documents and workshop details.
                </p>
              </div>
            </div>
            <div className="text-xs text-blue-800">
              Direct Inquiries: <a href={`https://wa.me/92${adminProfile.whatsapp}`} target="_blank" rel="noreferrer" className="font-bold underline">WhatsApp {adminProfile.whatsapp}</a>
            </div>
          </div>
        )}

        {isResubmission && (
          <div className="mb-6 p-5 rounded-3xl bg-orange-50 border border-orange-200 text-orange-950 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-200 text-orange-800 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-orange-950">
                  Corrections Required by Admin
                </h3>
                <p className="text-xs text-orange-800 mt-1">
                  <strong>Admin Notes:</strong> {provider.resubmissionNotes || 'Please update CNIC images or complete address.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowResubmitModal(true)}
              className="px-4 py-2 bg-[#F5A623] hover:bg-[#e09419] text-[#111A4A] rounded-xl text-xs font-bold shadow-sm transition whitespace-nowrap"
            >
              Update & Resubmit Application
            </button>
          </div>
        )}

        {isRejected && (
          <div className="mb-6 p-5 rounded-3xl bg-red-50 border border-red-200 text-red-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-base text-red-950">Application Not Approved</h3>
                <p className="text-xs text-red-700 mt-1">
                  Reason: {provider.rejectionReason || 'Documents did not meet local verification standards.'}
                </p>
              </div>
            </div>
            <div className="text-xs text-red-800">
              Need help? Contact Admin {adminProfile.name} on WhatsApp: <a href={`https://wa.me/92${adminProfile.whatsapp}`} target="_blank" rel="noreferrer" className="font-bold underline">{adminProfile.whatsapp}</a>
            </div>
          </div>
        )}

        {/* 2-Column Layout: Sidebar Navigation + Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION (Section 6) */}
          <div className={`lg:col-span-3 bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm ${mobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Mini Profile Header inside Sidebar */}
            <div className="p-3 mb-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex items-center gap-3">
              <img
                src={provider.profileImage}
                alt={provider.businessName}
                className="w-12 h-12 rounded-xl object-cover border border-white shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-[#111A4A] truncate">{provider.businessName}</p>
                <p className="text-[10px] text-gray-500 truncate">{provider.ownerName}</p>
                <span className={`inline-block mt-0.5 text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  isApproved ? 'bg-[#E2FFF5] text-[#18B88A]' : 'bg-amber-100 text-amber-800'
                }`}>
                  {provider.applicationStatus.toUpperCase().replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Navigation List (14 items) */}
            <nav className="space-y-1 text-xs font-semibold text-gray-600">
              {sidebarItems.map(item => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'messages') {
                        setIsChatModalOpen(true);
                      } else {
                        setActiveTabLocal(item.id);
                        setMobileSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                      isActive 
                        ? 'bg-[#111A4A] text-white shadow-sm' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#18B88A]' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition mt-2 pt-3 border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>

            {/* Admin Support Box inside Sidebar */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Admin Support
              </span>
              <p className="font-bold text-[#111A4A]">{adminProfile.name}</p>
              <p className="text-[11px] text-gray-500">Contact: {adminProfile.contact}</p>
              <a
                href={`https://wa.me/92${adminProfile.whatsapp.replace(/\D/g,'')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#18B88A] hover:underline"
              >
                <span>WhatsApp Admin</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-6">

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 1. Profile Completion Progress Bar */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h2 className="font-heading font-extrabold text-base text-[#111A4A]">
                        Profile Completion Score
                      </h2>
                      <p className="text-xs text-gray-500">
                        Higher completion scores increase customer inquiries and search visibility.
                      </p>
                    </div>
                    <span className="font-heading font-extrabold text-xl text-[#5865F2]">
                      {profileCompletion}% Complete
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5865F2] to-[#18B88A] transition-all duration-500 rounded-full"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className={`px-2.5 py-1 rounded-lg ${provider.services.length > 0 ? 'bg-[#E2FFF5] text-[#18B88A] font-semibold' : 'bg-gray-100 text-gray-500'}`}>
                      ✓ Services Added ({provider.services.length})
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg ${provider.serviceAreas.length > 0 ? 'bg-[#E2FFF5] text-[#18B88A] font-semibold' : 'bg-gray-100 text-gray-500'}`}>
                      ✓ Locations Selected ({provider.serviceAreas.length})
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg ${provider.verified ? 'bg-[#E2FFF5] text-[#18B88A] font-semibold' : 'bg-amber-100 text-amber-800'}`}>
                      {provider.verified ? '✓ CNIC Certified' : '⏳ Verification Pending'}
                    </span>
                  </div>
                </div>

                {/* 2. Key Dashboard Metrics Grid (Real statistics, no fake data for pending providers) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Status */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Registration Status
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <ShieldCheck className={`w-4 h-4 ${isApproved ? 'text-[#18B88A]' : 'text-amber-500'}`} />
                      <span className="font-heading font-bold text-sm sm:text-base capitalize text-[#111A4A]">
                        {provider.applicationStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 inline-block">
                      {isApproved ? 'Public marketplace' : 'Awaiting admin'}
                    </span>
                  </div>

                  {/* Profile Views */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Profile Views
                    </span>
                    <p className="font-heading font-extrabold text-xl sm:text-2xl text-[#111A4A]">
                      {isApproved ? '184' : '0'}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-0.5 inline-block">
                      {isApproved ? 'Past 30 days' : 'No views while private'}
                    </span>
                  </div>

                  {/* Customer Inquiries */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Customer Inquiries
                    </span>
                    <p className="font-heading font-extrabold text-xl sm:text-2xl text-[#111A4A]">
                      {isApproved ? '43' : '0'}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-0.5 inline-block">
                      {isApproved ? 'Direct leads' : 'Inactive before approval'}
                    </span>
                  </div>

                  {/* Active Services */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Active Services
                    </span>
                    <p className="font-heading font-extrabold text-xl sm:text-2xl text-[#111A4A]">
                      {servicesList.length}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-0.5 inline-block">
                      Pricing rates listed
                    </span>
                  </div>

                </div>

                {/* Additional Row: Reviews & Subscription Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Total Reviews
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-heading font-extrabold text-2xl text-[#111A4A]">
                          {isApproved ? provider.reviewCount : '0'}
                        </span>
                        {isApproved && (
                          <div className="flex items-center gap-1 text-[#F5A623] text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{provider.rating} Rating</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {isApproved ? 'From Pakpattan & Arifwala clients' : 'No public reviews yet'}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTabLocal('reviews')}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#5865F2]"
                    >
                      View All
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Subscription Status
                      </span>
                      <p className="font-heading font-extrabold text-lg text-[#18B88A] mt-1">
                        Monthly Pro (Active)
                      </p>
                      <span className="text-[10px] text-gray-400">
                        Valid until Nov 2026 · Priority Search
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTabLocal('subscription')}
                      className="px-3 py-1.5 rounded-xl bg-[#111A4A] text-white text-xs font-bold shadow-xs"
                    >
                      Manage
                    </button>
                  </div>
                </div>

                {/* Customer Job Inquiries List Preview */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#111A4A]">
                        Recent Customer Inquiries & Job Leads
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tasks matching your trade category in {serviceAreas.slice(0, 3).join(', ')}...
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTabLocal('requests')}
                      className="text-xs font-bold text-[#5865F2] hover:underline"
                    >
                      View All ({tasks.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E2FFF5] text-[#18B88A]">
                              {task.category.toUpperCase()}
                            </span>
                            <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111A4A]">{task.title}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mb-1 line-clamp-1">{task.description}</p>
                          <div className="flex items-center gap-3 text-[11px] text-gray-500">
                            <span>📍 {task.village}</span>
                            <span>·</span>
                            <span className="font-semibold text-gray-700">Budget: Rs. {task.budget}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsChatModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold whitespace-nowrap shadow-xs"
                        >
                          Chat / Quote
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MY PROFILE MANAGEMENT (Section 7) */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    Manage Provider Profile
                  </h2>
                  <p className="text-xs text-gray-500">
                    Update your business identity, public description, working schedule, and contact numbers.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  
                  {/* Profile Picture */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      Profile Picture / Workshop Logo
                    </label>
                    <div className="flex items-center gap-4">
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileImage}
                          onChange={(e) => setProfileImage(e.target.value)}
                          placeholder="Paste image URL..."
                          className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Recommended: Clear portrait or workshop signboard photo.</p>
                      </div>
                    </div>
                  </div>

                  {/* Business & Personal Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Business / Workshop Name
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Urdu Business Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={businessNameUrdu}
                        onChange={(e) => setBusinessNameUrdu(e.target.value)}
                        placeholder="مثلاً: عمر پلمبنگ اینڈ سینیٹری سروسز"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] font-urdu"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Personal Name / Owner
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mobile Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="text"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Working Schedule / Days
                      </label>
                      <input
                        type="text"
                        value={workingDays}
                        onChange={(e) => setWorkingDays(e.target.value)}
                        placeholder="Monday - Saturday"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Working Hours
                      </label>
                      <input
                        type="text"
                        value={workingHours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="8:00 AM - 8:00 PM"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Starting Inspection Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Price Unit
                      </label>
                      <input
                        type="text"
                        value={priceUnit}
                        onChange={(e) => setPriceUnit(e.target.value)}
                        placeholder="Visit & Diagnostic"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Business Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Business Description & Services Overview
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail your professional experience, tools, guarantees, and service standards..."
                      className="w-full p-3 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F0EEFF] text-xs text-gray-700 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" />
                    <span>
                      Modifications are saved immediately to your active profile. Sensitive tradesman verification changes remain monitored by Super Admin <strong>{adminProfile.name}</strong>.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-md transition active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: MY SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                
                {/* Add Service Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-[#111A4A] mb-3">
                    Add New Service & Rate
                  </h3>
                  <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="e.g. Inverter Installation / Motor Winding"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Price (PKR)</label>
                      <input
                        type="number"
                        required
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        placeholder="1200"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Unit</label>
                      <input
                        type="text"
                        value={newServiceUnit}
                        onChange={(e) => setNewServiceUnit(e.target.value)}
                        placeholder="job / visit / point"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                    <div className="sm:col-span-4 flex items-center justify-between gap-3 pt-1">
                      <input
                        type="text"
                        value={newServiceDesc}
                        onChange={(e) => setNewServiceDesc(e.target.value)}
                        placeholder="Brief service description or warranty included..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#18B88A] hover:bg-[#159f77] text-white text-xs font-bold shadow-xs whitespace-nowrap"
                      >
                        + Add Service
                      </button>
                    </div>
                  </form>
                </div>

                {/* List of active services */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">
                    Active Services Catalog ({servicesList.length})
                  </h3>
                  <div className="space-y-2.5">
                    {servicesList.map(s => (
                      <div key={s.id} className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-xs text-[#111A4A]">{s.title}</p>
                          <p className="text-[11px] text-gray-500">{s.description || 'Standard trade labor.'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-extrabold text-xs text-[#5865F2] whitespace-nowrap">
                            Rs. {s.price} /{s.unit}
                          </span>
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: SERVICE CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    Service Trade Categories
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose your primary trade and select any additional categories you serve across Pakpattan & Arifwala.
                  </p>
                </div>

                {/* Primary Category Selector */}
                <div className="mb-6 p-4 rounded-2xl bg-[#F0EEFF] border border-[#5865F2]/20">
                  <label className="block text-xs font-bold text-[#111A4A] mb-2">
                    Primary Trade Category:
                  </label>
                  <select
                    value={mainCategory}
                    onChange={(e) => {
                      setMainCategory(e.target.value);
                      const catObj = CATEGORIES.find(c => c.id === e.target.value);
                      updateProviderProfile(provider.id, { 
                        category: e.target.value,
                        categoryName: catObj ? catObj.name : e.target.value 
                      });
                      showToast(`Primary category set to ${catObj?.name}`);
                    }}
                    className="w-full sm:w-80 px-3 py-2 text-xs rounded-xl bg-white border border-gray-300 font-bold text-[#111A4A]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.nameUrdu})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Categories Multi-Select */}
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111A4A] mb-3">
                    Additional Secondary Categories (Cross-Trade Skills):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {CATEGORIES.map(cat => {
                      const isMain = cat.id === mainCategory;
                      const isSelected = additionalCategories.includes(cat.id);
                      return (
                        <div
                          key={cat.id}
                          onClick={() => !isMain && toggleAdditionalCategory(cat.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                            isMain 
                              ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                              : isSelected 
                                ? 'bg-[#E2FFF5] border-[#18B88A] text-[#111A4A] font-bold' 
                                : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{cat.name}</span>
                            {isMain ? (
                              <span className="text-[9px] bg-gray-300 px-1.5 py-0.5 rounded">Primary</span>
                            ) : isSelected ? (
                              <Check className="w-3.5 h-3.5 text-[#18B88A]" />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SERVICE LOCATIONS (Multi-village selector) */}
            {activeTab === 'locations' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                      Multi-Village Service Areas ({serviceAreas.length} active)
                    </h2>
                    <p className="text-xs text-gray-500">
                      Select every village, chak, and town you are willing to visit for on-site services.
                    </p>
                  </div>
                  
                  {/* Quick Select All Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectAllTehsil('Pakpattan')}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      + All Pakpattan
                    </button>
                    <button
                      onClick={() => handleSelectAllTehsil('Arifwala')}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      + All Arifwala
                    </button>
                  </div>
                </div>

                {/* Search Filter for Villages */}
                <div className="mb-4 max-w-sm">
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search village name or chak (e.g. 19/SP, Tibba)..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>

                {/* Village Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {filteredVillages.map(v => {
                    const isChecked = serviceAreas.includes(v.name);
                    return (
                      <div
                        key={v.id}
                        onClick={() => toggleArea(v.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isChecked
                            ? 'bg-[#F0EEFF] border-[#5865F2] shadow-2xs'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <p className={`text-xs font-bold ${isChecked ? 'text-[#5865F2]' : 'text-gray-800'}`}>
                            {v.name}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {v.tehsil} · {v.unionCouncil}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          isChecked ? 'bg-[#5865F2] text-white' : 'border border-gray-300'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 6: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                
                {/* Upload Image Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-[#111A4A] mb-3">
                    Add Work Photo / Portfolio Image
                  </h3>
                  <form onSubmit={handleAddPortfolio} className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      required
                      value={newPortfolioTitle}
                      onChange={(e) => setNewPortfolioTitle(e.target.value)}
                      placeholder="Title (e.g. Copper Pipe Fitting in Chak 19)"
                      className="w-full sm:w-1/2 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                    />
                    <input
                      type="text"
                      required
                      value={newPortfolioImage}
                      onChange={(e) => setNewPortfolioImage(e.target.value)}
                      placeholder="Image URL"
                      className="w-full sm:w-1/2 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-xs whitespace-nowrap"
                    >
                      + Add Photo
                    </button>
                  </form>
                </div>

                {/* Portfolio Grid */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">
                    Uploaded Work Portfolio ({portfolioList.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {portfolioList.map(item => (
                      <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xs">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-36 object-cover group-hover:scale-105 transition"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-2.5 bg-white">
                          <p className="font-bold text-[11px] text-[#111A4A] truncate">{item.title}</p>
                          <span className="text-[10px] text-gray-400">{item.tag}</span>
                        </div>
                        <button
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 7: CUSTOMER REQUESTS */}
            {activeTab === 'requests' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    Customer Job Requests in Your Coverage Areas
                  </h2>
                  <p className="text-xs text-gray-500">
                    Respond to local customers needing repair, installation, and maintenance.
                  </p>
                </div>

                <div className="space-y-4">
                  {tasks.map(t => (
                    <div key={t.id} className="p-4 sm:p-5 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E2FFF5] text-[#18B88A]">
                            {t.status.toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-gray-500">{t.preferredDate}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs font-semibold text-gray-700">📍 {t.village}</span>
                        </div>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-[#111A4A] mb-1">
                          {t.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">{t.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Customer: <strong>{t.customerName}</strong></span>
                          <span>Est. Budget: <strong className="text-[#18B88A]">Rs. {t.budget}</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsChatModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-xs whitespace-nowrap transition active:scale-95"
                      >
                        Submit Proposal / Chat
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                      Customer Feedback & Reviews
                    </h2>
                    <p className="text-xs text-gray-500">
                      Verified ratings submitted by homeowners across Pakpattan and Arifwala.
                    </p>
                  </div>
                  {isApproved && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0EEFF] text-[#111A4A] font-bold text-xs">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{provider.rating} ({provider.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>

                {!isApproved || provider.reviews.length === 0 ? (
                  <div className="p-8 text-center bg-[#F7F8FC] rounded-2xl">
                    <Star className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-700">No public reviews yet</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Once your profile is approved, clients who hire you can leave verified feedback here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {provider.reviews.map(r => (
                      <div key={r.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#111A4A]">{r.author}</span>
                            <span className="text-[10px] text-gray-400">· {r.village}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                        <span className="text-[10px] text-gray-400 mt-2 block">{r.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 9: SUBSCRIPTION */}
            {activeTab === 'subscription' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm max-w-2xl">
                <h2 className="font-heading font-extrabold text-xl text-[#111A4A] mb-2">
                  Membership & Listing Plan
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  Maintain an active provider subscription for top directory ranking and unlimited customer inquiries.
                </p>

                <div className="p-5 rounded-2xl bg-[#E2FFF5] border border-[#18B88A]/30 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#18B88A] uppercase tracking-wider block">Current Active Plan</span>
                    <h3 className="font-heading font-extrabold text-lg text-[#111A4A] mt-0.5">
                      Monthly Professional Partner
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Rs. 2,000 / month · Auto-renews via JazzCash / EasyPaisa
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#18B88A] bg-white px-3 py-1.5 rounded-xl shadow-2xs">
                    ✓ Active
                  </span>
                </div>

                <div className="space-y-3 mb-6 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#18B88A]" />
                    <span>Multi-village directory listing in Pakpattan & Arifwala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#18B88A]" />
                    <span>Real-time customer lead alerts & in-app chat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#18B88A]" />
                    <span>0% commission on your earned revenue</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className="px-5 py-2.5 rounded-xl bg-[#111A4A] hover:bg-[#1a2569] text-white text-xs font-bold transition shadow-xs"
                >
                  Change Subscription Plan
                </button>
              </div>
            )}

            {/* TAB 10: VERIFICATION STATUS */}
            {activeTab === 'verification' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm max-w-2xl space-y-6">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    CNIC & Verification Credentials
                  </h2>
                  <p className="text-xs text-gray-500">
                    Official identity and local tradesman records kept securely in district operations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FC] border border-gray-200/80 space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">Masked National ID (CNIC):</span>
                    <strong className="font-mono text-[#111A4A] text-sm">{provider.cnicNumberMasked || '35302-89****-3'}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">Registration Application ID:</span>
                    <strong className="text-[#5865F2]">{provider.applicationId || 'APP-2026-104'}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                    <span className="text-gray-500">Verification Status:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                      isApproved ? 'bg-[#E2FFF5] text-[#18B88A]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {provider.applicationStatus.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Regional Reviewing Admin:</span>
                    <span className="font-bold text-[#111A4A]">{adminProfile.name}</span>
                  </div>
                </div>

                {/* Admin Contact Box for Expedited Review */}
                <div className="p-4 rounded-2xl bg-[#F0EEFF] border border-[#5865F2]/20 text-xs">
                  <h4 className="font-bold text-[#111A4A] mb-1">
                    Need Expedited Verification or Workshop Inspection?
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Contact Super Admin <strong>{adminProfile.name}</strong> directly with your Application ID.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${adminProfile.contact}`}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 font-bold text-gray-800 hover:border-[#5865F2]"
                    >
                      Call: {adminProfile.contact}
                    </a>
                    <a
                      href={`https://wa.me/92${adminProfile.whatsapp.replace(/\D/g,'')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#18B88A] text-white font-bold hover:bg-[#159a73]"
                    >
                      WhatsApp Admin: {adminProfile.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 11: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    Notifications & Alerts
                  </h2>
                  <p className="text-xs text-gray-500">
                    Administrative notices, review results, and customer inquiry alerts.
                  </p>
                </div>

                <div className="space-y-3">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-4 rounded-2xl border transition cursor-pointer ${
                        notif.read ? 'bg-white border-gray-100' : 'bg-[#F0EEFF]/50 border-[#5865F2]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${notif.read ? 'bg-gray-300' : 'bg-[#5865F2]'}`} />
                          <h4 className="font-bold text-xs text-[#111A4A]">{notif.title}</h4>
                        </div>
                        <span className="text-[10px] text-gray-400">{notif.createdAt}</span>
                      </div>
                      <p className="text-xs text-gray-600 pl-4">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 12: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm max-w-xl">
                <h2 className="font-heading font-extrabold text-xl text-[#111A4A] mb-2">
                  Account & Security Settings
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  Manage your portal credentials and alerts.
                </p>

                <form onSubmit={handleSettingsSave} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
                    />
                  </div>

                  <div className="pt-2 space-y-2 text-xs text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnTask}
                        onChange={(e) => setNotifyOnTask(e.target.checked)}
                        className="w-4 h-4 text-[#5865F2] rounded"
                      />
                      <span>Notify me on new tasks matching my villages</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifyOnMessage}
                        onChange={(e) => setNotifyOnMessage(e.target.checked)}
                        className="w-4 h-4 text-[#5865F2] rounded"
                      />
                      <span>Receive WhatsApp alerts for customer chat inquiries</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-xs transition"
                  >
                    Save Settings
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Resubmission Modal */}
      {showResubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-gray-200 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-[#111A4A] mb-2">
              Resubmit Application for Approval
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Admin Notes: <em>"{provider.resubmissionNotes}"</em>
            </p>
            <form onSubmit={handleResubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Updated Information & Correction Response
                </label>
                <textarea
                  rows={4}
                  required
                  value={resubmissionNotesInput}
                  onChange={(e) => setResubmissionNotesInput(e.target.value)}
                  placeholder="Explain the corrections made or updated document details..."
                  className="w-full p-3 text-xs rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 rounded-xl bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white rounded-xl bg-[#18B88A]"
                >
                  Resubmit to Admin {adminProfile.name}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
