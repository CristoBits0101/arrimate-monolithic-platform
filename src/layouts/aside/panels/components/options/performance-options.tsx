'use client'

// Buttons
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

// Icons
import activityDarkIcon from '@/assets/icons/panels/activity-dark-icon.svg'
import activityLightIcon from '@/assets/icons/panels/activity-light-icon.svg'
import analysisDarkIcon from '@/assets/icons/panels/analysis-dark-icon.svg'
import analysisLightIcon from '@/assets/icons/panels/analysis-light-icon.svg'

// Hooks
import { useTranslations } from 'next-intl'
import { useThemeContext } from '@/modules/configuration/settings-panel/hooks/useThemeContext'

const PerformanceOptions = () => {
  // Translations
  const t = useTranslations('Posts')
  const { activeTheme } = useThemeContext()
  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('activity')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? activityLightIcon : activityDarkIcon}
        altText={t('activity')}
      />
      <OptionButton
        label={t('analysis')}
        isSelected={false}
        onClick={() => {}}
        iconSrc={activeTheme === 'light' ? analysisLightIcon : analysisDarkIcon}
        altText={t('analysis')}
      />
    </section>
  )
}

export default PerformanceOptions
