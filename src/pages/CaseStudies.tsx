import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, CaseStudyCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const filters = ["All", "Finance", "Healthcare", "Retail", "Manufacturing", "Technology"];

const caseStudies = [
  {
    title: "Cloud Migration for Fortune 500 Bank",
    client: "Global Financial Corp",
    industry: "Finance",
    excerpt: "Migrated legacy infrastructure to AWS, reducing costs by 40%.",
  },
  {
    title: "AI-Powered Diagnostics Platform",
    client: "HealthFirst Systems",
    industry: "Healthcare",
    excerpt: "Built an ML platform that improved diagnostic accuracy by 35%.",
  },
  {
    title: "Omnichannel Retail Platform",
    client: "RetailMax",
    industry: "Retail",
    excerpt: "Unified online and in-store experience, increasing sales by 60%.",
  },
  {
    title: "Smart Factory Implementation",
    client: "Industrial Dynamics",
    industry: "Manufacturing",
    excerpt: "IoT-enabled manufacturing floor with predictive maintenance.",
  },
  {
    title: "Real-time Trading System",
    client: "InvestPro",
    industry: "Finance",
    excerpt: "Sub-millisecond trading platform handling 1M+ transactions daily.",
  },
  {
    title: "Telehealth Platform",
    client: "CareConnect",
    industry: "Healthcare",
    excerpt: "HIPAA-compliant video consultation platform for 500K+ patients.",
  },
  {
    title: "E-commerce Modernization",
    client: "ShopGlobal",
    industry: "Retail",
    excerpt: "Rebuilt legacy e-commerce platform to handle 10x traffic.",
  },
  {
    title: "DevOps Transformation",
    client: "TechCorp",
    industry: "Technology",
    excerpt: "Reduced deployment time from weeks to hours with CI/CD.",
  },
  {
    title: "Supply Chain Optimization",
    client: "LogiFlow",
    industry: "Manufacturing",
    excerpt: "AI-driven supply chain visibility and optimization.",
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter(study => study.industry === activeFilter);

  return (
    <Layout>
      <PageHeader
        eyebrow="Case Studies"
        title="Success Stories That Inspire"
        description="Explore how we've helped enterprises transform through technology."
      />

      {/* Filter & Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === filter
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                    : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudies.map((study, index) => (
              <Link to={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <GlassCard className="group h-full">
                  <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {study.industry}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{study.client}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{study.excerpt}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Be Our Next Success Story?"
        description="Let's discuss how we can help transform your business."
        primaryAction={{ label: "Start a Conversation", href: "/contact" }}
        secondaryAction={{ label: "View Our Services", href: "/services" }}
      />
    </Layout>
  );
}
