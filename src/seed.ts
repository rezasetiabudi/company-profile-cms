import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  let adminUser
  try {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@nusantarafiber.co.id',
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
      data: {
        siteName: 'PT Nusantara Fiber Konektifitas',
        tagline: 'Koneksi Tanpa Batas, Masa Depan Tanpa Kendala',
        phone: '+62 21 5555 0123',
        email: 'info@nusantarafiber.co.id',
        address: 'Jl. TB Simatupang No. 88, Jakarta Selatan, DKI Jakarta 12430, Indonesia',
        socialMedia: [
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/nusantara-fiber' },
          { platform: 'Instagram', url: 'https://instagram.com/nusantara.fiber' },
          { platform: 'Facebook', url: 'https://facebook.com/nusantarafiber' },
        ],
      },
    })
    console.log('✓ SiteSettings created')
  } catch (error: any) {
    console.log('⚠ SiteSettings:', error.message)
  }

  // Create Services
  const servicesData = [
    {
      title: 'Fiber to the Home (FTTH)',
      slug: 'fiber-to-the-home',
      shortDescription: 'Koneksi internet fiber optik langsung ke rumah Anda dengan kecepatan hingga 1 Gbps.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Fiber to the Home (FTTH)', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'FTTH adalah solusi koneksi internet terbaik untuk rumah tangga. Dengan fiber optik langsung ke hunian Anda, nikmati kecepatan internet symmetrical hingga 1 Gbps tanpa batasan bandwidth.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Cocok untuk streaming 4K, gaming online, work from home, dan smart home ecosystem Anda.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      order: 1,
    },
    {
      title: 'Dedicated Internet Access (DIA)',
      slug: 'dedicated-internet-access',
      shortDescription: 'Koneksi internet dedicated untuk bisnis dengan SLA 99.9% uptime guarantee.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Dedicated Internet Access', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'DIA memberikan koneksi internet dedicated yang tidak dibagi dengan pengguna lain. Bandwidth symmetrical dari 10 Mbps hingga 10 Gbps dengan SLA 99.9% uptime.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Ideal untuk perusahaan yang membutuhkan koneksi stabil untuk operasional kritis, data center, dan cloud computing.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      order: 2,
    },
    {
      title: 'Metro Ethernet',
      slug: 'metro-ethernet',
      shortDescription: 'Solusi konektivitas antar cabang perusahaan dengan performa tinggi dan latency rendah.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Metro Ethernet', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Metro Ethernet menghubungkan seluruh cabang perusahaan Anda dalam satu jaringan private. Dengan bandwidth hingga 10 Gbps dan latency rendah, data antar cabang mengalir lancar.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Fitur: VLAN isolation, QoS prioritization, bandwidth on-demand, dan monitoring real-time melalui customer portal.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      order: 3,
    },
    {
      title: 'Data Center Interconnect (DCI)',
      slug: 'data-center-interconnect',
      shortDescription: 'Koneksi high-bandwidth antar data center untuk replikasi data dan disaster recovery.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Data Center Interconnect', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'DCI menyediakan koneksi dedicated antar data center dengan kapasitas hingga 100 Gbps. Mendukung replikasi data real-time, disaster recovery, dan load balancing.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Tersedia di semua lokasi data center kami di Jakarta, Surabaya, dan Bandung dengan redundancy path ganda.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      order: 4,
    },
    {
      title: 'Managed Wi-Fi Retail',
      slug: 'managed-wi-fi-retail',
      shortDescription: 'Solusi Wi-Fi managed untuk retail, kafe, hotel, dan ruang publik dengan captive portal.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Managed Wi-Fi Retail', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Solusi Wi-Fi managed end-to-end untuk bisnis retail Anda. Dari perencanaan, instalasi, hingga monitoring 24/7 — kami tangani semuanya.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Fitur: captive portal dengan branding, analytics pengunjung, bandwidth management, dan dukungan teknis 24/7.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      order: 5,
    },
  ]

  const createdServices = []
  for (const serviceData of servicesData) {
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
  const categoriesData = [
    { name: 'Teknologi', slug: 'teknologi' },
    { name: 'Perusahaan', slug: 'perusahaan' },
  ]

  const createdCategories = []
  for (const categoryData of categoriesData) {
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
  const postsData = [
    {
      title: 'Perkembangan Fiber Optik di Indonesia 2024',
      slug: 'perkembangan-fiber-optik-indonesia-2024',
      type: 'artikel' as const,
      excerpt: 'Indonesia mengalami pertumbuhan pesat dalam infrastruktur fiber optik selama tahun 2024.',
      category: createdCategories[0]?.id,
      status: 'published' as const,
      publishedAt: new Date('2024-01-15').toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Perkembangan Fiber Optik di Indonesia', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Indonesia telah mengalami pertumbuhan yang signifikan dalam infrastruktur fiber optik selama tahun 2024. Dengan dukungan pemerintah melalui program Palapa Ring dan berbagai inisiatif digital lainnya, cakupan jaringan fiber optik di Indonesia semakin luas.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Menurut data Kementerian Komunikasi dan Digital, panjang kabel fiber optik nasional telah mencapai lebih dari 500.000 km pada akhir tahun 2024, meningkat 25% dari tahun sebelumnya.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'Memahami Perbedaan FTTH dan DIA untuk Bisnis',
      slug: 'memahami-perbedaan-ftth-dia-bisnis',
      type: 'artikel' as const,
      excerpt: 'Panduan lengkap memilih antara Fiber to the Home dan Dedicated Internet Access untuk kebutuhan bisnis Anda.',
      category: createdCategories[0]?.id,
      status: 'published' as const,
      publishedAt: new Date('2024-02-20').toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'FTTH vs DIA: Mana yang Cocok untuk Bisnis?', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Dalam memilih solusi konektivitas untuk bisnis, penting untuk memahami perbedaan antara FTTH (Fiber to the Home) dan DIA (Dedicated Internet Access). Keduanya memiliki karakteristik yang berbeda dan cocok untuk use case yang berbeda pula.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'PT Nusantara Fiber Resmi Beroperasi di Surabaya',
      slug: 'pt-nusantara-fiber-resmi-beroperasi-surabaya',
      type: 'blog' as const,
      excerpt: 'Kami dengan bangga mengumumkan perluasan layanan ke wilayah Jawa Timur.',
      category: createdCategories[1]?.id,
      status: 'published' as const,
      publishedAt: new Date('2024-03-10').toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: 'Ekspansi ke Surabaya', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'PT Nusantara Fiber Konektifitas dengan bangga mengumumkan perluasan layanan kami ke kota Surabaya dan sekitarnya. Dengan hadirnya jaringan fiber optik kami di Jawa Timur, kini bisnis dan rumah tangga di Surabaya dapat menikmati koneksi internet berkualitas tinggi.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      title: 'Tips Memilih ISP untuk Kantor Baru Anda',
      slug: 'tips-memilih-isp-kantor-baru',
      type: 'blog' as const,
      excerpt: '5 hal penting yang perlu dipertimbangkan saat memilih penyedia layanan internet untuk kantor.',
      category: createdCategories[1]?.id,
      status: 'published' as const,
      publishedAt: new Date('2024-04-05').toISOString(),
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              version: 1,
              children: [{ type: 'text', text: '5 Tips Memilih ISP untuk Kantor', detail: 0, format: 1, mode: 'normal', style: '' }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Memilih penyedia layanan internet (ISP) yang tepat untuk kantor baru adalah keputusan penting yang dapat mempengaruhi produktivitas seluruh tim. Berikut adalah 5 hal yang perlu Anda pertimbangkan.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ]

  for (const postData of postsData) {
    try {
      await payload.create({
        collection: 'posts',
        data: postData,
      })
      console.log(`✓ Post created: ${postData.title}`)
    } catch (error: any) {
      console.log(`⚠ Post "${postData.title}": ${error.message}`)
    }
  }

  // Create About Us page
  try {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Tentang Kami',
        slug: 'about-us',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                version: 1,
                children: [{ type: 'text', text: 'Tentang PT Nusantara Fiber Konektifitas', detail: 0, format: 1, mode: 'normal', style: '' }],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                version: 1,
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'PT Nusantara Fiber Konektifitas adalah perusahaan penyedia layanan konektivitas terkemuka di Indonesia. Didirikan pada tahun 2020, kami berkomitmen untuk menghadirkan akses internet berkualitas tinggi ke seluruh pelosok Indonesia.',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
              },
              {
                type: 'heading',
                version: 1,
                children: [{ type: 'text', text: 'Visi Kami', detail: 0, format: 1, mode: 'normal', style: '' }],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Menjadi penyedia layanan konektivitas terdepan di Indonesia yang menghubungkan setiap bisnis dan rumah tangga dengan dunia digital.',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
              },
              {
                type: 'heading',
                version: 1,
                children: [{ type: 'text', text: 'Misi Kami', detail: 0, format: 1, mode: 'normal', style: '' }],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: '1. Menyediakan infrastruktur fiber optik berkualitas tinggi\n2. Memberikan layanan dengan SLA terbaik di industri\n3. Mendukung transformasi digital Indonesia\n4. Menjadi mitra terpercaya bagi bisnis dan pemerintah',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    })
    console.log('✓ About Us page created')
  } catch (error: any) {
    console.log(`⚠ About Us page: ${error.message}`)
  }

  // Update Landing with featured services
  try {
    await payload.updateGlobal({
      slug: 'landing',
      data: {
        heroTitle: 'Koneksi Tanpa Batas untuk Masa Depan Indonesia',
        heroSubtitle: 'PT Nusantara Fiber Konektifitas menyediakan solusi konektivitas fiber optik terbaik untuk bisnis dan rumah tangga di seluruh Indonesia.',
        heroCtaLabel: 'Lihat Layanan Kami',
        heroCtaLink: '/services',
        stats: [
          { label: 'Titik POP', value: '150+' },
          { label: 'Km Kabel Fiber', value: '50,000+' },
          { label: 'Pelanggan Aktif', value: '100,000+' },
          { label: 'Kota Terjangkau', value: '25+' },
        ],
        featuredServiceIds: createdServices.map((s) => s.id),
      },
    })
    console.log('✓ Landing page data created')
  } catch (error: any) {
    console.log(`⚠ Landing: ${error.message}`)
  }

  console.log('\n✓ Seed completed successfully!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
