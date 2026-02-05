import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Link } from "react-router-dom";
import { Layers, Zap, Shield, BarChart3, ArrowRight } from "lucide-react";

const products = [
  {
    icon: Layers,
    name: "DataFlow Platform",
    tagline: "Enterprise Data Integration",
    description: "Unified data platform that connects all your data sources, enabling real-time analytics and insights.",
    features: ["Real-time ETL", "150+ Connectors", "Data Quality Monitoring", "API-first Design"],
  },
  {
    icon: Zap,
    name: "AutomateIQ",
    tagline: "Intelligent Process Automation",
    description: "AI-powered automation platform that streamlines workflows and reduces manual operations.",
    features: ["No-code Workflows", "ML-powered Decisions", "Enterprise Integrations", "Audit Trail"],
  },
  {
    icon: Shield,
    name: "SecureGuard",
    tagline: "Comprehensive Security Suite",
    description: "End-to-end security platform that protects your infrastructure, applications, and data.",
    features: ["Threat Detection", "Compliance Automation", "Identity Management", "Incident Response"],
  },
  {
    icon: BarChart3,
    name: "InsightHub",
    tagline: "Business Intelligence Platform",
    description: "Transform raw data into actionable insights with powerful visualization and analytics tools.",
    features: ["Custom Dashboards", "Predictive Analytics", "Natural Language Queries", "Embedded Analytics"],
  },
];

export default function Products() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Our Products"
        title="Enterprise-Grade Solutions"
        description="Purpose-built products designed to solve complex business challenges at scale."
      />

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            {products.map((product, index) => (
              <Link to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <GlassCard className="group h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-4 transition-transform group-hover:scale-110">
                      <product.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {product.tagline}
                      </span>
                      <h3 className="mt-1 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-muted-foreground">{product.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center text-primary text-sm font-medium">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Compare"
            title="Find the Right Solution"
            description="All our products are designed to work together seamlessly."
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-foreground">Feature</th>
                  {products.map((product, index) => (
                    <th key={index} className="py-4 px-6 text-center text-sm font-semibold text-foreground">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Cloud Deployment", "On-premise Option", "API Access", "Enterprise Support", "Custom Integrations"].map((feature, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-6 text-sm text-muted-foreground">{feature}</td>
                    {products.map((_, pIndex) => (
                      <td key={pIndex} className="py-4 px-6 text-center">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                          ✓
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Product Is Right?"
        description="Our team can help you find the perfect solution for your needs."
        primaryAction={{ label: "Schedule a Demo", href: "/contact" }}
        secondaryAction={{ label: "View Pricing", href: "/pricing" }}
      />
    </Layout>
  );
}
