'use client'

import OptionButton from '@/modules/configuration/components/buttons/option-button'
import icon from '@/modules/feeds/assets/icons/links/black/home.svg'
import { useTranslations } from 'next-intl'

const PublishOptions = () => {
  const t = useTranslations('Posts')
  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('story')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('story')}
      />
      <OptionButton
        label={t('image')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('image')}
      />
      <OptionButton
        label={t('event')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('event')}
      />
      <OptionButton
        label={t('product')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('product')}
      />
      <OptionButton
        label={t('shorts')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('shorts')}
      />
      <OptionButton
        label={t('videos')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={icon}
        altText={t('videos')}
      />
    </section>
  )
}

export default PublishOptions
