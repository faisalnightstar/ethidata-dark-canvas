import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { MotionSection, StaggerGrid, StaggerItem, MotionCard, AnimatedCounter } from "@/components/ui/motion";
import { Link } from "react-router-dom";
import { 
  Building2, 
  HeartPulse, 
  ShoppingCart, 
  Landmark, 
  Factory, 
  GraduationCap,
  Plane,
  Leaf
} from "lucide-react";

const industries = [
  {
    icon: Landmark,
    name: "Financial Services",
    description: "Secure, compliant solutions for banks, insurance, and fintech companies.",
    stats: "50+ Financial clients",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "HIPAA-compliant systems that improve patient care and operational efficiency.",
    stats: "30+ Healthcare projects",
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-commerce",
    description: "Scalable platforms that drive sales and enhance customer experience.",
    stats: "100+ Retail solutions",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "IoT and automation solutions for smart manufacturing operations.",
    stats: "40+ Manufacturing clients",
    color: "from-gray-500/20 to-slate-500/20",
  },
  {
    icon: Building2,
    name: "Real Estate",
    description: "PropTech solutions for property management and real estate transactions.",
    stats: "25+ PropTech projects",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "EdTech platforms that transform learning experiences.",
    stats: "35+ Educational institutions",
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Plane,
    name: "Travel & Hospitality",
    description: "Booking systems and guest experience platforms for the travel industry.",
    stats: "20+ Travel clients",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: Leaf,
    name: "Energy & Sustainability",
    description: "Green technology solutions for sustainable operations.",
    stats: "15+ Energy projects",
    color: "from-lime-500/20 to-green-500/20",
  },
];

export default function Industries() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Industries"
        title="Expertise Across Sectors"
        description="Deep domain knowledge combined with technology excellence to serve diverse industries."
      />

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <StaggerItem key={index}>
                <Link to={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <MotionCard>
                    <GlassCard className="group h-full">
                      <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${industry.color} p-3 transition-transform group-hover:scale-110`}>
                        <industry.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {industry.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{industry.description}</p>
                      <div className="mt-4 text-xs font-medium text-primary">{industry.stats}</div>
                    </GlassCard>
                  </MotionCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <MotionSection>
            <SectionHeader
              eyebrow="Our Approach"
              title="Why Industry Expertise Matters"
              description="We don't just build technology — we understand your business."
            />
          </MotionSection>
          <StaggerGrid className="grid gap-8 md:grid-cols-3">
            {[
              { value: "10+", label: "Years Experience", desc: "A decade of serving diverse industries" },
              { value: "8", label: "Industries Served", desc: "Deep expertise across sectors" },
              { value: "500+", label: "Projects Delivered", desc: "Proven track record of success" },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <MotionCard>
                  <GlassCard className="text-center">
                    <AnimatedCounter value={stat.value} className="text-4xl font-bold gradient-text" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{stat.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.desc}</p>
                  </GlassCard>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <MotionSection>
        <CTABanner
          title="Don't See Your Industry?"
          description="We have experience across many sectors. Let's discuss your specific needs."
          primaryAction={{ label: "Contact Us", href: "/contact" }}
          secondaryAction={{ label: "View Case Studies", href: "/case-studies" }}
        />
      </MotionSection>
    </Layout>
  );
}
