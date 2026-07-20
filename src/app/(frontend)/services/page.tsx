import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { siteConfig } from '@/site.config'
import { PageHero, EmptyState, CTASection } from '@/components/blocks'

export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Services - ${siteConfig.name}`,
  description: 'Professional solutions for your business and personal needs',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    sort: 'order',
  })

  const services = result.docs

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <PageHero
        badgeText="Complete Solutions"
        title="Our Services"
        subtitle="Comprehensive solutions to meet your business and personal needs"
      />

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <EmptyState message="No services available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
                >
                  <div className="p-8">
                    {service.icon && typeof service.icon === 'object' && service.icon !== null ? (
                      <div className="w-16 h-16 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                        <img
                          src={service.icon.url || ''}
                          alt={service.icon.alt || service.title}
                          className="h-10 w-auto"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-6 text-white text-2xl font-bold">
                        {service.title.charAt(0)}
                      </div>
                    )}
                    <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-accent-700 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-sm mb-5">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Need Consultation?"
        description="Our team is ready to help you find the right solution"
        primaryButton={{ label: 'Contact Us', href: '/services' }}
      />
    </div>
  )
}
