import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Briefcase, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  X,
  Phone,
  Eye,
  Check
} from 'lucide-react';
import { CATEGORIES, VILLAGES } from '../data/mockData';
import { Tehsil, ProviderApplication } from '../types';

export const ProviderRegisterPortal: React.FC = () => {
  const { 
    submitProviderRegistration, 
    categories, 
    villages, 
    adminProfile, 
    setUserRole, 
    setActiveTab,
    language,
    showToast
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Step 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80');

  // Step 2: Business Info
  const [businessName, setBusinessName] = useState('');
  const [businessNameUrdu, setBusinessNameUrdu] = useState('');
  const [providerType, setProviderType] = useState<'Individual' | 'Business' | 'Company'>('Individual');
  const [mainCategory, setMainCategory] = useState('plumber');
  const [additionalCategories, setAdditionalCategories] = useState<string[]>([]);
  const [servicesOffered, setServicesOffered] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [businessDescription, setBusinessDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('600');
  const [priceUnit, setPriceUnit] = useState('Visit & Diagnostic');
  const [workingDays, setWorkingDays] = useState('Monday - Saturday');
  const [workingHours, setWorkingHours] = useState('8:00 AM - 8:00 PM');

  // Step 3: Location Info
  const [district] = useState('Pakpattan');
  const [tehsil, setTehsil] = useState<Tehsil>('Pakpattan');
  const [unionCouncil, setUnionCouncil] = useState('');
  const [village, setVillage] = useState('Pakpattan City (Urban)');
  const [completeAddress, setCompleteAddress] = useState('');
  const [googleMapsLocation, setGoogleMapsLocation] = useState('');
  const [selectedServiceAreas, setSelectedServiceAreas] = useState<string[]>([
    'Pakpattan City (Urban)',
    'Chak 19/SP'
  ]);
  const [villageSearch, setVillageSearch] = useState('');

  // Step 4: Documents & Verification
  const [cnicNumber, setCnicNumber] = useState('');
  const [cnicFrontImage, setCnicFrontImage] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80');
  const [cnicBackImage, setCnicBackImage] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80');
  const [businessLicense, setBusinessLicense] = useState('');
  const [professionalCertificate, setProfessionalCertificate] = useState('');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  ]);

  // Step 5: Agreements
  const [agreeAccurate, setAgreeAccurate] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeApprovalRule, setAgreeApprovalRule] = useState(false);

  // Errors state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step navigation validation
  const validateStep = (step: number): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!fullName.trim() || !mobileNumber.trim() || !whatsappNumber.trim() || !email.trim()) {
        setValidationError('Please complete all required personal contact fields.');
        return false;
      }
      if (!password || password.length < 6) {
        setValidationError('Password must be at least 6 characters long.');
        return false;
      }
      if (password !== confirmPassword) {
        setValidationError('Password and Confirm Password do not match.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!businessName.trim() || !servicesOffered.trim() || !businessDescription.trim()) {
        setValidationError('Please complete business name, services offered, and description.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!completeAddress.trim() || selectedServiceAreas.length === 0) {
        setValidationError('Please provide complete address and select at least one village service area.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!cnicNumber.trim() || cnicNumber.replace(/\D/g, '').length < 13) {
        setValidationError('Please provide a valid 13-digit Pakistani CNIC number.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVillageArea = (vName: string) => {
    if (selectedServiceAreas.includes(vName)) {
      setSelectedServiceAreas(selectedServiceAreas.filter(a => a !== vName));
    } else {
      setSelectedServiceAreas([...selectedServiceAreas, vName]);
    }
  };

  const toggleAdditionalCategory = (catId: string) => {
    if (additionalCategories.includes(catId)) {
      setAdditionalCategories(additionalCategories.filter(c => c !== catId));
    } else {
      setAdditionalCategories([...additionalCategories, catId]);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeAccurate || !agreeTerms || !agreePrivacy || !agreeApprovalRule) {
      setValidationError('Please accept all required agreements to submit your application.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    const mainCatObj = categories.find(c => c.id === mainCategory);

    try {
      const res = await submitProviderRegistration({
        userId: `u-${Date.now()}`,
        personalInfo: {
          fullName: fullName.trim(),
          fatherName: fatherName.trim(),
          mobileNumber: mobileNumber.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: email.trim(),
          profilePicture
        },
        businessInfo: {
          businessName: businessName.trim(),
          businessNameUrdu: businessNameUrdu.trim(),
          providerType,
          mainCategory,
          mainCategoryName: mainCatObj ? mainCatObj.name : 'Services',
          additionalCategories,
          servicesOffered: servicesOffered.trim(),
          experienceYears: Number(experienceYears) || 3,
          businessDescription: businessDescription.trim(),
          startingPrice: Number(startingPrice) || 500,
          priceUnit,
          workingDays,
          workingHours
        },
        locationInfo: {
          district,
          tehsil,
          unionCouncil: unionCouncil.trim() || 'Urban UC',
          village,
          completeAddress: completeAddress.trim(),
          selectedServiceAreas,
          googleMapsLocation: googleMapsLocation.trim()
        },
        documents: {
          cnicNumber: cnicNumber.trim(),
          cnicFrontImage,
          cnicBackImage,
          businessLicense: businessLicense.trim(),
          professionalCertificate: professionalCertificate.trim(),
          portfolioImages
        }
      });

      if (typeof res === 'object' && !res.success) {
        setValidationError(res.error || 'اس نمبر سے پہلے ہی رجسٹریشن ہو چکی ہے');
        setIsSubmitting(false);
        return;
      }

      const appId = typeof res === 'string' ? res : (res.id || 'APP-2026');
      setSubmittedAppId(appId);
      showToast('Registration submitted to Firebase permanently! Status: Pending Approval.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setValidationError(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsHeader = [
    { num: 1, title: 'Personal Info', icon: User },
    { num: 2, title: 'Business Details', icon: Briefcase },
    { num: 3, title: 'Locations', icon: MapPin },
    { num: 4, title: 'Documents', icon: FileText },
    { num: 5, title: 'Submit', icon: ShieldCheck }
  ];

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Post-submission Success Screen */}
        {submittedAppId ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xl text-center animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Current Status: Pending Approval</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111A4A] tracking-tight mb-3">
              Registration Submitted Successfully!
            </h1>

            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
              Thank you for registering with <strong>PakPattan Services Hub</strong>. Your application is currently under review by our administration team. Your profile will become visible to customers after approval.
            </p>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#F7F8FC] border border-gray-200/80 text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Application Number:</span>
                <span className="font-mono font-bold text-[#5865F2]">{submittedAppId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Applicant:</span>
                <span className="font-bold text-[#111A4A]">{fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Business Name:</span>
                <span className="font-bold text-[#111A4A]">{businessName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Submission Date:</span>
                <span className="text-gray-700">Today</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Review Officer:</span>
                <span className="font-semibold text-[#18B88A]">Admin {adminProfile.name}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0EEFF] border border-[#5865F2]/20 max-w-md mx-auto text-xs text-gray-700 mb-8 flex items-start gap-3 text-left">
              <Phone className="w-4 h-4 text-[#5865F2] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#111A4A]">Need urgent verification?</p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Contact Super Admin <strong>{adminProfile.name}</strong> on WhatsApp: <strong>{adminProfile.whatsapp}</strong> or Call <strong>{adminProfile.contact}</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setUserRole('provider');
                  setActiveTab('provider-dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
              >
                Go to Provider Dashboard
              </button>
              <button
                onClick={() => {
                  setUserRole('customer');
                  setActiveTab('home');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition"
              >
                Browse Website as Visitor
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Registration Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EEFF] text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Service Partner Registration</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
                Join PakPattan Services Hub
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                Register your business or professional services and connect with customers across Pakpattan, Arifwala, and nearby villages.
              </p>
            </div>

            {/* Step Progress Indicator (Section 15) */}
            <div className="mb-8">
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {stepsHeader.map((step) => {
                  const Icon = step.icon;
                  const isCurrent = currentStep === step.num;
                  const isPassed = currentStep > step.num;

                  return (
                    <div
                      key={step.num}
                      className={`text-center p-2 rounded-2xl transition border ${
                        isCurrent
                          ? 'bg-[#F0EEFF] border-[#5865F2] text-[#5865F2]'
                          : isPassed
                          ? 'bg-[#E2FFF5] border-[#18B88A]/40 text-[#18B88A]'
                          : 'bg-gray-50 border-gray-100 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">0{step.num}</span>
                      </div>
                      <p className="text-[10px] font-bold truncate hidden sm:block">
                        {step.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Notification if any */}
            {validationError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-heading font-bold text-base text-[#111A4A]">
                      Step 1: Personal Information
                    </h3>
                    <p className="text-xs text-gray-500">Basic contact & profile credentials</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Umar / Rashid Gill"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Father's Name (optional)</label>
                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="e.g. Haji Muhammad Aslam"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number *</label>
                      <input
                        type="text"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 0300 7861122"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number *</label>
                      <input
                        type="text"
                        required
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="e.g. 0300 7861122"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. umar.plumbing@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Create Password *</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password *</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Profile Picture *</label>
                    <div className="flex items-center gap-4">
                      <img src={profilePicture} alt="Preview" className="w-16 h-16 rounded-2xl object-cover border border-gray-200" />
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => showToast('Demo photo selected. Real upload supported.')}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Upload Photo
                        </button>
                        <p className="text-[11px] text-gray-400">Clear face photo builds trust with local customers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Business / Service Information */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-heading font-bold text-base text-[#111A4A]">
                      Step 2: Business & Trade Information
                    </h3>
                    <p className="text-xs text-gray-500">Details of your services, experience, and pricing</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Business Name (English) *</label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Umar Sanitary Works / Gill Solar Care"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Business Name (اردو - اختیاری)</label>
                      <input
                        type="text"
                        value={businessNameUrdu}
                        onChange={(e) => setBusinessNameUrdu(e.target.value)}
                        placeholder="e.g. عمر ہوم سروسز"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 font-urdu focus:outline-none focus:border-[#5865F2] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Provider Type *</label>
                      <select
                        value={providerType}
                        onChange={(e) => setProviderType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 cursor-pointer"
                      >
                        <option value="Individual">Individual Technician</option>
                        <option value="Business">Registered Business / Shop</option>
                        <option value="Company">Contractor / Company</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Main Category *</label>
                      <select
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 cursor-pointer"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.nameUrdu})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Experience (Years) *</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Additional Categories Multi-Select */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Additional Categories (Multiple Selection)
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                      {categories.filter(c => c.id !== mainCategory).map(cat => {
                        const isSelected = additionalCategories.includes(cat.id);
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => toggleAdditionalCategory(cat.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                              isSelected
                                ? 'bg-[#5865F2] text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{cat.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Services Offered (Summary) *</label>
                    <input
                      type="text"
                      required
                      value={servicesOffered}
                      onChange={(e) => setServicesOffered(e.target.value)}
                      placeholder="e.g. Water tank cleaning, PPRC fitting, leak repair, boring motor install"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Describe your expertise, work quality guarantee, workshop details, and service process..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Starting Price (PKR)</label>
                      <input
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        placeholder="e.g. 600"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Working Days</label>
                      <input
                        type="text"
                        value={workingDays}
                        onChange={(e) => setWorkingDays(e.target.value)}
                        placeholder="e.g. Monday - Saturday"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Working Hours</label>
                      <input
                        type="text"
                        value={workingHours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="e.g. 8:00 AM - 8:00 PM"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Location Information & Multiple Service Areas */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-heading font-bold text-base text-[#111A4A]">
                      Step 3: Location & Service Areas
                    </h3>
                    <p className="text-xs text-gray-500">
                      Specify your base location and select all villages where you travel to perform jobs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">District</label>
                      <input
                        type="text"
                        disabled
                        value="Pakpattan"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Tehsil *</label>
                      <select
                        value={tehsil}
                        onChange={(e) => setTehsil(e.target.value as Tehsil)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 cursor-pointer"
                      >
                        <option value="Pakpattan">Pakpattan Tehsil</option>
                        <option value="Arifwala">Arifwala Tehsil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Base Village / City *</label>
                      <select
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 cursor-pointer"
                      >
                        {villages.map(v => (
                          <option key={v.id} value={v.name}>{v.name} ({v.tehsil})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Union Council (UC)</label>
                      <input
                        type="text"
                        value={unionCouncil}
                        onChange={(e) => setUnionCouncil(e.target.value)}
                        placeholder="e.g. UC 19/SP / Urban UC-02"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Pin Link (optional)</label>
                      <input
                        type="text"
                        value={googleMapsLocation}
                        onChange={(e) => setGoogleMapsLocation(e.target.value)}
                        placeholder="e.g. https://maps.google.com/?q=..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Complete Workshop / Dera Address *</label>
                    <input
                      type="text"
                      required
                      value={completeAddress}
                      onChange={(e) => setCompleteAddress(e.target.value)}
                      placeholder="e.g. Main Chowk, Shop # 4, Near Grid Station, Pakpattan"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                    />
                  </div>

                  {/* Searchable Multi-Select Village Selector */}
                  <div className="p-4 rounded-2xl bg-[#F0EEFF]/50 border border-[#5865F2]/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <label className="block text-xs font-bold text-[#111A4A]">
                          Select Multiple Service Villages & Chaks ({selectedServiceAreas.length} selected) *
                        </label>
                        <p className="text-[11px] text-gray-500">
                          Check off every village you can travel to. Customers will find your listing in these areas.
                        </p>
                      </div>

                      <input
                        type="text"
                        value={villageSearch}
                        onChange={(e) => setVillageSearch(e.target.value)}
                        placeholder="Filter villages..."
                        className="px-3 py-1.5 text-xs rounded-lg bg-white border border-gray-200 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                      {villages.filter(v => v.name.toLowerCase().includes(villageSearch.toLowerCase())).map(v => {
                        const isChecked = selectedServiceAreas.includes(v.name);
                        return (
                          <div
                            key={v.id}
                            onClick={() => toggleVillageArea(v.name)}
                            className={`p-2 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                              isChecked
                                ? 'bg-white border-[#5865F2] text-[#5865F2] font-bold shadow-2xs'
                                : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-white'
                            }`}
                          >
                            <span className="truncate">{v.name}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                              isChecked ? 'bg-[#5865F2] text-white' : 'border border-gray-300'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Documents & Verification */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-heading font-bold text-base text-[#111A4A]">
                      Step 4: Documents & Identity Verification
                    </h3>
                    <p className="text-xs text-gray-500">Required by Admin Omar Draz Gill to prevent fraud and certify trusted providers</p>
                  </div>

                  {/* Privacy Protection Banner */}
                  <div className="p-3.5 rounded-2xl bg-[#E2FFF5] border border-[#18B88A]/40 text-xs text-gray-700 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#18B88A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#111A4A] block">Confidential Verification Guarantee</strong>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        Your CNIC number and uploaded identity documents are stored securely and used ONLY by Admin Omar Draz Gill for verification. They are never published or accessible to public visitors.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      CNIC Number * (e.g. 35302-1234567-1)
                    </label>
                    <input
                      type="text"
                      required
                      value={cnicNumber}
                      onChange={(e) => setCnicNumber(e.target.value)}
                      placeholder="35302-XXXXXXX-X"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white font-mono"
                    />
                  </div>

                  {/* CNIC Front & Back */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
                      <p className="text-xs font-bold text-gray-700 mb-2">CNIC Front Side Image *</p>
                      <img src={cnicFrontImage} alt="CNIC Front" className="w-full h-28 object-cover rounded-xl mb-2" />
                      <button
                        type="button"
                        onClick={() => showToast('CNIC front preview loaded')}
                        className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-semibold text-gray-700"
                      >
                        Change Photo
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
                      <p className="text-xs font-bold text-gray-700 mb-2">CNIC Back Side Image *</p>
                      <img src={cnicBackImage} alt="CNIC Back" className="w-full h-28 object-cover rounded-xl mb-2" />
                      <button
                        type="button"
                        onClick={() => showToast('CNIC back preview loaded')}
                        className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-[11px] font-semibold text-gray-700"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Business License / Chamber Reg (optional)</label>
                      <input
                        type="text"
                        value={businessLicense}
                        onChange={(e) => setBusinessLicense(e.target.value)}
                        placeholder="e.g. Pakpattan Chamber # 4401"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Professional Diploma / Certificate (optional)</label>
                      <input
                        type="text"
                        value={professionalCertificate}
                        onChange={(e) => setProfessionalCertificate(e.target.value)}
                        placeholder="e.g. TEVTA Solar Electrical 2022"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Account Agreement */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="font-heading font-bold text-base text-[#111A4A]">
                      Step 5: Account Agreement & Confirmation
                    </h3>
                    <p className="text-xs text-gray-500">Please review and confirm before submitting for review</p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Provider Name:</span>
                      <strong className="text-[#111A4A]">{fullName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Business Name:</span>
                      <strong className="text-[#111A4A]">{businessName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Main Trade:</span>
                      <strong className="text-[#5865F2]">{mainCategory}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Areas:</span>
                      <strong className="text-[#18B88A]">{selectedServiceAreas.length} Villages Selected</strong>
                    </div>
                  </div>

                  {/* 4 Required Checkboxes (Prompt Section 2 Step 5) */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeAccurate}
                        onChange={(e) => setAgreeAccurate(e.target.checked)}
                        className="w-4 h-4 rounded text-[#5865F2] mt-0.5"
                      />
                      <span className="text-xs text-gray-700">
                        I confirm that the information provided is accurate and truthful.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded text-[#5865F2] mt-0.5"
                      />
                      <span className="text-xs text-gray-700">
                        I agree to the Terms and Conditions of PakPattan Services Hub.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        className="w-4 h-4 rounded text-[#5865F2] mt-0.5"
                      />
                      <span className="text-xs text-gray-700">
                        I agree to the Privacy Policy.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeApprovalRule}
                        onChange={(e) => setAgreeApprovalRule(e.target.checked)}
                        className="w-4 h-4 rounded text-[#5865F2] mt-0.5"
                      />
                      <span className="text-xs font-semibold text-[#111A4A]">
                        I understand that my profile will only become public after admin approval by Admin {adminProfile.name}.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
                  >
                    <span>Continue to Step 0{currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#18B88A] hover:bg-[#159a73] disabled:bg-gray-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#18B88A]/25 transition active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving to Firebase...' : 'Submit Registration for Approval'}</span>
                  </button>
                )}
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
