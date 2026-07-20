import Link from 'next/link'

interface CTASectionProps {
  title: string
  description: string
  primaryButton?: { label: string; href: string }
  secondaryButton?: { label: string; href: string }
  className?: string
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  className = '',
}: CTASectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 ${className}`}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto leading-relaxed">{description}</p>
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
              >
                {primaryButton.label}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-100 hover:border-accent-500 hover:text-accent-300 font-semibold px-8 py-4 rounded-xl transition-all"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
