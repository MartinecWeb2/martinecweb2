'use client'

import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 6).map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/loga/Logo-Autoskola-Martinec-1.png'
                }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-apple-gray">{review.author_name}</h4>
                <div className="flex gap-1 mt-1">
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

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-accent/20" />
              <p className="text-gray-600 text-sm leading-relaxed pl-6 line-clamp-4">
                {review.text}
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-4">{review.relative_time_description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={`https://search.google.com/local/reviews?placeid=${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Zobrazit všechny recenze na Google
        </a>
      </div>
    </div>
  )
}
