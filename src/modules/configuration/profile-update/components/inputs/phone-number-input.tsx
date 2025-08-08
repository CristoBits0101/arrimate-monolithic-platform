'use client'

// Hooks
import { useState, useEffect } from 'react'

// Intl
import { useTranslations } from 'next-intl'

// Session
import { useUserSession } from '@/modules/auth/session-data/hooks/useUserSession'

// Shadcn
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/ui/form'
import { Input } from '@/modules/ui/input'

// Type props
interface PhoneNumberInputProps {
  name: string
  isPending: boolean
}

const PhoneNumberInput = ({ name, isPending }: PhoneNumberInputProps) => {
  const t = useTranslations('Forms')
  const { session, hydrated } = useUserSession()
  const [userPhoneNumber, setuserPhoneNumber] = useState<string | undefined>('')
  useEffect(() => {
    if (hydrated) setuserPhoneNumber(session?.user?.phoneNumber || '')
  }, [hydrated, session, t])
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className='flex-grow'>
          <FormLabel htmlFor='phone-number' className='uppercase text-sm'>
            {t('inputs.phoneNumber')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              id='phone-number'
              type='tel'
              placeholder={userPhoneNumber || ''}
              className='rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PhoneNumberInput
