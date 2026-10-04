import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, listingType?: 'sale' | 'rent') => void;
  onOpenValuation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenValuation }) => {
  const [alertEmail, setAlertEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1A1917] text-[#FAF9F5] pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Split: Wordmark & Newsletter Property Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-editorial text-2xl lg:text-3xl tracking-tight text-white block">
              ANTHONY & CO.
            </span>
            <p className="text-sm text-stone-400 max-w-md font-light leading-relaxed">
              Curated residential sales, lettings, and property advisory across Greater Manchester's historic and architecturally distinguished neighbourhoods.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-stone-900/60 p-6 border border-stone-800">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                Property Alerts
              </span>
              <h4 className="font-editorial text-lg text-white mb-2">
                Receive newly listed residences before open portal release
              </h4>
              
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>You are subscribed to exclusive Anthony & Co. property previews.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 mt-4">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-950 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C25E3B]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#C25E3B] hover:bg-[#AA4F30] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-stone-800 text-xs text-stone-400">
          <div>
            <h5 className="uppercase tracking-widest font-semibold text-white mb-4">Properties</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('search', 'sale')} className="hover:text-white transition-colors cursor-pointer">
                  Manchester Homes For Sale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', 'rent')} className="hover:text-white transition-colors cursor-pointer">
                  Manchester Properties To Let
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', 'sale')} className="hover:text-white transition-colors cursor-pointer">
                  Cotton Mill & Loft Conversions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', 'sale')} className="hover:text-white transition-colors cursor-pointer">
                  Victorian & Edwardian Residences
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest font-semibold text-white mb-4">Homeowners</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenValuation} className="hover:text-white transition-colors cursor-pointer">
                  Instant Online Valuation
                </button>
              </li>
              <li>
                <button onClick={onOpenValuation} className="hover:text-white transition-colors cursor-pointer">
                  Book In-Person Appraisal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Selling with Anthony & Co.
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Landlord Lettings Management
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest font-semibold text-white mb-4">Neighbourhoods</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('neighbourhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Didsbury & West Didsbury M20
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighbourhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Ancoats & Northern Quarter M4
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighbourhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Chorlton-cum-Hardy M21
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('neighbourhoods')} className="hover:text-white transition-colors cursor-pointer">
                  Altrincham & Hale WA14
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest font-semibold text-white mb-4">Branch Offices</h5>
            <ul className="space-y-2.5">
              <li>Didsbury: 748 Wilmslow Road</li>
              <li>Ancoats: Cutting Room Square</li>
              <li>Chorlton: 128 Beech Road</li>
              <li>Altrincham: 14 Shaw's Road</li>
              <li className="pt-2 text-[#C25E3B] font-medium">+44 (0)161 445 7788</li>
            </ul>
          </div>
        </div>

        {/* Regulatory Notices & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Anthony & Co. Residential Ltd. Registered in England & Wales.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span>RICS Regulated Firm</span>
            <span>The Property Ombudsman</span>
            <span>Tenancy Deposit Scheme (TDS)</span>
            <span>Client Money Protection</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
