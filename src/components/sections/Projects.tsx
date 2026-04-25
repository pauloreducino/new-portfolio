
"use client"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Badge } from "@/components/ui/Badge"

const projects = [
  {
    title: "Cardápio Digital SaaS",
    description: "Plataforma multi-tenant de cardápios digitais para restaurantes brasileiros. Painel de admin, QR code, integração com Asaas para pagamentos recorrentes.",
    stack: ["Next.js 15","TypeScript","Supabase","Asaas","Tailwind CSS","Vercel"],
    results: ["Multi-tenant com subdomínios dinâmicos","Pagamentos recorrentes via Asaas","Deploy automático na Vercel"],
    badge: "SaaS",
    badgeVariant: "emerald" as const,
    github: "https://github.com/paulo-reducino",
    demo: "#",
    featured: true,
  },
  {
    title: "TechZone E-commerce",
    description: "Loja headless full-stack com WooCommerce + WPGraphQL no backend e Next.js 15 no frontend. Carrinho com Zustand, checkout e filtros avançados.",
    stack: ["Next.js 15","WooCommerce","WPGraphQL","Zustand","TypeScript","Tailwind CSS"],
    results: ["ISR para páginas de produto","Filtros avançados sem reload","LCP < 1.5s em produção"],
    badge: "E-commerce",
    badgeVariant: "blue" as const,
    github: "https://github.com/paulo-reducino",
    demo: "#",
    featured: true,
  },
  {
    title: "Flogão Clone",
    description: "Rede social moderna inspirada no Flogão dos anos 2000. Sistema de posts, perfis, follows, chat em tempo real com Pusher e feed com infinite scroll.",
    stack: ["Next.js 15","PostgreSQL","Prisma","NextAuth v5","Pusher","Redis","GraphQL"],
    results: ["Chat em tempo real com Pusher","Autenticação OAuth completa","Feed paginado com cursor"],
    badge: "Full-Stack",
    badgeVariant: "amber" as const,
    github: "https://github.com/paulo-reducino",
    demo: "#",
    featured: false,
  },
  {
    title: "Rivo Exp",
    description: "Site institucional estático para empresa de viagens e expedições com deploy automatizado via GitHub Actions e FTP para Hostgator.",
    stack: ["Next.js","TypeScript","Tailwind CSS","GitHub Actions","Hostgator"],
    results: ["CI/CD via GitHub Actions","Score 100 no Lighthouse","Deploy zero downtime"],
    badge: "Site",
    badgeVariant: "outline" as const,
    github: "https://github.com/paulo-reducino",
    demo: "https://rivoexp.com.br",
    featured: false,
  },
]

export function Projects() {
  return (
    <section id="projetos" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="mb-16">
          <SectionLabel>Projetos</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-bricolage font-extrabold text-4xl lg:text-5xl text-slate-100 leading-tight">
              O que eu construo
            </h2>
            <a href="https://github.com/paulo-reducino" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors group">
              Ver todos no GitHub
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}>
              <div className={`group relative h-full flex flex-col rounded-2xl border bg-surface p-7 card-hover overflow-hidden ${p.featured ? "border-blue/25" : "border-border"}`}>
                {p.featured && <div className="absolute inset-0 bg-gradient-to-br from-blue/4 to-transparent" />}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <Badge variant={p.badgeVariant} className="mb-2">{p.badge}</Badge>
                      <h3 className="font-bricolage font-bold text-xl text-slate-100 group-hover:text-blue transition-colors duration-200">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-surface-2 transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                      {p.demo && p.demo !== "#" && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg text-slate-500 hover:text-blue hover:bg-blue/10 transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Demo">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {p.results.map(r => (
                      <div key={r} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald mt-0.5 flex-shrink-0">▸</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                    {p.stack.map(s => (
                      <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-border text-slate-500">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
