import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { siteConfig } from '@/site.config'
import { generateColorScale } from '@/lib/color-utils'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config })

  let siteSettings: Record<string, any> | null = null
  try {
    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
  }

  const siteName = siteSettings?.siteName || siteConfig.name
  const logo = siteSettings?.logo && typeof siteSettings.logo === 'object' && siteSettings.logo !== null
    ? siteSettings.logo.url
    : null

  // Generate color scales from config hex values for CSS custom properties
  const primaryScale = generateColorScale(siteConfig.theme.colorPrimary)
  const accentScale = generateColorScale(siteConfig.theme.colorAccent)

  const cssVariables = {
    ...Object.fromEntries(
      Object.entries(primaryScale).map(([stop, value]) => [`--color-primary-${stop}`, value] as const)
    ),
    ...Object.fromEntries(
      Object.entries(accentScale).map(([stop, value]) => [`--color-accent-${stop}`, value] as const)
    ),
  }

  return (
    <html lang="id">
      <body style={cssVariables as React.CSSProperties}>
        <div className="min-h-screen flex flex-col">
          <Navbar siteName={siteName} logo={logo} />
          <main className="flex-grow">{children}</main>
          <Footer
            siteName={siteName}
            phone={siteSettings?.phone}
            email={siteSettings?.email}
            address={siteSettings?.address}
            socialMedia={siteSettings?.socialMedia}
          />
        </div>
      </body>
    </html>
  )
}
