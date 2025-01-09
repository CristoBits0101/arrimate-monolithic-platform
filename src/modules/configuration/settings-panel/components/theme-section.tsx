'use client'

// Assets
import activeDarkIcon from '@/modules/configuration/assets/buttons/themes/active/dark.svg'
import activeLightIcon from '@/modules/configuration/assets/buttons/themes/active/light.svg'
import activeSystemIcon from '@/modules/configuration/assets/buttons/themes/active/system.svg'
import inactiveDarkIcon from '@/modules/configuration/assets/buttons/themes/inactive/dark.svg'
import inactiveLightIcon from '@/modules/configuration/assets/buttons/themes/inactive/light.svg'
import inactiveSystemIcon from '@/modules/configuration/assets/buttons/themes/inactive/system.svg'

// Hooks
import useThemeSection from '@/modules/configuration/settings-panel/hooks/useThemeSection'

// Intl
import { useTranslations } from 'next-intl'

// Shadcn
import OptionButton from '@/modules/configuration/settings-panel/buttons/option-button'

const ThemeSection = () => {
  const { theme, changeTheme } = useThemeSection()
  const t = useTranslations('SettingsPanel')

  return (
    <section className='w-full h-fit flex flex-col'>
      <OptionButton
        label={t('themes.dark')}
        isSelected={theme === 'dark'}
        onClick={() => changeTheme('dark')}
        iconSrc={theme === 'dark' ? activeDarkIcon : inactiveDarkIcon}
        altText='Dark theme icon'
      />
      <OptionButton
        label={t('themes.light')}
        isSelected={theme === 'light'}
        onClick={() => changeTheme('light')}
        iconSrc={theme === 'light' ? activeLightIcon : inactiveLightIcon}
        altText='Light theme icon'
      />
      <OptionButton
        label={t('themes.system')}
        isSelected={theme === 'system'}
        onClick={() => changeTheme('system')}
        iconSrc={theme === 'system' ? activeSystemIcon : inactiveSystemIcon}
        altText='System theme icon'
      />
    </section>
  )
}

export default ThemeSection
