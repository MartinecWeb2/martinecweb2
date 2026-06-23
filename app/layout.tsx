import type { Metadata } from 'next'
import './globals.css'
import JsonLd from './components/JsonLd'
import { reviewsData } from './lib/reviews'
import { buildOrganizationSchema, buildWebSiteSchema } from './lib/schema'
import { siteConfig } from './lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: '/images/loga/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/loga/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { summary } = reviewsData

  return (
    <html lang="cs">
      <body>
        <JsonLd
          data={[buildWebSiteSchema(), buildOrganizationSchema(summary)]}
        />
        {children}
      </body>
    </html>
  )
}
