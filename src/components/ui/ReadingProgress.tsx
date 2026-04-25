
"use client"
import { useEffect, useState } from "react"
export function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
      <div className="h-full bg-gradient-to-r from-blue to-emerald transition-all duration-75 ease-out"
        style={{ width: `${p}%` }} />
    </div>
  )
}
