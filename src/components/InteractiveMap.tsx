import React, { useState } from 'react';
import { MapPin, Navigation, Eye, Bookmark, X } from 'lucide-react';
import { Property } from '../types';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (property: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  onSelectProperty,
  savedPropertyIds,
  onToggleSave
}) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(properties[0] || null);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  const formatPriceShort = (price: number, listingType: 'sale' | 'rent') => {
    if (listingType === 'rent') {
      return `£${(price / 1000).toFixed(1)}k/m`;
    }
    if (price >= 1000000) {
      return `£${(price / 1000000).toFixed(2)}M`;
    }
    return `£${Math.round(price / 1000)}k`;
  };

  const previewTarget = hoveredProperty || activeProperty;

  return (
    <div className="relative w-full h-[650px] bg-[#F4F1EA] border border-[#E6E3DC] overflow-hidden select-none">
      
      {/* SVG Stylised Greater Manchester Map Canvas */}
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="merseyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CCD9E2" />
            <stop offset="100%" stopColor="#BCCFD9" />
          </linearGradient>
        </defs>

        {/* Map Background Base */}
        <rect width="1000" height="650" fill="#FAF8F3" />

        {/* Greater Manchester District Boundaries (Subtle hairlines) */}
        <path
          d="M 150 50 L 320 180 L 450 140 L 620 190 L 850 120 L 980 260"
          fill="none"
          stroke="#ECE7DE"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />
        <path
          d="M 280 180 L 320 380 L 440 460 L 680 420 L 880 500"
          fill="none"
          stroke="#ECE7DE"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />

        {/* Major Parks & Nature Reserves in Greater Manchester */}
        {/* Fletcher Moss Botanical Gardens (Didsbury) */}
        <g id="fletcher-moss">
          <path
            d="M 480 460 C 530 450, 580 470, 570 510 C 530 525, 480 510, 480 460 Z"
            fill="#E1EAD8"
            stroke="#D0DDC4"
            strokeWidth="1"
          />
          <text x="530" y="488" fontSize="9" fill="#7A8D6D" fontWeight="500" textAnchor="middle" letterSpacing="0.05em">
            FLETCHER MOSS
          </text>
        </g>

        {/* Chorlton Water Park & Meadows */}
        <g id="chorlton-water-park">
          <ellipse cx="410" cy="425" rx="55" ry="35" fill="#E1EAD8" stroke="#D0DDC4" strokeWidth="1" />
          <ellipse cx="405" cy="425" rx="20" ry="12" fill="#CCD9E2" />
          <text x="410" y="448" fontSize="8" fill="#7A8D6D" fontWeight="500" textAnchor="middle">
            CHORLTON WATER PARK
          </text>
        </g>

        {/* Heaton Park (North Manchester) */}
        <g id="heaton-park">
          <rect x="440" y="40" width="130" height="60" rx="10" fill="#E1EAD8" stroke="#D0DDC4" strokeWidth="1" />
          <text x="505" y="75" fontSize="10" fill="#7A8D6D" fontWeight="500" textAnchor="middle" letterSpacing="0.05em">
            HEATON PARK
          </text>
        </g>

        {/* Stamford Park & Dunham Massey (Altrincham) */}
        <g id="stamford-park">
          <polygon points="260,540 330,520 340,570 270,590" fill="#E1EAD8" stroke="#D0DDC4" strokeWidth="1" />
          <text x="300" y="560" fontSize="8" fill="#7A8D6D" fontWeight="500" textAnchor="middle">
            STAMFORD PARK
          </text>
        </g>

        {/* River Irwell / Manchester Ship Canal */}
        <path
          d="M 360 80 C 420 180, 480 230, 490 270 C 470 310, 410 320, 310 340 C 220 360, 140 370, 50 380"
          fill="none"
          stroke="#CCD9E2"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text x="400" y="300" fontSize="8" fill="#889DAF" fontStyle="italic" letterSpacing="0.05em">
          River Irwell
        </text>

        {/* River Mersey (Flowing across South Manchester: Didsbury & Chorlton) */}
        <path
          d="M 850 510 C 720 490, 620 530, 530 490 C 450 450, 380 480, 260 460 C 180 440, 100 460, 20 470"
          fill="none"
          stroke="url(#merseyGrad)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <text x="640" y="520" fontSize="10" fill="#7A93A6" letterSpacing="0.15em" fontWeight="600" opacity="0.75">
          R I V E R   M E R S E Y
        </text>

        {/* Rochdale & Ashton Canals into Ancoats Basin */}
        <path
          d="M 520 220 C 560 230, 600 240, 640 250 C 680 270, 750 280, 830 300"
          fill="none"
          stroke="#CCD9E2"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="610" y="240" fontSize="8" fill="#889DAF" fontStyle="italic">
          Rochdale Canal
        </text>

        {/* Bridgewater Canal through Castlefield & Altrincham */}
        <path
          d="M 490 280 C 440 310, 390 380, 350 450 C 320 510, 290 560, 260 620"
          fill="none"
          stroke="#CCD9E2"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text x="350" y="490" fontSize="8" fill="#889DAF" fontStyle="italic" transform="rotate(45, 350, 490)">
          Bridgewater Canal
        </text>

        {/* Key Greater Manchester District Labels */}
        <text x="560" y="235" fontSize="13" fill="#6B665E" fontWeight="700" letterSpacing="0.15em">
          ANCOATS & NQ
        </text>
        <text x="460" y="285" fontSize="12" fill="#78736B" fontWeight="600" letterSpacing="0.1em">
          CASTLEFIELD
        </text>
        <text x="500" y="195" fontSize="14" fill="#3D3A36" fontWeight="700" letterSpacing="0.15em">
          MANCHESTER CITY CENTRE
        </text>
        <text x="390" y="250" fontSize="12" fill="#8C8880" fontWeight="600" letterSpacing="0.1em">
          SALFORD
        </text>
        <text x="380" y="390" fontSize="13" fill="#6B665E" fontWeight="700" letterSpacing="0.1em">
          CHORLTON
        </text>
        <text x="510" y="445" fontSize="13" fill="#6B665E" fontWeight="700" letterSpacing="0.1em">
          DIDSBURY
        </text>
        <text x="250" y="530" fontSize="13" fill="#6B665E" fontWeight="700" letterSpacing="0.1em">
          ALTRINCHAM & HALE
        </text>
        <text x="680" y="470" fontSize="12" fill="#8C8880" fontWeight="600" letterSpacing="0.1em">
          STOCKPORT & HEATONS
        </text>
      </svg>

      {/* Interactive HTML Map Pins positioned via percentage coordinates */}
      <div className="absolute inset-0 pointer-events-none">
        {properties.map((prop) => {
          const isSelected = activeProperty?.id === prop.id;
          const isHovered = hoveredProperty?.id === prop.id;

          // Map coordinate percentages to canvas layout
          const leftPercent = 10 + prop.coordinates.x * 0.82;
          const topPercent = 8 + prop.coordinates.y * 0.85;

          return (
            <div
              key={prop.id}
              style={{
                left: `${Math.max(8, Math.min(90, leftPercent))}%`,
                top: `${Math.max(10, Math.min(88, topPercent))}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-full pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveProperty(prop);
                }}
                onMouseEnter={() => setHoveredProperty(prop)}
                onMouseLeave={() => setHoveredProperty(null)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded shadow-md transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C25E3B] text-white scale-110 ring-4 ring-[#C25E3B]/25 z-30'
                    : isHovered
                    ? 'bg-[#1A1917] text-white scale-105 z-20'
                    : 'bg-white text-[#1A1917] border border-[#E6E3DC] hover:border-[#1A1917] z-10'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-[#C25E3B]'
                  }`}
                />
                <span className="text-xs font-bold tracking-tight whitespace-nowrap tabular-nums">
                  {formatPriceShort(prop.price, prop.listingType)}
                </span>
              </button>

              {/* Pin indicator pointer */}
              <div
                className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${
                  isSelected ? 'bg-[#C25E3B]' : isHovered ? 'bg-[#1A1917]' : 'bg-white border-r border-b border-[#E6E3DC]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Active Property Preview Card */}
      {previewTarget && (
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-[380px] bg-white border border-[#E6E3DC] shadow-xl p-4 z-40 animate-in fade-in duration-200">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#75716B]">
              {previewTarget.area} · {previewTarget.tenure}
            </span>
            <button
              onClick={() => {
                setActiveProperty(null);
                setHoveredProperty(null);
              }}
              className="text-[#75716B] hover:text-[#1A1917] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="w-24 h-24 shrink-0 bg-[#F3F1EC] overflow-hidden">
              <img
                src={previewTarget.images[0]}
                alt={previewTarget.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-grow min-w-0">
              <div>
                <p className="text-lg font-bold text-[#1A1917] tabular-nums leading-snug">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                    maximumFractionDigits: 0
                  }).format(previewTarget.price)}
                  {previewTarget.listingType === 'rent' ? ' pcm' : ''}
                </p>
                <p className="text-xs font-medium text-[#1A1917] truncate mt-0.5">
                  {previewTarget.address}
                </p>
                <p className="text-[11px] text-[#75716B] mt-1">
                  {previewTarget.bedrooms} bed · {previewTarget.bathrooms} bath · {previewTarget.sqft} sq ft
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onSelectProperty(previewTarget)}
                  className="flex-1 py-1.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => onToggleSave(previewTarget)}
                  className="p-1.5 border border-[#E6E3DC] hover:border-[#1A1917] text-[#1A1917] transition-colors cursor-pointer"
                  title="Save property"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      savedPropertyIds.includes(previewTarget.id)
                        ? 'fill-[#C25E3B] text-[#C25E3B]'
                        : 'text-[#1A1917]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Helper Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-[#E6E3DC] px-3 py-2 text-[11px] text-[#57534E] hidden sm:flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C25E3B]" /> For Sale / To Let
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2 rounded-sm bg-[#E1EAD8] border border-[#D0DDC4]" /> Parks & Greenery
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-1.5 rounded-sm bg-[#CCD9E2]" /> Mersey & Canals
        </span>
      </div>
    </div>
  );
};
