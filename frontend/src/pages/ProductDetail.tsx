import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, StatCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { useParams } from "react-router-dom";
import { Layers, CheckCircle, Zap, Globe, Shield, ArrowRight } from "lucide-react";

const productData = {
  name: "DataFlow Platform",
  tagline: "Enterprise Data Integration",
  description: "Unified data platform that connects all your data sources, enabling real-time analytics and insights across your organization.",
  features: [
    {
      icon: Layers,
      title: "Universal Connectivity",
      description: "Connect to 150+ data sources including databases, SaaS apps, and APIs.",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Stream and process data in real-time with sub-second latency.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy globally with automatic scaling to handle any workload.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with encryption, RBAC, and compliance certifications.",
    },
  ],
  integrations: ["Salesforce", "AWS S3", "Snowflake", "BigQuery", "PostgreSQL", "MongoDB", "Kafka", "REST APIs"],
  pricing: [
    {
      name: "Starter",
      price: "$499",
      description: "For small teams getting started",
      features: ["5 data sources", "1M records/month", "Basic support", "Community access"],
    },
    {
      name: "Professional",
      price: "$1,499",
      description: "For growing organizations",
      features: ["25 data sources", "10M records/month", "Priority support", "Advanced analytics"],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale deployments",
      features: ["Unlimited sources", "Unlimited records", "Dedicated support", "Custom SLA"],
    },
  ],
};

export default function ProductDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
              <Layers className="h-12 w-12 text-primary" />
            </div>
            <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
              {productData.tagline}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {productData.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              {productData.description}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <GlowButton href="/contact" size="lg" icon>
                Request Demo
              </GlowButton>
              <GlowButton href="/pricing" variant="outline" size="lg">
                View Pricing
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Features"
            title="Everything You Need"
            description="Powerful capabilities designed for enterprise requirements."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {productData.features.map((feature, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3 transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Integrations"
            title="Connect to Everything"
            description="150+ pre-built connectors for all your favorite tools."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {productData.integrations.map((integration, index) => (
              <span
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, Transparent Pricing"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {productData.pricing.map((tier, index) => (
              <GlassCard
                key={index}
                className={tier.featured ? "border-primary/50 shadow-glow-sm" : ""}
                glow={tier.featured}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <GlowButton
                    href="/contact"
                    variant={tier.featured ? "solid" : "outline"}
                    className="w-full"
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </GlowButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Transform Your Data?"
        description="Schedule a personalized demo to see DataFlow in action."
        primaryAction={{ label: "Request Demo", href: "/contact" }}
        secondaryAction={{ label: "View All Products", href: "/products" }}
      />
    </Layout>
  );
}
