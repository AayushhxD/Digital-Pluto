export const PLUTO_TAGLINE = {
  line1: 'digital marketing agency',
  line2: 'strategy · creative · performance',
}

export const PLUTO_EMAIL = 'teamdigitalpluto@gmail.com'

export const PLUTO_ABOUT = `Pluto is a digital marketing agency that creates and implements marketing strategies across social media, email, search engines, websites, and mobile apps.

We develop comprehensive plans tailored to each client's goals — using SEO, PPC, content marketing, social media, email, WhatsApp marketing, analytics, web design, and branding to attract, engage, and retain customers.

We work with businesses of all sizes across industries, delivering customized solutions backed by data and continuous optimization.`

export interface ProjectMetric {
  label: string
  value: string
}

export interface PortfolioProject {
  id: string
  title: string
  client: string
  category: string
  result: string
  gradient: string
  accent: string
  pattern: 'waves' | 'grid' | 'rings' | 'blocks' | 'dots' | 'lines'
  videoUrl?: string
  logoQuery?: string // search query for logo lookup
  description?: string
  metrics?: ProjectMetric[]
  tags?: string[]
  year?: string
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'vruddheshwar',
    title: 'Vruddheshwar Pure Veg',
    client: 'Vruddheshwar Pure Veg',
    category: 'social media',
    result: 'brand growth',
    gradient: 'linear-gradient(160deg, #f97316 0%, #ea580c 50%, #1c0a05 100%)',
    accent: '#fb923c',
    pattern: 'waves',
    year: '2024',
    tags: ['Instagram', 'Content', 'Reels'],
    description:
      `Built Vruddheshwar Pure Veg's social presence from the ground up — crafting a cohesive brand voice rooted in tradition and warmth. Through curated reels, festive campaigns, and community storytelling, we turned a local restaurant into a beloved digital destination.`,
    metrics: [
      { label: 'Follower Growth', value: '+320%' },
      { label: 'Avg. Post Reach', value: '12K+' },
      { label: 'Engagement Rate', value: '6.8%' },
      { label: 'Duration', value: '8 months' },
    ],
  },
  {
    id: 'jija',
    title: 'Jija Pure Veg',
    client: 'Jija Pure Veg',
    category: 'social media',
    result: 'organic reach',
    gradient: 'linear-gradient(160deg, #4ade80 0%, #16a34a 50%, #052e16 100%)',
    accent: '#4ade80',
    pattern: 'dots',
    year: '2024',
    tags: ['Instagram', 'Facebook', 'SEO'],
    description:
      'Repositioned Jija Pure Veg as a family-first dining brand. We leaned into authentic storytelling — behind-the-scenes kitchen moments, seasonal menu reveals, and user-generated content — that drove steady organic growth without paid amplification.',
    metrics: [
      { label: 'Organic Reach', value: '+180%' },
      { label: 'Monthly Saves', value: '3,200+' },
      { label: 'Profile Visits', value: '8K/mo' },
      { label: 'Duration', value: '6 months' },
    ],
  },
  {
    id: 'darshan',
    title: 'Darshan Tourism',
    client: 'Darshan Tourism',
    category: 'branding + web',
    result: 'booking growth',
    gradient: 'linear-gradient(160deg, #38bdf8 0%, #0284c7 50%, #0c1929 100%)',
    accent: '#38bdf8',
    pattern: 'rings',
    year: '2023',
    tags: ['Web Design', 'Branding', 'SEO', 'Google Ads'],
    description:
      'A full-spectrum overhaul for a Pune-based travel operator — new logo, brand identity, and a conversion-focused website paired with Google Ads campaigns. The result: a 40% uptick in online enquiries and first-page rankings for key pilgrimage routes.',
    metrics: [
      { label: 'Enquiry Growth', value: '+40%' },
      { label: 'Organic Ranking', value: 'Page 1' },
      { label: 'Bounce Rate', value: '−28%' },
      { label: 'Duration', value: '4 months' },
    ],
  },
  {
    id: 'balaji',
    title: 'Balaji Snacks',
    client: 'Balaji Snacks',
    category: 'paid + social',
    result: '+250% reach',
    gradient: 'linear-gradient(160deg, #fcd34d 0%, #d97706 50%, #1c1008 100%)',
    accent: '#fcd34d',
    pattern: 'blocks',
    year: '2023',
    tags: ['Meta Ads', 'Instagram', 'Influencer'],
    description:
      `Supercharged Balaji Snacks' regional presence through a multi-format Meta campaign combining thumb-stopping video ads, influencer collaborations, and a retargeting funnel. Campaign reach tripled within the first 60 days.`,
    metrics: [
      { label: 'Total Reach', value: '+250%' },
      { label: 'Video Views', value: '500K+' },
      { label: 'ROAS', value: '4.2×' },
      { label: 'Duration', value: '3 months' },
    ],
  },
  {
    id: 'glensteffani',
    title: 'Glen Steffani',
    client: 'Glen Steffani',
    category: 'branding',
    result: 'launch success',
    gradient: 'linear-gradient(160deg, #c084fc 0%, #7c3aed 50%, #1a0a2e 100%)',
    accent: '#a78bfa',
    pattern: 'grid',
    year: '2024',
    tags: ['Identity', 'Logo', 'Brand Kit', 'Social Kit'],
    description:
      'Complete brand identity for Glen Steffani — a luxury lifestyle label entering a competitive market. We built a visual system that whispers confidence: restrained colour palette, editorial typography, and a flexible kit from logo to content templates.',
    metrics: [
      { label: 'Deliverables', value: '60+ assets' },
      { label: 'Launch Timeline', value: '3 weeks' },
      { label: 'Brand Score', value: '9.4/10' },
      { label: 'Markets', value: '2 cities' },
    ],
  },
  {
    id: 'vatturkar',
    title: 'Vatturkar Jewellers',
    client: 'Vatturkar Jewellers',
    category: 'social + paid',
    result: 'festive campaigns',
    gradient: 'linear-gradient(160deg, #fbbf24 0%, #b45309 50%, #1a1208 100%)',
    accent: '#fbbf24',
    pattern: 'rings',
    year: '2023',
    tags: ['Meta Ads', 'WhatsApp', 'Email', 'Festive'],
    description:
      'Crafted a 360° festive campaign calendar for Vatturkar Jewellers spanning Diwali, Akshaya Tritiya, and wedding season. Rich-media ads on Meta, personalized WhatsApp broadcasts, and targeted email drops delivered record in-store footfall.',
    metrics: [
      { label: 'Footfall', value: '+65%' },
      { label: 'WhatsApp CTR', value: '34%' },
      { label: 'Revenue Peak', value: '3× avg' },
      { label: 'Campaigns', value: '5 festivals' },
    ],
  },
  {
    id: 'paranjape',
    title: 'Paranjape Opticals',
    client: 'Paranjape Opticals',
    category: 'seo + web',
    result: 'top local rank',
    gradient: 'linear-gradient(160deg, #00d4ff 0%, #0066ff 45%, #0a1628 100%)',
    accent: '#00d4ff',
    pattern: 'lines',
    year: '2024',
    tags: ['SEO', 'Google Business', 'Web', 'Local Search'],
    description:
      'Took Paranjape Opticals from page-3 obscurity to the top local pack on Google Maps. A comprehensive local-SEO strategy — GMB optimisation, on-page content refresh, citation building, and review management — delivered lasting first-page authority.',
    metrics: [
      { label: 'Local Rank', value: '#1 Maps' },
      { label: 'Organic Traffic', value: '+210%' },
      { label: 'Review Score', value: '4.8 ★' },
      { label: 'Duration', value: '5 months' },
    ],
  },
  {
    id: 'avani',
    title: 'Avani Essentials',
    client: 'Avani Essentials',
    category: 'ecommerce',
    result: 'D2C growth',
    gradient: 'linear-gradient(160deg, #f0abfc 0%, #db2777 50%, #2a0a18 100%)',
    accent: '#f0abfc',
    pattern: 'waves',
    year: '2024',
    tags: ['D2C', 'Meta Ads', 'Email', 'Shopify'],
    description:
      'Scaled Avani Essentials — a natural skincare D2C brand — through a full-funnel paid strategy combined with lifecycle email flows. We built the acquisition machine on Meta Ads and turned first-time buyers into loyal subscribers.',
    metrics: [
      { label: 'Revenue Growth', value: '+190%' },
      { label: 'CPA Reduction', value: '−35%' },
      { label: 'Email Revenue', value: '28% of total' },
      { label: 'Duration', value: '6 months' },
    ],
  },
  {
    id: 'instafloor',
    title: 'Instafloor',
    client: 'Instafloor',
    category: 'lead gen',
    result: '3× leads',
    gradient: 'linear-gradient(160deg, #2dd4bf 0%, #0d9488 50%, #042f2e 100%)',
    accent: '#2dd4bf',
    pattern: 'grid',
    year: '2023',
    tags: ['Google Ads', 'Landing Page', 'CRO', 'Lead Gen'],
    description:
      'Redesigned the lead-generation engine for Instafloor, a premium flooring brand. New conversion-optimised landing pages paired with precision Google Search campaigns reduced cost-per-lead by 40% while tripling qualified inbound enquiries.',
    metrics: [
      { label: 'Lead Volume', value: '3× growth' },
      { label: 'Cost Per Lead', value: '−40%' },
      { label: 'Conv. Rate', value: '8.2%' },
      { label: 'Duration', value: '4 months' },
    ],
  },
  {
    id: 'orthopaedic',
    title: 'Orthopaedic Industries',
    client: 'Orthopaedic Industries',
    category: 'b2b marketing',
    result: 'export reach',
    gradient: 'linear-gradient(160deg, #94a3b8 0%, #334155 50%, #0f172a 100%)',
    accent: '#94a3b8',
    pattern: 'dots',
    year: '2024',
    tags: ['LinkedIn', 'B2B', 'SEO', 'Export'],
    description:
      'Positioned Orthopaedic Industries as a credible international supplier through a LinkedIn-led B2B content strategy, technical SEO, and targeted export-market outreach. Within six months, inbound export enquiries doubled from five new countries.',
    metrics: [
      { label: 'Export Enquiries', value: '2× growth' },
      { label: 'New Markets', value: '5 countries' },
      { label: 'LinkedIn Reach', value: '+340%' },
      { label: 'Duration', value: '6 months' },
    ],
  },
  {
    id: 'showreel',
    title: 'Pluto Showreel',
    client: 'Pluto Digital',
    category: 'showreel',
    result: 'cinematic',
    gradient: 'linear-gradient(160deg, #111 0%, #000 100%)',
    accent: '#ffffff',
    pattern: 'grid',
    videoUrl: '/pluto_video.mp4',
    year: '2024',
    tags: ['Video', 'Motion', 'Brand'],
    description:
      'Our agency showreel — a cinematic edit of campaigns, launches, and moments from across our client portfolio. Every frame is intentional. Strategy meets craft meets obsession.',
    metrics: [
      { label: 'Clients Featured', value: '10+' },
      { label: 'Duration', value: '90 seconds' },
      { label: 'Views', value: '20K+' },
      { label: 'Year', value: '2024' },
    ],
  },
]

/** @deprecated use PORTFOLIO */
export const WORKS = PORTFOLIO

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/digital.pluto', icon: 'ig' },
  { label: 'X / Twitter', href: '#', icon: 'x' },
  { label: 'Behance', href: '#', icon: 'be' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
]
