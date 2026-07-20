import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layanan Kami - PT Nusantara Fiber Konektifitas',
  description: 'Solusi konektivitas fiber optik terbaik untuk bisnis dan rumah tangga di Indonesia',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    sort: 'order',
  })

  const services = result.docs

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <span className="inline-block text-accent-400 font-semibold text-sm uppercase tracking-wider mb-4">Solusi Lengkap</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5 tracking-tight">Layanan Kami</h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">
            Solusi konektivitas terlengkap untuk memenuhi kebutuhan bisnis dan rumah tangga Anda
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Belum ada layanan yang tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200"
                >
                  <div className="p-8">
                    {service.icon && typeof service.icon === 'object' && service.icon !== null && (
                      <div className="w-16 h-16 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                        <img
                          src={service.icon.url || ''}
                          alt={service.icon.alt || service.title}
                          className="h-10 w-auto"
                        />
                      </div>
                    )}
                    {!service.icon && (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-6 text-white text-2xl font-bold">
                        {service.title.charAt(0)}
                      </div>
                    )}
                    <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-accent-700 transition-colors">{service.title}</h2>
                    <p className="text-gray-500 leading-relaxed text-sm mb-5">{service.shortDescription}</p>
                    <div className="flex items-center text-accent-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Selengkapnya
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

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Butuh Konsultasi?</h2>
          <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tim kami siap membantu Anda menemukan solusi konektivitas yang tepat
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  )
}
