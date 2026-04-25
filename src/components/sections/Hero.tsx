"use client"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

// ─── Typewriter role title ────────────────────────────────────────────────────
function TypingTitle({ roles }: { roles: readonly string[] }) {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setDisplayed("")
    setCharIdx(0)
    setDeleting(false)
  }, [roles])

  useEffect(() => {
    const role = roles[roleIdx % roles.length]
    if (!deleting && charIdx < role.length) {
      const t = setTimeout(() => { setDisplayed(role.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, 60)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === role.length) {
      const t = setTimeout(() => setDeleting(true), 2800)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setDisplayed(role.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }, 30)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    }
  }, [charIdx, deleting, roleIdx, roles])

  return (
    <span className="text-gradient-blue">
      {displayed}
      <span className="animate-blink text-blue font-light">|</span>
    </span>
  )
}

// ─── Code panel ───────────────────────────────────────────────────────────────
type Seg = { t: string; c: string }

const CODE_SEGS: Seg[] = [
  { t: "'use client'\n", c: "text-amber-300" },
  { t: "\n", c: "" },
  { t: "import", c: "text-violet-400" },
  { t: " { motion, AnimatePresence } ", c: "text-slate-300" },
  { t: "from", c: "text-violet-400" },
  { t: " 'framer-motion'\n", c: "text-amber-300" },
  { t: "import", c: "text-violet-400" },
  { t: " { useQuery } ", c: "text-slate-300" },
  { t: "from", c: "text-violet-400" },
  { t: " '@tanstack/react-query'\n", c: "text-amber-300" },
  { t: "\n", c: "" },
  { t: "type", c: "text-violet-400" },
  { t: " Project", c: "text-sky-300" },
  { t: " = {\n", c: "text-slate-400" },
  { t: "  id", c: "text-sky-200" },
  { t: ": ", c: "text-slate-400" },
  { t: "string\n", c: "text-violet-400" },
  { t: "  title", c: "text-sky-200" },
  { t: ": ", c: "text-slate-400" },
  { t: "string\n", c: "text-violet-400" },
  { t: "  lighthouse", c: "text-sky-200" },
  { t: ": ", c: "text-slate-400" },
  { t: "number\n", c: "text-violet-400" },
  { t: "  stack", c: "text-sky-200" },
  { t: ": ", c: "text-slate-400" },
  { t: "string", c: "text-violet-400" },
  { t: "[]\n", c: "text-slate-400" },
  { t: "}\n", c: "text-slate-400" },
  { t: "\n", c: "" },
  { t: "const", c: "text-violet-400" },
  { t: " variants ", c: "text-slate-300" },
  { t: "= {\n", c: "text-slate-400" },
  { t: "  hidden", c: "text-sky-300" },
  { t: ": { ", c: "text-slate-400" },
  { t: "opacity", c: "text-amber-200" },
  { t: ": 0, ", c: "text-slate-300" },
  { t: "y", c: "text-amber-200" },
  { t: ": 24 },\n", c: "text-slate-300" },
  { t: "  visible", c: "text-sky-300" },
  { t: ": {\n", c: "text-slate-400" },
  { t: "    opacity", c: "text-amber-200" },
  { t: ": 1, ", c: "text-slate-300" },
  { t: "y", c: "text-amber-200" },
  { t: ": 0,\n", c: "text-slate-300" },
  { t: "    transition", c: "text-amber-200" },
  { t: ": { ", c: "text-slate-400" },
  { t: "staggerChildren", c: "text-sky-300" },
  { t: ": 0.1 },\n", c: "text-slate-300" },
  { t: "  },\n", c: "text-slate-400" },
  { t: "}\n", c: "text-slate-400" },
  { t: "\n", c: "" },
  { t: "export default function", c: "text-violet-400" },
  { t: " Portfolio", c: "text-sky-300" },
  { t: "() {\n", c: "text-slate-300" },
  { t: "  const", c: "text-violet-400" },
  { t: " { data } = ", c: "text-slate-300" },
  { t: "useQuery", c: "text-teal-300" },
  { t: "<", c: "text-slate-400" },
  { t: "Project", c: "text-sky-300" },
  { t: "[]>", c: "text-slate-400" },
  { t: "({\n", c: "text-slate-300" },
  { t: "    queryKey", c: "text-amber-200" },
  { t: ": [", c: "text-slate-400" },
  { t: "'projects'", c: "text-amber-300" },
  { t: "],\n", c: "text-slate-400" },
  { t: "    queryFn", c: "text-amber-200" },
  { t: ": fetchProjects,\n", c: "text-slate-300" },
  { t: "    staleTime", c: "text-amber-200" },
  { t: ": ", c: "text-slate-400" },
  { t: "60_000", c: "text-orange-300" },
  { t: ",\n", c: "text-slate-400" },
  { t: "  })\n", c: "text-slate-300" },
  { t: "\n", c: "" },
  { t: "  return", c: "text-violet-400" },
  { t: " (\n", c: "text-slate-300" },
  { t: "    <", c: "text-slate-500" },
  { t: "AnimatePresence", c: "text-teal-300" },
  { t: " mode", c: "text-amber-200" },
  { t: "=", c: "text-slate-500" },
  { t: '"wait"', c: "text-amber-300" },
  { t: ">\n", c: "text-slate-500" },
  { t: "      <", c: "text-slate-500" },
  { t: "motion.section\n", c: "text-teal-300" },
  { t: "        variants", c: "text-amber-200" },
  { t: "={variants}\n", c: "text-slate-300" },
  { t: "        initial", c: "text-amber-200" },
  { t: "=", c: "text-slate-500" },
  { t: '"hidden"', c: "text-amber-300" },
  { t: "\n", c: "" },
  { t: "        animate", c: "text-amber-200" },
  { t: "=", c: "text-slate-500" },
  { t: '"visible"', c: "text-amber-300" },
  { t: "\n", c: "" },
  { t: "        className", c: "text-amber-200" },
  { t: "=", c: "text-slate-500" },
  { t: '"grid gap-6 lg:grid-cols-2"', c: "text-emerald-300" },
  { t: "\n", c: "" },
  { t: "      >\n", c: "text-slate-500" },
  { t: "        {data?.", c: "text-slate-300" },
  { t: "map", c: "text-teal-300" },
  { t: "((p) => (\n", c: "text-slate-300" },
  { t: "          <", c: "text-slate-500" },
  { t: "ProjectCard", c: "text-teal-300" },
  { t: "\n            key", c: "text-amber-200" },
  { t: "={p.id}\n", c: "text-slate-300" },
  { t: "            {...p}", c: "text-slate-300" },
  { t: "\n          />\n", c: "text-slate-500" },
  { t: "        ))}\n", c: "text-slate-300" },
  { t: "      </", c: "text-slate-500" },
  { t: "motion.section", c: "text-teal-300" },
  { t: ">\n", c: "text-slate-500" },
  { t: "    </", c: "text-slate-500" },
  { t: "AnimatePresence", c: "text-teal-300" },
  { t: ">\n", c: "text-slate-500" },
  { t: "  )\n", c: "text-slate-300" },
  { t: "}", c: "text-slate-300" },
]

