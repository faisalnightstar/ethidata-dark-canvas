import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard, ServiceCard, StatCard, TestimonialCard, CaseStudyCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import {
  Code2,
  Cloud,
  Shield,
  Cpu,
  BarChart3,
  Zap,
  ArrowRight,
  ChevronDown
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Custom software solutions built with cutting-edge technologies for scalable enterprise applications.",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "Design and implement robust cloud infrastructure that scales with your business needs.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets and ensure compliance.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Harness the power of artificial intelligence to drive innovation and automation.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics platforms.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Modernize your operations with end-to-end digital transformation strategies.",
  },
];

const stats = [
  { value: "261+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "20+", label: "Team Members" },
  { value: "5+", label: "Years Experience" },
];

const testimonials = [
  {
    quote: "EDT transformed our entire infrastructure. Their expertise in cloud architecture saved us 40% on operational costs.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
  },
  {
    quote: "The AI solutions they delivered exceeded our expectations. Our customer service efficiency improved by 300%.",
    author: "Michael Torres",
    role: "VP of Engineering",
    company: "DataStream",
  },
  {
    quote: "Professional, innovative, and reliable. EDT is our go-to partner for all technology initiatives.",
    author: "Emily Watson",
    role: "CEO",
    company: "Nexus Systems",
  },
];

const caseStudies = [
  {
    image: "/images/case-studies/global-financial-corp.png",
    title: "Cloud Migration for Fortune 500",
    client: "Global Financial Corp",
    industry: "Finance",
  },
  {
    image: "/images/case-studies/retailmax.png",
    title: "AI-Powered Customer Analytics",
    client: "RetailMax",
    industry: "Retail",
  },
  {
    image: "/images/case-studies/healthfirst.png",
    title: "Cybersecurity Overhaul",
    client: "HealthFirst",
    industry: "Healthcare",
  },
];

const partners = [
  "AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Terraform", "Docker"
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center animated-gradient hex-pattern overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl gradient-secondary" />
        </div>

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Enterprise Engineering Excellence
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Building the{" "}
              <span className="gradient-text">Future</span>{" "}
              of Technology
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              We partner with enterprises to design, build, and scale transformative
              technology solutions that drive innovation and growth.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <GlowButton href="/services" size="lg" icon>
                Explore Services
              </GlowButton>
              <GlowButton href="/contact" variant="outline" size="lg">
                Get in Touch
              </GlowButton>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative bottom-8 left-1/2 -translate-x-1/2 mt-32 ">
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 mt-64 scroll-indicator text-muted-foreground">
              <ChevronDown className="h-10 w-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background-secondary tech-pattern">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Services"
            title="Engineering Excellence at Scale"
            description="From cloud architecture to AI implementation, we deliver comprehensive technology solutions."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link to="/services" key={index}>
                <ServiceCard {...service} />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GlowButton href="/services" variant="outline" icon>
              View All Services
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding border-y border-white/10">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="About EDT"
                title="Technology Partners You Can Trust"
                description="For over a decade, we've been at the forefront of enterprise technology innovation."
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  EthiData & Technologies (formerly known as PairUp Labs) was founded with a simple mission: to help
                  enterprises harness the power of technology to achieve their goals.
                </p>
                <p>
                  Our team of world-class engineers, architects, and strategists work
                  together to deliver solutions that make a real impact.
                </p>
              </div>
              <div className="mt-8">
                <GlowButton href="/about" icon>
                  Learn More About Us
                </GlowButton>
              </div>
            </div>
            <div className="relative">
              <GlassCard className="p-8" glow>
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              <div className="absolute -z-10 -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-16 border-y border-white/10 bg-background-secondary">
        <div className="container-custom">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted Technology Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-xl font-bold text-muted-foreground/50 transition-colors hover:text-primary"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Case Studies"
            title="Success Stories That Speak"
            description="See how we've helped enterprises transform their technology landscape."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Link to="/case-studies" key={index}>
                <CaseStudyCard {...study} />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GlowButton href="/case-studies" variant="outline" icon>
              View All Case Studies
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Our Clients Say"
            description="Hear from the enterprises we've helped succeed."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Transform Your Business?"
        description="Let's discuss how our technology solutions can accelerate your growth."
        primaryAction={{ label: "Start a Conversation", href: "/contact" }}
        secondaryAction={{ label: "View Our Work", href: "/case-studies" }}
      />
    </Layout>
  );
}
