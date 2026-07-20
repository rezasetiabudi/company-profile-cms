export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Fetch services
  try {
    const services = await payload.find({
      collection: 'services',
      limit: 100,
    })

    for (const service of services.docs) {
      staticPages.push({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch (error) {
    console.error('Failed to fetch services for sitemap:', error)
  }

  // Fetch published articles
  try {
    const articles = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { type: { equals: 'artikel' } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 100,
    })

    for (const article of articles.docs) {
      staticPages.push({
        url: `${baseUrl}/artikel/${article.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.error('Failed to fetch articles for sitemap:', error)
  }

  // Fetch published blog posts
  try {
    const blogPosts = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { type: { equals: 'blog' } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 100,
    })

    for (const post of blogPosts.docs) {
      staticPages.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error)
  }

  return staticPages
}
