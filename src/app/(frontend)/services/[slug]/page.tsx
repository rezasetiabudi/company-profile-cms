import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { siteConfig } from '@/site.config'
import { PageHero, ServiceSidebar, RichText } from '@/components/blocks'

export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return { title: 'Services' }
    }

    const service = result.docs[0]
    return {
      title: `${service.title} - ${siteConfig.name}`,
      description: service.shortDescription,
    }
  } catch {
    return { title: 'Services' }
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      notFound()
    }

    const service = result.docs[0]

    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <PageHero
          title={service.title}
          subtitle={service.shortDescription || undefined}
          variant="compact"
          breadcrumb={[
            { label: 'Services', href: '/services' },
            { label: service.title, href: '' },
          ]}
        />

        {/* Content with Sidebar */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {service.content && <RichText content={service.content} />}
              </div>

              {/* Sidebar CTA */}
              <ServiceSidebar />
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch service:', error)
    notFound()
  }
}
