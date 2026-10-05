import React, { useState } from 'react';
import { Bookmark, Menu, X, User, PhoneCall, ChevronDown, Sparkles, Music } from 'lucide-react';
import { Property } from '../types';

interface HeaderProps {
  activeTab: string;
  listingType?: 'sale' | 'rent';
  setActiveTab: (tab: string, listingType?: 'sale' | 'rent') => void;
  savedProperties: Property[];
  onOpenSavedDrawer: () => void;
  user: { name: string; email: string; uid?: string; photoURL?: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenValuation: () => void;
  onSelectPropertyType?: (type: 'sale' | 'rent') => void;
  onOpenAdvisor?: () => void;
  onOpenMusicStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  listingType = 'sale',
  setActiveTab,
  savedProperties,
  onOpenSavedDrawer,
  user,
  onOpenAuth,
  onLogout,
  onOpenValuation,
  onSelectPropertyType,
  onOpenAdvisor,
  onOpenMusicStudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isBuyActive = activeTab === 'search' && listingType === 'sale';
  const isRentActive = (activeTab === 'search' && listingType === 'rent') || activeTab === 'rent';

  const handleNavClick = (tab: string, listingTypeParam?: 'sale' | 'rent') => {
    setActiveTab(tab, listingTypeParam);
    if (listingTypeParam && onSelectPropertyType) {
      onSelectPropertyType(listingTypeParam);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E6E3DC] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer"
        >
          <span className="font-editorial text-2xl lg:text-[26px] tracking-tight font-medium text-[#1A1917] group-hover:text-[#C25E3B] transition-colors">
            ANTHONY & CO.
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] font-medium text-[#57534E]">
          <button
            onClick={() => handleNavClick('search', 'sale')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              isBuyActive ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Buy
            {isBuyActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('search', 'rent')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              isRentActive ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Rent
            {isRentActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              onOpenValuation();
            }}
            className="transition-colors hover:text-[#1A1917] cursor-pointer py-1"
          >
            Sell
          </button>

          <button
            onClick={() => handleNavClick('neighbourhoods')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              activeTab === 'neighbourhoods' ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Neighbourhoods
            {activeTab === 'neighbourhoods' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              activeTab === 'about' ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            About
            {activeTab === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              activeTab === 'contact' ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Contact
            {activeTab === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          {/* AI Advisor Button */}
          {onOpenAdvisor && (
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-[#F1DBD2]/70 hover:bg-[#F1DBD2] text-[#8C3A1E] rounded transition-colors cursor-pointer border border-[#E9C3B5]"
              title="Chat with Anthony & Co. AI Property Advisor (Gemini)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor</span>
            </button>
          )}

          {/* Lyria Music Studio Button */}
          {onOpenMusicStudio && (
            <button
              onClick={onOpenMusicStudio}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 text-[#57534E] hover:text-[#1A1917] hover:bg-[#EBE7DF] rounded transition-colors cursor-pointer"
              title="Compose property soundtracks with Google Lyria"
            >
              <Music className="w-3.5 h-3.5 text-[#C25E3B]" />
              <span>Soundtracks</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Saved Properties, User Account, Valuation CTA) */}
        <div className="flex items-center gap-3 lg:gap-4">
          
          {/* Saved Properties */}
          <button
            onClick={onOpenSavedDrawer}
            className="relative flex items-center gap-2 text-[13px] font-medium text-[#1A1917] hover:text-[#C25E3B] transition-colors cursor-pointer px-2 py-1.5 rounded"
            title="View saved properties"
          >
            <Bookmark className="w-4 h-4 text-[#1A1917] fill-transparent stroke-[1.8]" />
            <span className="hidden sm:inline">Saved</span>
            {savedProperties.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-semibold text-white bg-[#C25E3B] rounded-full">
                {savedProperties.length}
              </span>
            )}
          </button>

          {/* User Sign In / Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-[13px] font-medium text-[#1A1917] px-2.5 py-1.5 border border-[#E6E3DC] bg-white rounded-md hover:border-[#1A1917] transition-colors cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#C25E3B]/15 text-[#C25E3B] flex items-center justify-center text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#75716B]" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E6E3DC] shadow-lg rounded-md py-1.5 z-50 text-[13px]">
                  <div className="px-3 py-2 border-b border-[#F3F1EC] text-xs text-[#75716B]">
                    <span className="font-semibold text-[#1A1917] block truncate">{user.name}</span>
                    <span className="text-[11px] text-[#A8A29E] block truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenSavedDrawer();
                    }}
                    className="w-full text-left px-3 py-2 text-[#1A1917] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    Saved Properties ({savedProperties.length})
                  </button>
                  {onOpenMusicStudio && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenMusicStudio();
                      }}
                      className="w-full text-left px-3 py-2 text-[#1A1917] hover:bg-[#FAF9F5] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Music className="w-3.5 h-3.5 text-[#C25E3B]" />
                      <span>My Soundtracks</span>
                    </button>
                  )}
                  {onOpenAdvisor && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdvisor();
                      }}
                      className="w-full text-left px-3 py-2 text-[#1A1917] hover:bg-[#FAF9F5] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C25E3B]" />
                      <span>Ask AI Advisor</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-[#C25E3B] hover:bg-[#FAF9F5] transition-colors cursor-pointer border-t border-[#F3F1EC]"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-[13px] font-medium text-[#1A1917] hover:text-[#C25E3B] transition-colors cursor-pointer px-3 py-1.5"
            >
              Sign In
            </button>
          )}

          {/* Book Valuation CTA */}
          <button
            onClick={onOpenValuation}
            className="hidden sm:inline-flex items-center text-[13px] font-medium bg-[#1A1917] hover:bg-[#C25E3B] text-white px-4 py-2 transition-colors cursor-pointer"
          >
            Instant Valuation
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1917] hover:text-[#C25E3B] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#E6E3DC] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-[16px] font-medium text-[#1A1917]">
            <button
              onClick={() => handleNavClick('search', 'sale')}
              className={`text-left py-2 hover:text-[#C25E3B] transition-colors ${
                isBuyActive ? 'text-[#C25E3B] font-semibold' : ''
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleNavClick('search', 'rent')}
              className={`text-left py-2 hover:text-[#C25E3B] transition-colors ${
                isRentActive ? 'text-[#C25E3B] font-semibold' : ''
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenValuation();
              }}
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
            >
              Sell & Valuation
            </button>
            <button
              onClick={() => handleNavClick('neighbourhoods')}
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
            >
              Neighbourhoods
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
            >
              Contact
            </button>

            {/* AI Advisor Mobile */}
            {onOpenAdvisor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisor();
                }}
                className="text-left py-2 text-[#8C3A1E] font-semibold flex items-center gap-2 hover:text-[#C25E3B]"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Property Advisor (Gemini)</span>
              </button>
            )}

            {/* Lyria Soundtracks Mobile */}
            {onOpenMusicStudio && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMusicStudio();
                }}
                className="text-left py-2 text-[#57534E] flex items-center gap-2 hover:text-[#1A1917]"
              >
                <Music className="w-4 h-4 text-[#C25E3B]" />
                <span>Soundtrack Studio (Lyria)</span>
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-[#E6E3DC] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenValuation();
              }}
              className="w-full py-3 bg-[#1A1917] text-white text-center text-sm font-medium hover:bg-[#C25E3B] transition-colors cursor-pointer"
            >
              Instant Valuation
            </button>

            {user ? (
              <div className="flex items-center justify-between text-xs text-[#75716B] pt-2">
                <span>Signed in as <strong className="text-[#1A1917]">{user.name}</strong></span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-[#C25E3B] font-semibold hover:underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 border border-[#1A1917] text-[#1A1917] text-center text-sm font-medium hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
