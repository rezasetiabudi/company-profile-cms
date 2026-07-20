import Link from 'next/link'

interface ServiceSidebarProps {
  contactLabel?: string
  contactDescription?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
}

export function ServiceSidebar({
  contactLabel = 'Interested in this service?',
  contactDescription = 'Contact us for more information and a quote tailored to your needs.',
  primaryButtonLabel = 'Contact Us',
  primaryButtonHref = '/services',
  secondaryButtonLabel = 'View Other Services',
  secondaryButtonHref = '/services',
}: ServiceSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-card">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">{contactLabel}</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{contactDescription}</p>
          <div className="space-y-3">
            <Link
              href={primaryButtonHref}
              className="block w-full text-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-accent-500/20"
            >
              {primaryButtonLabel}
            </Link>
            <Link
              href={secondaryButtonHref}
              className="block w-full text-center border-2 border-gray-200 text-gray-700 hover:border-accent-500 hover:text-accent-600 font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              {secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
