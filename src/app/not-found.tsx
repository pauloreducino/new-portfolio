
import Link from "next/link"
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-mono text-8xl font-bold text-border mb-6 select-none">404</div>
        <h1 className="font-bricolage font-extrabold text-3xl text-slate-100 mb-4">Página não encontrada</h1>
        <p className="text-slate-400 text-base mb-10 max-w-sm mx-auto">Esse conteúdo não existe ou foi movido para outro endereço.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="px-6 py-3 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue/90 transition-all shadow-lg shadow-blue/25">
            Voltar ao início
          </Link>
          <Link href="/blog" className="px-6 py-3 rounded-xl border border-border text-slate-400 hover:text-slate-100 text-sm font-medium transition-all">
            Ver blog
          </Link>
        </div>
      </div>
    </div>
  )
}
