/**
 * Type definitions for the seed preset system.
 */

export interface LexicalRoot {
  type: 'root'
  children: LexicalNode[]
  direction: 'ltr' | 'rtl' | null
  format: ''
  indent: 0
  version: 1
}

export interface LexicalNode {
  type: string
  version?: number
  children?: LexicalNode[]
  text?: string
  format?: string | number
  tag?: string
  indent?: number
  direction?: 'ltr' | 'rtl' | null
  detail?: number
  mode?: string
  style?: string
  textFormat?: number
  textStyle?: string
  listType?: string
}

export interface RichTextField {
  root: LexicalRoot
}

export interface SeedSiteSettings {
  siteName: string
  tagline: string
  phone: string
  email: string
  address: string
  socialMedia: Array<{ platform: string; url: string }>
}

export interface SeedService {
  title: string
  slug: string
  shortDescription: string
  content: RichTextField
  order: number
}

export interface SeedCategory {
  name: string
  slug: string
}

export interface SeedPost {
  title: string
  slug: string
  type: 'artikel' | 'blog'
  excerpt: string
  status: 'published' | 'draft'
  publishedAt: string
  content: RichTextField
  category?: string | number
}

export interface SeedPage {
  title: string
  slug: string
  content: RichTextField
  heroImage?: string | number
}

export interface SeedStats {
  label: string
  value: string
}

export interface SeedLanding {
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroCtaLink: string
  stats: SeedStats[]
  heroImage?: string | number
}

export interface SeedPreset {
  name: string
  label: string
  description: string
  siteSettings: SeedSiteSettings
  services: SeedService[]
  categories: SeedCategory[]
  posts: SeedPost[]
  pages: SeedPage[]
  landing: SeedLanding
}
