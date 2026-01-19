'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Review {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
  relative_time_description: string
}

interface GoogleReviewsProps {
  placeId: string
}

export default function GoogleReviews({ placeId }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState<number>(0)
  const [totalReviews, setTotalReviews] = useState<number>(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/google-reviews?placeId=${placeId}`)
        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setReviews(data.reviews || [])
          setRating(data.rating || 0)
          setTotalReviews(data.user_ratings_total || 0)
        }
      } catch (err) {
        setError('Nepodařilo se načíst recenze')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [placeId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-4xl font-bold text-apple-gray">{rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-600">
          Na základě {totalReviews} recenzí na Google
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={reviews.length > 3}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-12"
      >
        {reviews.slice(0, 10).map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 items-center justify-center text-white font-bold text-lg flex-shrink-0 hidden">
                  {review.author_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-apple-gray truncate">{review.author_name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {review.text}
              </p>

              <p className="text-xs text-gray-400">{review.relative_time_description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center">
        <a
          href={`https://search.google.com/local/reviews?placeid=${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-apple-gray text-white rounded-full font-semibold hover:bg-apple-gray/90 transition-colors"
        >
          Zobrazit všechny recenze na Google
        </a>
      </div>
    </div>
  )
}
