"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

type StatItem = {
  value: number
  suffix: string
  label: string
  context: string
  color: "blue" | "emerald" | "amber" | "violet"
}

const stats: StatItem[] = [
  { value: 5,   suffix: "+", label: "Anos de experiência",  context: "Full-stack em produção",              color: "blue"    },
  { value: 40,  suffix: "+", label: "Projetos entregues",   context: "Brasil, Portugal e UK",               color: "emerald" },
  { value: 25,  suffix: "%+",label: "CTR médio gerado",     context: "Em landing pages de campanha",        color: "amber"   },
  { value: 100, suffix: "",  label: "Lighthouse Score",     context: "Performance, SEO e Acessibilidade",   color: "blue"    },
  { value: 35,  suffix: "%", label: "Redução de load time", context: "Via cache, ISR e lazy loading",       color: "emerald" },
  { value: 3,   suffix: "",  label: "Países atendidos",     context: "Remoto-first desde 2020",             color: "violet"  },
]

const colorMap = {
  blue:    { glow: "from-blue/10",    border: "border-blue/15",    number: "from-blue to-sky-300",      dot: "bg-blue"    },
  emerald: { glow: "from-emerald/10", border: "border-emerald/15", number: "from-emerald to-teal-300",  dot: "bg-emerald" },
  amber:   { glow: "from-amber/10",   border: "border-amber/15",   number: "from-amber to-yellow-300",  dot: "bg-amber"   },
  violet:  { glow: "from-violet/10",  border: "border-violet/15",  number: "from-violet-400 to-blue",   dot: "bg-violet-400" },
}

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    setCount(0)
    const duration = 1400
    const steps = 50
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const c = colorMap[stat.color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl border ${c.border} bg-surface p-6 overflow-hidden group card-hover`}
    >
      {/* Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Dot accent */}
        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mb-4 opacity-70`} />

        {/* Number */}
        <div className={`font-bricolage font-extrabold text-4xl sm:text-5xl bg-gradient-to-br ${c.number} bg-clip-text text-transparent leading-none mb-2`}>
          <Counter target={stat.value} suffix={stat.suffix} active={inView} />
        </div>

        {/* Label */}
        <div className="font-bricolage font-semibold text-slate-200 text-sm mb-1">
          {stat.label}
        </div>

        {/* Context */}
        <div className="font-mono text-[11px] text-slate-500 tracking-wide">
          {stat.context}
        </div>
      </div>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-16 relative">
      {/* Separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-border/0 via-border to-border/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
