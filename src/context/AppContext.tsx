import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  TalentProfile, 
  BusinessProfile, 
  Project, 
  Application, 
  Engagement, 
  Category, 
  AuditLog, 
  ReportItem, 
  InAppNotification,
  UserRole,
  DeliverableSubmission,
  RevisionRequest,
  Review,
  TalentSkill,
  ProjectInvitation,
  ActivityEvent
} from '../types';
import {
  SEED_USERS,
  SEED_TALENT_PROFILES,
  SEED_BUSINESS_PROFILES,
  SEED_PROJECTS,
  SEED_APPLICATIONS,
  SEED_ENGAGEMENTS,
  SEED_CATEGORIES,
  SEED_AUDIT_LOGS,
  SEED_REPORTS,
  SEED_INVITATIONS,
  SEED_ACTIVITIES
} from '../data/seedData';

const STORAGE_KEY = 'kazilink_state_v1';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  talentProfiles: Record<string, TalentProfile>;
  businessProfiles: Record<string, BusinessProfile>;
  projects: Project[];
  applications: Application[];
  engagements: Engagement[];
  categories: Category[];
  auditLogs: AuditLog[];
  reports: ReportItem[];
  notifications: InAppNotification[];
  activities: ActivityEvent[];
  invitations: ProjectInvitation[];
  
  // Navigation / View State
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedEngagementId: string | null;
  setSelectedEngagementId: (id: string | null) => void;
  selectedTalentId: string | null;
  setSelectedTalentId: (id: string | null) => void;
  
  // Auth & Roles
  switchUser: (userId: string) => void;
  loginUser: (email: string, role: UserRole) => boolean;
  registerUser: (data: { displayName: string; email: string; role: UserRole; phone?: string; location?: string; headlineOrCompany: string }) => void;
  logoutUser: () => void;
  
  // Business Actions
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'applicationsCount' | 'businessId' | 'businessName' | 'businessVerified' | 'businessLocation'>) => void;
  shortlistApplication: (applicationId: string) => void;
  selectCandidateAndCreateEngagement: (projectId: string, applicationId: string) => void;
  requestDeliverableRevision: (engagementId: string, feedback: string, specificPoints: string[]) => void;
  acceptDeliverablesAndComplete: (engagementId: string) => void;
  submitReview: (engagementId: string, rating: number, comment: string) => void;
  submitBusinessVerification: (registrationNumber: string, taxId: string, documentName: string) => void;

  // Talent Actions
  submitApplication: (projectId: string, coverNote: string, proposedTimelineDays: number, proposedRateKES: number, attachedEvidenceLinks: { title: string; url: string; description: string }[]) => boolean;
  submitDeliverable: (engagementId: string, title: string, releaseNotes: string, fileLinks: { label: string; url: string; type?: 'code' | 'design' | 'doc' | 'preview' }[]) => void;
  updateTalentProfile: (data: Partial<TalentProfile>) => void;
  addSkillEvidence: (skill: Omit<TalentSkill, 'id'>) => void;

  // Admin Actions
  approveBusinessVerification: (businessUserId: string, notes?: string) => void;
  rejectBusinessVerification: (businessUserId: string, notes?: string) => void;
  moderateProjectStatus: (projectId: string, newStatus: Project['status'], reason: string) => void;
  submitReport: (targetType: 'project' | 'user' | 'engagement', targetId: string, targetTitle: string, reason: string, details: string) => void;
  resolveReport: (reportId: string, resolutionNotes: string) => void;

  // Activity & Invitation Actions
  addActivity: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  markActivityAsRead: (activityId: string) => void;
  markAllActivitiesAsRead: () => void;
  sendProjectInvitation: (projectId: string, talentId: string, personalMessage: string) => boolean;
  respondToInvitation: (invitationId: string, accept: boolean) => void;

  // Utilities
  resetToDefaults: () => void;
  recordAuditLog: (action: string, details: string, category: AuditLog['category']) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or seedData
  const [isInitialized, setIsInitialized] = useState(false);

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : SEED_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_current_user_id`);
    return saved || 'usr-talent-1'; // Default to Amiina Otieno
  });

  const [talentProfiles, setTalentProfiles] = useState<Record<string, TalentProfile>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_talent_profiles`);
    return saved ? JSON.parse(saved) : SEED_TALENT_PROFILES;
  });

  const [businessProfiles, setBusinessProfiles] = useState<Record<string, BusinessProfile>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_business_profiles`);
    return saved ? JSON.parse(saved) : SEED_BUSINESS_PROFILES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : SEED_PROJECTS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : SEED_APPLICATIONS;
  });

  const [engagements, setEngagements] = useState<Engagement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_engagements`);
    return saved ? JSON.parse(saved) : SEED_ENGAGEMENTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
    return saved ? JSON.parse(saved) : SEED_CATEGORIES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit_logs`);
    return saved ? JSON.parse(saved) : SEED_AUDIT_LOGS;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reports`);
    return saved ? JSON.parse(saved) : SEED_REPORTS;
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>([]);

  const [invitations, setInvitations] = useState<ProjectInvitation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_invitations`);
    return saved ? JSON.parse(saved) : SEED_INVITATIONS;
  });

  const [activities, setActivities] = useState<ActivityEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : SEED_ACTIVITIES;
  });

  // Navigation states
  const [activeView, setActiveView] = useState<string>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedEngagementId, setSelectedEngagementId] = useState<string | null>(null);
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
    localStorage.setItem(`${STORAGE_KEY}_current_user_id`, currentUserId);
    localStorage.setItem(`${STORAGE_KEY}_talent_profiles`, JSON.stringify(talentProfiles));
    localStorage.setItem(`${STORAGE_KEY}_business_profiles`, JSON.stringify(businessProfiles));
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
    localStorage.setItem(`${STORAGE_KEY}_engagements`, JSON.stringify(engagements));
    localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
    localStorage.setItem(`${STORAGE_KEY}_audit_logs`, JSON.stringify(auditLogs));
    localStorage.setItem(`${STORAGE_KEY}_reports`, JSON.stringify(reports));
    localStorage.setItem(`${STORAGE_KEY}_invitations`, JSON.stringify(invitations));
    localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(activities));
    setIsInitialized(true);
  }, [users, currentUserId, talentProfiles, businessProfiles, projects, applications, engagements, categories, auditLogs, reports, invitations, activities]);

  const currentUser = users.find(u => u.id === currentUserId) || null;

  const recordAuditLog = (action: string, details: string, category: AuditLog['category']) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser ? currentUser.email : 'system@kazilink.africa',
      actorRole: currentUser ? currentUser.role : 'admin',
      action,
      details,
      category
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (userId: string, title: string, message: string, type: InAppNotification['type']) => {
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addActivity = (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => {
    const newActivity: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const markActivityAsRead = (activityId: string) => {
    setActivities(prev => prev.map(a => a.id === activityId ? { ...a, isRead: true } : a));
  };

  const markAllActivitiesAsRead = () => {
    if (!currentUser) return;
    setActivities(prev => prev.map(a => a.userId === currentUser.id ? { ...a, isRead: true } : a));
  };

  const sendProjectInvitation = (projectId: string, talentId: string, personalMessage: string): boolean => {
    const project = projects.find(p => p.id === projectId);
    const talentUser = users.find(u => u.id === talentId);
    if (!project || !talentUser || !currentUser) return false;

    const bizProfile = businessProfiles[currentUser.id];

    const newInvitation: ProjectInvitation = {
      id: `inv-${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      projectCategory: project.category,
      projectBudgetKES: project.budgetKES,
      businessId: currentUser.id,
      businessName: bizProfile ? bizProfile.companyName : currentUser.displayName,
      businessVerified: bizProfile ? bizProfile.verificationStatus === 'verified' : false,
      talentId: talentUser.id,
      talentName: talentUser.displayName,
      personalMessage: personalMessage || 'We would like to invite you to submit a proposal for this project.',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setInvitations(prev => [newInvitation, ...prev]);

    // Activity for Talent
    addActivity({
      userId: talentUser.id,
      type: 'project_invitation',
      title: 'New Project Invitation Received',
      description: `${newInvitation.businessName} invited you to apply for "${project.title}".`,
      isRead: false,
      actorName: newInvitation.businessName,
      actorRole: 'business',
      targetId: project.id,
      linkTarget: 'project',
      badgeText: `KES ${project.budgetKES.toLocaleString()} Invitation`,
      badgeTone: 'accent'
    });

    // Activity for Business
    addActivity({
      userId: currentUser.id,
      type: 'project_invitation',
      title: 'Project Invitation Sent',
      description: `Sent invitation to ${talentUser.displayName} for project "${project.title}".`,
      isRead: true,
      actorName: currentUser.displayName,
      actorRole: 'business',
      targetId: project.id,
      linkTarget: 'project',
      badgeText: 'Invited',
      badgeTone: 'info'
    });

    addNotification(talentUser.id, 'New Project Invitation', `${newInvitation.businessName} invited you to "${project.title}"`, 'invitation');
    recordAuditLog('Project Invitation Sent', `Business ${currentUser.displayName} invited ${talentUser.displayName} to project "${project.title}"`, 'project');
    return true;
  };

  const respondToInvitation = (invitationId: string, accept: boolean) => {
    const invitation = invitations.find(i => i.id === invitationId);
    if (!invitation || !currentUser) return;

    setInvitations(prev => prev.map(inv => {
      if (inv.id === invitationId) {
        return { ...inv, status: accept ? 'accepted' : 'declined' };
      }
      return inv;
    }));

    if (accept) {
      addActivity({
        userId: invitation.businessId,
        type: 'project_invitation',
        title: 'Project Invitation Accepted',
        description: `${invitation.talentName} accepted your invitation to "${invitation.projectTitle}".`,
        isRead: false,
        actorName: invitation.talentName,
        actorRole: 'talent',
        targetId: invitation.projectId,
        linkTarget: 'project',
        badgeText: 'Accepted',
        badgeTone: 'success'
      });
      addNotification(invitation.businessId, 'Invitation Accepted', `${invitation.talentName} accepted your invitation for "${invitation.projectTitle}"`, 'invitation');
      setSelectedProjectId(invitation.projectId);
    } else {
      addActivity({
        userId: invitation.businessId,
        type: 'project_invitation',
        title: 'Project Invitation Declined',
        description: `${invitation.talentName} declined the invitation to "${invitation.projectTitle}".`,
        isRead: false,
        actorName: invitation.talentName,
        actorRole: 'talent',
        targetId: invitation.projectId,
        linkTarget: 'project',
        badgeText: 'Declined',
        badgeTone: 'warning'
      });
    }

    recordAuditLog('Invitation Response', `${currentUser.displayName} ${accept ? 'accepted' : 'declined'} invitation for "${invitation.projectTitle}"`, 'project');
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      // Route appropriately based on target role
      if (target.role === 'talent') {
        setActiveView('talent_dashboard');
      } else if (target.role === 'business') {
        setActiveView('business_dashboard');
      } else if (target.role === 'admin') {
        setActiveView('admin_dashboard');
      }
      recordAuditLog('User Session Switched', `Switched active session to ${target.displayName} (${target.email})`, 'auth');
    }
  };

  const loginUser = (email: string, role: UserRole): boolean => {
    const target = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (target) {
      setCurrentUserId(target.id);
      if (target.role === 'talent') setActiveView('talent_dashboard');
      else if (target.role === 'business') setActiveView('business_dashboard');
      else setActiveView('admin_dashboard');
      recordAuditLog('User Logged In', `User ${target.email} signed in successfully`, 'auth');
      return true;
    }
    return false;
  };

  const registerUser = (data: { 
    displayName: string; 
    email: string; 
    role: UserRole; 
    phone?: string; 
    location?: string; 
    headlineOrCompany: string;
  }) => {
    const newUserId = `usr-${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      email: data.email,
      role: data.role,
      displayName: data.displayName,
      avatarUrl: data.role === 'talent' 
        ? '/src/assets/images/avatar_female_dev_1792597008046.jpg' 
        : '/src/assets/images/avatar_business_founder_1792597008966.jpg',
      phone: data.phone || '+254 700 000 000',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUserId);

    if (data.role === 'talent') {
      const newProfile: TalentProfile = {
        userId: newUserId,
        headline: data.headlineOrCompany || 'Digital Talent Specialist',
        bio: 'Newly registered emerging professional on KaziLink. Ready to build verified portfolio through structured engagements.',
        location: data.location || 'Nairobi, Kenya',
        availability: 'available',
        languages: ['English', 'Swahili'],
        preferredCategories: ['Website Development & Setup'],
        skills: [],
        workSamples: [],
        completedEngagementsCount: 0,
        rating: 5.0,
        totalEarnedKES: 0
      };
      setTalentProfiles(prev => ({ ...prev, [newUserId]: newProfile }));
      setActiveView('talent_dashboard');
    } else if (data.role === 'business') {
      const newProfile: BusinessProfile = {
        userId: newUserId,
        companyName: data.headlineOrCompany || 'Kenyan Business Enterprise',
        industry: 'Services & Commerce',
        location: data.location || 'Nairobi, Kenya',
        bio: 'SME registered on KaziLink to hire and collaborate with verified African digital talent.',
        contactPerson: data.displayName,
        verificationStatus: 'unverified',
        projectsPostedCount: 0,
        totalSpentKES: 0
      };
      setBusinessProfiles(prev => ({ ...prev, [newUserId]: newProfile }));
      setActiveView('business_dashboard');
    }

    recordAuditLog('User Registered', `New ${data.role} account created for ${data.email}`, 'auth');
  };

  const logoutUser = () => {
    setCurrentUserId('');
    setActiveView('landing');
  };

  // Business: Create Project
  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'applicationsCount' | 'businessId' | 'businessName' | 'businessVerified' | 'businessLocation'>) => {
    if (!currentUser || currentUser.role !== 'business') return;
    const bizProfile = businessProfiles[currentUser.id];

    const newProject: Project = {
      ...projectData,
      id: `prj-${Date.now()}`,
      businessId: currentUser.id,
      businessName: bizProfile ? bizProfile.companyName : currentUser.displayName,
      businessVerified: bizProfile ? bizProfile.verificationStatus === 'verified' : false,
      businessLocation: bizProfile ? bizProfile.location : 'Nairobi, Kenya',
      createdAt: new Date().toISOString(),
      applicationsCount: 0
    };

    setProjects(prev => [newProject, ...prev]);

    // Update business profile project count
    if (bizProfile) {
      setBusinessProfiles(prev => ({
        ...prev,
        [currentUser.id]: {
          ...bizProfile,
          projectsPostedCount: bizProfile.projectsPostedCount + 1
        }
      }));
    }

    recordAuditLog('Project Posted', `Business ${currentUser.displayName} posted project "${newProject.title}" (KES ${newProject.budgetKES.toLocaleString()})`, 'project');
  };

  // Talent: Apply to Project
  const submitApplication = (
    projectId: string,
    coverNote: string,
    proposedTimelineDays: number,
    proposedRateKES: number,
    attachedEvidenceLinks: { title: string; url: string; description: string }[]
  ): boolean => {
    if (!currentUser || currentUser.role !== 'talent') return false;

    // Prevent duplicate application
    const existing = applications.find(a => a.projectId === projectId && a.talentId === currentUser.id);
    if (existing) {
      return false;
    }

    const project = projects.find(p => p.id === projectId);
    if (!project || project.status !== 'open') return false;

    const profile = talentProfiles[currentUser.id];

    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      talentId: currentUser.id,
      talentName: currentUser.displayName,
      talentAvatar: currentUser.avatarUrl,
      talentHeadline: profile ? profile.headline : 'Digital Professional',
      talentLocation: profile ? profile.location : 'Kenya',
      coverNote,
      proposedTimelineDays,
      proposedRateKES,
      attachedEvidenceLinks,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);

    // Update project application count
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, applicationsCount: p.applicationsCount + 1 } : p));

    // Notify Business
    addNotification(project.businessId, 'New Application Received', `${currentUser.displayName} applied for "${project.title}"`, 'application');

    // Add activity events
    addActivity({
      userId: project.businessId,
      type: 'application_status_changed',
      title: 'New Proposal Received',
      description: `${currentUser.displayName} submitted a proposal with proof-to-work samples for "${project.title}".`,
      isRead: false,
      actorName: currentUser.displayName,
      actorRole: 'talent',
      targetId: project.id,
      linkTarget: 'project',
      badgeText: 'New Proposal',
      badgeTone: 'accent'
    });

    addActivity({
      userId: currentUser.id,
      type: 'application_status_changed',
      title: 'Proposal Submitted',
      description: `You applied to "${project.title}" (Proposed: KES ${proposedRateKES.toLocaleString()} in ${proposedTimelineDays} days).`,
      isRead: true,
      actorName: currentUser.displayName,
      actorRole: 'talent',
      targetId: project.id,
      linkTarget: 'applications',
      badgeText: 'Submitted',
      badgeTone: 'info'
    });

    recordAuditLog('Application Submitted', `${currentUser.displayName} submitted proposal for project "${project.title}"`, 'project');
    return true;
  };

  // Business: Shortlist
  const shortlistApplication = (applicationId: string) => {
    const targetApp = applications.find(a => a.id === applicationId);
    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        addNotification(a.talentId, 'Application Shortlisted', `Your application for "${a.projectTitle}" has been shortlisted!`, 'shortlist');
        return { ...a, status: 'shortlisted' };
      }
      return a;
    }));

    if (targetApp) {
      addActivity({
        userId: targetApp.talentId,
        type: 'application_status_changed',
        title: 'Proposal Shortlisted',
        description: `Your application for "${targetApp.projectTitle}" was shortlisted by ${currentUser?.displayName || 'the client'}.`,
        isRead: false,
        actorName: currentUser?.displayName || 'Client',
        actorRole: 'business',
        targetId: targetApp.projectId,
        linkTarget: 'applications',
        badgeText: 'Shortlisted',
        badgeTone: 'info'
      });
    }

    recordAuditLog('Application Shortlisted', `Application ${applicationId} moved to shortlisted candidates`, 'project');
  };

  // Business: Select Candidate & Create Engagement
  const selectCandidateAndCreateEngagement = (projectId: string, applicationId: string) => {
    const project = projects.find(p => p.id === projectId);
    const application = applications.find(a => a.id === applicationId);

    if (!project || !application || !currentUser) return;

    // Create Engagement
    const newEngagement: Engagement = {
      id: `eng-${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      category: project.category,
      businessId: project.businessId,
      businessName: project.businessName,
      talentId: application.talentId,
      talentName: application.talentName,
      talentAvatar: application.talentAvatar,
      agreedBudgetKES: application.proposedRateKES || project.budgetKES,
      agreedDeadline: project.deliveryDeadline,
      revisionAllowance: project.revisionAllowance || 2,
      revisionsUsed: 0,
      status: 'active',
      deliverables: [],
      revisions: [],
      createdAt: new Date().toISOString()
    };

    setEngagements(prev => [newEngagement, ...prev]);

    // Update project status to in_progress
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'in_progress' } : p));

    // Update applications statuses
    setApplications(prev => prev.map(a => {
      if (a.id === applicationId) return { ...a, status: 'selected' };
      if (a.projectId === projectId && a.id !== applicationId) return { ...a, status: 'declined' };
      return a;
    }));

    // Notify Talent
    addNotification(application.talentId, 'You were Selected!', `Congratulations! ${project.businessName} selected you for "${project.title}". Workspace is now active.`, 'selection');

    // Add activity events
    addActivity({
      userId: application.talentId,
      type: 'application_status_changed',
      title: 'Candidate Selected & Engagement Initiated',
      description: `${project.businessName} selected your proposal for "${project.title}". Milestone escrow commitment: KES ${newEngagement.agreedBudgetKES.toLocaleString()}.`,
      isRead: false,
      actorName: project.businessName,
      actorRole: 'business',
      targetId: newEngagement.id,
      linkTarget: 'engagement',
      badgeText: 'Contract Active',
      badgeTone: 'success'
    });

    addActivity({
      userId: project.businessId,
      type: 'application_status_changed',
      title: `Selected ${application.talentName}`,
      description: `Initiated active milestone engagement for "${project.title}". Workspace is ready.`,
      isRead: true,
      actorName: currentUser.displayName,
      actorRole: 'business',
      targetId: newEngagement.id,
      linkTarget: 'engagement',
      badgeText: 'Contract Active',
      badgeTone: 'success'
    });

    recordAuditLog('Candidate Selected & Engagement Created', `Selected ${application.talentName} for project "${project.title}". Milestone commitment: KES ${newEngagement.agreedBudgetKES.toLocaleString()}`, 'engagement');
    
    setSelectedEngagementId(newEngagement.id);
    setActiveView('engagement_workspace');
  };

  // Talent: Submit Deliverable
  const submitDeliverable = (
    engagementId: string, 
    title: string, 
    releaseNotes: string, 
    fileLinks: { label: string; url: string; type?: 'code' | 'design' | 'doc' | 'preview' }[]
  ) => {
    const newSubmission: DeliverableSubmission = {
      id: `del-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      title,
      releaseNotes,
      fileLinks,
      status: 'submitted'
    };

    let targetEng: Engagement | undefined;

    setEngagements(prev => prev.map(eng => {
      if (eng.id === engagementId) {
        targetEng = eng;
        // Notify business
        addNotification(eng.businessId, 'Deliverable Submitted', `${eng.talentName} submitted deliverables for review on "${eng.projectTitle}"`, 'deliverable');
        return {
          ...eng,
          status: 'deliverable_submitted',
          deliverables: [...eng.deliverables, newSubmission]
        };
      }
      return eng;
    }));

    if (targetEng) {
      const eng = targetEng;
      addActivity({
        userId: eng.businessId,
        type: 'deliverable_event',
        title: 'Deliverables Ready for Review',
        description: `${eng.talentName} submitted deliverables for "${eng.projectTitle}": ${title}.`,
        isRead: false,
        actorName: eng.talentName,
        actorRole: 'talent',
        targetId: eng.id,
        linkTarget: 'engagement',
        badgeText: 'Review Required',
        badgeTone: 'warning'
      });

      addActivity({
        userId: eng.talentId,
        type: 'deliverable_event',
        title: 'Milestone Deliverable Submitted',
        description: `You submitted "${title}" for "${eng.projectTitle}".`,
        isRead: true,
        actorName: eng.talentName,
        actorRole: 'talent',
        targetId: eng.id,
        linkTarget: 'engagement',
        badgeText: 'Under Review',
        badgeTone: 'info'
      });
    }

    recordAuditLog('Deliverable Submitted', `Deliverable "${title}" submitted for engagement ${engagementId}`, 'engagement');
  };

  // Business: Request Revision
  const requestDeliverableRevision = (engagementId: string, feedback: string, specificPoints: string[]) => {
    const revision: RevisionRequest = {
      id: `rev-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      feedback,
      specificPoints
    };

    let targetEng: Engagement | undefined;

    setEngagements(prev => prev.map(eng => {
      if (eng.id === engagementId) {
        targetEng = eng;
        addNotification(eng.talentId, 'Revision Requested', `${eng.businessName} requested adjustments on "${eng.projectTitle}"`, 'revision');
        return {
          ...eng,
          status: 'revision_requested',
          revisionsUsed: eng.revisionsUsed + 1,
          revisions: [...eng.revisions, revision]
        };
      }
      return eng;
    }));

    if (targetEng) {
      const eng = targetEng;
      addActivity({
        userId: eng.talentId,
        type: 'revision_event',
        title: 'Revision Feedback on Milestone',
        description: `${eng.businessName} requested adjustments on "${eng.projectTitle}".`,
        isRead: false,
        actorName: eng.businessName,
        actorRole: 'business',
        targetId: eng.id,
        linkTarget: 'engagement',
        badgeText: 'Revision Requested',
        badgeTone: 'warning'
      });
    }

    recordAuditLog('Revision Requested', `Revision requested on engagement ${engagementId}`, 'engagement');
  };

  // Business: Accept Deliverables & Complete
  const acceptDeliverablesAndComplete = (engagementId: string) => {
    let completedEngagement: Engagement | null = null;

    setEngagements(prev => prev.map(eng => {
      if (eng.id === engagementId) {
        completedEngagement = {
          ...eng,
          status: 'completed',
          completedAt: new Date().toISOString(),
          deliverables: eng.deliverables.map(d => ({ ...d, status: 'accepted' as const }))
        };
        return completedEngagement;
      }
      return eng;
    }));

    if (completedEngagement) {
      const eng: Engagement = completedEngagement;
      // Mark project completed
      setProjects(prev => prev.map(p => p.id === eng.projectId ? { ...p, status: 'completed' } : p));

      // Update talent profile: completed count and earnings
      setTalentProfiles(prev => {
        const current = prev[eng.talentId];
        if (!current) return prev;
        return {
          ...prev,
          [eng.talentId]: {
            ...current,
            completedEngagementsCount: current.completedEngagementsCount + 1,
            totalEarnedKES: current.totalEarnedKES + eng.agreedBudgetKES
          }
        };
      });

      // Update business profile: total spent
      setBusinessProfiles(prev => {
        const current = prev[eng.businessId];
        if (!current) return prev;
        return {
          ...prev,
          [eng.businessId]: {
            ...current,
            totalSpentKES: current.totalSpentKES + eng.agreedBudgetKES
          }
        };
      });

      addNotification(eng.talentId, 'Project Accepted & Completed', `Deliverables accepted for "${eng.projectTitle}". Funds released. Please leave feedback!`, 'completion');
      
      addActivity({
        userId: eng.talentId,
        type: 'completion_event',
        title: 'Milestone Accepted & Payment Released',
        description: `${eng.businessName} accepted deliverables for "${eng.projectTitle}". KES ${eng.agreedBudgetKES.toLocaleString()} disbursed.`,
        isRead: false,
        actorName: eng.businessName,
        actorRole: 'business',
        targetId: eng.id,
        linkTarget: 'engagement',
        badgeText: 'Completed',
        badgeTone: 'success'
      });

      addActivity({
        userId: eng.businessId,
        type: 'completion_event',
        title: 'Engagement Accepted & Completed',
        description: `Completed "${eng.projectTitle}" with ${eng.talentName}. Testimonial feedback unlocked.`,
        isRead: true,
        actorName: currentUser ? currentUser.displayName : 'Business',
        actorRole: 'business',
        targetId: eng.id,
        linkTarget: 'engagement',
        badgeText: 'Completed',
        badgeTone: 'success'
      });

      recordAuditLog('Engagement Completed', `Engagement ${eng.id} accepted and completed. KES ${eng.agreedBudgetKES.toLocaleString()} verified.`, 'engagement');
    }
  };

  // Submit Review
  const submitReview = (engagementId: string, rating: number, comment: string) => {
    if (!currentUser) return;
    const isBusiness = currentUser.role === 'business';

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      engagementId,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorRole: currentUser.role as 'business' | 'talent',
      targetUserId: '',
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setEngagements(prev => prev.map(eng => {
      if (eng.id === engagementId) {
        if (isBusiness) {
          newReview.targetUserId = eng.talentId;
          // Update talent rating
          setTalentProfiles(tp => {
            const profile = tp[eng.talentId];
            if (!profile) return tp;
            const newRating = Number(((profile.rating * profile.completedEngagementsCount + rating) / (profile.completedEngagementsCount + 1)).toFixed(1));
            return {
              ...tp,
              [eng.talentId]: { ...profile, rating: newRating }
            };
          });
          return { ...eng, businessReview: newReview };
        } else {
          newReview.targetUserId = eng.businessId;
          return { ...eng, talentReview: newReview };
        }
      }
      return eng;
    }));

    const targetEngagement = engagements.find(e => e.id === engagementId);

    if (isBusiness && targetEngagement) {
      addActivity({
        userId: targetEngagement.talentId,
        type: 'review_event',
        title: 'New Verified Client Testimonial',
        description: `${currentUser.displayName} left a ${rating}-star verified review: "${comment.substring(0, 75)}..."`,
        isRead: false,
        actorName: currentUser.displayName,
        actorRole: 'business',
        targetId: targetEngagement.id,
        linkTarget: 'engagement',
        badgeText: `${rating} ★ Review`,
        badgeTone: 'accent'
      });
    }

    recordAuditLog('Review Submitted', `${currentUser.displayName} submitted ${rating}-star feedback for engagement ${engagementId}`, 'engagement');
  };

  // Business verification submission
  const submitBusinessVerification = (registrationNumber: string, taxId: string, documentName: string) => {
    if (!currentUser || currentUser.role !== 'business') return;

    setBusinessProfiles(prev => {
      const current = prev[currentUser.id];
      if (!current) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          registrationNumber,
          taxId,
          verificationDocumentName: documentName,
          verificationStatus: 'pending_review',
          verificationNotes: 'Submitted for verification review by KaziLink Governance team.'
        }
      };
    });

    recordAuditLog('Business Verification Requested', `Business ${currentUser.displayName} submitted registration documents for verification`, 'verification');
  };

  // Admin: Approve Business
  const approveBusinessVerification = (businessUserId: string, notes?: string) => {
    setBusinessProfiles(prev => {
      const current = prev[businessUserId];
      if (!current) return prev;
      return {
        ...prev,
        [businessUserId]: {
          ...current,
          verificationStatus: 'verified',
          verificationNotes: notes || 'Verified with Kenyan BRS Registry'
        }
      };
    });

    // Update their projects
    setProjects(prev => prev.map(p => p.businessId === businessUserId ? { ...p, businessVerified: true } : p));
    addNotification(businessUserId, 'Business Verified', 'Your business profile has been verified! Your project listings now bear the Verified badge.', 'verification');

    addActivity({
      userId: businessUserId,
      type: 'verification_event',
      title: 'Kenya BRS Business Verification Approved',
      description: 'Your business credentials have been verified. Verified Kenyan SME trust badge is now displayed on your listings.',
      isRead: false,
      actorName: 'KaziLink Governance',
      actorRole: 'admin',
      linkTarget: 'verification',
      badgeText: 'Verified SME',
      badgeTone: 'success'
    });

    recordAuditLog('Business Verified by Admin', `Admin approved business verification for user ${businessUserId}`, 'verification');
  };

  // Admin: Reject Business
  const rejectBusinessVerification = (businessUserId: string, notes?: string) => {
    setBusinessProfiles(prev => {
      const current = prev[businessUserId];
      if (!current) return prev;
      return {
        ...prev,
        [businessUserId]: {
          ...current,
          verificationStatus: 'rejected',
          verificationNotes: notes || 'Incomplete documentation or unverified registry record.'
        }
      };
    });
    addNotification(businessUserId, 'Verification Incomplete', `Verification request could not be approved: ${notes || 'Check registration details'}`, 'verification');
    recordAuditLog('Business Verification Rejected', `Admin rejected verification for user ${businessUserId}`, 'verification');
  };

  // Admin: Moderate Project
  const moderateProjectStatus = (projectId: string, newStatus: Project['status'], reason: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
    recordAuditLog('Project Moderated', `Project ${projectId} status set to ${newStatus}. Reason: ${reason}`, 'moderation');
  };

  // Reports
  const submitReport = (targetType: 'project' | 'user' | 'engagement', targetId: string, targetTitle: string, reason: string, details: string) => {
    if (!currentUser) return;
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      reportedByUserId: currentUser.id,
      reportedByEmail: currentUser.email,
      targetType,
      targetId,
      targetTitle,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);
    recordAuditLog('Content Reported', `${currentUser.email} reported ${targetType} "${targetTitle}" for: ${reason}`, 'moderation');
  };

  const resolveReport = (reportId: string, resolutionNotes: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved', resolutionNotes } : r));
    recordAuditLog('Report Resolved', `Admin resolved report ${reportId}: ${resolutionNotes}`, 'moderation');
  };

  // Talent Profile updates
  const updateTalentProfile = (data: Partial<TalentProfile>) => {
    if (!currentUser || currentUser.role !== 'talent') return;
    setTalentProfiles(prev => {
      const current = prev[currentUser.id];
      if (!current) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          ...data
        }
      };
    });
    recordAuditLog('Talent Profile Updated', `Talent ${currentUser.displayName} updated profile details`, 'auth');
  };

  // Add Skill with Evidence (Proof-to-Work)
  const addSkillEvidence = (skillData: Omit<TalentSkill, 'id'>) => {
    if (!currentUser || currentUser.role !== 'talent') return;
    const newSkill: TalentSkill = {
      ...skillData,
      id: `sk-${Date.now()}`
    };

    setTalentProfiles(prev => {
      const current = prev[currentUser.id];
      if (!current) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          skills: [...current.skills, newSkill]
        }
      };
    });

    recordAuditLog('Skill Evidence Added', `Talent ${currentUser.displayName} attached proof for skill "${newSkill.name}" (${newSkill.evidenceType})`, 'auth');
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setUsers(SEED_USERS);
    setCurrentUserId('usr-talent-1');
    setTalentProfiles(SEED_TALENT_PROFILES);
    setBusinessProfiles(SEED_BUSINESS_PROFILES);
    setProjects(SEED_PROJECTS);
    setApplications(SEED_APPLICATIONS);
    setEngagements(SEED_ENGAGEMENTS);
    setCategories(SEED_CATEGORIES);
    setAuditLogs(SEED_AUDIT_LOGS);
    setReports(SEED_REPORTS);
    setInvitations(SEED_INVITATIONS);
    setActivities(SEED_ACTIVITIES);
    setActiveView('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        talentProfiles,
        businessProfiles,
        projects,
        applications,
        engagements,
        categories,
        auditLogs,
        reports,
        notifications,
        activities,
        invitations,

        activeView,
        setActiveView,
        selectedProjectId,
        setSelectedProjectId,
        selectedEngagementId,
        setSelectedEngagementId,
        selectedTalentId,
        setSelectedTalentId,

        switchUser,
        loginUser,
        registerUser,
        logoutUser,

        createProject,
        shortlistApplication,
        selectCandidateAndCreateEngagement,
        requestDeliverableRevision,
        acceptDeliverablesAndComplete,
        submitReview,
        submitBusinessVerification,

        submitApplication,
        submitDeliverable,
        updateTalentProfile,
        addSkillEvidence,

        approveBusinessVerification,
        rejectBusinessVerification,
        moderateProjectStatus,
        submitReport,
        resolveReport,

        addActivity,
        markActivityAsRead,
        markAllActivitiesAsRead,
        sendProjectInvitation,
        respondToInvitation,

        resetToDefaults,
        recordAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
