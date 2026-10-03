import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  PlusCircle, 
  CheckCircle, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  MapPin,
  ShieldCheck
} from 'lucide-react';

export const CustomerCTA: React.FC = () => {
  const { setActiveTab, language } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-[#111A4A] via-[#1c296d] to-[#111A4A] p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl">
          
          {/* Subtle Decorative Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#5865F2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-10 w-80 h-80 bg-[#18B88A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#18B88A] mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>For Homeowners, Businesses & Farmers</span>
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Need a Service? Find the Right Professional Today.
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
              {language === 'ur'
                ? 'اپنے قریبی کاریگر تلاش کریں، سروسز اور ریٹس کا موازنہ کریں، اور چند لمحوں میں اپنا کام مکمل کروائیں۔'
                : 'Search local verified providers, compare labor rates, and connect with professionals across Pakpattan, Arifwala, and surrounding villages.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('providers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-xs sm:text-sm font-bold text-white shadow-lg transition active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Find a Service</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('post-task');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#e09419] text-xs sm:text-sm font-bold text-[#111A4A] shadow-lg transition active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Task</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export const ProviderCTA: React.FC = () => {
  const { setActiveTab, setUserRole, language } = useApp();

  const benefits = [
    'Create your professional business profile',
    'Select multiple village service areas',
    'Receive direct customer inquiries in real-time',
    'Chat securely with zero public phone spam',
    'Promote your skills across Pakpattan & Arifwala',
    'Keep 100% of your earnings with zero commission'
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F8FC] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Join As A Service Partner</span>
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight mb-4">
              Are You a Service Professional?
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Join <strong className="text-[#111A4A]">PakPattan Services Hub</strong> and showcase your trade or workshop to thousands of customers looking for plumbers, electricians, technicians, mechanics, and painters in Pakpattan, Arifwala, and rural chaks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#18B88A] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('register-provider');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18B88A] hover:bg-[#149d75] text-xs sm:text-sm font-bold text-white shadow-md transition active:scale-95"
              >
                <span>Become a Service Provider</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#5865F2] text-xs sm:text-sm font-semibold text-gray-700 transition"
              >
                <span>View Membership Rates</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-7 border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-[#111A4A] mb-2">
                Expand Across Rural & Urban Markets
              </h3>
              
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Farmers in surrounding chaks (like Chak 19/SP, Chak 23/EB, Malka Hans) are searching daily for tubewell motor repairs, solar inverter balancing, and tractor maintenance.
              </p>

              <div className="p-4 rounded-2xl bg-[#F0EEFF] border border-[#5865F2]/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#111A4A]">Daily Inquiries</p>
                  <p className="text-xl font-extrabold text-[#5865F2] mt-0.5">250+ Jobs</p>
                </div>
                <span className="text-[11px] font-semibold bg-white text-[#5865F2] px-2.5 py-1 rounded-lg shadow-2xs">
                  Active in District
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
