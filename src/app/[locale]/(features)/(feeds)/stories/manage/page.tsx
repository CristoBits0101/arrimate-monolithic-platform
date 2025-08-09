'use client'

// Images
import Image from 'next/image'

// Intl
import { useTranslations } from 'next-intl'

// React
import { useEffect, useState } from 'react'

import '@/styles/globals.css'

interface Photo {
  id: string
  title: string
  description?: string | null
  imageUrl: string
  location?: string | null
  hashtags: string[]
}

export default function ManageStoriesPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const t = useTranslations('Button')

  useEffect(() => {
    fetch('/api/stories?limit=50')
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos || []))
  }, [])

  const handleDelete = async (id: string) => {
    await fetch(`/api/stories/${id}`, { method: 'DELETE' })
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  const handleUpdate = async (id: string) => {
    const title = prompt('Title')
    if (!title) return
    await fetch(`/api/stories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title } : p))
    )
  }

  if (!photos.length) return <p>No stories found</p>

  return (
    <div className='flex flex-col gap-4 w-full'>
      {photos.map((photo) => (
        <article
          key={photo.id}
          className='grid grid-cols-2 gap-4 items-center border border-[#EBEAEB] dark:border-[#3b3b40] rounded-lg p-4'
        >
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            width={150}
            height={150}
            className='object-cover rounded-lg w-full h-auto'
          />
          <div className='flex flex-col gap-2'>
            <h3 className='font-medium'>{photo.title}</h3>
            {photo.description && (
              <p className='text-sm'>{photo.description}</p>
            )}
            {photo.location && (
              <p className='text-sm'>{photo.location}</p>
            )}
            {photo.hashtags.length > 0 && (
              <p className='text-xs text-gray-500'>
                {photo.hashtags.map((tag) => `#${tag}`).join(' ')}
              </p>
            )}
            <div className='flex gap-2 pt-2'>
              <button
                onClick={() => handleUpdate(photo.id)}
                className='px-2 py-1 border rounded'
              >
                {t('edit')}
              </button>
              <button
                onClick={() => handleDelete(photo.id)}
                className='px-2 py-1 border rounded text-red-500'
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

