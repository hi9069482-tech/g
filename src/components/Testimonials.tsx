import React from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18B88A] tracking-wider uppercase mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Real Local Feedback</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            What Our Customers Say
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {language === 'ur'
              ? 'پاکپتن اور عارف والا کے شہریوں اور کسانوں کے حقیقی تاثرات۔'
              : 'Real stories from residents and farmers across Pakpattan and Arifwala.'}
          </p>
        </div>

        {/* Testimonials Grid (Section 26) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#F7F8FC] p-6 sm:p-7 border border-gray-100 flex flex-col justify-between card-hover"
            >
              <div>
                
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-300" />
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>

              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#111A4A] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#111A4A]">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#5865F2]" />
                    <span>{item.village}</span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#18B88A] bg-[#E2FFF5] px-2 py-0.5 rounded">
                    Service: {item.serviceTaken}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
