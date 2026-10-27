import { User, TalentProfile, BusinessProfile, Project, Application, Engagement, Category, AuditLog, ReportItem, InAppNotification, ProjectInvitation, ActivityEvent } from '../types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-web',
    title: 'Website Development & Setup',
    slug: 'website-development',
    iconName: 'Globe',
    description: 'Clean responsive marketing sites, Next.js/React web apps, and CMS setup for Kenyan SMEs.',
    isPilotPriority: true,
    projectCount: 4,
    typicalBudgetKES: 'KES 25,000 - 90,000'
  },
  {
    id: 'cat-design',
    title: 'Graphic Design & Brand Assets',
    slug: 'graphic-design',
    iconName: 'Palette',
    description: 'Vector logos, brand identity guides, corporate stationery, and digital advertising collateral.',
    isPilotPriority: true,
    projectCount: 3,
    typicalBudgetKES: 'KES 15,000 - 50,000'
  },
  {
    id: 'cat-social',
    title: 'Social Media Content & Design',
    slug: 'social-media',
    iconName: 'Share2',
    description: 'Cohesive Instagram/LinkedIn post packs, reels templates, and promotional campaign banners.',
    isPilotPriority: false,
    projectCount: 2,
    typicalBudgetKES: 'KES 18,000 - 45,000'
  },
  {
    id: 'cat-it',
    title: 'Basic IT Support & Setup',
    slug: 'it-support',
    iconName: 'Server',
    description: 'Google Workspace/M365 onboarding, domain DNS records, network troubleshooting, and data backup.',
    isPilotPriority: false,
    projectCount: 2,
    typicalBudgetKES: 'KES 12,000 - 35,000'
  },
  {
    id: 'cat-ecom',
    title: 'Online Catalogue & E-Commerce',
    slug: 'ecommerce-catalog',
    iconName: 'ShoppingBag',
    description: 'Shopify/WooCommerce setup, WhatsApp catalog integrations, and M-Pesa checkout test flows.',
    isPilotPriority: false,
    projectCount: 2,
    typicalBudgetKES: 'KES 30,000 - 80,000'
  },
  {
    id: 'cat-admin',
    title: 'Spreadsheets & Admin Support',
    slug: 'spreadsheets-admin',
    iconName: 'Table',
    description: 'Financial ledger templates, Google Sheets inventory formulas, CRM data cleaning, and reporting.',
    isPilotPriority: false,
    projectCount: 1,
    typicalBudgetKES: 'KES 10,000 - 30,000'
  }
];

export const SEED_USERS: User[] = [
  {
    id: 'usr-talent-1',
    email: 'amiina.otieno@example.com',
    role: 'talent',
    displayName: 'Amiina Otieno',
    avatarUrl: '/src/assets/images/avatar_female_dev_1792597008046.jpg',
    phone: '+254 712 345 678',
    createdAt: '2026-09-01T10:00:00Z',
    status: 'active'
  },
  {
    id: 'usr-talent-2',
    email: 'brian.kipchoge@example.com',
    role: 'talent',
    displayName: 'Brian Kipchoge',
    avatarUrl: '/src/assets/images/avatar_male_designer_1792597008617.jpg',
    phone: '+254 722 890 123',
    createdAt: '2026-09-05T14:30:00Z',
    status: 'active'
  },
  {
    id: 'usr-biz-1',
    email: 'sarah.wanjiku@greenboma.co.ke',
    role: 'business',
    displayName: 'Sarah Wanjiku',
    avatarUrl: '/src/assets/images/avatar_business_founder_1792597008966.jpg',
    phone: '+254 701 555 432',
    createdAt: '2026-08-15T09:00:00Z',
    status: 'active'
  },
  {
    id: 'usr-biz-2',
    email: 'david.mwangi@kilifilogistics.co.ke',
    role: 'business',
    displayName: 'David Mwangi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '+254 733 999 111',
    createdAt: '2026-09-12T11:15:00Z',
    status: 'active'
  },
  {
    id: 'usr-admin-1',
    email: 'governance@kazilink.africa',
    role: 'admin',
    displayName: 'Morris Kyengo',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    phone: '+254 700 000 001',
    createdAt: '2026-08-01T08:00:00Z',
    status: 'active'
  }
];

