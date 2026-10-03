import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  MessageSquare, 
  Heart, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  Star, 
  MapPin, 
  User, 
  Settings,
  ChevronRight
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { 
    tasks, 
    providers, 
    savedProviderIds, 
    toggleSaveProvider, 
    openProviderProfile, 
    setIsChatModalOpen, 
    setActiveTab 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tasks' | 'saved'>('overview');

  const savedProviders = providers.filter(p => savedProviderIds.includes(p.id));
  const activeTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center font-bold text-xl">
              KS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#111A4A]">
                  Welcome back, Khurram!
                </h1>
                <span className="text-[11px] font-semibold bg-[#E2FFF5] text-[#18B88A] px-2 py-0.5 rounded-full">
                  Customer Account
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Location: Farid Town, Pakpattan · Member since March 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('post-task')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#e09419] text-[#111A4A] text-xs font-bold shadow-sm transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Task</span>
            </button>
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold shadow-sm transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] text-[#5865F2] flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500">Active Tasks</p>
            <p className="font-heading text-2xl font-extrabold text-[#111A4A] mt-1">
              {activeTasks.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#E2FFF5] text-[#18B88A] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500">Completed Jobs</p>
            <p className="font-heading text-2xl font-extrabold text-[#111A4A] mt-1">
              {completedTasks.length + 4}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#F5A623] flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500">Saved Providers</p>
            <p className="font-heading text-2xl font-extrabold text-[#111A4A] mt-1">
              {savedProviders.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] text-[#111A4A] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500">Avg. Response</p>
            <p className="font-heading text-2xl font-extrabold text-[#111A4A] mt-1">
              22 mins
            </p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200/80 pb-3">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'overview'
                ? 'bg-[#111A4A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            Recent Activity & Overview
          </button>
          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'tasks'
                ? 'bg-[#111A4A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            My Posted Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveSubTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'saved'
                ? 'bg-[#111A4A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            Saved Providers ({savedProviders.length})
          </button>
        </div>

        {/* Content based on sub tab */}
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 cols: Active Tasks */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-base text-[#111A4A]">
                    My Current Tasks
                  </h3>
                  <button
                    onClick={() => setActiveSubTab('tasks')}
                    className="text-xs font-semibold text-[#5865F2] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.slice(0, 3).map(task => (
                    <div key={task.id} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            task.status === 'pending'
                              ? 'bg-[#FFF8E7] text-[#F5A623]'
                              : 'bg-[#E2FFF5] text-[#18B88A]'
                          }`}>
                            {task.status.toUpperCase()}
                          </span>
                          <span className="text-xs font-bold text-[#111A4A]">{task.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{task.description}</p>
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                          <span>📍 {task.village}</span>
                          <span>·</span>
                          <span>💵 Budget: Rs. {task.budget}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsChatModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#5865F2] text-white text-xs font-semibold hover:bg-[#4752c4] transition"
                      >
                        Inquiries ({task.proposalsCount})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col: Quick Saved Providers */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <h3 className="font-heading font-bold text-base text-[#111A4A] mb-4">
                  Quick Access Providers
                </h3>
                <div className="space-y-3">
                  {savedProviders.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F8FC]">
                      <div className="flex items-center gap-2.5">
                        <img src={p.profileImage} alt={p.businessName} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-heading font-bold text-xs text-[#111A4A] line-clamp-1">{p.businessName}</p>
                          <p className="text-[10px] text-gray-500">{p.categoryName} · {p.primaryLocation}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => openProviderProfile(p)}
                        className="p-1.5 text-gray-400 hover:text-[#5865F2]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        {activeSubTab === 'tasks' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#111A4A] mb-4">
              All Tasks Posted by You
            </h3>
            {tasks.map(task => (
              <div key={task.id} className="p-5 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E2FFF5] text-[#18B88A]">
                      {task.category.toUpperCase()}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#111A4A]">{task.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span>📍 {task.village}</span>
                    <span>·</span>
                    <span>💵 Budget: Rs. {task.budget}</span>
                    <span>·</span>
                    <span>🕒 {task.preferredDate} - {task.preferredTime}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <span className="text-xs text-gray-400">Created: {task.createdAt}</span>
                  <button
                    onClick={() => setIsChatModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#5865F2] text-white text-xs font-bold"
                  >
                    View Chat Messages
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Saved Providers */}
        {activeSubTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProviders.map(p => (
              <div key={p.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={p.profileImage} alt={p.businessName} className="w-14 h-14 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#111A4A] line-clamp-1">{p.businessName}</h4>
                      <p className="text-xs text-gray-500">{p.categoryName}</p>
                      <div className="flex items-center gap-1 text-[#F5A623] text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold text-gray-800">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4">{p.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openProviderProfile(p)}
                    className="py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => toggleSaveProvider(p.id)}
                    className="py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
