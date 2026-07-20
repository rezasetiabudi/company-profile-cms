import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { siteConfig } from '@/site.config'
import { PageHero, EmptyState } from '@/components/blocks'

export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Articles - ${siteConfig.name}`,
  description: 'Latest articles and information from our company',
}

export default async function ArtikelPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { type: { equals: 'artikel' } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    limit: 10,
  })

  const posts = result.docs

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <PageHero
        badgeText="Latest Updates"
        title="Articles"
        subtitle={`Latest information and articles from ${siteConfig.name}`}
      />

      {/* Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState message="No articles available yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/artikel/${post.slug}`}
                  className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
                >
                  {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage !== null ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featuredImage.url || ''}
                        alt={post.featuredImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                      <span className="text-4xl text-white/20 font-bold">A</span>
                    </div>
                  )}
                  <div className="p-6">
                    {post.publishedAt && (
                      <div className="text-sm text-gray-400 mb-3">
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                    <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
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
    </div>
  )
}
