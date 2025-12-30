'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
      setTimeout(() => {
        router.push('/pobocky')
      }, 200)
    }, 800)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-apple-gray via-gray-900 to-black"
        >
          <div className="relative">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.6, 0.05, 0.01, 0.9],
                delay: 0.1
              }}
              className="relative"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/loga/Logo-Autoskola-Martinec-1.png"
                  alt="Autoškola Martinec"
                  width={500}
                  height={250}
                  priority
                  className="w-auto h-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-xl text-white/90 font-light tracking-wide">
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
