import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, CheckCircle, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  initialRole = 'talent'
}) => {
  const { loginUser, registerUser, users, switchUser } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [headlineOrCompany, setHeadlineOrCompany] = useState('');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [phone, setPhone] = useState('+254 ');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signin') {
      if (!email.trim()) {
        setErrorMessage('Please enter your email address');
        return;
      }
      const success = loginUser(email, role);
      if (success) {
        onClose();
      } else {
        setErrorMessage('Account not found with this email. You can register below or click a demo account.');
      }
    } else {
      if (!displayName.trim() || !email.trim() || !headlineOrCompany.trim()) {
        setErrorMessage('Please fill in all required fields');
        return;
      }
      registerUser({
        displayName,
        email,
        role,
        headlineOrCompany,
        location,
        phone
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-card-elevated rounded-2xl p-6 border border-white/15 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#A6B2C2] hover:text-[#F5F7FA] rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#F5F7FA]">
            {mode === 'signin' ? 'Sign in to KaziLink' : 'Create your KaziLink account'}
          </h2>
          <p className="text-xs text-[#A6B2C2] mt-1">
            {mode === 'signin' 
              ? 'Access verified projects, portfolios, and engagement workspaces.'
              : 'Join the premier Kenyan pilot marketplace for demonstrated digital talent.'}
          </p>
        </div>

        {/* 1-Click Fast Pilot Demo Switcher */}
        {mode === 'signin' && (
          <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] font-semibold text-[#B8F34A] block mb-2">
              Fast Pilot Access (1-Click Demo)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  switchUser('usr-talent-1');
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#B8F34A] mb-1" />
                <span className="text-[11px] font-medium text-[#F5F7FA] block leading-tight">Amiina</span>
                <span className="text-[10px] text-[#78869A] block">Talent (Dev)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUser('usr-biz-1');
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#38BDF8] mb-1" />
                <span className="text-[11px] font-medium text-[#F5F7FA] block leading-tight">Sarah</span>
                <span className="text-[10px] text-[#78869A] block">Business</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUser('usr-admin-1');
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#F59E0B] mb-1" />
                <span className="text-[11px] font-medium text-[#F5F7FA] block leading-tight">Morris</span>
                <span className="text-[10px] text-[#78869A] block">Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Role Selection for Sign Up */}
        {mode === 'signup' && (
          <div className="mb-4">
            <label className="block text-xs font-medium text-[#A6B2C2] mb-1.5">I am registering as:</label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setRole('talent')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  role === 'talent' 
                    ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' 
                    : 'text-[#A6B2C2] hover:text-[#F5F7FA]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Talent</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('business')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  role === 'business' 
                    ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' 
                    : 'text-[#A6B2C2] hover:text-[#F5F7FA]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Business / Client</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Full Name / Contact Person</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="e.g. Kelvin Mutua"
                className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. you@company.co.ke"
              className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors"
            />
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#A6B2C2] mb-1">
                  {role === 'talent' ? 'Professional Headline' : 'Company Name'}
                </label>
                <input
                  type="text"
                  required
                  value={headlineOrCompany}
                  onChange={e => setHeadlineOrCompany(e.target.value)}
                  placeholder={role === 'talent' ? 'e.g. React & TypeScript Developer' : 'e.g. Rift Valley Coffee Roasters Ltd'}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Nairobi, Kenya"
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Phone (Kenya)</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+254 7..."
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {errorMessage && (
            <p className="text-xs text-[#EF4444] bg-[#EF4444]/10 p-2 rounded-lg border border-[#EF4444]/20">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md mt-2"
          >
            {mode === 'signin' ? 'Sign In to Workspace' : 'Create Verified Account'}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-4 pt-3 border-t border-white/10 text-center">
          {mode === 'signin' ? (
            <p className="text-xs text-[#A6B2C2]">
              New to KaziLink?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className="text-[#B8F34A] hover:underline font-medium cursor-pointer"
              >
                Register for Kenya Pilot
              </button>
            </p>
          ) : (
            <p className="text-xs text-[#A6B2C2]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                className="text-[#B8F34A] hover:underline font-medium cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
