import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  UserCheck, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Bell,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (initialMode?: 'signin' | 'signup', initialRole?: 'talent' | 'business') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { currentUser, logoutUser, activeView, setActiveView, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead && currentUser && n.userId === currentUser.id);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Strict single element) */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => handleNavClick('landing')}
              className="text-xl font-bold tracking-tight text-[#F5F7FA] flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F34A]"
            >
              <span className="w-8 h-8 rounded-lg bg-[#B8F34A] text-[#0B1220] flex items-center justify-center font-extrabold text-lg shadow-sm transition-transform group-hover:scale-105">
                K
              </span>
              <span>Kazi<span className="text-[#B8F34A]">Link</span></span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (4-5 single-line clean text links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A6B2C2]">
            <button 
              onClick={() => handleNavClick('landing')}
              className={`hover:text-[#F5F7FA] transition-colors whitespace-nowrap cursor-pointer ${activeView === 'landing' ? 'text-[#B8F34A] font-semibold' : ''}`}
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick('browse_projects')}
              className={`hover:text-[#F5F7FA] transition-colors whitespace-nowrap cursor-pointer ${activeView === 'browse_projects' ? 'text-[#B8F34A] font-semibold' : ''}`}
            >
              Browse Projects
            </button>
            <button 
              onClick={() => handleNavClick('talent_showcase')}
              className={`hover:text-[#F5F7FA] transition-colors whitespace-nowrap cursor-pointer ${activeView === 'talent_showcase' ? 'text-[#B8F34A] font-semibold' : ''}`}
            >
              Discover Talent
            </button>
            <button 
              onClick={() => handleNavClick('proof_to_work')}
              className={`hover:text-[#F5F7FA] transition-colors whitespace-nowrap cursor-pointer ${activeView === 'proof_to_work' ? 'text-[#B8F34A] font-semibold' : ''}`}
            >
              Proof-to-Work
            </button>
            <button 
              onClick={() => handleNavClick('pilot_mission')}
              className={`hover:text-[#F5F7FA] transition-colors whitespace-nowrap cursor-pointer ${activeView === 'pilot_mission' ? 'text-[#B8F34A] font-semibold' : ''}`}
            >
              Kenya Pilot
            </button>
          </nav>

          {/* Zone 3: Primary Action / User Workspace */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Notifications button */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    aria-label="Notifications"
                    className="relative p-2 rounded-lg text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifs.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B8F34A]" />
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl glass-card-elevated p-3 shadow-2xl z-50 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="font-semibold text-[#F5F7FA]">Notifications</span>
                        <span className="text-[#78869A]">{unreadNotifs.length} new</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                          <div className="text-center py-4 text-[#78869A]">No notifications yet</div>
                        ) : (
                          notifications
                            .filter(n => n.userId === currentUser.id)
                            .slice(0, 5)
                            .map(n => (
                              <div key={n.id} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <p className="font-medium text-[#F5F7FA]">{n.title}</p>
                                <p className="text-[#A6B2C2] text-[11px] mt-0.5">{n.message}</p>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Role Workspace Link */}
                <button
                  onClick={() => {
                    if (currentUser.role === 'talent') setActiveView('talent_dashboard');
                    else if (currentUser.role === 'business') setActiveView('business_dashboard');
                    else setActiveView('admin_dashboard');
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
                >
                  <span>My Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* User avatar & logout */}
                <button
                  onClick={logoutUser}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-2 rounded-lg text-[#78869A] hover:text-[#EF4444] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="text-xs font-medium text-[#F5F7FA] hover:text-[#B8F34A] transition-colors px-3 py-1.5 cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card-elevated border-b border-white/10 px-4 pt-3 pb-5 space-y-2">
          <button 
            onClick={() => handleNavClick('landing')}
            className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 text-[#F5F7FA]"
          >
            Overview
          </button>
          <button 
            onClick={() => handleNavClick('browse_projects')}
            className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 text-[#F5F7FA]"
          >
            Browse Projects
          </button>
          <button 
            onClick={() => handleNavClick('talent_showcase')}
            className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 text-[#F5F7FA]"
          >
            Discover Talent
          </button>
          <button 
            onClick={() => handleNavClick('proof_to_work')}
            className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 text-[#F5F7FA]"
          >
            Proof-to-Work System
          </button>
          <button 
            onClick={() => handleNavClick('pilot_mission')}
            className="w-full text-left py-2 px-3 text-sm font-medium rounded-lg hover:bg-white/5 text-[#F5F7FA]"
          >
            Kenya Pilot
          </button>

          {!currentUser && (
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('signin'); }}
                className="w-full py-2 text-center text-xs font-medium text-[#F5F7FA] rounded-lg bg-white/5"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup'); }}
                className="w-full py-2 text-center text-xs font-semibold text-[#0B1220] bg-[#B8F34A] rounded-lg"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
