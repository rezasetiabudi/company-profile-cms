import Link from 'next/link'

interface Service {
  id: number
  title: string
  shortDescription: string
  slug: string
  icon?: { url: string; alt: string } | null
}

interface ServiceGridProps {
  services: Service[]
  title?: string
  subtitle?: string
  sectionLabel?: string
  viewAllHref?: string
  viewAllLabel?: string
  readMoreLabel?: string
  className?: string
}

export function ServiceGrid({
  services,
  title = 'Our Services',
  subtitle = 'Professional solutions for your needs',
  sectionLabel = 'Solutions',
  viewAllHref = '/services',
  viewAllLabel = 'View All Services',
  readMoreLabel = 'Read More',
  className = '',
}: ServiceGridProps) {
  if (services.length === 0) return null

  return (
    <section className={`bg-gray-50 py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-3">
            {sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
            >
              <div className="p-7">
                {service.icon && service.icon.url ? (
                  <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-100 transition-colors">
                    <img
                      src={service.icon.url}
                      alt={service.icon.alt || service.title}
                      className="h-8 w-auto"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-5 text-white text-xl font-bold">
                    {service.title.charAt(0)}
                  </div>
                )}
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-accent-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{service.shortDescription}</p>
                <div className="mt-5 flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  {readMoreLabel}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={viewAllHref}
            className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-700/20"
          >
            {viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
