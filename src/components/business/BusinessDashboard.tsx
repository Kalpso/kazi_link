import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  UserCheck, 
  FileText, 
  DollarSign,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Project, Application, WorkArrangement } from '../../types';

interface BusinessDashboardProps {
  onOpenEngagement: (engagementId: string) => void;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ onOpenEngagement }) => {
  const { 
    currentUser, 
    businessProfiles, 
    projects, 
    applications, 
    engagements, 
    categories,
    createProject,
    shortlistApplication,
    selectCandidateAndCreateEngagement,
    submitBusinessVerification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'post_project' | 'projects' | 'candidates' | 'engagements' | 'verification'>('overview');

  // Post Project Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Website Development & Setup');
  const [budgetKES, setBudgetKES] = useState(35000);
  const [deliveryDeadline, setDeliveryDeadline] = useState('2026-11-20');
  const [applicationDeadline, setApplicationDeadline] = useState('2026-11-05');
  const [summary, setSummary] = useState('');
  const [detailedBrief, setDetailedBrief] = useState('');
  const [arrangement, setArrangement] = useState<WorkArrangement>('remote');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [revisionAllowance, setRevisionAllowance] = useState(2);
  const [requiredSkills, setRequiredSkills] = useState('React, TypeScript, Tailwind CSS');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Production-ready codebase on GitHub',
    'Deployed preview link with user instructions'
  ]);
  const [postSuccess, setPostSuccess] = useState(false);

  // Business Verification State
  const [regNumber, setRegNumber] = useState('');
  const [kraPin, setKraPin] = useState('');
  const [docName, setDocName] = useState('Certificate_of_Incorporation.pdf');
  const [verifySuccess, setVerifySuccess] = useState(false);

  if (!currentUser) return null;

  const profile = businessProfiles[currentUser.id] || {
    userId: currentUser.id,
    companyName: currentUser.displayName,
    industry: 'Commerce & Services',
    location: 'Nairobi, Kenya',
    bio: 'SME member on KaziLink looking for verified African digital talent.',
    contactPerson: currentUser.displayName,
    verificationStatus: 'unverified',
    projectsPostedCount: 0,
    totalSpentKES: 0
  };

  const myProjects = projects.filter(p => p.businessId === currentUser.id);
  const myEngagements = engagements.filter(e => e.businessId === currentUser.id);
  
  // Applications for this business's projects
  const myProjectIds = myProjects.map(p => p.id);
  const receivedApplications = applications.filter(a => myProjectIds.includes(a.projectId));
  const pendingReviewApps = receivedApplications.filter(a => a.status === 'submitted' || a.status === 'shortlisted');

  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, '']);
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleDeliverableChange = (index: number, val: string) => {
    const updated = [...deliverables];
    updated[index] = val;
    setDeliverables(updated);
  };

  const handlePostProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !detailedBrief.trim()) return;

    const skillsArray = requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
    const validDeliverables = deliverables.filter(d => d.trim().length > 0);

    createProject({
      title,
      category,
      summary: summary || title,
      detailedBrief,
      budgetKES: Number(budgetKES),
      currency: 'KES',
      deliveryDeadline,
      applicationDeadline,
      deliverables: validDeliverables,
      revisionAllowance: Number(revisionAllowance),
      arrangement,
      location,
      requiredSkills: skillsArray,
      status: 'open'
    });

    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('projects');
      setTitle('');
      setSummary('');
      setDetailedBrief('');
    }, 1500);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber.trim() || !kraPin.trim()) return;
    submitBusinessVerification(regNumber, kraPin, docName);
    setVerifySuccess(true);
    setTimeout(() => setVerifySuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Card */}
      <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.displayName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/20 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">
                  {profile.companyName}
                </h1>
                {profile.verificationStatus === 'verified' ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded border border-[#B8F34A]/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified SME
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveTab('verification')}
                    className="text-[11px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20 hover:bg-[#F59E0B]/20"
                  >
                    Pending Verification
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#A6B2C2] mt-0.5 font-medium">
                {profile.industry} · {profile.location}
              </p>
              <p className="text-xs text-[#78869A] mt-1">
                Contact: <span className="text-[#F5F7FA]">{profile.contactPerson}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('post_project')}
              className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post a Project</span>
            </button>
          </div>
        </div>

        {/* Real Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Published Listings</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">
              {myProjects.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Applicants to Review</span>
            <span className="text-lg font-bold text-[#B8F34A] font-mono tabular-nums">
              {pendingReviewApps.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Active Engagements</span>
            <span className="text-lg font-bold text-[#38BDF8] font-mono tabular-nums">
              {myEngagements.filter(e => e.status !== 'completed').length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Gross Projects Value</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">
              KES {myProjects.reduce((acc, p) => acc + p.budgetKES, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('post_project')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'post_project' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post a Project</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'candidates' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Review Applicants ({pendingReviewApps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'projects' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          My Listings ({myProjects.length})
        </button>

        <button
          onClick={() => setActiveTab('engagements')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'engagements' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          Engagements ({myEngagements.length})
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'verification' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Business Verification</span>
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Deliverables awaiting review alert */}
          {myEngagements.filter(e => e.status === 'deliverable_submitted').length > 0 && (
            <div className="p-4 rounded-2xl glass-card-elevated border border-[#38BDF8]/40 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-semibold text-[#38BDF8] block">Deliverables Submitted for Review</span>
                <p className="text-[#A6B2C2]">
                  Talent has submitted work on active engagements. Inspect files and confirm acceptance.
                </p>
              </div>
              <button
                onClick={() => onOpenEngagement(myEngagements.find(e => e.status === 'deliverable_submitted')!.id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#38BDF8] rounded-lg cursor-pointer shrink-0"
              >
                Inspect Work
              </button>
            </div>
          )}

          {/* Quick Split: Active Engagements & Candidate Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-[#F5F7FA]">Active Engagement Workspaces</h3>
                <button onClick={() => setActiveTab('engagements')} className="text-xs text-[#B8F34A] hover:underline">
                  View All
                </button>
              </div>

              {myEngagements.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#78869A]">No active engagements yet.</div>
              ) : (
                <div className="space-y-3">
                  {myEngagements.map(eng => (
                    <div
                      key={eng.id}
                      onClick={() => onOpenEngagement(eng.id)}
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F5F7FA]">{eng.projectTitle}</span>
                        <span className="text-[10px] font-semibold text-[#B8F34A] uppercase">{eng.status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#A6B2C2]">
                        <span>Talent: {eng.talentName}</span>
                        <span className="font-mono text-[#F5F7FA]">KES {eng.agreedBudgetKES.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-[#F5F7FA]">Applicants Ready for Review</h3>
                <button onClick={() => setActiveTab('candidates')} className="text-xs text-[#B8F34A] hover:underline">
                  Review All
                </button>
              </div>

              {pendingReviewApps.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#78869A]">No candidates awaiting review.</div>
              ) : (
                <div className="space-y-3">
                  {pendingReviewApps.slice(0, 3).map(app => (
                    <div key={app.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F5F7FA]">{app.talentName}</span>
                        <span className="text-xs font-mono text-[#B8F34A]">KES {app.proposedRateKES.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-[#A6B2C2] line-clamp-2">{app.coverNote}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#78869A]">{app.projectTitle}</span>
                        <button
                          onClick={() => setActiveTab('candidates')}
                          className="text-[11px] text-[#B8F34A] hover:underline font-semibold"
                        >
                          Review Attached Proof →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Post a Project */}
      {activeTab === 'post_project' && (
        <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 max-w-4xl mx-auto">
          <div className="pb-4 mb-6 border-b border-white/10">
            <h2 className="text-lg font-bold text-[#F5F7FA]">Post a Structured Digital Project</h2>
            <p className="text-xs text-[#A6B2C2] mt-1">
              Specify explicit deliverables and revision allowances to protect both your business and candidate delivery expectations.
            </p>
          </div>

          {postSuccess && (
            <div className="p-4 mb-6 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Project published successfully to KaziLink Kenya Pilot marketplace!</span>
            </div>
          )}

          <form onSubmit={handlePostProjectSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-[#A6B2C2] mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Next.js E-Commerce Storefront with M-Pesa Checkout"
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Service Category *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101927] border border-white/15 rounded-lg text-[#F5F7FA]"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Budget (KES) *</label>
                <input
                  type="number"
                  step={1000}
                  required
                  value={budgetKES}
                  onChange={e => setBudgetKES(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Delivery Deadline *</label>
                <input
                  type="date"
                  required
                  value={deliveryDeadline}
                  onChange={e => setDeliveryDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Application Deadline *</label>
                <input
                  type="date"
                  required
                  value={applicationDeadline}
                  onChange={e => setApplicationDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Revision Rounds Included</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={revisionAllowance}
                  onChange={e => setRevisionAllowance(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#A6B2C2] mb-1">Short Summary (1-2 sentences)</label>
              <input
                type="text"
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Brief high-level description for card previews..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#A6B2C2] mb-1">Detailed Project Brief & Scope *</label>
              <textarea
                rows={5}
                required
                value={detailedBrief}
                onChange={e => setDetailedBrief(e.target.value)}
                placeholder="Describe project background, specific requirements, technical stacks, and expected quality thresholds..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-medium text-[#A6B2C2] mb-1">Required Skills (comma-separated)</label>
              <input
                type="text"
                value={requiredSkills}
                onChange={e => setRequiredSkills(e.target.value)}
                placeholder="e.g. React, TypeScript, Tailwind CSS"
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA]"
              />
            </div>

            {/* Deliverables List Builder */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-medium text-[#A6B2C2]">Specific Acceptance Deliverables *</label>
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="text-[11px] text-[#B8F34A] hover:underline"
                >
                  + Add Deliverable
                </button>
              </div>

              <div className="space-y-2">
                {deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={del}
                      onChange={e => handleDeliverableChange(idx, e.target.value)}
                      placeholder={`Deliverable #${idx + 1}`}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F7FA] text-xs"
                    />
                    {deliverables.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="p-2 text-[#EF4444] hover:bg-white/5 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 text-xs font-medium text-[#A6B2C2] hover:text-[#F5F7FA]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md"
              >
                Publish Project to Kenya Pilot
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Candidates Reviewer */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">
              Received Proposals & Proof-to-Work Evidence ({receivedApplications.length})
            </h3>

            {receivedApplications.length === 0 ? (
              <p className="text-xs text-[#78869A]">No applications received for your projects yet.</p>
            ) : (
              <div className="space-y-4">
                {receivedApplications.map(app => (
                  <div key={app.id} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#F5F7FA]">{app.talentName}</h4>
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                            app.status === 'selected' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-white/10 text-[#A6B2C2]'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#A6B2C2] mt-0.5">{app.talentHeadline} · {app.talentLocation}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#B8F34A] font-mono tabular-nums">
                          KES {app.proposedRateKES.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#78869A] block">in {app.proposedTimelineDays} days</span>
                      </div>
                    </div>

                    {/* Proposal Cover Note */}
                    <div>
                      <span className="text-[11px] font-semibold text-[#78869A] block mb-1">Proposal & Delivery Plan:</span>
                      <p className="text-xs text-[#F5F7FA] leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                        {app.coverNote}
                      </p>
                    </div>

                    {/* Attached Proof-to-Work Evidence Samples */}
                    <div>
                      <span className="text-[11px] font-semibold text-[#B8F34A] block mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Attached Proof-to-Work Work Samples ({app.attachedEvidenceLinks.length})</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {app.attachedEvidenceLinks.map((link, lIdx) => (
                          <div key={lIdx} className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#F5F7FA] truncate">{link.title}</span>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B8F34A] hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <span>Inspect</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            {link.description && (
                              <p className="text-[10px] text-[#A6B2C2]">{link.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[11px] text-[#78869A]">
                        Applied to: <span className="text-[#F5F7FA] font-medium">{app.projectTitle}</span>
                      </span>

                      {app.status !== 'selected' && (
                        <div className="flex items-center gap-2">
                          {app.status !== 'shortlisted' && (
                            <button
                              onClick={() => shortlistApplication(app.id)}
                              className="px-3 py-1.5 text-xs text-[#F5F7FA] bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                            >
                              Shortlist
                            </button>
                          )}
                          <button
                            onClick={() => selectCandidateAndCreateEngagement(app.projectId, app.id)}
                            className="px-4 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Select Candidate & Start Workspace</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: My Listings */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">Your Project Postings</h3>
            <div className="space-y-3">
              {myProjects.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#F5F7FA]">{p.title}</span>
                    <span className="text-xs font-bold text-[#B8F34A] font-mono">
                      KES {p.budgetKES.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#A6B2C2] line-clamp-2">{p.summary}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#78869A] pt-2 border-t border-white/5">
                    <span>Status: <span className="text-[#F5F7FA] uppercase font-semibold">{p.status}</span></span>
                    <span>{p.applicationsCount} applicants received</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Engagements */}
      {activeTab === 'engagements' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">Milestone Engagements</h3>
            {myEngagements.length === 0 ? (
              <p className="text-xs text-[#78869A]">No active engagements yet. Select a candidate to start an engagement.</p>
            ) : (
              <div className="space-y-3">
                {myEngagements.map(eng => (
                  <div
                    key={eng.id}
                    onClick={() => onOpenEngagement(eng.id)}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#F5F7FA]">{eng.projectTitle}</span>
                      <span className="text-[11px] font-semibold uppercase text-[#B8F34A]">{eng.status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#A6B2C2]">
                      <span>Talent: {eng.talentName}</span>
                      <span className="font-mono text-[#F5F7FA]">KES {eng.agreedBudgetKES.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-end pt-2">
                      <span className="text-xs text-[#B8F34A] font-semibold flex items-center gap-1">
                        <span>Open Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Business Verification */}
      {activeTab === 'verification' && (
        <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 max-w-2xl mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[#B8F34A] mb-1 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Kenyan Business Verification (BRS & KRA)</span>
            </div>
            <p className="text-xs text-[#A6B2C2]">
              Verified businesses display trust badges on all project listings, accelerating candidate confidence and proposal quality.
            </p>
          </div>

          {verifySuccess && (
            <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Documents submitted for verification review by KaziLink Governance team!</span>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
            <span className="text-[#78869A] block">Current Status:</span>
            <span className="font-semibold text-sm text-[#F5F7FA] uppercase">
              {profile.verificationStatus}
            </span>
            {profile.verificationNotes && (
              <p className="text-[11px] text-[#A6B2C2] mt-1">{profile.verificationNotes}</p>
            )}
          </div>

          <form onSubmit={handleVerificationSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A6B2C2] mb-1">BRS Business Registration Number *</label>
              <input
                type="text"
                required
                value={regNumber}
                onChange={e => setRegNumber(e.target.value)}
                placeholder="e.g. CPR/2023/118249 or BN/2024/..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
              />
            </div>

            <div>
              <label className="block text-[#A6B2C2] mb-1">KRA Tax PIN *</label>
              <input
                type="text"
                required
                value={kraPin}
                onChange={e => setKraPin(e.target.value)}
                placeholder="e.g. P051892340M"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
              />
            </div>

            <div>
              <label className="block text-[#A6B2C2] mb-1">Registration Document (Certificate / Permit)</label>
              <input
                type="text"
                value={docName}
                onChange={e => setDocName(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F7FA]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Submit for Admin Verification
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
