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
      collection: 'posts',
      where: {
        and: [
          { slug: { equals: slug } },
          { type: { equals: 'artikel' } },
        ],
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return { title: 'Artikel' }
    }

    const post = result.docs[0]
    const seoTitle = post.seo?.metaTitle || post.title
    const seoDescription = post.seo?.metaDescription || post.excerpt

    return {
      title: `${seoTitle} - PT Nusantara Fiber Konektifitas`,
      description: seoDescription || undefined,
    }
  } catch {
    return { title: 'Artikel' }
  }
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { slug: { equals: slug } },
          { type: { equals: 'artikel' } },
        ],
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      notFound()
    }

    const post = result.docs[0]

    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-center space-x-2 text-primary-300 mb-6">
              <Link href="/artikel" className="hover:text-accent-300 transition-colors text-sm">
                Artikel
              </Link>
              <span className="text-primary-500">/</span>
              <span className="text-primary-200 text-sm">{post.title}</span>
            </div>
            {post.publishedAt && (
              <div className="text-primary-300 mb-4 text-sm">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">{post.title}</h1>
          </div>
        </section>

        {/* Content */}
        <article className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage !== null && (
              <div className="mb-10 rounded-xl overflow-hidden shadow-card">
                <img
                  src={post.featuredImage.url || ''}
                  alt={post.featuredImage.alt || post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {post.content && (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-accent-600 prose-strong:text-gray-900">
                <RichText content={post.content} />
              </div>
            )}
          </div>
        </article>

        {/* Back to Articles */}
        <section className="bg-gray-50 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/artikel"
              className="inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Artikel
            </Link>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch artikel:', error)
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
