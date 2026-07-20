import { getPayload } from 'payload'
import config from '@payload-config'
import { siteConfig } from '@/site.config'
import { Hero, StatsSection, ServiceGrid, PostGrid, CTASection } from '@/components/blocks'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  let landing: Record<string, any> | null = null
  let services: any[] = []
  let posts: any[] = []

  try {
    landing = await payload.findGlobal({ slug: 'landing' })

    // Fetch featured services
    if (landing.featuredServiceIds && landing.featuredServiceIds.length > 0) {
      const serviceIds = landing.featuredServiceIds.map((id: any) =>
        typeof id === 'object' ? id.id : id
      )
      const servicesResult = await payload.find({
        collection: 'services',
        where: { id: { in: serviceIds } },
        sort: 'order',
      })
      services = servicesResult.docs
    }

    // Fetch latest posts (mix of artikel and blog)
    const postsResult = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 4,
    })
    posts = postsResult.docs
  } catch (error) {
    console.error('Failed to fetch landing data:', error)
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero
        badgeText={siteConfig.hero.badgeText}
        title={landing?.heroTitle || siteConfig.tagline}
        subtitle={landing?.heroSubtitle || undefined}
        backgroundImage={
          landing?.heroImage && typeof landing.heroImage === 'object'
            ? landing.heroImage
            : null
        }
        ctaPrimary={
          landing?.heroCtaLabel
            ? { label: landing.heroCtaLabel, href: landing.heroCtaLink || '/services' }
            : undefined
        }
        ctaSecondary={{ label: 'Learn More', href: '/about-us' }}
      />

      {/* Stats Section */}
      {landing?.stats && landing.stats.length > 0 && (
        <StatsSection stats={landing.stats} />
      )}

      {/* Featured Services Section */}
      {services.length > 0 && (
        <ServiceGrid
          services={services}
          title={siteConfig.landing.servicesSectionTitle}
          subtitle={siteConfig.landing.servicesSectionSubtitle}
          sectionLabel="Solutions"
          readMoreLabel="Read More"
          viewAllLabel="View All Services"
        />
      )}

      {/* Latest Posts Section */}
      {posts.length > 0 && (
        <PostGrid
          posts={posts}
          title={siteConfig.landing.postsSectionTitle}
          subtitle={siteConfig.landing.postsSectionSubtitle}
          sectionLabel="Latest Updates"
          columns={4}
        />
      )}

      {/* CTA Section */}
      <CTASection
        title={siteConfig.landing.ctaTitle}
        description={siteConfig.landing.ctaDescription}
        primaryButton={{ label: 'Contact Us', href: '/services' }}
        secondaryButton={{ label: 'View Services', href: '/services' }}
      />
    </div>
  )
}
