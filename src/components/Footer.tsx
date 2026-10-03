import React from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  Search, 
  UserPlus, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ShieldCheck,
  Server
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setUserRole, setIsHostingerModalOpen, language } = useApp();

  const handleLink = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111A4A] text-white">
      
      {/* Section 27: Final CTA Before Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#1c296d] via-[#5865F2]/40 to-[#18B88A]/30 p-8 sm:p-12 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Your Local Service Search Starts Here
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed mb-8">
              Find professionals, discover local businesses, and get the help you need across Pakpattan, Arifwala, and surrounding villages — all from one trusted platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleLink('providers')}
                className="px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-xs sm:text-sm font-bold text-white shadow-lg transition active:scale-95"
              >
                Search Services
              </button>
              <button
                onClick={() => handleLink('register-provider')}
                className="px-6 py-3 rounded-xl bg-[#18B88A] hover:bg-[#149d75] text-xs sm:text-sm font-bold text-white shadow-lg transition active:scale-95"
              >
                Become a Service Provider
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer (Section 28) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center text-white">
                <svg className="w-6 h-6" viewBox="0 0 512 512" fill="none">
                  <path d="M256 70 C160 70 86 144 86 240 C86 330 200 415 242 443 C250 448 262 448 270 443 C312 415 426 330 426 240 C426 144 352 70 256 70 Z" fill="#FFFFFF" />
                  <path d="M256 140 L166 220 L196 220 L196 320 L316 320 L316 220 L346 220 Z" fill="#111A4A" />
                  <circle cx="256" cy="245" r="26" fill="#18B88A" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  PakPattan Services Hub
                </h3>
                <p className="font-urdu text-xs text-[#18B88A]">
                  “پاکپتن کی ہر سروس، ایک جگہ”
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-5">
              The premier hyperlocal multi-vendor marketplace connecting residents, homeowners, and agricultural landholders in Pakpattan and Arifwala with verified local service professionals.
            </p>

            {/* Official Administrator Contact Box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 max-w-sm mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#F5A623] uppercase tracking-wider">
                  Admin & Verification Office
                </span>
                <span className="text-[10px] bg-[#18B88A]/20 text-[#18B88A] px-2 py-0.5 rounded font-semibold">
                  Official Admin
                </span>
              </div>
              <p className="text-xs font-bold text-white mb-2">
                Admin: Omar Draz Gill
              </p>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#18B88A] flex-shrink-0" />
                  <a href="tel:03107217253" className="hover:text-white transition">
                    Contact: 03107217253
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#18B88A] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">W</span>
                  <a 
                    href="https://wa.me/923107217253" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white text-[#18B88A] font-semibold transition"
                  >
                    WhatsApp: 03107217253
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0" />
                  <a href="mailto:umarcome347@gmail.com" className="hover:text-white transition truncate">
                    Email: umarcome347@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5865F2] flex-shrink-0" />
                <span>Pakpattan & Arifwala, Punjab, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => handleLink('services')} className="hover:text-white transition">Services Directory</button>
              </li>
              <li>
                <button onClick={() => handleLink('providers')} className="hover:text-white transition">Browse Providers</button>
              </li>
              <li>
                <button onClick={() => handleLink('how-it-works')} className="hover:text-white transition">How It Works</button>
              </li>
              <li>
                <button onClick={() => handleLink('blog')} className="hover:text-white transition">Service Tips & Blog</button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-white transition">Contact & Support</button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Customers & Providers */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Portals & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button onClick={() => handleLink('register-provider')} className="hover:text-[#18B88A] transition font-bold text-[#18B88A]">
                  ★ Become a Service Provider
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('provider-login')} className="hover:text-white transition">
                  Provider Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('post-task')} className="hover:text-[#F5A623] transition font-semibold text-[#F5A623]">
                  Post a Task (Free)
                </button>
              </li>
              <li>
                <button onClick={() => { setUserRole('customer'); handleLink('user-dashboard'); }} className="hover:text-white transition">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { setUserRole('provider'); handleLink('provider-dashboard'); }} className="hover:text-white transition">
                  Provider Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pricing')} className="hover:text-white transition">
                  Provider Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => { setUserRole('admin'); handleLink('admin'); }} className="hover:text-white transition">
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Hostinger Deployment */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Hostinger & Trust
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Production-ready single page application architecture optimized for Hostinger Cloud & Shared Web Hosting.
            </p>
            <button
              onClick={() => setIsHostingerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition mb-3"
            >
              <Server className="w-3.5 h-3.5 text-[#5865F2]" />
              <span>Hostinger Setup Guide</span>
            </button>
            <div className="flex items-center gap-2 text-[11px] text-[#18B88A]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Local Platform</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 PakPattan Services Hub. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleLink('contact')} className="hover:text-white transition">Privacy Policy</button>
            <span>·</span>
            <button onClick={() => handleLink('contact')} className="hover:text-white transition">Terms & Conditions</button>
            <span>·</span>
            <span>Made for Pakpattan & Arifwala</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
