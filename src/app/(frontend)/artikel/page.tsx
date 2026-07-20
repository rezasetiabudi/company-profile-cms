import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel - PT Nusantara Fiber Konektifitas',
  description: 'Artikel dan informasi terkini seputar teknologi fiber optik dan konektivitas',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <span className="inline-block text-accent-400 font-semibold text-sm uppercase tracking-wider mb-4">Informasi Terkini</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5 tracking-tight">Artikel</h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">
            Informasi dan artikel terkini seputar teknologi fiber optik dan konektivitas
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Belum ada artikel yang tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/artikel/${post.slug}`}
                  className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
                >
                  {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage !== null && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featuredImage.url || ''}
                        alt={post.featuredImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {!post.featuredImage && (
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
                    <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent-700 transition-colors leading-snug">{post.title}</h2>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Baca Selengkapnya
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
