import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const ProviderLoginPage: React.FC = () => {
  const { 
    providers, 
    setCurrentLoggedInProviderId, 
    setUserRole, 
    setActiveTab, 
    showToast 
  } = useApp();

  const [identifier, setIdentifier] = useState('03007861122');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Please enter your email or mobile number.');
      return;
    }

    // Match with registered providers
    const matched = providers.find(p => 
      p.phone.replace(/\D/g, '') === identifier.replace(/\D/g, '') ||
      p.businessName.toLowerCase().includes(identifier.toLowerCase())
    ) || providers[0];

    setCurrentLoggedInProviderId(matched.id);
    setUserRole('provider');
    setActiveTab('provider-dashboard');
    showToast(`Logged in as ${matched.businessName}`);
  };

  // Quick Account Switcher for Instant Testing
  const quickSwitch = (providerId: string, roleName: string) => {
    setCurrentLoggedInProviderId(providerId);
    setUserRole('provider');
    setActiveTab('provider-dashboard');
    showToast(`Switched session to ${roleName}`);
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-12 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-md px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#111A4A] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Briefcase className="w-7 h-7 text-[#5865F2]" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-[#111A4A]">
              Provider Portal Login
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Access your service listings, inquiries, and application status
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="0300 1234567 or email"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to your registered WhatsApp/Email.')}
                  className="text-[11px] text-[#5865F2] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#5865F2] rounded"
                />
                <span className="text-xs text-gray-600">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <span>Login to Provider Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* New Provider Registration Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Not registered as a service provider yet?
            </p>
            <button
              onClick={() => setActiveTab('register-provider')}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#18B88A] hover:underline"
            >
              <span>Become a Service Provider</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Instant Demo Switcher for Evaluation */}
          <div className="mt-6 p-3.5 rounded-2xl bg-[#F7F8FC] border border-gray-200 text-xs">
            <p className="font-bold text-[#111A4A] mb-2 text-[11px] uppercase tracking-wider text-center">
              Quick Demo Accounts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickSwitch('p-1', 'Approved Provider (Umar Plumber)')}
                className="p-2 rounded-xl bg-white border border-gray-200 text-[11px] font-semibold text-gray-700 hover:border-[#18B88A]"
              >
                ✅ Approved Profile
              </button>
              <button
                type="button"
                onClick={() => quickSwitch('p-pending-1', 'Pending Provider (Asif Gill)')}
                className="p-2 rounded-xl bg-white border border-gray-200 text-[11px] font-semibold text-amber-700 hover:border-amber-400"
              >
                ⏳ Pending Approval
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
