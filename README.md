# Generic Company Profile Template

A modern, industry-agnostic company profile starter template built with **Next.js**, **Tailwind CSS**, and **Payload CMS**. This template provides a complete foundation for building a company website that can be easily themed and populated with content without changing any frontend code.

> **What is this?** This template started as a specific fiber/connectivity company profile site. The layout, structure, and UX have been validated and are good — they are preserved as-is. The project is now a **reusable, industry-agnostic starter** that can be re-used to spin up a company profile site for *any* business (a hospital, a construction firm, a logistics company, etc.) by changing configuration and seed content — not by rewriting code.

## Features

- **Config-Driven Theming** — Change primary/accent colors, site name, and core copy directly via `.env`. No component code changes required.
- **Preset-Based Seeding** — Swap example content across industries (generic, hospital, construction) with a single command.
- **Clean Architecture** — Separated UI primitives (`src/components/ui/`) and reusable page blocks (`src/components/blocks/`).
- **Full CMS Integration** — Payload CMS handles all content: services, posts (articles/blogs), static pages, site settings, and landing page content.
- **Docker-Ready Database** — A single `docker compose up -d` command spins up the required PostgreSQL database.
- **One-Command Setup** — `setup.sh` installs dependencies, starts the database, runs migrations, and seeds example content.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 22+ |
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| CMS | Payload CMS 3.x (embedded) |
| Database | PostgreSQL |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss` + `@theme` directives) |
| Rich Text | Lexical (Payload's default editor) |
| Media Storage | Local disk (`media/` folder) |
| Fonts | Inter (Google Fonts) |

## Quick Start

```bash
# 1. Clone the repository
git clone <repository-url> my-company-site
cd my-company-site

# 2. Run the setup script (installs deps, starts DB, seeds content)
./setup.sh

# 3. Start the development server
npm run dev
```

By default, `setup.sh` seeds the database with the **generic** preset. You can specify a different preset:

```bash
./setup.sh hospital
```

To reset and re-seed the database later:

```bash
pnpm db:reset            # drop & recreate the database
pnpm reseed              # reset + seed with default preset
pnpm reseed:hospital     # reset + seed with hospital preset
pnpm reseed:construction # reset + seed with construction preset
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the Payload CMS admin panel.

**Default admin credentials:**
- Email: `admin@demo.com`
- Password: `admin123`

## Theming & Configuration

All site-wide configuration is managed in `src/site.config.ts`, which reads from environment variables. To customize the theme, copy `.env.example` to `.env` and update the values. The frontend will automatically reflect the changes — no component edits needed.

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Company name | `Your Company Name` |
| `NEXT_PUBLIC_SITE_TAGLINE` | Main tagline for hero sections | `Your tagline goes here` |
| `NEXT_PUBLIC_COLOR_PRIMARY` | Primary brand color (hex) | `#0B2545` |
| `NEXT_PUBLIC_COLOR_ACCENT` | Accent brand color (hex) | `#2CB1BC` |
| `NEXT_PUBLIC_HERO_BADGE` | Default badge text on landing page | `Welcome` |

The frontend layout injects CSS custom properties (`--color-primary`, `--color-accent`, etc.) into `:root` from `siteConfig`, and Tailwind's color tokens reference those CSS custom properties. This means a new deployment can restyle itself purely through `.env`.

## Seeding Content Presets

The template includes a preset system to easily swap example content for different industries.

**Available Presets:**

| Preset | Description |
|--------|-------------|
| `generic` | Neutral placeholder content for any business. |
| `hospital` | Complete hospital and healthcare facility example. |
| `construction` | Building and construction firm example. |

**Commands:**

```bash
# List available presets
npm run seed:list

# Seed a specific preset
npm run seed:hospital

# Reset database and re-seed
pnpm reseed                    # default preset
pnpm reseed:hospital
pnpm reseed:construction
```

### Creating a New Preset

1. **Create a new file** in `src/seed/presets/`, for example `logistics.ts`.

2. **Define the content** implementing the `SeedPreset` interface:

