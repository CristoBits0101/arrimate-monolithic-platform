'use client'

import { useUserSession } from '@/modules/configuration/hooks/sessions/useUserSession'
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/ui/form'
import { Input } from '@/modules/ui/input'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface EmailInputProps {
  name: string
  isPending: boolean
}

const EmailInput = ({ name, isPending }: EmailInputProps) => {
  const { session, hydrated } = useUserSession()
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined)
  const t = useTranslations('Forms')

  useEffect(() => {
    if (hydrated) setUserEmail(session?.user?.email || '')
  }, [hydrated, session, t])

  const { control } = useFormContext()

  return hydrated ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative h-fit'>
          <FormLabel htmlFor='email' className='uppercase text-sm'>
            {t('inputs.email')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              placeholder={userEmail}
              type='email'
              id='email'
              className='text-sm rounded-none border-[0.094rem] border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#EBEBEC] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : null
}

export default EmailInput
