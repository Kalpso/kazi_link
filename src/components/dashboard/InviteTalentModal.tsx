import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, TalentProfile } from '../../types';
import { X, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface InviteTalentModalProps {
  talentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InviteTalentModal: React.FC<InviteTalentModalProps> = ({
  talentUser,
  isOpen,
  onClose
}) => {
  const { currentUser, projects, sendProjectInvitation } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !talentUser || !currentUser) return null;

  // Filter projects owned by current business that are open
  const myOpenProjects = projects.filter(p => p.businessId === currentUser.id && p.status === 'open');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedProjectId && myOpenProjects.length > 0) {
      setError('Please select an open project listing.');
      return;
    }

    const projectId = selectedProjectId || (myOpenProjects[0] ? myOpenProjects[0].id : '');
    if (!projectId) {
      setError('You have no open projects. Please post a project first.');
      return;
    }

    const ok = sendProjectInvitation(projectId, talentUser.id, personalMessage);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPersonalMessage('');
        onClose();
      }, 1500);
    } else {
      setError('Failed to send invitation. Please verify project status.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-card-elevated rounded-2xl p-6 border border-white/15 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#A6B2C2] hover:text-[#F5F7FA] rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#B8F34A] mb-1">
          <Mail className="w-4 h-4" />
          <span>Project Direct Invitation</span>
        </div>

        <h2 className="text-lg font-bold text-[#F5F7FA]">
          Invite {talentUser.displayName}
        </h2>
        <p className="text-xs text-[#A6B2C2] mt-0.5">
          Invite this verified candidate to review and submit a proposal for your project.
        </p>

        {success ? (
          <div className="my-6 p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Invitation sent to {talentUser.displayName}! It will appear in their dashboard activity feed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[#A6B2C2] mb-1 font-medium">Select Your Open Project *</label>
              {myOpenProjects.length === 0 ? (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#78869A]">
                  You have no open project listings. Post a project first from your Business Dashboard.
                </div>
              ) : (
                <select
                  value={selectedProjectId || myOpenProjects[0].id}
                  onChange={e => setSelectedProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#101927] border border-white/10 rounded-lg text-[#F5F7FA] text-xs"
                >
                  {myOpenProjects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (KES {p.budgetKES.toLocaleString()})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-[#A6B2C2] mb-1 font-medium">Personal Invitation Note</label>
              <textarea
                rows={3}
                value={personalMessage}
                onChange={e => setPersonalMessage(e.target.value)}
                placeholder="Mention why their verified skills match your project needs..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F7FA] text-xs focus:outline-none focus:border-[#B8F34A]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs text-[#A6B2C2] hover:text-[#F5F7FA]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={myOpenProjects.length === 0}
                className="px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-lg transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                Send Invitation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
