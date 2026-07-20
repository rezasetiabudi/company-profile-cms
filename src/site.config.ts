/**
 * Site Configuration — single source of truth for all configurable values.
 *
 * This file reads from environment variables with sensible defaults.
 * A new deployment of this template can restyle itself purely through .env
 * — no component code changes required.
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Your Company Name',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE ?? 'Your tagline goes here',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Professional company profile website',
  theme: {
    colorPrimary: process.env.NEXT_PUBLIC_COLOR_PRIMARY ?? '#0B2545',
    colorAccent: process.env.NEXT_PUBLIC_COLOR_ACCENT ?? '#2CB1BC',
  },
  hero: {
    badgeText: process.env.NEXT_PUBLIC_HERO_BADGE ?? 'Welcome',
  },
  landing: {
    servicesSectionTitle: process.env.NEXT_PUBLIC_SERVICES_TITLE ?? 'Our Services',
    servicesSectionSubtitle: process.env.NEXT_PUBLIC_SERVICES_SUBTITLE ?? 'Professional solutions for your needs',
    postsSectionTitle: process.env.NEXT_PUBLIC_POSTS_TITLE ?? 'Latest Articles',
    postsSectionSubtitle: process.env.NEXT_PUBLIC_POSTS_SUBTITLE ?? 'News, insights, and updates',
    ctaTitle: process.env.NEXT_PUBLIC_CTA_TITLE ?? 'Ready to Get Started?',
    ctaDescription: process.env.NEXT_PUBLIC_CTA_DESCRIPTION ?? 'Contact us today for a free consultation and discover the best solutions for your needs.',
  },
}
