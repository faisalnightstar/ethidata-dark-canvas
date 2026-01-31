import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, StatCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const caseStudyData = {
  title: "Cloud Migration for Fortune 500 Bank",
  client: "Global Financial Corp",
  industry: "Finance",
  challenge: "Global Financial Corp was operating on legacy infrastructure that was costly to maintain, slow to scale, and posed security risks. They needed to modernize their entire technology stack while maintaining 24/7 uptime for critical banking operations.",
  solution: "We designed and executed a phased cloud migration strategy that moved over 500 applications to AWS. Our approach included automated testing, zero-downtime deployment, and comprehensive security hardening.",
  impact: [
    { value: "40%", label: "Cost Reduction" },
    { value: "99.99%", label: "Uptime Achieved" },
    { value: "10x", label: "Faster Deployments" },
    { value: "100+", label: "Apps Migrated" },
  ],
  techStack: ["AWS", "Kubernetes", "Terraform", "Docker", "Jenkins", "Datadog"],
  testimonial: {
    quote: "EthiData transformed our entire infrastructure. Their expertise in cloud architecture saved us millions while improving our performance and security posture.",
    author: "Sarah Chen",
    role: "CTO, Global Financial Corp",
  },
  keyResults: [
    "Reduced infrastructure costs by 40% annually",
    "Achieved 99.99% uptime across all critical systems",
    "Reduced deployment time from weeks to hours",
    "Implemented automated security scanning and compliance monitoring",
    "Established disaster recovery with <1 hour RTO",
  ],
};

export default function CaseStudyDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {caseStudyData.industry} Case Study
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {caseStudyData.title}
            </h1>
            <p className="mx-auto mt-6 text-xl text-muted-foreground">
              Client: {caseStudyData.client}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 border-b border-white/10">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudyData.impact.map((metric, index) => (
              <StatCard key={index} {...metric} />
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="The Challenge"
                title="What They Faced"
                centered={false}
              />
              <GlassCard>
                <p className="text-muted-foreground">{caseStudyData.challenge}</p>
              </GlassCard>
            </div>
            <div>
              <SectionHeader
                eyebrow="Our Solution"
                title="How We Helped"
                centered={false}
              />
              <GlassCard glow>
                <p className="text-muted-foreground">{caseStudyData.solution}</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Key Results */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Results"
            title="What We Achieved"
          />
          <div className="mx-auto max-w-3xl">
            <GlassCard>
              <div className="space-y-4">
                {caseStudyData.keyResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{result}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Technology"
            title="Tech Stack Used"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudyData.techStack.map((tech, index) => (
              <span
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-5xl text-primary mb-6">"</div>
            <p className="text-xl text-muted-foreground italic">
              {caseStudyData.testimonial.quote}
            </p>
            <div className="mt-6">
              <div className="font-semibold text-foreground">{caseStudyData.testimonial.author}</div>
              <div className="text-sm text-muted-foreground">{caseStudyData.testimonial.role}</div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Achieve Similar Results?"
        description="Let's discuss how we can help transform your business."
        primaryAction={{ label: "Start Your Project", href: "/contact" }}
        secondaryAction={{ label: "View More Case Studies", href: "/case-studies" }}
      />
    </Layout>
  );
}
