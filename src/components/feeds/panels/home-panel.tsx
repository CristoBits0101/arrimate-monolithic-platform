import ArrimateFollowCard from '@/components/marketing/user/arrimate-follow-card'
import { useFetchPhotos } from '@/hooks/useFetchPhotos'
import { randomUtils } from '@/utils/randomUtils'

export default function HomePanel() {
  const { photos, loading, error } = useFetchPhotos({
    query: 'face',
    orientation: 'square',
    page: Math.floor(Math.random() * 10) + 1,
    per_page: 8
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const uniquePhotos = photos
    .filter(
      (photo, index, self) => index === self.findIndex((p) => p.id === photo.id)
    )
    .slice(0, 4)

  return (
    <section className='w-full h-full flex flex-col gap-4 overflow-hidden overflow-y-auto no-scrollbar'>
      <div className='grid grid-cols-2 gap-4'>
        {uniquePhotos.slice(0, 2).map((photo) => (
          <ArrimateFollowCard
            src={photo?.src?.small}
            alt={photo?.alt || 'Image from Pexels'}
            width={photo?.width}
            height={photo?.height}
            key={photo?.id}
            nickname={photo?.photographer}
            description={photo?.photographer_url.replace('https://www.', '')}
            trending={randomUtils.getRandomBoolean()}
            followers={randomUtils.getRandomFollowers()}
            reliable={randomUtils.getRandomBoolean()}
            verified={randomUtils.getRandomBoolean()}
          />
        ))}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {uniquePhotos.slice(2, 4).map((photo) => (
          <ArrimateFollowCard
            src={photo?.src?.small}
            alt={photo?.alt || 'Image from Pexels'}
            width={photo?.width}
            height={photo?.height}
            key={photo?.id}
            nickname={photo?.photographer}
            description={photo?.photographer_url.replace('https://www.', '')}
            trending={randomUtils.getRandomBoolean()}
            followers={randomUtils.getRandomFollowers()}
            reliable={randomUtils.getRandomBoolean()}
            verified={randomUtils.getRandomBoolean()}
          />
        ))}
      </div>
    </section>
  )
}
