"use client";

import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/constants";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  whatsappMessage?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const variants = {
  primary:
    "bg-primary text-dark hover:bg-primary-dark shadow-md hover:shadow-lg",
  secondary:
    "bg-secondary text-dark hover:bg-secondary-dark shadow-md hover:shadow-lg",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-dark",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-md hover:shadow-lg",
  ghost: "text-primary hover:bg-primary/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  whatsappMessage,
  href,
  onClick,
  className,
  icon,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  const finalHref = whatsappMessage
    ? getWhatsAppLink(whatsappMessage)
    : href;

  if (finalHref) {
    return (
      <a
        href={finalHref}
        target={whatsappMessage ? "_blank" : undefined}
        rel={whatsappMessage ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
