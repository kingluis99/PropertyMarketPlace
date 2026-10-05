import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { FilterState, ListingType, PropertyType } from '../types';
import heroManchesterImg from '../assets/images/hero_manchester_terrace_1791150513168.jpg';

interface HeroSectionProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onExecuteSearch: () => void;
  onSelectQuickLocation: (location: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filter,
  setFilter,
  onExecuteSearch,
  onSelectQuickLocation
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const priceOptionsSale = [
    { label: 'No Min', value: 0 },
    { label: '£250,000', value: 250000 },
    { label: '£400,000', value: 400000 },
    { label: '£600,000', value: 600000 },
    { label: '£800,000', value: 800000 },
    { label: '£1,000,000', value: 1000000 }
  ];

  const priceOptionsRent = [
    { label: 'No Min', value: 0 },
    { label: '£1,000 pcm', value: 1000 },
    { label: '£1,300 pcm', value: 1300 },
    { label: '£1,600 pcm', value: 1600 },
    { label: '£2,000 pcm', value: 2000 },
    { label: '£2,500 pcm', value: 2500 }
  ];

  const maxPriceOptionsSale = [
    { label: 'No Max', value: 10000000 },
    { label: '£500,000', value: 500000 },
    { label: '£750,000', value: 750000 },
    { label: '£1,000,000', value: 1000000 },
    { label: '£1,500,000', value: 1500000 },
    { label: '£2,000,000+', value: 10000000 }
  ];

  const maxPriceOptionsRent = [
    { label: 'No Max', value: 20000 },
    { label: '£1,500 pcm', value: 1500 },
    { label: '£2,000 pcm', value: 2000 },
    { label: '£2,500 pcm', value: 2500 },
    { label: '£3,000 pcm', value: 3000 },
    { label: '£4,000+ pcm', value: 20000 }
  ];

  const currentMinPrices = filter.listingType === 'sale' ? priceOptionsSale : priceOptionsRent;
  const currentMaxPrices = filter.listingType === 'sale' ? maxPriceOptionsSale : maxPriceOptionsRent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSearch();
  };

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden">
      {/* Background Photography Asset: South Manchester Victorian Avenue */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroManchesterImg}
          alt="South Manchester Didsbury Victorian residential avenue"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.92]"
        />
        {/* Subtle, refined scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-16 text-center flex flex-col items-center">
        
        {/* Tagline & Confident Headline */}
        <div className="max-w-3xl mb-8 lg:mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-3">
            Greater Manchester Residential Estate Agency
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight text-balance leading-[1.12]">
            Find a place you'll love to call home.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 max-w-xl mx-auto font-light leading-relaxed">
            Thoughtfully curated Victorian villas, converted cotton mill lofts, and garden apartments across Greater Manchester's most characterful neighbourhoods.
          </p>
        </div>

        {/* Integrated Property Search Interface */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md shadow-2xl p-4 sm:p-6 text-left border border-white/20">
          
          {/* Top row: Buy / Rent Mode Toggle */}
          <div className="flex items-center justify-between border-b border-[#E6E3DC] pb-4 mb-4">
            <div className="inline-flex p-1 bg-[#F3F1EC] rounded">
              <button
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, listingType: 'sale', minPrice: 0, maxPrice: 10000000 }))}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  filter.listingType === 'sale'
                    ? 'bg-[#1A1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1A1917]'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setFilter(prev => ({ ...prev, listingType: 'rent', minPrice: 0, maxPrice: 20000 }))}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  filter.listingType === 'rent'
                    ? 'bg-[#1A1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1A1917]'
                }`}
              >
                To Rent
              </button>
            </div>

            {/* Quick Popular Greater Manchester Locations */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#75716B]">
              <span className="font-medium">Popular:</span>
              {['Didsbury', 'Ancoats', 'Chorlton', 'Altrincham'].map(loc => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onSelectQuickLocation(loc)}
                  className="hover:text-[#C25E3B] underline decoration-stone-300 underline-offset-2 transition-colors cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Main Search Form Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              
              {/* Location Input */}
              <div className="lg:col-span-5 relative">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                  Location or Postcode
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75716B]" />
                  <input
                    type="text"
                    value={filter.location}
                    onChange={(e) => setFilter(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Didsbury, M20, Ancoats, WA14..."
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#E6E3DC] text-sm text-[#1A1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1A1917] transition-colors"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                  Bedrooms
                </label>
                <select
                  value={filter.bedrooms}
                  onChange={(e) => setFilter(prev => ({ ...prev, bedrooms: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white border border-[#E6E3DC] text-sm text-[#1A1917] focus:outline-none focus:border-[#1A1917] transition-colors"
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="1">1+ Bedroom</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                  Type
                </label>
                <select
                  value={filter.propertyType}
                  onChange={(e) => setFilter(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white border border-[#E6E3DC] text-sm text-[#1A1917] focus:outline-none focus:border-[#1A1917] transition-colors"
                >
                  <option value="all">All Types</option>
                  <option value="Terraced House">Terraced House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Converted Loft">Converted Loft</option>
                  <option value="Maisonette">Maisonette</option>
                  <option value="Detached Villa">Detached Villa</option>
                </select>
              </div>

              {/* Search Action Button */}
              <div className="lg:col-span-2 sm:col-span-2 pt-1 lg:pt-5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#C25E3B] hover:bg-[#AA4F30] text-white py-3 px-4 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.2]" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Price Range Row */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#F3F1EC] text-xs">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1.5 text-[#57534E] hover:text-[#1A1917] font-medium transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showAdvanced ? 'Hide Price Filter' : 'Filter by Price Range'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              <span className="text-[#75716B] hidden sm:inline">
                Greater Manchester verified listings updated daily
              </span>
            </div>

            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-1 bg-[#FAF9F5] p-3 border border-[#E6E3DC]">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Minimum Price
                  </label>
                  <select
                    value={filter.minPrice}
                    onChange={(e) => setFilter(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                  >
                    {currentMinPrices.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Maximum Price
                  </label>
                  <select
                    value={filter.maxPrice}
                    onChange={(e) => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                  >
                    {currentMaxPrices.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
