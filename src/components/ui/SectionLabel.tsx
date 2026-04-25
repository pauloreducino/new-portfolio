
interface SectionLabelProps { children: React.ReactNode }
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue/8 border border-blue/15 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
      <span className="text-xs font-mono text-blue tracking-wider uppercase">{children}</span>
    </div>
  )
}
