import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  let landing: Record<string, any> | null = null
  let services: any[] = []
  let posts: any[] = []

  try {
    landing = await payload.findGlobal({ slug: 'landing' })

    // Fetch featured services
    if (landing.featuredServiceIds && landing.featuredServiceIds.length > 0) {
      const serviceIds = landing.featuredServiceIds.map((id: any) =>
        typeof id === 'object' ? id.id : id
      )
      const servicesResult = await payload.find({
        collection: 'services',
        where: { id: { in: serviceIds } },
        sort: 'order',
      })
      services = servicesResult.docs
    }

    // Fetch latest posts (mix of artikel and blog)
    const postsResult = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 4,
    })
    posts = postsResult.docs
  } catch (error) {
    console.error('Failed to fetch landing data:', error)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-950">
        {/* Background Image from CMS */}
        {landing?.heroImage && typeof landing.heroImage === 'object' && landing.heroImage !== null && (
          <div className="absolute inset-0 z-0">
            <img
              src={landing.heroImage.url || ''}
              alt={landing.heroImage.alt || 'Hero Background'}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-950/90 via-primary-900/80 to-primary-800/70" />
          </div>
        )}

        {/* Fallback Background if no image in CMS */}
        {(!landing?.heroImage || typeof landing.heroImage !== 'object') && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
        )}

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-400 mr-2 animate-pulse" />
              Fiber Core Network & Connectivity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
              {landing?.heroTitle || 'Koneksi Tanpa Batas'}
            </h1>
            {landing?.heroSubtitle && (
              <p className="text-lg md:text-xl text-primary-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                {landing.heroSubtitle}
              </p>
            )}
            {landing?.heroCtaLabel && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={landing.heroCtaLink || '/services'}
                  className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
                >
                  {landing.heroCtaLabel}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-100 hover:border-accent-500 hover:text-accent-300 font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {landing?.stats && landing.stats.length > 0 && (
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {landing.stats.map((stat: any, index: number) => (
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
      )}

      {/* Featured Services Section */}
      {services.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-3">Solusi Konektivitas</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Layanan Kami</h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Solusi konektivitas terbaik untuk bisnis dan rumah tangga Anda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
                >
                  <div className="p-7">
                    {service.icon && typeof service.icon === 'object' && service.icon !== null && (
                      <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-100 transition-colors">
                        <img
                          src={service.icon.url || ''}
                          alt={service.icon.alt || service.title}
                          className="h-8 w-auto"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-accent-700 transition-colors">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{service.shortDescription}</p>
                    <div className="mt-5 flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Selengkapnya
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
                href="/services"
                className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-700/20"
              >
                Lihat Semua Layanan
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      {posts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-accent-600 font-semibold text-sm uppercase tracking-wider mb-3">Informasi Terkini</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Artikel & Blog Terbaru</h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Informasi terkini seputar teknologi fiber optik dan konektivitas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/${post.type}/${post.slug}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-card-hover transition-all duration-300 border border-gray-100 hover:border-accent-200"
                >
                  {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage !== null && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.featuredImage.url || ''}
                        alt={post.featuredImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {!post.featuredImage && (
                    <div className="h-44 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center">
                      <span className="text-4xl text-white/30 font-bold">
                        {post.type === 'artikel' ? 'A' : 'B'}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        post.type === 'artikel'
                          ? 'bg-accent-100 text-accent-700'
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {post.type === 'artikel' ? 'Artikel' : 'Blog'}
                      </span>
                      {post.publishedAt && (
                        <span className="text-xs text-gray-400 ml-2">
                          {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-accent-700 transition-colors leading-snug">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Siap Memulai?</h2>
          <p className="text-lg text-primary-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hubungi kami sekarang untuk konsultasi gratis dan temukan solusi konektivitas terbaik untuk kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-100 hover:border-accent-500 hover:text-accent-300 font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
