import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { useParams, Link } from "react-router-dom";
import { Landmark, CheckCircle, ArrowRight } from "lucide-react";

const industryData = {
  name: "Financial Services",
  description: "Secure, compliant technology solutions for banks, insurance companies, and fintech innovators.",
  challenges: [
    "Stringent regulatory requirements (PCI-DSS, SOX, GDPR)",
    "Legacy system modernization while maintaining uptime",
    "Real-time fraud detection and prevention",
    "Scaling to handle millions of transactions",
    "Maintaining security across distributed systems",
  ],
  solutions: [
    { title: "Core Banking Modernization", description: "Transform legacy systems into modern, API-first platforms" },
    { title: "Payment Processing", description: "Build secure, scalable payment infrastructure" },
    { title: "RegTech Solutions", description: "Automate compliance and regulatory reporting" },
    { title: "Fraud Detection", description: "ML-powered real-time fraud prevention systems" },
  ],
  metrics: [
    { value: "99.99%", label: "System Uptime" },
    { value: "50+", label: "Financial Clients" },
    { value: "<10ms", label: "Transaction Latency" },
    { value: "100%", label: "Compliance Rate" },
  ],
};

const relatedCaseStudies = [
  { title: "Cloud Migration for Fortune 500 Bank", industry: "Finance" },
  { title: "Real-time Fraud Detection Platform", industry: "Finance" },
  { title: "Digital Banking Transformation", industry: "Finance" },
];

export default function IndustryDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
              <Landmark className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {industryData.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              {industryData.description}
            </p>
            <div className="mt-8">
              <GlowButton href="/contact" size="lg" icon>
                Discuss Your Project
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 border-b border-white/10">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industryData.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text">{metric.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Industry Challenges"
            title="Understanding Your Pain Points"
            description="We know the unique challenges facing the financial services industry."
          />
          <div className="mx-auto max-w-3xl">
            <GlassCard>
              <div className="space-y-4">
                {industryData.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Solutions"
            title="Tailored for Your Industry"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {industryData.solutions.map((solution, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {solution.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Case Studies"
            title="Success Stories"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {relatedCaseStudies.map((study, index) => (
              <Link to="/case-studies" key={index}>
                <GlassCard className="group h-full">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {study.industry}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <div className="mt-4 flex items-center text-primary text-sm">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's Transform Your Business"
        description="Partner with us to build industry-leading technology solutions."
        primaryAction={{ label: "Get in Touch", href: "/contact" }}
        secondaryAction={{ label: "View All Industries", href: "/industries" }}
      />
    </Layout>
  );
}
