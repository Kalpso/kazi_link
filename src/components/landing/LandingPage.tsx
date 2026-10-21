import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, TalentProfile, User } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Palette, 
  Share2, 
  Server, 
  ShoppingBag, 
  Table, 
  ExternalLink,
  ChevronDown,
  Building,
  UserCheck,
  FileCode,
  Lock,
  Compass
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode?: 'signin' | 'signup', role?: 'talent' | 'business') => void;
  onSelectProject: (project: Project) => void;
  onExploreBrowse: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onSelectProject,
  onExploreBrowse
}) => {
  const { projects, categories, talentProfiles, users } = useApp();
  const [selectedPilotCategory, setSelectedPilotCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Pilot filter for live projects showcase
  const displayProjects = projects.filter(p => {
    if (selectedPilotCategory === 'all') return true;
    return p.category === selectedPilotCategory;
  });

  const sampleTalent1 = users.find(u => u.id === 'usr-talent-1');
  const profileTalent1 = talentProfiles['usr-talent-1'];

  const sampleTalent2 = users.find(u => u.id === 'usr-talent-2');
  const profileTalent2 = talentProfiles['usr-talent-2'];

  const faqs = [
    {
      q: 'How does KaziLink differ from traditional job boards and freelance sites?',
      a: 'Standard platforms rely on self-declared CV resumes and bid racing. KaziLink operates on Proof-to-Work: candidates attach verifiable code repositories, live URLs, or prototypes to their proposals. Engagements are structured with predefined milestones, explicit revision caps, and non-speculative milestone escrow in Kenyan Shillings (KES).'
    },
    {
      q: 'Which services are supported during the Kenya Pilot?',
      a: 'Our pilot initially prioritizes two core categories: Website Development & Setup, and Graphic Design & Brand Assets. Additional supported tracks include Social Media Content, Basic IT Setup, Online Catalogues, and Spreadsheet Systems for Kenyan SMEs.'
    },
    {
      q: 'How are businesses verified?',
      a: 'Businesses submit their Kenya Business Registration Service (BRS) certificate number and KRA PIN. Our governance team inspects these against official Kenyan business registries before granting the "Verified Kenyan SME" badge.'
    },
    {
      q: 'Does KaziLink charge emerging talent to apply?',
      a: 'No. Emerging African talent pays zero fees to browse projects, submit proposals, or maintain verified portfolios. Our sustainable revenue model charges a transparent 10% fee to hiring businesses only upon satisfactory milestone completion.'
    },
    {
      q: 'How are milestone disagreements or revisions resolved?',
      a: 'Every project specifies an explicit revision allowance (typically 1 to 2 rounds) within agreed scope. If a dispute arises over deliverables, either party can trigger formal mediation with the KaziLink Governance team, which reviews the audit trail and original acceptance criteria.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO decision block */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#A6B2C2]">
              <span className="font-semibold text-[#B8F34A]">Kenya Pilot Phase</span>
              <span aria-hidden="true">·</span>
              <span>Nairobi & Mombasa SME Digital Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F5F7FA] tracking-tight leading-[1.1] [text-wrap:balance]">
              Your Skills Deserve Real Opportunities.
            </h1>

            <p className="text-base sm:text-lg text-[#A6B2C2] leading-relaxed max-w-2xl font-normal">
              Connect with businesses that need your skills. Deliver meaningful work, build your portfolio, and grow your professional future.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreBrowse}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[#B8F34A]/20 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Find Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('signup', 'business')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F5F7FA] glass-card hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-white/15 whitespace-nowrap"
              >
                Hire Digital Talent
              </button>
            </div>

            {/* Transparent Trust Indicators (Anti-slop, unboxed metadata) */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#78869A]">
              <span className="flex items-center gap-1.5 text-[#A6B2C2]">
                <CheckCircle2 className="w-4 h-4 text-[#B8F34A]" />
                Demonstrated Proof-to-Work
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#A6B2C2]">
                <ShieldCheck className="w-4 h-4 text-[#B8F34A]" />
                BRS Verified Kenyan SMEs
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-[#A6B2C2]">
                <Layers className="w-4 h-4 text-[#B8F34A]" />
                Fixed Milestone Scopes
              </span>
            </div>
          </div>

          {/* Right Hero Column: High-Fidelity Workspace Composition & Live Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden glass-card-elevated border border-white/15 shadow-2xl">
              <img
                src="/src/assets/images/hero_african_workspace_1792597007915.jpg"
                alt="Kenyan digital professionals in Nairobi workspace"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/40 to-transparent" />

              {/* Floating Live Proof-to-Work Micro-Panel */}
              <div className="absolute bottom-4 left-4 right-4 glass-card-elevated rounded-xl p-4 border border-white/20 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#B8F34A] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Pilot Engagement
                  </span>
                  <span className="text-[#A6B2C2] font-mono tabular-nums">KES 45,000</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">Mobile Produce Catalog & Ordering Site</p>
                <div className="flex items-center justify-between text-[11px] text-[#A6B2C2] mt-2 pt-2 border-t border-white/10">
                  <span>Client: GreenBoma Organics</span>
                  <span className="text-[#22C55E] font-medium">Milestone Accepted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SOLVED: The African Digital Paradox */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">The Market Friction</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F7FA] tracking-tight [text-wrap:balance]">
            Why Traditional Hiring Fails African SMEs and Emerging Talent
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B2C2] leading-relaxed">
            Unverified resumes create risk for small businesses, while genuine digital talent remains locked out without personal networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Problem Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA]">
              The Small Business Dilemma
            </h3>
            <p className="text-xs sm:text-sm text-[#A6B2C2] leading-relaxed">
              Kenyan SMEs frequently lose money on unverified freelancers who overpromise, disappear mid-project, or deliver buggy code. Without structured revision caps and milestone criteria, digital investments become stressful gambles.
            </p>
            <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs text-[#78869A]">
              <div>· Unclear project expectations and endless scope creep.</div>
              <div>· Lack of practical technical evaluation mechanisms.</div>
              <div>· Risk of upfront payment loss without delivery accountability.</div>
            </div>
          </div>

          {/* Worker Problem Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#B8F34A]/15 text-[#B8F34A] border border-[#B8F34A]/30 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#F5F7FA]">
              The Emerging Professional Dilemma
            </h3>
            <p className="text-xs sm:text-sm text-[#A6B2C2] leading-relaxed">
              Graduates and self-taught developers have real technical ability, but job boards demand "3-5 years experience." Without an established corporate network, capable builders struggle to get their first paid, credible commercial reference.
            </p>
            <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs text-[#78869A]">
              <div>· CV resumes fail to demonstrate actual hands-on capability.</div>
              <div>· Upwork and Fiverr race to the bottom on price.</div>
              <div>· Completed work is scattered without verifiable accreditation.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW KAZILINK WORKS IN THREE STEPS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">The Mechanism</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F7FA] tracking-tight">
            How KaziLink Works in Three Steps
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B2C2]">
            Move from resume claims to proven outcomes with transparent safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-[#B8F34A]">01</span>
            <h3 className="text-base font-bold text-[#F5F7FA]">Proof-First Discovery</h3>
            <p className="text-xs text-[#A6B2C2] leading-relaxed">
              Talent demonstrates skills with live repository links, prototypes, and work samples. Businesses review candidate evidence side-by-side instead of parsing generic CV buzzwords.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-[#B8F34A]">02</span>
            <h3 className="text-base font-bold text-[#F5F7FA]">Structured Milestones</h3>
            <p className="text-xs text-[#A6B2C2] leading-relaxed">
              Every project defines exact deliverables, timeline, budget in KES, and revision limits. Both parties collaborate in a dedicated workspace with transparent progress logs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3 relative">
            <span className="text-xs font-mono font-bold text-[#B8F34A]">03</span>
            <h3 className="text-base font-bold text-[#F5F7FA]">Verified Outcome Credential</h3>
            <p className="text-xs text-[#A6B2C2] leading-relaxed">
              Once deliverables are reviewed and accepted, the project is permanently recorded on the talent's public profile as an immutable proof-of-competence backed by verified client review.
            </p>
          </div>
        </div>
      </section>

      {/* 4. DIGITAL SERVICE CATEGORIES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Targeted Offerings</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
              Digital Service Tracks
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-1">
              Curated scope categories tailored to Kenyan SME operational requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={onExploreBrowse}
              className={`p-6 rounded-2xl glass-card border transition-all cursor-pointer space-y-3 hover:border-[#B8F34A]/40 group ${
                cat.isPilotPriority ? 'border-[#B8F34A]/25 bg-white/5' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#B8F34A] group-hover:scale-105 transition-transform">
                  {cat.slug === 'website-development' && <Globe className="w-5 h-5" />}
                  {cat.slug === 'graphic-design' && <Palette className="w-5 h-5" />}
                  {cat.slug === 'social-media' && <Share2 className="w-5 h-5" />}
                  {cat.slug === 'it-support' && <Server className="w-5 h-5" />}
                  {cat.slug === 'ecommerce-catalog' && <ShoppingBag className="w-5 h-5" />}
                  {cat.slug === 'spreadsheets-admin' && <Table className="w-5 h-5" />}
                </div>

                {cat.isPilotPriority && (
                  <span className="text-[10px] font-semibold text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded border border-[#B8F34A]/20">
                    Pilot Priority
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#F5F7FA] group-hover:text-[#B8F34A] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#A6B2C2] mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-[#78869A]">{cat.projectCount} active projects</span>
                <span className="font-mono text-[#F5F7FA]">{cat.typicalBudgetKES}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIVE MARKETPLACE BROWSER PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Live Pilot Listings</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
              Active Projects in Kenya
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B2C2] mt-1">
              Real projects posted by verified businesses. Click any listing to review full deliverables and apply.
            </p>
          </div>

          <button
            onClick={onExploreBrowse}
            className="text-xs font-semibold text-[#B8F34A] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View Full Marketplace Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedPilotCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedPilotCategory === 'all' ? 'bg-[#B8F34A] text-[#0B1220]' : 'text-[#A6B2C2] bg-white/5 hover:text-[#F5F7FA]'
            }`}
          >
            All Categories ({projects.length})
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedPilotCategory(c.title)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedPilotCategory === c.title ? 'bg-[#B8F34A] text-[#0B1220]' : 'text-[#A6B2C2] bg-white/5 hover:text-[#F5F7FA]'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayProjects.map(project => (
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

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-[#A6B2C2]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#78869A]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#F5F7FA] font-medium">{project.businessName}</span>
                  {project.businessVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B8F34A]" />
                  )}
                </div>
                <span className="text-[#B8F34A] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PROOF-TO-WORK TALENT PROFILES SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Demonstrated Capability</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            Proof-to-Work Talent Profiles
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B2C2]">
            Evidence-based profiles featuring live repos, audited work samples, and verified outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Talent 1: Amiina Otieno */}
          {sampleTalent1 && profileTalent1 && (
            <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={sampleTalent1.avatarUrl}
                  alt={sampleTalent1.displayName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F7FA]">{sampleTalent1.displayName}</h3>
                    <span className="text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                      ★ {profileTalent1.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-[#B8F34A] mt-0.5 font-medium">{profileTalent1.headline}</p>
                  <p className="text-[11px] text-[#78869A]">{profileTalent1.location}</p>
                </div>
              </div>

              <p className="text-xs text-[#A6B2C2] leading-relaxed">
                {profileTalent1.bio}
              </p>

              <div>
                <span className="text-[11px] font-semibold text-[#78869A] block mb-2 uppercase tracking-wider">
                  Verifiable Evidence Samples:
                </span>
                <div className="space-y-2">
                  {profileTalent1.skills.map(skill => (
                    <div key={skill.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#F5F7FA]">{skill.name}</span>
                        <span className="text-[11px] text-[#78869A] block">{skill.evidenceTitle}</span>
                      </div>
                      {skill.evidenceUrl && (
                        <a
                          href={skill.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B8F34A] hover:underline text-[11px] flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Talent 2: Brian Kipchoge */}
          {sampleTalent2 && profileTalent2 && (
            <div className="glass-card-elevated rounded-2xl p-6 sm:p-8 border border-white/15 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={sampleTalent2.avatarUrl}
                  alt={sampleTalent2.displayName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F7FA]">{sampleTalent2.displayName}</h3>
                    <span className="text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                      ★ {profileTalent2.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-[#B8F34A] mt-0.5 font-medium">{profileTalent2.headline}</p>
                  <p className="text-[11px] text-[#78869A]">{profileTalent2.location}</p>
                </div>
              </div>

              <p className="text-xs text-[#A6B2C2] leading-relaxed">
                {profileTalent2.bio}
              </p>

              <div>
                <span className="text-[11px] font-semibold text-[#78869A] block mb-2 uppercase tracking-wider">
                  Verifiable Evidence Samples:
                </span>
                <div className="space-y-2">
                  {profileTalent2.skills.map(skill => (
                    <div key={skill.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#F5F7FA]">{skill.name}</span>
                        <span className="text-[11px] text-[#78869A] block">{skill.evidenceTitle}</span>
                      </div>
                      {skill.evidenceUrl && (
                        <a
                          href={skill.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B8F34A] hover:underline text-[11px] flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. TRUST & SAFETY PRINCIPLES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card-elevated rounded-2xl p-8 sm:p-12 border border-white/15 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Institutional Trust</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
              Security, Verification, and Non-Speculative Operations
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B2C2]">
              Designed with strict adherence to Kenyan Data Protection Act (ODPC) guidelines and transparent milestone governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 text-xs">
              <div className="w-8 h-8 rounded-lg bg-white/5 text-[#B8F34A] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F7FA]">BRS & KRA Verification</h3>
              <p className="text-[#A6B2C2] leading-relaxed">
                Client companies submit verifiable registration numbers and tax credentials verified by our administration team before receiving Verified badges.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="w-8 h-8 rounded-lg bg-white/5 text-[#B8F34A] flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F7FA]">No Speculative Escrow</h3>
              <p className="text-[#A6B2C2] leading-relaxed">
                Clear contractual milestone commitments in KES. Funds are released strictly upon transparent client acceptance of agreed deliverables.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="w-8 h-8 rounded-lg bg-white/5 text-[#B8F34A] flex items-center justify-center font-bold">
                <FileCode className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#F5F7FA]">Audit Log Protection</h3>
              <p className="text-[#A6B2C2] leading-relaxed">
                Every project modification, deliverable file submission, revision request, and review is cryptographically timestamped in our audit log.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-semibold text-[#B8F34A] uppercase tracking-wider">Clarity & Terms</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-xl border border-white/10 overflow-hidden text-xs">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#78869A] transition-transform ${expandedFaq === idx ? 'rotate-180 text-[#B8F34A]' : ''}`} />
              </button>
              {expandedFaq === idx && (
                <div className="px-4 pb-4 text-[#A6B2C2] leading-relaxed border-t border-white/5 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 glass-card-elevated border border-white/20 text-center space-y-6 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight [text-wrap:balance]">
              Build Your Digital Future on Verified Performance.
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B2C2] leading-relaxed">
              Join Kenya's pilot cohort connecting ambitious digital builders with vetted growing businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuth('signup', 'talent')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#0B1220] bg-[#B8F34A] hover:bg-[#C8FF69] rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Register as Digital Talent
            </button>
            <button
              onClick={() => onOpenAuth('signup', 'business')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F5F7FA] glass-card hover:bg-white/10 rounded-xl transition-colors cursor-pointer border border-white/15"
            >
              Register as a Business
            </button>
          </div>
        </div>
      </section>

      {/* 10. PROFESSIONAL FOOTER */}
      <footer className="border-t border-white/10 pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-[#78869A]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <span className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#B8F34A] text-[#0B1220] flex items-center justify-center font-bold text-xs">
                K
              </span>
              <span>Kazi<span className="text-[#B8F34A]">Link</span></span>
            </span>
            <p className="text-xs text-[#A6B2C2]">
              Skills that work. Opportunities that grow. Connecting emerging African talent with businesses for verified digital work.
            </p>
            <p className="text-[11px] text-[#78869A]">
              Pilot Headquarters: Nairobi, Kenya
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#F5F7FA] mb-3">Service Tracks</h4>
            <ul className="space-y-2 text-[#A6B2C2]">
              <li>Website Setup & Frontend</li>
              <li>Brand Identity & Packaging</li>
              <li>Social Media Design</li>
              <li>IT Systems Support</li>
              <li>Google Sheets Fleet Logistics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#F5F7FA] mb-3">Platform & Trust</h4>
            <ul className="space-y-2 text-[#A6B2C2]">
              <li>Proof-to-Work Standards</li>
              <li>Kenya BRS Verification</li>
              <li>Milestone Escrow Rules</li>
              <li>ODPC Privacy Compliance</li>
              <li>Dispute Mediation Protocol</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#F5F7FA] mb-3">Kenya Pilot Governance</h4>
            <p className="text-xs text-[#A6B2C2] mb-2">
              Direct inquiries & institutional work-program partnerships:
            </p>
            <p className="font-mono text-[#F5F7FA]">governance@kazilink.africa</p>
            <p className="text-[11px] text-[#78869A] mt-2">+254 700 000 001 · Nairobi</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© 2026 KaziLink Africa Ltd. All rights reserved. Registered in Nairobi, Kenya.</span>
          <div className="flex items-center gap-4 text-[#A6B2C2]">
            <span>Privacy Notice</span>
            <span>Terms of Engagement</span>
            <span>Security Statement</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
