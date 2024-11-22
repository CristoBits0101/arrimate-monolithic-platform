'use client'

import LanguageButton from '@/modules/auth/components/buttons/configuration/language-button'
import enIcon from '@/modules/configuration/assets/icons/buttons/languages/gb.svg'
import esIcon from '@/modules/configuration/assets/icons/buttons/languages/es.svg'
import useLanguageSection from '@/modules/configuration/hooks/useLanguageSection'

export default function LanguagePanel() {
  const { changeLanguage } = useLanguageSection()
  return (
    <div className='absolute w-fit h-fit flex gap-2 top-4 right-4 z-10'>
      <LanguageButton
        language='en'
        onClick={changeLanguage}
        iconSrc={enIcon}
        altText='English icon'
      />
      <LanguageButton
        language='es'
        onClick={changeLanguage}
        iconSrc={esIcon}
        altText='Spanish icon'
      />
    </div>
  )
}
