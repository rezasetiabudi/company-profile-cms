interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
  as?: 'div' | 'a'
}

export function Card({ children, className = '', href, as = 'div' }: CardProps) {
  const baseClasses = `bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200 ${className}`

  if (as === 'a' && href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    )
  }

  return <div className={baseClasses}>{children}</div>
}
