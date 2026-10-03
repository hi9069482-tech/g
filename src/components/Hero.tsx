import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  ShieldCheck, 
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { HERO_IMAGES, CATEGORIES, VILLAGES } from '../data/mockData';
import { Provider } from '../types';

export const Hero: React.FC = () => {
  const { 
    language, 
    executeSearch, 
    showToast, 
    openProviderProfile,
    providers,
    setActiveTab
  } = useApp();

  const [keyword, setKeyword] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Dynamic approved providers fetched from Firebase Firestore where status == "approved"
  const approvedProviders = providers.filter(p => 
    (p.status === 'approved' || p.applicationStatus === 'approved') && p.isPublic !== false
  );

  // Floating cards dynamic slot assignment
  const card1: Provider | null = approvedProviders[0] || null;
  const card2: Provider | null = approvedProviders[1] || null;
  const card3: Provider | null = approvedProviders[2] || null;
  const card4: Provider | null = approvedProviders[3] || null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(keyword, selectedCat, selectedVillage);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    showToast('Detecting location in Pakpattan / Arifwala district...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const latitude = position.coords.latitude;
        if (latitude < 30.31) {
          setSelectedVillage('Arifwala City (Urban)');
          showToast('Location matched: Arifwala Tehsil & surrounding chaks');
        } else {
          setSelectedVillage('Pakpattan City (Urban)');
          showToast('Location matched: Pakpattan Tehsil & nearby villages');
        }
      },
      (error) => {
        setIsLocating(false);
        setSelectedVillage('Pakpattan City (Urban)');
        showToast('Defaulted to Pakpattan District Center (Urban & Rural)');
      },
      { timeout: 8000 }
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F6FF] via-[#F0EEFF]/60 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-100/60">
      
      {/* Subtle Background Decorative Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-r from-[#5865F2]/10 via-[#18B88A]/8 to-[#F5A623]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-[#5865F2]/10 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#18B88A]/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Floating Cards (Replaces static cards with real data from Firebase) */}
        <div className="relative">
          
          {/* Floating Card Left: Dynamic Slot 1 */}
          <div 
            onClick={() => {
              if (card1) openProviderProfile(card1);
              else executeSearch('', 'plumber');
            }}
            className="hidden xl:block absolute left-0 top-6 w-52 rounded-2xl bg-white p-2.5 shadow-xl shadow-[#111A4A]/8 border border-gray-100/90 -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
          >
            <div className="relative h-32 rounded-xl overflow-hidden mb-2 bg-gray-100">
              <img 
                src={card1 ? card1.profileImage : HERO_IMAGES[0].image} 
                alt={card1 ? card1.businessName : 'Plumber Pakpattan'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 bg-[#111A4A]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[170px]">
                {card1 ? `${card1.categoryName} · ${card1.primaryLocation}` : 'Plumber · Pakpattan'}
              </span>
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="truncate pr-1">
                <p className="text-xs font-bold text-[#111A4A] truncate">
                  {card1 ? card1.businessName : 'Verified Plumber'}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                  <span className="font-semibold text-gray-800">{card1 ? card1.rating.toFixed(1) : '4.9'}</span>
                  <span>({card1 ? `${card1.reviewCount || 10}+ reviews` : 'Verified'})</span>
                </div>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center text-xs flex-shrink-0">
                ✓
              </span>
            </div>
          </div>

          {/* Floating Card Left Lower: Dynamic Slot 2 */}
          <div 
            onClick={() => {
              if (card2) openProviderProfile(card2);
              else executeSearch('', 'ac-refrigerator');
            }}
            className="hidden xl:block absolute left-8 bottom-[-40px] w-48 rounded-2xl bg-white p-2.5 shadow-lg shadow-[#111A4A]/7 border border-gray-100/80 rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
          >
            <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-gray-100">
              <img 
                src={card2 ? card2.profileImage : HERO_IMAGES[2].image} 
                alt={card2 ? card2.businessName : 'AC Technician Arifwala'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 bg-[#5865F2]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[150px]">
                {card2 ? `${card2.categoryName} · ${card2.primaryLocation}` : 'AC Expert · Arifwala'}
              </span>
            </div>
            <p className="text-xs font-bold text-[#111A4A] px-1 truncate">
              {card2 ? card2.businessName : 'Certified Technician'}
            </p>
            <p className="text-[10px] text-[#18B88A] font-semibold px-1">Verified Provider</p>
          </div>

          {/* Floating Card Right: Dynamic Slot 3 */}
          <div 
            onClick={() => {
              if (card3) openProviderProfile(card3);
              else executeSearch('', 'electrician');
            }}
            className="hidden xl:block absolute right-0 top-4 w-52 rounded-2xl bg-white p-2.5 shadow-xl shadow-[#111A4A]/8 border border-gray-100/90 rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
          >
            <div className="relative h-32 rounded-xl overflow-hidden mb-2 bg-gray-100">
              <img 
                src={card3 ? card3.profileImage : HERO_IMAGES[1].image} 
                alt={card3 ? card3.businessName : 'Electrician Pakpattan'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 bg-[#111A4A]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[170px]">
                {card3 ? `${card3.categoryName} · ${card3.primaryLocation}` : 'Solar & Electric'}
              </span>
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="truncate pr-1">
                <p className="text-xs font-bold text-[#111A4A] truncate">
                  {card3 ? card3.businessName : 'Expert Electrician'}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                  <span className="font-semibold text-gray-800">{card3 ? card3.rating.toFixed(1) : '4.9'}</span>
                  <span>({card3 ? `${card3.reviewCount || 15}+ reviews` : 'Verified'})</span>
                </div>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#F0EEFF] text-[#5865F2] flex items-center justify-center text-xs font-bold flex-shrink-0">
                ⚡
              </span>
            </div>
          </div>

          {/* Floating Card Right Lower: Dynamic Slot 4 */}
          <div 
            onClick={() => {
              if (card4) openProviderProfile(card4);
              else executeSearch('', 'carpenter');
            }}
            className="hidden xl:block absolute right-8 bottom-[-36px] w-48 rounded-2xl bg-white p-2.5 shadow-lg shadow-[#111A4A]/7 border border-gray-100/80 -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
          >
            <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-gray-100">
              <img 
                src={card4 ? card4.profileImage : HERO_IMAGES[3].image} 
                alt={card4 ? card4.businessName : 'Carpenter Pakpattan'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 bg-[#18B88A]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm truncate max-w-[150px]">
                {card4 ? `${card4.categoryName} · ${card4.primaryLocation}` : 'Carpenter · Pakpattan'}
              </span>
            </div>
            <p className="text-xs font-bold text-[#111A4A] px-1 truncate">
              {card4 ? card4.businessName : 'Verified Carpenter'}
            </p>
            <p className="text-[10px] text-gray-500 px-1">
              {card4 ? card4.primaryLocation : 'Pakpattan & Arifwala'}
            </p>
          </div>

          {/* Central Hero Column */}
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#5865F2]/25 shadow-sm text-xs font-semibold text-[#111A4A] mb-5">
              <span className="flex h-2 w-2 rounded-full bg-[#18B88A]" />
              <div className="flex items-center gap-1 text-[#F5A623]">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-gray-400">|</span>
              <span>
                {language === 'ur' 
                  ? 'پاکپتن و عارف والا کا سب سے قابلِ اعتماد لوکل سروس پلیٹ فارم' 
                  : 'Trusted Hyperlocal Marketplace in Pakpattan & Arifwala'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#111A4A] tracking-tight leading-[1.15] mb-4">
              Find <span className="text-[#5865F2]">Trusted Services</span> Near You
            </h1>

            {/* Urdu Tagline (Preserved exactly: پاکپتن کی ہر سروس، ایک جگہ) */}
            <div className="font-urdu text-xl sm:text-2xl font-bold text-[#111A4A]/90 mb-3 tracking-wide">
              “پاکپتن کی ہر سروس، ایک جگہ”
            </div>

            {/* Supporting English Phrase / Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10">
              Discover skilled professionals, local businesses, and reliable services in{' '}
              <strong className="text-gray-800 font-semibold">Pakpattan, Arifwala</strong>, and surrounding villages — all in one place.
            </p>

            {/* Mobile Service Images Collage */}
            <div className="xl:hidden flex items-center justify-center gap-2 mb-8 overflow-x-auto py-2 px-2 no-scrollbar">
              {approvedProviders.slice(0, 4).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => openProviderProfile(item)}
                  className="flex-shrink-0 w-24 sm:w-28 rounded-xl bg-white p-1.5 shadow-md border border-gray-100 text-left cursor-pointer"
                >
                  <img 
                    src={item.profileImage} 
                    alt={item.businessName} 
                    className="w-full h-16 sm:h-20 object-cover rounded-lg mb-1" 
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-[10px] font-bold text-[#111A4A] truncate">{item.businessName}</p>
                </div>
              ))}
              {approvedProviders.length === 0 && HERO_IMAGES.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => executeSearch('', item.category)}
                  className="flex-shrink-0 w-24 sm:w-28 rounded-xl bg-white p-1.5 shadow-md border border-gray-100 text-left cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-16 sm:h-20 object-cover rounded-lg mb-1" 
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-[10px] font-bold text-[#111A4A] truncate">{item.title}</p>
                </div>
              ))}
            </div>

            {/* Floating Search Container */}
            <div className="relative mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-[#111A4A]/10 border border-gray-200/80 p-3 sm:p-4 transition-all">
              <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-stretch gap-2.5">
                
                {/* 1. Keyword Input */}
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F7F8FC] border border-gray-100 focus-within:border-[#5865F2] focus-within:bg-white transition">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="What service do you need? (e.g. Plumber, Solar, AC)"
                    className="w-full text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                  />
                </div>

                {/* 2. Category Dropdown */}
                <div className="lg:w-48 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F7F8FC] border border-gray-100 focus-within:border-[#5865F2] focus-within:bg-white transition">
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full text-xs sm:text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(cat => {
                      const count = approvedProviders.filter(p => p.category === cat.id || p.categoryName?.toLowerCase() === cat.name.toLowerCase()).length;
                      return (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* 3. Village / Location Dropdown */}
                <div className="lg:w-56 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F7F8FC] border border-gray-100 focus-within:border-[#5865F2] focus-within:bg-white transition">
                  <MapPin className="w-4 h-4 text-[#5865F2] flex-shrink-0" />
                  <select
                    value={selectedVillage}
                    onChange={(e) => setSelectedVillage(e.target.value)}
                    className="w-full text-xs sm:text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">All Villages & Towns</option>
                    <optgroup label="Tehsil Pakpattan">
                      {VILLAGES.filter(v => v.tehsil === 'Pakpattan').map(v => (
                        <option key={v.id} value={v.name}>{v.name} ({v.nameUrdu})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Tehsil Arifwala">
                      {VILLAGES.filter(v => v.tehsil === 'Arifwala').map(v => (
                        <option key={v.id} value={v.name}>{v.name} ({v.nameUrdu})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* 4. GPS "Near Me" / Use My Location Button */}
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={isLocating}
                  title="Detect closest village or city"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#18B88A] hover:text-[#18B88A] hover:bg-[#E2FFF5]/40 transition whitespace-nowrap bg-white active:scale-95"
                >
                  <Crosshair className={`w-3.5 h-3.5 text-[#18B88A] ${isLocating ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Use My Location</span>
                  <span className="sm:hidden">Near Me</span>
                </button>

                {/* 5. Primary Search CTA Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5865F2]/25 transition-all whitespace-nowrap active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Services</span>
                </button>

              </form>

              {/* Quick Suggestion Pills */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Popular right now:</span>
                {['Plumber', 'Electrician', 'Carpenter', 'AC & Refrigerator', 'Motor Mechanic'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setKeyword(item);
                      executeSearch(item);
                    }}
                    className="hover:text-[#5865F2] hover:underline transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Registration Fast Track on Homepage */}
            <div className="mt-5 p-3 rounded-2xl bg-white/90 border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-gray-700">
                <span className="w-6 h-6 rounded-full bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center font-bold">
                  ✓
                </span>
                <span>Are you a service technician, electrician, or shop owner in Pakpattan or Arifwala?</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register-provider');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-[#111A4A] hover:bg-[#1c296d] text-white font-bold transition shadow-xs whitespace-nowrap active:scale-95"
              >
                Become a Service Provider →
              </button>
            </div>

            {/* Micro Trust Indicators below search */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#18B88A]" />
                <span>Verified Local CNIC & Workshop Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5865F2]" />
                <span>Multiple Village Service Areas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>No Public Number Exposure Before Chat</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
