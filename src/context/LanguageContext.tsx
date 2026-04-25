"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { translations, type Locale, type Translations } from "@/lib/i18n"

type LanguageContextValue = {
  locale: Locale
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved === "pt" || saved === "en") setLocale(saved)
  }, [])

  function toggle() {
    setLocale((prev) => {
      const next: Locale = prev === "pt" ? "en" : "pt"
      localStorage.setItem("locale", next)
      document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}
