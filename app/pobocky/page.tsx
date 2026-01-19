'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

export default function BranchSelection() {
  const router = useRouter()

  useEffect(() => {
    document.title = 'Autoškola Martinec - Pobočky'
  }, [])

  const branches = [
    {
      id: 'bystrice',
      name: 'Bystřice pod Hostýnem',
      description: 'Naše pobočka v srdci Hostýnských vrchů',
      image: '/images/pobocky/fontana-duha.webp',
      gradient: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'prerov',
      name: 'Přerov',
      description: 'Naše pobočka v centru Přerova',
      image: '/images/pobocky/c2561d2a-e665-41d0-b620-3a9ae7848f0f.webp',
      gradient: 'from-blue-600 to-indigo-700'
    }
  ]

  return (
    <div className="min-h-screen bg-apple-light">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/images/loga/Logo-Autoskola-Martinec-1.png"
              alt="Autoškola Martinec"
              width={150}
              height={75}
              className="h-12 w-auto"
            />
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+420603398127"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-apple-gray font-medium"
                aria-label="Telefon"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">+420 603 398 127</span>
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
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
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
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm md:text-base font-semibold tracking-wide">
                Vaše Autoškola pro sk. B
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-apple-gray mb-6 tracking-tight">
              Vyberte si svou pobočku
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Kde chcete začít jezdit?
            </p>
          </motion.div>

          {/* Branch Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(`/pobocka/${branch.id}`)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl"
              >
                {/* Background Image */}
                <div className="relative h-[500px] overflow-hidden">
                  <motion.img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${branch.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                                        
                    <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                      {branch.name}
                    </h2>
                    
                    <p className="text-white/90 text-lg mb-6 font-light">
                      {branch.description}
                    </p>

                    {/* Button */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-apple-gray rounded-full font-semibold group-hover:bg-white/95 transition-colors"
                    >
                      <span>Vybrat pobočku</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-300 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
