export type UserRole = 'talent' | 'business' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  avatarUrl: string;
  phone?: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
}

export type SkillEvidenceType = 'github_repo' | 'live_url' | 'figma_prototype' | 'portfolio_file' | 'completed_engagement';
export type SkillVerificationStatus = 'self_declared' | 'evidence_attached' | 'client_verified';

export interface TalentSkill {
  id: string;
  name: string;
  category: string;
  status: SkillVerificationStatus;
  evidenceType?: SkillEvidenceType;
  evidenceUrl?: string;
  evidenceTitle?: string;
  evidenceDescription?: string;
  verifiedByEngagementId?: string;
}

export interface WorkSample {
  id: string;
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  category: string;
  skillsUsed: string[];
  thumbnailUrl?: string;
}

export interface TalentProfile {
  userId: string;
  headline: string;
  bio: string;
  location: string;
  availability: 'available' | 'part_time' | 'booked';
  languages: string[];
  preferredCategories: string[];
  hourlyRateKES?: number;
  education?: { degree: string; institution: string; year: string }[];
  skills: TalentSkill[];
  workSamples: WorkSample[];
  completedEngagementsCount: number;
  rating: number;
  totalEarnedKES: number;
}

export type BusinessVerificationStatus = 'unverified' | 'pending_review' | 'verified' | 'rejected';

export interface BusinessProfile {
  userId: string;
  companyName: string;
  industry: string;
  location: string;
  website?: string;
  bio: string;
  contactPerson: string;
  verificationStatus: BusinessVerificationStatus;
  registrationNumber?: string;
  taxId?: string;
  verificationDocumentName?: string;
  verificationNotes?: string;
  projectsPostedCount: number;
  totalSpentKES: number;
}

export type ProjectStatus = 'draft' | 'open' | 'shortlisting' | 'in_progress' | 'completed' | 'cancelled' | 'flagged';
export type WorkArrangement = 'remote' | 'on_site' | 'hybrid';

export interface Project {
  id: string;
  businessId: string;
  businessName: string;
  businessVerified: boolean;
  businessLocation: string;
  title: string;
  category: string;
  summary: string;
  detailedBrief: string;
  requiredSkills: string[];
  budgetKES: number;
  currency: 'KES' | 'USD';
  deliveryDeadline: string;
  applicationDeadline: string;
  deliverables: string[];
  revisionAllowance: number;
  arrangement: WorkArrangement;
  location: string;
  status: ProjectStatus;
  createdAt: string;
  applicationsCount: number;
}

export type ApplicationStatus = 'submitted' | 'shortlisted' | 'selected' | 'declined' | 'withdrawn';

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  talentHeadline: string;
  talentLocation: string;
  coverNote: string;
  proposedTimelineDays: number;
  proposedRateKES: number;
  attachedEvidenceLinks: { title: string; url: string; description: string }[];
  status: ApplicationStatus;
  createdAt: string;
}

export interface DeliverableFile {
  label: string;
  url: string;
  type?: 'code' | 'design' | 'doc' | 'preview';
}

export interface DeliverableSubmission {
  id: string;
  submittedAt: string;
  title: string;
  releaseNotes: string;
  fileLinks: DeliverableFile[];
  status: 'submitted' | 'revision_requested' | 'accepted';
}

export interface RevisionRequest {
  id: string;
  requestedAt: string;
  feedback: string;
  specificPoints: string[];
}

export interface Review {
  id: string;
  engagementId: string;
  authorId: string;
  authorName: string;
  authorRole: 'business' | 'talent';
  targetUserId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export type EngagementStatus = 'active' | 'deliverable_submitted' | 'revision_requested' | 'completed' | 'disputed';

export interface Engagement {
  id: string;
  projectId: string;
  projectTitle: string;
  category: string;
  businessId: string;
  businessName: string;
  talentId: string;
  talentName: string;
  talentAvatar: string;
  agreedBudgetKES: number;
  agreedDeadline: string;
  revisionAllowance: number;
  revisionsUsed: number;
  status: EngagementStatus;
  deliverables: DeliverableSubmission[];
  revisions: RevisionRequest[];
  createdAt: string;
  completedAt?: string;
  businessReview?: Review;
  talentReview?: Review;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  description: string;
  isPilotPriority: boolean;
  projectCount: number;
  typicalBudgetKES: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  details: string;
  category: 'auth' | 'project' | 'engagement' | 'verification' | 'moderation';
}

export interface ReportItem {
  id: string;
  reportedByUserId: string;
  reportedByEmail: string;
  targetType: 'project' | 'user' | 'engagement';
  targetId: string;
  targetTitle: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolutionNotes?: string;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'shortlist' | 'selection' | 'deliverable' | 'revision' | 'completion' | 'verification';
  linkTarget?: string;
  isRead: boolean;
  createdAt: string;
}
