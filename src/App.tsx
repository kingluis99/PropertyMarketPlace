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
import { GeminiAdvisorModal } from './components/GeminiAdvisorModal';
import { LyriaMusicModal } from './components/LyriaMusicModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PROPERTIES } from './data/properties';
import { FilterState, Property, ViewingRequest } from './types';
import { Check, Sparkles, Music, MessageSquare } from 'lucide-react';
import { isSoundtrackEnabled } from './config';
import { 
  onAuthUserChanged, 
  signOutUser, 
  savePropertyToFirestore, 
  removePropertyFromFirestore, 
  subscribeSavedProperties, 
  saveViewingBookingToFirestore,
  subscribeSoundtracks,
  StoredSoundtrack
} from './lib/firebase';

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

  // Gemini & Lyria Modal States
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorProperty, setAdvisorProperty] = useState<Property | null>(null);
  const [isMusicStudioOpen, setIsMusicStudioOpen] = useState(false);
  const [savedSoundtracks, setSavedSoundtracks] = useState<StoredSoundtrack[]>([]);
  const [isSoundtrackOn, setIsSoundtrackOn] = useState<boolean>(() => isSoundtrackEnabled());

  // Check backend runtime config for SOUNDTRACK_ON
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (typeof data.soundtrackEnabled === 'boolean') {
          setIsSoundtrackOn(data.soundtrackEnabled);
        }
      })
      .catch(() => {});
  }, []);

  // User & Persistence
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  const [user, setUser] = useState<{ name: string; email: string; uid?: string; photoURL?: string } | null>(() => {
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

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthUserChanged((fbUser) => {
      if (fbUser) {
        setUser({
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Client',
          email: fbUser.email || '',
          uid: fbUser.uid,
          photoURL: fbUser.photoURL || undefined
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for Saved Properties
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribeSavedProperties(user.uid, (firestoreIds) => {
        if (firestoreIds && firestoreIds.length > 0) {
          setSavedPropertyIds(firestoreIds);
        }
      });
      return () => unsubscribe();
    }
  }, [user?.uid]);

  // Real-time Firestore sync for Lyria Soundtracks (when feature is enabled)
  useEffect(() => {
    if (isSoundtrackOn && user?.uid) {
      const unsubscribe = subscribeSoundtracks(user.uid, (tracks) => {
        setSavedSoundtracks(tracks);
      });
      return () => unsubscribe();
    } else {
      setSavedSoundtracks([]);
    }
  }, [user?.uid, isSoundtrackOn]);

  // Local storage synchronization
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

  // Toggle Save handler with Firestore sync
  const handleToggleSave = async (prop: Property) => {
    const isCurrentlySaved = savedPropertyIds.includes(prop.id);
    if (isCurrentlySaved) {
      setSavedPropertyIds(prev => prev.filter(id => id !== prop.id));
      showToast(`Removed "${prop.title.slice(0, 30)}..." from saved`);
      if (user?.uid) {
        await removePropertyFromFirestore(user.uid, prop.id).catch(console.warn);
      }
    } else {
      setSavedPropertyIds(prev => [...prev, prop.id]);
      showToast(`Saved "${prop.title.slice(0, 30)}..." to your collection`);
      if (user?.uid) {
        await savePropertyToFirestore(user.uid, prop).catch(console.warn);
      }
    }
  };

  // Sign out handler
  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {
      console.warn('Sign out:', e);
    }
    setUser(null);
    showToast('Signed out successfully');
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

  // Confirm viewing booking with Firestore persistence
  const handleConfirmViewing = async (req: ViewingRequest) => {
    setConfirmedViewings(prev => [req, ...prev]);
    showToast(`Viewing reserved for ${req.date} (${req.id})`);
    try {
      await saveViewingBookingToFirestore(req, user?.uid);
    } catch (e) {
      console.warn('Could not save booking to firestore:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1917] flex flex-col font-sans selection:bg-[#F1DBD2] selection:text-[#1A1917] relative">
      
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1917] text-white text-xs px-4 py-3 shadow-2xl border border-stone-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Bar for AI Advisor and Soundtracks */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setAdvisorProperty(null);
            setIsAdvisorOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold rounded-full shadow-xl transition-all cursor-pointer border border-stone-700 hover:scale-105"
          title="Chat with Anthony & Co. AI Property Advisor (Gemini)"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C25E3B]" />
          <span>Ask AI Advisor</span>
        </button>

        {isSoundtrackOn && (
          <button
            onClick={() => setIsMusicStudioOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/95 hover:bg-white text-[#1A1917] text-xs font-medium rounded-full shadow-lg transition-all cursor-pointer border border-[#E6E3DC] hover:border-[#1A1917] backdrop-blur-sm"
            title="Compose ambient property soundtracks with Google Lyria"
          >
            <Music className="w-3.5 h-3.5 text-[#C25E3B]" />
            <span className="hidden sm:inline">Soundtrack Studio</span>
          </button>
        )}
      </div>

      {/* Global Header Navigation */}
      <Header
        activeTab={activeTab}
        listingType={filter.listingType}
        setActiveTab={(tab, listingType) => handleNavigate(tab, listingType)}
        savedProperties={savedProperties}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenValuation={() => setIsValuationModalOpen(true)}
        onOpenAdvisor={() => {
          setAdvisorProperty(null);
          setIsAdvisorOpen(true);
        }}
        onOpenMusicStudio={isSoundtrackOn ? () => setIsMusicStudioOpen(true) : undefined}
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

            {/* Featured Curated Portfolio */}
            <FeaturedProperties
              properties={PROPERTIES}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              onSelectProperty={(prop: Property) => setSelectedProperty(prop)}
              onViewAll={(type) => handleNavigate('search', type || 'sale')}
            />

            {/* Neighbourhood Enclaves */}
            <NeighbourhoodsSection
              onSelectNeighbourhood={handleSelectNeighbourhood}
            />

            {/* Seller & Landlord Section */}
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
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={(prop: Property) => setSelectedProperty(prop)}
          />
        )}

        {activeTab === 'neighbourhoods' && (
          <NeighbourhoodsSection
            onSelectNeighbourhood={handleSelectNeighbourhood}
          />
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

      {/* Global Editorial Footer */}
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
          onOpenAdvisorWithProperty={(prop) => {
            setAdvisorProperty(prop);
            setIsAdvisorOpen(true);
          }}
          onOpenMusicForProperty={isSoundtrackOn ? (prop) => {
            setIsMusicStudioOpen(true);
          } : undefined}
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
        onRemoveSaved={async (id) => {
          setSavedPropertyIds(prev => prev.filter(x => x !== id));
          showToast('Removed from saved properties');
          if (user?.uid) {
            await removePropertyFromFirestore(user.uid, id).catch(console.warn);
          }
        }}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenViewing={(prop) => setViewingProperty(prop)}
        onBrowseMore={() => handleNavigate('search', 'sale')}
      />

      {/* 5. User Sign In / Register Modal with Google Firebase Auth */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome, ${loggedInUser.name}`);
        }}
      />

      {/* 6. Gemini Multi-Turn AI Advisor Modal */}
      <GeminiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => {
          setIsAdvisorOpen(false);
          setAdvisorProperty(null);
        }}
        activeProperty={advisorProperty}
        onNavigateToProperty={(prop) => {
          setIsAdvisorOpen(false);
          setSelectedProperty(prop);
        }}
      />

      {/* 7. Lyria Music Studio Modal (rendered only when feature enabled) */}
      {isSoundtrackOn && (
        <LyriaMusicModal
          isOpen={isMusicStudioOpen}
          onClose={() => setIsMusicStudioOpen(false)}
          userId={user?.uid}
          savedSoundtracks={savedSoundtracks}
        />
      )}

    </div>
  );
}