export const SEED_TALENT_PROFILES: Record<string, TalentProfile> = {
  'usr-talent-1': {
    userId: 'usr-talent-1',
    headline: 'Frontend Engineer & React/TypeScript Specialist',
    bio: 'Computer Science graduate from University of Nairobi (2025). Passionate about crafting high-performance, accessible web applications for East African businesses. Practical experience in React, Next.js, and mobile-optimized interfaces.',
    location: 'Nairobi, Kenya',
    availability: 'available',
    languages: ['English (Fluent)', 'Swahili (Native)'],
    preferredCategories: ['Website Development & Setup', 'Online Catalogue & E-Commerce'],
    hourlyRateKES: 2500,
    education: [
      {
        degree: 'BSc. Computer Science',
        institution: 'University of Nairobi',
        year: '2021 - 2025'
      }
    ],
    skills: [
      {
        id: 'sk-1',
        name: 'React.js & TypeScript',
        category: 'Website Development & Setup',
        status: 'client_verified',
        evidenceType: 'github_repo',
        evidenceUrl: 'https://github.com/example/react-tea-estate-portal',
        evidenceTitle: 'Tea Estate Inventory Dashboard',
        evidenceDescription: 'Built with React 19, TypeScript, and Tailwind CSS. Implements offline caching for rural estate collection points.'
      },
      {
        id: 'sk-2',
        name: 'Tailwind CSS & Responsive Layouts',
        category: 'Website Development & Setup',
        status: 'evidence_attached',
        evidenceType: 'live_url',
        evidenceUrl: 'https://demo-agro-kenya.web.app',
        evidenceTitle: 'AgroKenya Pilot Landing Page',
        evidenceDescription: 'Mobile-first landing page audited with Lighthouse 98/100 performance on 3G connections.'
      },
      {
        id: 'sk-3',
        name: 'REST API & Supabase Integration',
        category: 'Website Development & Setup',
        status: 'evidence_attached',
        evidenceType: 'github_repo',
        evidenceUrl: 'https://github.com/example/mpesa-express-starter',
        evidenceTitle: 'Node.js Daraja M-Pesa Microservice',
        evidenceDescription: 'Clean TypeScript wrapper around Safaricom Daraja STK Push with webhook verification.'
      }
    ],
    workSamples: [
      {
        id: 'ws-1',
        title: 'Nairobi Organic Foods - Producer Portal',
        description: 'Complete responsive web portal for organic farmers in Kiambu to list weekly harvests with delivery scheduling.',
        liveUrl: 'https://demo-nairobi-organic.web.app',
        repoUrl: 'https://github.com/example/nairobi-organic',
        category: 'Website Development & Setup',
        skillsUsed: ['React', 'TypeScript', 'Tailwind CSS']
      },
      {
        id: 'ws-2',
        title: 'SME Invoice Generator (KES)',
        description: 'Client-side offline tool allowing small traders to create professional PDF invoices compliant with KRA eTIMS formats.',
        liveUrl: 'https://demo-invoice-kes.web.app',
        repoUrl: 'https://github.com/example/sme-invoice-tool',
        category: 'Spreadsheets & Admin Support',
        skillsUsed: ['TypeScript', 'PDF Generation', 'LocalStorage']
      }
    ],
    completedEngagementsCount: 2,
    rating: 4.9,
    totalEarnedKES: 78000
  },
  'usr-talent-2': {
    userId: 'usr-talent-2',
    headline: 'Brand Identity Designer & Digital Illustrator',
    bio: 'Visual Communication designer with 2+ years of hands-on experience helping African startups and SMEs build memorable brand identities, logo systems, packaging, and digital marketing materials in Figma and Illustrator.',
    location: 'Nairobi / Eldoret, Kenya',
    availability: 'available',
    languages: ['English (Fluent)', 'Swahili (Fluent)'],
    preferredCategories: ['Graphic Design & Brand Assets', 'Social Media Content & Design'],
    hourlyRateKES: 2000,
    education: [
      {
        degree: 'Diploma in Graphic Design & Digital Media',
        institution: 'Technical University of Kenya',
        year: '2022 - 2024'
      }
    ],
    skills: [
      {
        id: 'sk-4',
        name: 'Brand Identity & Logo Design',
        category: 'Graphic Design & Brand Assets',
        status: 'client_verified',
        evidenceType: 'figma_prototype',
        evidenceUrl: 'https://figma.com/@briankipchoge/brand-system-case-study',
        evidenceTitle: 'Kilifi Roasters Brand Guide',
        evidenceDescription: 'Comprehensive 24-page brand guidelines with vector primary marks, monochrome variants, typography hierarchy, and packaging.'
      },
      {
        id: 'sk-5',
        name: 'Packaging & Print Prep',
        category: 'Graphic Design & Brand Assets',
        status: 'evidence_attached',
        evidenceType: 'portfolio_file',
        evidenceUrl: 'https://behance.net/gallery/organic-tea-packaging',
        evidenceTitle: 'Kericho Valley Tea Pouch System',
        evidenceDescription: 'Pre-press CMYK separation files, dielines, and 3D mockups.'
      }
    ],
    workSamples: [
      {
        id: 'ws-3',
        title: 'Savannah Solar - Visual Identity',
        description: 'Full corporate brand design including logo mark, typography system, vehicle livery, and technician badges for renewable energy SME.',
        liveUrl: 'https://behance.net/gallery/savannah-solar-kenya',
        category: 'Graphic Design & Brand Assets',
        skillsUsed: ['Adobe Illustrator', 'Figma', 'Typography']
      }
    ],
    completedEngagementsCount: 1,
    rating: 5.0,
    totalEarnedKES: 35000
  }
};

