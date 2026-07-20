import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { siteConfig } from '@/site.config'
import { RichText } from '@/components/blocks'

export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{}>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const payload = await getPayload({ config })

  try {
    const page = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })

    if (page.docs.length === 0) {
      return { title: 'About Us' }
    }

    return {
      title: `${page.docs[0].title} - ${siteConfig.name}`,
    }
  } catch {
    return { title: 'About Us' }
  }
}

export default async function AboutUsPage({ params }: PageProps) {
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      notFound()
    }

    const page = result.docs[0]

    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        {page.heroImage && typeof page.heroImage === 'object' && page.heroImage !== null && (
          <div className="relative h-64 md:h-96">
            <img
              src={page.heroImage.url || ''}
              alt={page.heroImage.alt || page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/50 to-transparent flex items-end justify-center pb-16">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                {page.title}
              </h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {!page.heroImage && (
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8 tracking-tight">
                {page.title}
              </h1>
            )}

            {page.content && <RichText content={page.content} />}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch about us page:', error)
    notFound()
  }
}
