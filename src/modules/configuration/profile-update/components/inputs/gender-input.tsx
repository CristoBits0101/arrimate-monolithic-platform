'use client'

// Actions
import { getGenders } from '@/modules/configuration/profile-update/actions/user-gender-action'

// Form
import { useFormContext } from 'react-hook-form'

// Hooks
import { useEffect, useState, useRef } from 'react'

// Intl
import { useTranslations } from 'next-intl'

// Session
import { useUserSession } from '@/modules/auth/session-data/hooks/useUserSession'

// Styles
import '@/modules/configuration/profile-update/styles/select-apperance.css'

// Shadcn
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/ui/form'

// Type props
interface GenderInputProps {
  name: string
  isPending: boolean
}

export default function GenderInput({ name, isPending }: GenderInputProps) {
  const t = useTranslations('Forms')
  const { session, hydrated } = useUserSession()
  const [userGender, setUserGender] = useState<string | undefined>(undefined)
  const [genders, setGenders] = useState<{ id: string; name: string }[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { control } = useFormContext()

  useEffect(() => {
    if (hydrated) {
      setUserGender(session?.user?.gender || '')
    }
  }, [hydrated, session])

  useEffect(() => {
    async function fetchGenders() {
      try {
        const fetchedGenders = await getGenders()
        setGenders(fetchedGenders)
      } catch (error) {
        console.error('Error fetching genders:', error)
      }
    }
    fetchGenders()
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (isDropdownOpen)
      document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const capitalizeFirstWord = (text: string): string => {
    const lowerCasedText = text.toLowerCase()
    return lowerCasedText.charAt(0).toUpperCase() + lowerCasedText.slice(1)
  }

  return hydrated ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor='gender' className='uppercase text-sm'>
            {t('inputs.gender')}
          </FormLabel>
          <FormControl>
            <div className='relative w-full' ref={dropdownRef}>
              <button
                type='button'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='outline-none select w-full h-9 px-3 py-1 rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489] text-left'
                disabled={isPending}
              >
                {capitalizeFirstWord(
                  t(
                    `inputs.genders.${(
                      genders.find((g) => g.id === userGender)?.name ||
                      'reserved'
                    ).toLowerCase()}`
                  )
                )}
              </button>
              {isDropdownOpen && (
                <ul className='absolute z-10 bg-white dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] border rounded-none w-full border-t-0'>
                  <li
                    onClick={() => {
                      field.onChange('')
                      setUserGender('')
                      setIsDropdownOpen(false)
                    }}
                    className='px-3 py-1 cursor-pointer hover:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] rounded-none capitalized'
                  >
                    {capitalizeFirstWord(t('inputs.genders.reserved'))}
                  </li>
                  {genders.map(({ id, name }) => (
                    <li
                      key={id}
                      onClick={() => {
                        field.onChange(id)
                        setUserGender(id)
                        setIsDropdownOpen(false)
                      }}
                      className='px-3 py-1 cursor-pointer hover:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] rounded-none capitalized'
                    >
                      {capitalizeFirstWord(
                        t(`inputs.genders.${name.toLowerCase()}`)
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : null
}