export const SEED_BUSINESS_PROFILES: Record<string, BusinessProfile> = {
  'usr-biz-1': {
    userId: 'usr-biz-1',
    companyName: 'GreenBoma Organics Ltd',
    industry: 'Agribusiness & FMCG Retail',
    location: 'Westlands, Nairobi, Kenya',
    website: 'https://greenboma.co.ke',
    bio: 'Direct-to-consumer farm produce brand supplying sustainably grown vegetables and pantry items to over 450 households across Nairobi.',
    contactPerson: 'Sarah Wanjiku (Founder & Director)',
    verificationStatus: 'verified',
    registrationNumber: 'CPR/2023/118249',
    taxId: 'P051892340M',
    verificationDocumentName: 'Certificate_of_Incorporation_GreenBoma.pdf',
    verificationNotes: 'Verified via Kenya Business Registration Service (BRS). Active verified business member.',
    projectsPostedCount: 3,
    totalSpentKES: 115000
  },
  'usr-biz-2': {
    userId: 'usr-biz-2',
    companyName: 'Kilifi Coastal Logistics',
    industry: 'Transport & Supply Chain',
    location: 'Mombasa Port / Kilifi, Kenya',
    website: 'https://kilifilogistics.co.ke',
    bio: 'Regional freight and cold-storage distribution partner connecting coastal fruit growers with Nairobi wholesale terminals.',
    contactPerson: 'David Mwangi (Operations Lead)',
    verificationStatus: 'pending_review',
    registrationNumber: 'BN/2024/093122',
    taxId: 'A009381729K',
    verificationDocumentName: 'Business_Permit_Mombasa_County_2026.pdf',
    verificationNotes: 'Under compliance verification by KaziLink Governance team.',
    projectsPostedCount: 1,
    totalSpentKES: 0
  }
};

