import React from 'react'

interface PageHeroProps {
  badgeText?: string
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
  variant?: 'full' | 'compact'
  className?: string
}

export function PageHero({
  badgeText,
  title,
  subtitle,
  breadcrumb,
  variant = 'full',
  className = '',
}: PageHeroProps) {
  const isCompact = variant === 'compact'

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        {!isCompact && (
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        )}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className={`relative ${isCompact ? 'max-w-3xl' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 ${isCompact ? 'py-16 md:py-20' : 'py-24 md:py-32'} text-center`}>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center space-x-2 text-primary-300 mb-6 justify-center">
            {breadcrumb.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <span className="text-primary-500">/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-primary-200 text-sm">{crumb.label}</span>
                ) : (
                  <a href={crumb.href} className="hover:text-accent-300 transition-colors text-sm">
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {badgeText && (
          <span className="inline-block text-accent-400 font-semibold text-sm uppercase tracking-wider mb-4">
            {badgeText}
          </span>
        )}

        <h1 className={`font-heading font-bold text-white tracking-tight ${isCompact ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-4xl md:text-5xl'}`}>
          {title}
        </h1>

        {subtitle && (
          <p className={`text-primary-200 mt-4 ${isCompact ? 'text-lg' : 'text-xl'} max-w-2xl mx-auto leading-relaxed`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
