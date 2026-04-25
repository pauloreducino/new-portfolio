
import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-emerald flex items-center justify-center shadow-lg shadow-blue/30">
                <span className="font-mono text-white text-[11px] font-bold">&lt;PR/&gt;</span>
              </div>
              <span className="font-bricolage font-bold text-slate-100 text-lg">Paulo Reducino</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Desenvolvedor Full-Stack especializado em Next.js, TypeScript e interfaces de alta performance.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: "https://www.linkedin.com/in/paulo-reducino", label: "LinkedIn", icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>, extra: <circle cx="4" cy="4" r="2"/> },
                { href: "https://github.com/paulo-reducino", label: "GitHub", icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/> },
              ].map(({ href, label, icon, extra }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-blue hover:bg-blue/10 transition-all duration-200"
                  aria-label={label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{icon}{extra}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bricolage font-semibold text-slate-100 text-sm mb-5 uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-3">
              {[
                { href: "/#sobre", label: "Sobre mim" },
                { href: "/#habilidades", label: "Habilidades" },
                { href: "/#experiencia", label: "Experiência" },
                { href: "/#projetos", label: "Projetos" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-blue text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bricolage font-semibold text-slate-100 text-sm mb-5 uppercase tracking-widest">Contato</h4>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Aberto a projetos freelance, oportunidades remotas e parcerias técnicas.
            </p>
            <a
              href="https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Vim%20pelo%20seu%20portf%C3%B3lio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-emerald hover:gap-3 transition-all duration-200 font-medium"
            >
              Iniciar conversa →
            </a>
            <div className="mt-4">
              <a href="mailto:paulo.a.reducino@gmail.com"
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors font-mono">
                paulo.a.reducino@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-slate-500 text-sm">© {year} Paulo Reducino. Construído com Next.js 15 e TypeScript.</p>
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
            <span className="text-blue">const</span>
            <span className="text-slate-500 mx-1">stack</span>
            <span className="text-slate-600">=</span>
            <span className="text-emerald ml-1">[&quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;Tailwind&quot;]</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
