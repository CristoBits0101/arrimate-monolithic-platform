'use client'

// Assets
import enIcon from '@/modules/configuration/assets/buttons/languages/gb.svg'
import esIcon from '@/modules/configuration/assets/buttons/languages/es.svg'

// Hooks
import useLanguageSection from '@/modules/configuration/settings-panel/hooks/useLanguageSection'

// Intl
import { useTranslations } from 'next-intl'

// Shadcn
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

const LanguageSelector = () => {
  const { locale, changeLanguage } = useLanguageSection()
  const t = useTranslations('SettingsPanel')

  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('language.english')}
        isSelected={locale === 'en'}
        onClick={() => changeLanguage('en')}
        iconSrc={enIcon}
        altText='English icon'
      />
      <OptionButton
        label={t('language.spanish')}
        isSelected={locale === 'es'}
        onClick={() => changeLanguage('es')}
        iconSrc={esIcon}
        altText='Spanish icon'
      />
    </section>
  )
}

export default LanguageSelector
