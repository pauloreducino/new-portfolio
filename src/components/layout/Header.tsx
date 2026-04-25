"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { locale, t, toggle } = useLanguage()

  const links = [
    { href: "/#sobre", label: t.nav.about },
    { href: "/#habilidades", label: t.nav.skills },
    { href: "/#experiencia", label: t.nav.experience },
    { href: "/#projetos", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/faq", label: t.nav.faq },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "glass border-b border-border/50 shadow-2xl shadow-black/30" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-emerald flex items-center justify-center shadow-lg shadow-blue/30 group-hover:shadow-blue/50 transition-shadow duration-300">
            <span className="font-mono text-white text-[11px] font-bold tracking-tighter">&lt;PR/&gt;</span>
          </div>
          <span className="font-bricolage font-bold text-slate-100 text-[17px] group-hover:text-blue transition-colors duration-200 hidden sm:block">
            Paulo Reducino
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-all duration-200 relative group",
                isActive(href) ? "text-slate-100" : "text-slate-400 hover:text-slate-100"
              )}
            >
              {label}
              <span className={cn(
                "absolute -bottom-0.5 left-0 h-[1.5px] bg-blue transition-all duration-300",
                isActive(href) ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Alternar idioma"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-slate-400 hover:text-slate-100 hover:border-blue/40 text-xs font-mono font-medium transition-all duration-200"
          >
            <span className={cn("transition-colors duration-200", locale === "pt" ? "text-blue" : "text-slate-500")}>PT</span>
            <span className="text-slate-600">|</span>
            <span className={cn("transition-colors duration-200", locale === "en" ? "text-blue" : "text-slate-500")}>EN</span>
          </button>

          <a
            href="https://www.linkedin.com/in/paulo-reducino"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-blue hover:bg-blue/10 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a
            href="https://github.com/paulo-reducino"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-surface-2 transition-all duration-200"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue/90 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 hover:-translate-y-0.5"
          >
            {t.nav.hire}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            aria-label="Alternar idioma"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border text-xs font-mono font-medium transition-colors"
          >
            <span className={cn(locale === "pt" ? "text-blue" : "text-slate-500")}>PT</span>
            <span className="text-slate-600">|</span>
            <span className={cn(locale === "en" ? "text-blue" : "text-slate-500")}>EN</span>
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={cn("h-px bg-current transition-all duration-300 origin-center", open ? "rotate-45 translate-y-[4px] w-5" : "w-5")} />
              <span className={cn("h-px bg-current transition-all duration-300", open ? "opacity-0 scale-x-0" : "w-3.5 ml-auto")} />
              <span className={cn("h-px bg-current transition-all duration-300 origin-center", open ? "-rotate-45 -translate-y-[4px] w-5" : "w-5")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass border-t border-border/50 px-4 py-6"
          >
            <nav className="flex flex-col gap-5 mb-6">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-blue transition-colors text-base font-medium"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <a href="https://www.linkedin.com/in/paulo-reducino" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-blue transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://wa.me/5598970265510" target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-blue text-white text-sm font-semibold">
                {t.nav.hire}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
