'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { PulseLoader } from 'react-spinners'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils/classnames'
import { useSettingsFormContext } from '@/modules/configuration/profile-update/contexts/settings-form-context'
import { useThemeContext } from '@/modules/configuration/settings-panel/hooks/useThemeContext'

import updateDarkIcon from '@/assets/icons/buttons/inactive/dark-theme/updates/update-dark-icon.svg'
import updateLightIcon from '@/assets/icons/buttons/inactive/light-theme/updates/update-light-icon.svg'

export default function UpdateButton() {
  const { status, isPending, handleUpdate } = useSettingsFormContext()
  const { activeTheme } = useThemeContext()
  const t = useTranslations('SettingsPanel')

  let label = t('update')
  if (status === 'success') label = t('updated')
  if (status === 'error') label = t('updateFailed')
  const loaderColor = activeTheme === 'light' ? '#000000' : '#ffffff'

  return (
    <button
      onClick={handleUpdate}
      disabled={isPending}
      className={cn(
        'w-full text-sm text-left cursor-pointer px-8 py-4 flex justify-between items-center border-b-[0.05rem] border-[#EBEAEB] dark:border-[#3b3b40]',
        'dark:hover:bg-[#26272C] hover:bg-[#F4F4F4]',
        status === 'dirty' && 'animate-pulse dark:bg-[#26272C] bg-[#F4F4F4]'
      )}
    >
      {isPending ? <PulseLoader color={loaderColor} /> : label}
      <span className='w-5 h-5 flex items-center justify-center'>
        {status === 'success' ? (
          <Check className='w-5 h-5 text-green-600' />
        ) : (
          <Image
            src={activeTheme === 'light' ? updateLightIcon : updateDarkIcon}
            alt='Update icon'
            className='w-5 h-5 aspect-square object-contain'
          />
        )}
      </span>
    </button>
  )
}

