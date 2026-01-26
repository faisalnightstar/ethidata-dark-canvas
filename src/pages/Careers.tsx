import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, JobCard, StatCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Zap, 
  Users, 
  GraduationCap, 
  Coffee, 
  Plane,
  DollarSign,
  Clock,
  ArrowRight
} from "lucide-react";

const stats = [
  { value: "150+", label: "Team Members" },
  { value: "50+", label: "Countries Represented" },
  { value: "4.8", label: "Glassdoor Rating" },
  { value: "95%", label: "Would Recommend" },
];

const values = [
  { icon: Zap, title: "Innovation First", description: "We embrace new ideas and push the boundaries of what's possible." },
  { icon: Users, title: "Collaboration", description: "We work together, learn from each other, and celebrate collective success." },
  { icon: Heart, title: "Work-Life Balance", description: "We believe great work comes from happy, well-rested people." },
  { icon: GraduationCap, title: "Continuous Learning", description: "We invest in growth with education budgets and learning opportunities." },
];

const benefits = [
  { icon: DollarSign, title: "Competitive Salary", description: "Top-of-market compensation reviewed annually" },
  { icon: Heart, title: "Health Benefits", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: Plane, title: "Flexible PTO", description: "Unlimited vacation policy with minimum days off" },
  { icon: Clock, title: "Remote Work", description: "Work from anywhere with flexible hours" },
  { icon: GraduationCap, title: "Learning Budget", description: "$5,000 annual budget for courses and conferences" },
  { icon: Coffee, title: "Team Events", description: "Regular team retreats and social events" },
];

const openPositions = [
  { title: "Senior Software Engineer", department: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Cloud Architect", department: "Engineering", location: "San Francisco, CA", type: "Full-time" },
  { title: "Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { title: "Data Scientist", department: "AI & ML", location: "Remote", type: "Full-time" },
];

export default function Careers() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Careers"
        title="Build the Future With Us"
        description="Join a team of passionate innovators working on technology that makes a difference."
      />

      {/* Stats */}
      <section className="py-16 border-b border-white/10">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Life at EthiData */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Life at EthiData"
            title="Why You'll Love Working Here"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <GlassCard key={index} className="text-center">
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Culture"
            title="Behind the Scenes"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className={`${index === 0 ? 'col-span-2 row-span-2' : ''} rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 aspect-square flex items-center justify-center`}
              >
                <span className="text-4xl text-primary/30">📸</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Benefits"
            title="What We Offer"
            description="We take care of our team with comprehensive benefits."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Preview */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Open Positions"
            title="Current Opportunities"
          />
          <div className="space-y-4">
            {openPositions.map((job, index) => (
              <Link to={`/jobs/${job.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <JobCard {...job} />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <GlowButton href="/jobs" variant="outline" icon>
              View All Positions
            </GlowButton>
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See the Right Role?"
        description="We're always looking for talented people. Send us your resume and we'll keep you in mind."
        primaryAction={{ label: "Submit Your Resume", href: "/contact" }}
        secondaryAction={{ label: "View All Positions", href: "/jobs" }}
      />
    </Layout>
  );
}
