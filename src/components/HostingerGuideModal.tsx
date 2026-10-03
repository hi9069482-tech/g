import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Server, CheckCircle2, Copy, FileCode, Terminal } from 'lucide-react';

export const HostingerGuideModal: React.FC = () => {
  const { isHostingerModalOpen, setIsHostingerModalOpen, showToast } = useApp();

  if (!isHostingerModalOpen) return null;

  const copyCode = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const htaccessCode = `# Hostinger LiteSpeed / Apache SPA Routing Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Browser Caching & Compression for Fast Loading
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5865F2] text-white flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#111A4A]">
                Hostinger Production Deployment Guide
              </h2>
              <p className="text-xs text-gray-500">
                Deploying “PakPattan Services Hub” to Hostinger Web Hosting or Cloud
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsHostingerModalOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-6 text-xs text-gray-700">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
            <h3 className="font-heading font-bold text-sm text-[#111A4A] flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Generate Production Bundle</span>
            </h3>
            <p className="text-gray-600 mb-2">
              Run the standard build command in your terminal. This generates optimized HTML, JS, CSS, and PWA assets in the <code className="bg-gray-200 px-1 rounded font-mono">dist/</code> folder.
            </p>
            <div className="flex items-center justify-between bg-[#111A4A] text-green-400 p-3 rounded-xl font-mono text-xs">
              <span>npm run build</span>
              <button onClick={() => copyCode('npm run build', 'Command')} className="text-gray-400 hover:text-white">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
            <h3 className="font-heading font-bold text-sm text-[#111A4A] flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Upload to Hostinger File Manager</span>
            </h3>
            <p className="text-gray-600 space-y-1">
              1. Log into your Hostinger hPanel.<br />
              2. Go to <strong>Websites → Manage → File Manager</strong>.<br />
              3. Open the <strong className="font-mono text-[#5865F2]">public_html</strong> directory.<br />
              4. Upload all files from inside your local <strong className="font-mono">dist/</strong> folder directly into <strong className="font-mono">public_html</strong> (not the folder itself, but its contents: <code className="bg-gray-200 px-1 rounded">index.html</code>, <code className="bg-gray-200 px-1 rounded">assets/</code>, <code className="bg-gray-200 px-1 rounded">manifest.json</code>, etc.).
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-sm text-[#111A4A] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5865F2] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Hostinger .htaccess File (Required for SPA Routing)</span>
              </h3>
              <button
                onClick={() => copyCode(htaccessCode, '.htaccess rules')}
                className="inline-flex items-center gap-1 text-[11px] text-[#5865F2] font-semibold hover:underline"
              >
                <Copy className="w-3 h-3" />
                <span>Copy .htaccess</span>
              </button>
            </div>
            <p className="text-gray-600 mb-2">
              Create a file named <code className="bg-gray-200 px-1 rounded font-mono font-bold">.htaccess</code> inside <strong className="font-mono">public_html</strong> with the following rules to ensure page refreshes route smoothly without 404 errors:
            </p>
            <pre className="bg-[#111A4A] text-gray-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed">
              {htaccessCode}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-[#E2FFF5] border border-[#18B88A]/30 text-gray-800">
            <h4 className="font-heading font-bold text-xs text-[#111A4A] flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#18B88A]" />
              <span>SSL & Domain Configuration</span>
            </h4>
            <p className="text-[11px] text-gray-700">
              In Hostinger hPanel, navigate to <strong>Security → SSL</strong> and ensure <em>Free Lifetime SSL</em> is activated. This is required for PWA installation and service worker caching across mobile devices.
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-right">
          <button
            onClick={() => setIsHostingerModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-[#111A4A] text-white text-xs font-bold"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
