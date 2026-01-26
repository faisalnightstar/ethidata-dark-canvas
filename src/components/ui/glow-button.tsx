import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}

export function GlowButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className,
  icon = false,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const variantClasses = {
    solid: "btn-glow text-primary-foreground",
    outline:
      "border border-primary/50 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary hover:shadow-glow-sm transition-all",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
