import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Briefcase, ShieldAlert, RotateCcw, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, users, switchUser, resetToDefaults, activeView, setActiveView } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const talentUser = users.find(u => u.id === 'usr-talent-1') || users.find(u => u.role === 'talent');
  const businessUser = users.find(u => u.id === 'usr-biz-1') || users.find(u => u.role === 'business');
  const adminUser = users.find(u => u.role === 'admin');

  return (
    <div className="fixed bottom-3 right-3 sm:right-6 z-50">
      <div className="glass-card-elevated rounded-xl p-1.5 shadow-2xl border border-white/15 text-xs flex items-center gap-1.5 backdrop-blur-xl">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F5F7FA] font-medium transition-colors cursor-pointer"
          title="Demo Role Switcher"
        >
          <div className="w-2 h-2 rounded-full bg-[#B8F34A]" />
          <span className="text-[11px] text-[#A6B2C2] hidden sm:inline">Active Persona:</span>
          <span className="font-semibold text-[#F5F7FA] max-w-[120px] truncate">
            {currentUser ? currentUser.displayName : 'Guest Visitor'}
          </span>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-[#B8F34A]">
            {currentUser ? currentUser.role : 'Public'}
          </span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-[#78869A]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#78869A]" />}
        </button>

        {isExpanded && (
          <div className="absolute bottom-12 right-0 w-80 glass-card-elevated rounded-xl p-3 border border-white/15 shadow-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-semibold text-[#F5F7FA]">Demo Personas (Kenya Pilot)</span>
              <button
                onClick={() => {
                  if (confirm('Reset platform data to clean initial pilot seed?')) {
                    resetToDefaults();
                    setIsExpanded(false);
                  }
                }}
                className="text-[11px] text-[#A6B2C2] hover:text-[#EF4444] flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset local changes"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Data</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {/* Talent Persona */}
              {talentUser && (
                <button
                  onClick={() => {
                    switchUser(talentUser.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    currentUser?.id === talentUser.id ? 'bg-[#B8F34A]/10 border border-[#B8F34A]/30 text-[#F5F7FA]' : 'bg-white/5 hover:bg-white/10 text-[#A6B2C2]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#B8F34A]" />
                    <div>
                      <p className="font-medium text-[#F5F7FA]">{talentUser.displayName}</p>
                      <p className="text-[11px] text-[#78869A]">Talent · Web & Frontend Specialist</p>
                    </div>
                  </div>
                  {currentUser?.id === talentUser.id && <Check className="w-3.5 h-3.5 text-[#B8F34A]" />}
                </button>
              )}

              {/* Business Persona */}
              {businessUser && (
                <button
                  onClick={() => {
                    switchUser(businessUser.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    currentUser?.id === businessUser.id ? 'bg-[#B8F34A]/10 border border-[#B8F34A]/30 text-[#F5F7FA]' : 'bg-white/5 hover:bg-white/10 text-[#A6B2C2]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#38BDF8]" />
                    <div>
                      <p className="font-medium text-[#F5F7FA]">{businessUser.displayName}</p>
                      <p className="text-[11px] text-[#78869A]">Business · Founder, GreenBoma Organics</p>
                    </div>
                  </div>
                  {currentUser?.id === businessUser.id && <Check className="w-3.5 h-3.5 text-[#B8F34A]" />}
                </button>
              )}

              {/* Admin Persona */}
              {adminUser && (
                <button
                  onClick={() => {
                    switchUser(adminUser.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    currentUser?.id === adminUser.id ? 'bg-[#B8F34A]/10 border border-[#B8F34A]/30 text-[#F5F7FA]' : 'bg-white/5 hover:bg-white/10 text-[#A6B2C2]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <p className="font-medium text-[#F5F7FA]">{adminUser.displayName}</p>
                      <p className="text-[11px] text-[#78869A]">Administrator · Trust & Governance</p>
                    </div>
                  </div>
                  {currentUser?.id === adminUser.id && <Check className="w-3.5 h-3.5 text-[#B8F34A]" />}
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-[#78869A] flex justify-between items-center">
              <span>Nairobi Pilot Cohort · KES Base</span>
              <button 
                onClick={() => { setActiveView('landing'); setIsExpanded(false); }}
                className="text-[#B8F34A] hover:underline"
              >
                Go to Landing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
