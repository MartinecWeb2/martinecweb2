'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
} from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { branchData, teamMembers, vehicles, PRIHLASKA_URL } from '@/app/data/branches'
import { courseTermsByBranch, SHOW_COURSE_TERMS } from '@/app/data/courseTerms'
import { siteConfig } from '@/app/lib/site'
import CoursePricing from '@/app/components/CoursePricing'
import FeatureCards from '@/app/components/FeatureCards'
import CourseSchedule from '@/app/components/CourseSchedule'
import type { ParsedReview, ReviewSummary } from '@/app/lib/reviews'

const LocalReviews = dynamic(() => import('@/app/components/LocalReviews'), {
  ssr: false,
})

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

export default function BranchPageClient({
  branchId,
  reviewSummary,
  featuredReviews,
}: {
  branchId: string
  reviewSummary: ReviewSummary
  featuredReviews: ParsedReview[]
}) {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0])

  const branch = branchData[branchId]
  const courseTerms = courseTermsByBranch[branchId] ?? []

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-apple-light px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-apple-gray mb-4">Pobočka nenalezena</h1>
          <Link
            href="/pobocky"
            className="inline-block px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Zpět na výběr poboček
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
          <div className="relative flex items-center justify-center">
            <Link
              href="/pobocky"
              className="absolute left-0 flex items-center gap-1 md:gap-2 text-apple-gray hover:text-accent transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium hidden sm:inline">Zpět na výběr</span>
              <span className="font-medium sm:hidden">Zpět</span>
            </Link>

            <Link href="/pobocky" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/loga/Logo-Autoskola-Martinec-1.png"
                alt="Autoškola Martinec"
                width={150}
                height={75}
                className="h-8 md:h-12 w-auto"
                priority
              />
            </Link>

            <div className="absolute right-0 flex items-center gap-2 md:gap-4">
              <a
                href={phoneHref(siteConfig.phone)}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-apple-gray font-medium"
                aria-label="Telefon"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden lg:inline text-sm">{siteConfig.phone}</span>
              </a>
              <a
                href="https://www.facebook.com/autoskolamartinec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Image
                  src="/images/icony/facebook.webp"
                  alt=""
                  width={32}
                  height={32}
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                />
              </a>
              <a
                href="https://www.instagram.com/autoskolamartinec/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image
                  src="/images/icony/instagram.webp"
                  alt=""
                  width={32}
                  height={32}
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                />
              </a>
              <button
                type="button"
                onClick={() => window.open(PRIHLASKA_URL, '_blank')}
                className="hidden md:flex px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Online Přihláška
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => window.open(PRIHLASKA_URL, '_blank')}
        className="md:hidden fixed bottom-6 right-6 z-50 px-5 py-3 bg-accent text-white rounded-full font-semibold shadow-2xl hover:bg-blue-700 transition-colors"
      >
        Přihláška
      </motion.button>

      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform"
        >
          <img
            src={branch.hero}
            alt={branch.name}
            className="w-full h-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 42%, rgba(0,0,0,0.45) 0%, transparent 72%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45 pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 h-full flex items-center justify-center text-center px-6"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-white text-lg md:text-xl font-light tracking-wide hero-text-shadow">
                {branch.description}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight hero-text-shadow-lg"
            >
              {branch.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-3xl text-white font-light mb-12 hero-text-shadow"
            >
              {branch.slogan}
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {SHOW_COURSE_TERMS && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  document.getElementById('terminy')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="px-10 py-4 bg-white text-apple-gray rounded-full text-lg font-semibold hover:bg-white/95 transition-colors inline-flex items-center gap-2 shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Termíny kurzů
              </motion.button>
            )}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: SHOW_COURSE_TERMS ? 1 : 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                document.getElementById('cenik')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`px-10 py-4 rounded-full text-lg font-semibold transition-colors inline-flex items-center gap-2 ${
                SHOW_COURSE_TERMS
                  ? 'bg-white/15 text-white border border-white/40 hover:bg-white/25'
                  : 'bg-white text-apple-gray hover:bg-white/95 shadow-xl'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Ceník kurzů
            </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="hidden md:flex w-6 h-10 border-2 border-white/50 rounded-full items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="md:hidden"
          >
            <svg
              className="w-8 h-8 text-white/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5 L12 19 M12 5 L8 9 M12 5 L16 9" />
              <path d="M12 19 L8 15 M12 19 L16 15" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-apple-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-apple-gray mb-6 tracking-tight">
              Proč jezdit s Autoškolou Martinec?
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Spojujeme profesionální přístup s výukovým plánem vytvořeným přímo pro vás.
            </p>
          </motion.div>

          <FeatureCards
            features={branch.features}
            vehicles={vehicles}
            teamMembers={teamMembers}
          />
        </div>
      </section>

      {SHOW_COURSE_TERMS && (
        <CourseSchedule terms={courseTerms} branchName={branch.name} />
      )}

      <section
        id="cenik"
        className={`py-32 px-6 ${SHOW_COURSE_TERMS ? 'bg-apple-light' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-apple-gray mb-6 tracking-tight">
              Ceník kurzů
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Přehled našich kurzů a aktuálních cen. Platbu lze rozložit do splátek bez navýšení.
            </p>
          </motion.div>

          <CoursePricing courses={branch.courses} />
        </div>
      </section>

      <section
        className={`py-32 px-6 ${SHOW_COURSE_TERMS ? 'bg-white' : 'bg-apple-light'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-apple-gray mb-6 tracking-tight text-center">
            Za nás mluví vaše recenze
          </h2>
          <p className="text-xl text-gray-600 font-light text-center mb-20 max-w-3xl mx-auto">
            {branchId === 'bystrice'
              ? 'Recenze absolventů z Google — žáci píší hlavně na pobočku Přerov, vztahují se na celou autoškolu.'
              : 'Přečtěte si, co o nás říkají naši absolventi na Google.'}
          </p>
          <div className="px-6">
            <LocalReviews
              googleReviewsUrl={branch.googleReviewsUrl}
              summary={reviewSummary}
              featuredReviews={featuredReviews}
            />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-apple-gray text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
                Kde nás najdete?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Adresa</p>
                    <p className="text-white/80">{branch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Telefon</p>
                    <a
                      href={phoneHref(branch.phone)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {branch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Otevírací doba</p>
                    <p className="text-white/80">{branch.hours}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => window.open(PRIHLASKA_URL, '_blank')}
                className="mt-10 px-10 py-4 bg-accent text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Online Přihláška
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <iframe
                src={branch.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa – ${branch.name}`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white/60 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/pobocky" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/loga/Logo-Autoskola-Martinec-1.png"
                alt="Autoškola Martinec"
                width={150}
                height={75}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm">
              © {new Date().getFullYear()} Autoškola Martinec. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
