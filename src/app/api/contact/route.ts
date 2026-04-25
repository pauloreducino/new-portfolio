
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
    }
    // Integre aqui com Resend, Nodemailer ou outro serviço de email
    // Exemplo com Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from, to, subject, html })
    console.log("Contato recebido:", { name, email, subject, message })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
