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

const CityInput = ({ name, isPending }: InputProps) => {
  const t = useTranslations('Forms')
  const { control } = useFormContext()
  const { session, hydrated } = useUserSession()
  const [userCity, setUserCity] = useState<string | undefined>('')

  useEffect(() => {
    if (hydrated) setUserCity(session?.user?.city || '')
  }, [hydrated, session])

  return hydrated ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative h-fit'>
          <FormLabel htmlFor='city' className='uppercase text-sm'>
            {t('inputs.city')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              placeholder={userCity || ''}
              type='text'
              id='city'
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              className='rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : null
}

export default CityInput
