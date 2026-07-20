import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'PT Nusantara Fiber Konektifitas',
  description: 'Penyedia layanan fiber core network, connectivity, dan retail internet terpercaya',
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

  const siteName = siteSettings?.siteName || 'PT Nusantara Fiber Konektifitas'
  const logo = siteSettings?.logo && typeof siteSettings.logo === 'object' && siteSettings.logo !== null
    ? siteSettings.logo.url
    : null

  return (
    <html lang="id">
      <body>
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
