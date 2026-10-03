import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Eye, 
  MessageSquare, 
  Heart, 
  X, 
  Filter,
  Grid,
  List,
  Crosshair
} from 'lucide-react';
import { CATEGORIES, VILLAGES } from '../data/mockData';
import { Provider } from '../types';

export const SearchResults: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedLocation, 
    setSelectedLocation, 
    verifiedOnly, 
    setVerifiedOnly, 
    minRating, 
    setMinRating, 
    sortBy, 
    setSortBy, 
    providers, 
    openProviderProfile, 
    startChatWithProvider, 
    savedProviderIds, 
    toggleSaveProvider, 
    resetFilters,
    language 
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic: Only APPROVED providers appear publicly
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      // STRICT APPROVAL RULE: Only approved, public providers are shown to the public
      if (p.applicationStatus !== 'approved' || p.isPublic === false) {
        return false;
      }

      // 1. Text Search (businessName, owner, description, services)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.businessName.toLowerCase().includes(q) || p.ownerName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesServices = p.services.some(s => s.title.toLowerCase().includes(q));
        const matchesCategory = p.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesServices && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // 3. Location / Village Filter (Check primary location OR service areas!)
      if (selectedLocation) {
        const matchesPrimary = p.primaryLocation === selectedLocation;
        const matchesServiceArea = p.serviceAreas.includes(selectedLocation);
        const matchesTehsil = p.tehsil === selectedLocation;
        if (!matchesPrimary && !matchesServiceArea && !matchesTehsil) {
          return false;
        }
      }

      // 4. Verified Only
      if (verifiedOnly && !p.verified) {
        return false;
      }

      // 5. Min Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
      // Recommended default: featured first, then rating
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
    });
  }, [providers, searchQuery, selectedCategory, selectedLocation, verifiedOnly, minRating, sortBy]);

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, skills, or technician names..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#5865F2] focus:bg-white transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Category Dropdown */}
            <div className="md:w-52">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#5865F2] cursor-pointer"
              >
                <option value="">All 16 Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Quick Location Dropdown */}
            <div className="md:w-56">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#5865F2] cursor-pointer"
              >
                <option value="">All Pakpattan & Arifwala</option>
                <option value="Pakpattan City (Urban)">Pakpattan City</option>
                <option value="Arifwala City (Urban)">Arifwala City</option>
                {VILLAGES.filter(v => !v.name.includes('(Urban)')).map(v => (
                  <option key={v.id} value={v.name}>{v.name} ({v.tehsil})</option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-xs font-semibold text-gray-700"
            >
              <Filter className="w-4 h-4 text-[#5865F2]" />
              <span>More Filters</span>
            </button>

          </div>
        </div>

        {/* Layout: Sidebar Filters (desktop) + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#5865F2]" />
                <h3 className="font-heading font-bold text-sm text-[#111A4A]">Filters</h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#5865F2] hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Verification Toggle */}
            <div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#18B88A] focus:ring-[#18B88A]"
                />
                <span className="text-xs font-medium text-gray-700">Verified Providers Only</span>
              </label>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Customer Rating
              </label>
              <div className="space-y-1.5">
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.5 & Above (Excellent)', value: 4.5 },
                  { label: '4.8 & Above (Top Rated)', value: 4.8 }
                ].map(r => (
                  <button
                    key={r.value}
                    onClick={() => setMinRating(r.value)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      minRating === r.value
                        ? 'bg-[#F0EEFF] text-[#5865F2] font-bold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tehsil Quick Select */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Tehsil
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLocation(selectedLocation === 'Pakpattan' ? '' : 'Pakpattan')}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition ${
                    selectedLocation === 'Pakpattan'
                      ? 'bg-[#5865F2] text-white border-[#5865F2]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Pakpattan
                </button>
                <button
                  onClick={() => setSelectedLocation(selectedLocation === 'Arifwala' ? '' : 'Arifwala')}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition ${
                    selectedLocation === 'Arifwala'
                      ? 'bg-[#18B88A] text-white border-[#18B88A]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Arifwala
                </button>
              </div>
            </div>

            {/* Village Cloud in Sidebar */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Popular Villages
              </label>
              <div className="flex flex-wrap gap-1.5">
                {VILLAGES.slice(0, 10).map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedLocation(selectedLocation === v.name ? '' : v.name)}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition ${
                      selectedLocation === v.name
                        ? 'bg-[#111A4A] text-white font-semibold'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Search Results Head & Grid */}
          <div className="lg:col-span-3">
            
            {/* Header: Result count + Sorting + View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#111A4A]">
                  {filteredProviders.length} Service Providers Available
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing matching professionals in Pakpattan & Arifwala districts
                </p>
              </div>

              <div className="flex items-center gap-3">
                
                {/* Sort selector */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="rating">Sort: Highest Rating</option>
                    <option value="reviews">Sort: Most Reviews</option>
                    <option value="price_low">Sort: Price: Low to High</option>
                  </select>
                </div>

                {/* Grid / List Mode */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-[#5865F2] text-white' : 'text-gray-500'}`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-[#5865F2] text-white' : 'text-gray-500'}`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Results Grid / List */}
            {filteredProviders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-gray-200/80 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#F0EEFF] text-[#5865F2] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111A4A] mb-1">
                  No providers found in this area or filter
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  Try clearing your search keyword, selecting a neighboring village, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-xs font-semibold text-white shadow-sm transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProviders.map(provider => {
                  const isSaved = savedProviderIds.includes(provider.id);
                  return (
                    <div
                      key={provider.id}
                      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#5865F2]/40 shadow-sm card-hover flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        <div className="relative h-40 bg-gray-100 overflow-hidden">
                          <img
                            src={provider.profileImage}
                            alt={provider.businessName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={() => toggleSaveProvider(provider.id)}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 transition shadow-sm"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>

                          {provider.verified && (
                            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-[#18B88A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                              <CheckCircle className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}

                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
                            <span className="bg-[#111A4A]/90 px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-sm">
                              {provider.categoryName}
                            </span>
                            <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                              <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                              <span className="font-bold text-[10px]">{provider.rating}</span>
                              <span className="text-[9px] text-gray-300">({provider.reviewCount})</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3
                            onClick={() => openProviderProfile(provider)}
                            className="font-heading font-bold text-sm text-[#111A4A] hover:text-[#5865F2] cursor-pointer transition-colors leading-snug line-clamp-1"
                          >
                            {provider.businessName}
                          </h3>

                          <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 mb-2">
                            <MapPin className="w-3 h-3 text-[#5865F2] flex-shrink-0" />
                            <span className="truncate">{provider.primaryLocation}</span>
                          </div>

                          <div className="mb-2">
                            <div className="flex flex-wrap gap-1">
                              {provider.serviceAreas.slice(0, 2).map((a, i) => (
                                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-[#F0EEFF] text-[#111A4A] rounded">
                                  {a}
                                </span>
                              ))}
                              {provider.serviceAreas.length > 2 && (
                                <span className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-500 rounded">
                                  +{provider.serviceAreas.length - 2}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-3">
                            {provider.description}
                          </p>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span className="text-gray-400 text-[10px]">Starting:</span>
                            <span className="font-bold text-[#111A4A]">
                              Rs. {provider.startingPrice} <span className="font-normal text-[10px] text-gray-500">/{provider.priceUnit}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 pt-0 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openProviderProfile(provider)}
                          className="py-1.5 px-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#111A4A] transition text-center"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => startChatWithProvider(provider)}
                          className="py-1.5 px-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-xs font-semibold text-white shadow-sm transition text-center"
                        >
                          Chat Now
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* List Mode */
              <div className="space-y-4">
                {filteredProviders.map(provider => (
                  <div
                    key={provider.id}
                    className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between card-hover shadow-sm"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={provider.profileImage}
                        alt={provider.businessName}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 
                            onClick={() => openProviderProfile(provider)}
                            className="font-heading font-bold text-base text-[#111A4A] hover:text-[#5865F2] cursor-pointer"
                          >
                            {provider.businessName}
                          </h3>
                          {provider.verified && (
                            <span className="text-[10px] bg-[#E2FFF5] text-[#18B88A] font-bold px-1.5 py-0.5 rounded">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="font-medium text-gray-800">{provider.categoryName}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#5865F2]" />
                            <span>{provider.primaryLocation}</span>
                          </span>
                          <span>·</span>
                          <div className="flex items-center gap-1 text-[#F5A623]">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-bold text-gray-800">{provider.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 mt-1 max-w-md">
                          {provider.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block">Starting Rate:</span>
                        <span className="text-sm font-bold text-[#111A4A]">Rs. {provider.startingPrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openProviderProfile(provider)}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => startChatWithProvider(provider)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#5865F2] text-xs font-semibold text-white shadow-sm hover:bg-[#4752c4]"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="font-heading font-bold text-base text-[#111A4A]">Filter Results</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Verified */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 text-[#18B88A]"
                  />
                  <span>Verified Providers Only</span>
                </label>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Village */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Village / Town</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200"
                >
                  <option value="">All Locations</option>
                  {VILLAGES.map(v => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => { resetFilters(); setMobileFilterOpen(false); }}
                className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#5865F2] rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
