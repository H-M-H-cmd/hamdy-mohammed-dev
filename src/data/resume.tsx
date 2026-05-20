import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Hamdy Mohammed",
  initials: "HM",
  url: "https://hamdymohammed.dev",
  resumeUrl: "/Hamdy-Mohammed-CV.pdf",
  location: "Alexandria, Egypt",
  locationLink: "https://www.google.com/maps/place/Alexandria",
  description:
    "Full-stack engineer. I design and ship production software end-to-end — web, mobile, and the backend beneath both.",
  headline:
    "One engineer, whole product — from the database to the deploy.",
  summary:
    "I turn ambitious product ideas into running software. I founded [**Prolink**](https://prolinkeg.com) to build and operate an ERP that Egyptian manufacturers and exporters actually use to run their businesses — quotes, production, logistics, finance, the lot. Before and alongside that, I've delivered full-stack work for clients across the MENA market for years.\n\nA taste of what that looks like: a regulated UAE fintech with KYC/AML, Stripe rails, and k6 load-testing. AI agents that read plain-markdown trading strategies and execute them across crypto exchanges. A WhatsApp Business SaaS spanning a Laravel monolith, a Nuxt web app, an Expo mobile app, and a Node.js microservice. A Saudi rental-contract platform wired into government Ejar and Nafath APIs.\n\nThe common thread isn't a framework — it's ownership. I'm comfortable choosing the stack, shaping the data model, designing the flows, writing the API, building the UI, and deploying it somewhere that survives Monday morning. I care about the seam between design and engineering — not the posture of either.\n\nIf you're building something ambitious and want one person who can own it end-to-end, [let's talk](mailto:aljzarh46@gmail.com).",
  facts: [
    { label: "Role", value: "Founder · Full-stack" },
    { label: "Scope", value: "DB → UI → Deploy" },
    { label: "Ships", value: "Web · iOS · Android" },
    { label: "Market", value: "MENA · Arabic-first" },
  ],
  avatarUrl: "/hamdy.jpg",
  githubUsername: "H-M-H-cmd",
  skills: [
    { name: "TypeScript", slug: "typescript", color: "3178C6" },
    { name: "Next.js", slug: "nextdotjs", color: "000000", colorDark: "FFFFFF" },
    { name: "React", slug: "react", color: "61DAFB" },
    { name: "NestJS", slug: "nestjs", color: "E0234B" },
    { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
    { name: "React Native", slug: "react", color: "61DAFB" },
    { name: "Vue / Nuxt", slug: "vuedotjs", color: "4FC08D" },
    { name: "Laravel", slug: "laravel", color: "FF2D20" },
    { name: "PHP", slug: "php", color: "777BB4" },
    { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
    { name: "MariaDB / MySQL", slug: "mysql", color: "4479A1" },
    { name: "Prisma", slug: "prisma", color: "2D3748", colorDark: "FFFFFF" },
    { name: "Supabase", slug: "supabase", color: "3FCF8E" },
    { name: "Redis / BullMQ", slug: "redis", color: "FF4438" },
    { name: "Docker", slug: "docker", color: "2496ED" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "aljzarh46@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/H-M-H-cmd",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/hamdy-mohamed-507312236/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/hamdymohamedak",
        icon: Icons.x,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:aljzarh46@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Prolink · Manifest ERP",
      href: "https://prolinkeg.com",
      badges: ["Founder"],
      location: "Remote",
      title: "Founder · Full-stack Engineer",
      logoUrl: "",
      start: "Nov 2025",
      end: "Present",
      description:
        "Founded Prolink to build Manifest — a multi-tenant ERP for Egyptian manufacturing and export companies. ~157k LOC of TypeScript across NestJS + React, 55 backend modules, 125+ DB entities, true database-per-tenant PostgreSQL isolation, blue-green zero-downtime Docker deploys on a bare VPS, AI chat via @ai-sdk. Architecture, infra, and shipping — solo.",
    },
    {
      company: "Brixfund Investments LLC",
      href: "https://github.com/Brixfund-Investments-LLC",
      badges: ["Contract"],
      location: "UAE · Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2025",
      end: "Present",
      description:
        "Built BrixFund — a regulated fractional real-estate investment platform for the UAE on Next.js 16 + Supabase. End-to-end Sumsub KYC/AML, Stripe fiat rails, BullMQ dividend-payout workers, a 27-endpoint REST surface with an OpenAPI spec generated from Zod validators, plus the operational layer: k6 load-tests, Cloudflare WAF automation, secret-rotation audits, Sentry instrumentation, and Playwright E2E flows.",
    },
    {
      company: "Domais",
      href: "https://domais.sa",
      badges: [],
      location: "Saudi Arabia · Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2024",
      end: "Present",
      description:
        "Delivered branded web products and admin tooling across a portfolio of client projects — Mesej, Aqd Ejar, Amiral, Masajed, Chatla. Laravel (Octane) + Nuxt 3 / Vue and Next.js stacks, Arabic-first UIs, Hijri-aware inputs, government API integrations, deployed on managed VPS.",
    },
    {
      company: "Grub",
      href: "https://github.com/thegrubai",
      badges: [],
      location: "Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2024",
      end: "2025",
      description:
        "Built the three surfaces of the Grub food-delivery platform: Next.js admin dashboard (orders, menu, riders, Google Maps live tracking, Three.js / Spline 3D scenes), Expo customer app with native Stripe checkout and a Maestro E2E suite, and a Flutter rider app. One Supabase backend with RLS and Realtime dispatch.",
    },
    {
      company: "SalahBreak",
      href: "https://github.com/salahbreak",
      badges: [],
      location: "Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2024",
      end: "2025",
      description:
        "Workplace product that schedules prayer breaks and syncs them to team calendars. Laravel 12 + Pest backend with OAuth across Google, Apple, and Microsoft, Aladhan-API prayer-time computation, Google Calendar API push, and iCal-feed export. Next.js 15 frontend with locale-aware redirects (AR/EN), separate Filament 3 admin.",
    },
    {
      company: "Swiss Heritage",
      href: "https://github.com/teamupai",
      badges: ["Contract"],
      location: "Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2025",
      end: "2025",
      description:
        "Live auction platform. Next.js 16 App Router with a strict 3-tier service-oriented architecture — Server Actions only (no REST), Drizzle ORM, passwordless Supabase auth. Built the bidding domain, email-template-driven workflows, and a 30+ table schema covering registrations, bids, counter-offers, and shipments.",
    },
    {
      company: "Traxon",
      href: "https://github.com/azirbot",
      badges: ["Contract"],
      location: "Remote",
      title: "Full-stack Engineer",
      logoUrl: "",
      start: "2025",
      end: "2025",
      description:
        "Built TRAXON — an AI crypto-trading-agents SaaS where users write strategies in plain markdown and LangGraph agents execute them across Binance, Aster DEX, and ccxt exchanges. Turborepo monorepo: Next.js 16 web, a NestJS worker (tRPC + BullMQ), and an Expo mobile app sharing a 26-table Drizzle schema. Multi-LLM routing and metered Stripe billing for AI credits.",
    },
  ],
  education: [] as ReadonlyArray<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>,
  projects: [
    {
      title: "Manifest ERP (Prolink)",
      href: "https://www.prolinkeg.com/",
      dates: "Nov 2025 — Present",
      active: true,
      description:
        "Multi-tenant ERP for manufacturing and export — production planning, inventory, sales, logistics, HR, finance, CRM, and an AI chat layer. **True database-per-tenant isolation** (a separate Postgres database per company), 55+ backend modules, blue-green zero-downtime Docker deploys on a bare VPS. ~157k LOC, architected and shipped solo.",
      technologies: [
        "NestJS",
        "React",
        "TypeScript",
        "PostgreSQL",
        "TypeORM",
        "Docker",
        "AI SDK",
      ],
      links: [
        {
          type: "Live",
          href: "https://www.prolinkeg.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/manifest.jpg",
      video: "",
    },
    {
      title: "BrixFund — Real-Estate Fintech",
      href: "https://app.brixfund.com/",
      dates: "2025 — Present",
      active: true,
      description:
        "Regulated fractional real-estate investment platform for the UAE — qualified investors buy property shares from AED 5,000. Next.js 16 + Supabase with **end-to-end Sumsub KYC/AML**, Stripe fiat rails, BullMQ dividend-payout workers, and an OpenAPI spec generated from Zod validators — plus k6 load-tests, Cloudflare WAF automation, and secret-rotation audits.",
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Supabase",
        "Stripe",
        "Sumsub KYC",
        "BullMQ",
        "Capacitor",
      ],
      links: [
        {
          type: "Live",
          href: "https://app.brixfund.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/brixfund.jpg",
      video: "",
    },
    {
      title: "Mesej — WhatsApp Business SaaS",
      href: "https://mesej.app/",
      dates: "2024 — Present",
      active: true,
      description:
        "WhatsApp Business messaging SaaS — shared inbox, AI agents with file-grounded knowledge, a visual automation-flow engine, and broadcast campaigns. Genuinely **polyglot architecture**: a Laravel 12 Octane monolith, a Nuxt 3 web client, an Expo mobile app, and a standalone Node.js `whatsapp-web.js` microservice — all reconciled over Reverb websockets.",
      technologies: [
        "Laravel 12",
        "Nuxt 3",
        "Vue",
        "Expo",
        "Reverb",
        "Prism AI",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Live",
          href: "https://mesej.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/mesej.jpg",
      video: "",
    },
    {
      title: "TRAXON — AI Trading Agents",
      href: "https://traxon.xerk.io/",
      dates: "2025",
      active: true,
      description:
        "AI-powered crypto-trading agents — users write strategies in **plain markdown** and LangGraph agents execute them across Binance, Aster DEX, and 108+ ccxt exchanges. A Turborepo monorepo: Next.js 16 web, a NestJS worker (tRPC + BullMQ), and an Expo mobile app sharing a 26-table Drizzle schema. Multi-LLM routing and metered Stripe billing for AI credits.",
      technologies: [
        "Next.js 16",
        "NestJS",
        "LangGraph",
        "TypeScript",
        "Drizzle",
        "tRPC",
        "Turborepo",
      ],
      links: [
        {
          type: "Live",
          href: "https://traxon.xerk.io/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/traxon.jpg",
      video: "",
    },
    {
      title: "Aqd Ejar — Saudi Rental Contracts",
      href: "https://agd.sa/",
      dates: "2024 — Present",
      active: true,
      description:
        "SaaS for Saudi real-estate offices to register lease contracts, integrated end-to-end with the government **Ejar** platform and **Nafath** national-ID verification. Laravel 10 Octane + Filament admin + a Vue 3 / PrimeVue SPA. Spun off `vue-hijri-gregorian-datepicker` — a bilingual AR/EN Hijri datepicker **published to npm**.",
      technologies: [
        "Vue 3",
        "Laravel 10",
        "PrimeVue",
        "Filament",
        "PostgreSQL",
        "Reverb",
      ],
      links: [
        {
          type: "Live",
          href: "https://agd.sa/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "npm",
          href: "https://www.npmjs.com/package/vue-hijri-gregorian-datepicker",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/agd.jpg",
      video: "",
    },
    {
      title: "Swiss Heritage — Live Auction",
      href: "https://swiss-haritage.vercel.app/",
      dates: "2025",
      active: true,
      description:
        "Swiss heritage auction platform on Next.js 16 with a strict **3-tier service-oriented architecture** — Server Actions only (no REST), Drizzle ORM, and passwordless Supabase auth (OTP + Magic Link). 30+ Drizzle schemas covering auction registrations, bids, counter-offers, shipments, and email-template-driven workflows.",
      technologies: [
        "Next.js 16",
        "Drizzle",
        "Supabase",
        "Stripe",
        "TipTap",
        "next-intl",
      ],
      links: [
        {
          type: "Live",
          href: "https://swiss-haritage.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/swiss-heritage.jpg",
      video: "",
    },
    {
      title: "Grub — Food Delivery",
      href: "https://github.com/thegrubai",
      dates: "2024 — 2025",
      active: true,
      description:
        "Food-delivery platform with **three clients on one Supabase backend** — a Next.js admin dashboard (Google Maps, Three.js / Spline 3D scenes), an Expo customer app with native Stripe checkout and a full Maestro E2E suite, and a Flutter rider app for dispatch. Realtime order dispatch over Supabase Realtime.",
      technologies: [
        "Next.js",
        "Expo",
        "Flutter",
        "Supabase",
        "Stripe",
        "Three.js",
        "Google Maps",
      ],
      links: [
        {
          type: "Code",
          href: "https://github.com/thegrubai",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "SalahBreak — Prayer-Break Sync",
      href: "https://salahbreak.com/",
      dates: "2024 — 2025",
      active: true,
      description:
        "Workplace SaaS that pushes Muslim prayer-break windows into team calendars. Laravel 12 + Sanctum backend with OAuth across **Google, Apple, and Microsoft**, Aladhan-API prayer-time computation, and dual Google Calendar API + iCal-feed sync. Next.js 15 frontend, separate Filament 3 admin.",
      technologies: [
        "Laravel 12",
        "Next.js 15",
        "Filament",
        "Pest",
        "Google Calendar",
      ],
      links: [
        {
          type: "Live",
          href: "https://salahbreak.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/salahbreak.jpg",
      video: "",
    },
    {
      title: "Masajed — Mosque CMS",
      href: "https://masajed-prayer-preview.vercel.app/",
      dates: "2024 — 2025",
      active: true,
      description:
        "Content-management dashboard for mosque administrators — content authoring, events, and scheduling with bilingual Arabic/English routing. Notable frontend call: **three editors in one app** — Lexical, TipTap, and Excalidraw — picked per content type, with dnd-kit drag-and-drop ordering on Next.js 15 + Turbopack.",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Lexical",
        "TipTap",
        "Excalidraw",
        "dnd-kit",
      ],
      links: [
        {
          type: "Live",
          href: "https://masajed-prayer-preview.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/masajed.jpg",
      video: "",
    },
  ],
  testimonials: [
    {
      quote:
        "Hamdy did quality work on a timely manner, with very clear and understandable communication.",
      author: "Private client",
      role: "Las Vegas, USA",
      project: "Multi-theme system from one set of CSS variables",
      rating: 5,
      date: "Apr 2026",
      source: "Upwork",
      sourceUrl: "https://www.upwork.com/freelancers/hamdym13",
      highlights: [
        "Reliable",
        "Solution Oriented",
        "Clear Communicator",
        "Detail Oriented",
      ],
    },
  ] as ReadonlyArray<{
    quote: string;
    author: string;
    role: string;
    project: string;
    rating: number;
    date: string;
    source: string;
    sourceUrl: string;
    highlights: readonly string[];
  }>,
} as const;
