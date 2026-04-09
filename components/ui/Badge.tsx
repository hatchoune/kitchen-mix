import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "sage" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const VARIANTS = {
  default: "bg-card text-foreground border border-border",
  accent: "bg-accent/15 text-accent border border-accent/20",
  sage: "bg-[#7A9E7E]/15 text-[#7A9E7E] border border-[#7A9E7E]/20",
  outline: "bg-transparent text-muted-foreground border border-border",
};

const SIZES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {children}
    </span>
  );
}
