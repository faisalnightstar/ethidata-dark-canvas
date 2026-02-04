import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Handshake, Globe, Zap, Shield, Award, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

const partnerTypes = [
  {
    icon: Globe,
    title: "Technology Partners",
    description: "Integrate your technology with our platform to create joint solutions.",
  },
  {
    icon: Handshake,
    title: "Reseller Partners",
    description: "Sell EthiData products and services to your customer base.",
  },
  {
    icon: Users,
    title: "Consulting Partners",
    description: "Deliver EthiData solutions with your implementation expertise.",
  },
];

const benefits = [
  "Access to partner portal and resources",
  "Co-marketing opportunities",
  "Technical training and certification",
  "Dedicated partner success manager",
  "Revenue sharing and incentives",
  "Early access to new products",
  "Joint go-to-market support",
  "Partner directory listing",
];

const currentPartners = [
  "AWS", "Google Cloud", "Microsoft Azure", "Snowflake", "Databricks", 
  "Salesforce", "ServiceNow", "Splunk", "MongoDB", "Redis"
];

export default function Partnerships() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    partnerType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership inquiry:", formData);
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Partnerships"
        title="Grow With Us"
        description="Join our partner ecosystem and unlock new opportunities for growth and innovation."
      />

      {/* Partner Types */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Partner Programs"
            title="Find Your Path"
            description="We offer flexible partnership models to match your business goals."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {partnerTypes.map((type, index) => (
              <GlassCard key={index} className="text-center" glow>
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
                  <type.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                <p className="mt-2 text-muted-foreground">{type.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Benefits"
            title="Why Partner With Us"
          />
          <div className="mx-auto max-w-3xl">
            <GlassCard>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Partners"
            title="Trusted By Industry Leaders"
          />
          <div className="flex flex-wrap justify-center gap-6">
            {currentPartners.map((partner, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <SectionHeader
              eyebrow="Get Started"
              title="Become a Partner"
              description="Fill out the form below and our partnerships team will get in touch."
            />
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your company"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Partnership Type
                  </label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  >
                    <option value="" className="bg-background">Select a type</option>
                    <option value="technology" className="bg-background">Technology Partner</option>
                    <option value="reseller" className="bg-background">Reseller Partner</option>
                    <option value="consulting" className="bg-background">Consulting Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell Us About Your Interest
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="How do you envision our partnership?"
                  />
                </div>
                <GlowButton className="w-full" icon>
                  Submit Partnership Inquiry
                </GlowButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>
    </Layout>
  );
}
