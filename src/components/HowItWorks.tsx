import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  UserCheck, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { setActiveTab, language } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Describe Your Need',
      titleUrdu: 'ضرورت بتائیں',
      desc: 'Tell us what service you need and whether you are in Pakpattan, Arifwala, or a nearby village.',
      descUrdu: 'اپنا مطلوبہ کام، تاریخ اور اپنے گاؤں یا محلے کا انتخاب کریں۔',
      icon: <FileText className="w-6 h-6 text-[#18B88A]" />,
      action: 'post-task',
      btnText: 'Post a Task'
    },
    {
      num: '02',
      title: 'Choose a Provider',
      titleUrdu: 'کاریگر کا انتخاب',
      desc: 'Browse verified profiles, customer ratings, genuine work samples, and covered service areas.',
      descUrdu: 'مصدقہ پروفائلز، سٹار ریٹنگ اور کاریگر کے تجربے کا موازنہ کریں۔',
      icon: <UserCheck className="w-6 h-6 text-[#5865F2]" />,
      action: 'providers',
      btnText: 'Browse Pros'
    },
    {
      num: '03',
      title: 'Chat & Confirm',
      titleUrdu: 'براہ راست بات چیت',
      desc: 'Communicate directly through the built-in website chat without exposing your personal phone number.',
      descUrdu: 'پلیٹ فارم کی محفوظ چیٹ کے ذریعے وقت اور معاوضہ طے کریں۔',
      icon: <MessageSquare className="w-6 h-6 text-[#F5A623]" />,
      action: 'chat',
      btnText: 'Open Chat'
    },
    {
      num: '04',
      title: 'Get the Job Done',
      titleUrdu: 'کام مکمل کروائیں',
      desc: 'Connect with the provider at your doorstep or farm, inspect the work, and leave a genuine community review.',
      descUrdu: 'گھر پر کام مکمل کروائیں اور کمیونٹی کے فائدے کے لیے ریویو دیں۔',
      icon: <CheckCircle2 className="w-6 h-6 text-[#111A4A]" />,
      action: 'services',
      btnText: 'Get Started'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#E2FFF5] relative overflow-hidden border-y border-[#18B88A]/20">
      
      {/* Decorative background circles */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#18B88A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#5865F2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#18B88A]/30 text-xs font-bold text-[#18B88A] tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            How PakPattan Services Hub Works
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-700">
            {language === 'ur'
              ? 'صحیح کاریگر کی تلاش اب انتہائی آسان اور محفوظ ہے۔'
              : 'Finding the right service professional is simple, fast, and secure.'}
          </p>
        </div>

        {/* Steps Grid with Connector Lines */}
        <div className="relative">
          
          {/* Desktop Dotted Connector Line */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#18B88A]/40 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div 
                key={step.num}
                className="relative bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Row: Circular Icon Container + Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#E2FFF5] group-hover:bg-[#d0fced] flex items-center justify-center transition-colors shadow-inner">
                      {step.icon}
                    </div>

                    <span className="font-heading text-2xl font-extrabold text-[#111A4A]/25 group-hover:text-[#18B88A] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-[#111A4A] mb-1 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-urdu text-xs text-[#18B88A] font-semibold mb-2">
                    {step.titleUrdu}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                </div>

                {/* Step Action Button */}
                <button
                  onClick={() => {
                    setActiveTab(step.action as any);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-50 group-hover:bg-[#111A4A] text-xs font-semibold text-gray-700 group-hover:text-white transition-colors"
                >
                  <span>{step.btnText}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