const CHARS = CODE_SEGS.flatMap(({ t, c }) => t.split("").map(ch => ({ ch, c })))
const TOTAL = CHARS.length
const LINE_H = 24

function CodePanel() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    setCount(0)
  }, [inView])

  useEffect(() => {
    if (!inView) return
    if (count >= TOTAL) {
      const t = setTimeout(() => setCount(0), 3500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount(c => c + 1), 14)
    return () => clearTimeout(t)
  }, [count, inView])

  // Build lines from revealed chars
  const lines: Array<Array<{ ch: string; c: string }>> = [[]]
  for (let i = 0; i < count; i++) {
    const { ch, c } = CHARS[i]
    if (ch === "\n") { lines.push([]) } else { lines[lines.length - 1].push({ ch, c }) }
  }

  // Auto-scroll to follow cursor
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const visibleLines = Math.floor(el.clientHeight / LINE_H)
    const currentLine = lines.length - 1
    if (currentLine >= visibleLines - 1) {
      el.scrollTop = (currentLine - visibleLines + 2) * LINE_H
    }
  }, [lines.length])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Editor chrome */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#161b22]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center gap-1">
            {["portfolio.tsx", "hero.tsx", "types.ts"].map((name, i) => (
              <div
                key={name}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors ${
                  i === 1
                    ? "bg-[#0d1117] border border-white/[0.08] text-slate-300"
                    : "text-slate-600 hover:text-slate-500"
                }`}
              >
                {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-blue/70" />}
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Code area — fixed height, hides scrollbar */}
        <div
          ref={scrollRef}
          className="overflow-y-scroll p-4 sm:p-5 font-mono text-[11px] sm:text-[12.5px] leading-6 h-[260px] sm:h-[340px] lg:h-[460px]"
          style={{ scrollbarWidth: "none" }}
        >
          {lines.map((line, li) => (
            <div key={li} className="flex min-h-[24px]">
              <span className="select-none text-[#3d4450] text-right mr-5 w-5 flex-shrink-0 text-[11px] leading-6">
                {li + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((seg, si) => (
                  <span key={si} className={seg.c || "text-slate-300"}>{seg.ch}</span>
                ))}
                {li === lines.length - 1 && count < TOTAL && (
                  <span className="inline-block w-[2px] h-[14px] bg-blue align-middle animate-blink ml-px" />
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/[0.06] bg-blue/80">
          <div className="flex items-center gap-3 text-[10px] font-mono text-white/70">
            <span>TypeScript</span>
            <span className="opacity-40">|</span>
            <span>Next.js 15</span>
            <span className="opacity-40">|</span>
            <span>Ln {lines.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>paulo-reducino.dev</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue/6 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald/4 rounded-full blur-[100px] pointer-events-none animate-glow-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text content */}
          <div>
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-emerald/20 mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              <span className="text-xs font-mono text-emerald tracking-wide">{t.hero.badge}</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-bricolage font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight mb-5"
            >
              <span className="text-slate-100">Paulo Reducino</span>
              <br />
              <TypingTitle roles={t.hero.roles} />
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-9 max-w-lg"
            >
              {t.hero.description.pre}
              <span className="text-slate-200 font-medium">{t.hero.description.bold}</span>
              {t.hero.description.post}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 transition-all duration-300 shadow-2xl shadow-blue/30 hover:shadow-blue/50 hover:-translate-y-1"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.535 4.049 1.472 5.758L0 24l6.472-1.472C8.14 23.485 10.029 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.888 0-3.643-.511-5.148-1.402l-.368-.216-3.845.875.89-3.741-.237-.388C2.513 15.567 2 13.852 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {t.hero.cta1}
              </a>
              <Link
                href="/#projetos"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border text-slate-300 hover:text-slate-100 hover:border-blue/40 font-medium text-sm transition-all duration-300 hover:-translate-y-1"
              >
                {t.hero.cta2}
              </Link>
            </motion.div>

          </div>

          {/* Right: live code panel */}
          <CodePanel />

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
