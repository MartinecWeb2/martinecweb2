'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { Course } from '@/app/data/branches'
import { PRIHLASKA_URL } from '@/app/data/branches'
import 'swiper/css'
import 'swiper/css/pagination'

const MOBILE_ORDER = [
  'Řidičský průkaz skupiny B (vč. L17)',
  'Vrácení řidičského průkazu',
  'Kondiční jízdy',
]

const GIFT_VOUCHER_COURSES = new Set([
  'Řidičský průkaz skupiny B (vč. L17)',
  'Vrácení řidičského průkazu',
  'Kondiční jízdy',
])

function sortForMobile(courses: Course[]) {
  return [...courses].sort(
    (a, b) => MOBILE_ORDER.indexOf(a.name) - MOBILE_ORDER.indexOf(b.name)
  )
}

function CourseCard({
  course,
  compact = false,
}: {
  course: Course
  compact?: boolean
}) {
  const showGiftVoucher = GIFT_VOUCHER_COURSES.has(course.name)
  const showL17Link = course.name === 'Řidičský průkaz skupiny B (vč. L17)'

  return (
    <div
      className={`relative h-full rounded-2xl md:rounded-3xl p-5 md:p-8 transition-transform md:hover:-translate-y-2 ${
        course.featured
          ? 'bg-apple-gray text-white shadow-lg md:scale-105'
          : 'bg-apple-light text-apple-gray shadow-lg'
      }`}
    >
      {course.featured && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 bg-accent text-white rounded-full font-semibold whitespace-nowrap ${
            compact
              ? '-top-3 px-4 py-1.5 text-xs'
              : '-top-4 px-6 py-2 text-sm'
          }`}
        >
          Nejoblíbenější
        </div>
      )}

      <div className={compact ? 'mb-4 mt-2' : 'mb-8'}>
        <h3
          className={`font-bold leading-tight ${compact ? 'text-xl mb-1' : 'text-3xl mb-1'}`}
        >
          {course.name}
        </h3>
        {course.subtitle && (
          <p
            className={`text-sm mb-3 ${course.featured ? 'text-white/70' : 'text-gray-500'}`}
          >
            {course.subtitle}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className={`font-bold ${compact ? 'text-3xl' : 'text-5xl'}`}>
            {course.price}
          </span>
        </div>
      </div>

      <ul className={`space-y-2 md:space-y-4 ${compact ? 'mb-4 text-sm' : 'mb-8'}`}>
        {course.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle
              className={`mt-0.5 flex-shrink-0 ${
                compact ? 'w-5 h-5' : 'w-5 h-5'
              } ${course.featured ? 'text-white' : 'text-accent'}`}
            />
            <span className={course.featured ? 'text-white/90' : 'text-gray-600'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {showGiftVoucher && (
        <p
          className={`text-sm font-medium text-center ${
            compact ? 'mb-4' : 'mb-6'
          } ${course.featured ? 'text-white/80' : 'text-accent'}`}
        >
          Také jako dárkový poukaz
        </p>
      )}

      {showL17Link && (
        <a
          href="https://www.l17.cz/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-full text-center font-medium transition-all hover:opacity-80 ${
            compact ? 'text-xs mb-3' : 'text-sm mb-4'
          } ${
            course.featured
              ? 'text-white/70 underline underline-offset-2 decoration-white/40 hover:decoration-white/70'
              : 'text-gray-500 underline underline-offset-2 decoration-gray-300 hover:text-gray-700 hover:decoration-gray-500'
          }`}
        >
          Více informací o L17
          <svg className={compact ? 'w-3 h-3' : 'w-4 h-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}

      <button
        type="button"
        onClick={() => window.open(PRIHLASKA_URL, '_blank')}
        className={`w-full rounded-full font-semibold transition-colors ${
          compact ? 'py-3 text-sm' : 'py-4'
        } ${
          course.featured
            ? 'bg-white text-apple-gray hover:bg-white/95'
            : 'bg-apple-gray text-white hover:bg-apple-gray/90'
        }`}
      >
        Podat Přihlášku
      </button>
    </div>
  )
}

export default function CoursePricing({ courses }: { courses: Course[] }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (isMobile === null) {
    return <div className="min-h-[520px] md:min-h-[640px]" aria-hidden="true" />
  }

  if (isMobile) {
    const mobileCourses = sortForMobile(courses)

    return (
      <div className="pt-8 -mx-6 px-6">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.15}
          centeredSlides
          pagination={{ clickable: true, el: '.course-pricing-pagination' }}
          className="overflow-visible"
        >
          {mobileCourses.map((course) => (
            <SwiperSlide key={course.name} className="pt-5 !h-auto">
              <CourseCard course={course} compact />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="course-pricing-pagination flex justify-center gap-2 mt-6" />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <motion.div
          key={course.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="h-full"
        >
          <CourseCard course={course} />
        </motion.div>
      ))}
    </div>
  )
}
