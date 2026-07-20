import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return { title: 'Layanan' }
    }

    const service = result.docs[0]
    return {
      title: `${service.title} - PT Nusantara Fiber Konektifitas`,
      description: service.shortDescription,
    }
  } catch {
    return { title: 'Layanan' }
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      notFound()
    }

    const service = result.docs[0]

    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-center space-x-2 text-primary-300 mb-6">
              <Link href="/services" className="hover:text-accent-300 transition-colors text-sm">
                Layanan
              </Link>
              <span className="text-primary-500">/</span>
              <span className="text-primary-200 text-sm">{service.title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">{service.title}</h1>
            {service.shortDescription && (
              <p className="text-lg text-primary-200 mt-4 max-w-3xl leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </div>
        </section>

        {/* Content with Sidebar */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {service.content && (
                  <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-accent-600 prose-strong:text-gray-900">
                    <RichText content={service.content} />
                  </div>
                )}
              </div>

              {/* Sidebar CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-card">
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">Tertarik dengan layanan ini?</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      Hubungi kami untuk informasi lebih lanjut dan penawaran harga yang sesuai dengan kebutuhan Anda.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/services"
                        className="block w-full text-center bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-accent-500/20"
                      >
                        Hubungi Kami
                      </Link>
                      <Link
                        href="/services"
                        className="block w-full text-center border-2 border-gray-200 text-gray-700 hover:border-accent-500 hover:text-accent-600 font-semibold px-6 py-3.5 rounded-xl transition-all"
                      >
                        Lihat Layanan Lain
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch service:', error)
    notFound()
  }
}

// Simple RichText renderer
function RichText({ content }: { content: any }) {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return <>{renderNodes(content.root.children)}</>
}

function renderNodes(nodes: any[]): React.ReactNode[] {
  return nodes.map((node, index) => {
    if (node.type === 'heading') {
      const Tag = node.tag || 'h2'
      return (
        <Tag key={index} className="font-heading font-semibold text-gray-900 mt-8 mb-4">
          {renderChildren(node.children)}
        </Tag>
      )
    }

    if (node.type === 'paragraph') {
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {renderChildren(node.children)}
        </p>
      )
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="list-disc list-inside text-gray-600 mb-4 space-y-1">
          {renderChildren(node.children)}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="mb-1">
          {renderChildren(node.children)}
        </li>
      )
    }

    return null
  })
}

function renderChildren(children: any[]): React.ReactNode[] {
  if (!children) return []

  return children.map((child, index) => {
    if (child.type === 'text') {
      let text: React.ReactNode = child.text

      if (child.format && child.format.includes(1)) {
        text = <strong key={index}>{text}</strong>
      }
      if (child.format && child.format.includes(2)) {
        text = <em key={index}>{text}</em>
      }

      return <span key={index}>{text}</span>
    }

    if (child.type === 'heading') {
      const Tag = child.tag || 'h2'
      return (
        <Tag key={index} className="font-heading font-semibold text-gray-900 mt-6 mb-3">
          {renderChildren(child.children)}
        </Tag>
      )
    }

    if (child.type === 'paragraph') {
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {renderChildren(child.children)}
        </p>
      )
    }

    return null
  })
}
