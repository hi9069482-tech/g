import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Check, 
  Compass, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Tehsil } from '../types';

export const LocationCoverage: React.FC = () => {
  const { villages, executeSearch, language } = useApp();
  const [selectedTehsil, setSelectedTehsil] = useState<'all' | Tehsil>('all');
  const [searchVillage, setSearchVillage] = useState('');

  const filteredVillages = villages.filter(v => {
    const matchesTehsil = selectedTehsil === 'all' || v.tehsil === selectedTehsil;
    const matchesSearch = v.name.toLowerCase().includes(searchVillage.toLowerCase()) || 
                          v.nameUrdu.includes(searchVillage);
    return matchesTehsil && matchesSearch;
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] tracking-wider uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Hyperlocal Geographic Network</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            Services Available Across Pakpattan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {language === 'ur'
              ? 'ضلع پاکپتن، تحصیل عارف والا اور ملحقہ تمام چکوک اور دیہات میں خدمات دستیاب ہیں۔'
              : 'Find skilled professionals near your village, town, union council, or rural chaks with zero hassle.'}
          </p>
        </div>

        {/* Interactive Layout: Map Visual on Left/Top, Village Selector & Filter on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Custom Styled Map & Coverage Infographic (lg: col 7) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#111A4A] via-[#1a2569] to-[#111A4A] p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#5865F2]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              
              {/* Map Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-[#18B88A] uppercase tracking-wider">
                    Punjab District Pakpattan
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-0.5">
                    District Geographic Coverage
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/90 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#18B88A] animate-pulse" />
                  <span>380+ Active Verified Pros</span>
                </div>
              </div>

              {/* Styled Interactive Geographic Visual */}
              <div className="my-8 relative h-64 sm:h-72 rounded-2xl bg-[#0b1130] border border-white/10 p-4 overflow-hidden flex items-center justify-center">
                
                {/* Visual Connection Lines between Hubs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <line x1="30%" y1="40%" x2="70%" y2="60%" stroke="#5865F2" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="30%" y1="40%" x2="45%" y2="25%" stroke="#18B88A" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="30%" y1="40%" x2="20%" y2="70%" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70%" y1="60%" x2="85%" y2="75%" stroke="#5865F2" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="70%" y1="60%" x2="60%" y2="85%" stroke="#18B88A" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {/* Main Node 1: Pakpattan City */}
                <div 
                  onClick={() => executeSearch('', '', 'Pakpattan City (Urban)')}
                  className="absolute left-[26%] top-[34%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-[#5865F2]/40 animate-ping opacity-75" />
                    <div className="w-10 h-10 rounded-full bg-[#5865F2] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-1.5 bg-[#111A4A]/95 px-2.5 py-1 rounded-lg border border-white/20 text-center shadow-md whitespace-nowrap">
                    <p className="text-xs font-bold text-white">Pakpattan City</p>
                    <p className="text-[10px] text-gray-300">140+ Providers</p>
                  </div>
                </div>

                {/* Main Node 2: Arifwala City */}
                <div 
                  onClick={() => executeSearch('', '', 'Arifwala City (Urban)')}
                  className="absolute left-[70%] top-[58%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-[#18B88A]/40 animate-ping opacity-75" />
                    <div className="w-10 h-10 rounded-full bg-[#18B88A] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-1.5 bg-[#111A4A]/95 px-2.5 py-1 rounded-lg border border-white/20 text-center shadow-md whitespace-nowrap">
                    <p className="text-xs font-bold text-white">Arifwala City</p>
                    <p className="text-[10px] text-gray-300">118+ Providers</p>
                  </div>
                </div>

                {/* Sub Node: Malka Hans */}
                <div 
                  onClick={() => executeSearch('', '', 'Malka Hans')}
                  className="absolute left-[45%] top-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F5A623] border border-white flex items-center justify-center shadow group-hover:scale-110 transition">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-200 mt-1 block text-center whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
                    Malka Hans
                  </span>
                </div>

                {/* Sub Node: Chak 19/SP */}
                <div 
                  onClick={() => executeSearch('', '', 'Chak 19/SP')}
                  className="absolute left-[18%] top-[68%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/80 border border-[#5865F2] flex items-center justify-center shadow group-hover:scale-110 transition">
                    <div className="w-2 h-2 rounded-full bg-[#5865F2]" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-200 mt-1 block text-center whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
                    Chak 19/SP
                  </span>
                </div>

                {/* Sub Node: Chak 23/EB */}
                <div 
                  onClick={() => executeSearch('', '', 'Chak 23/EB')}
                  className="absolute left-[85%] top-[72%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/80 border border-[#18B88A] flex items-center justify-center shadow group-hover:scale-110 transition">
                    <div className="w-2 h-2 rounded-full bg-[#18B88A]" />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-200 mt-1 block text-center whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
                    Chak 23/EB
                  </span>
                </div>

                {/* Sub Node: Qaboola */}
                <div 
                  onClick={() => executeSearch('', '', 'Qaboola')}
                  className="absolute left-[60%] top-[82%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#18B88A]/80 border border-white flex items-center justify-center group-hover:scale-110 transition">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <span className="text-[9px] font-semibold text-gray-300 mt-0.5 block text-center whitespace-nowrap bg-black/60 px-1 py-0.5 rounded">
                    Qaboola
                  </span>
                </div>

              </div>

              {/* Coverage Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-extrabold text-[#18B88A]">2</p>
                  <p className="text-[11px] text-gray-300 font-medium">Tehsils (Full)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-extrabold text-[#F5A623]">60+</p>
                  <p className="text-[11px] text-gray-300 font-medium">Union Councils</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-extrabold text-[#5865F2]">100+</p>
                  <p className="text-[11px] text-gray-300 font-medium">Rural Chaks & Villages</p>
                </div>
              </div>

            </div>

          </div>

          {/* Location Selector & Village Cloud (lg: col 5) */}
          <div className="lg:col-span-5 bg-[#F7F8FC] rounded-3xl p-6 border border-gray-100">
            
            <h3 className="font-heading text-lg font-bold text-[#111A4A] mb-1">
              Select Your Area or Village
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Click any village to find local technicians who specifically travel to that area.
            </p>

            {/* Tehsil Tabs: All | Pakpattan | Arifwala */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-200/60 mb-4">
              <button
                onClick={() => setSelectedTehsil('all')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedTehsil === 'all'
                    ? 'bg-white text-[#111A4A] shadow-sm'
                    : 'text-gray-600 hover:text-[#111A4A]'
                }`}
              >
                All Areas
              </button>
              <button
                onClick={() => setSelectedTehsil('Pakpattan')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedTehsil === 'Pakpattan'
                    ? 'bg-white text-[#5865F2] shadow-sm'
                    : 'text-gray-600 hover:text-[#111A4A]'
                }`}
              >
                Pakpattan Tehsil
              </button>
              <button
                onClick={() => setSelectedTehsil('Arifwala')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedTehsil === 'Arifwala'
                    ? 'bg-white text-[#18B88A] shadow-sm'
                    : 'text-gray-600 hover:text-[#111A4A]'
                }`}
              >
                Arifwala Tehsil
              </button>
            </div>

            {/* Search Village Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchVillage}
                onChange={(e) => setSearchVillage(e.target.value)}
                placeholder="Search village (e.g. Chak 19/SP, Qaboola)"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5865F2]"
              />
            </div>

            {/* Village List Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto pr-1">
              {filteredVillages.map((v) => (
                <button
                  key={v.id}
                  onClick={() => executeSearch('', '', v.name)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#5865F2] text-xs font-medium text-gray-700 hover:text-white border border-gray-200/80 hover:border-[#5865F2] transition shadow-2xs"
                >
                  <MapPin className="w-3 h-3 text-[#5865F2] group-hover:text-white" />
                  <span>{v.name}</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-white/80 font-normal">
                    ({v.providerCount})
                  </span>
                </button>
              ))}
            </div>

            {/* Multiple service areas note */}
            <div className="mt-5 p-3 rounded-xl bg-[#E2FFF5] border border-[#18B88A]/30 flex items-start gap-2 text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-[#18B88A] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#111A4A]">Multi-Village Coverage Guarantee</p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Providers on our platform register multiple service chaks and carry transport to serve you right at your doorstep or farmland.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
