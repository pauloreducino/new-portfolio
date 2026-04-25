export type ExperienceItem = {
  company: string
  period: string
  highlight: boolean
  current: boolean
  role: { pt: string; en: string }
  type: { pt: string; en: string }
  location: { pt: string; en: string }
  description: { pt: string; en: string }
  results: { pt: string[]; en: string[] }
  stack: string[]
}

export const experiences: ExperienceItem[] = [
  {
    company: "Vizuh",
    period: "out 2025 — presente",
    highlight: true,
    current: true,
    role: { pt: "Front-End Engineer", en: "Front-End Engineer" },
    type: { pt: "Freelance", en: "Freelance" },
    location: { pt: "Londres · Remoto", en: "London · Remote" },
    description: {
      pt: "Desenvolvimento e manutenção de sites institucionais e landing pages para diferentes segmentos, com forte foco em performance, acessibilidade e SEO técnico.",
      en: "Development and maintenance of institutional websites and landing pages across different industries, with a strong focus on performance, accessibility, and technical SEO.",
    },
    results: {
      pt: [
        "Diagnóstico e correção de problemas em sites existentes",
        "Relatórios detalhados de SEO e performance com Semrush",
        "Integrações com GA4, Google Tag Manager e Consent Mode",
        "Criação de conteúdo dinâmico e páginas de blog via CMS",
      ],
      en: [
        "Diagnosed and fixed performance issues on existing websites",
        "Produced detailed SEO & performance reports using Semrush",
        "Set up GA4, Google Tag Manager, and Consent Mode integrations",
        "Created dynamic CMS content and custom blog pages",
      ],
    },
    stack: ["WordPress", "Elementor", "Semrush", "GA4", "GTM"],
  },
  {
    company: "SurtoCriativo · OficinaCriativa",
    period: "ago 2025 — presente",
    highlight: false,
    current: true,
    role: { pt: "Mid Front-End Developer", en: "Mid Front-End Developer" },
    type: { pt: "Freelance", en: "Freelance" },
    location: { pt: "São Luís, MA · Remoto", en: "São Luís, MA · Remote" },
    description: {
      pt: "Construção de SPAs e sites otimizados com React e Next.js, com foco em performance, SEO técnico, acessibilidade e UI escalável para diferentes segmentos.",
      en: "Building SPAs and optimized websites with React and Next.js, focused on performance, technical SEO, accessibility, and scalable UI across different industries.",
    },
    results: {
      pt: [
        "SPAs com React, Vite e TypeScript de alta performance",
        "Integração de REST APIs e WordPress via TanStack Query — 35% menos tempo de carregamento",
        "Formulários confiáveis com React Hook Form + Zod",
        "Deploy e versionamento contínuo na Vercel",
      ],
      en: [
        "Built high-performance SPAs with React, Vite, and TypeScript",
        "Integrated REST APIs and WordPress via TanStack Query — 35% load time reduction",
        "Reliable forms with React Hook Form + Zod",
        "Continuous deployment and versioning on Vercel",
      ],
    },
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Vercel"],
  },
  {
    company: "Phooto",
    period: "dez 2022 — jul 2025",
    highlight: false,
    current: false,
    role: { pt: "Mid Front-End Developer", en: "Mid Front-End Developer" },
    type: { pt: "Tempo integral", en: "Full-time" },
    location: { pt: "São Paulo, SP · Remoto", en: "São Paulo, SP · Remote" },
    description: {
      pt: "Responsável pela entrega de UI da equipe de marketing, com foco em conversão, performance e execução de campanhas digitais de alto volume.",
      en: "Owned the marketing team's UI delivery with a strong focus on conversion, performance, and high-scale digital campaign execution.",
    },
    results: {
      pt: [
        "Refatoração da homepage com fidelidade total ao design Figma",
        "Landing pages com aumento de 25%+ no CTR de campanhas",
        "Redução de ~30% no tempo de carregamento via lazy loading e cache",
        "Lighthouse 90+ mantido em produção com acessibilidade e SEO",
      ],
      en: [
        "Refactored the homepage with full Figma design fidelity",
        "Campaign landing pages with 25%+ CTR increase",
        "~30% load time reduction via lazy loading and caching",
        "Maintained 90+ Lighthouse scores in production with a11y and SEO",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "AWS", "Vercel"],
  },
  {
    company: "SurtoCriativo · OficinaCriativa",
    period: "mar 2020 — nov 2022",
    highlight: false,
    current: false,
    role: { pt: "Front-End Developer", en: "Front-End Developer" },
    type: { pt: "Freelance", en: "Freelance" },
    location: { pt: "São Paulo · Remoto", en: "São Paulo · Remote" },
    description: {
      pt: "Criação de sites institucionais, landing pages e portfólios para clientes de marketing, saúde, jurídico e pequenos negócios — foco em SEO e performance.",
      en: "Created institutional websites, landing pages, and portfolios for marketing, healthcare, law, and small business clients — focused on SEO and performance.",
    },
    results: {
      pt: [
        "Sites completos do Figma ao deploy com alta fidelidade visual",
        "Redução de até 40% no tempo de carregamento das páginas",
        "Acessibilidade WCAG aplicada, tornando projetos mais inclusivos",
        "Landing pages para campanhas digitais com aumento de leads",
      ],
      en: [
        "Complete sites from Figma to production with strong visual accuracy",
        "Up to 40% page load time improvement",
        "WCAG accessibility standards applied across all projects",
        "Digital campaign landing pages with increased lead generation",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Elementor"],
  },
]
