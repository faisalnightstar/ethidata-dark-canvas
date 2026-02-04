import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { 
  Code2, 
  Cloud, 
  Shield, 
  Cpu, 
  BarChart3, 
  Zap,
  Database,
  Globe,
  Smartphone,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "End-to-end software solutions tailored to your unique business requirements. From concept to deployment, we build applications that scale.",
    features: ["Web Applications", "Enterprise Software", "API Development", "Legacy Modernization"],
  },
  {
    icon: Cloud,
    title: "Cloud Architecture & Migration",
    description: "Design and implement robust cloud infrastructure. We help you migrate, optimize, and manage cloud environments efficiently.",
    features: ["AWS / Azure / GCP", "Cloud Migration", "Cost Optimization", "DevOps Implementation"],
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Comprehensive security solutions to protect your digital assets. From threat assessment to incident response, we've got you covered.",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"],
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Harness the power of artificial intelligence to automate processes, gain insights, and drive innovation across your organization.",
    features: ["Predictive Analytics", "NLP Solutions", "Computer Vision", "MLOps"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    description: "Transform raw data into actionable insights. We build data platforms that enable informed decision-making at every level.",
    features: ["Data Warehousing", "Business Intelligence", "Real-time Analytics", "Data Visualization"],
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Modernize your operations with comprehensive digital transformation strategies that align technology with business goals.",
    features: ["Process Automation", "Change Management", "Technology Roadmaps", "Innovation Labs"],
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Design, optimize, and manage database systems that power your applications. From SQL to NoSQL, we handle it all.",
    features: ["Database Design", "Performance Tuning", "Migration", "High Availability"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Create stunning, high-performance web experiences. From marketing sites to complex web applications, we deliver excellence.",
    features: ["Frontend Development", "Backend Systems", "E-commerce", "Progressive Web Apps"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Build native and cross-platform mobile applications that users love. iOS, Android, or both - we've got the expertise.",
    features: ["iOS Development", "Android Development", "React Native", "Flutter"],
  },
  {
    icon: Settings,
    title: "DevOps & SRE",
    description: "Implement DevOps practices and Site Reliability Engineering to ensure your systems are scalable, reliable, and efficient.",
    features: ["CI/CD Pipelines", "Infrastructure as Code", "Monitoring", "SLA Management"],
  },
];

export default function Services() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Our Services"
        title="Engineering Excellence at Scale"
        description="Comprehensive technology solutions designed to transform your business and drive sustainable growth."
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <Link to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <GlassCard className="h-full group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3 transition-transform group-hover:scale-110">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Process"
            title="How We Work"
            description="A proven methodology that ensures successful project delivery every time."
          />
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", description: "We dive deep into your requirements, challenges, and goals." },
              { step: "02", title: "Strategy", description: "We design a comprehensive solution architecture and roadmap." },
              { step: "03", title: "Execution", description: "Our team builds and iterates with agile precision." },
              { step: "04", title: "Evolution", description: "We support, optimize, and scale your solution over time." },
            ].map((item, index) => (
              <GlassCard key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text">{item.step}</div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Get Started?"
        description="Let's discuss how our services can help you achieve your technology goals."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "View Case Studies", href: "/case-studies" }}
      />
    </Layout>
  );
}
