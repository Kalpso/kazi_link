import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { LandingPage } from './components/landing/LandingPage';
import { TalentDashboard } from './components/talent/TalentDashboard';
import { BusinessDashboard } from './components/business/BusinessDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectWorkspace } from './components/engagement/ProjectWorkspace';
import { ExploreViews } from './components/views/ExploreViews';
import { AuthModal } from './components/auth/AuthModal';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { Project } from './types';

const MainAppContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    currentUser, 
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedEngagementId,
    setSelectedEngagementId
  } = useApp();

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [authInitialRole, setAuthInitialRole] = useState<'talent' | 'business'>('talent');

  const selectedProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) || null : null;

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin', role: 'talent' | 'business' = 'talent') => {
    setAuthInitialMode(mode);
    setAuthInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProjectId(project.id);
  };

  const handleOpenEngagement = (engagementId: string) => {
    setSelectedEngagementId(engagementId);
    setActiveView('engagement_workspace');
  };

  const handleBackFromEngagement = () => {
    if (currentUser?.role === 'talent') {
      setActiveView('talent_dashboard');
    } else if (currentUser?.role === 'business') {
      setActiveView('business_dashboard');
    } else if (currentUser?.role === 'admin') {
      setActiveView('admin_dashboard');
    } else {
      setActiveView('landing');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F5F7FA] font-sans antialiased bg-ambient-glow flex flex-col selection:bg-[#B8F34A]/25 selection:text-[#B8F34A]">
      {/* 3-Zone Top Navigation */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main View Port */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingPage
            onOpenAuth={handleOpenAuth}
            onSelectProject={handleSelectProject}
            onExploreBrowse={() => setActiveView('browse_projects')}
          />
        )}

        {activeView === 'talent_dashboard' && (
          <TalentDashboard
            onOpenProjectDetail={handleSelectProject}
            onOpenEngagement={handleOpenEngagement}
          />
        )}

        {activeView === 'business_dashboard' && (
          <BusinessDashboard
            onOpenEngagement={handleOpenEngagement}
          />
        )}

        {activeView === 'admin_dashboard' && (
          <AdminDashboard />
        )}

        {activeView === 'engagement_workspace' && selectedEngagementId && (
          <ProjectWorkspace
            engagementId={selectedEngagementId}
            onBack={handleBackFromEngagement}
          />
        )}

        {(activeView === 'browse_projects' || 
          activeView === 'talent_showcase' || 
          activeView === 'proof_to_work' || 
          activeView === 'pilot_mission') && (
          <ExploreViews
            view={activeView as 'browse_projects' | 'talent_showcase' | 'proof_to_work' | 'pilot_mission'}
            onSelectProject={handleSelectProject}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      {/* Floating Demo Role Switcher Bar */}
      <RoleSwitcherBar />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        initialRole={authInitialRole}
      />

      {/* Project Brief Detail & Application Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onOpenAuth={() => handleOpenAuth('signin', 'talent')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
