import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Clock, 
  Calendar, 
  Heart, 
  ArrowLeft, 
  Check, 
  Send,
  AlertCircle,
  Briefcase,
  Share2
} from 'lucide-react';
import { Provider } from '../types';

export const ProviderDetail: React.FC = () => {
  const { 
    selectedProvider, 
    setActiveTab, 
    startChatWithProvider, 
    savedProviderIds, 
    toggleSaveProvider, 
    showToast,
    language,
    userRole,
    currentLoggedInProviderId,
    adminProfile
  } = useApp();

  const [showPhone, setShowPhone] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewVillage, setNewReviewVillage] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(selectedProvider?.reviews || []);

  if (!selectedProvider) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-500 mb-4">No provider profile selected.</p>
        <button
          onClick={() => setActiveTab('providers')}
          className="px-4 py-2 bg-[#5865F2] text-white rounded-xl text-sm font-semibold"
        >
          Return to Providers Directory
        </button>
      </div>
    );
  }

  // RESTRICTION: Only approved providers can be viewed publicly by customers
  const isOwnerOrAdmin = userRole === 'admin' || currentLoggedInProviderId === selectedProvider.id;
  const isNotPublic = selectedProvider.applicationStatus !== 'approved' || selectedProvider.isPublic === false;

  if (isNotPublic && !isOwnerOrAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#F7F8FC]">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase tracking-wider">
            Private Profile · Pending Approval
          </span>
          <h2 className="font-heading font-extrabold text-xl text-[#111A4A] mt-3 mb-2">
            Profile Under Verification
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            The profile for <strong>{selectedProvider.businessName}</strong> is currently private and undergoing review by Super Admin <strong>{adminProfile.name}</strong>. In accordance with safety policies, profiles only become visible to customers after full verification.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('providers')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition shadow-xs"
            >
              Browse Verified Providers
            </button>
            <button
              onClick={() => setActiveTab('register-provider')}
              className="w-full py-2 px-4 rounded-xl bg-[#E2FFF5] text-[#111A4A] text-xs font-bold transition"
            >
              Become a Service Provider
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedProviderIds.includes(selectedProvider.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Please enter your name and comment.');
      return;
    }

    const review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      village: newReviewVillage.trim() || selectedProvider.primaryLocation,
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    setReviewsList([review, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewVillage('');
    setNewReviewComment('');
    showToast('Thank you! Your verified community review has been posted.');
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back Button */}
        <button
          onClick={() => setActiveTab('providers')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#5865F2] mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm mb-8">
          
          {/* Header Banner */}
          <div className="relative h-44 sm:h-64 bg-gradient-to-r from-[#111A4A] via-[#233385] to-[#111A4A] overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            {/* Top action pill buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Provider profile link copied to clipboard!');
                }}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition shadow"
                title="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleSaveProvider(selectedProvider.id)}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition shadow"
                title={isSaved ? 'Saved' : 'Save'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Profile Basic Info Row */}
          <div className="p-6 sm:p-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                {/* Profile Photo */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-white overflow-hidden flex-shrink-0">
                  <img
                    src={selectedProvider.profileImage}
                    alt={selectedProvider.businessName}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProvider.verified && (
                    <div className="absolute bottom-2 right-2 bg-[#18B88A] text-white p-1 rounded-full shadow">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#111A4A]">
                      {selectedProvider.businessName}
                    </h1>
                    {selectedProvider.verified && (
                      <span className="inline-flex items-center gap-1 bg-[#E2FFF5] text-[#18B88A] text-xs font-bold px-2 py-0.5 rounded-md border border-[#18B88A]/30">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Provider</span>
                      </span>
                    )}
                  </div>

                  <p className="font-urdu text-sm text-[#111A4A]/80 font-bold mb-1">
                    {selectedProvider.businessNameUrdu}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="font-semibold text-gray-800">{selectedProvider.categoryName}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#5865F2]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedProvider.primaryLocation} ({selectedProvider.tehsil})</span>
                    </span>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-[#F5A623]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-gray-900">{selectedProvider.rating}</span>
                      <span className="text-gray-400">({selectedProvider.reviewCount} customer reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => startChatWithProvider(selectedProvider)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-xs sm:text-sm font-bold text-white shadow-md shadow-[#5865F2]/25 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Provider</span>
                </button>

                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700 transition"
                >
                  <Phone className="w-4 h-4 text-[#18B88A]" />
                  <span>{showPhone ? selectedProvider.phone : 'Show Contact'}</span>
                </button>
              </div>

            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F8FC]">
                <span className="text-gray-400 block text-[11px]">Completed Jobs</span>
                <span className="font-heading font-extrabold text-base text-[#111A4A]">
                  {selectedProvider.completedJobs}+
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8FC]">
                <span className="text-gray-400 block text-[11px]">Working Hours</span>
                <span className="font-bold text-gray-800 truncate block">
                  {selectedProvider.workingHours}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8FC]">
                <span className="text-gray-400 block text-[11px]">Identity Status</span>
                <span className="font-bold text-[#18B88A] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CNIC Verified</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8FC]">
                <span className="text-gray-400 block text-[11px]">Member Since</span>
                <span className="font-bold text-gray-800">
                  {selectedProvider.memberSince}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 2-Column Content Layout: Left details, Right sticky booking panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="font-heading font-bold text-lg text-[#111A4A] mb-3">
                About the Business & Experience
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                {selectedProvider.description}
              </p>
              <div className="p-4 rounded-2xl bg-[#F0EEFF] border border-[#5865F2]/20 font-urdu text-sm text-[#111A4A] leading-loose">
                {selectedProvider.descriptionUrdu}
              </div>
            </div>

            {/* Covered Service Areas (Multiple Villages per Provider requirement) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading font-bold text-lg text-[#111A4A]">
                  Covered Service Areas ({selectedProvider.serviceAreas.length})
                </h2>
                <span className="text-xs text-[#18B88A] font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Travels with Tools</span>
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                This provider actively travels to the following urban neighborhoods and rural chaks:
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedProvider.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F8FC] border border-gray-200/80 text-xs font-semibold text-[#111A4A]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#5865F2]" />
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Services Offered & Pricing Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="font-heading font-bold text-lg text-[#111A4A] mb-4">
                Services Offered & Standard Rates
              </h2>

              <div className="space-y-3">
                {selectedProvider.services.map(service => (
                  <div
                    key={service.id}
                    className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-[#111A4A]">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className="text-right">
                        <span className="font-heading font-extrabold text-sm sm:text-base text-[#111A4A]">
                          Rs. {service.price}
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          /{service.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => startChatWithProvider(selectedProvider)}
                        className="px-3 py-1.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-xs font-semibold text-white transition active:scale-95"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews & Ratings */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="font-heading font-bold text-lg text-[#111A4A]">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-gray-500">
                    Verified feedback from customers across Pakpattan & Arifwala
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-heading font-extrabold text-xl text-[#111A4A]">
                      {selectedProvider.rating}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">Overall Score</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 mb-8">
                {reviewsList.map(r => (
                  <div key={r.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111A4A]">
                          {r.author}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <MapPin className="w-3 h-3 text-[#5865F2]" />
                          <span>{r.village}</span>
                          <span>·</span>
                          <span>{r.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#F5A623]">
                        {[...Array(Math.floor(r.rating))].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Leave Review Form */}
              <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-gray-100">
                <h3 className="font-heading font-bold text-sm text-[#111A4A] mb-3">
                  Write a Verified Review
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="px-3.5 py-2 text-xs rounded-xl bg-[#F7F8FC] border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                  />
                  <input
                    type="text"
                    value={newReviewVillage}
                    onChange={(e) => setNewReviewVillage(e.target.value)}
                    placeholder="Your Village / Chak (e.g. Chak 19/SP)"
                    className="px-3.5 py-2 text-xs rounded-xl bg-[#F7F8FC] border border-gray-200 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-700">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-[#F5A623] p-0.5"
                      >
                        <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience regarding punctuality, quality of work, and pricing..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F7F8FC] border border-gray-200 focus:outline-none focus:border-[#5865F2] mb-3"
                />

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#111A4A] hover:bg-[#1a2569] text-white text-xs font-bold transition"
                >
                  Submit Review
                </button>
              </form>

            </div>

          </div>

          {/* Sticky Action Panel (Right 1 col) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-md space-y-6">
              
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Inspection / Starting:</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-heading font-extrabold text-3xl text-[#111A4A]">
                    Rs. {selectedProvider.startingPrice}
                  </span>
                  <span className="text-xs text-gray-500">/{selectedProvider.priceUnit}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => startChatWithProvider(selectedProvider)}
                  className="w-full py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-md shadow-[#5865F2]/25 transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Chat Discussion</span>
                </button>

                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-3 px-4 rounded-xl bg-[#E2FFF5] hover:bg-[#d0fced] text-[#111A4A] text-xs font-bold transition flex items-center justify-center gap-2 border border-[#18B88A]/30"
                >
                  <Phone className="w-4 h-4 text-[#18B88A]" />
                  <span>{showPhone ? selectedProvider.phone : 'Reveal Phone Number'}</span>
                </button>
              </div>

              {/* Trust Badges in Sticky Box */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#18B88A] flex-shrink-0" />
                  <span>CNIC & Identity Verified by Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5865F2] flex-shrink-0" />
                  <span>No upfront platform booking fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                  <span>Direct doorstep service across villages</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
