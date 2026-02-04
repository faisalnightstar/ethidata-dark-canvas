import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
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
  type = "button",
  disabled,
  ...props
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
    disabled && "opacity-50 cursor-not-allowed",
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
    <button 
      type={type} 
      onClick={onClick} 
      className={classes} 
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
