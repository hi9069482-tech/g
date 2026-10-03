import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  MessageSquare, 
  Eye, 
  Heart, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { Provider } from '../types';

export const FeaturedProviders: React.FC = () => {
  const { 
    providers, 
    openProviderProfile, 
    startChatWithProvider, 
    savedProviderIds, 
    toggleSaveProvider,
    setActiveTab,
    language 
  } = useApp();

  // Requirement: Fetch all providers from Firebase where status == "approved" and show them here
  const approvedList = providers.filter(p => 
    (p.status === 'approved' || p.applicationStatus === 'approved') && p.isPublic !== false
  );

  return (
    <section className="py-14 sm:py-20 bg-[#F7F8FC] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18B88A] tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#18B88A]" />
              <span>Verified Experts · پاکپتن و عارف والا</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
              Featured Service Providers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              {language === 'ur'
                ? 'اپنے علاقے کے سب سے زیادہ ریٹنگ والے تصدیق شدہ کاریگروں سے فوری رابطہ کریں۔'
                : 'Connect with verified, highly-rated professionals serving your exact village or neighborhood.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('providers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#5865F2] hover:text-[#4752c4] transition group"
          >
            <span>Browse All Providers ({approvedList.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Dynamic Providers Grid */}
        {approvedList.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 border border-gray-200 text-center max-w-xl mx-auto shadow-sm">
            <ShieldCheck className="w-12 h-12 text-[#18B88A] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[#111A4A]">No Approved Providers Yet</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              When providers submit their registration and are approved by Admin Omar Draz Gill in the Admin Panel, their dynamic profile will appear here live from Firestore.
            </p>
            <button
              onClick={() => {
                setActiveTab('register-provider');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-xl bg-[#5865F2] text-white text-xs font-bold shadow-md hover:bg-[#4752c4] transition"
            >
              Become the First Service Provider →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {approvedList.slice(0, 8).map((provider) => {
              const isSaved = savedProviderIds.includes(provider.id);

              return (
                <div
                  key={provider.id}
                  className="group rounded-2xl bg-white border border-gray-100/90 hover:border-[#5865F2]/40 shadow-sm card-hover flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    
                    {/* Card Image Banner */}
                    <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                      <img
                        src={provider.profileImage}
                        alt={provider.businessName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay for Text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111A4A]/80 via-transparent to-black/20" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProvider(provider.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 transition shadow-sm"
                        title={isSaved ? 'Remove from saved' : 'Save provider'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {/* Verified Badge */}
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-[#18B88A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>

                      {/* Category pill on image */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                        <span className="bg-[#111A4A]/90 px-2 py-0.5 rounded-md font-medium text-[11px] backdrop-blur-sm truncate max-w-[130px]">
                          {provider.categoryName}
                        </span>
                        <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                          <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                          <span className="font-bold text-[11px]">{provider.rating ? provider.rating.toFixed(1) : '5.0'}</span>
                          <span className="text-[10px] text-gray-300">({provider.reviewCount || 0})</span>
                        </div>
                      </div>

                    </div>

                    {/* Card Content Area */}
                    <div className="p-4 sm:p-5">
                      
                      <h3 
                        onClick={() => openProviderProfile(provider)}
                        className="font-heading font-bold text-base text-[#111A4A] hover:text-[#5865F2] cursor-pointer transition-colors leading-tight line-clamp-1"
                      >
                        {provider.businessName}
                      </h3>

                      {/* Location & Tehsil */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 mb-2.5">
                        <MapPin className="w-3.5 h-3.5 text-[#5865F2] flex-shrink-0" />
                        <span className="font-medium text-gray-700 truncate">{provider.primaryLocation}</span>
                        <span>·</span>
                        <span className="text-gray-400">{provider.tehsil}</span>
                      </div>

                      {/* Multiple Service Areas */}
                      {provider.serviceAreas && provider.serviceAreas.length > 0 && (
                        <div className="mb-3">
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                            Service Areas ({provider.serviceAreas.length}):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {provider.serviceAreas.slice(0, 3).map((area, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F0EEFF] text-[#111A4A] font-medium"
                              >
                                {area}
                              </span>
                            ))}
                            {provider.serviceAreas.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium">
                                +{provider.serviceAreas.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Starting Price */}
                      <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-400">Starting from:</span>
                        <span className="font-bold text-[#111A4A]">
                          Rs. {provider.startingPrice} <span className="font-normal text-gray-500">/{provider.priceUnit}</span>
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Card Bottom CTA Buttons */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openProviderProfile(provider)}
                      className="w-full py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#111A4A] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => startChatWithProvider(provider)}
                      className="w-full py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-[#5865F2]/20 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
