import { getPayload } from 'payload'
import config from './payload.config'
import { getPreset, listPresets } from './seed/presets'

/**
 * Seed script with preset support.
 *
 * Usage:
 *   pnpm seed                          # seeds with the "generic" preset
 *   PRESET=generic pnpm seed           # seeds with the generic preset
 *   PRESET=hospital pnpm seed          # seeds with the hospital preset
 *   PRESET=construction pnpm seed      # seeds with the construction preset
 *
 * List available presets:
 *   PRESET=list pnpm seed
 */

async function seed() {
  const payload = await getPayload({ config })

  const presetName = process.env.PRESET || 'generic'

  // If PRESET=list, print available presets and exit
  if (presetName === 'list') {
    console.log('Available presets:\n')
    for (const p of listPresets()) {
      console.log(`  ${p.name.padEnd(15)} ${p.label}`)
      console.log(`  ${' '.repeat(15)} ${p.description}\n`)
    }
    process.exit(0)
  }

  const preset = getPreset(presetName)
  console.log(`Seeding database with preset: ${preset.label} (${preset.name})\n`)

  // Create admin user
  let adminUser: any
  try {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@demo.com',
        password: 'admin123',
        name: 'Admin',
      },
    })
    console.log('✓ Admin user created')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      const users = await payload.find({ collection: 'users', limit: 1 })
      adminUser = users.docs[0]
      console.log('✓ Admin user already exists')
    } else {
      throw error
    }
  }

  // Create SiteSettings
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: preset.siteSettings,
    })
    console.log('✓ SiteSettings created')
  } catch (error: any) {
    console.log(`⚠ SiteSettings: ${error.message}`)
  }

  // Create Services
  const createdServices = []
  for (const serviceData of preset.services) {
    try {
      const service = await payload.create({
        collection: 'services',
        data: serviceData,
      })
      createdServices.push(service)
      console.log(`✓ Service created: ${serviceData.title}`)
    } catch (error: any) {
      console.log(`⚠ Service "${serviceData.title}": ${error.message}`)
    }
  }

  // Create Categories
  const createdCategories = []
  for (const categoryData of preset.categories) {
    try {
      const category = await payload.create({
        collection: 'categories',
        data: categoryData,
      })
      createdCategories.push(category)
      console.log(`✓ Category created: ${categoryData.name}`)
    } catch (error: any) {
      console.log(`⚠ Category "${categoryData.name}": ${error.message}`)
    }
  }

  // Create Posts
  for (const postData of preset.posts) {
    // Resolve category reference if category slug is provided
    const data = { ...postData }
    if (typeof data.category === 'string') {
      const cat = createdCategories.find((c) => c.slug === data.category)
      if (cat) {
        data.category = cat.id
      } else {
        delete data.category
      }
    }

    try {
      await payload.create({
        collection: 'posts',
        data,
      })
      console.log(`✓ Post created: ${postData.title}`)
    } catch (error: any) {
      console.log(`⚠ Post "${postData.title}": ${error.message}`)
    }
  }

  // Create Pages
  for (const pageData of preset.pages) {
    try {
      await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log(`✓ Page created: ${pageData.title}`)
    } catch (error: any) {
      console.log(`⚠ Page "${pageData.title}": ${error.message}`)
    }
  }

  // Update Landing global
  try {
    await payload.updateGlobal({
      slug: 'landing',
      data: {
        ...preset.landing,
        featuredServiceIds: createdServices.map((s) => s.id),
      },
    })
    console.log('✓ Landing page data created')
  } catch (error: any) {
    console.log(`⚠ Landing: ${error.message}`)
  }

  console.log(`\n✓ Seed completed successfully with preset "${presetName}"!`)
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
