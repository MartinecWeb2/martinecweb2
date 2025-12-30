'use client'

import { useEffect } from 'react'

export default function CatchAllPage({ params }: { params: { slug: string[] } }) {
  useEffect(() => {
    // Všechny neexistující cesty přesměruj na hlavní stránku
    window.location.href = 'https://autoskola-martinec.cz'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-light">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-apple-gray mb-4">
          Přesměrování...
        </h1>
        <p className="text-gray-600">
          Budete přesměrováni na <span className="font-medium">autoskola-martinec.cz</span>
        </p>
      </div>
    </div>
  )
}