export const SEED_PROJECTS: Project[] = [
  {
    id: 'prj-1',
    businessId: 'usr-biz-1',
    businessName: 'GreenBoma Organics Ltd',
    businessVerified: true,
    businessLocation: 'Nairobi - Westlands',
    title: 'Mobile-Optimized Produce Catalog & Ordering Site',
    category: 'Website Development & Setup',
    summary: 'Build a lightweight, mobile-first website where Nairobi clients can browse seasonal harvest bundles and submit orders with delivery pin drop.',
    detailedBrief: `GreenBoma Organics is launching a direct-to-home delivery service for weekly fresh vegetable boxes in Nairobi. We need a clean, ultra-fast marketing website with a catalog view.

Scope & Key Requirements:
1. Fast-loading landing page introducing our farm story and delivery zones (Westlands, Kilimani, Lavington, Karen).
2. Dynamic weekly produce catalog with price per kg, stock status, and seasonal notes.
3. Simple order summary checkout with customer contact info, delivery address, and WhatsApp/M-Pesa payment prompt.
4. Clean responsive UI adhering to modern mobile accessibility and 3G performance constraints.
5. All source code in a GitHub repository with documentation on how our team can update weekly produce items.`,
    requiredSkills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Mobile Optimization'],
    budgetKES: 45000,
    currency: 'KES',
    deliveryDeadline: '2026-11-15',
    applicationDeadline: '2026-10-31',
    deliverables: [
      'Production-ready React/TypeScript repository on GitHub',
      'Deployed preview on Netlify/Vercel with custom domain mapping instructions',
      'JSON-based content config for easy weekly price and item updates',
      'Mobile Lighthouse audit report with performance score >= 90'
    ],
    revisionAllowance: 2,
    arrangement: 'remote',
    location: 'Nairobi, Kenya',
    status: 'in_progress',
    createdAt: '2026-10-10T12:00:00Z',
    applicationsCount: 3
  },
  {
    id: 'prj-2',
    businessId: 'usr-biz-1',
    businessName: 'GreenBoma Organics Ltd',
    businessVerified: true,
    businessLocation: 'Nairobi - Westlands',
    title: 'Brand Packaging & Label System for Organic Fruit Jams',
    category: 'Graphic Design & Brand Assets',
    summary: 'Design glass jar packaging labels and tamper-evident seal strips for three flavors of locally sourced passion fruit, mango, and berry jams.',
    detailedBrief: `We are debuting a line of artisanal fruit jams packaged in 250ml glass hexagon jars. We need an artisanal, contemporary Kenyan label system that reflects purity and craftsmanship.

Requirements:
- Master label design template with flavor color differentiation.
- Front label: Brand logo, flavor name, net weight, "100% Kenyan Harvest" badge.
- Back label: Nutrition info layout, ingredients, KEBS standardization placeholder, bar code zone.
- Tamper-evident lid seal sticker.
- Vector source files in AI / SVG format, plus ready-to-print CMYK PDF with bleed lines.`,
    requiredSkills: ['Package Design', 'Adobe Illustrator', 'Typography', 'Print Production'],
    budgetKES: 30000,
    currency: 'KES',
    deliveryDeadline: '2026-11-20',
    applicationDeadline: '2026-11-05',
    deliverables: [
      '3x Print-ready PDF files with 3mm bleed and cut lines',
      'Vector editable files (.AI or .SVG)',
      '3D jar mockup renders for digital marketing',
      'Font files and packaging color palette specs (CMYK & Pantone)'
    ],
    revisionAllowance: 2,
    arrangement: 'remote',
    location: 'Nairobi, Kenya',
    status: 'open',
    createdAt: '2026-10-18T09:30:00Z',
    applicationsCount: 2
  },
  {
    id: 'prj-3',
    businessId: 'usr-biz-2',
    businessName: 'Kilifi Coastal Logistics',
    businessVerified: false,
    businessLocation: 'Mombasa Port',
    title: 'Driver Fleet Schedule & Fuel Tracking Spreadsheet with Dashboard',
    category: 'Spreadsheets & Admin Support',
    summary: 'Create a structured Google Sheets workbook for 18 transport trucks, calculating fuel consumption per kilometer and scheduled maintenance warnings.',
    detailedBrief: `We operate 18 refrigerated trucks between Mombasa, Voi, and Nairobi. We require an automated Google Sheets management template that dispatchers can easily use on mobile and desktop.

Requirements:
- Daily trip log: Driver, truck plate, departure, destination, odometer start/end, fuel liters purchased, fuel cost.
- Automated KPI formulas: Cost per km, fuel efficiency (km/liter), trip duration.
- Maintenance alert sheet: Flags trucks approaching 10,000km oil change threshold in amber/red.
- Monthly executive summary sheet with clean charts showing fuel expenditure trends.`,
    requiredSkills: ['Google Sheets', 'Excel Formulas', 'Fleet Tracking', 'Data Visualization'],
    budgetKES: 22000,
    currency: 'KES',
    deliveryDeadline: '2026-11-10',
    applicationDeadline: '2026-10-28',
    deliverables: [
      'Protected Google Sheets master workbook with input validation and formulas',
      'Dispatcher Quick-Start PDF Guide (1 page)',
      '15-minute screen recording walkthrough for operations team'
    ],
    revisionAllowance: 2,
    arrangement: 'remote',
    location: 'Mombasa / Remote',
    status: 'open',
    createdAt: '2026-10-19T14:00:00Z',
    applicationsCount: 1
  },
  {
    id: 'prj-4',
    businessId: 'usr-biz-1',
    businessName: 'GreenBoma Organics Ltd',
    businessVerified: true,
    businessLocation: 'Nairobi - Westlands',
    title: 'Company Domain & Google Workspace Setup with Security Policies',
    category: 'Basic IT Support & Setup',
    summary: 'Configure DNS MX/SPF/DKIM/DMARC records for greenboma.co.ke, setup 8 staff mailboxes with 2FA, and configure shared Google Drive.',
    detailedBrief: `GreenBoma recently registered our domain on KeNIC (.co.ke). We need an experienced IT specialist to set up Google Workspace for Non-Profits/Business, ensuring 100% email deliverability with DKIM/SPF and proper staff permission tiers.`,
    requiredSkills: ['Google Workspace', 'DNS Management', 'DMARC/SPF', 'Security 2FA'],
    budgetKES: 18000,
    currency: 'KES',
    deliveryDeadline: '2026-11-02',
    applicationDeadline: '2026-10-26',
    deliverables: [
      'DNS verification and green deliverability test on Mail-Tester (Score >= 9/10)',
      'Configured 8 user accounts with enforced 2FA',
      'Shared drive structure for Accounts, Operations, and Farm Dispatch'
    ],
    revisionAllowance: 1,
    arrangement: 'remote',
    location: 'Nairobi / Remote',
    status: 'open',
    createdAt: '2026-10-20T11:00:00Z',
    applicationsCount: 0
  }
];