```tsx
import type { SeedPreset } from './types'

export const logisticsPreset: SeedPreset = {
  name: 'logistics',
  label: 'Logistics & Transportation',
  description: 'Complete logistics and transportation company example.',
  siteSettings: { /* ... */ },
  services: [ /* ... */ ],
  categories: [ /* ... */ ],
  posts: [ /* ... */ ],
  pages: [ /* ... */ ],
  landing: { /* ... */ },
}
```

3. **Register the preset** by updating `src/seed/presets/index.ts`:

```tsx
import { logisticsPreset } from './logistics'

export const presets: Record<string, SeedPreset> = {
  // ... existing presets
  logistics: logisticsPreset,
}
```

4. **Seed the database** with the new preset:

```bash
npm run seed --preset logistics
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/       # Public-facing pages
│   └── (payload)/        # Payload CMS admin panel (auto-generated)
├── collections/          # Payload CMS collection schemas
├── components/
│   ├── blocks/           # Reusable page sections (Hero, ServiceGrid, etc.)
│   └── ui/               # Small primitives (Button, Card, Container)
├── globals/              # Payload CMS global schemas
├── seed/
│   └── presets/          # Data presets for different industries
├── site.config.ts        # Single source of truth for theme/copy
└── payload.config.ts     # Payload CMS configuration
```

## How to Add a New Page

1. **Create a page in the CMS** — Go to the admin panel, navigate to "Pages", and create a new page. Give it a title (e.g., "Contact Us") and a slug (e.g., `contact-us`).

2. **Create the frontend route** — Create a new file at `src/app/(frontend)/contact-us/page.tsx`.

3. **Fetch the content** — Use Payload's API to fetch the page content:

```tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RichText } from '@/components/blocks/RichText'
import { PageHero } from '@/components/blocks/PageHero'
import { Container, Section } from '@/components/ui'

export default async function ContactUsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact-us' } },
  })
  const page = docs[0]

  return (
    <main>
      <PageHero title={page.title} />
      <Container>
        <Section>
          <div className="prose max-w-none">
            <RichText content={page.content} />
          </div>
        </Section>
      </Container>
    </main>
  )
}
```

4. **Add to navigation** — Edit `src/components/Navbar.tsx` to include a link:

```tsx
<Link href="/contact-us">Contact Us</Link>
```

## How to Customize Content via CMS

Use the Payload CMS admin panel (`/admin`) to manage all site content:

| Collection / Global | What it controls |
|---------------------|------------------|
| **Services** | Add, edit, or reorder service offerings |
| **Posts** | Create articles (`artikel`) and blog posts (`blog`) |
| **Pages** | Update static pages (e.g., "About Us") |
| **Landing** | Modify hero section, stats, and featured services |
| **SiteSettings** | Update company name, logo, contact info, social links |
| **Categories** | Shared taxonomy for posts |
| **Media** | Image uploads with generated sizes (thumbnail, card, hero) |

## How to Add a New Collection

Adding a new collection (e.g., Testimonials, Products, Team Members) involves three steps: defining the schema, registering it, and creating a frontend route.

### 1. Create the Collection Schema

Create a new file in `src/collections/` — e.g., `Testimonials.ts`:

```tsx
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'rating'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
```

### 2. Register It in `payload.config.ts`

```tsx
import { Testimonials } from './collections/Testimonials'

export default buildConfig({
  collections: [Users, Media, Categories, Services, Posts, Pages, Testimonials],
  // ...
})
```

### 3. Generate Types and Create a Frontend Route

```bash
npm run generate:types
```

