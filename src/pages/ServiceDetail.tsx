import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { useParams, Link } from "react-router-dom";
import { Code2, CheckCircle, ArrowRight } from "lucide-react";

const serviceData = {
  title: "Custom Software Development",
  description: "End-to-end software solutions tailored to your unique business requirements. From concept to deployment, we build applications that scale.",
  problem: "Many enterprises struggle with outdated software that can't keep pace with modern business demands. Off-the-shelf solutions often fall short of specific requirements, leading to inefficiencies and missed opportunities.",
  solution: "We build custom software solutions that align perfectly with your business processes. Our team of experienced engineers works closely with you to understand your needs and deliver applications that drive real value.",
  process: [
    { step: "Requirements Analysis", description: "Deep dive into your business needs and technical requirements" },
    { step: "Architecture Design", description: "Design scalable, maintainable system architecture" },
    { step: "Agile Development", description: "Iterative development with continuous feedback" },
    { step: "Quality Assurance", description: "Rigorous testing to ensure reliability" },
    { step: "Deployment & Support", description: "Smooth deployment and ongoing maintenance" },
  ],
  deliverables: [
    "Fully documented codebase",
    "API documentation",
    "User manuals",
    "Training materials",
    "Deployment runbooks",
    "Maintenance SLA",
  ],
  technologies: ["React", "Node.js", "Python", "Go", "Kubernetes", "AWS"],
};

const relatedCaseStudies = [
  { title: "Enterprise Platform Modernization", client: "Global Finance Corp", industry: "Finance" },
  { title: "Real-time Trading System", client: "InvestPro", industry: "Finance" },
];

export default function ServiceDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding animated-gradient tech-pattern">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Service
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {serviceData.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              {serviceData.description}
            </p>
            <div className="mt-8">
              <GlowButton href="/contact" size="lg" icon>
                Discuss Your Project
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-foreground">The Challenge</h3>
              <p className="mt-4 text-muted-foreground">{serviceData.problem}</p>
            </GlassCard>
            <GlassCard className="p-8" glow>
              <h3 className="text-xl font-semibold text-foreground">Our Solution</h3>
              <p className="mt-4 text-muted-foreground">{serviceData.solution}</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Process"
            title="How We Deliver"
            description="A proven methodology for successful project delivery."
          />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-secondary hidden md:block" />
            <div className="space-y-6">
              {serviceData.process.map((item, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="relative hidden md:block">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-sm" />
                  </div>
                  <GlassCard className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold gradient-text">0{index + 1}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.step}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="What You Get"
                title="Deliverables"
                centered={false}
              />
              <div className="space-y-3">
                {serviceData.deliverables.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="Technologies"
                title="Our Tech Stack"
                centered={false}
              />
              <div className="flex flex-wrap gap-3">
                {serviceData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Case Studies"
            title="Related Projects"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {relatedCaseStudies.map((study, index) => (
              <Link to="/case-studies" key={index}>
                <GlassCard className="group">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {study.industry}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{study.client}</p>
                  <div className="mt-4 flex items-center text-primary text-sm">
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Start Your Project?"
        description="Let's discuss how we can help you build the perfect solution."
        primaryAction={{ label: "Get in Touch", href: "/contact" }}
        secondaryAction={{ label: "View All Services", href: "/services" }}
      />
    </Layout>
  );
}
