"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { formatDate } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

type Post = {
  slug: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  date: string
  readingTime: string
  tags: string[]
  category: string
  featured?: boolean
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function PostCard({ post, index, locale }: { post: Post; index: number; locale: string }) {
  const title = locale === "en" ? (post.titleEn ?? post.title) : post.title
  const description = locale === "en" ? (post.descriptionEn ?? post.description) : post.description
  const readLabel = locale === "en" ? "Read" : "Ler"

  return (
    <AnimatedSection delay={index * 0.06}>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="h-full flex flex-col rounded-2xl border border-border bg-surface p-6 overflow-hidden relative transition-all duration-300 hover:border-blue/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue/5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full">
            {/* Top meta */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue/10 text-blue border border-blue/15">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-600">{post.readingTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-bricolage font-bold text-base text-slate-100 group-hover:text-blue transition-colors duration-200 mb-2 leading-snug">
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
              {description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <time className="text-xs font-mono text-slate-600">{formatDate(post.date)}</time>
              <span className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-blue transition-colors duration-200">
                {readLabel} <ArrowIcon />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </AnimatedSection>
  )
}

function FeaturedCard({ post, locale }: { post: Post; locale: string }) {
  const title = locale === "en" ? (post.titleEn ?? post.title) : post.title
  const description = locale === "en" ? (post.descriptionEn ?? post.description) : post.description
  const featuredLabel = locale === "en" ? "Featured" : "Destaque"
  const readLabel = locale === "en" ? "Read article" : "Ler artigo"

  return (
    <AnimatedSection className="mb-10">
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative rounded-3xl border border-blue/20 bg-surface overflow-hidden transition-all duration-300 hover:border-blue/40 hover:shadow-2xl hover:shadow-blue/10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue/6 via-transparent to-emerald/3" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_280px] gap-0">
            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-blue/15 text-blue border border-blue/25">
                  <span className="text-blue">✦</span> {featuredLabel}
                </span>
                {post.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-100 group-hover:text-blue transition-colors duration-200 leading-tight mb-4">
                {title}
              </h2>

              <p className="text-slate-400 leading-relaxed mb-8 max-w-xl text-base">
                {description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm font-mono text-slate-500">
                  <time>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <span className="flex items-center gap-2 text-sm font-medium text-blue group-hover:gap-3 transition-all duration-200">
                  {readLabel} <ArrowIcon />
                </span>
              </div>
            </div>

            {/* Visual panel — desktop only */}
            <div className="hidden lg:flex flex-col items-center justify-center p-8 border-l border-blue/10 bg-gradient-to-b from-blue/5 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10 flex flex-col gap-3 w-full">
                {post.tags.map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={[
                      "px-4 py-2.5 rounded-xl border text-xs font-mono font-medium text-center",
                      i % 3 === 0 ? "bg-blue/10 border-blue/20 text-blue" :
                      i % 3 === 1 ? "bg-emerald/10 border-emerald/20 text-emerald" :
                      "bg-violet-500/10 border-violet-500/20 text-violet-400",
                    ].join(" ")}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </AnimatedSection>
  )
}

export function BlogContent({ posts }: { posts: Post[] }) {
  const { t, locale } = useLanguage()
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState("Todos")

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach(p => p.tags.forEach(tag => set.add(tag)))
    return ["Todos", ...Array.from(set)]
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const q = search.toLowerCase()
      const displayTitle = locale === "en" ? (p.titleEn ?? p.title) : p.title
      const displayDesc = locale === "en" ? (p.descriptionEn ?? p.description) : p.description
      const matchSearch = !q ||
        displayTitle.toLowerCase().includes(q) ||
        displayDesc.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      const matchTag = activeTag === "Todos" || activeTag === "All" || p.tags.includes(activeTag)
      return matchSearch && matchTag
    })
  }, [posts, search, activeTag, locale])

  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const grid = filtered.filter(p => p.slug !== featured?.slug)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue/20 bg-blue/5 text-xs font-mono text-blue mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              {t.blog.label}
            </div>
            <h1 className="font-bricolage font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-100 leading-tight mb-4">
              {t.blog.heading}
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mb-10">{t.blog.subtitle}</p>

            {/* Search */}
            <div className="relative max-w-lg mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar artigos..."
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface border border-border text-slate-200 placeholder:text-slate-600 text-sm font-dm focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/20 transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Limpar busca"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={[
                    "text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200",
                    activeTag === tag
                      ? "bg-blue text-white border-blue shadow-lg shadow-blue/25"
                      : "border-border text-slate-400 hover:border-blue/40 hover:text-slate-200",
                  ].join(" ")}
                >
                  {tag}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filtered.length === 0 ? (
          <AnimatedSection>
            <div className="py-24 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bricolage font-bold text-xl text-slate-300 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-slate-500 text-sm mb-6">Tente outros termos ou limpe os filtros.</p>
              <button
                onClick={() => { setSearch(""); setActiveTag("Todos") }}
                className="px-4 py-2 rounded-xl border border-border text-slate-400 hover:border-blue/40 hover:text-slate-200 text-sm transition-all duration-200"
              >
                Limpar filtros
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <>
            {/* Results count */}
            {(search || activeTag !== "Todos") && (
              <p className="text-xs font-mono text-slate-600 mb-6">
                {filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}
              </p>
            )}

            {/* Featured */}
            {featured && <FeaturedCard post={featured} locale={locale} />}

            {/* Grid */}
            {grid.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {grid.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} locale={locale} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 mt-16">
        <AnimatedSection>
          <div className="relative rounded-3xl border border-blue/20 bg-surface overflow-hidden p-10 lg:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/8 via-transparent to-emerald/5" />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 text-xs font-mono text-emerald mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                Disponível para projetos
              </div>
              <h3 className="font-bricolage font-extrabold text-3xl lg:text-4xl text-slate-100 mb-4">
                Tem um projeto em mente?
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Aplico na prática tudo que escrevo aqui. Vamos construir algo{" "}
                <span className="text-slate-200 font-medium">rápido, acessível e que converte.</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Li%20seu%20blog%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 transition-all duration-300 shadow-xl shadow-blue/25 hover:-translate-y-0.5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.535 4.049 1.472 5.758L0 24l6.472-1.472C8.14 23.485 10.029 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.888 0-3.643-.511-5.148-1.402l-.368-.216-3.845.875.89-3.741-.237-.388C2.513 15.567 2 13.852 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Falar pelo WhatsApp
                </a>
                <Link
                  href="/#projetos"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border text-slate-300 hover:text-slate-100 hover:border-blue/40 font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Ver projetos
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
