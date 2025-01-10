'use client'

// Buttons
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

// Custom
import { usePost } from '@/modules/publications/create-post/hooks/usePost'

// Icons
import audioWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/audio-light-icon.svg'
import eventsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/events-light-icon.svg'
import productsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/products-light-icon.svg'
import reviewsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/reviews-light-icon.svg'
import shortsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/shorts-light-icon.svg'
import storyWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/stories-light-icon.svg'
import videosWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/videos-light-icon.svg'

// Intl
import { useTranslations } from 'next-intl'

const PublishOptions = () => {
  const { changePost } = usePost()
  const t = useTranslations('Posts')

  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('story')}
        isSelected={false}
        onClick={() => changePost('story')}
        iconSrc={storyWhiteSVG}
        altText={t('story')}
      />
      <OptionButton
        label={t('event')}
        isSelected={false}
        onClick={() => changePost('event')}
        iconSrc={eventsWhiteSVG}
        altText={t('event')}
      />
      <OptionButton
        label={t('product')}
        isSelected={false}
        onClick={() => changePost('product')}
        iconSrc={productsWhiteSVG}
        altText={t('product')}
      />
      <OptionButton
        label={t('short')}
        isSelected={false}
        onClick={() => changePost('short')}
        iconSrc={shortsWhiteSVG}
        altText={t('short')}
      />
      <OptionButton
        label={t('video')}
        isSelected={false}
        onClick={() => changePost('video')}
        iconSrc={videosWhiteSVG}
        altText={t('video')}
      />
      <OptionButton
        label={t('audio')}
        isSelected={false}
        onClick={() => changePost('audio')}
        iconSrc={audioWhiteSVG}
        altText={t('audio')}
      />
      <OptionButton
        label={t('review')}
        isSelected={false}
        onClick={() => changePost('review')}
        iconSrc={reviewsWhiteSVG}
        altText={t('review')}
      />
    </section>
  )
}

export default PublishOptions
