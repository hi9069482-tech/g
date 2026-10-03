import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES, VILLAGES } from '../data/mockData';
import { Provider } from '../types';

export const PostTaskPage: React.FC = () => {
  const { addTask, providers, openProviderProfile, startChatWithProvider, language } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [category, setCategory] = useState('plumber');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('2000');
  const [village, setVillage] = useState('Pakpattan City (Urban)');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 1 PM)');
  const [submitted, setSubmitted] = useState(false);
  const [matchingProviders, setMatchingProviders] = useState<Provider[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !customerName.trim()) {
      return;
    }

    addTask({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || '+92 300 0000000',
      category,
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget) || 1500,
      location: village,
      village,
      preferredDate,
      preferredTime,
      status: 'pending'
    });

    // Find matching local providers for instant suggestions
    const matches = providers.filter(p => p.category === category).slice(0, 3);
    setMatchingProviders(matches);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!submitted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
            
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EEFF] text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Fast & Free Service Request</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
                Tell Us What Service You Need
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                {language === 'ur'
                  ? 'اپنا کام درج کریں تاکہ پاکپتن اور عارف والا کے تصدیق شدہ کاریگر آپ کو مناسب کوٹیشن دے سکیں۔'
                  : 'Post your requirement in under 2 minutes. Local verified technicians will review and contact you.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] focus:bg-white"
                  />
                </div>
              </div>

              {/* Service Category & Task Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Service Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.nameUrdu})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Short Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Inverter AC not cooling / Water tank leakage"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] focus:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue, required parts, floor level, or tractor/appliance model..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] focus:bg-white"
                />
              </div>

              {/* Location / Village Selector & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Exact Village / Area *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#5865F2] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] cursor-pointer"
                    >
                      <optgroup label="Pakpattan Tehsil">
                        {VILLAGES.filter(v => v.tehsil === 'Pakpattan').map(v => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Arifwala Tehsil">
                        {VILLAGES.filter(v => v.tehsil === 'Arifwala').map(v => (
                          <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Estimated Budget (PKR)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 2000"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] focus:bg-white"
                  />
                </div>
              </div>

              {/* Date & Time Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      placeholder="e.g. Today / Tomorrow / Friday"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111A4A] mb-1.5">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#5865F2] cursor-pointer"
                    >
                      <option value="Emergency (Immediate)">Emergency (Immediate)</option>
                      <option value="Morning (9 AM - 1 PM)">Morning (9 AM - 1 PM)</option>
                      <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F5A623] hover:bg-[#e09419] text-[#111A4A] font-bold text-sm sm:text-base shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5 text-[#111A4A]" />
                  <span>Post My Task to Pakpattan Hub</span>
                </button>
              </div>

            </form>

          </div>
        ) : (
          /* Confirmation & Immediate Matching Providers Suggestion */
          <div className="space-y-8 animate-in fade-in">
            
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111A4A] mb-2">
                Task Successfully Broadcasted!
              </h2>

              <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                Your request has been published. Local verified professionals serving <strong>{village}</strong> have received notification.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Post Another Task
              </button>
            </div>

            {/* Suggested Matching Providers */}
            {matchingProviders.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-[#111A4A] mb-1">
                  Recommended Verified Providers For Your Task
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  You don't have to wait! You can start a direct chat with these top rated technicians right now:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {matchingProviders.map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={p.profileImage}
                            alt={p.businessName}
                            className="w-12 h-12 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-heading font-bold text-xs text-[#111A4A] line-clamp-1">{p.businessName}</h4>
                            <div className="flex items-center gap-1 text-[11px] text-[#F5A623]">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="font-bold text-gray-800">{p.rating}</span>
                              <span className="text-gray-400">({p.reviewCount})</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-gray-600 space-y-1 mb-4">
                          <p>📍 {p.primaryLocation}</p>
                          <p>💵 Starting: Rs. {p.startingPrice}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60">
                        <button
                          onClick={() => openProviderProfile(p)}
                          className="py-1.5 px-2 rounded-lg bg-white border border-gray-200 text-[11px] font-semibold text-gray-700"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => startChatWithProvider(p)}
                          className="py-1.5 px-2 rounded-lg bg-[#5865F2] text-white text-[11px] font-bold shadow-sm"
                        >
                          Chat Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
