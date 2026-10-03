import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Paintbrush, 
  Wind, 
  Smartphone, 
  Car, 
  Sparkles, 
  Building, 
  HardHat, 
  Scissors, 
  UtensilsCrossed, 
  Package, 
  Truck, 
  CalendarCheck, 
  GraduationCap, 
  ArrowRight,
  Search,
  Layers
} from 'lucide-react';
import { Category } from '../types';

export const ServicesDirectory: React.FC = () => {
  const { categories, executeSearch, language } = useApp();
  const [searchFilter, setSearchFilter] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#5865F2]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#F5A623]" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-[#5865F2]" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6 text-[#18B88A]" />;
      case 'Wind': return <Wind className="w-6 h-6 text-[#5865F2]" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-[#5865F2]" />;
      case 'Car': return <Car className="w-6 h-6 text-[#5865F2]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#18B88A]" />;
      case 'Building': return <Building className="w-6 h-6 text-[#111A4A]" />;
      case 'HardHat': return <HardHat className="w-6 h-6 text-[#F5A623]" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-[#5865F2]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-[#F5A623]" />;
      case 'Package': return <Package className="w-6 h-6 text-[#18B88A]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#5865F2]" />;
      case 'CalendarCheck': return <CalendarCheck className="w-6 h-6 text-[#5865F2]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#18B88A]" />;
      default: return <Wrench className="w-6 h-6 text-[#5865F2]" />;
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.nameUrdu.includes(searchFilter) ||
    c.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Marketplace Catalog</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            All Service Categories
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            {language === 'ur'
              ? 'پاکپتن اور عارف والا میں روزمرہ زندگی کے تمام کاموں کے لیے سروسز کی مکمل فہرست۔'
              : 'Explore all 16 service categories connecting you with verified technicians and businesses across Pakpattan & Arifwala.'}
          </p>

          {/* Search Category */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search category (e.g. Electrician, Car, AC)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5865F2] shadow-sm"
            />
          </div>
        </div>

        {/* Categories Full Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => executeSearch('', cat.id)}
              className="group cursor-pointer rounded-3xl bg-white p-6 border border-gray-100 hover:border-[#5865F2]/40 shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F7F6FF] group-hover:bg-[#F0EEFF] flex items-center justify-center mb-4 transition-colors">
                  {getIcon(cat.iconName)}
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-heading font-bold text-base text-[#111A4A] group-hover:text-[#5865F2] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="font-urdu text-xs font-bold text-[#18B88A]">
                    {cat.nameUrdu}
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">
                  {cat.providerCount} Providers Active
                </span>
                <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-[#5865F2] text-gray-400 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
