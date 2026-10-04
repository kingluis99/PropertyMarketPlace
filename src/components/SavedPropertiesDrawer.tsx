import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, Calendar } from 'lucide-react';
import { Property } from '../types';

interface SavedPropertiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenViewing: (property: Property) => void;
  onBrowseMore: () => void;
}

export const SavedPropertiesDrawer: React.FC<SavedPropertiesDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onSelectProperty,
  onOpenViewing,
  onBrowseMore
}) => {
  if (!isOpen) return null;

  const totalValue = savedProperties
    .filter(p => p.listingType === 'sale')
    .reduce((sum, p) => sum + p.price, 0);

  const formatPrice = (price: number, listingType: 'sale' | 'rent', period?: string) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
    if (listingType === 'rent') return `${formatted} ${period || 'pcm'}`;
    return formatted;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F5] border-l border-[#E6E3DC] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E6E3DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#C25E3B] fill-[#C25E3B]" />
            <h2 className="font-editorial text-xl text-[#1A1917]">
              Saved Properties ({savedProperties.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#75716B] hover:text-[#1A1917] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-8 h-8 text-[#C5C0B8] mx-auto" />
              <h3 className="font-editorial text-lg text-[#1A1917]">No saved properties yet</h3>
              <p className="text-xs text-[#75716B] max-w-xs mx-auto">
                Click the bookmark icon on any property to save it here for comparison and private viewing booking.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBrowseMore();
                  }}
                  className="px-4 py-2 bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C25E3B] transition-colors cursor-pointer"
                >
                  Explore Residences
                </button>
              </div>
            </div>
          ) : (
            <>
              {savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="group bg-white border border-[#E6E3DC] p-3 hover:border-[#1A1917] transition-all flex gap-3"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="w-20 h-20 shrink-0 bg-[#F3F1EC] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-bold text-[#1A1917] tabular-nums">
                          {formatPrice(prop.price, prop.listingType, prop.pricePeriod)}
                        </span>
                        <button
                          onClick={() => onRemoveSaved(prop.id)}
                          className="text-[#A8A29E] hover:text-[#C25E3B] transition-colors p-0.5 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        className="text-xs font-medium text-[#1A1917] hover:text-[#C25E3B] truncate cursor-pointer mt-0.5"
                      >
                        {prop.address}
                      </p>
                      <p className="text-[11px] text-[#75716B]">
                        {prop.bedrooms} bed · {prop.propertyType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-1 border-t border-[#F3F1EC]">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenViewing(prop);
                        }}
                        className="text-[11px] font-semibold text-[#C25E3B] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book Viewing</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer with portfolio summary */}
        {savedProperties.length > 0 && (
          <div className="p-6 border-t border-[#E6E3DC] bg-white space-y-3">
            {totalValue > 0 && (
              <div className="flex items-center justify-between text-xs text-[#57534E]">
                <span>Combined Sales Portfolio:</span>
                <span className="font-bold text-[#1A1917] tabular-nums">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                    maximumFractionDigits: 0
                  }).format(totalValue)}
                </span>
              </div>
            )}
            <button
              onClick={() => {
                onClose();
                onBrowseMore();
              }}
              className="w-full py-2.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
