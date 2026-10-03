import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  Provider, 
  Task, 
  Conversation, 
  BlogPost, 
  Category, 
  Village,
  ProviderApplication,
  ProviderApplicationStatus,
  ProviderApprovalLog,
  AppNotification,
  AdminProfile
} from '../types';
import { 
  CATEGORIES, 
  VILLAGES, 
  INITIAL_PROVIDERS, 
  INITIAL_TASKS, 
  INITIAL_CONVERSATIONS, 
  BLOG_POSTS,
  ADMIN_PROFILE,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { 
  checkProviderExists, 
  saveProviderToFirestore, 
  approveProviderInFirestore, 
  rejectProviderFromFirestore, 
  subscribeAllProviders, 
  normalizePhone 
} from '../firebase';

export type NavTab = 
  | 'home' 
  | 'services' 
  | 'providers' 
  | 'provider-detail' 
  | 'post-task' 
  | 'chat' 
  | 'user-dashboard' 
  | 'provider-dashboard' 
  | 'admin' 
  | 'blog' 
  | 'blog-post' 
  | 'pricing' 
  | 'how-it-works' 
  | 'contact'
  | 'register-provider'
  | 'provider-login';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  
  // Search and Directory Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  sortBy: 'recommended' | 'rating' | 'reviews' | 'price_low';
  setSortBy: (sort: 'recommended' | 'rating' | 'reviews' | 'price_low') => void;
  
  // Data lists & mutations
  providers: Provider[];
  publicApprovedProviders: Provider[]; // CRITICAL: Only approved providers shown publicly!
  addProvider: (provider: Provider) => void;
  updateProviderProfile: (id: string, updates: Partial<Provider>) => void;
  toggleProviderVerification: (id: string) => void;
  deleteProvider: (id: string) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (p: Provider | null) => void;
  openProviderProfile: (p: Provider) => void;

  // Firebase Real-time Approval and Deletion
  approveProvider: (id: string) => Promise<void>;
  rejectProvider: (id: string) => Promise<void>;
  deleteProviderPermanently: (id: string) => Promise<void>;

  // Provider Registration & Approval System
  adminProfile: AdminProfile;
  applications: ProviderApplication[];
  submitProviderRegistration: (
    appData: Omit<ProviderApplication, 'id' | 'status' | 'submittedAt' | 'approvalLogs'>
  ) => Promise<{ success: boolean; id?: string; error?: string } | string>;
  updateApplicationStatus: (
    appId: string, 
    newStatus: ProviderApplicationStatus, 
    remarks?: string
  ) => void;
  resubmitApplication: (appId: string, updatedData: Partial<ProviderApplication>) => void;
  
  // Current logged in provider session
  currentLoggedInProviderId: string;
  setCurrentLoggedInProviderId: (id: string) => void;
  currentProvider: Provider | undefined;

  // Categories & Villages
  categories: Category[];
  addCategory: (cat: Category) => void;
  villages: Village[];
  addVillage: (v: Village) => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'proposalsCount'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;

  // Saved Favorites
  savedProviderIds: string[];
  toggleSaveProvider: (id: string) => void;

  // Blog
  blogPosts: BlogPost[];
  selectedBlogPost: BlogPost | null;
  openBlogPost: (post: BlogPost) => void;

  // Chat System
  conversations: Conversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  startChatWithProvider: (provider: Provider) => void;
  sendMessage: (conversationId: string, text: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  unreadNotificationsCount: number;

  // Toast notification
  toast: string | null;
  showToast: (msg: string) => void;

  // Hostinger Guide
  isHostingerModalOpen: boolean;
  setIsHostingerModalOpen: (open: boolean) => void;

  // Helpers
  executeSearch: (query?: string, category?: string, location?: string) => void;
  resetFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to get permanently rejected/deleted IDs so duplicates NEVER revive
function getPermanentlyRejectedIds(): string[] {
  try {
    const raw = localStorage.getItem('pakpattan_rejected_providers');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function addPermanentlyRejectedId(id: string, phone?: string) {
  try {
    const list = getPermanentlyRejectedIds();
    if (id && !list.includes(id)) list.push(id);
    if (phone) {
      const clean = normalizePhone(phone);
      if (clean && !list.includes(clean)) list.push(clean);
    }
    localStorage.setItem('pakpattan_rejected_providers', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  
  // URL routing check on initial load (support direct /admin)
  const [activeTab, setActiveTabState] = useState<NavTab>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.includes('/admin') || window.location.hash.includes('admin'))) {
      return 'admin';
    }
    return 'home';
  });

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'admin') {
        window.history.pushState(null, '', '/admin');
      } else if (tab === 'home') {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Sync /admin URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      if (path === '/admin' || window.location.hash === '#admin') {
        setActiveTabState('admin');
        setUserRole('admin');
      }
    };
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'price_low'>('recommended');

  // Admin Profile
  const [adminProfile] = useState<AdminProfile>(ADMIN_PROFILE);

  // Entities: filter out any previously rejected IDs so they never reappear
  const [providers, setProviders] = useState<Provider[]>(() => {
    const rejected = getPermanentlyRejectedIds();
    return INITIAL_PROVIDERS.filter(p => !rejected.includes(p.id) && !rejected.includes(normalizePhone(p.phone)));
  });

  const [applications, setApplications] = useState<ProviderApplication[]>(INITIAL_APPLICATIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [currentLoggedInProviderId, setCurrentLoggedInProviderId] = useState<string>('p-1');

  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [villages, setVillages] = useState<Village[]>(VILLAGES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [blogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>(['p-1', 'p-2']);

  // Chat
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const [isHostingerModalOpen, setIsHostingerModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // -------------------------------------------------------------
  // REAL-TIME FIRESTORE LISTENER (onSnapshot)
  // Requirement 4: On Admin Panel, use real-time listener (onSnapshot)
  // so when I reject, it instantly disappears and never comes back after refresh.
  // -------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = subscribeAllProviders((firestoreDocs: any[]) => {
      const rejectedList = getPermanentlyRejectedIds();

      if (firestoreDocs && firestoreDocs.length > 0) {
        // Map Firestore documents to Provider interface
        const remoteProviders: Provider[] = firestoreDocs
          .filter((doc: any) => !rejectedList.includes(doc.id) && !rejectedList.includes(normalizePhone(doc.phone)))
          .map((doc: any) => {
            const isApproved = doc.status === 'approved' || doc.applicationStatus === 'approved';
            return {
              id: doc.id,
              userId: doc.userId || doc.id,
              applicationId: doc.applicationId || doc.id,
              businessName: doc.businessName || 'Local Service Partner',
              businessNameUrdu: doc.businessNameUrdu || '',
              ownerName: doc.ownerName || doc.fullName || 'Service Provider',
              category: doc.category || doc.mainCategory || 'plumber',
              categoryName: doc.categoryName || doc.mainCategoryName || 'General Services',
              additionalCategories: doc.additionalCategories || [],
              rating: typeof doc.rating === 'number' ? doc.rating : 5.0,
              reviewCount: typeof doc.reviewCount === 'number' ? doc.reviewCount : 0,
              verified: isApproved,
              identityVerified: isApproved,
              badgeType: doc.badgeType || 'verified',
              primaryLocation: doc.primaryLocation || doc.village || 'Pakpattan',
              tehsil: (doc.tehsil as any) || 'Pakpattan',
              serviceAreas: doc.serviceAreas || doc.selectedServiceAreas || ['Pakpattan City (Urban)'],
              description: doc.description || doc.businessDescription || 'Professional local services in Pakpattan & Arifwala.',
              descriptionUrdu: doc.descriptionUrdu || '',
              startingPrice: doc.startingPrice || 500,
              priceUnit: doc.priceUnit || 'Visit',
              profileImage: doc.profileImage || doc.profilePicture || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
              phone: doc.phone || doc.mobileNumber || '',
              whatsapp: doc.whatsapp || doc.whatsappNumber || doc.phone || '',
              workingHours: doc.workingHours || '8:00 AM - 8:00 PM',
              completedJobs: doc.completedJobs || 0,
              memberSince: doc.memberSince || '2026',
              services: doc.services || [],
              portfolio: doc.portfolio || [],
              reviews: doc.reviews || [],
              featured: doc.featured || false,
              approved: isApproved,
              status: doc.status || (isApproved ? 'approved' : 'pending'),
              applicationStatus: (doc.status as any) || (isApproved ? 'approved' : 'pending'),
              isPublic: isApproved,
              email: doc.email || '',
              fatherName: doc.fatherName || '',
              cnicNumber: doc.cnicNumber || '',
              cnicFrontImage: doc.cnicFrontImage || '',
              cnicBackImage: doc.cnicBackImage || '',
              workingDays: doc.workingDays || 'Monday - Saturday',
              cnicNumberMasked: doc.cnicNumberMasked || (doc.cnicNumber ? doc.cnicNumber.replace(/(\d{5})-(\d{2})\d{4}-(\d)/, '$1-$2****-$3') : '')
            };
          });

        // Deduplicate remoteProviders so duplicate items NEVER appear
        const seen = new Set<string>();
        const unique: Provider[] = [];
        for (const p of remoteProviders) {
          const norm = normalizePhone(p.phone);
          const key = p.id;
          if (seen.has(key) || (norm && seen.has(norm))) continue;
          seen.add(key);
          if (norm) seen.add(norm);
          unique.push(p);
        }

        // Set state from Firestore
        setProviders(unique);
      } else {
        // If Firestore collection has no documents yet, show initial clean providers excluding rejected
        const seen = new Set<string>();
        const unique: Provider[] = [];
        for (const p of INITIAL_PROVIDERS) {
          const norm = normalizePhone(p.phone);
          if (rejectedList.includes(p.id) || (norm && rejectedList.includes(norm))) continue;
          if (seen.has(p.id) || (norm && seen.has(norm))) continue;
          seen.add(p.id);
          if (norm) seen.add(norm);
          unique.push(p);
        }
        setProviders(unique);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // CRITICAL APPROVAL RULE: Only APPROVED providers with isPublic !== false appear publicly!
  const publicApprovedProviders = useMemo(() => {
    return providers.filter(p => 
      (p.status === 'approved' || p.applicationStatus === 'approved') && 
      p.isPublic !== false
    );
  }, [providers]);

  const currentProvider = useMemo(() => {
    return providers.find(p => p.id === currentLoggedInProviderId) || providers[0];
  }, [providers, currentLoggedInProviderId]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const openProviderProfile = (p: Provider) => {
    setSelectedProvider(p);
    setActiveTab('provider-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setActiveTab('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveProvider = (id: string) => {
    setSavedProviderIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Provider removed from saved favorites');
        return prev.filter(item => item !== id);
      } else {
        showToast('Provider saved to your favorites');
        return [...prev, id];
      }
    });
  };

  // -------------------------------------------------------------
  // SUBMIT NEW PROVIDER REGISTRATION (FIRESTORE PERMANENT STORAGE)
  // Requirement: Save to Firestore collection "providers" with status = "pending"
  // Duplicate check: Check phone or email before saving. If exists, show:
  // "اس نمبر سے پہلے ہی رجسٹریشن ہو چکی ہے" and do NOT save again.
  // -------------------------------------------------------------
  const submitProviderRegistration = async (
    appData: Omit<ProviderApplication, 'id' | 'status' | 'submittedAt' | 'approvalLogs'>
  ): Promise<{ success: boolean; id?: string; error?: string } | string> => {
    const rawPhone = appData.personalInfo.mobileNumber;
    const cleanPhone = normalizePhone(rawPhone);
    const email = appData.personalInfo.email;

    // 1. DUPLICATE CHECK BEFORE SAVING
    const duplicateCheck = await checkProviderExists(rawPhone, email);
    if (duplicateCheck.exists) {
      const errorMsg = 'اس نمبر سے پہلے ہی رجسٹریشن ہو چکی ہے';
      showToast(errorMsg);
      return { success: false, error: errorMsg };
    }

    // 2. Prepare payload with unique doc ID = cleanPhone
    const docId = cleanPhone || `provider_${Date.now()}`;
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newRecord: Provider = {
      id: docId,
      userId: appData.userId || docId,
      applicationId: `APP-${Date.now().toString().slice(-4)}`,
      businessName: appData.businessInfo.businessName,
      businessNameUrdu: appData.businessInfo.businessNameUrdu || appData.businessInfo.businessName,
      ownerName: appData.personalInfo.fullName,
      fatherName: appData.personalInfo.fatherName || '',
      category: appData.businessInfo.mainCategory,
      categoryName: appData.businessInfo.mainCategoryName,
      additionalCategories: appData.businessInfo.additionalCategories || [],
      rating: 5.0,
      reviewCount: 0,
      verified: false,
      identityVerified: false,
      badgeType: 'verified',
      primaryLocation: appData.locationInfo.village,
      tehsil: appData.locationInfo.tehsil,
      serviceAreas: appData.locationInfo.selectedServiceAreas || [appData.locationInfo.village],
      description: appData.businessInfo.businessDescription,
      descriptionUrdu: 'درخواست زیرِ جائزہ ہے (Admin Review Pending)',
      startingPrice: appData.businessInfo.startingPrice || 500,
      priceUnit: appData.businessInfo.priceUnit || 'Visit',
      profileImage: appData.personalInfo.profilePicture || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      phone: rawPhone,
      whatsapp: appData.personalInfo.whatsappNumber || rawPhone,
      email: email ? email.trim().toLowerCase() : '',
      workingHours: appData.businessInfo.workingHours || '8:00 AM - 8:00 PM',
      completedJobs: 0,
      memberSince: now,
      services: appData.businessInfo.servicesOffered ? [
        { 
          id: `s-${Date.now()}`, 
          title: appData.businessInfo.servicesOffered, 
          price: appData.businessInfo.startingPrice || 500, 
          unit: appData.businessInfo.priceUnit || 'Visit', 
          description: appData.businessInfo.servicesOffered 
        }
      ] : [],
      portfolio: appData.documents.portfolioImages ? appData.documents.portfolioImages.map((img, idx) => ({
        id: `pf-${idx}`,
        title: 'Portfolio Sample',
        image: img,
        tag: appData.businessInfo.mainCategoryName
      })) : [],
      reviews: [],
      featured: false,
      approved: false,
      status: 'pending', // REQUIRED: status = "pending"
      applicationStatus: 'pending',
      isPublic: false,
      experienceYears: appData.businessInfo.experienceYears || 3,
      workingDays: appData.businessInfo.workingDays || 'Monday - Saturday',
      cnicNumber: appData.documents.cnicNumber,
      cnicFrontImage: appData.documents.cnicFrontImage,
      cnicBackImage: appData.documents.cnicBackImage,
      businessLicense: appData.documents.businessLicense,
      professionalCertificate: appData.documents.professionalCertificate,
      cnicNumberMasked: appData.documents.cnicNumber ? appData.documents.cnicNumber.replace(/(\d{5})-(\d{2})\d{4}-(\d)/, '$1-$2****-$3') : ''
    };

    // 3. PERMANENT SAVE TO FIRESTORE
    await saveProviderToFirestore(newRecord);

    // 4. Update local state
    setProviders(prev => {
      const filtered = prev.filter(p => p.id !== docId && normalizePhone(p.phone) !== cleanPhone);
      return [newRecord, ...filtered];
    });
    setCurrentLoggedInProviderId(docId);

    // 5. Notify Admin Dashboard
    const adminNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      recipientId: 'admin',
      recipientRole: 'admin',
      type: 'alert',
      title: 'New Provider Registration',
      message: `${appData.personalInfo.fullName} registered "${appData.businessInfo.businessName}" (${docId}). Status: Pending Approval.`,
      read: false,
      createdAt: 'Just now',
      actionLink: 'admin'
    };
    setNotifications(prev => [adminNotif, ...prev]);

    return { success: true, id: docId };
  };

  // -------------------------------------------------------------
  // APPROVE PROVIDER (UPDATE DOC STATUS TO "approved")
  // -------------------------------------------------------------
  const approveProvider = async (docId: string) => {
    await approveProviderInFirestore(docId);

    // Update in-memory state
    setProviders(prev => prev.map(p => {
      if (p.id === docId || normalizePhone(p.phone) === docId) {
        return {
          ...p,
          status: 'approved',
          applicationStatus: 'approved',
          approved: true,
          verified: true,
          identityVerified: true,
          isPublic: true
        };
      }
      return p;
    }));

    showToast('Provider approved successfully! Now live on Home Page.');
  };

  // -------------------------------------------------------------
  // REJECT PROVIDER (PERMANENTLY DELETE DOC USING deleteDoc())
  // Requirement: When I click REJECT in Admin Panel, permanently DELETE the document
  // from Firebase Firestore using deleteDoc(), don't just hide it from UI.
  // -------------------------------------------------------------
  const rejectProvider = async (docId: string) => {
    const target = providers.find(p => p.id === docId || normalizePhone(p.phone) === docId);
    const phone = target?.phone || docId;

    // Permanently blacklist so it never resurrects
    addPermanentlyRejectedId(docId, phone);

    // Call Firebase Firestore deleteDoc()
    await rejectProviderFromFirestore(docId);

    // Remove instantly from state
    setProviders(prev => prev.filter(p => p.id !== docId && normalizePhone(p.phone) !== normalizePhone(phone)));

    showToast('Provider permanently deleted from Firestore and removed from directory.');
  };

  const deleteProviderPermanently = rejectProvider;

  // Legacy approval update helper for other subcomponents
  const updateApplicationStatus = (
    appId: string, 
    newStatus: ProviderApplicationStatus, 
    remarks?: string
  ) => {
    if (newStatus === 'approved') {
      approveProvider(appId);
    } else if (newStatus === 'rejected') {
      rejectProvider(appId);
    } else {
      setProviders(prev => prev.map(p => {
        if (p.id === appId || p.applicationId === appId) {
          return { ...p, status: newStatus, applicationStatus: newStatus };
        }
        return p;
      }));
      showToast(`Status updated to ${newStatus}`);
    }
  };

  const resubmitApplication = (appId: string, updatedData: Partial<ProviderApplication>) => {
    showToast('Application updated.');
  };

  const updateProviderProfile = (id: string, updates: Partial<Provider>) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Provider profile updated successfully');
  };

  const addProvider = (newProvider: Provider) => {
    setProviders(prev => [newProvider, ...prev]);
    showToast('New provider registered successfully!');
  };

  const toggleProviderVerification = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextVerified = !p.verified;
        showToast(`Provider ${p.businessName} ${nextVerified ? 'verified' : 'unverified'}`);
        return { ...p, verified: nextVerified, identityVerified: nextVerified };
      }
      return p;
    }));
  };

  const deleteProvider = rejectProvider;

  const addCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
    showToast(`Category "${cat.name}" added successfully`);
  };

  const addVillage = (v: Village) => {
    setVillages(prev => [...prev, v]);
    showToast(`Village "${v.name}" registered`);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'proposalsCount'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: 'Just now',
      proposalsCount: 0
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('Your task has been posted to local providers!');
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    showToast(`Task status updated to ${status}`);
  };

  const startChatWithProvider = (providerItem: Provider) => {
    const existing = conversations.find(c => c.providerId === providerItem.id);
    if (existing) {
      setActiveChatId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `c-${Date.now()}`,
        providerId: providerItem.id,
        providerName: providerItem.businessName,
        providerImage: providerItem.profileImage,
        providerCategory: providerItem.categoryName,
        unreadCount: 0,
        lastMessage: 'Chat conversation started.',
        lastTimestamp: 'Just now',
        messages: [
          {
            id: `m-1`,
            sender: 'user',
            text: `Assalam-o-Alaikum, I would like to inquire about your ${providerItem.categoryName} services in ${providerItem.primaryLocation}.`,
            timestamp: 'Just now'
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveChatId(newConv.id);
    }
    setIsChatModalOpen(true);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user' as const,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, userMsg],
          lastMessage: userMsg.text,
          lastTimestamp: 'Just now'
        };
      }
      return c;
    }));

    setTimeout(() => {
      const replyMsg = {
        id: `m-rep-${Date.now()}`,
        sender: 'provider' as const,
        text: 'Walaikum Assalam! Thank you for contacting me. I am currently available for visits across Pakpattan and nearby villages. Please share your exact location or requirements.',
        timestamp: 'Just now'
      };

      setConversations(prev => prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, replyMsg],
            lastMessage: replyMsg.text,
            lastTimestamp: 'Just now',
            unreadCount: c.unreadCount + 1
          };
        }
        return c;
      }));
    }, 1500);
  };

  const executeSearch = (queryStr = '', category = '', location = '') => {
    setSearchQuery(queryStr);
    setSelectedCategory(category);
    setSelectedLocation(location);
    setActiveTab('providers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setVerifiedOnly(false);
    setMinRating(0);
    setSortBy('recommended');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        verifiedOnly,
        setVerifiedOnly,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        providers,
        publicApprovedProviders,
        addProvider,
        updateProviderProfile,
        toggleProviderVerification,
        deleteProvider,
        approveProvider,
        rejectProvider,
        deleteProviderPermanently,
        selectedProvider,
        setSelectedProvider,
        openProviderProfile,
        adminProfile,
        applications,
        submitProviderRegistration,
        updateApplicationStatus,
        resubmitApplication,
        currentLoggedInProviderId,
        setCurrentLoggedInProviderId,
        currentProvider,
        categories,
        addCategory,
        villages,
        addVillage,
        tasks,
        addTask,
        updateTaskStatus,
        savedProviderIds,
        toggleSaveProvider,
        blogPosts,
        selectedBlogPost,
        openBlogPost,
        conversations,
        activeChatId,
        setActiveChatId,
        isChatModalOpen,
        setIsChatModalOpen,
        startChatWithProvider,
        sendMessage,
        notifications,
        markNotificationAsRead,
        unreadNotificationsCount,
        toast,
        showToast,
        isHostingerModalOpen,
        setIsHostingerModalOpen,
        executeSearch,
        resetFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
