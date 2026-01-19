import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('placeId')

  if (!placeId) {
    return NextResponse.json({ error: 'Place ID je povinný' }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API klíč není nastaven' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&language=cs&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === 'OK') {
      return NextResponse.json({
        reviews: data.result.reviews || [],
        rating: data.result.rating || 0,
        user_ratings_total: data.result.user_ratings_total || 0,
      })
    } else {
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při načítání recenzí' },
      { status: 500 }
    )
  }
}
