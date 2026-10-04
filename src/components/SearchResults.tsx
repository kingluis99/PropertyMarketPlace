import React, { useState, useMemo } from 'react';
import { FilterState, Property, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { InteractiveMap } from './InteractiveMap';
import { LayoutGrid, Map, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface SearchResultsProps {
  properties: Property[];
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onSelectProperty: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (property: Property) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  properties,
  filter,
  setFilter,
  onSelectProperty,
  savedPropertyIds,
  onToggleSave
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Filter and sort the properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Listing type (sale vs rent)
      if (prop.listingType !== filter.listingType) return false;

      // Location search match (address, area, postcode)
      if (filter.location.trim()) {
        const query = filter.location.toLowerCase();
        const matchesLoc =
          prop.address.toLowerCase().includes(query) ||
          prop.area.toLowerCase().includes(query) ||
          prop.postcode.toLowerCase().includes(query) ||
          prop.title.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }

      // Price filter
      if (prop.price < filter.minPrice) return false;
      if (filter.maxPrice > 0 && prop.price > filter.maxPrice) return false;

      // Bedrooms filter
      if (filter.bedrooms !== 'all') {
        const requiredBeds = parseInt(filter.bedrooms, 10);
        if (filter.bedrooms === '4+' && prop.bedrooms < 4) return false;
        if (filter.bedrooms !== '4+' && prop.bedrooms !== requiredBeds) return false;
      }

      // Property type filter
      if (filter.propertyType !== 'all' && prop.propertyType !== filter.propertyType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price-asc') return a.price - b.price;
      if (filter.sortBy === 'price-desc') return b.price - a.price;
      if (filter.sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, filter]);

  const handleResetFilters = () => {
    setFilter({
      listingType: filter.listingType,
      location: '',
      minPrice: 0,
      maxPrice: filter.listingType === 'sale' ? 10000000 : 20000,
      bedrooms: 'all',
      propertyType: 'all',
      sortBy: 'featured'
    });
  };

  return (
    <div className="py-10 lg:py-16 max-w-7xl mx-auto px-6 lg:px-12">
      
      {/* Top Breadcrumb & Page Heading */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#75716B] mb-2">
          <span>Anthony & Co.</span>
          <span>/</span>
          <span>Properties {filter.listingType === 'sale' ? 'For Sale' : 'To Rent'}</span>
          {filter.location && (
            <>
              <span>/</span>
              <span className="text-[#1A1917] font-semibold">{filter.location}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#1A1917] font-normal tracking-tight">
              {filter.listingType === 'sale' ? 'Properties For Sale' : 'Properties To Rent'}
              {filter.location ? ` in "${filter.location}"` : ' in Greater Manchester'}
            </h1>
            <p className="mt-1 text-sm text-[#75716B]">
              Showing <span className="font-semibold text-[#1A1917]">{filteredProperties.length}</span> verified residential {filteredProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* List vs Map View Mode Switcher */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-[#F3F1EC] rounded border border-[#E6E3DC]">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#1A1917] shadow-sm font-semibold'
                    : 'text-[#75716B] hover:text-[#1A1917]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-white text-[#1A1917] shadow-sm font-semibold'
                    : 'text-[#75716B] hover:text-[#1A1917]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Header Bar */}
      <div className="bg-white border border-[#E6E3DC] p-4 lg:p-5 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Sale/Rent switch */}
          <div className="inline-flex p-0.5 bg-[#F3F1EC] rounded">
            <button
              onClick={() => setFilter(prev => ({ ...prev, listingType: 'sale', minPrice: 0, maxPrice: 10000000 }))}
              className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded transition-colors cursor-pointer ${
                filter.listingType === 'sale'
                  ? 'bg-[#1A1917] text-white'
                  : 'text-[#57534E] hover:text-[#1A1917]'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setFilter(prev => ({ ...prev, listingType: 'rent', minPrice: 0, maxPrice: 20000 }))}
              className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded transition-colors cursor-pointer ${
                filter.listingType === 'rent'
                  ? 'bg-[#1A1917] text-white'
                  : 'text-[#57534E] hover:text-[#1A1917]'
              }`}
            >
              Rent
            </button>
          </div>

          {/* Location search bar */}
          <div className="flex-1 min-w-[200px] max-w-sm">
            <input
              type="text"
              value={filter.location}
              onChange={(e) => setFilter(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Search area, street or postcode..."
              className="w-full px-3.5 py-1.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1A1917]"
            />
          </div>

          {/* Quick Selects */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Bedrooms */}
            <select
              value={filter.bedrooms}
              onChange={(e) => setFilter(prev => ({ ...prev, bedrooms: e.target.value }))}
              className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917]"
            >
              <option value="all">Any Beds</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4+">4+ Beds</option>
            </select>

            {/* Property Type */}
            <select
              value={filter.propertyType}
              onChange={(e) => setFilter(prev => ({ ...prev, propertyType: e.target.value }))}
              className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917]"
            >
              <option value="all">All Types</option>
              <option value="Terraced House">Terraced House</option>
              <option value="Apartment">Apartment</option>
              <option value="Converted Loft">Converted Loft</option>
              <option value="Maisonette">Maisonette</option>
              <option value="Period Cottage">Period Cottage</option>
            </select>

            {/* Sort order */}
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Reset button */}
            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="p-1.5 text-[#75716B] hover:text-[#C25E3B] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Results Presentation */}
      {viewMode === 'map' ? (
        <div className="space-y-6">
          <InteractiveMap
            properties={filteredProperties}
            onSelectProperty={onSelectProperty}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={onToggleSave}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onToggleSave={onToggleSave}
                isSaved={savedPropertyIds.includes(property.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {filteredProperties.length === 0 ? (
            <div className="py-20 text-center bg-white border border-[#E6E3DC] p-8 max-w-lg mx-auto">
              <h3 className="font-editorial text-2xl text-[#1A1917] mb-2">No matching properties</h3>
              <p className="text-sm text-[#75716B] mb-6 leading-relaxed">
                We couldn't find any homes matching your criteria. Try adjusting your filters or expanding your search radius.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C25E3B] transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  onToggleSave={onToggleSave}
                  isSaved={savedPropertyIds.includes(property.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};
