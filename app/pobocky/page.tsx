import type { Metadata } from 'next'
import BranchSelection from './BranchSelection'
import { siteConfig } from '@/app/lib/site'

export const metadata: Metadata = {
  title: 'Pobočky',
  description:
    'Vyberte si pobočku Autoškoly Martinec v Bystřici pod Hostýnem nebo Přerově. Moderní výuka řízení pro skupinu B.',
  openGraph: {
    title: `Pobočky | ${siteConfig.name}`,
    description:
      'Vyberte si pobočku v Bystřici pod Hostýnem nebo Přerově a začněte jezdit s Autoškolou Martinec.',
    url: `${siteConfig.url}/pobocky`,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
}

export default function PobockyPage() {
  return <BranchSelection />
}
