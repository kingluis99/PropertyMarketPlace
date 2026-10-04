import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, Building2 } from 'lucide-react';
import { Property, ViewingRequest } from '../types';

interface ArrangeViewingModalProps {
  property: Property | null;
  onClose: () => void;
  onConfirmViewing: (request: ViewingRequest) => void;
}

export const ArrangeViewingModal: React.FC<ArrangeViewingModalProps> = ({
  property,
  onClose,
  onConfirmViewing
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('11:00 - 12:30 (Morning)');
  const [buyerStatus, setBuyerStatus] = useState('Mortgage in Principle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!property) return null;

  const dates = [
    { label: 'Tomorrow', date: 'Mon, 5 Oct' },
    { label: 'Tuesday', date: 'Tue, 6 Oct' },
    { label: 'Thursday', date: 'Thu, 8 Oct' },
    { label: 'Saturday (Open House)', date: 'Sat, 10 Oct' }
  ];

  const slots = [
    '10:00 - 11:30 (Morning)',
    '12:00 - 13:30 (Midday)',
    '14:30 - 16:00 (Afternoon)',
    '17:30 - 19:00 (Evening)'
  ];

  const buyerPositions = [
    'First-time Buyer',
    'Mortgage in Principle',
    'Cash Buyer / No Chain',
    'Property on Market',
    'Relocating to Greater Manchester'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'KC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    const request: ViewingRequest = {
      id: ref,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: property.address,
      date: selectedDate,
      timeSlot,
      name,
      email,
      phone,
      status: 'confirmed',
      notes
    };

    onConfirmViewing(request);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F5] border border-[#E6E3DC] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#75716B] hover:text-[#1A1917] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#1A1917]">Viewing Appointment Confirmed</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              We have reserved your viewing for <strong className="text-[#1A1917]">{property.title}</strong> on <span className="font-semibold">{selectedDate} at {timeSlot}</span>.
            </p>
            <div className="p-3 bg-white border border-[#E6E3DC] text-xs font-mono text-[#1A1917]">
              Reference Code: <span className="font-bold text-[#C25E3B]">{bookingRef}</span>
            </div>
            <p className="text-[11px] text-[#75716B]">
              A calendar invite and SMS reminder have been dispatched to {email || phone}. {property.agent.name} will greet you at the property.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#1A1917] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C25E3B] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs uppercase tracking-wider text-[#C25E3B] font-semibold">Private Viewing</span>
            <h2 className="font-editorial text-2xl text-[#1A1917] mt-1 mb-1">
              Arrange an Appointment
            </h2>
            <p className="text-xs text-[#75716B] mb-5 truncate">
              {property.title} · {property.address}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                  Select Preferred Day
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {dates.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setSelectedDate(`${d.label} (${d.date})`)}
                      className={`p-2.5 border text-left transition-colors cursor-pointer ${
                        selectedDate.includes(d.label)
                          ? 'border-[#1A1917] bg-[#1A1917] text-white font-medium'
                          : 'border-[#E6E3DC] bg-white text-[#1A1917] hover:border-[#1A1917]'
                      }`}
                    >
                      <div className="font-semibold">{d.label}</div>
                      <div className={`text-[10px] ${selectedDate.includes(d.label) ? 'text-white/80' : 'text-[#75716B]'}`}>
                        {d.date}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                >
                  {slots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75716B] mb-1.5">
                  Your Buying / Tenancy Position
                </label>
                <select
                  value={buyerStatus}
                  onChange={(e) => setBuyerStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917]"
                >
                  {buyerPositions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#75716B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#75716B] mb-1">Telephone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#75716B] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C25E3B] hover:bg-[#AA4F30] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Confirm Viewing Reservation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
