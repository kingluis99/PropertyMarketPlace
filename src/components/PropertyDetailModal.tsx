import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Calendar,
  Bed,
  Bath,
  Maximize2,
  Train,
  CheckCircle,
  Phone,
  Mail,
  ChevronRight,
  Layers,
  MapPin,
  Check,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
  onOpenViewingModal: (property: Property) => void;
  onOpenAdvisorWithProperty?: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenViewingModal,
  onOpenAdvisorWithProperty
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'transport'>('overview');
  const [agentFormSent, setAgentFormSent] = useState(false);
  const [agentMessage, setAgentMessage] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveTab('overview');
    setAgentFormSent(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAgentFormSent(true);
  };

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#FAF9F5] min-h-screen sm:min-h-0 sm:my-auto shadow-2xl border border-[#E6E3DC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#75716B]">
              {property.area} · {property.propertyType}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-[#57534E] hover:text-[#1A1917] transition-colors cursor-pointer rounded"
              title="Share property"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleSave(property)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E6E3DC] hover:border-[#1A1917] text-xs font-medium text-[#1A1917] bg-white transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C25E3B] text-[#C25E3B]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Property'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#57534E] hover:text-[#1A1917] transition-colors cursor-pointer rounded"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photography Showcase Area */}
        <div className="relative bg-[#1A1917] overflow-hidden">
          {/* Main Selected Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[560px] bg-stone-900">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={`${property.title} - View ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail Gallery Strip */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 overflow-x-auto p-1.5 bg-black/40 backdrop-blur-md rounded max-w-fit">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 overflow-hidden rounded border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-white scale-105'
                      : 'border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editorial Property Content Body */}
        <div className="p-6 sm:p-10 lg:p-12 space-y-12">
          
          {/* Headline & Pricing Bar */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-8 border-b border-[#E6E3DC]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#C25E3B] mb-2">
                <span>{property.listingType === 'sale' ? 'For Sale' : 'To Let'}</span>
                <span>·</span>
                <span>{property.tenure}</span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1A1917] font-normal leading-snug">
                {property.title}
              </h1>
              <p className="text-base text-[#75716B] mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#75716B]" />
                {property.address}
              </p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <div className="text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1917] tabular-nums">
                {formatPrice(property.price, property.listingType, property.pricePeriod)}
              </div>
              <p className="text-xs text-[#75716B] mt-1">
                {property.listingType === 'sale' ? 'Guide Price' : 'Monthly Rent'} · Stamp Duty / Deposit applies
              </p>
            </div>
          </div>

          {/* Key Specifications Grid (Clean unboxed typographic layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-b border-[#E6E3DC]">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#75716B] font-semibold">Bedrooms</span>
              <span className="text-lg font-bold text-[#1A1917] mt-1 block">{property.bedrooms} Double Beds</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#75716B] font-semibold">Bathrooms</span>
              <span className="text-lg font-bold text-[#1A1917] mt-1 block">{property.bathrooms} Bathrooms</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#75716B] font-semibold">Internal Area</span>
              <span className="text-lg font-bold text-[#1A1917] mt-1 block tabular-nums">{property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#75716B] font-semibold">Energy & Council</span>
              <span className="text-lg font-bold text-[#1A1917] mt-1 block">EPC {property.epcRating} · {property.councilTaxBand}</span>
            </div>
          </div>

          {/* Content Navigation Tabs */}
          <div className="border-b border-[#E6E3DC] flex gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === 'overview' ? 'text-[#1A1917]' : 'text-[#75716B] hover:text-[#1A1917]'
              }`}
            >
              Overview & Architecture
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === 'floorplan' ? 'text-[#1A1917]' : 'text-[#75716B] hover:text-[#1A1917]'
              }`}
            >
              Floor Plan & Dimensions
              {activeTab === 'floorplan' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === 'transport' ? 'text-[#1A1917]' : 'text-[#75716B] hover:text-[#1A1917]'
              }`}
            >
              Location & Transport
              {activeTab === 'transport' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
              )}
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#75716B] mb-3">
                    Architectural Overview
                  </h3>
                  <div className="space-y-4 text-base text-[#2D2B28] leading-relaxed font-light">
                    {property.longDescription.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#75716B] mb-4">
                    Key Features & Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1A1917]">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#C25E3B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Action Box & Agent Profile */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Primary Action Card */}
                <div className="bg-white border border-[#E6E3DC] p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#1A1917] uppercase tracking-wider">
                    Arrange a Viewing
                  </h4>
                  <p className="text-xs text-[#75716B] leading-relaxed">
                    Viewings are conducted strictly by appointment with our local branch partners.
                  </p>
                  <button
                    onClick={() => onOpenViewingModal(property)}
                    className="w-full py-3 bg-[#C25E3B] hover:bg-[#AA4F30] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>

                  {/* AI Advisor integration */}
                  {onOpenAdvisorWithProperty && (
                    <div className="pt-2 border-t border-[#F3F1EC]">
                      <button
                        onClick={() => onOpenAdvisorWithProperty(property)}
                        className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#F1DBD2] text-[#8C3A1E] border border-[#E9C3B5] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Consult AI Advisor About This Home</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Agent Card */}
                <div className="bg-white border border-[#E6E3DC] p-6">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#75716B]">
                    Listing Specialist
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1A1917] text-white flex items-center justify-center font-bold text-sm">
                      {property.agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1917]">{property.agent.name}</h4>
                      <p className="text-xs text-[#75716B]">{property.agent.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#F3F1EC] space-y-2 text-xs text-[#57534E]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#75716B]" />
                      <a href={`tel:${property.agent.phone}`} className="hover:text-[#C25E3B]">{property.agent.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#75716B]" />
                      <a href={`mailto:${property.agent.email}`} className="hover:text-[#C25E3B] truncate">{property.agent.email}</a>
                    </div>
                  </div>

                  {/* Quick Enquiry Form */}
                  <div className="mt-6 pt-6 border-t border-[#F3F1EC]">
                    {agentFormSent ? (
                      <div className="p-3 bg-stone-50 border border-stone-200 text-xs text-stone-800 text-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                        <p className="font-semibold">Enquiry dispatched</p>
                        <p className="text-stone-500 mt-0.5">We will respond within 2 business hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleAgentSubmit} className="space-y-3">
                        <span className="block text-xs font-semibold text-[#1A1917]">Send Quick Enquiry</span>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#E6E3DC] focus:outline-none focus:border-[#1A1917]"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Contact Number"
                          value={agentPhone}
                          onChange={(e) => setAgentPhone(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#E6E3DC] focus:outline-none focus:border-[#1A1917]"
                        />
                        <textarea
                          rows={2}
                          placeholder="I would like more information on this property..."
                          value={agentMessage}
                          onChange={(e) => setAgentMessage(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#E6E3DC] focus:outline-none focus:border-[#1A1917]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Submit Enquiry
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Floorplan */}
          {activeTab === 'floorplan' && (
            <div className="space-y-8">
              <div className="bg-white border border-[#E6E3DC] p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-editorial text-xl text-[#1A1917]">Architectural Floor Plan Schedule</h3>
                    <p className="text-xs text-[#75716B]">Gross Internal Area: approx {property.sqft.toLocaleString()} sq ft ({Math.round(property.sqft * 0.0929)} sq m)</p>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#75716B] px-3 py-1 bg-[#F3F1EC]">
                    Verified RICS Survey
                  </span>
                </div>

                {/* Room dimensions schedule */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#E6E3DC] text-[11px] uppercase tracking-wider text-[#75716B]">
                        <th className="py-3 font-semibold">Level</th>
                        <th className="py-3 font-semibold">Room / Zone</th>
                        <th className="py-3 font-semibold text-right">Approx Dimensions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F1EC]">
                      {property.floorplanRooms.map((room, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF9F5]">
                          <td className="py-3 font-medium text-[#1A1917]">{room.level}</td>
                          <td className="py-3 text-[#57534E]">{room.room}</td>
                          <td className="py-3 text-right font-mono text-xs tabular-nums text-[#1A1917]">{room.dimensions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Stylised Architectural Blueprint Representation */}
                <div className="mt-8 border border-dashed border-[#C5C0B8] p-8 text-center bg-[#FAF9F5]">
                  <div className="max-w-md mx-auto space-y-3">
                    <Layers className="w-8 h-8 text-[#75716B] mx-auto" />
                    <h4 className="text-sm font-semibold text-[#1A1917]">Detailed Technical CAD Drawings Available</h4>
                    <p className="text-xs text-[#75716B] leading-relaxed">
                      Download high-resolution scale blueprints including elevation diagrams and garden boundary measurements.
                    </p>
                    <button
                      onClick={() => alert('Scale PDF brochure and technical CAD drawings dispatched to your email.')}
                      className="px-4 py-2 bg-[#1A1917] text-white text-xs font-semibold hover:bg-[#C25E3B] transition-colors cursor-pointer"
                    >
                      Download PDF Floorplan Brochure
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Transport & Neighbourhood */}
          {activeTab === 'transport' && (
            <div className="space-y-8">
              <div className="bg-white border border-[#E6E3DC] p-6 lg:p-8">
                <h3 className="font-editorial text-xl text-[#1A1917] mb-2">Transport Connections & Accessibility</h3>
                <p className="text-xs text-[#75716B] mb-6">Walking times measured from front doorway</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {property.transport.map((t, idx) => (
                    <div key={idx} className="p-4 bg-[#FAF9F5] border border-[#E6E3DC]">
                      <div className="flex items-center gap-2 mb-2">
                        <Train className="w-4 h-4 text-[#C25E3B]" />
                        <span className="text-xs font-semibold text-[#1A1917]">{t.station}</span>
                      </div>
                      <p className="text-xs text-[#75716B]">{t.line}</p>
                      <p className="text-sm font-bold text-[#1A1917] mt-2 tabular-nums">{t.walkMinutes} mins walk</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-1">
                    Neighbourhood Insight: {property.area}
                  </h4>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    Benefiting from swift Metrolink commuter transit into Manchester City Centre, MediaCityUK, and regional rail hubs, this location offers an optimal balance of tranquil green parkland and buzzing independent culinary culture.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
