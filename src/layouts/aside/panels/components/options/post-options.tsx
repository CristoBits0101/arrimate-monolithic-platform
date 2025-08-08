'use client'

// Buttons
import SettingButton from '@/modules/configuration/settings-panel/buttons/options-button'

// Custom
import { usePost } from '@/modules/publications/add-post/hooks/usePost'
import { useThemeContext } from '@/modules/configuration/settings-panel/hooks/useThemeContext'

// Icons
import manageDarkIcon from '@/assets/icons/panels/manage-dark-icon.svg'
import manageLightIcon from '@/assets/icons/panels/manage-light-icon.svg'
import performanceDarkIcon from '@/assets/icons/panels/performance-dark-icon.svg'
import performanceLightIcon from '@/assets/icons/panels/performance-light-icon.svg'
import publishDarkIcon from '@/assets/icons/panels/publish-dark-icon.svg'
import publishLightIcon from '@/assets/icons/panels/publish-light-icon.svg'
import streamDarkIcon from '@/assets/icons/panels/stream-dark-icon.svg'
import streamLightIcon from '@/assets/icons/panels/stream-light-icon.svg'

// Intl
import { useTranslations } from 'next-intl'

interface PostOptionsProps {
  handleSelectOption: (
    option: 'publish' | 'stream' | 'manage' | 'performance'
  ) => void
}

const PostOptions: React.FC<PostOptionsProps> = ({ handleSelectOption }) => {
  // Access the function to update context
  const { changePost } = usePost()
  const { activeTheme } = useThemeContext()
  // Get translations
  const t = useTranslations('Posts')
  return (
    <div className='flex flex-col items-center'>
      <SettingButton
        icon={activeTheme === 'light' ? publishLightIcon : publishDarkIcon}
        label={t('publish')}
        onClick={() => handleSelectOption('publish')}
        altText={t('publish')}
      />
      <SettingButton
        icon={activeTheme === 'light' ? streamLightIcon : streamDarkIcon}
        label={t('stream')}
        onClick={() => changePost('stream')}
        altText={t('stream')}
      />
      <SettingButton
        icon={activeTheme === 'light' ? manageLightIcon : manageDarkIcon}
        label={t('manage')}
        onClick={() => handleSelectOption('manage')}
        altText={t('manage')}
      />
      <SettingButton
        icon={
          activeTheme === 'light'
            ? performanceLightIcon
            : performanceDarkIcon
        }
        label={t('performance')}
        onClick={() => handleSelectOption('performance')}
        altText={t('performance')}
      />
    </div>
  )
}

export default PostOptions
