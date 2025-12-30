'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Car, 
  Clock, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  Calendar
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const branchData = {
  bystrice: {
    name: 'Bystřice pod Hostýnem',
    slogan: 'Vaše cesta začíná zde',
    hero: '/images/pobocky/IMG_5742.jpeg',
    description: 'Moderní autoškola v srdci Hostýnských vrchů',
    address: 'Masarykovo nám. 69, 768 61 Bystřice pod Hostýnem',
    phone: '+420 603 398 127',
    email: 'info@autoskola-martinec.cz',
    hours: 'Po telefonické domluvě',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5193.004600816715!2d17.672359!3d49.399406!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713a14ae8c9392d%3A0x33e03af248396dfe!2sAuto%C5%A1kola%20Byst%C5%99ice%20pod%20Host%C3%BDnem%20-%20Auto%C5%A1kola%20Martinec!5e0!3m2!1scs!2sus!4v1763951803409!5m2!1scs!2sus',
    features: [
      {
        icon: Car,
        title: 'Moderní vozový park',
        description: 'Auta, ve kterých chceš sedět i bez řidičáku'
      },
      {
        icon: Users,
        title: 'Profesionální tým',
        description: 'Instruktoři, kteří se zaměřují výhradně na vaše tempo a potřeby. Vaše jistota za volantem je náš cíl.'
      },
      {
        icon: Clock,
        title: 'Rozšířená otevírací doba',
        description: 'Jízdy přizpůsobené vašemu rozvrhu. Plánujeme výuku i o víkendech.'
      },
      {
        icon: Award,
        title: 'Vysoká úspěšnost',
        description: 'Lidskost a individuální přístup = vysoká úspěšnost u zkoušek. Každý student je pro nás jedinečný.'
      }
    ],
    courses: [
      {
        name: 'Vrácení řidičského průkazu',
        price: '5 990 Kč',
        features: [
          'Kompletní řešení dokumentace (Veškeré podklady vyřešíme za vás)',
          'Expertní poradenství (Podpora při řešení případných komplikací)',
          'Teoretická a praktická výuka v rozsahu nutném pro zkoušku',
        ]
      },
      {
        name: 'Řidičský průkaz skupiny B (vč. L17)',
        subtitle: 'Zahájení kurzu každý týden',
        price: '19 990 Kč',
        features: [
          '28 hodin jízd + 2 Bonusové ZDARMA',
          'Individuální výukový plán přizpůsobený vašemu tempu.',
          'Kompletní e-learning, učebnice a podklady ZDARMA',
          'Zahrnuto první předvedení ke zkoušce + Opakované předvedení ZDARMA',
          'Možnost dokoupení dalších jízd',
        ],
        featured: true
      },
      {
        name: 'Kondiční jízdy',
        price: '590 Kč/h',
        features: [
          'Plné přizpůsobení vašim potřebám a cílům',
          'Profesionální mentoring a praktické rady',
          'Obnovení sebedůvěry za volantem',
          'Praxe v jízdě na dálnici, parkování a komplexním provozu',
          'Zdokonalení řízení po delší pauze nebo získání nových návyků'
        ]
      }
    ],
    reviews: [
      {
        name: 'Petr K.',
        rating: 5,
        text: 'Skvělá autoškola! Instruktor byl trpělivý a vše mi perfektně vysvětlil. Zkoušku jsem dal napoprvé.',
        date: '2024'
      },
      {
        name: 'Martina S.',
        rating: 5,
        text: 'Doporučuji všem. Profesionální přístup, moderní auta a flexibilní termíny jízd.',
        date: '2024'
      },
      {
        name: 'Jakub M.',
        rating: 5,
        text: 'Nejlepší rozhodnutí. Díky individuálnímu přístupu jsem se naučil řídit rychle a bezpečně.',
        date: '2024'
      }
    ]
  },
  prerov: {
    name: 'Přerov',
    slogan: 'Vaše cesta začíná zde',
    hero: '/images/pobocky/5.jpg',
    description: 'Moderní autoškola v centru Přerova',
    address: 'Kramářova 21, 750 02 Přerov',
    phone: '+420 603 398 127',
    email: 'info@autoskola-martinec.cz',
    hours: 'Po telefonické domluvě',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5187.894711080862!2d17.448945!3d49.447712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x201f59448c58c00b%3A0x665c1764727f38fb!2sAuto%C5%A1kola%20Martinec!5e0!3m2!1scs!2sus!4v1763951848356!5m2!1scs!2sus',
    features: [
      {
        icon: Car,
        title: 'Moderní vozový park',
        description: 'Auta, ve kterých chceš sedět i bez řidičáku'
      },
      {
        icon: Users,
        title: 'Profesionální tým',
        description: 'Instruktoři, kteří se zaměřují výhradně na vaše tempo a potřeby. Vaše jistota za volantem je náš cíl.'
      },
      {
        icon: Clock,
        title: 'Rozšířená otevírací doba',
        description: 'Jízdy přizpůsobené vašemu rozvrhu. Plánujeme výuku i o víkendech.'
      },
      {
        icon: Award,
        title: 'Vysoká úspěšnost',
        description: 'Lidskost a individuální přístup = vysoká úspěšnost u zkoušek. Každý student je pro nás jedinečný.'
      }
    ],
    courses: [
      {
        name: 'Vrácení řidičského průkazu',
        price: '5 990 Kč',
        features: [
          'Kompletní řešení dokumentace (Veškeré podklady vyřešíme za vás)',
          'Expertní poradenství (Podpora při řešení případných komplikací)',
          'Teoretická a praktická výuka v rozsahu nutném pro zkoušku',
        ]
      },
      {
        name: 'Řidičský průkaz skupiny B (vč. L17)',
        subtitle: 'Zahájení kurzu každý týden',
        price: '19 990 Kč',
        features: [
          '28 hodin jízd + 2 Bonusové ZDARMA',
          'Individuální výukový plán přizpůsobený vašemu tempu.',
          'Kompletní e-learning, učebnice a podklady ZDARMA',
          'Zahrnuto první předvedení ke zkoušce + Opakované předvedení ZDARMA',
          'Možnost dokoupení dalších jízd',
        ],
        featured: true
      },
      {
        name: 'Kondiční jízdy',
        price: '590 Kč/h',
        features: [
          'Plné přizpůsobení vašim potřebám a cílům',
          'Profesionální mentoring a praktické rady',
          'Obnovení sebedůvěry za volantem',
          'Praxe v jízdě na dálnici, parkování a komplexním provozu',
          'Zdokonalení řízení po delší pauze nebo získání nových návyků'
        ]
      }
    ],
    reviews: [
      {
        name: 'Lukáš D.',
        rating: 5,
        text: 'Výborná autoškola s lidským přístupem. Instruktoři jsou profesionálové a vždy ochotní pomoct.',
        date: '2024'
      },
      {
        name: 'Tereza H.',
        rating: 5,
        text: 'Díky Autoškole Martinec jsem získala řidičák bez stresu. Doporučuji každému!',
        date: '2024'
      },
      {
        name: 'Ondřej P.',
        rating: 5,
        text: 'Skvělá zkušenost. Flexibilní termíny a moderní výuka. Zkoušku jsem zvládl napoprvé.',
        date: '2024'
      }
    ]
  }
}

