import type { Metadata } from 'next'
import { branchData } from '@/app/data/branches'
import { siteConfig } from '@/app/lib/site'
import { reviewsData } from '@/app/lib/reviews'
import { buildDrivingSchoolSchema } from '@/app/lib/schema'
import JsonLd from '@/app/components/JsonLd'
import BranchPageClient from './BranchPageClient'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const branch = branchData[id]

  if (!branch) {
    return {
      title: 'Pobočka nenalezena',
      robots: { index: false, follow: false },
    }
  }

  const description = `${branch.description} Kurzy skupiny B, kondiční jízdy a vrácení řidičského průkazu.`

  return {
    title: branch.name,
    description,
    openGraph: {
      title: `${branch.name} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/pobocka/${id}`,
      images: [
        {
          url: branch.hero,
          width: 1200,
          height: 630,
          alt: branch.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${branch.name} | ${siteConfig.name}`,
      description,
      images: [branch.hero],
    },
  }
}

export function generateStaticParams() {
  return Object.keys(branchData).map((id) => ({ id }))
}

export default async function BranchPage({ params }: PageProps) {
  const { id } = await params
  const { summary, featured } = reviewsData

  return (
    <>
      {branchData[id] && (
        <JsonLd
          data={buildDrivingSchoolSchema(id, branchData[id], summary, true, featured)}
        />
      )}
      <BranchPageClient
        branchId={id}
        reviewSummary={summary}
        featuredReviews={featured}
      />
    </>
  )
}
