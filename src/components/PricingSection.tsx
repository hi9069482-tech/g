import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';
import { Check, ShieldCheck, Zap, Star } from 'lucide-react';
import { SubscriptionPlan } from '../types';

export const PricingSection: React.FC = () => {
  const { showToast, setUserRole, setActiveTab, language } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    showToast(`Subscribed to ${plan.name}! Provider listing activated.`);
    setUserRole('provider');
    setActiveTab('provider-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FC] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A623] tracking-wider uppercase mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Provider Memberships</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
            Grow Your Local Service Business
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {language === 'ur'
              ? 'اپنے ہنر کو پورے پاکپتن اور عارف والا میں متعارف کروائیں اور روزانہ نئے گاہک حاصل کریں۔'
              : 'Affordable, transparent subscription plans for independent technicians and local workshops.'}
          </p>
        </div>

        {/* Pricing Cards Grid (Section 14) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.badge === 'Popular';
            const isBestValue = plan.badge === 'Best Value';

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-[#5865F2] shadow-xl shadow-[#5865F2]/10 lg:-translate-y-2'
                    : 'border border-gray-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Badge if present */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm ${
                      isPopular ? 'bg-[#5865F2]' : 'bg-[#18B88A]'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl font-bold text-[#111A4A]">
                      {plan.name}
                    </h3>
                    <span className="font-urdu text-xs text-[#18B88A] font-bold">
                      {plan.nameUrdu}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-400">Rs.</span>
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111A4A]">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">/{plan.interval}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Included in this plan:
                    </p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                    isPopular
                      ? 'bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-md shadow-[#5865F2]/25'
                      : 'bg-gray-50 hover:bg-[#111A4A] text-gray-800 hover:text-white border border-gray-200'
                  }`}
                >
                  <span>Select {plan.name}</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Provider Guarantee Footnote */}
        <div className="mt-12 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-[#18B88A]" />
          <span>No commission on customer earnings. Keep 100% of what you earn directly.</span>
        </div>

      </div>
    </section>
  );
};
