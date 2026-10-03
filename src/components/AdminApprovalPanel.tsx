import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  X, 
  Check, 
  History,
  RotateCcw,
  Ban,
  UserCheck
} from 'lucide-react';
import { ProviderApplication, ProviderApplicationStatus } from '../types';

export const AdminApprovalPanel: React.FC = () => {
  const { 
    applications, 
    updateApplicationStatus, 
    adminProfile,
    showToast,
    openProviderProfile,
    providers
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | ProviderApplicationStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<ProviderApplication | null>(null);

  // Rejection & Resubmission Modal Prompts
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [resubmissionModalOpen, setResubmissionModalOpen] = useState(false);
  const [resubmissionNotesInput, setResubmissionNotesInput] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      app.id.toLowerCase().includes(term) ||
      app.personalInfo.fullName.toLowerCase().includes(term) ||
      app.businessInfo.businessName.toLowerCase().includes(term) ||
      app.personalInfo.mobileNumber.includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (app: ProviderApplication) => {
    updateApplicationStatus(
      app.id, 
      'approved', 
      `Approved and certified by Super Admin ${adminProfile.name}. All documentation verified.`
    );
    setSelectedApp(null);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !rejectionReasonInput.trim()) return;

    updateApplicationStatus(selectedApp.id, 'rejected', rejectionReasonInput.trim());
    setRejectionModalOpen(false);
    setRejectionReasonInput('');
    setSelectedApp(null);
  };

  const handleResubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !resubmissionNotesInput.trim()) return;

    updateApplicationStatus(selectedApp.id, 'resubmission_required', resubmissionNotesInput.trim());
    setResubmissionModalOpen(false);
    setResubmissionNotesInput('');
    setSelectedApp(null);
  };

  const handleMarkUnderReview = (app: ProviderApplication) => {
    updateApplicationStatus(app.id, 'under_review', `Marked under active review by Admin ${adminProfile.name}.`);
    setSelectedApp(null);
  };

  const handleSuspend = (app: ProviderApplication) => {
    updateApplicationStatus(app.id, 'suspended', 'Listing suspended by Admin.');
    setSelectedApp(null);
  };

  const getStatusBadge = (status: ProviderApplicationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E2FFF5] text-[#18B88A]">
            <CheckCircle className="w-3 h-3" />
            <span>Approved</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            <span>Pending Review</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
            <Eye className="w-3 h-3" />
            <span>Under Review</span>
          </span>
        );
      case 'resubmission_required':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
            <AlertTriangle className="w-3 h-3" />
            <span>Resubmit Required</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-700">
            <Ban className="w-3 h-3" />
            <span>Suspended</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Profile Details Card (Requested by User) */}
      <div className="bg-[#111A4A] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#5865F2] text-white font-extrabold flex items-center justify-center text-xl shadow-md">
            OD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-xl text-white">
                {adminProfile.name}
              </h2>
              <span className="text-[10px] bg-[#18B88A] text-white px-2 py-0.5 rounded-full font-bold">
                Super Admin Officer
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Authorized Verification & Approval Officer for Pakpattan & Arifwala
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10">
            <span className="text-gray-400 block text-[10px]">Contact Line:</span>
            <span className="font-bold text-white">{adminProfile.contact}</span>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10">
            <span className="text-gray-400 block text-[10px]">WhatsApp:</span>
            <span className="font-bold text-[#18B88A]">{adminProfile.whatsapp}</span>
          </div>
          <div className="bg-white/10 px-3 py-2 rounded-xl border border-white/10">
            <span className="text-gray-400 block text-[10px]">Official Email:</span>
            <span className="font-bold text-gray-200">{adminProfile.email}</span>
          </div>
        </div>
      </div>

      {/* Main Applications Table Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm">
        
        {/* Table Filters & Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#111A4A]">
              Provider Applications ({applications.length})
            </h3>
            <p className="text-xs text-gray-500">
              Review new registrations, verify CNIC credentials, and control public marketplace publishing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, app ID, mobile..."
                className="pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 w-full sm:w-60"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 cursor-pointer"
            >
              <option value="all">All Applications ({applications.length})</option>
              <option value="pending">Pending ({applications.filter(a => a.status === 'pending').length})</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="resubmission_required">Resubmission Required</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">App ID</th>
                <th className="pb-3">Applicant / Owner</th>
                <th className="pb-3">Business Name</th>
                <th className="pb-3">Main Trade</th>
                <th className="pb-3">Location & Chaks</th>
                <th className="pb-3">Submitted</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 pr-3 font-mono font-bold text-[#5865F2]">
                    {app.id}
                  </td>
                  <td className="py-3.5 pr-3">
                    <p className="font-bold text-[#111A4A]">{app.personalInfo.fullName}</p>
                    <p className="text-[10px] text-gray-400">{app.personalInfo.mobileNumber}</p>
                  </td>
                  <td className="py-3.5 pr-3 font-medium text-gray-800">
                    {app.businessInfo.businessName}
                  </td>
                  <td className="py-3.5 pr-3 text-gray-600">
                    {app.businessInfo.mainCategoryName}
                  </td>
                  <td className="py-3.5 pr-3">
                    <span className="text-gray-700 block truncate max-w-[130px]">{app.locationInfo.village}</span>
                    <span className="text-[10px] text-[#5865F2]">
                      {app.locationInfo.selectedServiceAreas.length} service areas
                    </span>
                  </td>
                  <td className="py-3.5 pr-3 text-gray-500 text-[11px]">
                    {app.submittedAt}
                  </td>
                  <td className="py-3.5 pr-3">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="py-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-[11px] shadow-sm transition"
                    >
                      Inspect & Decide
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Application Review Detailed Modal (Section 8) */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-extrabold text-xl text-[#111A4A]">
                    Review Application: {selectedApp.id}
                  </h3>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Submitted: {selectedApp.submittedAt} · Reviewing Admin: {adminProfile.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs">
              
              {/* Left Column: Personal & Business */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80">
                  <h4 className="font-heading font-bold text-sm text-[#111A4A] mb-2">
                    Applicant Personal Information
                  </h4>
                  <div className="space-y-1.5 text-gray-700">
                    <p><strong>Full Name:</strong> {selectedApp.personalInfo.fullName}</p>
                    <p><strong>Father's Name:</strong> {selectedApp.personalInfo.fatherName || 'Not specified'}</p>
                    <p><strong>Mobile Number:</strong> {selectedApp.personalInfo.mobileNumber}</p>
                    <p><strong>WhatsApp:</strong> {selectedApp.personalInfo.whatsappNumber}</p>
                    <p><strong>Email Address:</strong> {selectedApp.personalInfo.email}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80">
                  <h4 className="font-heading font-bold text-sm text-[#111A4A] mb-2">
                    Business Information
                  </h4>
                  <div className="space-y-1.5 text-gray-700">
                    <p><strong>Business Name:</strong> {selectedApp.businessInfo.businessName}</p>
                    <p><strong>Trade Category:</strong> {selectedApp.businessInfo.mainCategoryName}</p>
                    <p><strong>Provider Type:</strong> {selectedApp.businessInfo.providerType}</p>
                    <p><strong>Experience:</strong> {selectedApp.businessInfo.experienceYears} Years</p>
                    <p><strong>Working Schedule:</strong> {selectedApp.businessInfo.workingDays} ({selectedApp.businessInfo.workingHours})</p>
                    <p><strong>Starting Price:</strong> Rs. {selectedApp.businessInfo.startingPrice} /{selectedApp.businessInfo.priceUnit}</p>
                    <p><strong>Description:</strong> {selectedApp.businessInfo.businessDescription}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80">
                  <h4 className="font-heading font-bold text-sm text-[#111A4A] mb-2">
                    Location & Covered Service Areas ({selectedApp.locationInfo.selectedServiceAreas.length})
                  </h4>
                  <p className="mb-2"><strong>Base Address:</strong> {selectedApp.locationInfo.completeAddress}, {selectedApp.locationInfo.village}, {selectedApp.locationInfo.tehsil}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedApp.locationInfo.selectedServiceAreas.map((area, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#F0EEFF] text-[#111A4A] font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Documents & Verification Images */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#E2FFF5]/70 border border-[#18B88A]/30">
                  <h4 className="font-heading font-bold text-sm text-[#111A4A] mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#18B88A]" />
                    <span>CNIC & Identity Proof (Confidential)</span>
                  </h4>
                  <p className="font-mono text-sm font-bold text-[#111A4A] mb-3">
                    CNIC: {selectedApp.documents.cnicNumber}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-gray-500 block mb-1">CNIC Front:</span>
                      <img src={selectedApp.documents.cnicFrontImage} alt="CNIC Front" className="w-full h-24 object-cover rounded-xl border border-gray-200" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-500 block mb-1">CNIC Back:</span>
                      <img src={selectedApp.documents.cnicBackImage} alt="CNIC Back" className="w-full h-24 object-cover rounded-xl border border-gray-200" />
                    </div>
                  </div>
                </div>

                {/* Audit Logs */}
                <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80">
                  <h4 className="font-heading font-bold text-sm text-[#111A4A] mb-2 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-[#5865F2]" />
                    <span>Audit Decision History</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedApp.approvalLogs.map(log => (
                      <div key={log.id} className="p-2 rounded-xl bg-white border border-gray-100 text-[11px]">
                        <div className="flex justify-between font-bold text-gray-800">
                          <span>{log.action}</span>
                          <span className="text-gray-400 font-normal">{log.timestamp}</span>
                        </div>
                        <p className="text-gray-500 mt-0.5">{log.remarks}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedApp.rejectionReason && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs">
                    <strong>Rejection Reason on File:</strong> {selectedApp.rejectionReason}
                  </div>
                )}

                {selectedApp.resubmissionNotes && (
                  <div className="p-3.5 rounded-xl bg-orange-50 text-orange-800 text-xs">
                    <strong>Requested Corrections on File:</strong> {selectedApp.resubmissionNotes}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions Toolbar (Section 8: Approve, Reject, Resubmission, Review) */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkUnderReview(selectedApp)}
                  className="px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleSuspend(selectedApp)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition"
                >
                  Suspend Listing
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResubmissionModalOpen(true)}
                  className="px-4 py-2 rounded-xl border border-orange-200 bg-orange-50 text-orange-800 text-xs font-bold hover:bg-orange-100 transition"
                >
                  Request Resubmission
                </button>

                <button
                  onClick={() => setRejectionModalOpen(true)}
                  className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition"
                >
                  Reject Application
                </button>

                <button
                  onClick={() => handleApprove(selectedApp)}
                  className="px-6 py-2.5 rounded-xl bg-[#18B88A] hover:bg-[#159a73] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#18B88A]/25 transition flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve & Publish Profile</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reject Prompt Modal */}
      {rejectionModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-red-900 mb-2">
              Reject Application ({selectedApp.id})
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter a clear reason. The applicant will be notified and their profile will remain private.
            </p>
            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <textarea
                rows={3}
                required
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
                placeholder="e.g. CNIC invalid or fraudulent trade documentation..."
                className="w-full p-3 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-red-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resubmission Prompt Modal */}
      {resubmissionModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-orange-900 mb-2">
              Request Corrections ({selectedApp.id})
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Specify what the provider needs to fix (e.g. clearer photo, exact shop number).
            </p>
            <form onSubmit={handleResubmitRequest} className="space-y-4">
              <textarea
                rows={3}
                required
                value={resubmissionNotesInput}
                onChange={(e) => setResubmissionNotesInput(e.target.value)}
                placeholder="e.g. Please upload a clear photo of your CNIC backside..."
                className="w-full p-3 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResubmissionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl"
                >
                  Send Correction Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
