// Components
import PostButton from '@/modules/publications/show-post/components/buttons/post-button'
import NoContent from '@/modules/publications/show-post/components/alerts/stock-empty'

// Custom
import {
  useFetchLatestShorts,
  type Short
} from '@/modules/publications/show-post/hooks/useFetchLatestShorts'
import { useState, useEffect } from 'react'

export default function ShowPostShorts() {
  const { shorts: initialShorts, loading, error } = useFetchLatestShorts(10)
  const [shorts, setShorts] = useState<Short[]>([])

  useEffect(() => {
    setShorts(initialShorts)
  }, [initialShorts])

  const handleLike = async (shortId: string) => {
    try {
      const res = await fetch(`/api/shorts/${shortId}/like`, { method: 'POST' })
      if (!res.ok) return
      const data = await res.json()
      setShorts((prev) =>
        prev.map((short) =>
          short.id === shortId
            ? {
                ...short,
                liked: data.liked,
                _count: {
                  ...short._count,
                  likes: short._count.likes + (data.liked ? 1 : -1)
                }
              }
            : short
        )
      )
    } catch (error) {
      console.error('Error liking short', error)
    }
  }

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <h2 className='text-center text-gray-500'>{''}</h2>
      </div>
    )
  }

  if (error || !shorts || shorts.length === 0)
    return <NoContent text={'No shorts available'} />

  return (
    <div className='w-full h-fit flex flex-col justify-center items-center gap-16'>
      {shorts.map((short: Short) => (
        <article
          key={short.id}
          className='relative h-fit flex flex-col gap-4 items-center'
        >
          <section className='w-60 h-96 overflow-hidden rounded-3xl'>
            <video
              src={short.videoUrl}
              controls
              className='rounded-3xl drop-shadow-sm object-cover w-full h-full'
            />
          </section>
          <aside className='w-full h-full flex flex-row gap-2 justify-center items-center'>
            <PostButton
              iconAlt='Like icon'
              iconDisplay='like'
              textDisplay={(short._count?.likes ?? 0).toString()}
              onClick={() => handleLike(short.id)}
              isActive={short.liked}
            />
            <PostButton
              iconAlt='Comment icon'
              iconDisplay='comments'
              textDisplay={(short._count?.comments ?? 0).toString()}
            />
          </aside>
        </article>
      ))}
    </div>
  )
}

