"use client"
import { useEffect, useState } from "react"

type Heading = { id: string; text: string; level: number }

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const article = document.querySelector("article")
    if (!article) return

    const els = Array.from(article.querySelectorAll("h2, h3"))
    const items: Heading[] = els
      .filter(el => el.id)
      .map(el => ({
        id: el.id,
        text: el.textContent?.replace(/#$/, "").trim() || "",
        level: el.tagName === "H2" ? 2 : 3,
      }))
    setHeadings(items)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-20% 0% -60% 0%" }
    )
    els.forEach(el => el.id && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24">
      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">
        Neste artigo
      </p>
      <nav className="space-y-0.5 border-l border-border">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={e => {
              e.preventDefault()
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            className={[
              "block text-xs leading-5 py-1 pl-3 border-l-2 -ml-px transition-all duration-200",
              h.level === 3 ? "pl-5" : "",
              activeId === h.id
                ? "border-blue text-blue font-medium"
                : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-500",
            ].join(" ")}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
