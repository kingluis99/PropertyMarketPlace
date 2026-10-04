import React from 'react';
import { Camera, Compass, Award, Shield, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onExploreProperties: () => void;
  onOpenValuation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreProperties,
  onOpenValuation
}) => {
  return (
    <div className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
      
      {/* Hero statement */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#75716B] mb-2 block">
          Our Ethos & Philosophy
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1A1917] font-normal tracking-tight leading-[1.15]">
          A modern perspective on Greater Manchester residential property.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#57534E] leading-relaxed font-light">
          Founded in Manchester, Anthony & Co. was established on a simple premise: that buying, selling, or letting a home should be an inspiring, transparent, and aesthetically elevated experience.
        </p>
      </div>

      {/* Editorial split: Image & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F1EC] border border-[#E6E3DC]">
            <img
              src="/src/assets/images/neighbourhood_ancoats_mills_1791150524809.jpg"
              alt="Ancoats Manchester street life"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1A1917] font-normal">
            Editorial curation over transactional volume
          </h2>
          <p className="text-sm text-[#57534E] leading-relaxed font-light">
            Unlike traditional corporate estate chains, we treat every listing as an architectural profile. We invest in high-end medium-format architectural photography, carefully researched historical monographs, and styling that celebrates the authentic spatial soul of each residence.
          </p>
          <p className="text-sm text-[#57534E] leading-relaxed font-light">
            Whether representing a double-fronted Victorian villa in West Didsbury, an unadorned industrial cotton mill loft in Ancoats, or an Edwardian manor in Altrincham, our partners live and breathe these neighbourhoods.
          </p>

          <div className="pt-2 flex gap-4">
            <button
              onClick={onExploreProperties}
              className="px-6 py-3 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Our Properties
            </button>
            <button
              onClick={onOpenValuation}
              className="px-6 py-3 border border-[#E6E3DC] hover:border-[#1A1917] text-[#1A1917] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-white"
            >
              Request Valuation
            </button>
          </div>
        </div>
      </div>

      {/* Four Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-[#E6E3DC]">
        <div className="space-y-3">
          <Camera className="w-5 h-5 text-[#C25E3B]" />
          <h3 className="font-editorial text-lg text-[#1A1917]">Visual Excellence</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Every home is photographed in natural light by commissioned architectural photographers, paired with accurate CAD floorplans.
          </p>
        </div>

        <div className="space-y-3">
          <Compass className="w-5 h-5 text-[#C25E3B]" />
          <h3 className="font-editorial text-lg text-[#1A1917]">Hyper-Local Knowledge</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Our offices are situated in the beating heart of Didsbury, Ancoats, Chorlton, and Altrincham.
          </p>
        </div>

        <div className="space-y-3">
          <Award className="w-5 h-5 text-[#C25E3B]" />
          <h3 className="font-editorial text-lg text-[#1A1917]">Senior Partner Service</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            You deal directly with dedicated branch directors throughout, from initial valuation to exchange of contracts.
          </p>
        </div>

        <div className="space-y-3">
          <Shield className="w-5 h-5 text-[#C25E3B]" />
          <h3 className="font-editorial text-lg text-[#1A1917]">Integrity & Discretion</h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Full compliance with RICS and Propertymark codes of conduct, maintaining confidentiality for discrete off-market sales.
          </p>
        </div>
      </div>

    </div>
  );
};
