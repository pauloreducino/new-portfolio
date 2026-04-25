"use client"
import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useLanguage } from "@/context/LanguageContext"

function ProfilePhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div ref={ref} className="flex justify-center lg:justify-end">
      <div className="relative">
        {/* Glow blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-blue/25 via-transparent to-emerald/15 blur-3xl"
        />

        {/* Gradient border frame */}
        <motion.div
          initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
          animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-[2px] rounded-[28px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.65) 0%, rgba(16,185,129,0.35) 50%, rgba(59,130,246,0.15) 100%)",
          }}
        >
          <div className="relative overflow-hidden rounded-[26px] w-72 h-80 lg:w-80 lg:h-96">
            {/* White flash overlay that fades away */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={inView ? { opacity: [1, 0.6, 1, 0.3, 0.7, 0] } : {}}
              transition={{ duration: 1.6, delay: 0.2, times: [0, 0.1, 0.25, 0.45, 0.65, 1], ease: "easeOut" }}
              className="absolute inset-0 z-10 bg-white rounded-[26px]"
            />

            {/* Photo — glitch flicker then stabilizes */}
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, filter: "blur(10px) brightness(2.5) saturate(0)" }}
              animate={
                inView
                  ? {
                      opacity: [0, 0.9, 0.2, 1, 0.5, 1, 0.88, 1],
                      filter: [
                        "blur(10px) brightness(2.5) saturate(0)",
                        "blur(3px) brightness(2) saturate(0.3)",
                        "blur(8px) brightness(2.5) saturate(0)",
                        "blur(1px) brightness(1.6) saturate(0.6)",
                        "blur(4px) brightness(2) saturate(0.2)",
                        "blur(0px) brightness(1.3) saturate(0.9)",
                        "blur(1px) brightness(1.1) saturate(1)",
                        "blur(0px) brightness(1) saturate(1)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.8,
                delay: 0.25,
                times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
                ease: "easeOut",
              }}
            >
              <Image
                src="/images/paulo-profile-v2.webp"
                alt="Paulo Reducino"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1221]/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <AnimatedSection>
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2 className="font-bricolage font-extrabold text-4xl lg:text-5xl text-slate-100 leading-tight mb-6">
              {t.about.title1}
              <span className="text-gradient-blue">{t.about.title2}</span>
            </h2>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                {t.about.p1.pre}
                <span className="text-slate-200 font-medium">{t.about.p1.bold1}</span>
                {t.about.p1.mid}
                <span className="text-slate-200 font-medium">{t.about.p1.bold2}</span>
                {t.about.p1.post}
              </p>
              <p>
                {t.about.p2.pre}
                <span className="text-blue font-medium">{t.about.p2.bold}</span>
                {t.about.p2.post}
              </p>
              <p>{t.about.p3}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="/paulo-reducino-cv.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-slate-300 hover:text-slate-100 hover:border-blue/40 text-sm font-medium transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t.about.cvBtn}
              </a>
              <a
                href="https://www.linkedin.com/in/paulo-reducino"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue/10 border border-blue/20 text-blue hover:bg-blue/20 text-sm font-medium transition-all duration-200"
              >
                {t.about.linkedinBtn}
              </a>
            </div>
          </AnimatedSection>

          {/* Photo */}
          <ProfilePhoto />
        </div>
      </div>
    </section>
  )
}
