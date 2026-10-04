import React, { useState } from 'react';
import { X, Calculator, CheckCircle2, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { PropertyType } from '../types';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [postcode, setPostcode] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Terraced House');
  const [bedrooms, setBedrooms] = useState(3);
  const [condition, setCondition] = useState<'Excellent' | 'Good' | 'Needs Modernisation'>('Good');
  
  // Contact details for formal appraisal
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');

  if (!isOpen) return null;

  // Algorithmic estimate calculation based on inputs
  const calculateEstimate = () => {
    let base = 350000;
    if (propertyType === 'Terraced House') base = 420000;
    if (propertyType === 'Converted Loft') base = 330000;
    if (propertyType === 'Apartment') base = 250000;
    if (propertyType === 'Maisonette') base = 360000;
    if (propertyType === 'Period Cottage') base = 480000;

    const bedMultiplier = 1 + (bedrooms - 1) * 0.35;
    const condMultiplier = condition === 'Excellent' ? 1.18 : condition === 'Good' ? 1.0 : 0.85;

    // Check postcode weight
    const cleanPostcode = postcode.trim().toUpperCase();
    let areaMultiplier = 1.0;
    if (cleanPostcode.startsWith('WA14') || cleanPostcode.startsWith('WA15')) areaMultiplier = 1.45;
    else if (cleanPostcode.startsWith('M20')) areaMultiplier = 1.35;
    else if (cleanPostcode.startsWith('SK4')) areaMultiplier = 1.25;
    else if (cleanPostcode.startsWith('M21')) areaMultiplier = 1.2;
    else if (cleanPostcode.startsWith('M4') || cleanPostcode.startsWith('M1') || cleanPostcode.startsWith('M3')) areaMultiplier = 1.15;

    const estimatedMid = Math.round(base * bedMultiplier * condMultiplier * areaMultiplier / 10000) * 10000;
    const min = Math.round(estimatedMid * 0.94 / 10000) * 10000;
    const max = Math.round(estimatedMid * 1.06 / 10000) * 10000;

    return { min, max };
  };

  const { min, max } = calculateEstimate();

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F5] border border-[#E6E3DC] w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#75716B] hover:text-[#1A1917] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-wider text-[#75716B] font-semibold">
          <span className={step >= 1 ? 'text-[#C25E3B]' : ''}>1. Property Details</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#C25E3B]' : ''}>2. Estimate</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-[#C25E3B]' : ''}>3. Confirmation</span>
        </div>

        {/* Step 1: Details */}
        {step === 1 && (
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1A1917] font-normal mb-2">
              Instant Property Valuation
            </h2>
            <p className="text-xs text-[#75716B] mb-6">
              Receive a data-backed market valuation range based on recent verified Greater Manchester sales.
            </p>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                  Postcode
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M20 6UR, M4 5BF, WA14 1QU, M21 9EQ..."
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E6E3DC] text-sm text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                  >
                    <option value="Terraced House">Terraced House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Converted Loft">Converted Loft</option>
                    <option value="Maisonette">Maisonette</option>
                    <option value="Period Cottage">Period Cottage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                  >
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4 Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                  Interior Condition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Excellent', 'Good', 'Needs Modernisation'] as const).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCondition(c)}
                      className={`p-2 text-xs border text-center transition-colors cursor-pointer ${
                        condition === c
                          ? 'border-[#1A1917] bg-[#1A1917] text-white font-medium'
                          : 'border-[#E6E3DC] bg-white text-[#57534E] hover:border-[#1A1917]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C25E3B] hover:bg-[#AA4F30] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Valuation Range</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Estimate Display & Formal Booking */}
        {step === 2 && (
          <div>
            <span className="text-xs uppercase tracking-wider text-[#C25E3B] font-semibold">Valuation Result</span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1A1917] font-normal mt-1 mb-4">
              Estimated Market Value
            </h2>

            <div className="p-6 bg-white border border-[#E6E3DC] text-center mb-6">
              <span className="text-xs text-[#75716B] uppercase tracking-wider">Estimated Guide Range</span>
              <div className="font-editorial text-3xl sm:text-4xl text-[#1A1917] font-medium mt-2 tabular-nums">
                {formatCurrency(min)} – {formatCurrency(max)}
              </div>
              <p className="text-xs text-[#57534E] mt-2">
                Based on {bedrooms}-bed {propertyType.toLowerCase()} in {postcode.toUpperCase()} in {condition.toLowerCase()} condition.
              </p>
            </div>

            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1A1917] mb-2">
              Book a Certified RICS Partner Appraisal
            </h3>
            <p className="text-xs text-[#75716B] mb-4">
              Every home has unique nuances—natural light, ceiling height, and garden aspect. Meet with our local director for an accurate in-person report.
            </p>

            <form onSubmit={handleStep2Submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
              />

              <input
                type="text"
                placeholder="Full Property Street Address (optional)"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
              />

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-4 border border-[#E6E3DC] text-xs text-[#57534E] hover:border-[#1A1917] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Confirm Valuation Appraisal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#1A1917]">
              Valuation Request Confirmed
            </h3>
            <p className="text-xs text-[#57534E] max-w-md mx-auto leading-relaxed">
              Thank you, {name || 'Homeowner'}. Your local Anthony & Co. partner will contact you shortly at <span className="font-semibold text-[#1A1917]">{email || phone}</span> to arrange a convenient time for your private market appraisal.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C25E3B] transition-colors cursor-pointer"
              >
                Return to Properties
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
