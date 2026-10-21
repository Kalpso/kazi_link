import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  Layers, 
  Briefcase, 
  ExternalLink, 
  Github, 
  Figma, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  FileText, 
  ShieldCheck, 
  Search,
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { TalentSkill, SkillEvidenceType, Project } from '../../types';

interface TalentDashboardProps {
  onOpenProjectDetail: (project: Project) => void;
  onOpenEngagement: (engagementId: string) => void;
}

export const TalentDashboard: React.FC<TalentDashboardProps> = ({
  onOpenProjectDetail,
  onOpenEngagement
}) => {
  const { 
    currentUser, 
    talentProfiles, 
    projects, 
    applications, 
    engagements, 
    categories,
    addSkillEvidence,
    updateTalentProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'proof_of_work' | 'browse' | 'applications' | 'engagements'>('overview');

  // Search & Filter state for Browse
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [arrangementFilter, setArrangementFilter] = useState<string>('all');

  // Add Skill Form State
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('Website Development & Setup');
  const [evidenceType, setEvidenceType] = useState<SkillEvidenceType>('github_repo');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');

  if (!currentUser) return null;

  const profile = talentProfiles[currentUser.id] || {
    userId: currentUser.id,
    headline: 'Emerging Digital Specialist',
    bio: 'Ready to build verified portfolio through structured engagements on KaziLink.',
    location: 'Nairobi, Kenya',
    availability: 'available',
    languages: ['English', 'Swahili'],
    preferredCategories: ['Website Development & Setup'],
    hourlyRateKES: 2500,
    skills: [],
    workSamples: [],
    completedEngagementsCount: 0,
    rating: 5.0,
    totalEarnedKES: 0
  };

  const myApplications = applications.filter(a => a.talentId === currentUser.id);
  const myEngagements = engagements.filter(e => e.talentId === currentUser.id);
  const activeEngagements = myEngagements.filter(e => e.status !== 'completed');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesArrangement = arrangementFilter === 'all' || p.arrangement === arrangementFilter;
    return matchesSearch && matchesCategory && matchesArrangement;
  });

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim() || !evidenceUrl.trim()) return;

    addSkillEvidence({
      name: skillName,
      category: skillCategory,
      status: 'evidence_attached',
      evidenceType,
      evidenceUrl,
      evidenceTitle: evidenceTitle || skillName,
      evidenceDescription: evidenceDesc
    });

    setShowAddSkill(false);
    setSkillName('');
    setEvidenceUrl('');
    setEvidenceTitle('');
    setEvidenceDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Welcome Card */}
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
                  {currentUser.displayName}
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#B8F34A]/10 text-[#B8F34A] border border-[#B8F34A]/20">
                  Talent Account
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A6B2C2] mt-0.5 font-medium">
                {profile.headline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#78869A] mt-2">
                <span className="flex items-center gap-1 text-[#A6B2C2]">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#22C55E] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  {profile.availability === 'available' ? 'Available for Pilot Engagements' : 'Partially Booked'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#F5F7FA]">
                  Rating: ★ {profile.rating.toFixed(1)} ({profile.completedEngagementsCount} completed)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse Pilot Projects</span>
            </button>
          </div>
        </div>

        {/* Real Performance Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Active Engagements</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">
              {activeEngagements.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Applications Submitted</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">
              {myApplications.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Verified Proofs Attached</span>
            <span className="text-lg font-bold text-[#B8F34A] font-mono tabular-nums">
              {profile.skills.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Total Realized Earnings</span>
            <span className="text-lg font-bold text-[#22C55E] font-mono tabular-nums">
              KES {profile.totalEarnedKES.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Functional Segmented Control) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm'
              : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('proof_of_work')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'proof_of_work'
              ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm'
              : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Proof-to-Work & Skills ({profile.skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'browse'
              ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm'
              : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse Projects ({projects.filter(p => p.status === 'open').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm'
              : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          My Applications ({myApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('engagements')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'engagements'
              ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm'
              : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          Active Engagements ({myEngagements.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Active Workspaces Alert if any */}
          {activeEngagements.length > 0 && (
            <div className="p-4 rounded-2xl glass-card-elevated border border-[#B8F34A]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B8F34A]">
                  <Clock className="w-4 h-4" />
                  <span>Active Milestone Workspace Needs Attention</span>
                </div>
                <button
                  onClick={() => onOpenEngagement(activeEngagements[0].id)}
                  className="text-xs text-[#B8F34A] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-2 text-xs text-[#F5F7FA]">
                <p className="font-semibold">{activeEngagements[0].projectTitle}</p>
                <p className="text-[11px] text-[#A6B2C2]">
                  Client: {activeEngagements[0].businessName} · Agreed Budget: KES {activeEngagements[0].agreedBudgetKES.toLocaleString()} · Deadline: {activeEngagements[0].agreedDeadline}
                </p>
              </div>
            </div>
          )}

          {/* 2-Column Split: Recommended Projects & Recent Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recommended Projects */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-[#F5F7FA]">Recommended Pilot Projects</h3>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-xs text-[#B8F34A] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProjectDetail(p)}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#B8F34A]">{p.category}</span>
                      <span className="text-xs font-bold text-[#F5F7FA] font-mono tabular-nums">
                        KES {p.budgetKES.toLocaleString()}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#F5F7FA] group-hover:text-[#B8F34A] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-[#A6B2C2] line-clamp-2">
                      {p.summary}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-[#78869A] pt-1 border-t border-white/5">
                      <span>{p.businessName}</span>
                      <span>Deadline: {p.deliveryDeadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-[#F5F7FA]">Your Applications Tracker</h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-[#B8F34A] hover:underline"
                >
                  Manage
                </button>
              </div>

              {myApplications.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-white/5">
                  <p className="text-xs text-[#78869A]">No active proposals submitted yet.</p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="mt-2 text-xs text-[#B8F34A] hover:underline"
                  >
                    Browse available projects →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myApplications.map(app => (
                    <div key={app.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F5F7FA]">{app.projectTitle}</span>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          app.status === 'selected' 
                            ? 'bg-[#22C55E]/20 text-[#22C55E]' 
                            : app.status === 'shortlisted'
                            ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
                            : 'bg-white/10 text-[#A6B2C2]'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#78869A]">
                        <span>Fee: KES {app.proposedRateKES.toLocaleString()}</span>
                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Proof-to-Work & Skills Manager */}
      {activeTab === 'proof_of_work' && (
        <div className="space-y-6">
          <div className="glass-card-elevated rounded-2xl p-6 border border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-[#F5F7FA]">Proof-to-Work Verified Skills</h2>
                <p className="text-xs text-[#A6B2C2] mt-0.5">
                  KaziLink displays only demonstrable skills backed by real code repositories, prototypes, or completed client engagements.
                </p>
              </div>
              <button
                onClick={() => setShowAddSkill(true)}
                className="px-3.5 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Attach New Proof Sample</span>
              </button>
            </div>

            {/* Add Skill Form Modal / Collapsible */}
            {showAddSkill && (
              <form onSubmit={handleAddSkillSubmit} className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs">
                <span className="font-semibold text-xs text-[#F5F7FA] block">Attach Skill with Verifiable Evidence</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A6B2C2] mb-1">Skill Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js & Server Actions"
                      value={skillName}
                      onChange={e => setSkillName(e.target.value)}
                      className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A6B2C2] mb-1">Service Category</label>
                    <select
                      value={skillCategory}
                      onChange={e => setSkillCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#101927] border border-white/10 rounded-lg text-[#F5F7FA]"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A6B2C2] mb-1">Evidence Type</label>
                    <select
                      value={evidenceType}
                      // @ts-ignore
                      onChange={e => setEvidenceType(e.target.value as SkillEvidenceType)}
                      className="w-full px-3 py-2 bg-[#101927] border border-white/10 rounded-lg text-[#F5F7FA]"
                    >
                      <option value="github_repo">GitHub Repository</option>
                      <option value="live_url">Live Web Application URL</option>
                      <option value="figma_prototype">Figma Design System / Prototype</option>
                      <option value="portfolio_file">Behance / Drive File Showcase</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A6B2C2] mb-1">Evidence Title / Artifact Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Tea Estate Inventory Dashboard"
                      value={evidenceTitle}
                      onChange={e => setEvidenceTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A6B2C2] mb-1">Verifiable URL / Repository Link *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/... or https://..."
                    value={evidenceUrl}
                    onChange={e => setEvidenceUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
                  />
                </div>

                <div>
                  <label className="block text-[#A6B2C2] mb-1">Technical Context & Implementation Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Describe what you engineered, performance optimizations, and technologies involved..."
                    value={evidenceDesc}
                    onChange={e => setEvidenceDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddSkill(false)}
                    className="px-3 py-1.5 text-[#A6B2C2] hover:text-[#F5F7FA]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 font-semibold text-[#0B1220] bg-[#B8F34A] rounded-lg"
                  >
                    Save & Attach to Profile
                  </button>
                </div>
              </form>
            )}

            {/* List of Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {profile.skills.map(skill => (
                <div key={skill.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#F5F7FA]">{skill.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      skill.status === 'client_verified'
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/20'
                        : 'bg-[#B8F34A]/15 text-[#B8F34A] border border-[#B8F34A]/20'
                    }`}>
                      {skill.status === 'client_verified' ? 'Client Verified' : 'Evidence Attached'}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A6B2C2]">
                    Category: <span className="text-[#F5F7FA]">{skill.category}</span>
                  </p>

                  {skill.evidenceUrl && (
                    <div className="p-2.5 rounded-lg bg-black/20 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#F5F7FA] truncate max-w-[200px]">
                          {skill.evidenceTitle || 'Work Evidence Sample'}
                        </span>
                        <a
                          href={skill.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B8F34A] hover:underline text-[11px] flex items-center gap-1 shrink-0"
                        >
                          <span>Inspect Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      {skill.evidenceDescription && (
                        <p className="text-[10px] text-[#78869A] leading-relaxed">
                          {skill.evidenceDescription}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Browse Projects */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#78869A] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search projects by title, deliverables, or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-[#101927] border border-white/10 rounded-xl text-[#F5F7FA]"
              >
                <option value="all">All Service Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>

              <select
                value={arrangementFilter}
                onChange={e => setArrangementFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#101927] border border-white/10 rounded-xl text-[#F5F7FA]"
              >
                <option value="all">All Arrangements</option>
                <option value="remote">Remote Only</option>
                <option value="on_site">On-Site Nairobi</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => onOpenProjectDetail(project)}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#B8F34A]/40 transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B8F34A]">{project.category}</span>
                  <span className="text-sm font-bold text-[#F5F7FA] font-mono tabular-nums">
                    KES {project.budgetKES.toLocaleString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#F5F7FA] group-hover:text-[#B8F34A] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#A6B2C2] mt-1 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-[#A6B2C2]">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-[#78869A]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F5F7FA] font-medium">{project.businessName}</span>
                    {project.businessVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B8F34A]" />
                    )}
                  </div>
                  <span className="text-[#B8F34A] font-semibold flex items-center gap-1">
                    <span>View Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: My Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">Your Proposal Applications</h3>
            {myApplications.length === 0 ? (
              <p className="text-xs text-[#78869A]">No applications submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {myApplications.map(app => (
                  <div key={app.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#F5F7FA]">{app.projectTitle}</span>
                      <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded ${
                        app.status === 'selected'
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/20'
                          : app.status === 'shortlisted'
                          ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/20'
                          : 'bg-white/10 text-[#A6B2C2]'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#A6B2C2] leading-relaxed">
                      {app.coverNote}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-[#78869A]">
                      <span>Proposed: KES {app.proposedRateKES.toLocaleString()} in {app.proposedTimelineDays} days</span>
                      <span>Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Active Engagements */}
      {activeTab === 'engagements' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">Milestone Engagements</h3>
            {myEngagements.length === 0 ? (
              <p className="text-xs text-[#78869A]">No engagements active yet. Apply to projects to get selected!</p>
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
                      <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded ${
                        eng.status === 'completed'
                          ? 'bg-[#22C55E]/15 text-[#22C55E]'
                          : 'bg-[#B8F34A]/15 text-[#B8F34A]'
                      }`}>
                        {eng.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#A6B2C2]">
                      <span>Hiring Business: {eng.businessName}</span>
                      <span className="font-mono text-[#B8F34A]">KES {eng.agreedBudgetKES.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-end pt-2">
                      <span className="text-xs text-[#B8F34A] hover:underline font-semibold flex items-center gap-1">
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
    </div>
  );
};
