import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, TestimonialCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Quote } from "lucide-react";

const industries = ["All", "Finance", "Healthcare", "Retail", "Manufacturing", "Technology"];

const testimonials = [
  {
    quote: "EthiData transformed our entire infrastructure. Their expertise in cloud architecture saved us millions while improving our performance and security posture.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Global Financial Corp",
    industry: "Finance",
  },
  {
    quote: "The AI solutions they delivered exceeded our expectations. Our diagnostic accuracy improved by 35%, directly impacting patient outcomes.",
    author: "Dr. Michael Torres",
    role: "Chief Medical Officer",
    company: "HealthFirst Systems",
    industry: "Healthcare",
  },
  {
    quote: "Professional, innovative, and reliable. EthiData helped us build an omnichannel platform that increased our sales by 60%.",
    author: "Emily Watson",
    role: "VP of Digital",
    company: "RetailMax",
    industry: "Retail",
  },
  {
    quote: "Their DevOps expertise reduced our deployment time from weeks to hours. The cultural transformation was just as valuable as the technical implementation.",
    author: "James Rodriguez",
    role: "Engineering Director",
    company: "TechCorp",
    industry: "Technology",
  },
  {
    quote: "EthiData's IoT solution gave us complete visibility into our manufacturing operations. Predictive maintenance alone saved us $2M annually.",
    author: "Robert Kim",
    role: "VP of Operations",
    company: "Industrial Dynamics",
    industry: "Manufacturing",
  },
  {
    quote: "Working with EthiData felt like having an extension of our own team. Their understanding of financial regulations was exceptional.",
    author: "Lisa Chang",
    role: "Chief Compliance Officer",
    company: "InvestPro",
    industry: "Finance",
  },
  {
    quote: "The data platform they built handles millions of transactions daily with sub-second latency. It's been rock solid since day one.",
    author: "David Park",
    role: "Head of Engineering",
    company: "DataStream",
    industry: "Technology",
  },
  {
    quote: "Their security audit identified vulnerabilities we didn't know existed. The remediation was swift and thorough.",
    author: "Amanda Foster",
    role: "CISO",
    company: "SecureHealth",
    industry: "Healthcare",
  },
];

const videoTestimonials = [
  {
    title: "How Global Financial Corp Saved 40% on Cloud Costs",
    company: "Global Financial Corp",
    duration: "3:45",
  },
  {
    title: "HealthFirst's AI-Powered Transformation",
    company: "HealthFirst Systems",
    duration: "4:20",
  },
  {
    title: "RetailMax's Digital Commerce Journey",
    company: "RetailMax",
    duration: "3:15",
  },
];

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTestimonials = activeFilter === "All"
    ? testimonials
    : testimonials.filter(t => t.industry === activeFilter);

  return (
    <Layout>
      <PageHeader
        eyebrow="Testimonials"
        title="Voices of Success"
        description="Hear from the enterprises we've helped transform through technology."
      />

      {/* Featured Quote */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="h-16 w-16 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground italic">
              "EthiData didn't just deliver a project—they became true partners in our digital transformation journey. Their expertise and dedication exceeded all expectations."
            </blockquote>
            <div className="mt-8">
              <div className="text-lg font-semibold text-foreground">Alexandra Williams</div>
              <div className="text-muted-foreground">CEO, Nexus Systems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Video Stories"
            title="Watch Their Stories"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {videoTestimonials.map((video, index) => (
              <GlassCard key={index} className="group cursor-pointer p-0 overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-primary/20 p-4 backdrop-blur-sm group-hover:bg-primary/30 transition-colors">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 rounded bg-background/80 px-2 py-1 text-xs text-foreground">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.company}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Client Stories"
            title="What They Say"
          />

          {/* Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeFilter === industry
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-sm"
                    : "border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-16 border-y border-white/10 bg-background-secondary">
        <div className="container-custom">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["Global Financial Corp", "HealthFirst", "RetailMax", "TechCorp", "InvestPro", "Nexus"].map((company, index) => (
              <div
                key={index}
                className="text-lg font-bold text-muted-foreground/50 hover:text-primary transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Join Our Success Stories?"
        description="Let's discuss how we can help transform your business."
        primaryAction={{ label: "Start a Conversation", href: "/contact" }}
        secondaryAction={{ label: "View Case Studies", href: "/case-studies" }}
      />
    </Layout>
  );
}
