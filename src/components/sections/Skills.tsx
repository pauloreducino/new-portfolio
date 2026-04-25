"use client"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useLanguage } from "@/context/LanguageContext"

const colorMap: Record<string, { badge: string; glow: string; border: string }> = {
  blue:    { badge: "bg-blue/10 text-blue border-blue/20",           glow: "from-blue/5",    border: "border-blue/20" },
  emerald: { badge: "bg-emerald/10 text-emerald border-emerald/20",  glow: "from-emerald/5", border: "border-emerald/20" },
  amber:   { badge: "bg-amber/10 text-amber border-amber/20",        glow: "from-amber/5",   border: "border-amber/20" },
}

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="habilidades" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>{t.skills.label}</SectionLabel>
          <h2 className="font-bricolage font-extrabold text-4xl lg:text-5xl text-slate-100 mb-4">
            {t.skills.heading}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t.skills.subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.skills.categories.map(({ label, color, skills }, i) => {
            const c = colorMap[color]
            return (
              <AnimatedSection key={label} delay={i * 0.08}>
                <div className={`relative h-full rounded-2xl border ${c.border} bg-surface p-6 card-hover group overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.glow} to-transparent opacity-60`} />
                  <div className="relative z-10">
                    <h3 className="font-bricolage font-bold text-slate-100 text-base mb-5">{label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${c.badge}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
