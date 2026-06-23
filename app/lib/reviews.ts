import reviewsJson from '@/public/recenze1.json'

export interface ReviewSummary {
  rating: number
  reviewCount: number
  placeId?: string
  googleReviewsUrl?: string
}

export interface ParsedReview {
  name: string
  text: string
  rating: number
  image?: string
}

interface RawReviewRow {
  author_title?: string
  review_text?: string
  rating?: number
  author_image?: string
  reviews?: number
  place_id?: string
  location_link?: string
}

const rawData = reviewsJson as RawReviewRow[]

export function googleWriteReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

function dedupeKey(review: ParsedReview) {
  return `${review.name}|${review.text.slice(0, 60)}`
}

export function parseReviewsJson(data: RawReviewRow[] = rawData) {
  const first = data[0]
  const cleaned: ParsedReview[] = data
    .filter((row) => row.review_text && row.author_title)
    .map((row) => ({
      name: row.author_title as string,
      text: (row.review_text as string).trim(),
      rating: typeof row.rating === 'number' ? row.rating : 5,
      image: row.author_image,
    }))

  const summary: ReviewSummary = {
    rating: typeof first?.rating === 'number' ? first.rating : 5,
    reviewCount:
      typeof first?.reviews === 'number' ? first.reviews : cleaned.length,
    placeId: first?.place_id,
    googleReviewsUrl: first?.location_link,
  }

  const seen = new Set<string>()
  const featured = cleaned
    .filter((review) => review.rating >= 5 && review.text.length >= 40)
    .sort(
      (a, b) =>
        b.text.length - a.text.length || a.name.localeCompare(b.name, 'cs')
    )
    .filter((review) => {
      const key = dedupeKey(review)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 6)

  return { summary, featured, all: cleaned }
}

export const reviewsData = parseReviewsJson()
