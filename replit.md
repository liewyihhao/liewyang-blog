# Liew Yang's Adventure Diary

A warm, playful personal kids memory blog for Liew Yang — a digital storybook where parents capture every precious moment for their child's future reading.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/kids-blog run dev` — run the frontend (port auto-assigned)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec (then fix `lib/api-zod/src/index.ts` to only export from `./generated/api`)
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Quicksand font, framer-motion, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — Source of truth for API contracts
- `lib/api-client-react/src/generated/` — Generated React Query hooks
- `lib/api-zod/src/generated/` — Generated Zod schemas
- `lib/db/src/schema/` — Drizzle ORM schema files (profile, memories, comments, diary, milestones)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/kids-blog/src/pages/` — React pages (Home, Memories, Diary, Milestones, Videos, Admin)
- `artifacts/kids-blog/src/components/` — Shared components (Navbar)

## Architecture decisions

- OpenAPI-first: all API contracts defined in YAML, hooks + Zod schemas generated via Orval
- orval zod config uses `mode: "single"` to avoid duplicate exports; `lib/api-zod/src/index.ts` only re-exports `./generated/api`
- Admin panel protected by simple localStorage password ("liewyang2024") — no server-side auth for this private family app
- Images uploaded from device/camera via presigned GCS URLs (object storage) — no URL pasting needed
- Upload flow: client requests presigned URL from `/api/storage/uploads/request-url`, then PUTs file directly to GCS; stored `objectPath` served via `/api/storage/objects/{path}`
- All floating decorations are CSS-animated emoji/SVG elements — no external animation library needed

## Product

- **Home** (`/`) — Hero with "Hi, I'm Liew Yang!" greeting, animated floating decorations (clouds, stars, cars), stats row, recent memories grid, diary preview
- **Memories** (`/memories`) — Instagram-style photo/video grid with likes, comments, filtering
- **Diary** (`/diary`) — Open storybook UI with page-turn navigation, paper texture, left-right book spread
- **Milestones** (`/milestones`) — Horizontal timeline + cards grid (First Smile, First Steps, etc.)
- **Videos** (`/videos`) — Video gallery grid with playback modal
- **Admin** (`/admin`) — Password-gated dashboard (pw: liewyang2024) with sidebar: Dashboard stats, Upload Media, Diary Editor, Milestones Manager, Settings (profile editor)

## User preferences

- Child's name: Liew Yang
- App name: Liew Yang's Adventure Diary
- Color palette: sky blue, light green, warm yellow, soft peach (all pastel)
- Font: Quicksand (Google Fonts)
- Style: cartoon-themed, rounded corners, soft shadows, warm and playful

## Gotchas

- After codegen, always overwrite `lib/api-zod/src/index.ts` to only export from `./generated/api` (codegen regenerates both exports causing TS2308 duplicate errors)
- Orval zod target uses `mode: "single"` — types are in `generated/api.ts` only, no `generated/types/` folder
- Do not run `pnpm dev` at workspace root — use workflows or `--filter` flags

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
