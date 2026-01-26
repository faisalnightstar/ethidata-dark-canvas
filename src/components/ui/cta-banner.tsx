import { cn } from "@/lib/utils";
import { GlowButton } from "./glow-button";

interface CTABannerProps {
  title: string;
  description?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CTABannerProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 md:p-12 lg:p-16">
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
          
          <div className="relative text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {description}
              </p>
            )}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <GlowButton href={primaryAction.href} size="lg" icon>
                {primaryAction.label}
              </GlowButton>
              {secondaryAction && (
                <GlowButton href={secondaryAction.href} variant="outline" size="lg">
                  {secondaryAction.label}
                </GlowButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
