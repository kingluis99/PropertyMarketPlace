import React from 'react';
import { Bookmark, Bed, Bath, Maximize2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  isSaved: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onToggleSave,
  isSaved
}) => {
  const formatPrice = (price: number, listingType: 'sale' | 'rent', period?: string) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);

    if (listingType === 'rent') {
      return `${formatted} ${period || 'pcm'}`;
    }
    return formatted;
  };

  return (
    <article
      onClick={() => onSelect(property)}
      className="group cursor-pointer flex flex-col bg-white border border-[#E6E3DC] hover:border-[#1A1917]/30 transition-all duration-300"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F1EC]">
        <img
          src={property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* Top bar over image: Tenure/Status & Save Button */}
        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-white/95 drop-shadow-sm">
            {property.tenure}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property);
            }}
            className="pointer-events-auto p-2 bg-white/90 hover:bg-white text-[#1A1917] rounded-full shadow-sm hover:scale-110 transition-all cursor-pointer"
            aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-[#C25E3B] text-[#C25E3B]' : 'text-[#1A1917] fill-transparent'
              }`}
            />
          </button>
        </div>

        {/* Property Type Kicker at bottom left of image */}
        <div className="absolute bottom-3 left-4 text-white/95 text-xs font-medium tracking-wide drop-shadow-sm">
          {property.propertyType}
        </div>
      </div>

      {/* Property Details Content Area */}
      <div className="p-5 lg:p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-[#1A1917] tabular-nums">
              {formatPrice(property.price, property.listingType, property.pricePeriod)}
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-[#75716B]">
              {property.listingType === 'sale' ? 'For Sale' : 'To Let'}
            </span>
          </div>

          {/* Address */}
          <h3 className="text-[15px] font-semibold text-[#1A1917] group-hover:text-[#C25E3B] transition-colors line-clamp-1 mb-1">
            {property.address}
          </h3>

          {/* Short description teaser */}
          <p className="text-xs text-[#75716B] line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>
        </div>

        {/* Unboxed Metadata with · separator */}
        <div className="pt-3 border-t border-[#F3F1EC] flex items-center justify-between text-xs text-[#57534E]">
          <div className="flex items-center gap-2">
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
            <span aria-hidden="true" className="text-[#C5C0B8]">·</span>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
            <span aria-hidden="true" className="text-[#C5C0B8]">·</span>
            <span className="tabular-nums">{property.sqft.toLocaleString()} sq ft</span>
          </div>
          <span className="text-[11px] font-medium text-[#75716B]">EPC {property.epcRating}</span>
        </div>
      </div>
    </article>
  );
};
