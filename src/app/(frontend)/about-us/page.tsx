import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{}>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const payload = await getPayload({ config })

  try {
    const page = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })

    if (page.docs.length === 0) {
      return { title: 'Tentang Kami' }
    }

    return {
      title: `${page.docs[0].title} - PT Nusantara Froiber Konektifitas`,
    }
  } catch {
    return { title: 'Tentang Kami' }
  }
}

export default async function AboutUsPage({ params }: PageProps) {
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      notFound()
    }

    const page = result.docs[0]

    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        {page.heroImage && typeof page.heroImage === 'object' && page.heroImage !== null && (
          <div className="relative h-64 md:h-96">
            <img
              src={page.heroImage.url || ''}
              alt={page.heroImage.alt || page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/50 to-transparent flex items-end justify-center pb-16">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">{page.title}</h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {!page.heroImage && (
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8 tracking-tight">{page.title}</h1>
            )}

            {page.content && (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-accent-600 prose-strong:text-gray-900">
                <RichText content={page.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch about us page:', error)
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
