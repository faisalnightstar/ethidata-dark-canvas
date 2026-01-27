// Mock data for testing pages and components

export const mockServices = [
  {
    icon: "Code2",
    title: "Software Engineering",
    description: "Custom software solutions built with cutting-edge technologies.",
  },
  {
    icon: "Cloud",
    title: "Cloud Architecture",
    description: "Design and implement robust cloud infrastructure.",
  },
];

export const mockStats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Team Members" },
  { value: "12+", label: "Years Experience" },
];

export const mockTestimonials = [
  {
    quote: "EthiData transformed our entire infrastructure.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
  },
  {
    quote: "The AI solutions they delivered exceeded our expectations.",
    author: "Michael Torres",
    role: "VP of Engineering",
    company: "DataStream",
  },
];

export const mockCaseStudies = [
  {
    title: "Cloud Migration for Fortune 500",
    client: "Global Financial Corp",
    industry: "Finance",
  },
  {
    title: "AI-Powered Customer Analytics",
    client: "RetailMax",
    industry: "Retail",
  },
];

export const mockResources = [
  {
    title: "Enterprise Cloud Migration Guide",
    description: "A comprehensive guide to planning and executing cloud migrations.",
    category: "Guides",
    type: "PDF",
    pages: 45,
    gated: true,
  },
  {
    title: "AI Implementation Framework",
    description: "Best practices and frameworks for implementing AI in enterprise.",
    category: "Whitepapers",
    type: "PDF",
    pages: 32,
    gated: true,
  },
  {
    title: "Security Audit Checklist",
    description: "Comprehensive checklist for conducting security audits.",
    category: "Templates",
    type: "XLSX",
    pages: 10,
    gated: false,
  },
];

export const mockProduct = {
  name: "DataFlow Platform",
  tagline: "Enterprise Data Integration",
  description: "Unified data platform that connects all your data sources.",
  features: [
    {
      icon: "Layers",
      title: "Universal Connectivity",
      description: "Connect to 150+ data sources.",
    },
  ],
};

export const mockCaseStudy = {
  title: "Cloud Migration for Fortune 500 Bank",
  client: "Global Financial Corp",
  industry: "Finance",
  challenge: "Legacy infrastructure that was costly to maintain.",
  solution: "We designed and executed a phased cloud migration strategy.",
  impact: [
    { value: "40%", label: "Cost Reduction" },
    { value: "99.99%", label: "Uptime Achieved" },
  ],
  techStack: ["AWS", "Kubernetes", "Terraform"],
  testimonial: {
    quote: "EthiData transformed our entire infrastructure.",
    author: "Sarah Chen",
    role: "CTO, Global Financial Corp",
  },
};
