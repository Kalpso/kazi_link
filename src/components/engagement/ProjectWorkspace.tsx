import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Engagement, DeliverableFile } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  FileCode, 
  Layers, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Send, 
  Plus, 
  ShieldAlert,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';

interface ProjectWorkspaceProps {
  engagementId: string;
  onBack: () => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ engagementId, onBack }) => {
  const { 
    engagements, 
    currentUser, 
    submitDeliverable, 
    requestDeliverableRevision, 
    acceptDeliverablesAndComplete,
    submitReview,
    submitReport
  } = useApp();

  const engagement = engagements.find(e => e.id === engagementId);

  // Deliverable Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [delTitle, setDelTitle] = useState('');
  const [delNotes, setDelNotes] = useState('');
  const [delLinks, setDelLinks] = useState<DeliverableFile[]>([
    { label: 'Live Preview / Deployment URL', url: '', type: 'preview' },
    { label: 'GitHub Repository / Source Code', url: '', type: 'code' }
  ]);

  // Revision Request State
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revFeedback, setRevFeedback] = useState('');
  const [revPoints, setRevPoints] = useState<string[]>(['']);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Dispute / Report State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Scope disagreement');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!engagement) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-[#F5F7FA]">Engagement Workspace Not Found</h2>
        <p className="text-xs text-[#A6B2C2] mt-2">The requested engagement record does not exist or has been removed.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isBusiness = currentUser?.id === engagement.businessId;
  const isTalent = currentUser?.id === engagement.talentId;

  const handleAddLink = () => {
    setDelLinks([...delLinks, { label: 'Additional File / Spec', url: '', type: 'doc' }]);
  };

  const handleLinkChange = (index: number, field: keyof DeliverableFile, value: string) => {
    const updated = [...delLinks];
    // @ts-ignore
    updated[index][field] = value;
    setDelLinks(updated);
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delTitle.trim() || !delNotes.trim()) return;
    const validLinks = delLinks.filter(l => l.url.trim().length > 0);
    submitDeliverable(engagement.id, delTitle, delNotes, validLinks);
    setShowSubmitModal(false);
    setDelTitle('');
    setDelNotes('');
  };

  const handleAddRevisionPoint = () => {
    setRevPoints([...revPoints, '']);
  };

  const handleRevisionPointChange = (index: number, val: string) => {
    const updated = [...revPoints];
    updated[index] = val;
    setRevPoints(updated);
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revFeedback.trim()) return;
    const validPoints = revPoints.filter(p => p.trim().length > 0);
    requestDeliverableRevision(engagement.id, revFeedback, validPoints);
    setShowRevisionModal(false);
    setRevFeedback('');
    setRevPoints(['']);
  };

  const handleAcceptAndComplete = () => {
    if (confirm(`Accept deliverables and release payment of KES ${engagement.agreedBudgetKES.toLocaleString()} to ${engagement.talentName}?`)) {
      acceptDeliverablesAndComplete(engagement.id);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    submitReview(engagement.id, reviewRating, reviewComment);
    setReviewSubmitted(true);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;
    submitReport('engagement', engagement.id, engagement.projectTitle, reportReason, reportDetails);
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
      setReportDetails('');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-[#A6B2C2] hover:text-[#B8F34A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#78869A]">Status:</span>
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
            engagement.status === 'completed'
              ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
              : engagement.status === 'deliverable_submitted'
              ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
              : engagement.status === 'revision_requested'
              ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
              : 'bg-[#B8F34A]/15 text-[#B8F34A] border border-[#B8F34A]/30'
          }`}>
            {engagement.status.replace('_', ' ')}
          </span>
          <button
            onClick={() => setShowReportModal(true)}
            className="p-1.5 text-[#78869A] hover:text-[#EF4444] rounded-lg hover:bg-white/5 transition-colors cursor-pointer ml-2"
            title="Report Discrepancy"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Engagement Header Card */}
      <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A6B2C2] mb-2">
          <span className="text-[#B8F34A] font-semibold">{engagement.category}</span>
          <span aria-hidden="true">·</span>
          <span>Workspace ID: <span className="font-mono">{engagement.id}</span></span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">
          {engagement.projectTitle}
        </h1>

        {/* Both Parties Lockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <Building className="w-5 h-5 text-[#38BDF8]" />
            <div>
              <span className="text-[11px] text-[#78869A] block">Hiring Business</span>
              <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA]">
                {engagement.businessName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <UserCheck className="w-5 h-5 text-[#B8F34A]" />
            <div>
              <span className="text-[11px] text-[#78869A] block">Selected Talent</span>
              <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA]">
                {engagement.talentName}
              </span>
            </div>
          </div>
        </div>

        {/* Agreed Commercial Terms Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Agreed Budget</span>
            <span className="text-base sm:text-lg font-bold text-[#B8F34A] font-mono tabular-nums">
              KES {engagement.agreedBudgetKES.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Agreed Deadline</span>
            <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA] font-mono">
              {engagement.agreedDeadline}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Revisions Used</span>
            <span className="text-xs sm:text-sm font-semibold text-[#F5F7FA] font-mono">
              {engagement.revisionsUsed} of {engagement.revisionAllowance} allowance
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-[#78869A] block">Payment Terms</span>
            <span className="text-xs sm:text-sm font-semibold text-[#22C55E]">
              Escrow Committed
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Submissions, Revisions, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submissions Section */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#B8F34A]" />
                <h2 className="text-sm sm:text-base font-bold text-[#F5F7FA]">
                  Deliverable Submissions ({engagement.deliverables.length})
                </h2>
              </div>

              {/* Action buttons depending on role */}
              {isTalent && engagement.status !== 'completed' && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Deliverable</span>
                </button>
              )}
            </div>

            {engagement.deliverables.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white/5 border border-white/5">
                <Clock className="w-8 h-8 text-[#78869A] mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium text-[#F5F7FA]">No deliverables submitted yet</p>
                <p className="text-[11px] text-[#78869A] mt-1 max-w-sm mx-auto">
                  {isTalent 
                    ? 'When you are ready with your work, submit your live links and files above for client review.'
                    : 'The selected talent is currently working on the agreed scope.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {engagement.deliverables.map(del => (
                  <div key={del.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#F5F7FA]">{del.title}</span>
                      <span className="text-[11px] text-[#78869A] font-mono">
                        {new Date(del.submittedAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-[#A6B2C2] leading-relaxed whitespace-pre-line bg-black/20 p-3 rounded-lg border border-white/5">
                      {del.releaseNotes}
                    </p>

                    <div>
                      <span className="text-[11px] font-semibold text-[#78869A] block mb-1.5">Attached Assets & URLs:</span>
                      <div className="flex flex-wrap gap-2">
                        {del.fileLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-[#B8F34A] transition-colors border border-white/10 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Business Acceptance & Revision Actions */}
            {isBusiness && engagement.deliverables.length > 0 && engagement.status !== 'completed' && (
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setShowRevisionModal(true)}
                  disabled={engagement.revisionsUsed >= engagement.revisionAllowance}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-white/10 hover:bg-white/15 rounded-lg transition-colors cursor-pointer border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Request Revisions ({engagement.revisionAllowance - engagement.revisionsUsed} left)</span>
                </button>

                <button
                  onClick={handleAcceptAndComplete}
                  className="px-5 py-2 text-xs font-semibold text-[#0B1220] bg-[#22C55E] hover:bg-[#4ADE80] rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Deliverables & Release Payment</span>
                </button>
              </div>
            )}
          </div>

          {/* Revisions History Section */}
          {engagement.revisions.length > 0 && (
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
                <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#F5F7FA]">
                  Revision Requests Log ({engagement.revisions.length})
                </h3>
              </div>

              <div className="space-y-3">
                {engagement.revisions.map((rev, i) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#F59E0B]">Revision #{i + 1}</span>
                      <span className="text-[11px] text-[#78869A] font-mono">
                        {new Date(rev.requestedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#F5F7FA]">{rev.feedback}</p>
                    {rev.specificPoints.length > 0 && (
                      <ul className="list-disc pl-4 space-y-1 text-[#A6B2C2] text-[11px]">
                        {rev.specificPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews & Feedback Section (Visible when completed) */}
          {engagement.status === 'completed' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Star className="w-5 h-5 text-[#B8F34A]" />
                <h3 className="text-sm font-bold text-[#F5F7FA]">Engagement Reviews & Proof-of-Outcome</h3>
              </div>

              {/* Show Business Review if exists */}
              {engagement.businessReview ? (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-[#F5F7FA]">
                      Review by {engagement.businessName}
                    </span>
                    <div className="flex items-center gap-1 text-[#B8F34A]">
                      {[...Array(engagement.businessReview.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B8F34A]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#A6B2C2] italic">"{engagement.businessReview.comment}"</p>
                </div>
              ) : (
                isBusiness && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-semibold text-[#F5F7FA] block mb-2">
                      Leave Verified Review for {engagement.talentName}
                    </span>
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#A6B2C2]">Rating:</span>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${reviewRating >= star ? 'text-[#B8F34A] fill-[#B8F34A]' : 'text-[#78869A]'}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        rows={2}
                        required
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        placeholder="Describe the quality of delivery, communication, and technical rigor..."
                        className="w-full px-3 py-2 text-xs bg-black/20 border border-white/10 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] rounded-lg"
                      >
                        Publish Verified Testimonial
                      </button>
                    </form>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Proof-to-work Audit & Escrow info */}
        <div className="space-y-6">
          {/* Proof-to-Work Verifiability Card */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#B8F34A] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Proof-to-Work Audit Trail</span>
            </div>
            <p className="text-[#A6B2C2] leading-relaxed text-[11px]">
              Every deliverable and revision in this workspace is permanently logged with timestamps. Upon completion, this engagement is directly credited to {engagement.talentName}'s verified public credential.
            </p>
            <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#78869A]">Initiated:</span>
                <span className="text-[#F5F7FA] font-mono">{new Date(engagement.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78869A]">Currency:</span>
                <span className="text-[#F5F7FA] font-mono">KES (Kenyan Shilling)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78869A]">Escrow Protection:</span>
                <span className="text-[#22C55E]">Milestone Held</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Guidelines */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2.5 text-xs">
            <h4 className="font-semibold text-[#F5F7FA]">Workspace Rules</h4>
            <ul className="space-y-2 text-[11px] text-[#A6B2C2]">
              <li>· All deliverable files must include live preview or git repository access.</li>
              <li>· Revisions are limited to agreed scope specifications.</li>
              <li>· Funds release is final upon client confirmation.</li>
              <li>· Dispute resolution handled by KaziLink Governance team within 48 hours.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deliverable Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card-elevated rounded-2xl p-6 border border-white/15 shadow-2xl">
            <h3 className="text-base font-bold text-[#F5F7FA] mb-1">Submit Milestone Deliverables</h3>
            <p className="text-xs text-[#A6B2C2] mb-4">
              Provide live preview URLs, repository access, and release documentation for the client's review.
            </p>

            <form onSubmit={handleSubmitDeliverable} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Submission Title *</label>
                <input
                  type="text"
                  required
                  value={delTitle}
                  onChange={e => setDelTitle(e.target.value)}
                  placeholder="e.g. Milestone 1: Core Web Pages & Staging Release"
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">Release Notes & Technical Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={delNotes}
                  onChange={e => setDelNotes(e.target.value)}
                  placeholder="Summarize what was completed, how to test, and key changes..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-medium text-[#A6B2C2]">Deliverable Links & Source Repos</label>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="text-[11px] text-[#B8F34A] hover:underline"
                  >
                    + Add Link
                  </button>
                </div>
                <div className="space-y-2">
                  {delLinks.map((link, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={e => handleLinkChange(idx, 'label', e.target.value)}
                        placeholder="Label (e.g. Staging Demo)"
                        className="px-2.5 py-1.5 bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] text-xs"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={e => handleLinkChange(idx, 'url', e.target.value)}
                        placeholder="https://..."
                        className="px-2.5 py-1.5 bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-1.5 text-xs text-[#A6B2C2] hover:text-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] rounded-lg"
                >
                  Confirm & Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card-elevated rounded-2xl p-6 border border-white/15 shadow-2xl">
            <h3 className="text-base font-bold text-[#F5F7FA] mb-1">Request Revisions</h3>
            <p className="text-xs text-[#A6B2C2] mb-4">
              Specify clear, constructive feedback within the agreed scope. Remaining allowance: {engagement.revisionAllowance - engagement.revisionsUsed} rounds.
            </p>

            <form onSubmit={handleRequestRevision} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-[#A6B2C2] mb-1">General Feedback *</label>
                <textarea
                  rows={3}
                  required
                  value={revFeedback}
                  onChange={e => setRevFeedback(e.target.value)}
                  placeholder="Outline what requires adjustments..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-medium text-[#A6B2C2]">Specific Action Items</label>
                  <button
                    type="button"
                    onClick={handleAddRevisionPoint}
                    className="text-[11px] text-[#B8F34A] hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-1.5">
                  {revPoints.map((pt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={pt}
                      onChange={e => handleRevisionPointChange(idx, e.target.value)}
                      placeholder={`Action item #${idx + 1}`}
                      className="w-full px-2.5 py-1.5 bg-black/20 border border-white/10 rounded-md text-[#F5F7FA] text-xs"
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRevisionModal(false)}
                  className="px-3 py-1.5 text-xs text-[#A6B2C2] hover:text-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#F59E0B] hover:bg-[#FBBF24] rounded-lg"
                >
                  Send Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report / Dispute Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card-elevated rounded-2xl p-6 border border-white/15 shadow-2xl">
            <h3 className="text-base font-bold text-[#F5F7FA] mb-1">Report Engagement Issue</h3>
            <p className="text-xs text-[#A6B2C2] mb-4">
              Dispute arbitration will be reviewed by KaziLink Trust & Governance.
            </p>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Report received. Our moderation lead will inspect this engagement.</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#A6B2C2] mb-1">Reason</label>
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA]"
                  >
                    <option value="Scope disagreement" className="bg-[#101927]">Scope disagreement</option>
                    <option value="Unresponsive participant" className="bg-[#101927]">Unresponsive participant</option>
                    <option value="Delivery quality issue" className="bg-[#101927]">Delivery quality issue</option>
                    <option value="Payment / term dispute" className="bg-[#101927]">Payment / term dispute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A6B2C2] mb-1">Details & Evidence</label>
                  <textarea
                    rows={3}
                    required
                    value={reportDetails}
                    onChange={e => setReportDetails(e.target.value)}
                    placeholder="Provide specific notes regarding the issue..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-[#F5F7FA]"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-3 py-1.5 text-xs text-[#A6B2C2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#EF4444] rounded-lg"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
