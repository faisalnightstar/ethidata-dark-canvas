import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard, ServiceCard, StatCard, TestimonialCard, CaseStudyCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { MotionSection, StaggerGrid, StaggerItem, HeroStagger, HeroItem, AnimatedCounter, MotionCard } from "@/components/ui/motion";
import { Code2, Cloud, Shield, Cpu, BarChart3, Zap, ChevronDown } from "lucide-react";

const services = [
  { icon: Code2, title: "Software Engineering", description: "Custom software solutions built with cutting-edge technologies for scalable enterprise applications." },
  { icon: Cloud, title: "Cloud Architecture", description: "Design and implement robust cloud infrastructure that scales with your business needs." },
  { icon: Shield, title: "Cybersecurity", description: "Comprehensive security solutions to protect your digital assets and ensure compliance." },
  { icon: Cpu, title: "AI & Machine Learning", description: "Harness the power of artificial intelligence to drive innovation and automation." },
  { icon: BarChart3, title: "Data Analytics", description: "Transform raw data into actionable insights with advanced analytics platforms." },
  { icon: Zap, title: "Digital Transformation", description: "Modernize your operations with end-to-end digital transformation strategies." },
];

const stats = [
  { value: "261+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "20+", label: "Team Members" },
  { value: "5+", label: "Years Experience" },
];

const testimonials = [
  { quote: "EDT transformed our entire infrastructure. Their expertise in cloud architecture saved us 40% on operational costs.", author: "Sarah Chen", role: "CTO", company: "TechFlow Inc" },
  { quote: "The AI solutions they delivered exceeded our expectations. Our customer service efficiency improved by 300%.", author: "Michael Torres", role: "VP of Engineering", company: "DataStream" },
  { quote: "Professional, innovative, and reliable. EDT is our go-to partner for all technology initiatives.", author: "Emily Watson", role: "CEO", company: "Nexus Systems" },
];

const caseStudies = [
  { image: "/images/case-studies/global-financial-corp.png", title: "Cloud Migration for Fortune 500", client: "Global Financial Corp", industry: "Finance" },
  { image: "/images/case-studies/retailmax.png", title: "AI-Powered Customer Analytics", client: "RetailMax", industry: "Retail" },
  { image: "/images/case-studies/healthfirst.png", title: "Cybersecurity Overhaul", client: "HealthFirst", industry: "Healthcare" },
];

const partners = ["AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Terraform", "Docker"];

export default function Index() {
  return (
    <Layout>
      <section className="relative min-h-[90vh] flex items-center animated-gradient hex-pattern overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl gradient-secondary" />
        </div>
        <div className="container-custom relative z-10">
          <HeroStagger className="mx-auto max-w-4xl text-center">
            <HeroItem><span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">Enterprise Engineering Excellence</span></HeroItem>
            <HeroItem><h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">Building the <span className="gradient-text">Future</span> of Technology</h1></HeroItem>
            <HeroItem><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">We partner with enterprises to design, build, and scale transformative technology solutions that drive innovation and growth.</p></HeroItem>
            <HeroItem>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <GlowButton href="/services" size="lg" icon>Explore Services</GlowButton>
                <GlowButton href="/contact" variant="outline" size="lg">Get in Touch</GlowButton>
              </div>
            </HeroItem>
          </HeroStagger>
          <div className="relative bottom-8 left-1/2 -translate-x-1/2 mt-32 flex justify-center items-center">
            <div className="absolute text-muted-foreground scroll-indicator"><ChevronDown className="h-10 w-10" /></div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-secondary tech-pattern">
        <div className="container-custom">
          <MotionSection><SectionHeader eyebrow="Our Services" title="Engineering Excellence at Scale" description="From cloud architecture to AI implementation, we deliver comprehensive technology solutions." /></MotionSection>
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (<StaggerItem key={index}><Link to="/services"><MotionCard><ServiceCard {...service} /></MotionCard></Link></StaggerItem>))}
          </StaggerGrid>
          <MotionSection className="mt-12 text-center"><GlowButton href="/services" variant="outline" icon>View All Services</GlowButton></MotionSection>
        </div>
      </section>

      <section className="section-padding border-y border-white/10">
        <div className="container-custom">
          <StaggerGrid className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (<StaggerItem key={index} className="text-center"><AnimatedCounter value={stat.value} className="text-4xl font-bold gradient-text md:text-5xl" /><div className="mt-2 text-sm text-muted-foreground">{stat.label}</div></StaggerItem>))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <MotionSection>
              <SectionHeader eyebrow="About EDT" title="Technology Partners You Can Trust" description="For over a decade, we've been at the forefront of enterprise technology innovation." centered={false} />
              <div className="space-y-4 text-muted-foreground"><p>EthiData & Technologies (formerly known as PairUp Labs) was founded with a simple mission: to help enterprises harness the power of technology to achieve their goals.</p><p>Our team of world-class engineers, architects, and strategists work together to deliver solutions that make a real impact.</p></div>
              <div className="mt-8"><GlowButton href="/about" icon>Learn More About Us</GlowButton></div>
            </MotionSection>
            <MotionSection delay={0.2}>
              <div className="relative">
                <GlassCard className="p-8" glow><div className="grid grid-cols-2 gap-6">{stats.slice(0, 4).map((stat, index) => (<div key={index} className="text-center"><div className="text-3xl font-bold gradient-text">{stat.value}</div><div className="mt-1 text-xs text-muted-foreground">{stat.label}</div></div>))}</div></GlassCard>
                <div className="absolute -z-10 -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/10 bg-background-secondary">
        <div className="container-custom">
          <MotionSection><p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">Trusted Technology Partners</p></MotionSection>
          <StaggerGrid className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (<StaggerItem key={index}><div className="text-xl font-bold text-muted-foreground/50 transition-colors hover:text-primary">{partner}</div></StaggerItem>))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <MotionSection><SectionHeader eyebrow="Case Studies" title="Success Stories That Speak" description="See how we've helped enterprises transform their technology landscape." /></MotionSection>
          <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (<StaggerItem key={index}><Link to="/case-studies"><MotionCard><CaseStudyCard {...study} /></MotionCard></Link></StaggerItem>))}
          </StaggerGrid>
          <MotionSection className="mt-12 text-center"><GlowButton href="/case-studies" variant="outline" icon>View All Case Studies</GlowButton></MotionSection>
        </div>
      </section>

      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <MotionSection><SectionHeader eyebrow="Testimonials" title="What Our Clients Say" description="Hear from the enterprises we've helped succeed." /></MotionSection>
          <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (<StaggerItem key={index}><MotionCard><TestimonialCard {...testimonial} /></MotionCard></StaggerItem>))}
          </StaggerGrid>
        </div>
      </section>

      <MotionSection><CTABanner title="Ready to Transform Your Business?" description="Let's discuss how our technology solutions can accelerate your growth." primaryAction={{ label: "Start a Conversation", href: "/contact" }} secondaryAction={{ label: "View Our Work", href: "/case-studies" }} /></MotionSection>
    </Layout>
  );
}
