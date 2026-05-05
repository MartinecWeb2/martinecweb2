'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface RawReview {
  author_title?: string
  review_text?: string
  rating?: number
  author_image?: string
}

interface Review {
  name: string
  text: string
  rating: number
  image?: string
}

interface LocalReviewsProps {
  googleReviewsUrl: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} z 5 hvězd`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77 4.82 17.44l.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleGIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

const CLAMP_CHARS = 140

export default function LocalReviews({ googleReviewsUrl }: LocalReviewsProps) {
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    let cancelled = false
    fetch('/recenze1.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Nelze načíst recenze')
        return r.json()
      })
      .then((data: RawReview[]) => {
        if (cancelled) return
        const cleaned: Review[] = data
          .filter((r) => r && r.review_text && r.author_title)
          .map((r) => ({
            name: r.author_title as string,
            text: (r.review_text as string).trim(),
            rating: typeof r.rating === 'number' ? r.rating : 5,
            image: r.author_image,
          }))

        const picked: Review[] = []
        const seen = new Set<string>()
        for (const rev of shuffle(cleaned)) {
          const key = rev.name + '|' + rev.text.slice(0, 60)
          if (seen.has(key)) continue
          seen.add(key)
          picked.push(rev)
          if (picked.length === 5) break
        }
        setReviews(picked)
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || 'Chyba')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {error && (
        <p className="text-center text-gray-500">Recenze se nepodařilo načíst.</p>
      )}

      <div className="local-reviews-swiper">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true, el: '.local-reviews-pagination' }}
          navigation={{
            prevEl: '.local-reviews-prev',
            nextEl: '.local-reviews-next',
          }}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1.1, centeredSlides: true },
            640: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          className="!overflow-hidden !py-5 -mx-2 !px-2"
        >
          {(reviews ?? Array.from({ length: 5 })).map((r, index) => {
            const review = r as Review | undefined
            return (
              <SwiperSlide key={index} className="!h-auto">
                <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-[290px]">
                  {/* Top row: stars + Google G */}
                  <div className="flex items-center justify-between mb-4">
                    {review ? <StarRow rating={review.rating} /> : <div className="h-5 w-28 bg-gray-100 rounded animate-pulse" />}
                    <GoogleGIcon className="w-6 h-6" />
                  </div>

                  {/* Review text */}
                  {(() => {
                    if (!review) {
                      return (
                        <div className="flex-1 mb-5 space-y-2">
                          <span className="block h-3 bg-gray-100 rounded animate-pulse" />
                          <span className="block h-3 bg-gray-100 rounded animate-pulse w-11/12" />
                          <span className="block h-3 bg-gray-100 rounded animate-pulse w-10/12" />
                          <span className="block h-3 bg-gray-100 rounded animate-pulse w-9/12" />
                        </div>
                      )
                    }
                    const isLong = review.text.length > CLAMP_CHARS
                    const isOpen = !!expanded[index]
                    const shown = !isLong || isOpen
                      ? review.text
                      : review.text.slice(0, CLAMP_CHARS).trimEnd() + '…'
                    return (
                      <div className={`relative flex-1 mb-4 ${isOpen ? 'overflow-y-auto pr-1' : 'overflow-hidden'}`}>
                        <span className="absolute -top-2 -left-1 text-5xl leading-none text-accent/15 font-serif select-none pointer-events-none">
                          &ldquo;
                        </span>
                        <p className="relative text-apple-gray/90 font-light leading-relaxed pl-5">
                          {shown}
                        </p>
                        {isLong && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded((s) => ({ ...s, [index]: !s[index] }))
                            }
                            className="mt-2 ml-5 text-accent text-sm font-medium hover:underline"
                          >
                            {isOpen ? 'Zobrazit méně' : 'Zobrazit více'}
                          </button>
                        )}
                      </div>
                    )
                  })()}

                  {/* Bottom row: avatar + name + Google label */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center flex-shrink-0">
                      {review?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : null}
                      {review && !review.image && (
                        <span className="text-accent font-semibold text-sm">
                          {getInitials(review.name)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-apple-gray truncate leading-tight">
                        {review ? review.name : '\u00A0'}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <GoogleGIcon className="w-3 h-3" />
                        <span>Ověřená recenze na Google</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            aria-label="Předchozí recenze"
            className="local-reviews-prev w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg text-apple-gray hover:text-accent transition flex items-center justify-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="local-reviews-pagination !static !w-auto flex items-center gap-2" />
          <button
            aria-label="Další recenze"
            className="local-reviews-next w-11 h-11 rounded-full bg-white shadow-md hover:shadow-lg text-apple-gray hover:text-accent transition flex items-center justify-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .local-reviews-pagination .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s;
        }
        .local-reviews-pagination .swiper-pagination-bullet-active {
          background: #0071e3;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>

      <div className="flex justify-center mt-12">
        <motion.a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          <GoogleGIcon className="w-5 h-5 bg-white rounded-full p-0.5" />
          Zobrazit všechny recenze
        </motion.a>
      </div>
    </div>
  )
}