export default function BranchPage() {
  const params = useParams()
  const router = useRouter()
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const branchId = params.id as string
  const branch = branchData[branchId as keyof typeof branchData]
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (branch) {
      document.title = `Autoškola Martinec - ${branch.name}`
    }
  }, [branch])

  if (!branch) {
    return <div>Pobočka nenalezena</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => router.push('/pobocky')}
              className="flex items-center gap-1 md:gap-2 text-apple-gray hover:text-accent transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium hidden sm:inline">Zpět na výběr</span>
              <span className="font-medium sm:hidden">Zpět</span>
            </button>
            <Image
              src="/images/loga/Logo-Autoskola-Martinec-1.png"
              alt="Autoškola Martinec"
              width={150}
              height={75}
              className="h-8 md:h-12 w-auto"
            />
            {/* Desktop button */}
            <button 
              onClick={() => window.open('https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1', '_blank')}
              className="hidden md:flex px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Online Přihláška
            </button>
            {/* Mobile spacer to keep logo centered */}
            <div className="md:hidden w-16"></div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Mobile Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1', '_blank')}
        className="md:hidden fixed bottom-6 right-6 z-50 px-5 py-3 bg-accent text-white rounded-full font-semibold shadow-2xl hover:bg-blue-700 transition-colors"
      >
        Přihláška
      </motion.button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          <img
            src={branch.hero}
            alt={branch.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative h-full flex items-center justify-center text-center px-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-white/80 text-lg font-light tracking-wide">
                {branch.description}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
            >
              {branch.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-2xl md:text-3xl text-white/90 font-light mb-12"
            >
              {branch.slogan}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const coursesSection = document.getElementById('sluzby')
                coursesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="px-10 py-4 bg-white text-apple-gray rounded-full text-lg font-semibold hover:bg-white/95 transition-colors inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Prozkoumat služby
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          {/* Desktop - Mouse scroll */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="hidden md:flex w-6 h-10 border-2 border-white/50 rounded-full items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>

          {/* Mobile - Double arrow */}
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
            >
              {/* Up arrow */}
              <path d="M12 5 L12 19 M12 5 L8 9 M12 5 L16 9" />
              {/* Down arrow */}
              <path d="M12 19 L8 15 M12 19 L16 15" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
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
              Proč jezdit s Autoškola Martinec?
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Spojujeme profesionální přístup s výukovým plánem vytvořeným přímo pro vás.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branch.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-apple-gray mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="sluzby" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-apple-gray mb-6 tracking-tight">
              Služby a Ceny
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Veškeré kurzy lze hradit ve splátkách
            </p>
          </motion.div>

          {/* Mobile Swiper */}
          <div className="md:hidden pt-8 -mx-6 px-6">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              centeredSlides={true}
              pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
              className="overflow-visible"
            >
              {[...branch.courses].sort((a, b) => {
                const mobileOrder = ['Řidičský průkaz skupiny B (vč. L17)', 'Vrácení řidičského průkazu', 'Kondiční jízdy'];
                return mobileOrder.indexOf(a.name) - mobileOrder.indexOf(b.name);
              }).map((course, index) => (
                <SwiperSlide key={index} className="pt-5">
                  <div
                    className={`relative rounded-2xl p-5 ${
                      course.featured
                        ? 'bg-apple-gray text-white shadow-lg'
                        : 'bg-apple-light text-apple-gray shadow-lg'
                    }`}
                  >
                    {course.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-white rounded-full text-xs font-semibold whitespace-nowrap">
                        Nejoblíbenější
                      </div>
                    )}
                    
                    <div className="mb-4 mt-2">
                      <h3 className="text-xl font-bold mb-1 leading-tight">{course.name}</h3>
                      {course.subtitle && (
                        <p className={`text-sm mb-3 ${course.featured ? 'text-white/70' : 'text-gray-500'}`}>
                          {course.subtitle}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{course.price}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4 text-sm">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            course.featured ? 'text-white' : 'text-accent'
                          }`} />
                          <span className={course.featured ? 'text-white/90' : 'text-gray-600'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => window.open('https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1', '_blank')}
                      className={`w-full py-3 rounded-full font-semibold transition-colors text-sm ${
                      course.featured
                        ? 'bg-white text-apple-gray hover:bg-white/95'
                        : 'bg-apple-gray text-white hover:bg-apple-gray/90'
                    }`}>
                      Podat Přihlášku
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination-custom flex justify-center gap-2 mt-6"></div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {branch.courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 hover:-translate-y-2 transition-transform ${
                  course.featured
                    ? 'bg-apple-gray text-white shadow-lg scale-105'
                    : 'bg-apple-light text-apple-gray shadow-lg'
                }`}
              >
                {course.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-white rounded-full text-sm font-semibold">
                    Nejoblíbenější
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-1 leading-tight">{course.name}</h3>
                  {course.subtitle && (
                    <p className={`text-sm mb-3 ${course.featured ? 'text-white/70' : 'text-gray-500'}`}>
                      {course.subtitle}
                    </p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{course.price}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        course.featured ? 'text-white' : 'text-accent'
                      }`} />
                      <span className={course.featured ? 'text-white/90' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.open('https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1', '_blank')}
                  className={`w-full py-4 rounded-full font-semibold transition-colors ${
                  course.featured
                    ? 'bg-white text-apple-gray hover:bg-white/95'
                    : 'bg-apple-gray text-white hover:bg-apple-gray/90'
                }`}>
                  Podat Přihlášku
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
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
              Za nás mluví vaše recenze
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Přečtěte si, co o nás říkají naši absolventi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {branch.reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-apple-gray">{review.name}</span>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                    <p className="text-white/80">{branch.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-white/80">{branch.email}</p>
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
                onClick={() => window.open('https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1', '_blank')}
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
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/60 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Image
              src="/images/loga/Logo-Autoskola-Martinec-1.png"
              alt="Autoškola Martinec"
              width={150}
              height={75}
              className="h-10 w-auto"
            />

            <p className="text-sm">
              © 2025 Autoškola Martinec. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
