import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { Category } from '../types';

export const CategoryGrid: React.FC = () => {
  const { categories, executeSearch, setActiveTab, language, providers } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#111A4A] group-hover:text-[#F5A623] transition-colors" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-[#111A4A] group-hover:text-[#18B88A] transition-colors" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'Car': return <Car className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#111A4A] group-hover:text-[#18B88A] transition-colors" />;
      case 'Building': return <Building className="w-5 h-5 text-[#111A4A] group-hover:text-[#111A4A] transition-colors" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#111A4A] group-hover:text-[#F5A623] transition-colors" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-[#111A4A] group-hover:text-[#F5A623] transition-colors" />;
      case 'Package': return <Package className="w-5 h-5 text-[#111A4A] group-hover:text-[#18B88A] transition-colors" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-[#111A4A] group-hover:text-[#5865F2] transition-colors" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#111A4A] group-hover:text-[#18B88A] transition-colors" />;
      default: return <Wrench className="w-5 h-5 text-[#111A4A]" />;
    }
  };

  const handleCategoryClick = (cat: Category) => {
    executeSearch('', cat.id);
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5865F2]" />
              <span>Hyperlocal Directory</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
              Popular Services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              {language === 'ur'
                ? 'روزمرہ کی ضروریات کے لیے اپنے قریبی مصدقہ کاریگر اور ادارے تلاش کریں۔'
                : 'Find trusted professionals for everyday home and commercial needs.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#5865F2] hover:text-[#4752c4] transition group"
          >
            <span>View All 16 Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid (Section 7: 5 cols desktop, 3-4 tablet, 2 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {categories.slice(0, 10).map((cat) => {
            const approvedCount = providers.filter(p => 
              (p.status === 'approved' || p.applicationStatus === 'approved') &&
              (p.category === cat.id || p.categoryName?.toLowerCase() === cat.name.toLowerCase() || p.additionalCategories?.includes(cat.id))
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group cursor-pointer rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 hover:border-[#5865F2]/40 shadow-sm card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F7F6FF] group-hover:bg-[#F0EEFF] flex items-center justify-center mb-3 transition-colors">
                    {getIcon(cat.iconName)}
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#111A4A] group-hover:text-[#5865F2] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  
                  <p className="font-urdu text-[11px] text-gray-500 mt-0.5">
                    {cat.nameUrdu}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {approvedCount > 0 ? `${approvedCount} Verified` : `${cat.providerCount} in District`}
                  </span>
                  
                  <span className="w-6 h-6 rounded-full bg-gray-50 group-hover:bg-[#5865F2] text-gray-400 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white hover:border-[#5865F2] hover:text-[#5865F2] text-xs sm:text-sm font-bold text-[#111A4A] shadow-sm transition"
          >
            <span>Explore All Specialized Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
