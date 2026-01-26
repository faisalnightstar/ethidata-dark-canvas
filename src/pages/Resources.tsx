import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, Download, Lock, ArrowRight } from "lucide-react";

const categories = ["All", "Whitepapers", "Guides", "Templates", "Reports"];

const resources = [
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
  {
    title: "2024 Technology Trends Report",
    description: "Our annual report on emerging technology trends for enterprises.",
    category: "Reports",
    type: "PDF",
    pages: 60,
    gated: true,
  },
  {
    title: "DevOps Maturity Assessment",
    description: "Template to assess your organization's DevOps maturity level.",
    category: "Templates",
    type: "PDF",
    pages: 15,
    gated: false,
  },
  {
    title: "Data Strategy Blueprint",
    description: "A strategic framework for building a data-driven organization.",
    category: "Whitepapers",
    type: "PDF",
    pages: 28,
    gated: true,
  },
];

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResources = activeFilter === "All"
    ? resources
    : resources.filter(resource => resource.category === activeFilter);

  return (
    <Layout>
      <PageHeader
        eyebrow="Resources"
        title="Knowledge Hub"
        description="Download guides, whitepapers, and templates to help you on your technology journey."
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === category
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                    : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <GlassCard key={index} className="group flex flex-col">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  {resource.gated && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      Gated
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {resource.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{resource.description}</p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-muted-foreground">
                    {resource.type} • {resource.pages} pages
                  </span>
                  <GlowButton variant="outline" className="h-9 px-4 text-xs">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </GlowButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Need Custom Resources?"
        description="We can create tailored content for your specific needs."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "View Services", href: "/services" }}
      />
    </Layout>
  );
}
