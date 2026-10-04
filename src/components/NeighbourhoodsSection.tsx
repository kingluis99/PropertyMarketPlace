import React, { useState } from 'react';
import { ArrowRight, Train, GraduationCap, Utensils, Trees, ShoppingBag, Compass } from 'lucide-react';
import { NEIGHBOURHOODS } from '../data/neighbourhoods';
import { Neighbourhood } from '../types';

interface NeighbourhoodsSectionProps {
  onSelectNeighbourhood: (areaName: string) => void;
}

export const NeighbourhoodsSection: React.FC<NeighbourhoodsSectionProps> = ({
  onSelectNeighbourhood
}) => {
  const [selectedGuide, setSelectedGuide] = useState<Neighbourhood | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-[#F3F1EC] border-y border-[#E6E3DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#75716B] mb-2">
            Local Life & Culture
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1917] tracking-tight">
            Discover the neighbourhood
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed">
            Finding a home is also about finding your street, your morning bakery, and your community. Explore the distinct character of our beloved Greater Manchester enclaves.
          </p>
        </div>

        {/* Neighbourhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {NEIGHBOURHOODS.map((hood) => (
            <article
              key={hood.id}
              className="group bg-white border border-[#E6E3DC] hover:border-[#1A1917]/30 transition-all duration-300 flex flex-col"
            >
              {/* Lifestyle Photography Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF9F5]">
                <img
                  src={hood.image}
                  alt={hood.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Overlay Area Tagline */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-semibold opacity-85 block mb-1">
                    {hood.borough}
                  </span>
                  <h3 className="font-editorial text-2xl lg:text-3xl font-normal text-white">
                    {hood.name}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 lg:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                    {hood.description}
                  </p>

                  {/* Character & Key Pillars */}
                  <div className="space-y-3 pt-4 border-t border-[#F3F1EC] text-xs">
                    <div className="flex items-start gap-3">
                      <Compass className="w-4 h-4 text-[#C25E3B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1A1917]">Atmosphere: </span>
                        <span className="text-[#57534E]">{hood.character}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Train className="w-4 h-4 text-[#C25E3B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1A1917]">Connections: </span>
                        <span className="text-[#57534E]">{hood.transport.slice(0, 2).join(' · ')}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Trees className="w-4 h-4 text-[#C25E3B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#1A1917]">Highlights: </span>
                        <span className="text-[#57534E]">{hood.highlights.slice(0, 2).join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="mt-8 pt-6 border-t border-[#F3F1EC] flex items-center justify-between">
                  <button
                    onClick={() => onSelectNeighbourhood(hood.name)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#1A1917] hover:text-[#C25E3B] transition-colors cursor-pointer"
                  >
                    <span>Explore Properties in {hood.name.split('&')[0].trim()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedGuide(hood)}
                    className="text-xs text-[#75716B] hover:text-[#1A1917] underline underline-offset-4 cursor-pointer"
                  >
                    Area Guide
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Area Guide Modal View */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] border border-[#E6E3DC] max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#E6E3DC] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#75716B]">{selectedGuide.borough}</span>
                <h3 className="font-editorial text-3xl text-[#1A1917] mt-1">{selectedGuide.name}</h3>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="text-xs uppercase tracking-wider font-semibold text-[#75716B] hover:text-[#1A1917] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <p className="text-base text-[#2D2B28] leading-relaxed font-light">{selectedGuide.description}</p>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white border border-[#E6E3DC]">
                <h4 className="font-semibold text-[#1A1917] mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#C25E3B]" /> Schools & Education
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[#57534E]">
                  {selectedGuide.schools.map((school, i) => (
                    <li key={i}>{school}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E6E3DC]">
                <h4 className="font-semibold text-[#1A1917] mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#C25E3B]" /> Local Gastronomy & Amenities
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[#57534E]">
                  {selectedGuide.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white border border-[#E6E3DC]">
                <h4 className="font-semibold text-[#1A1917] mb-2 flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#C25E3B]" /> Transit Times
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[#57534E]">
                  {selectedGuide.transport.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  const area = selectedGuide.name;
                  setSelectedGuide(null);
                  onSelectNeighbourhood(area);
                }}
                className="px-6 py-3 bg-[#1A1917] text-white hover:bg-[#C25E3B] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Available Homes Here
              </button>
              <button
                onClick={() => setSelectedGuide(null)}
                className="text-xs text-[#75716B] hover:text-[#1A1917] cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