export const SEED_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    projectId: 'prj-1',
    projectTitle: 'Mobile-Optimized Produce Catalog & Ordering Site',
    talentId: 'usr-talent-1',
    talentName: 'Amiina Otieno',
    talentAvatar: '/src/assets/images/avatar_female_dev_1792597008046.jpg',
    talentHeadline: 'Frontend Engineer & React/TypeScript Specialist',
    talentLocation: 'Nairobi, Kenya',
    coverNote: `Habari Sarah, I have built similar agricultural catalog portals in Nairobi, including the Nairobi Organic Foods portal. I understand the importance of making this blazing fast on 3G Safaricom connections. I can deliver a clean Next.js/React architecture with easy JSON updates for your weekly inventory.`,
    proposedTimelineDays: 14,
    proposedRateKES: 45000,
    attachedEvidenceLinks: [
      {
        title: 'Producer Portal Live Demo',
        url: 'https://demo-nairobi-organic.web.app',
        description: 'Demonstrates catalog filters, responsive mobile cards, and WhatsApp order flow.'
      },
      {
        title: 'M-Pesa STK Push Starter',
        url: 'https://github.com/example/mpesa-express-starter',
        description: 'Clean TypeScript codebase with Daraja API integrations.'
      }
    ],
    status: 'selected',
    createdAt: '2026-10-11T09:00:00Z'
  },
  {
    id: 'app-2',
    projectId: 'prj-2',
    projectTitle: 'Brand Packaging & Label System for Organic Fruit Jams',
    talentId: 'usr-talent-2',
    talentName: 'Brian Kipchoge',
    talentAvatar: '/src/assets/images/avatar_male_designer_1792597008617.jpg',
    talentHeadline: 'Brand Identity Designer & Digital Illustrator',
    talentLocation: 'Nairobi / Eldoret, Kenya',
    coverNote: `Hello Sarah, packaging design for artisanal food requires keen knowledge of print bleeds and local consumer eye-tracking. I previously created the brand and packaging guidelines for Kilifi Roasters and Kericho Valley Tea. I will ensure KEBS and barcode requirements are met while keeping the jars visually stunning.`,
    proposedTimelineDays: 12,
    proposedRateKES: 30000,
    attachedEvidenceLinks: [
      {
        title: 'Kilifi Roasters Brand Guide',
        url: 'https://figma.com/@briankipchoge/brand-system-case-study',
        description: 'Figma showcase with print specs and color guidelines.'
      }
    ],
    status: 'submitted',
    createdAt: '2026-10-18T16:20:00Z'
  }
];