Then create a page at `src/app/(frontend)/testimonials/page.tsx` that fetches and displays the data. See [How to Add a New Page](#how-to-add-a-new-page) for the pattern.

### 4. Add to a Seed Preset (Optional)

Add a `testimonials` array to the `SeedPreset` interface in `src/seed/presets/types.ts`, implement it in each preset file, and the seed script will populate them automatically.

## How to Add Fields to Existing Collections

Adding a new field to a collection is a two-step process: update the schema, then regenerate types.

### Example: Add a `phone` field to Services

1. **Edit the collection schema** in `src/collections/Services.ts`:

```tsx
fields: [
  // ... existing fields
  {
    name: 'phone',
    type: 'text',
  },
]
```

2. **Regenerate TypeScript types**:

```bash
npm run generate:types
```

3. **Run the dev server** — Payload will auto-migrate the database on startup:

```bash
npm run dev
```

The new field will appear in the admin panel immediately. Existing documents will have `null` for the new field.

> **Important:** After adding fields, always run `npm run generate:types` to keep `payload-types.ts` in sync. The admin panel won't show the field until the types are regenerated and the server restarts.

## Component Library

All components are **Server Components** (no `"use client"` directive) and use named exports.

### UI Primitives (`src/components/ui/`)

These are small, reusable building blocks with no business logic. They encode design tokens (spacing, radius, shadow, type scale) in one place.

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `children`, `variant?: "primary" \| "secondary" \| "outline"`, `size?: "sm" \| "md" \| "lg"`, `className?`, `icon?`, `iconPosition?`, plus either `href` (link) or `onClick` (native button) | Renders as `<a>` when `href` is provided, `<button>` otherwise |
| `Card` | `children`, `className?`, `href?`, `as?: "div" \| "a"` | Wrapper with consistent padding, border radius, and shadow |
| `Container` | `children`, `className?` | Max-width centered container |
| `Heading` | `children`, `level?: 1 \| 2 \| 3 \| 4`, `className?` | Semantic heading with consistent type scale |
| `Section` | `children`, `className?`, `id?` | Vertical spacing wrapper with optional anchor ID |

**Usage example:**

```tsx
import { Button, Card, Container, Heading, Section } from '@/components/ui'

<Section id="services">
  <Container>
    <Heading level={2}>Our Services</Heading>
    <Card href="/services/web-design">
      <Heading level={3}>Web Design</Heading>
      <p>Beautiful, responsive websites.</p>
      <Button variant="primary" size="sm">Learn More</Button>
    </Card>
  </Container>
</Section>
```

### Page Blocks (`src/components/blocks/`)

Composed page sections built from `ui/` primitives. These are what actual pages assemble.

| Block | Props | Description |
|-------|-------|-------------|
| `Hero` | `badgeText?`, `title`, `subtitle?`, `ctaPrimary?: { label, href }`, `ctaSecondary?: { label, href }`, `backgroundImage?: { url, alt }`, `className?` | Full-width hero with optional background image and CTAs |
| `PageHero` | `badgeText?`, `title`, `subtitle?`, `breadcrumb?: { label, href }[]`, `variant?: "full" \| "compact"`, `className?` | Hero for inner pages with optional breadcrumb trail |
| `StatsSection` | `stats: { value, label }[]`, `className?` | Horizontal row of statistics/numbers |
| `ServiceGrid` | `services: { id, title, shortDescription, slug, icon? }[]`, `title?`, `subtitle?`, `sectionLabel?`, `viewAllHref?`, `viewAllLabel?`, `readMoreLabel?`, `className?` | Grid of service cards with optional "View All" link |
| `PostGrid` | `posts: { id, title, slug, type, excerpt?, publishedAt?, featuredImage? }[]`, `title?`, `subtitle?`, `sectionLabel?`, `className?`, `columns?: 2 \| 3 \| 4` | Grid of post cards with configurable columns |
| `CTASection` | `title`, `description`, `primaryButton?: { label, href }`, `secondaryButton?: { label, href }`, `className?` | Call-to-action banner |
| `RichText` | `content: any`, `className?` | Renders Lexical rich text from Payload CMS |
| `ServiceSidebar` | `contactLabel?`, `contactDescription?`, `primaryButtonLabel?`, `primaryButtonHref?`, `secondaryButtonLabel?`, `secondaryButtonHref?` | Sidebar with contact info for service detail pages |
| `EmptyState` | `message?`, `className?` | Placeholder shown when no data is available |

**Composition pattern** — pages should mostly compose blocks, not write raw markup:

```tsx
import { Hero, StatsSection, ServiceGrid, PostGrid, CTASection } from '@/components/blocks'

export default async function LandingPage() {
  const payload = await getPayload({ config })
  const landing = await payload.findGlobal({ slug: 'landing' })
  // ... fetch services, posts

  return (
    <main>
      <Hero title={landing.heroTitle} subtitle={landing.heroSubtitle} />
      <StatsSection stats={landing.stats} />
      <ServiceGrid services={services} title="Our Services" />
      <PostGrid posts={posts} title="Latest Articles" columns={3} />
      <CTASection title="Get Started" description="Contact us today." />
    </main>
  )
}
```

## Local API Usage Patterns

All frontend pages use Payload's **Local API** (not REST/GraphQL). This runs server-side with full database access and no HTTP overhead.

### Basic Patterns

```tsx
import { getPayload } from 'payload'
import config from '@/payload.config'

// Fetch a list of documents
const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'services',
  limit: 10,
  sort: 'order',
})

// Fetch a single document by slug
const { docs } = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'about-us' } },
})
const page = docs[0]

// Fetch a global
const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

// Fetch with depth (populates relationships)
const { docs } = await payload.find({
  collection: 'posts',
  depth: 1, // populates category relationship
  where: { status: { equals: 'published' } },
})
```

### Common Query Patterns in This Project

| Pattern | Where Used |
|---------|-----------|
| `payload.find({ collection, where: { slug: { equals } } })` | Every `[slug]` route page |
| `payload.find({ collection, where: { status: { equals: 'published' } } })` | Post listing, footer recent posts |
| `payload.findGlobal({ slug })` | Layout (site settings), landing page |
| `payload.find({ collection, sort, limit })` | Service grid, post grid |

### Disabling Cache

All pages use `export const dynamic = 'force-dynamic'` to ensure fresh data on every request. Remove this if you want static generation for a specific page.

## Deployment

### Environment Variables

Copy `.env.example` to `.env` and configure for production:

```env
DATABASE_URI=postgresql://user:password@host:5432/compro
PAYLOAD_SECRET=<generate-a-strong-random-secret>
NEXT_PUBLIC_SITE_NAME=Your Company Name
NEXT_PUBLIC_COLOR_PRIMARY=#0B2545
NEXT_PUBLIC_COLOR_ACCENT=#2CB1BC
```

### Build and Start

```bash
npm run build
npm start
```

### Vercel Deployment

1. Push to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel dashboard
3. Set environment variables in Vercel project settings
4. Vercel will auto-detect Next.js and deploy

> **Note:** For Vercel, you need an external PostgreSQL database (e.g., Vercel Postgres, Supabase, Neon). Update `DATABASE_URI` accordingly.

### Self-Hosted (VPS/Server)

```bash
# On the server
git clone <repo-url> && cd compro
cp .env.example .env  # edit with production values
npm install
npm run build
npm start
```

Use a process manager like **PM2** to keep the app running:

```bash
pm2 start npm --name "compro" -- start
pm2 save
pm2 startup
```

### Database Migrations

After deploying code changes that modify collection schemas:

```bash
npm run migrate
```

Payload also auto-runs pending migrations on `npm run dev` and `npm run build`.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module '@payloadcms/...'` | Run `npm install` to reinstall dependencies |
| Admin panel shows no collections | Ensure `payload.config.ts` imports and registers all collections in the `collections` array |
| `payload-types.ts` is outdated | Run `npm run generate:types` after changing any collection/global schema |
| Tailwind styles not loading | Ensure `@import "tailwindcss"` is only in `src/app/(frontend)/layout.tsx`, not in the `(payload)` layout |
| Media images show 404 | Run `npm run dev` — Payload auto-creates the `media/` directory on first upload |
| Seed script fails with duplicate errors | The seed script clears existing data before inserting. If it still fails, drop and recreate the database, then re-run migrations and seed |
| `GENERATE:Types` command not found | Run `npm run generate:types` (script name uses a colon, not a dash) |
| Frontend page shows no content | Check that the page slug in the CMS matches the `where: { slug: { equals: '...' } }` query in your route file |
| Lexical rich text renders empty | Ensure the rich text content has `root.type: "root"` (not `"block"`) and heading nodes have `version` property only once |
| `setup.sh` fails on `docker compose` | Ensure Docker Desktop is running. On Linux, you may need `sudo docker compose up -d` |

## Manual Setup (Without `setup.sh`)

If you prefer to set things up manually:

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (requires Docker)
docker compose up -d

# 3. Copy environment file and configure
cp .env.example .env

# 4. Run database migrations
npm run migrate

# 5. Seed the database
npm run seed --preset generic

# 6. Start the dev server
npm run dev
```

## Production Build

```bash
# Verify TypeScript and build the production bundle
npm run build
```

## License

MIT
