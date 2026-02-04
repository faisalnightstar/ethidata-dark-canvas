import { Layout } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, Clock, Users } from "lucide-react";

export default function ApplicationSuccess() {
  return (
    <Layout>
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 p-6">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Application Submitted!
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Thank you for your interest in joining EthiData. We've received your application and our team is reviewing it.
            </p>

            <GlassCard className="mt-12 text-left">
              <h2 className="text-lg font-semibold text-foreground mb-6">What Happens Next?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/20 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a confirmation email with your application details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/20 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Review Period</h3>
                    <p className="text-sm text-muted-foreground">
                      Our recruiting team will review your application within 5-7 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-primary/20 p-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Next Steps</h3>
                    <p className="text-sm text-muted-foreground">
                      If your profile matches our needs, we'll reach out to schedule an initial call.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <GlowButton href="/jobs" icon>
                View More Positions
              </GlowButton>
              <GlowButton href="/careers" variant="outline">
                Learn About Our Culture
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
