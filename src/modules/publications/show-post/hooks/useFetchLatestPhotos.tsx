'use client'

import { useEffect, useState } from 'react'

interface Photo {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  photographer: string
  hashtags: string[]
  createdAt: string
}

export const useFetchLatestPhotos = (limit = 10) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`/api/stories?limit=${limit}`)
        if (!res.ok) throw new Error('Failed to fetch photos')
        const data = await res.json()
        setPhotos(data.photos)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [limit])

  return { photos, loading, error }
}

export type { Photo }

