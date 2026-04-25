
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionLabel } from "@/components/ui/SectionLabel"

const schema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto muito curto"),
  message: z.string().min(20, "Mensagem muito curta (mínimo 20 caracteres)"),
})
type FormData = z.infer<typeof schema>

const contacts = [
  {
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.46 2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    label: "WhatsApp",
    value: "+55 98 97026-5510",
    href: "https://wa.me/5598970265510?text=Ol%C3%A1%20Paulo!%20Vim%20pelo%20seu%20portf%C3%B3lio.",
    color: "emerald",
  },
  {
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    label: "Email",
    value: "paulo.a.reducino@gmail.com",
    href: "mailto:paulo.a.reducino@gmail.com",
    color: "blue",
  },
  {
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>,
    label: "LinkedIn",
    value: "Paulo Reducino",
    href: "https://www.linkedin.com/in/paulo-reducino",
    color: "blue",
  },
]

export function Contact() {
  const [sending, setSending] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success("Mensagem enviada com sucesso!")
        reset()
      } else {
        toast.error("Erro ao enviar. Tente pelo WhatsApp.")
      }
    } catch {
      toast.error("Erro de conexão. Tente pelo WhatsApp.")
    } finally {
      setSending(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-slate-200 placeholder:text-slate-600 text-sm font-mono focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20 transition-all duration-200"
  const errClass = "text-red-400 text-xs mt-1 font-mono"

  return (
    <section id="contato" className="py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Contato</SectionLabel>
          <h2 className="font-bricolage font-extrabold text-4xl lg:text-5xl text-slate-100 mb-4">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Aberto a projetos freelance, oportunidades remotas e parcerias técnicas. Respondo em até 24h.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact cards */}
          <AnimatedSection className="lg:col-span-2 space-y-4">
            {contacts.map(({ icon, label, value, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 p-5 rounded-2xl border bg-surface card-hover group ${color === "emerald" ? "border-emerald/20" : "border-border"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color === "emerald" ? "bg-emerald/10 text-emerald" : "bg-blue/10 text-blue"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    {Array.isArray(icon) ? icon : icon}
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-0.5 uppercase tracking-wider">{label}</div>
                  <div className="text-slate-200 text-sm font-medium group-hover:text-blue transition-colors">{value}</div>
                </div>
                <span className="ml-auto text-slate-600 group-hover:text-blue group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.15} className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h3 className="font-bricolage font-bold text-xl text-slate-100 mb-6">Enviar mensagem</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input {...register("name")} placeholder="Seu nome" className={inputClass} />
                    {errors.name && <p className={errClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register("email")} placeholder="seu@email.com" className={inputClass} />
                    {errors.email && <p className={errClass}>{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <input {...register("subject")} placeholder="Assunto" className={inputClass} />
                  {errors.subject && <p className={errClass}>{errors.subject.message}</p>}
                </div>
                <div>
                  <textarea {...register("message")} placeholder="Descreva seu projeto ou necessidade..." rows={5} className={inputClass + " resize-none"} />
                  {errors.message && <p className={errClass}>{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                  {sending ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
