import { Layout } from "@/components/layout";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { GlassCard, PricingCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { CTABanner } from "@/components/ui/cta-banner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, X } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "$2,999",
    description: "For small teams and startups",
    features: [
      "Up to 5 team members",
      "Basic support (48h response)",
      "Standard integrations",
      "Monthly reporting",
      "Community access",
    ],
  },
  {
    name: "Professional",
    price: "$7,999",
    description: "For growing businesses",
    features: [
      "Up to 25 team members",
      "Priority support (4h response)",
      "Advanced integrations",
      "Weekly reporting",
      "Dedicated success manager",
      "Custom workflows",
      "API access",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "24/7 premium support",
      "Custom integrations",
      "Real-time reporting",
      "Dedicated team",
      "On-premise option",
      "SLA guarantee",
      "Security audit",
    ],
  },
];

const comparisonFeatures = [
  { name: "Team Members", starter: "Up to 5", professional: "Up to 25", enterprise: "Unlimited" },
  { name: "Support Response", starter: "48 hours", professional: "4 hours", enterprise: "1 hour" },
  { name: "Integrations", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
  { name: "API Access", starter: false, professional: true, enterprise: true },
  { name: "Dedicated Manager", starter: false, professional: true, enterprise: true },
  { name: "On-premise", starter: false, professional: false, enterprise: true },
  { name: "SLA Guarantee", starter: false, professional: false, enterprise: true },
  { name: "Custom Workflows", starter: false, professional: true, enterprise: true },
];

const faqs = [
  {
    question: "How does billing work?",
    answer: "We offer monthly and annual billing options. Annual plans include a 20% discount. You can upgrade or downgrade your plan at any time.",
  },
  {
    question: "Can I try before I buy?",
    answer: "Yes! We offer a 14-day free trial of our Professional plan. No credit card required.",
  },
  {
    question: "What's included in enterprise pricing?",
    answer: "Enterprise pricing is customized based on your specific needs, including team size, integrations, and support requirements. Contact us for a personalized quote.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment.",
  },
  {
    question: "Can I change plans later?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
];

export default function Pricing() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        description="Choose the plan that's right for your business. No hidden fees, no surprises."
      />

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-background-secondary">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Compare Plans"
            title="Feature Comparison"
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-foreground">Starter</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-primary">Professional</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 px-6 text-sm text-muted-foreground">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <CheckCircle className="inline-block h-5 w-5 text-primary" />
                        ) : (
                          <X className="inline-block h-5 w-5 text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{feature.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-primary/5">
                      {typeof feature.professional === "boolean" ? (
                        feature.professional ? (
                          <CheckCircle className="inline-block h-5 w-5 text-primary" />
                        ) : (
                          <X className="inline-block h-5 w-5 text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm text-foreground">{feature.professional}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <CheckCircle className="inline-block h-5 w-5 text-primary" />
                        ) : (
                          <X className="inline-block h-5 w-5 text-muted-foreground/30" />
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-lg border-white/10 px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CTABanner
        title="Still Have Questions?"
        description="Our team is here to help you find the perfect plan."
        primaryAction={{ label: "Contact Sales", href: "/contact" }}
        secondaryAction={{ label: "Schedule a Demo", href: "/contact" }}
      />
    </Layout>
  );
}
