'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useUserSession } from '@/modules/auth/session-data/hooks/useUserSession'
import defaultUserImage from '@/assets/images/default/default_user_image.png'

const UserArticle = () => {
  const { session, hydrated } = useUserSession()
  const [userImage, setUserImage] = useState<string | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [followers, setFollowers] = useState<number>(0)
  const [following, setFollowing] = useState<number>(0)
  const [posts, setPosts] = useState<number>(0)
  const [memberSince, setMemberSince] = useState<string | null>(null)
  const t = useTranslations('User')

  useEffect(() => {
    if (hydrated) {
      setUserImage(session?.user?.image || defaultUserImage)
      setFollowers(session?.user?.followers || 0)
      setFollowing(session?.user?.following || 0)
      setPosts(session?.user?.posts || 0)
      const createdAt = session?.user?.createdAt
      setMemberSince(
        createdAt ? new Date(createdAt).toISOString().split('T')[0] : null
      )
    }
  }, [hydrated, session])

  // Wait for component to be confirmed renderable
  if (!hydrated || userImage === null) return null

  return (
    <article className='flex items-center w-full h-fit grid-cols-[auto,1fr]'>
      {/* Image */}
      <header className='relative w-32 h-32 rounded-full bg-transparent p-[0.313rem] border-[0.313rem] border-solid border-[#EBEAEB] dark:border-[#3b3b40] overflow-hidden flex items-center justify-center'>
        {!isImageLoaded && (
          <div className='absolute w-full h-full bg-[#F4F4F4] m-2 animate-pulse rounded-full'></div>
        )}
        <Image
          src={userImage}
          alt='Profile picture'
          width={228}
          height={228}
          className={`rounded-full object-cover transition-opacity duration-300 ${
            !isImageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          quality={100}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,...'
          priority
          onLoad={() => setIsImageLoaded(true)}
        />
      </header>
      {/* Information */}
      <section className='w-fit h-fit p-4 flex flex-col gap-1'>
        <p>
          <span className='font-semibold'>{followers}</span> {t('followers')} •{' '}
          <span className='font-semibold'>{following}</span> {t('following')} •{' '}
          <span className='font-semibold'>{posts}</span> {t('posts')}
        </p>
        <p>
          {t('memberSince')}
          {': '}
          <span className='font-semibold'>{memberSince}</span>
        </p>
      </section>
    </article>
  )
}

export default UserArticle
