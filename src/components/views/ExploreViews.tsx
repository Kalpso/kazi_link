import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, TalentProfile, User } from '../../types';
import { 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  Globe, 
  Calendar,
  Lock,
  ArrowLeft
} from 'lucide-react';

interface ExploreViewsProps {
  view: 'browse_projects' | 'talent_showcase' | 'proof_to_work' | 'pilot_mission';
  onSelectProject: (p: Project) => void;
  onOpenAuth: (mode?: 'signin' | 'signup', role?: 'talent' | 'business') => void;
}

export const ExploreViews: React.FC<ExploreViewsProps> = ({
  view,
  onSelectProject,
  onOpenAuth
}) => {
  const { projects, categories, talentProfiles, users, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const talentUsers = users.filter(u => u.role === 'talent');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => setActiveView('landing')}
        className="flex items-center gap-1.5 text-xs text-[#A6B2C2] hover:text-[#B8F34A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Overview</span>
      </button>

      {/* VIEW 1: Browse Projects */}
      {view === 'browse_projects' && (
        <div className="space-y-6">
          <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
            <h1 className="text-2xl font-bold text-[#F5F7FA]">Browse Verified Pilot Projects</h1>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-1">
              Explore structured digital opportunities with verified Kenyan SMEs. Fixed budgets, transparent deliverables, and non-speculative payment terms.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#78869A] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by keywords, deliverables, or skills..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#B8F34A]"
                />
              </div>

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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#B8F34A]/40 transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#B8F34A] font-semibold">{project.category}</span>
                    <span className="font-bold text-[#F5F7FA] font-mono tabular-nums">
                      KES {project.budgetKES.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#F5F7FA] group-hover:text-[#B8F34A] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A6B2C2] mt-1.5 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-[#A6B2C2]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#78869A]">
                  <span className="text-[#F5F7FA] font-medium">{project.businessName}</span>
                  <span className="text-[#B8F34A] font-semibold flex items-center gap-1">
                    <span>Inspect Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Talent Showcase */}
      {view === 'talent_showcase' && (
        <div className="space-y-6">
          <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
            <h1 className="text-2xl font-bold text-[#F5F7FA]">Discover Verified African Talent</h1>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-1">
              Hire emerging software engineers, brand designers, and digital operations specialists with demonstrable Proof-to-Work credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talentUsers.map(u => {
              const p = talentProfiles[u.id];
              if (!p) return null;
              return (
                <div key={u.id} className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={u.avatarUrl}
                      alt={u.displayName}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#F5F7FA]">{u.displayName}</h3>
                        <span className="text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                          ★ {p.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-[#B8F34A] font-medium mt-0.5">{p.headline}</p>
                      <p className="text-[11px] text-[#78869A]">{p.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#A6B2C2] leading-relaxed">{p.bio}</p>

                  <div>
                    <span className="text-[11px] font-semibold text-[#78869A] block mb-2 uppercase tracking-wider">
                      Verified Proof Samples:
                    </span>
                    <div className="space-y-2">
                      {p.skills.map(sk => (
                        <div key={sk.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-[#F5F7FA]">{sk.name}</span>
                            <span className="text-[11px] text-[#78869A] block">{sk.evidenceTitle}</span>
                          </div>
                          {sk.evidenceUrl && (
                            <a
                              href={sk.evidenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B8F34A] hover:underline text-[11px] flex items-center gap-1"
                            >
                              <span>Inspect Repo/URL</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: Proof-to-Work Architecture */}
      {view === 'proof_to_work' && (
        <div className="glass-card-elevated rounded-2xl p-8 sm:p-12 border border-white/15 max-w-4xl mx-auto space-y-8">
          <div>
            <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Core Differentiator</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mt-1">
              The Proof-to-Work System Architecture
            </h1>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-2 leading-relaxed">
              Why KaziLink replaces static CVs with verifiable technical evidence and outcome credentials.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#A6B2C2]">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-[#F5F7FA] block text-sm">1. Explicit Verification Tiers</span>
              <p>We distinguish strictly between three levels of capability:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong className="text-[#F5F7FA]">Self-Declared:</strong> Candidate states knowledge of a library or tool. Marked as unverified.</li>
                <li><strong className="text-[#38BDF8]">Evidence-Attached:</strong> Verifiable live URL, public GitHub code, or interactive Figma prototype attached.</li>
                <li><strong className="text-[#22C55E]">Client-Verified Outcome:</strong> Built and delivered in a completed KaziLink commercial engagement with client acceptance and review.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-[#F5F7FA] block text-sm">2. Transparent Human Matching</span>
              <p>
                We do not employ black-box AI algorithms that automatically disqualify candidates or make unexplainable hiring decisions. Business founders inspect practical proof-of-competence directly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-[#F5F7FA] block text-sm">3. Structured Milestone Protections</span>
              <p>
                Every project enforces defined deliverables, timeline in days, and revision limits. This protects businesses from delivery failure while protecting talent from unpaid scope creep.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: Kenya Pilot Mission & Investor Strategy */}
      {view === 'pilot_mission' && (
        <div className="glass-card-elevated rounded-2xl p-8 sm:p-12 border border-white/15 max-w-4xl mx-auto space-y-8">
          <div>
            <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Startup Strategy</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mt-1">
              KaziLink Kenya Pilot & Growth Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-2 leading-relaxed">
              Validating real SME demand in Nairobi and Mombasa before scaling across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-sm text-[#B8F34A]">Phase 1: Controlled Kenya Pilot (Active)</span>
              <p className="text-[#A6B2C2] leading-relaxed">
                Focused pilot in Nairobi (Westlands, Kilimani) and Mombasa. Targeting 25 verified SMEs and 50 vetted technical talents in Website Development and Brand Packaging.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-sm text-[#F5F7FA]">Phase 2: M-Pesa Business & BRS Automated API</span>
              <p className="text-[#A6B2C2] leading-relaxed">
                Integrating direct Safaricom Daraja B2C disbursement for talent payouts and automated Kenya BRS business status verification checks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-sm text-[#F5F7FA]">Phase 3: University & Hub Partnerships</span>
              <p className="text-[#A6B2C2] leading-relaxed">
                Partnering with University of Nairobi, Technical University of Kenya, and Moringa School to onboard top final-year computer science and design graduates into structured paid work.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-bold text-sm text-[#F5F7FA]">Phase 4: East Africa Expansion</span>
              <p className="text-[#A6B2C2] leading-relaxed">
                Expanding proven pilot framework to Rwanda (Kigali tech hub) and Uganda (Kampala digital SME ecosystem).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
