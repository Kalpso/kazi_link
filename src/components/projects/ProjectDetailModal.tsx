import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenAuth
}) => {
  const { currentUser, submitApplication, applications } = useApp();
  const [isApplying, setIsApplying] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [proposedDays, setProposedDays] = useState(14);
  const [proposedRate, setProposedRate] = useState<number>(project ? project.budgetKES : 30000);
  const [evidenceLinks, setEvidenceLinks] = useState<{ title: string; url: string; description: string }[]>([
    { title: 'Relevant Code / Live Showcase', url: '', description: '' }
  ]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  if (!project) return null;

  const existingApp = currentUser ? applications.find(a => a.projectId === project.id && a.talentId === currentUser.id) : null;

  const handleAddEvidenceLink = () => {
    if (evidenceLinks.length < 3) {
      setEvidenceLinks([...evidenceLinks, { title: '', url: '', description: '' }]);
    }
  };

  const handleRemoveEvidenceLink = (index: number) => {
    setEvidenceLinks(evidenceLinks.filter((_, i) => i !== index));
  };

  const handleEvidenceChange = (index: number, field: 'title' | 'url' | 'description', val: string) => {
    const updated = [...evidenceLinks];
    updated[index][field] = val;
    setEvidenceLinks(updated);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (currentUser.role !== 'talent') {
      setFormError('Only Talent accounts can submit proposals. Please switch to a Talent persona.');
      return;
    }

    if (!coverNote.trim() || coverNote.length < 20) {
      setFormError('Please provide a substantive cover proposal explaining your technical approach (min 20 characters).');
      return;
    }

    const validLinks = evidenceLinks.filter(l => l.url.trim().length > 0);
    if (validLinks.length === 0) {
      setFormError('Proof-to-Work requirement: You must provide at least one verifiable work sample or repository link.');
      return;
    }

    const ok = submitApplication(
      project.id,
      coverNote,
      proposedDays,
      proposedRate,
      validLinks
    );

    if (ok) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsApplying(false);
        setSubmitSuccess(false);
        onClose();
      }, 1800);
    } else {
      setFormError('Could not submit proposal. Check that you have not already applied or project is active.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#A6B2C2] hover:text-[#F5F7FA] rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Zone */}
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A6B2C2] mb-2">
            <span className="text-[#B8F34A] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>{project.arrangement === 'remote' ? 'Remote Arrangement' : 'On-Site Nairobi'}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            {project.title}
          </h1>

          <div className="flex items-center gap-3 mt-3 pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-[#F5F7FA]">
              <span>{project.businessName}</span>
              {project.businessVerified && (
                <span className="flex items-center gap-0.5 text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Kenyan SME
                </span>
              )}
            </div>
            <span aria-hidden="true" className="text-[#78869A]">·</span>
            <span className="text-[#A6B2C2]">Posted {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Financial & Deadline Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Fixed Budget</span>
            <span className="text-base sm:text-lg font-bold text-[#B8F34A] font-mono tabular-nums">
              KES {project.budgetKES.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Delivery Deadline</span>
            <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA] font-mono">
              {project.deliveryDeadline}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Revision Limit</span>
            <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA]">
              {project.revisionAllowance} rounds included
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Applicants</span>
            <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA] font-mono tabular-nums">
              {project.applicationsCount} submitted
            </span>
          </div>
        </div>

        {!isApplying ? (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Overview & Brief */}
            <div>
              <h3 className="text-xs font-bold text-[#A6B2C2] uppercase tracking-wider mb-2">
                Project Brief & Context
              </h3>
              <p className="text-[#F5F7FA] leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                {project.detailedBrief}
              </p>
            </div>

            {/* Explicit Deliverables List */}
            <div>
              <h3 className="text-xs font-bold text-[#A6B2C2] uppercase tracking-wider mb-2.5">
                Required Deliverables (Acceptance Criteria)
              </h3>
              <ul className="space-y-2">
                {project.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-[#F5F7FA]">
                    <CheckCircle2 className="w-4 h-4 text-[#B8F34A] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div>
              <h3 className="text-xs font-bold text-[#A6B2C2] uppercase tracking-wider mb-2">
                Demonstrated Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-[#A6B2C2]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof-to-work Requirement Notice */}
            <div className="p-4 rounded-xl bg-[#B8F34A]/5 border border-[#B8F34A]/20 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#B8F34A] mb-1">
                <Layers className="w-4 h-4" />
                <span>Proof-to-Work Application Policy</span>
              </div>
              <p className="text-[#A6B2C2] leading-relaxed">
                KaziLink connects talent on demonstrated capability, not just CV assertions. When applying, you must provide at least one relevant live URL, GitHub repo, or Figma file demonstrating your prior execution in this domain.
              </p>
            </div>

            {/* Application Action Area */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              {existingApp ? (
                <div className="p-3 rounded-xl bg-white/5 border border-[#B8F34A]/30 w-full flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#B8F34A] block">Proposal Already Submitted</span>
                    <span className="text-[#A6B2C2]">Status: {existingApp.status.toUpperCase()}</span>
                  </div>
                  <span className="text-[11px] text-[#78869A] font-mono">
                    Submitted on {new Date(existingApp.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <>
                  <div className="text-xs text-[#78869A]">
                    Applications open until {project.applicationDeadline}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-medium text-[#A6B2C2] hover:text-[#F5F7FA] rounded-lg transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsApplying(true)}
                      className="px-5 py-2.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-2"
                    >
                      <span>Apply with Proof-to-Work</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Application Form Form */
          <form onSubmit={handleApplicationSubmit} className="space-y-4 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F5F7FA]">Submitting Proposal as:</span>
              <span className="text-[#B8F34A] font-medium">
                {currentUser ? `${currentUser.displayName} (${currentUser.role})` : 'Not Signed In'}
              </span>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Proposal submitted successfully! The client will review your attached evidence.</span>
              </div>
            )}

            {formError && (
              <div className="p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#A6B2C2] mb-1">
                Your Technical Proposal & Delivery Approach *
              </label>
              <textarea
                rows={4}
                required
                value={coverNote}
                onChange={e => setCoverNote(e.target.value)}
                placeholder="Explain clearly how you will approach this project, the architecture/tools you will use, and your availability during the milestone..."
                className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Proposed Timeline (Days)</label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={proposedDays}
                  onChange={e => setProposedDays(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A6B2C2] mb-1">Proposed Total Fee (KES)</label>
                <input
                  type="number"
                  step={500}
                  value={proposedRate}
                  onChange={e => setProposedRate(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] font-mono focus:outline-none focus:border-[#B8F34A]"
                />
              </div>
            </div>

            {/* Proof-to-Work Evidence Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[#A6B2C2]">
                  Attached Proof-to-Work Evidence (Live URL, GitHub, or Figma) *
                </label>
                {evidenceLinks.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddEvidenceLink}
                    className="text-[11px] text-[#B8F34A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Link</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {evidenceLinks.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#A6B2C2]">Evidence Sample #{idx + 1}</span>
                      {evidenceLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEvidenceLink(idx)}
                          className="text-[#EF4444] hover:text-[#F87171] p-1"
                          aria-label="Remove evidence"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Title (e.g. Nairobi Organic Portal)"
                        value={item.title}
                        onChange={e => handleEvidenceChange(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A]"
                      />
                      <input
                        type="url"
                        placeholder="https://github.com/... or https://..."
                        value={item.url}
                        onChange={e => handleEvidenceChange(idx, 'url', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A] font-mono text-[11px]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Brief description of what you personally built..."
                      value={item.description}
                      onChange={e => handleEvidenceChange(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] placeholder-[#78869A] focus:outline-none focus:border-[#B8F34A]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsApplying(false)}
                className="px-4 py-2 text-xs font-medium text-[#A6B2C2] hover:text-[#F5F7FA] rounded-lg transition-colors cursor-pointer"
              >
                Back to Brief
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md"
              >
                Submit Verified Proposal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
