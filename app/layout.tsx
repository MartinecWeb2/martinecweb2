import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Autoškola Martinec',
  description: 'Moderní autoškola s pobočkami v Bystřici pod Hostýnem a Přerově. Kvalitní výuka, individuální přístup a vysoká úspěšnost u zkoušek.',
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
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
