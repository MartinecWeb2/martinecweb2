import { branchData, type Branch } from '@/app/data/branches'
import { siteConfig } from '@/app/lib/site'
import type { ParsedReview, ReviewSummary } from '@/app/lib/reviews'

function postalAddress(address: string) {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: address,
    addressCountry: 'CZ',
  }
}

function aggregateRating(summary: ReviewSummary) {
  if (summary.reviewCount <= 0) return undefined

  return {
    '@type': 'AggregateRating' as const,
    ratingValue: summary.rating,
    bestRating: 5,
    worstRating: 1,
    reviewCount: summary.reviewCount,
  }
}

function reviewList(reviews: ParsedReview[]) {
  return reviews.slice(0, 3).map((review) => ({
    '@type': 'Review' as const,
    author: {
      '@type': 'Person' as const,
      name: review.name,
    },
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.text,
  }))
}

export function buildOrganizationSchema(summary: ReviewSummary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    aggregateRating: aggregateRating(summary),
    department: Object.entries(branchData).map(([id, branch]) =>
      buildDrivingSchoolSchema(id, branch, summary, false)
    ),
  }
}

export function buildDrivingSchoolSchema(
  id: string,
  branch: Branch,
  summary: ReviewSummary,
  includeReviews: boolean,
  featuredReviews: ParsedReview[] = []
) {
  const url = `${siteConfig.url}/pobocka/${id}`

  return {
    '@context': 'https://schema.org',
    '@type': 'DrivingSchool',
    '@id': `${url}#drivingschool`,
    name: `${siteConfig.name} – ${branch.name}`,
    url,
    image: `${siteConfig.url}${branch.hero}`,
    telephone: branch.phone,
    email: branch.email,
    address: postalAddress(branch.address),
    parentOrganization: {
      '@id': `${siteConfig.url}/#organization`,
    },
    ...(includeReviews
      ? {
          aggregateRating: aggregateRating(summary),
          review: reviewList(featuredReviews),
        }
      : {}),
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'cs-CZ',
  }
}
