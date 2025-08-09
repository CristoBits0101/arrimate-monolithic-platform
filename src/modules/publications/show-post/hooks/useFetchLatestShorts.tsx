'use client'

import { useEffect, useState } from 'react'

interface Short {
  id: string
  title: string
  description?: string | null
  videoUrl: string
  createdAt: string
  liked: boolean
  _count: {
    likes: number
    comments: number
  }
}

export const useFetchLatestShorts = (limit = 10) => {
  const [shorts, setShorts] = useState<Short[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const res = await fetch(`/api/shorts?limit=${limit}`)
        if (!res.ok) throw new Error('Failed to fetch shorts')
        const data = await res.json()
        setShorts(
          data.shorts.map((short: any) => ({
            ...short,
            liked: Boolean(short.liked)
          }))
        )
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchShorts()
  }, [limit])

  return { shorts, loading, error }
}

export type { Short }