export const SEED_ENGAGEMENTS: Engagement[] = [
  {
    id: 'eng-1',
    projectId: 'prj-1',
    projectTitle: 'Mobile-Optimized Produce Catalog & Ordering Site',
    category: 'Website Development & Setup',
    businessId: 'usr-biz-1',
    businessName: 'GreenBoma Organics Ltd',
    talentId: 'usr-talent-1',
    talentName: 'Amiina Otieno',
    talentAvatar: '/src/assets/images/avatar_female_dev_1792597008046.jpg',
    agreedBudgetKES: 45000,
    agreedDeadline: '2026-11-15',
    revisionAllowance: 2,
    revisionsUsed: 1,
    status: 'deliverable_submitted',
    createdAt: '2026-10-12T14:00:00Z',
    deliverables: [
      {
        id: 'del-1',
        submittedAt: '2026-10-19T17:30:00Z',
        title: 'Milestone 1 Deliverables: Catalog Web App & JSON Data Store',
        releaseNotes: 'Deployed live staging preview at https://greenboma-preview.web.app. Added delivery fee calculator by Nairobi zone (Kilimani, Westlands, Karen, Lavington). Attached GitHub repository link with full README.',
        fileLinks: [
          { label: 'Live Staging Deployment', url: 'https://greenboma-preview.web.app', type: 'preview' },
          { label: 'GitHub Repository (Private Branch)', url: 'https://github.com/kazilink-pilot/greenboma-catalog', type: 'code' },
          { label: 'Lighthouse Performance Report (96/100)', url: 'https://lighthouse.report/greenboma-audit.pdf', type: 'doc' }
        ],
        status: 'submitted'
      }
    ],
    revisions: [
      {
        id: 'rev-1',
        requestedAt: '2026-10-20T10:15:00Z',
        feedback: 'Great progress Amiina! The mobile speed is very impressive. We noticed two small adjustments needed: 1. Please add a phone number field for the recipient if different from the customer. 2. Update the minimum order amount to KES 1,500.',
        specificPoints: [
          'Add alternative recipient phone input in checkout modal',
          'Enforce KES 1,500 minimum cart threshold with friendly toast alert'
        ]
      }
    ]
  }
];

export const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-10T12:00:00Z',
    actorEmail: 'sarah.wanjiku@greenboma.co.ke',
    actorRole: 'business',
    action: 'Project Published',
    details: 'Published project "Mobile-Optimized Produce Catalog & Ordering Site" (Budget: KES 45,000)',
    category: 'project'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-11T09:00:00Z',
    actorEmail: 'amiina.otieno@example.com',
    actorRole: 'talent',
    action: 'Application Submitted',
    details: 'Applied to project prj-1 with 2 verified proof-to-work evidence links',
    category: 'project'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-12T14:00:00Z',
    actorEmail: 'sarah.wanjiku@greenboma.co.ke',
    actorRole: 'business',
    action: 'Candidate Selected',
    details: 'Selected Amiina Otieno for project prj-1. Milestone engagement eng-1 created with KES 45,000 escrow commitment.',
    category: 'engagement'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-15T09:45:00Z',
    actorEmail: 'governance@kazilink.africa',
    actorRole: 'admin',
    action: 'Business Verification Approved',
    details: 'Approved business registration certificate CPR/2023/118249 for GreenBoma Organics Ltd.',
    category: 'verification'
  },
  {
    id: 'log-5',
    timestamp: '2026-10-19T17:30:00Z',
    actorEmail: 'amiina.otieno@example.com',
    actorRole: 'talent',
    action: 'Deliverable Submitted',
    details: 'Submitted Milestone 1 Deliverables with staging link and GitHub repo.',
    category: 'engagement'
  }
];

export const SEED_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    reportedByUserId: 'usr-talent-1',
    reportedByEmail: 'amiina.otieno@example.com',
    targetType: 'project',
    targetId: 'prj-test-flag',
    targetTitle: 'Suspicious Telemarketing Posting',
    reason: 'Unclear payment terms',
    details: 'Poster requested upfront WhatsApp registration fee before project interview.',
    status: 'resolved',
    createdAt: '2026-10-05T08:00:00Z',
    resolutionNotes: 'Account suspended and listing removed by KaziLink Trust & Safety.'
  }
];

