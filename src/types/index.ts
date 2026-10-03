export type Language = 'en' | 'ur';

export type UserRole = 'customer' | 'provider' | 'admin';

export type Tehsil = 'Pakpattan' | 'Arifwala';

export type ProviderApplicationStatus = 
  | 'pending' 
  | 'under_review' 
  | 'approved' 
  | 'rejected' 
  | 'suspended' 
  | 'resubmission_required';

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  iconName: string;
  providerCount: number;
  description: string;
  descriptionUrdu: string;
  popular?: boolean;
}

export interface Village {
  id: string;
  name: string;
  nameUrdu: string;
  tehsil: Tehsil;
  unionCouncil: string;
  distanceKm: number;
  providerCount: number;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  price: number;
  unit: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  tag: string;
}

export interface ProviderReview {
  id: string;
  author: string;
  village: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProviderApprovalLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  previousStatus: ProviderApplicationStatus;
  newStatus: ProviderApplicationStatus;
  remarks?: string;
  timestamp: string;
}

export interface ProviderApplication {
  id: string; // e.g. APP-2026-104
  userId: string;
  personalInfo: {
    fullName: string;
    fatherName?: string;
    mobileNumber: string;
    whatsappNumber: string;
    email: string;
    profilePicture: string;
  };
  businessInfo: {
    businessName: string;
    businessNameUrdu?: string;
    providerType: 'Individual' | 'Business' | 'Company';
    mainCategory: string;
    mainCategoryName: string;
    additionalCategories: string[];
    servicesOffered: string;
    experienceYears: number;
    businessDescription: string;
    startingPrice: number;
    priceUnit: string;
    workingDays: string;
    workingHours: string;
  };
  locationInfo: {
    district: string;
    tehsil: Tehsil;
    unionCouncil: string;
    village: string;
    completeAddress: string;
    selectedServiceAreas: string[]; // Multiple villages
    googleMapsLocation?: string;
  };
  documents: {
    cnicNumber: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    businessLicense?: string;
    professionalCertificate?: string;
    portfolioImages: string[];
  };
  status: ProviderApplicationStatus;
  rejectionReason?: string;
  resubmissionNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  reviewedBy?: string;
  approvalLogs: ProviderApprovalLog[];
}

export interface Provider {
  id: string;
  userId?: string;
  applicationId?: string;
  businessName: string;
  businessNameUrdu: string;
  ownerName: string;
  category: string;
  categoryName: string;
  additionalCategories?: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  identityVerified: boolean;
  badgeType: 'verified' | 'top_rated' | 'local_certified';
  primaryLocation: string;
  tehsil: Tehsil;
  serviceAreas: string[]; // Multiple villages & areas per provider
  description: string;
  descriptionUrdu: string;
  startingPrice: number;
  priceUnit: string;
  profileImage: string;
  coverImage?: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  completedJobs: number;
  memberSince: string;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  reviews: ProviderReview[];
  featured?: boolean;
  approved?: boolean;
  status?: ProviderApplicationStatus;
  email?: string;
  fatherName?: string;
  cnicNumber?: string;
  cnicFrontImage?: string;
  cnicBackImage?: string;
  businessLicense?: string;
  professionalCertificate?: string;
  // Approval Workflow Fields
  applicationStatus: ProviderApplicationStatus;
  isPublic: boolean;
  approvalDate?: string;
  rejectionReason?: string;
  resubmissionNotes?: string;
  cnicNumberMasked?: string;
  experienceYears?: number;
  workingDays?: string;
}

export interface Task {
  id: string;
  customerName: string;
  customerPhone: string;
  category: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  village: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  proposalsCount: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  providerCategory: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: Message[];
}

export interface SubscriptionPlan {
  id: 'daily' | 'weekly' | 'monthly';
  name: string;
  nameUrdu: string;
  price: number;
  interval: string;
  intervalUrdu: string;
  badge?: string;
  description: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  titleUrdu: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameUrdu: string;
  village: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  serviceTaken: string;
}

export interface AppNotification {
  id: string;
  recipientId: string; // 'admin' or provider user ID
  recipientRole: 'admin' | 'provider' | 'customer';
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  createdAt: string;
  actionLink?: string;
}

export interface AdminProfile {
  name: string;
  contact: string;
  whatsapp: string;
  email: string;
  role: string;
  office: string;
}
