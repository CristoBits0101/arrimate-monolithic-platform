'use client'

// Actions
import { getPhonePrefixes } from '@/modules/configuration/profile-update/actions/phone-prefix-action'

// Hooks
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

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
interface PhonePrefixInputProps {
  name: string
  isPending: boolean
}

const PhonePrefixInput = ({ name, isPending }: PhonePrefixInputProps) => {
  const t = useTranslations('Forms')
  const [filteredPrefixes, setFilteredPrefixes] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [hasSelected, setHasSelected] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const { session, hydrated } = useUserSession()
  const [userPhonePrefix, setuserPhonePrefix] = useState<string | undefined>('')
  const { watch, setValue } = useFormContext()
  const fieldValue = watch<string>(name)

  useEffect(() => {
    if (fieldValue) {
      setSearch(fieldValue)
      setHasSelected(true)
    } else {
      setSearch('')
      setHasSelected(false)
    }
  }, [fieldValue])

  useEffect(() => {
    if (!hydrated) return
    const prefix = session?.user?.prefix || ''
    setuserPhonePrefix(prefix)
    if (!fieldValue && prefix) {
      setValue(name, prefix)
      setSearch(prefix)
      setHasSelected(true)
    }
  }, [hydrated, session, fieldValue, name, setValue])

  useEffect(() => {
    if (search.trim() === '' || hasSelected) {
      setFilteredPrefixes([])
      return
    }

    let isCancelled = false

    async function fetchPrefixes() {
      try {
        const fetchedPrefixes = await getPhonePrefixes(search)
        if (!isCancelled) setFilteredPrefixes(fetchedPrefixes)
      } catch (error) {
        console.error('Error fetching phone prefixes:', error)
      }
    }

    fetchPrefixes()
    return () => {
      isCancelled = true
    }
  }, [search, hasSelected])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredPrefixes([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className='w-full flex-shrink-0 relative'>
          <FormLabel htmlFor='phone-prefix' className='uppercase text-sm'>
            {t('inputs.phonePrefix')}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                value={search}
                onChange={(e) => {
                  setHasSelected(false)
                  setSearch(e.target.value)
                  field.onChange(e.target.value)
                }}
                placeholder={userPhonePrefix || ''}
                disabled={isPending}
                type='text'
                id='phone-prefix'
                className='rounded-none border border-solid bg-[#F4F4F4] dark:bg-[#26272c] border-[#EBEAEB] dark:border-[#3b3b40] hover:bg-[#EBEAEB] focus:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] dark:focus:bg-[#3b3b40] text-[#1D0F0F] dark:text-[#ececed] placeholder:text-[#453C41] dark:placeholder:text-[#848489]'
              />
              {filteredPrefixes.length > 0 && (
                <ul
                  ref={dropdownRef}
                  className='absolute z-10 bg-white dark:bg-[#26272c] border border-[#EBEAEB] dark:border-[#3b3b40] shadow-md w-full max-h-40 overflow-y-auto border-t-0'
                >
                  {filteredPrefixes.map((prefix) => (
                    <li
                      key={prefix}
                      className='px-3 py-1 cursor-pointer hover:bg-[#EBEAEB] dark:hover:bg-[#3b3b40] rounded-none'
                      onClick={() => {
                        setSearch(prefix)
                        field.onChange(prefix)
                        setFilteredPrefixes([])
                        setHasSelected(true)
                      }}
                    >
                      {prefix}
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
  )
}

export default PhonePrefixInput
