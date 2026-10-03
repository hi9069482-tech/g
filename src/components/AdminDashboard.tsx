import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  Layers, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Plus, 
  Search, 
  Eye, 
  Settings, 
  Clock, 
  ClipboardCheck,
  Phone,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  X,
  Check
} from 'lucide-react';
import { Tehsil, Village, Category, Provider } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    providers, 
    approveProvider, 
    rejectProvider, 
    categories, 
    addCategory, 
    villages, 
    addVillage, 
    tasks, 
    updateTaskStatus,
    openProviderProfile,
    adminProfile,
    showToast 
  } = useApp();

  // Tab State: default to 'pending' as requested:
  // "show 2 tabs: Pending Requests | Approved Providers. Add Approve and Reject button."
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'categories' | 'villages' | 'tasks'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviderDetail, setSelectedProviderDetail] = useState<Provider | null>(null);
  const [isProcessingId, setIsProcessingId] = useState<string | null>(null);

  // New Category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatNameUrdu, setNewCatNameUrdu] = useState('');

  // New Village form state
  const [newVillageName, setNewVillageName] = useState('');
  const [newVillageUrdu, setNewVillageUrdu] = useState('');
  const [newVillageTehsil, setNewVillageTehsil] = useState<Tehsil>('Pakpattan');

  // Real-time filtered lists
  const pendingProviders = providers.filter(p => 
    p.status === 'pending' || p.applicationStatus === 'pending'
  );

  const approvedProviders = providers.filter(p => 
    p.status === 'approved' || p.applicationStatus === 'approved'
  );

  // Filtered by search
  const filteredPending = pendingProviders.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.businessName.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.primaryLocation.toLowerCase().includes(q)
    );
  });

  const filteredApproved = approvedProviders.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.businessName.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.primaryLocation.toLowerCase().includes(q)
    );
  });

  const handleApprove = async (provider: Provider) => {
    try {
      setIsProcessingId(provider.id);
      await approveProvider(provider.id);
      if (selectedProviderDetail?.id === provider.id) {
        setSelectedProviderDetail(null);
      }
    } catch (error) {
      console.error('Approve failed:', error);
      showToast('Error approving provider');
    } finally {
      setIsProcessingId(null);
    }
  };

  const handleReject = async (provider: Provider) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete and reject "${provider.businessName}" (${provider.phone}) from Firebase Firestore? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      setIsProcessingId(provider.id);
      await rejectProvider(provider.id);
      if (selectedProviderDetail?.id === provider.id) {
        setSelectedProviderDetail(null);
      }
    } catch (error) {
      console.error('Reject failed:', error);
      showToast('Error rejecting provider');
    } finally {
      setIsProcessingId(null);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const cat: Category = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName.trim(),
      nameUrdu: newCatNameUrdu.trim() || newCatName.trim(),
      iconName: 'Wrench',
      providerCount: 0,
      description: `Professional ${newCatName} services in Pakpattan & Arifwala.`,
      descriptionUrdu: `${newCatNameUrdu || newCatName} کی خدمات۔`
    };
    addCategory(cat);
    setNewCatName('');
    setNewCatNameUrdu('');
  };

  const handleCreateVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillageName.trim()) return;
    const v: Village = {
      id: `v-${Date.now()}`,
      name: newVillageName.trim(),
      nameUrdu: newVillageUrdu.trim() || newVillageName.trim(),
      tehsil: newVillageTehsil,
      unionCouncil: `UC ${newVillageName.trim()}`,
      distanceKm: 15,
      providerCount: 0
    };
    addVillage(v);
    setNewVillageName('');
    setNewVillageUrdu('');
  };

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Verified Official Officer Details */}
        <div className="bg-gradient-to-r from-[#111A4A] via-[#1c296d] to-[#111A4A] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#18B88A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {adminProfile.name}
                </h1>
                <span className="text-[10px] bg-[#18B88A] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                PakPattan Services Hub — Official Verification & Governance Panel
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-gray-300 block text-[10px]">Direct Helpline:</span>
              <a href={`tel:${adminProfile.contact}`} className="font-bold text-white hover:underline">
                {adminProfile.contact}
              </a>
            </div>
            <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-gray-300 block text-[10px]">WhatsApp:</span>
              <a href={`https://wa.me/92${adminProfile.whatsapp.replace(/\D/g, '').replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#18B88A] hover:underline">
                {adminProfile.whatsapp}
              </a>
            </div>
            <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-gray-300 block text-[10px]">Admin Email:</span>
              <span className="font-bold text-gray-200">{adminProfile.email}</span>
            </div>
          </div>
        </div>

        {/* PRIMARY ADMIN TABS: Requirement: 2 tabs (Pending Requests | Approved Providers) */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6 gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            
            {/* Tab 1: Pending Requests */}
            <button
              onClick={() => { setActiveTab('pending'); setSearchQuery(''); }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-2.5 ${
                activeTab === 'pending' 
                  ? 'bg-[#111A4A] text-white shadow-md shadow-[#111A4A]/20' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Clock className={`w-4 h-4 ${activeTab === 'pending' ? 'text-amber-400' : 'text-amber-600'}`} />
              <span>Pending Requests</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                activeTab === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {pendingProviders.length}
              </span>
            </button>

            {/* Tab 2: Approved Providers */}
            <button
              onClick={() => { setActiveTab('approved'); setSearchQuery(''); }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-2.5 ${
                activeTab === 'approved' 
                  ? 'bg-[#111A4A] text-white shadow-md shadow-[#111A4A]/20' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${activeTab === 'approved' ? 'text-[#18B88A]' : 'text-[#18B88A]'}`} />
              <span>Approved Providers</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                activeTab === 'approved' ? 'bg-[#18B88A] text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {approvedProviders.length}
              </span>
            </button>

            {/* Secondary tabs for Categories & Villages management */}
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-3 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
                activeTab === 'categories' ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Categories ({categories.length})
            </button>

            <button
              onClick={() => setActiveTab('villages')}
              className={`px-4 py-3 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
                activeTab === 'villages' ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Villages ({villages.length})
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-3 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
                activeTab === 'tasks' ? 'bg-gray-200 text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Customer Tasks ({tasks.length})
            </button>

          </div>

          {/* Quick Search */}
          {(activeTab === 'pending' || activeTab === 'approved') && (
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, trade..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5865F2]"
              />
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PENDING REQUESTS                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="font-heading font-bold text-lg text-[#111A4A] flex items-center gap-2">
                  <span>Pending Service Provider Applications</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Live from Firebase
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Review incoming registrations. Click <strong className="text-emerald-700">Approve</strong> to publish to Home Page, or <strong className="text-red-700">Reject</strong> to permanently delete from Firestore.
                </p>
              </div>

              <div className="text-xs text-gray-500">
                Total Pending: <strong className="text-[#111A4A]">{pendingProviders.length}</strong>
              </div>
            </div>

            {filteredPending.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#18B88A] mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111A4A]">No Pending Provider Requests</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                  All submitted applications have been processed. New registrations submitted via the "Become a Service Provider" form will show up here automatically via Firestore real-time listener.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredPending.map(p => (
                  <div 
                    key={p.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 shadow-sm transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <img 
                        src={p.profileImage} 
                        alt={p.businessName} 
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-100 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading font-bold text-base text-[#111A4A]">
                            {p.businessName}
                          </h3>
                          {p.businessNameUrdu && (
                            <span className="font-urdu text-xs text-gray-500">
                              ({p.businessNameUrdu})
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Pending Review
                          </span>
                        </div>

                        <p className="text-xs text-gray-600">
                          <strong>Owner:</strong> {p.ownerName} · <span className="text-[#5865F2] font-semibold">{p.categoryName}</span> · <span>Base: {p.primaryLocation}</span>
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-1">
                          <span className="flex items-center gap-1 font-mono text-gray-700">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {p.phone}
                          </span>
                          {p.email && (
                            <span className="text-gray-500">· {p.email}</span>
                          )}
                          <span>· Submitted: {p.memberSince || 'Recently'}</span>
                          {p.cnicNumberMasked && (
                            <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                              CNIC: {p.cnicNumberMasked}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-1 pt-0.5">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons: APPROVE and REJECT */}
                    <div className="flex items-center gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <button
                        onClick={() => setSelectedProviderDetail(p)}
                        className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => handleApprove(p)}
                        disabled={isProcessingId === p.id}
                        className="px-4 py-2.5 rounded-xl bg-[#18B88A] hover:bg-[#159a73] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => handleReject(p)}
                        disabled={isProcessingId === p.id}
                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPROVED PROVIDERS                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'approved' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="font-heading font-bold text-lg text-[#111A4A] flex items-center gap-2">
                  <span>Approved Directory Providers</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Live on Marketplace
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  These verified providers are live and displayed on the Home Page and Search directory. You can inspect or remove them.
                </p>
              </div>

              <div className="text-xs text-gray-500">
                Total Approved: <strong className="text-[#18B88A]">{approvedProviders.length}</strong>
              </div>
            </div>

            {filteredApproved.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-[#111A4A]">No Approved Providers Match</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                  Approve pending requests from the Pending tab to publish them here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Provider / Business</th>
                        <th className="pb-3">Trade</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Contact</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredApproved.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50/70 transition">
                          <td className="py-3.5 pr-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={p.profileImage} 
                                alt={p.businessName} 
                                className="w-10 h-10 rounded-xl object-cover" 
                                referrerPolicy="no-referrer" 
                              />
                              <div>
                                <p className="font-bold text-[#111A4A]">{p.businessName}</p>
                                <p className="text-[10px] text-gray-400">{p.ownerName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 font-semibold text-gray-700">
                            {p.categoryName}
                          </td>
                          <td className="py-3.5 pr-4 text-gray-600">
                            {p.primaryLocation}
                          </td>
                          <td className="py-3.5 pr-4 font-mono text-gray-700">
                            {p.phone}
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E2FFF5] text-[#18B88A]">
                              <CheckCircle className="w-3 h-3" />
                              <span>Approved</span>
                            </span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button
                              onClick={() => openProviderProfile(p)}
                              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition"
                              title="View Public Profile"
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => handleReject(p)}
                              disabled={isProcessingId === p.id}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition"
                              title="Permanently Delete Document"
                            >
                              Reject & Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CATEGORIES                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm h-fit">
              <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">Add New Category</h3>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Aluminum & Glass Worker"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category Name (Urdu)</label>
                  <input
                    type="text"
                    value={newCatNameUrdu}
                    onChange={(e) => setNewCatNameUrdu(e.target.value)}
                    placeholder="مثلاً: ایلومینیم اور گلاس ورکرز"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Category</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">Active Service Categories ({categories.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-[#111A4A]">{c.name}</p>
                      <p className="text-[10px] text-gray-400">{c.nameUrdu}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-200">
                      {providers.filter(p => (p.status === 'approved' || p.applicationStatus === 'approved') && p.category === c.id).length} approved
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VILLAGES                                                           */}
        {/* ========================================================================= */}
        {activeTab === 'villages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm h-fit">
              <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">Add Village / Chak</h3>
              <form onSubmit={handleCreateVillage} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Village Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newVillageName}
                    onChange={(e) => setNewVillageName(e.target.value)}
                    placeholder="e.g. Chak 22/SP"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Village Name (Urdu)</label>
                  <input
                    type="text"
                    value={newVillageUrdu}
                    onChange={(e) => setNewVillageUrdu(e.target.value)}
                    placeholder="مثلاً: چک 22 ایس پی"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tehsil</label>
                  <select
                    value={newVillageTehsil}
                    onChange={(e) => setNewVillageTehsil(e.target.value as Tehsil)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
                  >
                    <option value="Pakpattan">Tehsil Pakpattan</option>
                    <option value="Arifwala">Tehsil Arifwala</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Village</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">Registered Villages & Chaks ({villages.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {villages.map(v => (
                  <div key={v.id} className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/70 text-xs">
                    <p className="font-bold text-gray-800">{v.name}</p>
                    <p className="text-[10px] text-gray-400">{v.tehsil}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TASKS                                                              */}
        {/* ========================================================================= */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
            <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">Customer Posted Tasks ({tasks.length})</h3>
            <div className="space-y-3">
              {tasks.map(t => (
                <div key={t.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#111A4A]">{t.title}</h4>
                    <p className="text-xs text-gray-500">{t.customerName} · {t.location} · Budget: Rs. {t.budget}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* INSPECTION MODAL FOR PROVIDER APPLICATION                                  */}
        {/* ========================================================================= */}
        {selectedProviderDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    {selectedProviderDetail.businessName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Application ID: {selectedProviderDetail.id} · Status: {selectedProviderDetail.status}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProviderDetail(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 text-xs text-gray-700">
                
                {/* Personal & Business Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Applicant Name:</span>
                    <strong className="text-sm text-[#111A4A]">{selectedProviderDetail.ownerName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Category / Trade:</span>
                    <strong className="text-sm text-[#5865F2]">{selectedProviderDetail.categoryName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Mobile Number:</span>
                    <strong className="font-mono text-sm">{selectedProviderDetail.phone}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">WhatsApp:</span>
                    <strong className="font-mono text-sm text-[#18B88A]">{selectedProviderDetail.whatsapp}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Location Base:</span>
                    <span>{selectedProviderDetail.primaryLocation} ({selectedProviderDetail.tehsil})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Working Days & Hours:</span>
                    <span>{selectedProviderDetail.workingDays} ({selectedProviderDetail.workingHours})</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Business Description</h4>
                  <p className="bg-gray-50 p-3 rounded-xl text-gray-600 leading-relaxed">
                    {selectedProviderDetail.description}
                  </p>
                </div>

                {/* Service Areas */}
                {selectedProviderDetail.serviceAreas && selectedProviderDetail.serviceAreas.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">Service Areas / Chaks Covered</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProviderDetail.serviceAreas.map((area, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CNIC Credentials */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Government CNIC Document Proof</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-500 block mb-1">CNIC Front Copy</span>
                      {selectedProviderDetail.cnicFrontImage ? (
                        <img 
                          src={selectedProviderDetail.cnicFrontImage} 
                          alt="CNIC Front" 
                          className="w-full h-40 object-cover rounded-xl border border-gray-200" 
                        />
                      ) : (
                        <div className="w-full h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                          Digital Verification on File
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block mb-1">CNIC Back Copy</span>
                      {selectedProviderDetail.cnicBackImage ? (
                        <img 
                          src={selectedProviderDetail.cnicBackImage} 
                          alt="CNIC Back" 
                          className="w-full h-40 object-cover rounded-xl border border-gray-200" 
                        />
                      ) : (
                        <div className="w-full h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                          Digital Verification on File
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Decision Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleReject(selectedProviderDetail)}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition"
                  >
                    Reject & Delete Document
                  </button>
                  <button
                    onClick={() => handleApprove(selectedProviderDetail)}
                    className="px-5 py-2.5 rounded-xl bg-[#18B88A] hover:bg-[#159a73] text-white font-bold text-xs transition"
                  >
                    Approve & Publish to Home Page
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
