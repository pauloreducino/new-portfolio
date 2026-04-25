
import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { baseMetadata } from "@/lib/metadata"
import { LanguageProvider } from "@/context/LanguageContext"
import { Toaster } from "sonner"
import "@/app/globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400","500","600","700","800"],
  display: "swap",
})
const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400","500","600"],
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400","500"],
  display: "swap",
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${dm.variable} ${mono.variable}`}>
      <body className="font-dm bg-bg text-slate-100 min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{ style: { background: "#0C1221", border: "1px solid #1E293B", color: "#F8FAFC" } }}
        />
      </body>
    </html>
  )
}
