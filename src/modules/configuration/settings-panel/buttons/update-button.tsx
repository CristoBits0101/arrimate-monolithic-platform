'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils/classnames'
import { useSettingsFormContext } from '@/modules/configuration/profile-update/contexts/settings-form-context'

export default function UpdateButton() {
  const { status, isPending, handleUpdate } = useSettingsFormContext()
  const t = useTranslations('SettingsPanel')

  let label = t('update')
  if (status === 'success') label = t('updated')
  if (status === 'error') label = t('updateFailed')

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
      {label}
      {status === 'success' && <Check className='w-5 h-5 text-green-600' />}
    </button>
  )
}
