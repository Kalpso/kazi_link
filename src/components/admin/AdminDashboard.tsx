import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Users, 
  Briefcase, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Search,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Project, BusinessProfile } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    users, 
    businessProfiles, 
    projects, 
    applications, 
    engagements, 
    auditLogs, 
    reports, 
    approveBusinessVerification, 
    rejectBusinessVerification,
    moderateProjectStatus,
    resolveReport
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'verification' | 'moderation' | 'reports' | 'audit'>('analytics');
  const [resolutionNote, setResolutionNote] = useState('');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShieldAlert className="w-12 h-12 text-[#EF4444] mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#F5F7FA]">Admin Authorization Required</h2>
        <p className="text-xs text-[#A6B2C2] mt-2">
          Your current session does not hold governance permissions. Switch to Morris Kyengo (Admin Persona) via the role switcher at bottom right.
        </p>
      </div>
    );
  }

  // Calculate Real, Verifiable Metrics from Actual Stored State
  const totalTalent = users.filter(u => u.role === 'talent').length;
  const verifiedBusinesses = Object.values(businessProfiles).filter(b => b.verificationStatus === 'verified').length;
  const pendingBusinesses = Object.values(businessProfiles).filter(b => b.verificationStatus === 'pending_review');
  const activeProjects = projects.filter(p => p.status === 'open' || p.status === 'in_progress').length;
  const completedEngagements = engagements.filter(e => e.status === 'completed');
  const totalGrossProjectValue = engagements.reduce((sum, e) => sum + e.agreedBudgetKES, 0);
  const totalCompletedValue = completedEngagements.reduce((sum, e) => sum + e.agreedBudgetKES, 0);
  const platformRevenueKES = Math.round(totalCompletedValue * 0.10); // 10% platform commission on completed work
  const avgAppsPerProject = projects.length > 0 ? (applications.length / projects.length).toFixed(1) : '0';

  const handleResolveReport = (reportId: string) => {
    if (!resolutionNote.trim()) return;
    resolveReport(reportId, resolutionNote);
    setSelectedReportId(null);
    setResolutionNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Header */}
      <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">Governance & Trust Console</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 uppercase">
                  Administrator
                </span>
              </div>
              <p className="text-xs text-[#A6B2C2] mt-0.5">
                Kenyan Digital Pilot Oversight · Non-speculative audit trail · Verified Kenyan registries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#78869A]">Admin: {currentUser.email}</span>
          </div>
        </div>

        {/* Real Live Metrics Strip (Calculated from true state) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Registered Talent</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">{totalTalent}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Verified Businesses</span>
            <span className="text-lg font-bold text-[#B8F34A] font-mono tabular-nums">{verifiedBusinesses}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Active Listings</span>
            <span className="text-lg font-bold text-[#38BDF8] font-mono tabular-nums">{activeProjects}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Apps / Project</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">{avgAppsPerProject}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Gross Project Value</span>
            <span className="text-lg font-bold text-[#F5F7FA] font-mono tabular-nums">
              KES {totalGrossProjectValue.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-[#78869A] block">Platform Revenue (10%)</span>
            <span className="text-lg font-bold text-[#22C55E] font-mono tabular-nums">
              KES {platformRevenueKES.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          Investor & Pilot Analytics
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'verification' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Business Verification Queue ({pendingBusinesses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'moderation' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Project Moderation ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'reports' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Reports & Disputes ({reports.filter(r => r.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'audit' ? 'bg-[#B8F34A] text-[#0B1220] shadow-sm' : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab: Analytics & Pilot Performance */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Pilot Funnel Performance (Real Stored Data)</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-[#A6B2C2]">Total Published Projects</span>
                  <span className="font-mono font-bold text-[#F5F7FA]">{projects.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-[#A6B2C2]">Proposals Submitted by Talent</span>
                  <span className="font-mono font-bold text-[#F5F7FA]">{applications.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-[#A6B2C2]">Candidate Selection Rate</span>
                  <span className="font-mono font-bold text-[#B8F34A]">
                    {projects.length > 0 ? `${Math.round((engagements.length / projects.length) * 100)}%` : '0%'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-[#A6B2C2]">Engagements Active in Workspace</span>
                  <span className="font-mono font-bold text-[#38BDF8]">
                    {engagements.filter(e => e.status !== 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-[#A6B2C2]">Engagements Completed & Accepted</span>
                  <span className="font-mono font-bold text-[#22C55E]">{completedEngagements.length}</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Financial Clarity & Revenue Model</h3>
              <p className="text-xs text-[#A6B2C2]">
                KaziLink operates on a transparent 10% fee charged on completed business projects. Job seekers pay zero access or application fees.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-[#A6B2C2]">Gross Project Value Under Contract</span>
                  <span className="font-mono font-bold text-[#F5F7FA]">
                    KES {totalGrossProjectValue.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 flex justify-between">
                  <span className="text-[#A6B2C2]">Completed & Disbursed to Talent</span>
                  <span className="font-mono font-bold text-[#22C55E]">
                    KES {totalCompletedValue.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#B8F34A]/10 border border-[#B8F34A]/20 flex justify-between">
                  <span className="text-[#B8F34A] font-semibold">Realized Platform Commission</span>
                  <span className="font-mono font-bold text-[#B8F34A]">
                    KES {platformRevenueKES.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Business Verification Queue */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-1">
              Business Registry Verification Queue ({pendingBusinesses.length} pending)
            </h3>
            <p className="text-xs text-[#A6B2C2] mb-4">
              Inspect submitted Kenya Business Registration Service (BRS) documents and KRA Tax PINs before awarding Verified SME status.
            </p>

            {pendingBusinesses.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#78869A] bg-white/5 rounded-xl">
                No businesses currently awaiting verification.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingBusinesses.map(biz => (
                  <div key={biz.userId} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-[#F5F7FA]">{biz.companyName}</h4>
                        <p className="text-[11px] text-[#A6B2C2]">{biz.industry} · {biz.location}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F59E0B]/20 text-[#F59E0B] uppercase">
                        Pending Review
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-black/20 border border-white/5 font-mono text-[11px]">
                      <div>
                        <span className="text-[#78869A] block">BRS Reg #:</span>
                        <span className="text-[#F5F7FA]">{biz.registrationNumber || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-[#78869A] block">KRA PIN:</span>
                        <span className="text-[#F5F7FA]">{biz.taxId || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-[#78869A] block">Document:</span>
                        <span className="text-[#38BDF8]">{biz.verificationDocumentName || 'Document.pdf'}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => rejectBusinessVerification(biz.userId, 'Documents require re-submission with stamp.')}
                        className="px-3 py-1.5 text-xs text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 rounded-lg transition-colors cursor-pointer"
                      >
                        Reject Verification
                      </button>
                      <button
                        onClick={() => approveBusinessVerification(biz.userId, 'Verified via Kenya BRS Registry.')}
                        className="px-4 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#22C55E] hover:bg-[#4ADE80] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Verify SME</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Project Moderation */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">Platform Project Listings ({projects.length})</h3>

            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#F5F7FA]">{p.title}</span>
                      <span className="text-[11px] text-[#A6B2C2] ml-2">by {p.businessName}</span>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      p.status === 'flagged' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-white/10 text-[#A6B2C2]'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A6B2C2] line-clamp-1">{p.summary}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="font-mono text-[#B8F34A]">KES {p.budgetKES.toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                      {p.status !== 'flagged' ? (
                        <button
                          onClick={() => moderateProjectStatus(p.id, 'flagged', 'Flagged by admin for investigation')}
                          className="px-2.5 py-1 text-[11px] text-[#EF4444] hover:bg-[#EF4444]/10 rounded border border-[#EF4444]/30"
                        >
                          Flag Listing
                        </button>
                      ) : (
                        <button
                          onClick={() => moderateProjectStatus(p.id, 'open', 'Restored by admin review')}
                          className="px-2.5 py-1 text-[11px] text-[#22C55E] hover:bg-[#22C55E]/10 rounded border border-[#22C55E]/30"
                        >
                          Restore Listing
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Reports & Disputes */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-[#F5F7FA] mb-4">User Reports & Safety Logs</h3>

            {reports.length === 0 ? (
              <p className="text-xs text-[#78869A]">No open reports.</p>
            ) : (
              <div className="space-y-3">
                {reports.map(rep => (
                  <div key={rep.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#EF4444]">{rep.reason}: {rep.targetTitle}</span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        rep.status === 'resolved' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#EF4444]/20 text-[#EF4444]'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <p className="text-[#A6B2C2] text-[11px]">{rep.details}</p>
                    <p className="text-[10px] text-[#78869A]">Reported by: {rep.reportedByEmail} on {new Date(rep.createdAt).toLocaleDateString()}</p>

                    {rep.resolutionNotes && (
                      <p className="text-[11px] text-[#22C55E] bg-[#22C55E]/5 p-2 rounded border border-[#22C55E]/10">
                        Resolution: {rep.resolutionNotes}
                      </p>
                    )}

                    {rep.status === 'pending' && (
                      <div className="pt-2 border-t border-white/5">
                        {selectedReportId === rep.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Resolution details & actions taken..."
                              value={resolutionNote}
                              onChange={e => setResolutionNote(e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-black/20 border border-white/10 rounded-md text-xs text-[#F5F7FA]"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setSelectedReportId(null)}
                                className="px-2.5 py-1 text-[11px] text-[#A6B2C2]"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleResolveReport(rep.id)}
                                className="px-3 py-1 text-[11px] font-semibold text-[#0B1220] bg-[#22C55E] rounded"
                              >
                                Confirm Resolution
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedReportId(rep.id)}
                            className="text-[11px] text-[#B8F34A] hover:underline font-semibold"
                          >
                            Resolve Report →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Audit Log */}
      {activeTab === 'audit' && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-[#F5F7FA]">Immutable Security & Activity Audit Trail</h3>
          <div className="space-y-2 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-semibold text-[#F5F7FA]">{log.action}</span>
                  <p className="text-[11px] text-[#A6B2C2]">{log.details}</p>
                </div>
                <div className="text-right shrink-0 text-[10px] text-[#78869A] font-mono">
                  <span>{log.actorEmail}</span>
                  <span className="block">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