export const SEED_INVITATIONS: ProjectInvitation[] = [
  {
    id: 'inv-1',
    projectId: 'prj-3',
    projectTitle: 'Driver Fleet Schedule & Fuel Tracking Spreadsheet with Dashboard',
    projectCategory: 'Spreadsheets & Admin Support',
    projectBudgetKES: 22000,
    businessId: 'usr-biz-2',
    businessName: 'Kilifi Coastal Logistics',
    businessVerified: false,
    talentId: 'usr-talent-1',
    talentName: 'Amiina Otieno',
    personalMessage: 'Habari Amiina, we reviewed your verified React & offline tool portfolio. We have 18 trucks running the Mombasa-Nairobi corridor and need your help building an automated Google Sheets operational tracker.',
    status: 'pending',
    createdAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'inv-2',
    projectId: 'prj-2',
    projectTitle: 'Brand Packaging & Label System for Organic Fruit Jams',
    projectCategory: 'Graphic Design & Brand Assets',
    projectBudgetKES: 30000,
    businessId: 'usr-biz-1',
    businessName: 'GreenBoma Organics Ltd',
    businessVerified: true,
    talentId: 'usr-talent-2',
    talentName: 'Brian Kipchoge',
    personalMessage: 'Hello Brian, we were impressed by your Kericho Valley Tea brand guidelines on your profile. We would like to invite you to submit a proposal for our new fruit jam packaging project.',
    status: 'pending',
    createdAt: '2026-10-24T09:15:00Z'
  }
];

