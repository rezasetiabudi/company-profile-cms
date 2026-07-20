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
npm run seed --preset hospital
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
