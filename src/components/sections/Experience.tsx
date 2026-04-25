"use client"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Badge } from "@/components/ui/Badge"
import { useLanguage } from "@/context/LanguageContext"
import { experiences } from "@/data/experience"

export function Experience() {
  const { locale, t } = useLanguage()

  return (
    <section id="experiencia" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <SectionLabel>{t.experience.label}</SectionLabel>
          <h2 className="font-bricolage font-extrabold text-4xl lg:text-5xl text-slate-100 leading-tight">
            {t.experience.headline}
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue/40 via-border to-transparent hidden lg:block ml-6" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <AnimatedSection key={`${exp.company}-${exp.period}`} delay={i * 0.1}>
                <div className="lg:pl-16 relative">
                  <div className={`absolute left-4 top-7 w-5 h-5 rounded-full border-2 hidden lg:flex items-center justify-center -translate-x-1/2 ${exp.highlight ? "border-blue bg-blue/20 shadow-lg shadow-blue/30" : "border-border bg-surface"}`}>
                    <div className={`w-2 h-2 rounded-full ${exp.highlight ? "bg-blue" : "bg-slate-600"}`} />
                  </div>

                  <div className={`rounded-2xl border bg-surface p-7 card-hover group relative overflow-hidden ${exp.highlight ? "border-blue/30" : "border-border"}`}>
                    {exp.highlight && <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent" />}
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bricolage font-bold text-xl text-slate-100">
                              {exp.role[locale]}
                            </h3>
                            {exp.current && (
                              <Badge variant="blue">{t.experience.current}</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                            <span className="text-blue font-medium">{exp.company}</span>
                            <span>·</span>
                            <span>{exp.location[locale]}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-mono text-xs text-slate-500 bg-surface-2 px-3 py-1 rounded-full border border-border">
                            {exp.period}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{exp.type[locale]}</div>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-5">
                        {exp.description[locale]}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                        {exp.results[locale].map((r) => (
                          <div key={r} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="text-emerald mt-0.5 flex-shrink-0 text-xs">▸</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((s) => (
                          <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-slate-400">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
