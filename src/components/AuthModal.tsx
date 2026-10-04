import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = tab === 'register' ? name : (name || email.split('@')[0] || 'Oliver Vance');
    onLogin({
      name: finalName,
      email: email || 'oliver.vance@anthonyandco.co.uk'
    });
    onClose();
  };

  const handleQuickDemo = () => {
    onLogin({
      name: 'Oliver Vance',
      email: 'oliver.vance@anthonyandco.co.uk'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F5] border border-[#E6E3DC] w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#75716B] hover:text-[#1A1917] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <span className="font-editorial text-2xl text-[#1A1917] tracking-tight block">
            ANTHONY & CO.
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#75716B] font-semibold mt-1 block">
            Client Portal & Saved Searches
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#E6E3DC] mb-6 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-2.5 transition-colors cursor-pointer text-center relative ${
              tab === 'signin' ? 'text-[#1A1917]' : 'text-[#75716B] hover:text-[#1A1917]'
            }`}
          >
            Sign In
            {tab === 'signin' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2.5 transition-colors cursor-pointer text-center relative ${
              tab === 'register' ? 'text-[#1A1917]' : 'text-[#75716B] hover:text-[#1A1917]'
            }`}
          >
            Create Account
            {tab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C25E3B]" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#75716B] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oliver Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#75716B] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#75716B] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E6E3DC] text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-[#E6E3DC] text-center">
          <p className="text-[11px] text-[#75716B] mb-2">Want to test the platform instantly?</p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-[#1A1917] text-xs font-medium transition-colors cursor-pointer border border-[#E6E3DC]"
          >
            Quick 1-Click Sign In (Demo Client)
          </button>
        </div>
      </div>
    </div>
  );
};
