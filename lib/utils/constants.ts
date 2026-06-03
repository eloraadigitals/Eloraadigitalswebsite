// =============================================================================
// Eloraa Digitals — Site-wide Constants
// =============================================================================

export const SITE_CONFIG = {
  name: "Eloraa Digitals",
  tagline: "Turning Clicks into Customers",
  description:
    "Eloraa Digitals is a premium digital marketing agency in Nashik, Maharashtra. We specialize in paid advertising, lead generation, social media marketing, and revenue optimization for Indian businesses.",
  url: "https://www.eloraadigitals.com",
  locale: "en_IN",
} as const;

export const CONTACT = {
  email: "eloraadigitals@gmail.com",
  phone: "+91 86691 83526",
  whatsapp: {
    number: "918669183526",
    link: "https://wa.me/918669183526?text=Hi%20Eloraa%20Digitals%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.",
    defaultMessage:
      "Hi Eloraa Digitals, I would like to enquire about your services.",
  },
  instagram: {
    handle: "@eloraadigitals",
    url: "https://instagram.com/eloraadigitals",
  },
  location: "Nashik, Maharashtra, India",
} as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: 1,
    title: "Paid Advertisement",
    description:
      "Reach the right audience at the right time with precision-targeted ad campaigns across Google, Meta, and YouTube.",
    outcome: "Higher ROAS, lower CPC, faster growth",
  },
  {
    id: 2,
    title: "Performance Marketing",
    description:
      "Data-driven campaigns engineered for conversions. Every rupee of your ad spend is tracked, optimized, and accountable.",
    outcome: "Measurable ROI, scalable acquisition, transparent reporting",
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description:
      "Build a loyal community and a magnetic brand presence across Instagram, Facebook, LinkedIn, and emerging platforms.",
    outcome: "Engaged followers, brand authority, consistent growth",
  },
  {
    id: 4,
    title: "Revenue Optimization",
    description:
      "Maximize revenue from your existing traffic and customers through funnel optimization, upselling, and retention strategies.",
    outcome: "Higher AOV, improved LTV, reduced churn",
  },
  {
    id: 5,
    title: "Lead Generation",
    description:
      "Generate a steady pipeline of qualified leads through targeted campaigns, landing pages, and conversion-optimized funnels.",
    outcome: "Consistent lead flow, lower CPL, higher conversion rates",
  },
  {
    id: 6,
    title: "Influencer Marketing",
    description:
      "Partner with the right influencers to amplify your brand story and reach audiences that trust recommendations over ads.",
    outcome: "Authentic reach, brand credibility, viral potential",
  },
  {
    id: 7,
    title: "Content Marketing",
    description:
      "Craft compelling stories, articles, and visual content that educates, inspires, and converts your target audience.",
    outcome: "Organic traffic, thought leadership, SEO authority",
  },
  {
    id: 8,
    title: "Marketing Analysis",
    description:
      "Deep-dive analytics and market research to uncover opportunities, benchmark performance, and refine your strategy.",
    outcome: "Actionable insights, competitive edge, informed decisions",
  },
] as const;

export const TRUST_METRICS = [
  { value: "80+", label: "Businesses", sublabel: "Served" },
  { value: "₹15L+", label: "Revenue", sublabel: "Influenced" },
  { value: "10,000+", label: "Leads", sublabel: "Generated" },
  { value: "99%", label: "Client", sublabel: "Satisfaction" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Which businesses does Eloraa Digitals work with?",
    answer:
      "We work with businesses of all sizes across India — from local Nashik startups and D2C brands to established enterprises looking to scale their digital presence. Whether you're a restaurant, e-commerce store, real estate firm, or SaaS company, we tailor our strategies to your industry and goals.",
  },
  {
    question: "How quickly can I expect results from digital marketing?",
    answer:
      "Paid advertising campaigns can start generating leads within the first week. However, sustainable growth through performance marketing typically shows significant results within 60–90 days. We set clear milestones and provide weekly performance reports so you always know where you stand.",
  },
  {
    question: "Do you offer customized marketing packages?",
    answer:
      "Absolutely. Every business is unique, and cookie-cutter solutions don't work. We start with a strategic review to understand your goals, budget, and challenges, then build a custom strategy and pricing plan that fits your needs.",
  },
  {
    question: "How is performance tracked and reported?",
    answer:
      "We provide transparent, data-driven reporting with real-time dashboards. You'll receive weekly performance summaries and monthly deep-dive reports covering key metrics like ROAS, CPL, conversion rates, and revenue attribution. No vanity metrics — only numbers that matter.",
  },
  {
    question: "How do I get started with Eloraa Digitals?",
    answer:
      "Getting started is simple. Get in touch with us through our website or message us on WhatsApp. We'll discuss your business goals, audit your current digital presence, and propose a tailored strategy — all before you spend a single rupee.",
  },
] as const;

export const CASE_STUDIES = [
  {
    id: 1,
    industry: "Restaurant & Hospitality",
    client: "A Premium Nashik Restaurant Chain",
    challenge:
      "Low online visibility and inconsistent footfall despite excellent food quality and ambiance.",
    strategy:
      "Launched hyper-local Google Ads + Instagram Reels campaign targeting food enthusiasts within 15km radius.",
    results: [
      { metric: "3.8x", label: "ROAS" },
      { metric: "₹12L+", label: "Revenue in 90 Days" },
      { metric: "2,400+", label: "New Customers" },
    ],
    isPlaceholder: true,
  },
  {
    id: 2,
    industry: "E-commerce & D2C",
    client: "A Growing Pune D2C Fashion Brand",
    challenge:
      "High customer acquisition costs and low repeat purchase rates on their Shopify store.",
    strategy:
      "Implemented Meta Ads retargeting funnel + email automation sequences + influencer seeding campaign.",
    results: [
      { metric: "62%", label: "Lower CAC" },
      { metric: "4.2x", label: "ROAS" },
      { metric: "38%", label: "Repeat Purchase Rate" },
    ],
    isPlaceholder: true,
  },
] as const;

export const TESTIMONIALS_PLACEHOLDER = [
  {
    id: "1",
    name: "Rajesh Patil",
    businessName: "Patil Foods, Nashik",
    rating: 5,
    review:
      "Eloraa Digitals transformed our online presence completely. Within 3 months, our restaurant went from barely visible to fully booked on weekends. Their team truly understands the local market.",
    profileImageUrl: null,
    approved: true,
  },
  {
    id: "2",
    name: "Sneha Deshmukh",
    businessName: "Bloom Beauty Studio",
    rating: 5,
    review:
      "We were skeptical about digital marketing, but Eloraa proved us wrong. Our lead generation increased by 300% and we've had to hire two more stylists to keep up with demand!",
    profileImageUrl: null,
    approved: true,
  },
  {
    id: "3",
    name: "Amit Kulkarni",
    businessName: "TechStart Solutions, Pune",
    rating: 4,
    review:
      "Professional, data-driven, and genuinely invested in our growth. The performance reports are crystal clear and the ROI speaks for itself. Highly recommend for any serious business.",
    profileImageUrl: null,
    approved: true,
  },
  {
    id: "4",
    name: "Priya Sharma",
    businessName: "Sharma Real Estate Group",
    rating: 5,
    review:
      "In the real estate market, quality leads are everything. Eloraa consistently delivers qualified buyer inquiries at a fraction of what we were paying before. Game-changing partnership.",
    profileImageUrl: null,
    approved: true,
  },
] as const;
