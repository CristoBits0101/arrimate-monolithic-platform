'use client'

// Buttons
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

// Custom
import { usePost } from '@/modules/publications/add-post/hooks/usePost'
import { useThemeContext } from '@/modules/configuration/settings-panel/hooks/useThemeContext'

// Icons
import audioDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/audio-dark-icon.svg'
import audioWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/audio-light-icon.svg'
import eventsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/feeds/events-dark-icon.svg'
import eventsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/feeds/events-light-icon.svg'
import productsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/e-commerce/products-dark-icon.svg'
import productsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/e-commerce/products-light-icon.svg'
import reviewsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/feeds/reviews-dark-icon.svg'
import reviewsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/feeds/reviews-light-icon.svg'
import shortsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/shorts-dark-icon.svg'
import shortsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/shorts-light-icon.svg'
import storyDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/feeds/stories-dark-icon.svg'
import storyWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/feeds/stories-light-icon.svg'
import videosDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/videos-dark-icon.svg'
import videosWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/videos-light-icon.svg'

// Intl
import { useTranslations } from 'next-intl'

const PublishOptions = () => {
  const { changePost } = usePost()
  const { activeTheme } = useThemeContext()
  const t = useTranslations('Posts')

  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('story')}
        isSelected={false}
        onClick={() => changePost('story')}
        iconSrc={activeTheme === 'light' ? storyWhiteSVG : storyDarkSVG}
        altText={t('story')}
      />
      <OptionButton
        label={t('event')}
        isSelected={false}
        onClick={() => changePost('event')}
        iconSrc={activeTheme === 'light' ? eventsWhiteSVG : eventsDarkSVG}
        altText={t('event')}
      />
      <OptionButton
        label={t('product')}
        isSelected={false}
        onClick={() => changePost('product')}
        iconSrc={activeTheme === 'light' ? productsWhiteSVG : productsDarkSVG}
        altText={t('product')}
      />
      <OptionButton
        label={t('short')}
        isSelected={false}
        onClick={() => changePost('short')}
        iconSrc={activeTheme === 'light' ? shortsWhiteSVG : shortsDarkSVG}
        altText={t('short')}
      />
      <OptionButton
        label={t('video')}
        isSelected={false}
        onClick={() => changePost('video')}
        iconSrc={activeTheme === 'light' ? videosWhiteSVG : videosDarkSVG}
        altText={t('video')}
      />
      <OptionButton
        label={t('audio')}
        isSelected={false}
        onClick={() => changePost('audio')}
        iconSrc={activeTheme === 'light' ? audioWhiteSVG : audioDarkSVG}
        altText={t('audio')}
      />
      <OptionButton
        label={t('review')}
        isSelected={false}
        onClick={() => changePost('review')}
        iconSrc={activeTheme === 'light' ? reviewsWhiteSVG : reviewsDarkSVG}
        altText={t('review')}
      />
    </section>
  )
}

export default PublishOptions
