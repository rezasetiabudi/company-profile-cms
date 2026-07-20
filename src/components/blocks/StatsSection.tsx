interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  stats: Stat[]
  className?: string
}

export function StatsSection({ stats, className = '' }: StatsSectionProps) {
  if (!stats || stats.length === 0) return null

  return (
    <section className={`bg-white py-16 border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-2 group-hover:text-accent-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
