# Paulo Reducino — Portfolio

Site pessoal e blog técnico construído com Next.js 15, TypeScript e Tailwind CSS.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript (strict)
- **Estilos:** Tailwind CSS v3 + @tailwindcss/typography
- **Animações:** Framer Motion
- **Formulários:** React Hook Form + Zod
- **Conteúdo:** MDX local (gray-matter + next-mdx-remote)
- **Syntax Highlight:** rehype-pretty-code + Shiki
- **Notificações:** Sonner
- **Deploy:** Vercel

## Iniciar localmente

```bash
pnpm install
pnpm dev
```

Acesse: http://localhost:3000

## Estrutura

```
src/
  app/               # Rotas Next.js (App Router)
    page.tsx         # Home (todas as seções)
    blog/            # Listagem e posts individuais
    faq/             # FAQ com accordion animado
    api/contact/     # Route handler do formulário
  components/
    layout/          # Header, Footer
    sections/        # Hero, About, Skills, Experience, Projects, Contact
    ui/              # Badge, SectionLabel, AnimatedSection, ReadingProgress
  lib/               # posts.ts, utils.ts, metadata.ts
  types/             # index.ts
content/
  posts/             # Arquivos .mdx dos posts do blog
```

## Adicionar um post no blog

Crie um arquivo `.mdx` em `content/posts/`:

```mdx
---
title: "Título do Post"
description: "Descrição para SEO e cards."
date: "2025-04-25"
tags: ["Next.js", "TypeScript"]
category: "Tutorial"
featured: false
---

Conteúdo em MDX aqui...
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL do site em produção |
| `NEXT_PUBLIC_WHATSAPP` | Número com DDI para links do WhatsApp |
| `CONTACT_EMAIL` | Email de destino do formulário |

## Deploy na Vercel

1. Suba no GitHub
2. Importe na Vercel
3. Configure as variáveis de ambiente
4. Deploy automático a cada push na `main`

## Personalizações necessárias

- [ ] `src/components/sections/Hero.tsx` — ajuste anos de experiência e stats
- [ ] `src/components/sections/About.tsx` — texto sobre você
- [ ] `src/components/sections/Experience.tsx` — suas experiências reais
- [ ] `src/components/sections/Projects.tsx` — seus projetos reais com links
- [ ] `src/components/layout/Header.tsx` — link do LinkedIn e GitHub
- [ ] `src/app/api/contact/route.ts` — integre com Resend ou Nodemailer
- [ ] `public/paulo-reducino-cv.pdf` — adicione seu CV em PDF
