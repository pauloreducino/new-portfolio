"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { useLanguage } from "@/context/LanguageContext"

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <AnimatedSection delay={index * 0.05}>
      <div className={`rounded-xl border bg-surface overflow-hidden card-hover ${open ? "border-blue/30" : "border-border"}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-6 text-left group"
        >
          <span className="font-bricolage font-semibold text-slate-100 text-base group-hover:text-blue transition-colors">{q}</span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-lg leading-none transition-colors ${open ? "border-blue text-blue" : "border-border text-slate-500"}`}
          >
            +
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-border/50 pt-4">{a}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  )
}

export default function FAQPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionLabel>{t.faq.label}</SectionLabel>
          <h1 className="font-bricolage font-extrabold text-5xl text-slate-100 mb-4">{t.faq.heading}</h1>
          <p className="text-slate-400 text-lg">{t.faq.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-3">
        {t.faq.items.map((item, i) => (
          <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
        ))}
        <AnimatedSection delay={0.5} className="mt-12">
          <div className="rounded-2xl border border-blue/20 bg-surface p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent" />
            <div className="relative z-10">
              <h3 className="font-bricolage font-bold text-xl text-slate-100 mb-2">{t.faq.ctaTitle}</h3>
              <p className="text-slate-400 text-sm mb-5">{t.faq.ctaText}</p>
              <a
                href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Tenho%20algumas%20d%C3%BAvidas%20antes%20de%20contratar."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue/90 transition-all duration-200 shadow-lg shadow-blue/25"
              >
                {t.faq.ctaBtn}
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
