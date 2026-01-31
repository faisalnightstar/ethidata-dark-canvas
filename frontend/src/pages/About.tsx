import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, StatCard, TeamCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Target, Eye, Heart, Users, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "2024", label: "Year Founded" },
  { value: "20+", label: "Team Members" },
  { value: "100+", label: "Projects Completed" },
  { value: "10+", label: "Countries Served" },
];

const timeline = [
  { year: "2024", title: "Founded", description: "EthiData & Technologies established in Greater Noida" },
  { year: "2025", title: "AI Division", description: "Launched dedicated AI & ML practice" },
  { year: "2025", title: "100th Project", description: "Celebrated 100th successful project delivery" },
  { year: "2026", title: "Today", description: "Leading enterprise technology innovation" },
];

const values = [
  { icon: Lightbulb, title: "Innovation", description: "We push boundaries and embrace new technologies" },
  { icon: Shield, title: "Integrity", description: "We operate with transparency and ethical standards" },
  { icon: Users, title: "Collaboration", description: "We work as partners, not just vendors" },
  { icon: Heart, title: "Excellence", description: "We deliver nothing less than the best" },
];

const leaders = [
  { name: "Atharv Chaturvedi", role: "Chief Executive Officer", image: "/images/teams/atharv.png" },
  { name: "Abu Faisal", role: "Chief Technology Officer", image: "/images/teams/faisal.jpeg" },
  { name: "Saif Farhan", role: "Chief Operations Officer", image: "/images/teams/farhan.png" },
  { name: "Kartikey Chaturvedi", role: "VP of Engineering", image: "/images/teams/kartikey.png" },
];

export default function About() {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title="Engineering the Future, Together"
        description="For over a decade, EthiData has been at the forefront of enterprise technology, helping organizations transform through innovation."
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

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                title="From Startup to Industry Leader"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  EthiData & Technologies was born from a vision: to bridge the gap between
                  cutting-edge technology and enterprise needs. Founded in 2012 by a team
                  of engineers who believed in doing things differently.
                </p>
                <p>
                  What started as a small consulting firm has grown into a global technology
                  partner, serving Fortune 500 companies and innovative startups alike.
                </p>
                <p>
                  Our secret? We never stopped learning, never stopped innovating, and never
                  compromised on quality. Today, we're proud to lead the industry in
                  enterprise technology solutions.
                </p>
              </div>
            </div>
            <div className="relative">
              <GlassCard className="p-0 overflow-hidden" glow>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text">ETHIDATA</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Journey"
            title="Milestones That Define Us"
          />
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <GlassCard>
                        <div className="text-2xl font-bold gradient-text">{item.year}</div>
                        <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                      </GlassCard>
                    )}
                  </div>
                  <div className="relative hidden md:flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-sm" />
                  </div>
                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <GlassCard>
                        <div className="text-2xl font-bold gradient-text">{item.year}</div>
                        <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            <GlassCard className="p-8" glow>
              <div className="mb-4 inline-flex rounded-lg bg-primary/20 p-3">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="mt-4 text-muted-foreground">
                To empower enterprises with innovative technology solutions that drive
                transformation, efficiency, and sustainable growth in an ever-evolving
                digital landscape.
              </p>
            </GlassCard>
            <GlassCard className="p-8" glow>
              <div className="mb-4 inline-flex rounded-lg bg-secondary/20 p-3">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="mt-4 text-muted-foreground">
                To be the global leader in enterprise technology innovation, setting
                the standard for excellence, ethics, and impact in every solution
                we deliver.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Values"
            title="What We Stand For"
            description="The principles that guide everything we do."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Leadership Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Leadership"
            title="Meet Our Team"
            description="The visionaries driving EthiData forward."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, index) => (
              <Link to="/team" key={index}>
                <TeamCard {...leader} />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GlowButton href="/team" variant="outline" icon>
              View Full Team
            </GlowButton>
          </div>
        </div>
      </section>

      <CTABanner
        title="Want to Join Our Story?"
        description="We're always looking for talented individuals to join our team."
        primaryAction={{ label: "View Open Positions", href: "/jobs" }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </Layout>
  );
}
