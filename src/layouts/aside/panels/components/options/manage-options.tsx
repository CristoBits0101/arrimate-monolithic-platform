'use client'

// Buttons
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

// Icons
import chatDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/messages/chats-dark-icon.svg'
import chatWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/messages/chats-light-icon.svg'
import eventsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/feeds/events-dark-icon.svg'
import eventsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/feeds/events-light-icon.svg'
import liveDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/live-dark-icon.svg'
import liveWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/live-light-icon.svg'
import productsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/e-commerce/products-dark-icon.svg'
import productsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/e-commerce/products-light-icon.svg'
import shortsDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/shorts-dark-icon.svg'
import shortsWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/shorts-light-icon.svg'
import storyDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/feeds/stories-dark-icon.svg'
import storyWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/feeds/stories-light-icon.svg'
import videosDarkSVG from '@/assets/icons/navigation/inactive/dark-theme/streaming/videos-dark-icon.svg'
import videosWhiteSVG from '@/assets/icons/navigation/inactive/light-theme/streaming/videos-light-icon.svg'

// Intl
import { useLocale, useTranslations } from 'next-intl'
import { useThemeContext } from '@/modules/configuration/settings-panel/hooks/useThemeContext'
import { useRouter } from 'next/navigation'

const ManageOptions = () => {
  const t = useTranslations('Posts')
  const { activeTheme } = useThemeContext()
  const locale = useLocale()
  const router = useRouter()
  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('stories')}
        isSelected={false}
        onClick={() => {
          router.push(`/${locale}/stories/manage`)
        }}
        iconSrc={activeTheme === 'light' ? storyWhiteSVG : storyDarkSVG}
        altText={t('stories')}
      />
      <OptionButton
        label={t('events')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? eventsWhiteSVG : eventsDarkSVG}
        altText={t('events')}
      />
      <OptionButton
        label={t('products')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? productsWhiteSVG : productsDarkSVG}
        altText={t('products')}
      />
      <OptionButton
        label={t('shorts')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? shortsWhiteSVG : shortsDarkSVG}
        altText={t('shorts')}
      />
      <OptionButton
        label={t('videos')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? videosWhiteSVG : videosDarkSVG}
        altText={t('videos')}
      />
      <OptionButton
        label={t('live')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? liveWhiteSVG : liveDarkSVG}
        altText={t('live')}
      />
      <OptionButton
        label={t('comments')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? chatWhiteSVG : chatDarkSVG}
        altText={t('comments')}
      />
    </section>
  )
}

export default ManageOptions
