import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [branch, setBranch] = useState('Didsbury & South Manchester');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const branches = [
    {
      name: 'Didsbury & South Manchester',
      address: '748 Wilmslow Road, Manchester M20 2DW',
      phone: '+44 (0)161 445 7788',
      email: 'didsbury@anthonyandco.co.uk',
      lead: 'Eleanor Sterling'
    },
    {
      name: 'Ancoats & City Centre',
      address: 'Cutting Room Square, Manchester M4 5BF',
      phone: '+44 (0)161 832 9900',
      email: 'ancoats@anthonyandco.co.uk',
      lead: 'Marcus Beaumont'
    },
    {
      name: 'Chorlton-cum-Hardy',
      address: '128 Beech Road, Manchester M21 9ED',
      phone: '+44 (0)161 881 2244',
      email: 'chorlton@anthonyandco.co.uk',
      lead: 'Oliver Cross'
    },
    {
      name: 'Altrincham & Hale',
      address: '14 Shaw\'s Road, Altrincham WA14 1QU',
      phone: '+44 (0)161 928 6622',
      email: 'altrincham@anthonyandco.co.uk',
      lead: 'Camilla Vance-Lowe'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#75716B] mb-2 block">
          Get in Touch
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#1A1917] font-normal tracking-tight">
          Our Greater Manchester Offices
        </h1>
        <p className="mt-4 text-base text-[#57534E] leading-relaxed font-light">
          Whether you are looking to acquire a period home, sell an architect-designed residence, or discuss the local property climate, our partners are at your service.
        </p>
      </div>

      {/* 4 Branch Offices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {branches.map((b) => (
          <div
            key={b.name}
            className="p-6 bg-white border border-[#E6E3DC] space-y-4 hover:border-[#1A1917] transition-all"
          >
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C25E3B]">
                Branch Office
              </span>
              <h3 className="font-editorial text-lg text-[#1A1917] mt-0.5">{b.name}</h3>
            </div>

            <p className="text-xs text-[#57534E] flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#75716B] shrink-0 mt-0.5" />
              <span>{b.address}</span>
            </p>

            <div className="pt-2 border-t border-[#F3F1EC] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#1A1917]">
                <Phone className="w-3.5 h-3.5 text-[#75716B]" />
                <a href={`tel:${b.phone}`} className="hover:text-[#C25E3B]">{b.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-[#1A1917]">
                <Mail className="w-3.5 h-3.5 text-[#75716B]" />
                <a href={`mailto:${b.email}`} className="hover:text-[#C25E3B] truncate">{b.email}</a>
              </div>
            </div>

            <p className="text-[11px] text-[#75716B] pt-1">
              Director: <span className="font-medium text-[#1A1917]">{b.lead}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Contact Form & Hours Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#E6E3DC] p-8 lg:p-12">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1A1917]">
            Send an Enquiry
          </h2>
          <p className="text-sm text-[#57534E] leading-relaxed font-light">
            Please complete the form and a senior partner from your chosen branch will respond promptly.
          </p>

          <div className="pt-4 border-t border-[#F3F1EC] space-y-3 text-xs text-[#57534E]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#75716B]" />
              <span>Monday – Friday: 09:00 – 18:30</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#75716B]" />
              <span>Saturday: 10:00 – 16:00 (Viewings & Valuations)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#75716B]" />
              <span>Sunday: By Prior Appointment Only</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 bg-[#FAF9F5] border border-[#E6E3DC] text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-editorial text-2xl text-[#1A1917]">Thank you, {name}</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Your enquiry has been routed to our <span className="font-semibold text-[#1A1917]">{branch}</span> team. We will be in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C25E3B] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                    Branch to Contact
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917]"
                  >
                    <option value="Didsbury & South Manchester">Didsbury & South Manchester</option>
                    <option value="Ancoats & City Centre">Ancoats & City Centre</option>
                    <option value="Chorlton-cum-Hardy">Chorlton-cum-Hardy</option>
                    <option value="Altrincham & Hale">Altrincham & Hale</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#75716B] mb-1">
                  How can we assist you?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="I am interested in selling my home / arranging property viewings..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
