import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  savedPropertyIds: string[];
  onViewAll: (type?: 'sale' | 'rent') => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onSelectProperty,
  onToggleSave,
  savedPropertyIds,
  onViewAll
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sale' | 'rent'>('all');

  const filteredProperties = properties
    .filter(p => p.featured)
    .filter(p => (activeCategory === 'all' ? true : p.listingType === activeCategory))
    .slice(0, 6);

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#75716B] mb-2">
            Selected Residences
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1917] tracking-tight">
            Featured Properties
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#75716B] max-w-xl">
            A distinctive portfolio of architecturally refined houses, garden apartments, and lofts currently on the market.
          </p>
        </div>

        {/* Category Controls & View All Link */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex p-1 bg-[#F3F1EC] rounded">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#1A1917] shadow-sm font-semibold'
                  : 'text-[#57534E] hover:text-[#1A1917]'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setActiveCategory('sale')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'sale'
                  ? 'bg-white text-[#1A1917] shadow-sm font-semibold'
                  : 'text-[#57534E] hover:text-[#1A1917]'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setActiveCategory('rent')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'rent'
                  ? 'bg-white text-[#1A1917] shadow-sm font-semibold'
                  : 'text-[#57534E] hover:text-[#1A1917]'
              }`}
            >
              To Rent
            </button>
          </div>

          <button
            onClick={() => onViewAll(activeCategory === 'all' ? undefined : activeCategory)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1917] hover:text-[#C25E3B] transition-colors cursor-pointer pl-2"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Photography-Dominant Cards Grid */}
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

      {/* Bottom CTA Banner */}
      <div className="mt-16 text-center">
        <button
          onClick={() => onViewAll()}
          className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#1A1917] text-white hover:bg-[#C25E3B] transition-colors text-xs uppercase tracking-wider font-semibold cursor-pointer"
        >
          <span>Browse All Greater Manchester Properties ({properties.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
