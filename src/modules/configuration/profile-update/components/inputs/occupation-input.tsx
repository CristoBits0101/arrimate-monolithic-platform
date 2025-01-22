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
interface OccupationInputProps {
  name: string
  isPending: boolean
}

const OccupationInput = ({ name, isPending }: OccupationInputProps) => {
  const t = useTranslations('Forms')
  const { session, hydrated } = useUserSession()
  const [userOccupation, setUserOccupation] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    if (hydrated) setUserOccupation(session?.user?.occupation || '')
  }, [hydrated, session, t])

  const { control } = useFormContext()

  return hydrated ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor='occupation' className='uppercase text-sm'>
            💼 {t('inputs.occupation')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={isPending}
              type='text'
              placeholder={userOccupation || ''}
              id='occupation'
              className='rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : null
}

export default OccupationInput
