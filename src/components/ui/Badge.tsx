
import { cn } from "@/lib/utils"
interface BadgeProps { children: React.ReactNode; variant?: "blue"|"emerald"|"amber"|"outline"; className?: string }
export function Badge({ children, variant = "blue", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wide",
      variant === "blue"    && "bg-blue/10 text-blue border border-blue/20",
      variant === "emerald" && "bg-emerald/10 text-emerald border border-emerald/20",
      variant === "amber"   && "bg-amber/10 text-amber border border-amber/20",
      variant === "outline" && "border border-border text-slate-400",
      className
    )}>{children}</span>
  )
}
