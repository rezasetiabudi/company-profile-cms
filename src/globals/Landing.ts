import type { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
  slug: 'landing',
  admin: {
    livePreview: {
      url: 'http://localhost:3000'
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroCtaLabel',
      type: 'text',
    },
    {
      name: 'heroCtaLink',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredServiceIds',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
}
