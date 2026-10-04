import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface SellerSectionProps {
  onOpenValuationModal: () => void;
  onContactAgent: () => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({
  onOpenValuationModal,
  onContactAgent
}) => {
  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Lifestyle / Property Photography */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F1EC] border border-[#E6E3DC]">
            <img
              src="/src/assets/images/seller_valuation_living_1791149595710.jpg"
              alt="Architect designed British living room"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle photographic corner caption */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] text-[#57534E] font-medium border border-[#E6E3DC]">
              West Didsbury Villa · Marketed & Sold by Anthony & Co.
            </div>
          </div>
        </div>

        {/* Homeowner Pitch & CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#75716B] mb-2">
              For Homeowners
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1917] tracking-tight">
              Thinking of selling?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
            We represent exceptional Greater Manchester and Cheshire homes with editorial photography, cinematic film, and targeted marketing that reaches qualified buyers locally and nationally.
          </p>

          <div className="space-y-3 pt-2 text-xs text-[#2D2B28]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C25E3B] shrink-0" />
              <span>Bespoke editorial photography and architectural styling</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C25E3B] shrink-0" />
              <span>Comprehensive database of active pre-qualified Manchester & Cheshire buyers</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C25E3B] shrink-0" />
              <span>Partner-led representation from first appraisal to completion</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenValuationModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C25E3B] hover:bg-[#AA4F30] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Request a Valuation</span>
            </button>

            <button
              onClick={onContactAgent}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#1A1917] hover:bg-[#1A1917] hover:text-white text-[#1A1917] text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer bg-white"
            >
              <span>Speak to an Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#75716B]">
            No obligation · Confidential market appraisal · Virtual or in-person
          </p>
        </div>

      </div>
    </section>
  );
};
