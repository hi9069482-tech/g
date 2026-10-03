import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Layers, 
  Award, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { language } = useApp();

  const features = [
    {
      title: 'Verified Local Providers',
      titleUrdu: 'مصدقہ کاریگر',
      desc: 'Technicians are verified through identity checks, workshop registration, and real work history.',
      icon: <ShieldCheck className="w-6 h-6 text-[#18B88A]" />
    },
    {
      title: 'Exact Village Coverage',
      titleUrdu: 'دیہات تک رسائی',
      desc: 'Filter providers by your exact chak or union council so you never wait for long-distance transport.',
      icon: <MapPin className="w-6 h-6 text-[#5865F2]" />
    },
    {
      title: 'Built-in Safe Chat',
      titleUrdu: 'محفوظ آن لائن چیٹ',
      desc: 'Discuss pricing, timing, and share images before giving away personal contact numbers.',
      icon: <MessageSquare className="w-6 h-6 text-[#F5A623]" />
    },
    {
      title: '16+ Daily Categories',
      titleUrdu: 'تمام سروسز ایک جگہ',
      desc: 'From solar inverter specialists and master plumbers to tractor mechanics and event caterers.',
      icon: <Layers className="w-6 h-6 text-[#111A4A]" />
    },
    {
      title: 'Transparent Pricing & Reviews',
      titleUrdu: 'شفاف ریٹس اور ریویوز',
      desc: 'See genuine starting rates, breakdown of labor charges, and authentic customer feedback.',
      icon: <Award className="w-6 h-6 text-[#18B88A]" />
    },
    {
      title: 'Fast Local Discovery',
      titleUrdu: 'فوری رسائی',
      desc: 'Get emergency services for burst pipes or power breaker trips within 30 to 45 minutes.',
      icon: <Zap className="w-6 h-6 text-[#5865F2]" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] tracking-wider uppercase mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Community Trust</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            Why Choose PakPattan Services Hub?
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {language === 'ur'
              ? 'ہم مقامی صارفین اور ہنر مند کاریگروں کے درمیان اعتماد کا مضبوط پل بناتے ہیں۔'
              : 'Designed from the ground up for the specific needs of Pakpattan and Arifwala communities.'}
          </p>
        </div>

        {/* Feature Cards Grid (Section 11) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#5865F2]/40 shadow-sm card-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F8FC] group-hover:bg-[#F0EEFF] flex items-center justify-center mb-4 transition-colors">
                {feat.icon}
              </div>

              <h3 className="font-heading font-bold text-base sm:text-lg text-[#111A4A] mb-1">
                {feat.title}
              </h3>

              <p className="font-urdu text-xs text-[#18B88A] font-semibold mb-2">
                {feat.titleUrdu}
              </p>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
