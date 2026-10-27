import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActivityEvent, ActivityType, ProjectInvitation } from '../../types';
import { 
  FileText, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Star, 
  ShieldCheck, 
  ArrowUpRight, 
  Check, 
  X, 
  ExternalLink,
  Layers,
  Filter,
  Inbox
} from 'lucide-react';

interface ActivityFeedProps {
  onOpenProject?: (projectId: string) => void;
  onOpenEngagement?: (engagementId: string) => void;
  onNavigateTab?: (tab: string) => void;
  isCompact?: boolean;
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  onOpenProject,
  onOpenEngagement,
  onNavigateTab,
  isCompact = false,
  maxItems
}) => {
  const { 
    currentUser, 
    activities, 
    invitations, 
    projects, 
    markActivityAsRead, 
    markAllActivitiesAsRead,
    respondToInvitation,
    setSelectedProjectId
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'applications' | 'invitations' | 'milestones'>('all');

  if (!currentUser) return null;

  // Filter activities for current user
  const userActivities = activities.filter(a => a.userId === currentUser.id);
  const userInvitations = invitations.filter(i => i.talentId === currentUser.id || i.businessId === currentUser.id);

  const unreadCount = userActivities.filter(a => !a.isRead).length;

  const filteredActivities = userActivities.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'applications') return item.type === 'application_status_changed';
    if (activeFilter === 'invitations') return item.type === 'project_invitation';
    if (activeFilter === 'milestones') {
      return item.type === 'deliverable_event' || 
             item.type === 'revision_event' || 
             item.type === 'completion_event' || 
             item.type === 'review_event';
    }
    return true;
  });

  const displayList = maxItems ? filteredActivities.slice(0, maxItems) : filteredActivities;

  const handleActivityClick = (act: ActivityEvent) => {
    markActivityAsRead(act.id);
    if (act.targetId) {
      if (act.linkTarget === 'project' && onOpenProject) {
        onOpenProject(act.targetId);
      } else if (act.linkTarget === 'engagement' && onOpenEngagement) {
        onOpenEngagement(act.targetId);
      } else if (act.linkTarget === 'applications' && onNavigateTab) {
        onNavigateTab('applications');
      } else if (act.linkTarget === 'verification' && onNavigateTab) {
        onNavigateTab('verification');
      }
    }
  };

  const getEventIcon = (type: ActivityType) => {
    switch (type) {
      case 'project_invitation':
        return <Mail className="w-4 h-4 text-[#B8F34A]" />;
      case 'application_status_changed':
        return <FileText className="w-4 h-4 text-[#38BDF8]" />;
      case 'deliverable_event':
        return <Layers className="w-4 h-4 text-[#38BDF8]" />;
      case 'revision_event':
        return <RotateCcw className="w-4 h-4 text-[#F59E0B]" />;
      case 'completion_event':
        return <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />;
      case 'review_event':
        return <Star className="w-4 h-4 text-[#B8F34A]" />;
      case 'verification_event':
        return <ShieldCheck className="w-4 h-4 text-[#22C55E]" />;
      default:
        return <Clock className="w-4 h-4 text-[#78869A]" />;
    }
  };

  const formatTimestamp = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className={`glass-card rounded-2xl border border-white/10 ${isCompact ? 'p-4 sm:p-5' : 'p-6 sm:p-8'} space-y-4`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B8F34A]">
            <Inbox className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#F5F7FA]">
                Recent Dashboard Activity
              </h3>
              {unreadCount > 0 && (
                <span className="text-[11px] font-mono font-semibold text-[#0B1220] bg-[#B8F34A] px-1.5 py-0.2 rounded-md">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#A6B2C2]">
              Track applications, invitations, deliverable reviews, and verification events
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllActivitiesAsRead}
            className="text-[11px] font-medium text-[#A6B2C2] hover:text-[#B8F34A] transition-colors cursor-pointer self-start sm:self-auto"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Segmented Filter Control */}
      {!isCompact && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-white/15 text-[#F5F7FA] font-semibold'
                : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
            }`}
          >
            All Activity ({userActivities.length})
          </button>

          <button
            onClick={() => setActiveFilter('applications')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'applications'
                ? 'bg-white/15 text-[#F5F7FA] font-semibold'
                : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
            }`}
          >
            Applications & Status
          </button>

          <button
            onClick={() => setActiveFilter('invitations')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'invitations'
                ? 'bg-white/15 text-[#F5F7FA] font-semibold'
                : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
            }`}
          >
            Project Invitations
          </button>

          <button
            onClick={() => setActiveFilter('milestones')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeFilter === 'milestones'
                ? 'bg-white/15 text-[#F5F7FA] font-semibold'
                : 'text-[#A6B2C2] hover:text-[#F5F7FA] hover:bg-white/5'
            }`}
          >
            Milestones & Deliverables
          </button>
        </div>
      )}

      {/* Activity List */}
      {displayList.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-white/5 border border-white/5 text-xs text-[#78869A] space-y-2">
          <Clock className="w-8 h-8 text-[#78869A] mx-auto opacity-50" />
          <p className="font-medium text-[#F5F7FA]">No recent actions found</p>
          <p className="text-[11px] text-[#A6B2C2] max-w-sm mx-auto">
            Actions such as proposal status updates, client invitations, or deliverable submissions will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayList.map(item => {
            // Check if this activity corresponds to a pending project invitation
            const relatedInvitation = item.type === 'project_invitation'
              ? userInvitations.find(inv => inv.projectId === item.targetId && inv.talentId === currentUser.id && inv.status === 'pending')
              : null;

            return (
              <div
                key={item.id}
                onClick={() => handleActivityClick(item)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer space-y-2 group ${
                  !item.isRead
                    ? 'bg-white/[0.08] border-[#B8F34A]/30 hover:border-[#B8F34A]/50'
                    : 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
                }`}
              >
                {/* Header row: Icon, Title, Badge, Time */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-white/5 mt-0.5 shrink-0 border border-white/5">
                      {getEventIcon(item.type)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#F5F7FA] group-hover:text-[#B8F34A] transition-colors leading-tight">
                          {item.title}
                        </span>
                        {!item.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8F34A] inline-block" />
                        )}
                      </div>

                      {/* Unboxed metadata line with typographic bullet separators */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#78869A] mt-0.5">
                        {item.actorName && (
                          <>
                            <span className="text-[#A6B2C2] font-medium">{item.actorName}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span>{formatTimestamp(item.timestamp)}</span>
                        {item.badgeText && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className={
                              item.badgeTone === 'accent' ? 'text-[#B8F34A] font-semibold' :
                              item.badgeTone === 'success' ? 'text-[#22C55E] font-semibold' :
                              item.badgeTone === 'warning' ? 'text-[#F59E0B] font-semibold' :
                              'text-[#38BDF8] font-semibold'
                            }>
                              {item.badgeText}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[#78869A] group-hover:text-[#F5F7FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                {/* Description */}
                <p className="text-xs text-[#A6B2C2] leading-relaxed pl-8">
                  {item.description}
                </p>

                {/* Invitation Action Controls if pending invitation for talent */}
                {relatedInvitation && (
                  <div className="pl-8 pt-2 flex flex-wrap items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        respondToInvitation(relatedInvitation.id, true);
                        if (onOpenProject) onOpenProject(relatedInvitation.projectId);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept & Inspect Brief</span>
                    </button>

                    <button
                      onClick={() => respondToInvitation(relatedInvitation.id, false)}
                      className="px-3 py-1.5 text-xs font-medium text-[#A6B2C2] hover:text-[#EF4444] bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
