import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/posts"
import { postMeta } from "@/lib/metadata"
import { Badge } from "@/components/ui/Badge"
import { ReadingProgress } from "@/components/ui/ReadingProgress"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

async function getLocale() {
  const jar = await cookies()
  const v = jar.get("locale")?.value
  return v === "en" ? "en" : "pt"
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  try { return postMeta(getPostBySlug(slug, locale)) } catch { return { title: "Post não encontrado" } }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const isEn = locale === "en"
  let post
  try { post = getPostBySlug(slug, locale) } catch { notFound() }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevRaw = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextRaw = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const prev = prevRaw ? { ...prevRaw, title: isEn ? (prevRaw.titleEn ?? prevRaw.title) : prevRaw.title } : null
  const next = nextRaw ? { ...nextRaw, title: isEn ? (nextRaw.titleEn ?? nextRaw.title) : nextRaw.title } : null

  const ui = {
    share:        isEn ? "Share"           : "Compartilhar",
    toc:          isEn ? "In this article" : "Neste artigo",
    ctaHelp:      isEn ? "Need help?"      : "Precisa de ajuda?",
    ctaImpl:      isEn ? "I can implement this in your project." : "Posso implementar isso no seu projeto.",
    ctaBtn:       isEn ? "Talk on WhatsApp" : "Falar pelo WhatsApp",
    authorRole:   isEn ? "Full-Stack Developer" : "Desenvolvedor Full-Stack",
    authorBio:    isEn
      ? "Next.js 15, TypeScript and web performance specialist. I build interfaces that load fast, convert for real, and scale without headaches. 8+ years delivering projects in Brazil, Portugal, and the UK."
      : "Especialista em Next.js 15, TypeScript e performance web. Construo interfaces que carregam rápido, convertem de verdade e escalam sem dor de cabeça. Mais de 8 anos entregando projetos no Brasil, Portugal e UK.",
    prevLabel:    isEn ? "Previous article" : "Artigo anterior",
    nextLabel:    isEn ? "Next article"     : "Próximo artigo",
    ctaGotIt:     isEn ? "Liked the content?" : "Gostou do conteúdo?",
    ctaTitle:     isEn ? "I can bring these results to your project." : "Posso trazer esses resultados para o seu projeto.",
    ctaSubtitle:  isEn ? "From planning to deploy — Next.js, TypeScript and real performance. Let's talk." : "Do planejamento ao deploy — Next.js, TypeScript e performance real. Vamos conversar.",
    ctaStart:     isEn ? "Start conversation" : "Iniciar conversa",
    ctaMorePosts: isEn ? "More articles"      : "Ver mais artigos",
  }

  return (
    <>
      <ReadingProgress />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="pt-28 pb-14 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-600 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{post.category}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-blue/10 text-blue border border-blue/20">
              {post.category}
            </span>
            {post.tags.filter(t => t !== post.category).slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-bricolage font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 leading-tight mb-5">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl">
            {post.description}
          </p>

          {/* Author row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue/20 flex-shrink-0">
                <Image
                  src="/images/paulo-profile-v2.webp"
                  alt="Paulo Reducino"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">Paulo Reducino</p>
                <p className="text-xs font-mono text-slate-500">
                  <time>{formatDate(post.date)}</time>
                  <span className="mx-1.5">·</span>
                  <span>{post.readingTime}</span>
                </p>
              </div>
            </div>
            {/* Share */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://paulo-reducino.vercel.app/blog/${post.slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-300 border border-border hover:border-border/80 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.257 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              {ui.share}
            </a>
          </div>
        </div>
      </header>

      {/* ── Content + Sidebar ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 items-start">

          {/* Article */}
          <div>
            <article className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bricolage prose-headings:font-bold prose-headings:text-slate-100
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-400 prose-p:leading-relaxed
              prose-a:text-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-200 prose-strong:font-semibold
              prose-code:text-blue prose-code:bg-blue/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-blue prose-blockquote:text-slate-400 prose-blockquote:not-italic
              prose-ul:text-slate-400 prose-ol:text-slate-400
              prose-li:marker:text-blue
              prose-hr:border-border
              prose-img:rounded-2xl prose-img:border prose-img:border-border
            ">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode as never, { theme: "github-dark", keepBackground: false }],
                    ],
                  },
                }}
              />
            </article>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents />

            {/* Mini CTA */}
            <div className="mt-8 rounded-2xl border border-blue/15 bg-surface p-5">
              <p className="text-xs font-mono text-slate-500 mb-1">{ui.ctaHelp}</p>
              <p className="font-bricolage font-bold text-slate-100 text-sm mb-4">{ui.ctaImpl}</p>
              <a
                href="https://wa.me/5598970265510"
                target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-2.5 rounded-xl bg-blue text-white text-xs font-semibold hover:bg-blue/90 transition-all duration-200 shadow-lg shadow-blue/20"
              >
                {ui.ctaBtn}
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Post Footer ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Author card */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row gap-5 mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue/20 flex-shrink-0">
            <Image
              src="/images/paulo-profile-v2.webp"
              alt="Paulo Reducino"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
              <div>
                <p className="font-bricolage font-bold text-slate-100 text-lg">Paulo Reducino</p>
                <p className="text-blue text-sm font-mono">{ui.authorRole}</p>
              </div>
              <a
                href="https://www.linkedin.com/in/paulo-reducino"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-blue border border-border hover:border-blue/40 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">{ui.authorBio}</p>
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group rounded-xl border border-border bg-surface p-5 hover:border-blue/30 transition-all duration-200 hover:-translate-y-0.5">
                <p className="text-[10px] font-mono text-slate-600 mb-1.5 flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  {ui.prevLabel}
                </p>
                <p className="text-sm font-semibold text-slate-300 group-hover:text-blue transition-colors leading-snug line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}
            {next && (
              <Link href={`/blog/${next.slug}`} className="group rounded-xl border border-border bg-surface p-5 hover:border-blue/30 transition-all duration-200 hover:-translate-y-0.5 text-right sm:ml-auto sm:w-full">
                <p className="text-[10px] font-mono text-slate-600 mb-1.5 flex items-center justify-end gap-1">
                  {ui.nextLabel}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </p>
                <p className="text-sm font-semibold text-slate-300 group-hover:text-blue transition-colors leading-snug line-clamp-2">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        )}

        {/* CTA banner */}
        <div className="relative rounded-3xl border border-blue/20 bg-surface overflow-hidden p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue/8 via-transparent to-emerald/5" />
          <div className="relative z-10">
            <p className="text-xs font-mono text-slate-500 mb-3">{ui.ctaGotIt}</p>
            <h3 className="font-bricolage font-extrabold text-2xl lg:text-3xl text-slate-100 mb-3">
              {ui.ctaTitle}
            </h3>
            <p className="text-slate-400 mb-7 max-w-md mx-auto text-sm leading-relaxed">
              {ui.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Li%20seu%20blog%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 transition-all duration-300 shadow-xl shadow-blue/25 hover:-translate-y-0.5"
              >
                {ui.ctaStart}
              </a>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border text-slate-300 hover:text-slate-100 hover:border-blue/40 font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                {ui.ctaMorePosts}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
