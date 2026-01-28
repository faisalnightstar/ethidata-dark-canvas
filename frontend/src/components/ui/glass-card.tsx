import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6",
        hover && "card-hover",
        glow && "glow-border",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <GlassCard className={cn("group", className)}>
      <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-3">
        <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </GlassCard>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl font-bold gradient-text md:text-5xl">{value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  className?: string;
}

export function TeamCard({ name, role, image, className }: TeamCardProps) {
  return (
    <GlassCard className={cn("group text-center", className)}>
      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20 transition-all group-hover:border-primary/50 group-hover:shadow-glow-sm">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </GlassCard>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, company, className }: TestimonialCardProps) {
  return (
    <GlassCard className={className}>
      <div className="mb-4 text-3xl text-primary">"</div>
      <p className="mb-6 text-muted-foreground">{quote}</p>
      <div className="border-t border-white/10 pt-4">
        <div className="font-semibold text-foreground">{author}</div>
        <div className="text-sm text-muted-foreground">
          {role} at {company}
        </div>
      </div>
    </GlassCard>
  );
}

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  image?: string;
  className?: string;
}

export function CaseStudyCard({ title, client, industry, image, className }: CaseStudyCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-red-800/10", className)}>
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/80 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
          {industry}
        </span>
        <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{client}</p>
      </div>
      <div className="absolute inset-0 border border-white/10 rounded-xl transition-all group-hover:border-primary/50 group-hover:shadow-glow-sm" />
    </div>
  );
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  className?: string;
}

export function BlogCard({ title, excerpt, category, date, image, className }: BlogCardProps) {
  return (
    <GlassCard className={cn("overflow-hidden p-0", className)}>
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
      </div>
    </GlassCard>
  );
}

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  className?: string;
}

export function JobCard({ title, department, location, type, className }: JobCardProps) {
  return (
    <GlassCard className={cn("flex items-center justify-between", className)}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{department}</span>
          <span>•</span>
          <span>{location}</span>
          <span>•</span>
          <span>{type}</span>
        </div>
      </div>
      <div className="btn-glow rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
        Apply
      </div>
    </GlassCard>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  className?: string;
}

export function PricingCard({ name, price, description, features, featured, className }: PricingCardProps) {
  return (
    <GlassCard
      className={cn(
        "relative flex flex-col",
        featured && "border-primary/50 shadow-glow-sm",
        className
      )}
      glow={featured}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold gradient-text">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="mb-6 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full rounded-lg py-3 text-sm font-semibold transition-all",
          featured
            ? "btn-glow text-primary-foreground"
            : "border border-white/10 text-foreground hover:border-primary/50 hover:bg-primary/10"
        )}
      >
        Get Started
      </button>
    </GlassCard>
  );
}