export const SEED_ACTIVITIES: ActivityEvent[] = [
  // Talent 1 (Amiina Otieno)
  {
    id: 'act-1',
    userId: 'usr-talent-1',
    type: 'project_invitation',
    title: 'New Project Invitation Received',
    description: 'Kilifi Coastal Logistics invited you to apply for "Driver Fleet Schedule & Fuel Tracking Spreadsheet".',
    timestamp: '2026-10-25T14:30:00Z',
    isRead: false,
    actorName: 'David Mwangi',
    actorRole: 'business',
    targetId: 'prj-3',
    linkTarget: 'project',
    badgeText: 'KES 22,000 Invitation',
    badgeTone: 'accent'
  },
  {
    id: 'act-2',
    userId: 'usr-talent-1',
    type: 'revision_event',
    title: 'Revision Feedback on Milestone 1',
    description: 'GreenBoma Organics reviewed your staging preview and requested 2 minor adjustments (minimum cart threshold and alternate phone input).',
    timestamp: '2026-10-20T10:15:00Z',
    isRead: false,
    actorName: 'Sarah Wanjiku',
    actorRole: 'business',
    targetId: 'eng-1',
    linkTarget: 'engagement',
    badgeText: 'Revision Requested',
    badgeTone: 'warning'
  },
  {
    id: 'act-3',
    userId: 'usr-talent-1',
    type: 'deliverable_event',
    title: 'Milestone 1 Deliverables Submitted',
    description: 'You submitted the staging URL (greenboma-preview.web.app) and GitHub repository branch for client review.',
    timestamp: '2026-10-19T17:30:00Z',
    isRead: true,
    actorName: 'Amiina Otieno',
    actorRole: 'talent',
    targetId: 'eng-1',
    linkTarget: 'engagement',
    badgeText: 'Under Review',
    badgeTone: 'info'
  },
  {
    id: 'act-4',
    userId: 'usr-talent-1',
    type: 'application_status_changed',
    title: 'Candidate Selected & Engagement Initiated',
    description: 'Sarah Wanjiku selected your proposal for "Mobile-Optimized Produce Catalog & Ordering Site". Milestone escrow commitment: KES 45,000.',
    timestamp: '2026-10-12T14:00:00Z',
    isRead: true,
    actorName: 'Sarah Wanjiku',
    actorRole: 'business',
    targetId: 'eng-1',
    linkTarget: 'engagement',
    badgeText: 'Contract Active',
    badgeTone: 'success'
  },
  {
    id: 'act-5',
    userId: 'usr-talent-1',
    type: 'application_status_changed',
    title: 'Proposal Shortlisted',
    description: 'Your application for "Mobile-Optimized Produce Catalog" was moved to the client shortlist.',
    timestamp: '2026-10-11T16:00:00Z',
    isRead: true,
    actorName: 'GreenBoma Organics Ltd',
    actorRole: 'business',
    targetId: 'prj-1',
    linkTarget: 'applications',
    badgeText: 'Shortlisted',
    badgeTone: 'info'
  },

  // Talent 2 (Brian Kipchoge)
  {
    id: 'act-6',
    userId: 'usr-talent-2',
    type: 'project_invitation',
    title: 'New Project Invitation Received',
    description: 'GreenBoma Organics Ltd invited you to apply for "Brand Packaging & Label System for Organic Fruit Jams".',
    timestamp: '2026-10-24T09:15:00Z',
    isRead: false,
    actorName: 'Sarah Wanjiku',
    actorRole: 'business',
    targetId: 'prj-2',
    linkTarget: 'project',
    badgeText: 'KES 30,000 Invitation',
    badgeTone: 'accent'
  },
  {
    id: 'act-7',
    userId: 'usr-talent-2',
    type: 'application_status_changed',
    title: 'Proposal Submitted',
    description: 'You submitted a proposal with Kilifi Roasters brand guidelines attached for "Brand Packaging & Label System".',
    timestamp: '2026-10-18T16:20:00Z',
    isRead: true,
    actorName: 'Brian Kipchoge',
    actorRole: 'talent',
    targetId: 'prj-2',
    linkTarget: 'applications',
    badgeText: 'Submitted',
    badgeTone: 'info'
  },

  // Business 1 (Sarah Wanjiku - GreenBoma)
  {
    id: 'act-8',
    userId: 'usr-biz-1',
    type: 'deliverable_event',
    title: 'Deliverables Ready for Review',
    description: 'Amiina Otieno submitted Milestone 1 code and staging deployment for "Mobile-Optimized Produce Catalog".',
    timestamp: '2026-10-19T17:30:00Z',
    isRead: false,
    actorName: 'Amiina Otieno',
    actorRole: 'talent',
    targetId: 'eng-1',
    linkTarget: 'engagement',
    badgeText: 'Action Required',
    badgeTone: 'warning'
  },
  {
    id: 'act-9',
    userId: 'usr-biz-1',
    type: 'application_status_changed',
    title: 'New Proposal Received',
    description: 'Brian Kipchoge submitted a proposal with Figma showcase for "Brand Packaging & Label System for Organic Fruit Jams".',
    timestamp: '2026-10-18T16:20:00Z',
    isRead: false,
    actorName: 'Brian Kipchoge',
    actorRole: 'talent',
    targetId: 'prj-2',
    linkTarget: 'project',
    badgeText: 'New Applicant',
    badgeTone: 'accent'
  },
  {
    id: 'act-10',
    userId: 'usr-biz-1',
    type: 'verification_event',
    title: 'Kenya BRS Business Verification Approved',
    description: 'Certificate CPR/2023/118249 verified. Verified Kenyan SME trust badge activated on all your listings.',
    timestamp: '2026-10-15T09:45:00Z',
    isRead: true,
    actorName: 'KaziLink Governance',
    actorRole: 'admin',
    linkTarget: 'verification',
    badgeText: 'Verified SME',
    badgeTone: 'success'
  },
  {
    id: 'act-11',
    userId: 'usr-biz-1',
    type: 'project_invitation',
    title: 'Invitation Sent to Brian Kipchoge',
    description: 'Sent direct invitation to Brian Kipchoge for project "Brand Packaging & Label System".',
    timestamp: '2026-10-24T09:15:00Z',
    isRead: true,
    actorName: 'Sarah Wanjiku',
    actorRole: 'business',
    targetId: 'prj-2',
    linkTarget: 'project',
    badgeText: 'Invited',
    badgeTone: 'info'
  },

  // Business 2 (David Mwangi - Kilifi Logistics)
  {
    id: 'act-12',
    userId: 'usr-biz-2',
    type: 'project_invitation',
    title: 'Invitation Sent to Amiina Otieno',
    description: 'Sent project invitation to Amiina Otieno for "Driver Fleet Schedule & Fuel Tracking Spreadsheet".',
    timestamp: '2026-10-25T14:30:00Z',
    isRead: true,
    actorName: 'David Mwangi',
    actorRole: 'business',
    targetId: 'prj-3',
    linkTarget: 'project',
    badgeText: 'Invited',
    badgeTone: 'info'
  }
];

