/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { SearchResults } from './components/SearchResults';
import { NeighbourhoodsSection } from './components/NeighbourhoodsSection';
import { SellerSection } from './components/SellerSection';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ValuationModal } from './components/ValuationModal';
import { ArrangeViewingModal } from './components/ArrangeViewingModal';
import { SavedPropertiesDrawer } from './components/SavedPropertiesDrawer';
import { AuthModal } from './components/AuthModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PROPERTIES } from './data/properties';
import { FilterState, Property, ViewingRequest } from './types';
import { Check, Bookmark, Calendar } from 'lucide-react';

const SAVED_STORAGE_KEY = 'keaton_saved_properties';
const USER_STORAGE_KEY = 'keaton_user_account';
const VIEWINGS_STORAGE_KEY = 'keaton_viewing_bookings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'neighbourhoods' | 'about' | 'contact'>('home');
  
  // Search Filter State
  const [filter, setFilter] = useState<FilterState>({
    listingType: 'sale',
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 'all',
    propertyType: 'all',
    sortBy: 'featured'
  });

  // Modal & Drawer States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User & Persistence
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3']; // initial high-end favorites
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [confirmedViewings, setConfirmedViewings] = useState<ViewingRequest[]>(() => {
    try {
      const stored = localStorage.getItem(VIEWINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEWINGS_STORAGE_KEY, JSON.stringify(confirmedViewings));
    } catch (e) {
      console.error(e);
    }
  }, [confirmedViewings]);

  // Derived Saved Properties
  const savedProperties = PROPERTIES.filter(p => savedPropertyIds.includes(p.id));

  // Toggle Save handler
  const handleToggleSave = (prop: Property) => {
    if (savedPropertyIds.includes(prop.id)) {
      setSavedPropertyIds(prev => prev.filter(id => id !== prop.id));
      showToast(`Removed "${prop.title.slice(0, 30)}..." from saved`);
    } else {
      setSavedPropertyIds(prev => [...prev, prop.id]);
      showToast(`Saved "${prop.title.slice(0, 30)}..." to your collection`);
    }
  };

  // Execute search from hero
  const handleHeroSearch = () => {
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick location filter
  const handleQuickLocation = (loc: string) => {
    setFilter(prev => ({
      ...prev,
      location: loc
    }));
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Neighbourhood selection
  const handleSelectNeighbourhood = (areaName: string) => {
    // Extract base area keyword, e.g. "Victoria Park" or "Shoreditch"
    const keyword = areaName.split('&')[0].trim();
    setFilter(prev => ({
      ...prev,
      location: keyword
    }));
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation helper
  const handleNavigate = (tab: string, listingType?: 'sale' | 'rent') => {
    setActiveTab(tab as any);
    if (listingType) {
      setFilter(prev => ({
        ...prev,
        listingType,
        minPrice: 0,
        maxPrice: listingType === 'sale' ? 10000000 : 20000
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirm viewing booking
  const handleConfirmViewing = (req: ViewingRequest) => {
    setConfirmedViewings(prev => [req, ...prev]);
    showToast(`Viewing reserved for ${req.date} (${req.id})`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1917] flex flex-col font-sans selection:bg-[#F1DBD2] selection:text-[#1A1917]">
      
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1917] text-white text-xs px-4 py-3 shadow-2xl border border-stone-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
        savedProperties={savedProperties}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setUser(null);
          showToast('Signed out successfully');
        }}
        onOpenValuation={() => setIsValuationModalOpen(true)}
        onSelectPropertyType={(type) => {
          setFilter(prev => ({
            ...prev,
            listingType: type,
            minPrice: 0,
            maxPrice: type === 'sale' ? 10000000 : 20000
          }));
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            {/* Photography-led Hero Section with integrated search */}
            <HeroSection
              filter={filter}
              setFilter={setFilter}
              onExecuteSearch={handleHeroSearch}
              onSelectQuickLocation={handleQuickLocation}
            />

            {/* Featured Properties Showcase */}
            <FeaturedProperties
              properties={PROPERTIES}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              onToggleSave={handleToggleSave}
              savedPropertyIds={savedPropertyIds}
              onViewAll={(type) => handleNavigate('search', type)}
            />

            {/* Lifestyle & Neighbourhoods Section */}
            <NeighbourhoodsSection
              onSelectNeighbourhood={handleSelectNeighbourhood}
            />

            {/* Seller Section */}
            <SellerSection
              onOpenValuationModal={() => setIsValuationModalOpen(true)}
              onContactAgent={() => handleNavigate('contact')}
            />
          </>
        )}

        {activeTab === 'search' && (
          <SearchResults
            properties={PROPERTIES}
            filter={filter}
            setFilter={setFilter}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'neighbourhoods' && (
          <div className="py-12">
            <NeighbourhoodsSection
              onSelectNeighbourhood={handleSelectNeighbourhood}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <AboutSection
            onExploreProperties={() => handleNavigate('search', 'sale')}
            onOpenValuation={() => setIsValuationModalOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenValuation={() => setIsValuationModalOpen(true)}
      />

      {/* Modals & Slide-overs */}
      
      {/* 1. Property Details Magazine Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isSaved={savedPropertyIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSave}
          onOpenViewingModal={(prop) => {
            setViewingProperty(prop);
          }}
        />
      )}

      {/* 2. Arrange a Viewing Modal */}
      {viewingProperty && (
        <ArrangeViewingModal
          property={viewingProperty}
          onClose={() => setViewingProperty(null)}
          onConfirmViewing={handleConfirmViewing}
        />
      )}

      {/* 3. Instant Property Valuation Calculator */}
      <ValuationModal
        isOpen={isValuationModalOpen}
        onClose={() => setIsValuationModalOpen(false)}
      />

      {/* 4. Saved Properties Drawer */}
      <SavedPropertiesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedProperties}
        onRemoveSaved={(id) => {
          setSavedPropertyIds(prev => prev.filter(x => x !== id));
          showToast('Removed from saved properties');
        }}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenViewing={(prop) => setViewingProperty(prop)}
        onBrowseMore={() => handleNavigate('search', 'sale')}
      />

      {/* 5. User Sign In / Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome back, ${loggedInUser.name}`);
        }}
      />

    </div>
  );
}
