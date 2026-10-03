import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Download, Smartphone, X, Check } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'header' | 'banner' | 'menu';
}

export const PWAInstallButton: React.FC<Props> = ({ className = '', variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (isInstalled || installedSuccess) {
    return null;
  }

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstalledSuccess(true);
    }
  };

  if (isInstallable) {
    return (
      <button
        onClick={handleInstallClick}
        aria-label="Install PakPattan Services Hub App"
        className={`inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4752c4] transition-all whitespace-nowrap ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-[#111A4A]/20 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#111A4A] hover:bg-white transition whitespace-nowrap ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#5865F2]" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#111A4A] flex items-center justify-center text-white font-bold text-xs">
                    PSH
                  </div>
                  <h3 className="text-base font-bold text-[#111A4A]">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-gray-600">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0EEFF] text-[#5865F2] font-semibold flex items-center justify-center">1</span>
                  <p>Tap the <strong>Share</strong> button in the bottom Safari toolbar.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0EEFF] text-[#5865F2] font-semibold flex items-center justify-center">2</span>
                  <p>Scroll down in the action sheet and select <strong>"Add to Home Screen"</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0EEFF] text-[#5865F2] font-semibold flex items-center justify-center">3</span>
                  <p>Tap <strong>Add</strong> in the top right to get the fast native offline experience.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#5865F2] py-2 text-xs font-semibold text-white hover:bg-[#4752c4] transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback demo button for preview or non-PWA browser context so user can test the UI anytime
  if (variant === 'menu') {
    return (
      <button
        onClick={() => alert('PakPattan Services Hub is PWA ready! When opened in Chrome, Edge, or Safari, you will see the native prompt.')}
        className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        <Download className="w-4 h-4 text-[#5865F2]" />
        <span>Install App on Device</span>
      </button>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-[#111A4A] border border-[#5865F2]/40 px-3.5 py-2 text-xs font-medium text-white shadow-xl animate-bounce">
      <span className="h-2 w-2 rounded-full bg-[#F5A623] animate-ping" />
      <span>Offline Mode — Displaying cached Pakpattan service catalog.</span>
    </div>
  );
};
