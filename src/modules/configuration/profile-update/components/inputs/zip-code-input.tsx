'use client'

// Form
import { useFormContext } from 'react-hook-form'

// Hooks
import { useEffect, useState } from 'react'

// Intl
import { useTranslations } from 'next-intl'

// Session
import { useUserSession } from '@/modules/auth/session-data/hooks/useUserSession'

// Shadcn
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/ui/form'

import { Input } from '@/modules/ui/input'

// Type props
interface InputProps {
  name: string
  isPending: boolean
}

const ZipCodeInput = ({ name, isPending }: InputProps) => {
  // Getting the translations
  const t = useTranslations('Forms')

  const { control } = useFormContext()

  // Session and hydrated state
  const { session, hydrated } = useUserSession()

  const [zipCode, setZipCode] = useState<string | undefined>('')

  useEffect(() => {
    if (hydrated) setZipCode(session?.user?.zipCode || '')
  }, [hydrated, session])

  const handleOnChange = (value: string, onChange: (value: string) => void) => {
    // Allow only numbers and spaces
    const sanitizedValue = value.replace(/[^\d\s]/g, '')
    onChange(sanitizedValue)
  }

  return hydrated ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative h-fit'>
          <FormLabel htmlFor='zipCode' className='uppercase text-sm'>
            {t('inputs.zipCode')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              type='text'
              id='zipCode'
              placeholder={zipCode || ''}
              value={field.value || ''}
              onChange={(e) => handleOnChange(e.target.value, field.onChange)}
              pattern='\d*'
              inputMode='numeric'
              className='rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : null
}

export default ZipCodeInput
