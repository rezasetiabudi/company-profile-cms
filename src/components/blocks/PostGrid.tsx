import Link from 'next/link'

interface Post {
  id: number
  title: string
  slug: string
  type: 'artikel' | 'blog'
  excerpt?: string | null
  publishedAt?: string | null
  featuredImage?: { url: string; alt: string } | null
}

interface PostGridProps {
  posts: Post[]
  title?: string
  subtitle?: string
  sectionLabel?: string
  className?: string
  columns?: 2 | 3 | 4
}

export function PostGrid({
  posts,
  title = 'Latest Articles',
  subtitle = 'News, insights, and updates',
  sectionLabel = 'Latest Updates',
  className = '',
  columns = 4,
}: PostGridProps) {
  if (posts.length === 0) return null

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <section className={`bg-white py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-3">
            {sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className={`grid ${gridClass} gap-6`}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.type}/${post.slug}`}
              className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-accent-200"
            >
              {post.featuredImage && post.featuredImage.url ? (
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-44 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                  <span className="text-4xl text-white/30 font-bold">
                    {post.type === 'artikel' ? 'A' : 'B'}
                  </span>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      post.type === 'artikel'
                        ? 'bg-accent-100 text-accent-700'
                        : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    {post.type === 'artikel' ? 'Article' : 'Blog'}
                  </span>
                  {post.publishedAt && (
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-accent-700 transition-colors leading-snug">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
