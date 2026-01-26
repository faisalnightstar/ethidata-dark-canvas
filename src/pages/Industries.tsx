import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CTABanner } from "@/components/ui/cta-banner";
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <Link to={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Approach"
            title="Why Industry Expertise Matters"
            description="We don't just build technology — we understand your business."
          />
          <div className="grid gap-8 md:grid-cols-3">
            <GlassCard className="text-center">
              <div className="text-4xl font-bold gradient-text">10+</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Years Experience</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A decade of serving diverse industries
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-4xl font-bold gradient-text">8</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Industries Served</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deep expertise across sectors
              </p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-4xl font-bold gradient-text">500+</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Projects Delivered</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Proven track record of success
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See Your Industry?"
        description="We have experience across many sectors. Let's discuss your specific needs."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "View Case Studies", href: "/case-studies" }}
      />
    </Layout>
  );
}
