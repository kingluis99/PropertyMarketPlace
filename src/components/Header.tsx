import React, { useState } from 'react';
import { Bookmark, Menu, X, User, PhoneCall, ChevronDown } from 'lucide-react';
import { Property } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedProperties: Property[];
  onOpenSavedDrawer: () => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenValuation: () => void;
  onSelectPropertyType?: (type: 'sale' | 'rent') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedProperties,
  onOpenSavedDrawer,
  user,
  onOpenAuth,
  onLogout,
  onOpenValuation,
  onSelectPropertyType
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (tab: string, listingType?: 'sale' | 'rent') => {
    setActiveTab(tab);
    if (listingType && onSelectPropertyType) {
      onSelectPropertyType(listingType);
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

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#57534E]">
          <button
            onClick={() => handleNavClick('search', 'sale')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              activeTab === 'search' ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Buy
            {activeTab === 'search' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('search', 'rent')}
            className={`transition-colors hover:text-[#1A1917] cursor-pointer relative py-1 ${
              activeTab === 'rent' ? 'text-[#1A1917] font-semibold' : ''
            }`}
          >
            Rent
            {activeTab === 'rent' && (
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
        </nav>

        {/* Zone 3: 1-2 primary actions (Saved Properties & Account) */}
        <div className="flex items-center gap-4">
          
          {/* Saved Properties */}
          <button
            onClick={onOpenSavedDrawer}
            className="relative flex items-center gap-2 text-[13px] font-medium text-[#1A1917] hover:text-[#C25E3B] transition-colors cursor-pointer px-2.5 py-1.5 rounded"
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
                className="flex items-center gap-2 text-[13px] font-medium text-[#1A1917] px-3 py-1.5 border border-[#E6E3DC] bg-white rounded-md hover:border-[#1A1917] transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#C25E3B]/15 text-[#C25E3B] flex items-center justify-center text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#75716B]" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E6E3DC] shadow-lg rounded-md py-1.5 z-50 text-[13px]">
                  <div className="px-3 py-2 border-b border-[#F3F1EC] text-xs text-[#75716B]">
                    Signed in as <span className="font-semibold text-[#1A1917] block truncate">{user.email}</span>
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
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-[#C25E3B] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
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
            className="hidden lg:inline-flex items-center gap-1.5 bg-[#1A1917] text-white text-[13px] font-medium px-4 py-2 rounded hover:bg-[#C25E3B] transition-colors cursor-pointer whitespace-nowrap"
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
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
            >
              Buy
            </button>
            <button
              onClick={() => handleNavClick('search', 'rent')}
              className="text-left py-2 hover:text-[#C25E3B] transition-colors"
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
          </div>

          <div className="pt-4 border-t border-[#E6E3DC] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSavedDrawer();
              }}
              className="flex items-center justify-between text-sm py-2 text-[#1A1917]"
            >
              <span>Saved Properties</span>
              <span className="px-2 py-0.5 text-xs bg-[#C25E3B] text-white rounded-full">
                {savedProperties.length}
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenValuation();
              }}
              className="w-full text-center bg-[#C25E3B] text-white py-2.5 rounded font-medium text-sm"
            >
              Request Free Valuation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
