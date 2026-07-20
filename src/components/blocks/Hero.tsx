import Link from 'next/link'

interface HeroProps {
  badgeText?: string
  title: string
  subtitle?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  backgroundImage?: { url: string; alt: string } | null
  className?: string
}

export function Hero({
  badgeText,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  className = '',
}: HeroProps) {
  return (
    <section className={`relative overflow-hidden bg-primary-950 ${className}`}>
      {/* Background Image from CMS */}
      {backgroundImage && backgroundImage.url && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage.url}
            alt={backgroundImage.alt || 'Hero Background'}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/90 via-primary-900/80 to-primary-800/70" />
        </div>
      )}

      {/* Fallback Background */}
      {!backgroundImage?.url && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="text-center max-w-4xl mx-auto">
          {badgeText && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-400 mr-2 animate-pulse" />
              {badgeText}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-primary-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaPrimary && (
                <Link
                  href={ctaPrimary.href}
                  className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
                >
                  {ctaPrimary.label}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-100 hover:border-accent-500 hover:text-accent-300 font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
