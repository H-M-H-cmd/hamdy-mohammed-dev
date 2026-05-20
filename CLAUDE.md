# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (required; see `pnpm-lock.yaml`).

- `pnpm dev` — start Next.js dev server
- `pnpm build` — production build (runs content-collections generation via the `withContentCollections` plugin)
- `pnpm start` — run the built app
- `pnpm lint` / `pnpm lint:fix` — ESLint (flat config, `eslint-config-next/core-web-vitals`)

TypeScript is checked by `next build`; there is no standalone `typecheck` script. Node >=18 required.

## Architecture

This is a **Next.js 16 App Router** portfolio + MDX blog, using **React 19**, **Tailwind v4**, and **shadcn/ui** (New York style, neutral base, aliases `@/*` → `src/*`).

### Content pipeline (important)

Blog posts are **not** read from disk at request time. Content is compiled at build time by **content-collections**:

1. `content-collections.ts` defines a `posts` collection: scans `content/**/*.mdx`, validates frontmatter with Zod (`title`, `publishedAt`, `summary`, optional `updatedAt`/`author`/`image`), and compiles MDX with `remarkGfm` + a local `remarkCodeMeta` plugin (`src/lib/remark-code-meta.ts`) that forwards fenced-code meta (e.g. `title="..."`) into `data-*` HTML attributes so `CodeBlock` can render filename headers.
2. `next.config.mjs` wraps the config in `withContentCollections(...)` — this **must remain the outermost plugin**.
3. Generated output lives in `.content-collections/generated/` and is imported as `content-collections` (path alias in `tsconfig.json`). Pages consume it via `import { allPosts } from "content-collections"`.
4. Adding a post = drop an `.mdx` file into `content/` with the required frontmatter; rebuild.

`src/app/blog/[slug]/page.tsx` uses `generateStaticParams` so every post is statically rendered; rendering goes through `MDXContent` + `mdxComponents` (`src/mdx-components.tsx`), which wires `pre` → `CodeBlock`, overrides `code`/`hr`/`table`, and exposes a `<MediaContainer>` for embeds.

### Single source of truth: resume data

`src/data/resume.tsx` is the **central config** for the entire site — name, bio, skills, work history, projects, hackathons, contact/social. All homepage sections (`src/components/section/*`), the navbar, and SEO metadata in `src/app/layout.tsx` read from `DATA` here. Skill icons are local SVG components under `src/components/ui/svgs/`. Editing the site primarily means editing this file.

### Routing

- `/` — `src/app/page.tsx` composes hero, about, skills, and section components (Work, Projects, Hackathons, Contact).
- `/blog` — paginated listing (`PAGE_SIZE = 5`), pagination helpers in `src/lib/pagination.ts` (`paginate`, `normalizePage`).
- `/blog/[slug]` — statically generated per post, emits JSON-LD `BlogPosting`, includes prev/next nav.
- `opengraph-image.tsx` files generate OG images at build time for `/`, `/blog`, and `/blog/[slug]`.

### Theming & UI

- `next-themes` with `attribute="class"`, default light (`src/components/theme-provider.tsx`), toggle in `src/components/mode-toggle.tsx`.
- Tailwind v4 via `@tailwindcss/postcss`; global styles in `src/app/globals.css`.
- shadcn components in `src/components/ui/`, custom animated primitives in `src/components/magicui/` (blur-fade, dock, flickering-grid), MDX-specific in `src/components/mdx/`.
- `cn()` helper in `src/lib/utils.ts`.

### Security headers

`next.config.mjs` sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, and a restrictive `Permissions-Policy` for all routes. Preserve these when modifying the config.
