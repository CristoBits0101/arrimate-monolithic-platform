'use client'

import { useEffect, useState } from 'react'

interface Photo {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  photographer: string
  hashtags: string[]
  location?: string | null
  createdAt: string
  shareCount: number
  liked: boolean
  _count: {
    likes: number
    comments: number
    favorites: number
  }
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
        setPhotos(
          data.photos.map((photo: any) => ({
            ...photo,
            liked: Boolean(photo.liked)
          }))
        )
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

